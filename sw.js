/* Rohit Malla portfolio: keeps images, the 3D model and fonts on this device after the first visit */
const V = 'rm-026c2009c2';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('rm-') && k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())));
function keep(req) {
  const u = new URL(req.url);
  if (req.method !== 'GET') return false;
  if (u.origin === location.origin && u.pathname.includes('/media/')) return true;
  return u.hostname === 'cdn.jsdelivr.net' || u.hostname === 'fonts.gstatic.com' || u.hostname === 'fonts.googleapis.com';
}
async function fromCache(req) {
  const c = await caches.open(V);
  const hit = await c.match(req.url);
  if (hit) return hit;
  const res = await fetch(req);
  if (res && (res.ok || res.type === 'opaque')) c.put(req.url, res.clone());
  return res;
}
self.addEventListener('fetch', e => { if (keep(e.request)) e.respondWith(fromCache(e.request)); });
self.addEventListener('message', e => {
  const list = e.data && e.data.rmPrecache; if (!Array.isArray(list)) return;
  e.waitUntil((async () => {
    const c = await caches.open(V);
    for (const p of list) {
      const url = new URL(p, self.registration.scope).href;
      if (await c.match(url)) continue;
      try { const r = await fetch(url); if (r.ok) await c.put(url, r); } catch (_) {}
    }
  })());
});
