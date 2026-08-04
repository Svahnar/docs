import axios from 'axios';

/**
 * Utility for sending analytics events directly to the server,
 * bypassing client-side GTM for adblocker resilience and security.
 */
export const sendServerAnalyticsEvent = async (eventName: string, metadata?: Record<string, any>) => {
  const ANALYTICS_API_URL = 'https://api.svahnar.com/website/analytics/event';

  try {
    await axios.post(
      ANALYTICS_API_URL,
      {
        event_name: eventName,
        metadata: metadata || {},
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, 
      }
    );
  } catch (error) {
    console.error('Failed to send analytics event:', error);
  }
};
