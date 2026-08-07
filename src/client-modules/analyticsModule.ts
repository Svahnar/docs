import axios from 'axios';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Docusaurus exposes the route update lifecycle method here
export function onRouteUpdate({ location, previousLocation }: { location: Location; previousLocation: Location | null }) {
  if (!ExecutionEnvironment.canUseDOM) {
    return;
  }

  // Same URL as the main svahnar-website API
  const ANALYTICS_API_URL = 'https://api.svahnar.com/website/analytics/event';

  try {
    const consentStr = localStorage.getItem('svahnar_cookie_consent_v1');
    if (consentStr) {
      const consentState = JSON.parse(consentStr);
      if (consentState.performance === false) {
        return; // Abort tracking if performance cookies were rejected
      }
    }

    // Only fire if the path actually changed
    if (previousLocation && previousLocation.pathname === location.pathname) {
      return;
    }

    axios.post(
      ANALYTICS_API_URL,
      {
        event_name: 'page_view',
        metadata: {
          page_path: location.pathname,
          app: 'docs', // Differentiate this from the main website
          url: window.location.href,
        },
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // IMPORTANT: send the w_user_id and user_id cookies
      }
    ).catch(() => {
      // Fail silently for analytics
    });

    // Also trigger Client-Side GA4 (Hybrid Tagging)
    if (!document.getElementById('ga-script')) {
      const s1 = document.createElement('script');
      s1.id = 'ga-script';
      s1.type = 'text/javascript';
      s1.async = true;
      s1.src = 'https://www.googletagmanager.com/gtag/js?id=G-50T925X4N9';
      document.head.appendChild(s1);

      const s2 = document.createElement('script');
      s2.id = 'ga-init';
      s2.type = 'text/javascript';
      s2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-50T925X4N9', { page_path: '${location.pathname}' });
      `;
      document.head.appendChild(s2);
    } else if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('config', 'G-50T925X4N9', { page_path: location.pathname });
    }

  } catch (error) {
    // Fail silently
  }
}
