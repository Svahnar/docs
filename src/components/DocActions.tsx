import React, { useState, useEffect, useRef } from 'react';
import {
  FaXTwitter,
  FaLinkedin,
  FaFacebook,
  FaWhatsapp,
  FaRedditAlien,
  FaEnvelope,
  FaShare,
} from 'react-icons/fa6';

export default function DocActions(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [markdownText, setMarkdownText] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpenShare = () => {
    setShowShareModal(true);
    setIsOpen(false);
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper to get absolute production-ready URL
  const getAbsoluteUrl = () => {
    if (typeof window === 'undefined') return '';
    let url = window.location.href;
    // Replace local addresses with production docs URL so AI models can crawl it
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      url = url.replace(window.location.origin, 'https://docs.svahnar.com');
    }
    return url;
  };

  // Helper to get a clean page title (without Docusaurus site suffixes like " | SVAHNAR Docs")
  const getCleanTitle = () => {
    if (typeof document === 'undefined') return 'SVAHNAR Docs';
    const title = document.title;
    const parts = title.split(/[|•-]/);
    if (parts.length > 1) {
      const mainTitle = parts[0].trim();
      return mainTitle || title;
    }
    return title;
  };

  // Helper to extract markdown client-side
  const getMarkdownContent = () => {
    if (typeof window === 'undefined') return '';
    const article = document.querySelector('article');
    if (!article) return '';

    let markdown = '';

    function walk(node: Node) {
      if (node.nodeType === Node.TEXT_NODE) {
        markdown += node.nodeValue;
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;

      const el = node as HTMLElement;
      
      // Skip unwanted elements like TOC, hash links, buttons, wrapper components
      if (
        el.classList.contains('hash-link') ||
        el.classList.contains('toc') ||
        el.classList.contains('doc-actions-wrapper') ||
        el.classList.contains('markdown-modal-overlay') ||
        el.classList.contains('doc-actions-toast') ||
        el.tagName === 'BUTTON'
      ) {
        return;
      }

      switch (el.tagName) {
        case 'H1': markdown += '\n\n# '; break;
        case 'H2': markdown += '\n\n## '; break;
        case 'H3': markdown += '\n\n### '; break;
        case 'H4': markdown += '\n\n#### '; break;
        case 'H5': markdown += '\n\n##### '; break;
        case 'H6': markdown += '\n\n###### '; break;
        case 'P': markdown += '\n\n'; break;
        case 'STRONG':
        case 'B': markdown += '**'; break;
        case 'EM':
        case 'I': markdown += '*'; break;
        case 'CODE':
          if (el.parentElement?.tagName !== 'PRE') {
            markdown += '`';
          }
          break;
        case 'PRE':
          const codeEl = el.querySelector('code');
          const lang = codeEl?.className?.replace('language-', '') || '';
          const codeText = el.innerText || '';
          markdown += `\n\n\`\`\`${lang}\n${codeText}\n\`\`\`\n\n`;
          return; // Skip walking children of PRE
        case 'TABLE':
          const rows = Array.from(el.querySelectorAll('tr'));
          let tableMd = '\n\n';
          rows.forEach((row, rowIndex) => {
            const cells = Array.from(row.querySelectorAll('th, td'));
            const cellTexts = cells.map(cell => (cell as HTMLElement).innerText.replace(/\n/g, ' '));
            tableMd += '| ' + cellTexts.join(' | ') + ' |\n';
            if (rowIndex === 0) {
              tableMd += '| ' + cells.map(() => '---').join(' | ') + ' |\n';
            }
          });
          markdown += tableMd + '\n';
          return; // Skip walking children of TABLE
        case 'LI': markdown += '\n- '; break;
        case 'A': markdown += '['; break;
      }

      for (let i = 0; i < el.childNodes.length; i++) {
        walk(el.childNodes[i]);
      }

      switch (el.tagName) {
        case 'STRONG':
        case 'B': markdown += '**'; break;
        case 'EM':
        case 'I': markdown += '*'; break;
        case 'CODE':
          if (el.parentElement?.tagName !== 'PRE') {
            markdown += '`';
          }
          break;
        case 'A':
          const href = el.getAttribute('href') || '';
          markdown += `](${href})`;
          break;
      }
    }

    walk(article);
    return markdown.replace(/\n{3,}/g, '\n\n').trim();
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleCopy = () => {
    const md = getMarkdownContent();
    if (!md) {
      showToast('Error: No content found to copy.');
      return;
    }
    navigator.clipboard.writeText(md).then(
      () => {
        showToast('Markdown copied to clipboard!');
        setIsOpen(false);
      },
      () => showToast('Failed to copy. Please use the View Markdown option.')
    );
  };

  const handleOpenChatGPT = () => {
    const pageUrl = getAbsoluteUrl();
    const promptText = `Read from ${pageUrl} so I can ask questions about it.`;
    const targetUrl = `https://chatgpt.com/?q=${encodeURIComponent(promptText)}`;
    window.open(targetUrl, '_blank');
    setIsOpen(false);
  };

  const handleOpenClaude = () => {
    const pageUrl = getAbsoluteUrl();
    const promptText = `Read from ${pageUrl} so I can ask questions about it.`;
    const targetUrl = `https://claude.ai/new?q=${encodeURIComponent(promptText)}`;
    window.open(targetUrl, '_blank');
    setIsOpen(false);
  };

  const handleViewMarkdown = () => {
    const md = getMarkdownContent();
    setMarkdownText(md);
    setShowModal(true);
    setIsOpen(false);
  };

  return (
    <>
      <div className="doc-actions-wrapper" ref={dropdownRef}>
        <div className="doc-actions-container">
          <div className="doc-actions-split">
            <button className="doc-actions-main-btn" onClick={handleCopy} title="Copy page as clean Markdown">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy page
            </button>
            <div className="doc-actions-divider"></div>
            <button 
              className="doc-actions-toggle-btn" 
              onClick={() => setIsOpen(!isOpen)} 
              title="More actions for LLMs & AI Agents"
              aria-expanded={isOpen}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '12px', height: '12px' }}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>

          <button 
            className="doc-actions-share-btn" 
            onClick={() => setShowShareModal(true)} 
            title="Share this page"
          >
            <FaShare size={12} style={{ marginRight: '4px' }} />
            Share
          </button>
        </div>

        {isOpen && (
          <div className="doc-actions-dropdown-menu">
            <button className="doc-actions-dropdown-item" onClick={handleViewMarkdown}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              View Markdown
            </button>
            <button className="doc-actions-dropdown-item" onClick={handleOpenChatGPT}>
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M14.949 6.547a3.94 3.94 0 0 0-.348-3.273 4.11 4.11 0 0 0-4.4-1.934A4.1 4.1 0 0 0 8.423.2 4.15 4.15 0 0 0 6.305.086a4.1 4.1 0 0 0-1.891.948 4.04 4.04 0 0 0-1.158 1.753 4.1 4.1 0 0 0-1.563.679A4 4 0 0 0 .554 4.72a3.99 3.99 0 0 0 .502 4.731 3.94 3.94 0 0 0 .346 3.274 4.11 4.11 0 0 0 4.402 1.933c.382.425.852.764 1.377.995.526.231 1.095.35 1.67.346 1.78.002 3.358-1.132 3.901-2.804a4.1 4.1 0 0 0 1.563-.68 4 4 0 0 0 1.14-1.253 3.99 3.99 0 0 0-.506-4.716m-6.097 8.406a3.05 3.05 0 0 1-1.945-.694l.096-.054 3.23-1.838a.53.53 0 0 0 .265-.455v-4.49l1.366.778q.02.011.025.035v3.722c-.003 1.653-1.361 2.992-3.037 2.996m-6.53-2.75a2.95 2.95 0 0 1-.36-2.01l.095.057L5.29 12.09a.53.53 0 0 0 .527 0l3.949-2.246v1.555a.05.05 0 0 1-.022.041L6.473 13.3c-1.454.826-3.311.335-4.15-1.098m-.85-6.94A3.02 3.02 0 0 1 3.07 3.949v3.785a.51.51 0 0 0 .262.451l3.93 2.237-1.366.779a.05.05 0 0 1-.048 0L2.585 9.342a2.98 2.98 0 0 1-1.113-4.094zm11.216 2.571L8.747 5.576l1.362-.776a.05.05 0 0 1 .048 0l3.265 1.86a3 3 0 0 1 1.173 1.207 2.96 2.96 0 0 1-.27 3.2 3.05 3.05 0 0 1-1.36.997V8.279a.52.52 0 0 0-.276-.445m1.36-2.015-.097-.057-3.226-1.855a.53.53 0 0 0-.53 0L6.249 6.153V4.598a.04.04 0 0 1 .019-.04L9.533 2.7a3.07 3.07 0 0 1 3.257.139c.474.325.843.778 1.066 1.303.223.526.289 1.103.191 1.664zM5.503 8.575l-1.364-.775a.05.05 0 0 1-.026-.037V4.049c.003-1.653 1.36-2.992 3.037-2.996a3.05 3.05 0 0 1 1.945.694l-.096.054-3.23 1.838a.53.53 0 0 0-.265.455z"/>
              </svg>
              Open in ChatGPT
            </button>
            <button className="doc-actions-dropdown-item" onClick={handleOpenClaude}>
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="m3.127 10.604 3.135-1.76.053-.153-.053-.085H6.11l-.525-.032-1.791-.048-1.554-.065-1.505-.08-.38-.081L0 7.832l.036-.234.32-.214.455.04 1.009.069 1.513.105 1.097.064 1.626.17h.259l.036-.105-.089-.065-.068-.064-1.566-1.062-1.695-1.121-.887-.646-.48-.327-.243-.306-.104-.67.435-.48.585.04.15.04.593.456 1.267.981 1.654 1.218.242.202.097-.068.012-.049-.109-.181-.9-1.626-.96-1.655-.428-.686-.113-.411a2 2 0 0 1-.068-.484l.496-.674L4.446 0l.662.089.279.242.411.94.666 1.48 1.033 2.014.302.597.162.553.06.17h.105v-.097l.085-1.134.157-1.392.154-1.792.052-.504.25-.605.497-.327.387.186.319.456-.045.294-.19 1.23-.37 1.93-.243 1.29h.142l.161-.16.654-.868 1.097-1.372.484-.545.565-.601.363-.287h.686l.505.751-.226.775-.707.895-.585.759-.839 1.13-.524.904.048.072.125-.012 1.897-.403 1.024-.186 1.223-.21.553.258.06.263-.218.536-1.307.323-1.533.307-2.284.54-.028.02.032.04 1.029.098.44.024h1.077l2.005.15.525.346.315.424-.053.323-.807.411-3.631-.863-.872-.218h-.12v.073l.726.71 1.331 1.202 1.667 1.55.084.383-.214.302-.226-.032-1.464-1.101-.565-.497-1.28-1.077h-.084v.113l.295.432 1.557 2.34.08.718-.112.234-.404.141-.444-.08-.911-1.28-.94-1.44-.759-1.291-.093.053-.448 4.821-.21.246-.484.186-.403-.307-.214-.496.214-.98.258-1.28.21-1.016.19-1.263.112-.42-.008-.028-.092.012-.953 1.307-1.448 1.957-1.146 1.227-.274.109-.477-.247.045-.44.266-.39 1.586-2.018.956-1.25.617-.723-.004-.105h-.036l-4.212Z"/>
              </svg>
              Open in Claude
            </button>
            <button className="doc-actions-dropdown-item" onClick={handleOpenShare}>
              <FaShare />
              Share Page
            </button>
            <a className="doc-actions-dropdown-item" href="/llms.txt" target="_blank" onClick={() => setIsOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              View llms.txt
            </a>
          </div>
        )}
      </div>

      {showModal && (
        <div className="markdown-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="markdown-modal" onClick={(e) => e.stopPropagation()}>
            <div className="markdown-modal-header">
              <h3>Page Markdown Source (for LLMs / AI Agents)</h3>
              <button className="markdown-modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="markdown-modal-content">
              <textarea
                className="markdown-modal-textarea"
                readOnly
                value={markdownText}
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
              <p style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-500)', marginTop: '8px', marginBottom: 0 }}>
                💡 Tip: Click inside the box to auto-select all text.
              </p>
            </div>
            <div className="markdown-modal-footer">
              <button className="doc-actions-modal-btn doc-actions-modal-btn-primary" onClick={() => {
                navigator.clipboard.writeText(markdownText).then(() => {
                  showToast('Markdown copied!');
                  setShowModal(false);
                });
              }}>
                Copy & Close
              </button>
              <button className="doc-actions-modal-btn doc-actions-modal-btn-secondary" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showShareModal && (
        <div className="markdown-modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="markdown-modal" onClick={(e) => e.stopPropagation()}>
            <div className="markdown-modal-header">
              <h3>Share this page</h3>
              <button className="markdown-modal-close" onClick={() => setShowShareModal(false)}>×</button>
            </div>
            <div className="markdown-modal-content">
              {/* Copy Link Section */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>
                  Copy Link
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    className="doc-actions-input"
                    readOnly
                    value={getAbsoluteUrl()}
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <button
                    className="doc-actions-modal-btn doc-actions-modal-btn-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(getAbsoluteUrl()).then(() => {
                        showToast('Link copied!');
                      });
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* Social Media Grid */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '12px' }}>
                  Share to social media
                </label>
                <div className="share-social-grid" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    href={`https://x.com/intent/tweet?url=${encodeURIComponent(getAbsoluteUrl())}&text=${encodeURIComponent(`Check out ${getCleanTitle()} on SVAHNAR! 🚀`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-social-btn x-twitter"
                    title="Share on X"
                  >
                    <FaXTwitter size={20} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getAbsoluteUrl())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-social-btn linkedin"
                    title="Share on LinkedIn"
                  >
                    <FaLinkedin size={20} />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getAbsoluteUrl())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-social-btn facebook"
                    title="Share on Facebook"
                  >
                    <FaFacebook size={20} />
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${getCleanTitle()} 🚀 ${getAbsoluteUrl()}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-social-btn whatsapp"
                    title="Share on WhatsApp"
                  >
                    <FaWhatsapp size={20} />
                  </a>
                  <a
                    href={`https://www.reddit.com/submit?url=${encodeURIComponent(getAbsoluteUrl())}&title=${encodeURIComponent(getCleanTitle())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-social-btn reddit"
                    title="Share on Reddit"
                  >
                    <FaRedditAlien size={20} />
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(getCleanTitle())}&body=${encodeURIComponent(`I found this useful page on SVAHNAR:\n\n${getAbsoluteUrl()}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-social-btn email"
                    title="Share via Email"
                  >
                    <FaEnvelope size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="doc-actions-toast">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          {toastMessage}
        </div>
      )}
    </>
  );
}
