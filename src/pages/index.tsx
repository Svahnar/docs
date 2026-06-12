import React from 'react';
import { Redirect } from '@docusaurus/router';

export default function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>SVAHNAR Docs</h1>
      <p>
        Redirecting to <a href="/docs/GetStarted/Overview">SVAHNAR Documentation Overview</a>...
      </p>
      <Redirect to="/docs/GetStarted/Overview" />
    </div>
  );
}
