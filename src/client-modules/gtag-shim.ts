import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  if (typeof window !== 'undefined') {
    // @ts-ignore
    window.gtag = window.gtag || function () {};
  }
}

export default {};
