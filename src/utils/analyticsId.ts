import axios from 'axios';

/**
 * Calls the backend to initialize the w_user_id HttpOnly cookie.
 */
export const initAnalyticsId = async () => {
  const ANALYTICS_API_URL = 'https://api.svahnar.com/website/analytics/init';

  try {
    await axios.get(ANALYTICS_API_URL, {
      withCredentials: true,
    });
  } catch (error) {
    console.error('Failed to initialize analytics:', error);
  }
};
