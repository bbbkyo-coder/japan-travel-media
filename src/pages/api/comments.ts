import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

const MAX_NAME_LENGTH = 60;
const MAX_MESSAGE_LENGTH = 1000;

interface CommentRow {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export const GET: APIRoute = async (context) => {
  const slug = context.url.searchParams.get('slug');
  if (!slug) {
    return new Response(JSON.stringify({ error: 'Missing slug' }), { status: 400 });
  }

  const db = env.DB;
  const { results } = await db
    .prepare(
      'SELECT id, name, message, created_at FROM comments WHERE article_slug = ? AND approved = 1 ORDER BY created_at DESC'
    )
    .bind(slug)
    .all<CommentRow>();

  return new Response(JSON.stringify({ comments: results }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async (context) => {
  let body: { slug?: string; name?: string; message?: string; website?: string };
  try {
    body = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }

  const { slug, name, message, website } = body;

  // honeypot: 人間には見えないフィールド。ここに値が入っていたらボットとみなす
  if (website) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  if (!slug || !name?.trim() || !message?.trim()) {
    return new Response(JSON.stringify({ error: 'Name and comment are required.' }), { status: 400 });
  }

  if (name.length > MAX_NAME_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
    return new Response(JSON.stringify({ error: 'Name or comment is too long.' }), { status: 400 });
  }

  const db = env.DB;
  await db
    .prepare('INSERT INTO comments (article_slug, name, message, approved) VALUES (?, ?, ?, 0)')
    .bind(slug, name.trim().slice(0, MAX_NAME_LENGTH), message.trim().slice(0, MAX_MESSAGE_LENGTH))
    .run();

  return new Response(JSON.stringify({ ok: true }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};
