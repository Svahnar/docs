import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import VersionedLink from '@site/src/components/VersionedLink';
import ArrowRight from '@site/static/icons/right_arrow.svg';
// @ts-ignore
import AgentConsoleImg from '@site/docs/GetStarted/images/1.png';

export default function Home() {
  return (
    <Layout
      title="SVAHNAR Docs | Developer Documentation"
      description="Explore guides, SDKs, and API references for building, configuring, and deploying intelligent AI agents and networks on SVAHNAR.">
      
      <main style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '5rem' }}>
        
        {/* Hero Section */}
        <section style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: '1', minWidth: '340px' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ff6700', marginBottom: '1.25rem' }}>
              SVAHNAR Platform
            </div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 300, lineHeight: 1.1, marginBottom: '1.25rem', whiteSpace: 'pre-line' }}>
              Start building<br/>with SVAHNAR
            </h1>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.6, color: 'var(--ifm-color-emphasis-700)', marginBottom: '2.5rem', maxWidth: '440px' }}>
              Explore guides, SDKs, and walkthroughs to help you build, test, and deploy AI agents efficiently using the SVAHNAR Platform.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Link className="button button--secondary button--lg" to="/docs/GetStarted/Quickstart" style={{ borderRadius: '0.5rem', padding: '0.6rem 1.2rem', fontSize: '0.9rem', fontWeight: 500 }}>
                Quickstart
              </Link>
              <a className="button button--secondary button--lg" href="https://platform.svahnar.com" target="_blank" rel="noopener noreferrer" style={{ borderRadius: '0.5rem', padding: '0.6rem 1.2rem', fontSize: '0.9rem', fontWeight: 500 }}>
                Agent Console
              </a>
            </div>
          </div>
          
          <div style={{ flex: '1', minWidth: '340px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '560px', backgroundColor: 'var(--ifm-background-color)', borderRadius: '0.75rem', border: '1px solid var(--ifm-color-emphasis-200)', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--ifm-color-emphasis-200)', padding: '0.5rem 1rem' }}>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '0.375rem', backgroundColor: 'var(--ifm-color-emphasis-800)', color: 'var(--ifm-background-color)', border: 'none', fontWeight: 500 }}>Python</button>
                </div>
              </div>
              <div style={{ padding: '1.25rem', overflowX: 'auto', backgroundColor: 'var(--ifm-color-emphasis-0)' }}>
                <pre style={{ margin: 0, backgroundColor: 'transparent', color: 'inherit', fontSize: '0.9rem', fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
                  <code style={{ border: 'none', backgroundColor: 'transparent', padding: 0 }}>
                    <span style={{ color: '#CF222E' }}>from</span> svahnar <span style={{ color: '#CF222E' }}>import</span> Svahnar<br/><br/>
                    client = Svahnar()<br/><br/>
                    response = client.agents.create(<br/>
                    &nbsp;&nbsp;name=<span style={{ color: '#0A3069' }}>"Web Search Agent"</span>,<br/>
                    &nbsp;&nbsp;description=<span style={{ color: '#0A3069' }}>"Agent for searching the web"</span>,<br/>
                    &nbsp;&nbsp;deploy_to=<span style={{ color: '#0A3069' }}>"Organization"</span>,<br/>
                    &nbsp;&nbsp;yaml_content=Path(<span style={{ color: '#0A3069' }}>"agent.yaml"</span>)<br/>
                    )<br/>
                    <span style={{ color: '#0550AE' }}>print</span>(response)
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Agent Console Banner */}
        <section>
          <div className="console-banner">
            <div style={{ flex: '1 1 300px', padding: '3rem' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 400 }}>Agent Console</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--ifm-color-emphasis-700)', marginBottom: '2rem', lineHeight: 1.6 }}>
                Create your first AI Agent in seconds using the SVAHNAR Agent Console. Manage, monitor, and deploy with zero code.
              </p>
              <a href="https://platform.svahnar.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, color: '#ff6700', textDecoration: 'none' }}>
                Open Console <ArrowRight style={{ width: '1rem', height: '1rem' }} />
              </a>
            </div>
            <div style={{ flex: '2 1 400px', display: 'flex', justifyContent: 'flex-end', padding: '0' }}>
              <img src={AgentConsoleImg} alt="Agent Console" style={{ width: '100%', height: 'auto', borderLeft: '1px solid var(--ifm-color-emphasis-200)' }} />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section>
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ff6700', marginBottom: '0.5rem' }}>Platform Features</div>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 300, marginBottom: '0.75rem' }}>Explore SVAHNAR Features</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--ifm-color-emphasis-600)', maxWidth: '40rem', lineHeight: 1.6 }}>
              Pick the developer surface that matches your approach, and the infrastructure that fits your stack.
            </p>
          </div>
          
          <div className="feature-grid">
            <VersionedLink to="/docs/AgenticNetwork/introduction" className="feature-card">
              <div className="feature-card-header">
                <div className="feature-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="6" rx="1"></rect><rect x="3" y="15" width="6" height="6" rx="1"></rect><rect x="15" y="15" width="6" height="6" rx="1"></rect><path d="M12 9v6"></path><path d="M12 15H6v0"></path><path d="M12 15h6v0"></path></svg>
                </div>
                <h3>AI Framework</h3>
              </div>
              <p>Build and orchestrate single agents or agentic networks using the Python SDK.</p>
              <div className="feature-card-link">
                Learn Framework <ArrowRight className="arrow" />
              </div>
            </VersionedLink>

            <VersionedLink to="/docs/Agents/create_agent" className="feature-card">
              <div className="feature-card-header">
                <div className="feature-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>
                </div>
                <h3>Agents API</h3>
              </div>
              <p>Programmatically validate, test, run, and manage your AI agent instances.</p>
              <div className="feature-card-link">
                Explore API <ArrowRight className="arrow" />
              </div>
            </VersionedLink>

            <VersionedLink to="/docs/Keyvault" className="feature-card">
              <div className="feature-card-header">
                <div className="feature-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path></svg>
                </div>
                <h3>Keyvault</h3>
              </div>
              <p>Securely store, retrieve, and revoke credentials and API keys used by your agents.</p>
              <div className="feature-card-link">
                Secure Keys <ArrowRight className="arrow" />
              </div>
            </VersionedLink>

            <VersionedLink to="/docs/MCP/usage" className="feature-card">
              <div className="feature-card-header">
                <div className="feature-card-icon">
                  <svg viewBox="0 0 180 180" fill="none"><path d="M18 84.8528L85.8822 16.9706C95.2548 7.59798 110.451 7.59798 119.823 16.9706V16.9706C129.196 26.3431 129.196 41.5391 119.823 50.9117L68.5581 102.177" stroke="currentColor" strokeWidth="12" strokeLinecap="round"/><path d="M69.2652 101.47L119.823 50.9117C129.196 41.5391 144.392 41.5391 153.765 50.9117L154.118 51.2652C163.491 60.6378 163.491 75.8338 154.118 85.2063L92.7248 146.6C89.6006 149.724 89.6006 154.789 92.7248 157.913L105.331 170.52" stroke="currentColor" strokeWidth="12" strokeLinecap="round"/><path d="M102.853 33.9411L52.6482 84.1457C43.2756 93.5183 43.2756 108.714 52.6482 118.087V118.087C62.0208 127.459 77.2167 127.459 86.5893 118.087L136.794 67.8822" stroke="currentColor" strokeWidth="12" strokeLinecap="round"/></svg>
                </div>
                <h3>MCP</h3>
              </div>
              <p>Use Model Context Protocol to seamlessly connect agents to external tools and context.</p>
              <div className="feature-card-link">
                Configure MCP <ArrowRight className="arrow" />
              </div>
            </VersionedLink>

            <VersionedLink to="/docs/Tools/Understanding_Tools" className="feature-card">
              <div className="feature-card-header">
                <div className="feature-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                </div>
                <h3>Tools</h3>
              </div>
              <p>Equip your agents with Google Search, Finance APIs, and Human-in-the-Loop workflows.</p>
              <div className="feature-card-link">
                Equip Tools <ArrowRight className="arrow" />
              </div>
            </VersionedLink>

            <VersionedLink to="/docs/KnowledgeRepository/Overview" className="feature-card">
              <div className="feature-card-header">
                <div className="feature-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 21 19V5"></path><path d="M3 12A9 3 0 0 0 21 12"></path></svg>
                </div>
                <h3>Knowledge Repo</h3>
              </div>
              <p>Connect documents, file databases, and vector storage to agent memory.</p>
              <div className="feature-card-link">
                Connect Memory <ArrowRight className="arrow" />
              </div>
            </VersionedLink>

            <VersionedLink to="/docs/Connections/Overview" className="feature-card">
              <div className="feature-card-header">
                <div className="feature-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </div>
                <h3>OAuth Connections</h3>
              </div>
              <p>Set up Slack, Google, GitHub, Outlook, and other OAuth integration services.</p>
              <div className="feature-card-link">
                Manage OAuth <ArrowRight className="arrow" />
              </div>
            </VersionedLink>

            <VersionedLink to="/docs/additional/YAML_Conversion_Guide" className="feature-card">
              <div className="feature-card-header">
                <div className="feature-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                </div>
                <h3>Guides & Resources</h3>
              </div>
              <p>Access conversion guides, configuration schemas, and other resources.</p>
              <div className="feature-card-link">
                View Resources <ArrowRight className="arrow" />
              </div>
            </VersionedLink>

          </div>
        </section>

      </main>
    </Layout>
  );
}
