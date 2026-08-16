export default async function middleware(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Let static assets pass through quickly without tracking logic
  if (path.match(/\\.(css|js|png|jpg|jpeg|gif|svg|ico)$/) || path.startsWith('/assets/') || path.startsWith('/img/')) {
    return new Response(null, { headers: { 'x-middleware-next': '1' } });
  }

  // 1. Marketing Attribution (Server-Side ITP Fix)
  const existingUtmCookie = request.headers.get('cookie')?.includes('svahnar_first_touch_utm');
  
  let setCookieHeader = null;
  if (!existingUtmCookie) {
    const { searchParams } = url;
    const utmSource = searchParams.get('utm_source');
    const gclid = searchParams.get('gclid');
    const li_fat_id = searchParams.get('li_fat_id');

    if (utmSource || gclid || li_fat_id) {
      const utms = {
        utm_source: utmSource || 'unknown',
        utm_medium: searchParams.get('utm_medium') || '',
        utm_campaign: searchParams.get('utm_campaign') || '',
        utm_term: searchParams.get('utm_term') || '',
        utm_content: searchParams.get('utm_content') || '',
        gclid: gclid || '',
        li_fat_id: li_fat_id || '',
        timestamp: new Date().toISOString(),
        landing_page: path
      };
      
      const cookieValue = JSON.stringify(utms);
      setCookieHeader = `svahnar_first_touch_utm=${encodeURIComponent(cookieValue)}; Max-Age=${60 * 60 * 24 * 365}; Path=/; Domain=.svahnar.com; Secure; SameSite=Lax; HttpOnly`;
    }
  }

  // 2. Server-to-Server Page View Tracking
  // Bypass client-side blockers by sending the page view directly to the API
  const ANALYTICS_API_URL = 'https://api.svahnar.com/website/analytics/event';

  const cookieHeader = request.headers.get('cookie') || '';
  
  // We fire this asynchronously so it doesn't block the response
  fetch(ANALYTICS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieHeader
    },
    body: JSON.stringify({
      event_name: 'page_view',
      metadata: {
        page_path: path,
        page_location: request.url,
        url: request.url,
        session_id: String(Date.now()),
        engagement_time_msec: 1000,
        app: 'docs'
      }
    })
  }).catch(err => {
    console.error('S2S Tracking fetch failed:', err);
  });

  // Vercel edge middleware generic continue
  const response = new Response(null, {
    headers: {
      'x-middleware-next': '1'
    }
  });

  if (setCookieHeader) {
    response.headers.set('Set-Cookie', setCookieHeader);
  }

  return response;
}
