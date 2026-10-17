const CACHE = 'w2-shell-v21';
const SHELL = ['./', './index.html', './img/onb_wealth.jpg', './img/onb_wonder.jpg', './img/onb_wisdom.jpg', './img/onb_worth.jpg', './img/asset_gold.jpg', './img/asset_silver.jpg', './img/asset_property.jpg', './img/asset_copper.jpg', './img/asset_fund.jpg', './img/bill_mobile.jpg', './img/bill_elec.jpg', './img/bill_water.jpg', './img/bill_gas.jpg', './img/bill_phone.jpg', './img/bill_id.jpg', './img/asset_oil.jpg', './img/onb_well.jpg', './img/onb_world.jpg', './img/onb_wheels.jpg', './img/card_front.jpg', './img/ticket_gold.jpg', './img/ticket_holo.jpg', './img/asset_debt.jpg', './img/asset_lease.jpg', './img/car_tara.jpg', './img/car_shahin.jpg', './img/car_tiggo7.jpg', './img/car_arrizo8.jpg', './img/pf_hero.jpg', './img/asset_pf.jpg', './img/pf_hi.jpg', './img/pf_dig.jpg', './img/pf_grw.jpg', './img/svc_inst.jpg', './img/svc_stake.jpg', './img/svc_guard.jpg', './img/svc_save.jpg', './img/svc_credit.jpg', './img/gift_classic.jpg', './img/gift_birthday.jpg', './img/gift_nowruz.jpg', './img/gift_love.jpg', './img/w2-icon-192.png', './img/w2-icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (/\.(mp4|webm)(\?|$)/.test(req.url)) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return res; }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; }).catch(() => hit);
    return hit || net;
  }));
});
