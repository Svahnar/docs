import React, { useEffect } from 'react';
import { initAnalyticsId } from '../utils/analyticsId';

export default function Root({children}) {
  useEffect(() => {
    initAnalyticsId();
  }, []);
  
  return <>{children}</>;
}
