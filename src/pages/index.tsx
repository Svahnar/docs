import { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router';

export default function Home(): null {
  const history = useHistory();

  useEffect(() => {
    history.replace('/docs/GetStarted/Overview');
  }, [history]);

  return (
    <Layout
      title="SVAHNAR Docs – Agentic AI Platform Developer Documentation"
      description="Official SVAHNAR developer documentation for building, configuring, and deploying AI agents on the SVAHNAR platform."
    >
      {null}
    </Layout>
  );
}
