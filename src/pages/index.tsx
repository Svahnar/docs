import React from 'react';
import { Redirect } from '@docusaurus/router';
import Head from '@docusaurus/Head';

export default function Home() {
  return (
    <>
      <Head>
        <title>SVAHNAR Docs | Developer Documentation</title>
        <meta name="description" content="Explore guides, SDKs, and API references for building, configuring, and deploying intelligent AI agents and networks on SVAHNAR." />
        <meta name="keywords" content="svahnar, ai agent platform, developer docs, artificial intelligence, agent framework" />
      </Head>
      <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
        <h1>SVAHNAR Docs</h1>
        <p>
          Redirecting to <a href="/docs/GetStarted/Overview/">SVAHNAR Documentation Overview</a>...
        </p>
        <Redirect to="/docs/GetStarted/Overview/" />
      </div>
    </>
  );
}
