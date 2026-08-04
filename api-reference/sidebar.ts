import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "svahnar-api",
    },
    {
      type: "category",
      label: "Agent Operations",
      items: [
        {
          type: "doc",
          id: "run-agent-v-1-agents-run-post",
          label: "Run a deployed Agent",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "test-agent-v-1-agents-test-post",
          label: "Test an Agent with YAML configuration",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "validate-agent-v-1-agents-validate-post",
          label: "Validate Agent YAML configuration",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Agent Management",
      items: [
        {
          type: "doc",
          id: "create-agent-v-1-agents-create-post",
          label: "Create a new Agent",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "delete-agent-v-1-agents-delete-delete",
          label: "Delete an Agent",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "delete-many-agents-v-1-agents-bulk-delete-delete",
          label: "Bulk delete Agents",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "get-agent-details-v-1-agents-get-agent-agent-id-get",
          label: "Get Agent details",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "download-agent-yaml-v-1-agents-download-agent-agent-id-get",
          label: "Download Agent YAML configuration",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "list-agents-v-1-agents-list-agents-get",
          label: "List all Agents",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "update-agent-v-1-agents-update-put",
          label: "Update Agent",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Credits",
      items: [
        {
          type: "doc",
          id: "get-credits-endpoint-v-1-credits-get-get",
          label: "Get remaining credits",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Auth",
      items: [
        {
          type: "doc",
          id: "auth-login-v-1-auth-login-post",
          label: "Login",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
