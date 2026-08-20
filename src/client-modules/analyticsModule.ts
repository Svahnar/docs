import axios from 'axios';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

let pageStartTime = typeof Date !== 'undefined' ? Date.now() : 0;

const sendEngagement = (path?: string) => {
  if (!ExecutionEnvironment.canUseDOM) return;

  // Check consent before sending engagement
  let consentStr = localStorage.getItem('svahnar_cookie_consent_v1');
  const match = document.cookie.match(new RegExp('(^| )svahnar_cookie_consent_v1=([^;]+)'));
  if (match) {
    consentStr = decodeURIComponent(match[2]);
  }
  
  if (consentStr) {
    try {
      const consentState = JSON.parse(consentStr);
      if (consentState.performance === false) {
        return; // Abort if performance cookies are rejected
      }
    } catch (e) {
      // ignore JSON parse errors
    }
  }

  const elapsedMs = Date.now() - pageStartTime;
  if (elapsedMs >= 1000) {
    const payload = {
      event_name: 'user_engagement',
      metadata: {
        page_location: window.location.href,
        page_path: path || window.location.pathname,
        page_title: document.title,
        engagement_time_msec: elapsedMs,
        app: 'docs'
      }
    };

    const apiUrl = 'https://api.svahnar.com/website/analytics/event';
    try {
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
        credentials: 'include'
      }).catch(() => {});
    } catch (e) {
      // Fail silently
    }
  }
  pageStartTime = Date.now();
};

if (ExecutionEnvironment.canUseDOM) {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      sendEngagement(window.location.pathname);
    } else {
      pageStartTime = Date.now();
    }
  });
  window.addEventListener('pagehide', () => {
    sendEngagement(window.location.pathname);
  });
}

// Docusaurus exposes the route update lifecycle method here
export function onRouteUpdate({ location, previousLocation }: { location: Location; previousLocation: Location | null }) {
  if (!ExecutionEnvironment.canUseDOM) {
    return;
  }

  // Send engagement time for previous page when navigating
  if (previousLocation && previousLocation.pathname !== location.pathname) {
    sendEngagement(previousLocation.pathname);
  }
  pageStartTime = Date.now();

  try {
    let allowGoogle = true;
    let consentStr = localStorage.getItem('svahnar_cookie_consent_v1');
    
    // Attempt to read from cookie first, since it carries over from the main domain
    const match = document.cookie.match(new RegExp('(^| )svahnar_cookie_consent_v1=([^;]+)'));
    if (match) {
      consentStr = decodeURIComponent(match[2]);
    }

    if (consentStr) {
      const consentState = JSON.parse(consentStr);
      if (consentState.performance === false) {
        allowGoogle = false;
      }
    }

    // Only fire if the path actually changed
    if (previousLocation && previousLocation.pathname === location.pathname) {
      return;
    }

    const ANALYTICS_API_URL = 'https://api.svahnar.com/website/analytics/event';
    
    if (!allowGoogle) {
      axios.post(
        ANALYTICS_API_URL,
        {
          event_name: 'page_view',
          metadata: {
            page_location: window.location.href,
            page_path: location.pathname,
            page_title: document.title,
            app: 'docs', 
            url: window.location.href,
          },
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true, 
        }
      ).catch(() => {
        
      });
    }

    if (allowGoogle) {
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
    }

  } catch (error) {
    // Fail silently
  }
}
