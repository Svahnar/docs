import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [
  //   {
  //     type: 'autogenerated', dirName: '.'}
  // ],

  // But you can create a sidebar manually
  
  docSidebar: [
    {
      type: 'html',
      value: '<div style="margin-top: 12px; font-size: 14px; font-weight: bold;">GET STARTED</div>',
      defaultStyle: true,
    },
    'GetStarted/Overview',
    'GetStarted/Quickstart',
    'GetStarted/Models',
    {
      type: 'html',
      value: '<div style="margin-top: 12px; font-size: 14px; font-weight: bold;">AGENTS</div>',
      defaultStyle: true,
    },
    'Agents/validate_config',
    'Agents/test_agent',
    'Agents/create_agent',
    'Agents/run_agent',
    'Agents/get_agent_details',
    'Agents/list_agents',
    'Agents/update_agent_info',
    'Agents/delete_agent',

    {
      type: 'html',
      value: '<div style="margin-top: 12px; font-size: 14px; font-weight: bold;">AGENTIC NETWORK</div>',
      defaultStyle: true,
    },
    'AgenticNetwork/introduction',
    'AgenticNetwork/Create_simple_agent',
    'AgenticNetwork/Create_agentic_network',
    {
      type: 'category',
      label: 'Configuration',
      collapsed: false,
      items: [
        'AgenticNetwork/Configuration/Initialization',
        'AgenticNetwork/Configuration/LLM',
        'AgenticNetwork/Configuration/Tools',
        'AgenticNetwork/Configuration/Agent_function',
        'AgenticNetwork/Configuration/Edges',
      ],
    },
    'AgenticNetwork/Agent_configuration',
  ],
};

export default sidebars;
