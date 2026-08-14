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

    // Load Google Tag Manager (which contains GA4, LinkedIn, etc.)
    if (!document.getElementById('gtm-script')) {
      const gtmId = 'GTM-NH93HPZ8';
      
      // Initialize dataLayer
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
      
      const s1 = document.createElement('script');
      s1.id = 'gtm-script';
      s1.async = true;
      s1.src = 'https://www.googletagmanager.com/gtm.js?id=' + gtmId;
      document.head.appendChild(s1);
    }
    
    // Push page_view event to GTM
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: 'page_view',
      page_path: location.pathname
    });

  } catch (error) {
    // Fail silently
  }
}
