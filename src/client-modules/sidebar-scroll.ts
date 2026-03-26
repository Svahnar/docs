import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const performManualScroll = (smooth: boolean = false) => {
  // Target the actual scrollable menu container
  const sidebarNav = document.querySelector('.theme-doc-sidebar-container nav.menu');
  if (!sidebarNav) return false;

  const activeLinks = sidebarNav.querySelectorAll('.menu__link--active');
  const activeLink = activeLinks[activeLinks.length - 1] as HTMLElement;
  if (!activeLink) return false;

  // Calculate target offsetTop relative to the nav container
  let targetTop = activeLink.offsetTop;
  let parent = activeLink.offsetParent as HTMLElement;
  
  // Traverse up to the scrollable nav
  while (parent && parent !== sidebarNav && sidebarNav.contains(parent)) {
    targetTop += parent.offsetTop;
    parent = parent.offsetParent as HTMLElement;
  }

  const containerHeight = sidebarNav.clientHeight;
  const targetScroll = targetTop - (containerHeight / 2) + (activeLink.clientHeight / 2);

  sidebarNav.scrollTo({
    top: Math.max(0, targetScroll),
    behavior: smooth ? 'smooth' : 'instant',
  });
  
  return true;
};

const scrollActiveSidebarItem = () => {
  if (!ExecutionEnvironment.canUseDOM) {
    return;
  }

  // Use a slight delay to ensure Docusaurus's built-in scroll restoration has finished
  setTimeout(() => {
    const attemptScroll = () => performManualScroll(false);
    if (!attemptScroll()) {
      const intervalId = setInterval(() => {
        if (attemptScroll()) {
          clearInterval(intervalId);
        }
      }, 100);
      setTimeout(() => clearInterval(intervalId), 1500);
    }
  }, 200); // 200ms delay for stability
};

const ClientModule = {
  onRouteDidUpdate({ location, previousLocation }) {
    if (location.pathname !== previousLocation?.pathname) {
        // Use smooth scroll for transitions, with a small delay for DOM stability
        setTimeout(() => {
            const sidebar = document.querySelector('.theme-doc-sidebar-container nav.menu');
            const activeLinks = sidebar?.querySelectorAll('.menu__link--active');
            const activeLink = activeLinks?.[activeLinks.length - 1] as HTMLElement;
            if (sidebar && activeLink) {
                const sidebarRect = sidebar.getBoundingClientRect();
                const linkRect = activeLink.getBoundingClientRect();
                const relativeTop = linkRect.top - sidebarRect.top + sidebar.scrollTop;
                const targetScroll = relativeTop - (sidebarRect.height / 2) + (linkRect.height / 2);
                sidebar.scrollTo({ top: targetScroll, behavior: 'smooth' });
            }
        }, 100);
    }
  },
};

if (ExecutionEnvironment.canUseDOM) {
  // Run on initial load
  window.addEventListener('load', scrollActiveSidebarItem);
  // Also try on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', scrollActiveSidebarItem);
}

export default ClientModule;
