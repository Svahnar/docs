import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const scrollActiveSidebarItem = () => {
  if (!ExecutionEnvironment.canUseDOM) {
    return;
  }

  // Function to find and scroll to the active link
  const attemptScroll = () => {
    const activeLink = document.querySelector('.menu__link--active');
    if (activeLink) {
      activeLink.scrollIntoView({ block: 'center', behavior: 'instant' });
      return true;
    }
    return false;
  };

  // Try immediately
  if (attemptScroll()) return;

  // Retry for a short period to handle hydration/rendering delays
  const intervalId = setInterval(() => {
    if (attemptScroll()) {
      clearInterval(intervalId);
    }
  }, 100);

  // Stop trying after 2 seconds
  setTimeout(() => clearInterval(intervalId), 2000);
};

const ClientModule = {
  onRouteDidUpdate({ location, previousLocation }) {
    if (location.pathname !== previousLocation?.pathname) {
        // Use smooth scroll for navigation updates
        const activeLink = document.querySelector('.menu__link--active');
        if (activeLink) {
            activeLink.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
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
