import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  const form = await context.request.formData();
  const key = String(form.get('key') ?? '');
  const id = String(form.get('id') ?? '');
  const action = String(form.get('action') ?? '');

  if (!env.ADMIN_SECRET || key !== env.ADMIN_SECRET) {
    return new Response('Forbidden', { status: 403 });
  }

  if (!id || !['approve', 'delete'].includes(action)) {
    return new Response('Bad request', { status: 400 });
  }

  const db = env.DB;
  if (action === 'approve') {
    await db.prepare('UPDATE comments SET approved = 1 WHERE id = ?').bind(id).run();
  } else {
    await db.prepare('DELETE FROM comments WHERE id = ?').bind(id).run();
  }

  return context.redirect(`/admin/comments/?key=${encodeURIComponent(key)}`, 303);
};
