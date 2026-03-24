#!/usr/bin/env python3
"""
Bulk-inject SEO front matter into Docusaurus MDX pages.
Only adds front matter to files that don't already have a `description:` field.
"""

import os
import re

DOCS_DIR = "/home/ubuntu/svahnar/docs/docs"

# Map: relative path (from DOCS_DIR) -> front matter dict
FRONTMATTER_MAP = {
    # ── GetStarted ──────────────────────────────────────────────────────────
    "GetStarted/Overview.mdx": {
        "title": "Overview",
        "description": "Get an overview of SVAHNAR, the AI agent platform for building, deploying, and managing intelligent agents at scale.",
        "keywords": ["svahnar", "ai agent platform", "overview", "get started", "introduction"],
    },
    "GetStarted/Quickstart.mdx": {
        "title": "Quickstart",
        "description": "Start building with SVAHNAR in minutes. Follow this quickstart to create, configure, and run your first AI agent.",
        "keywords": ["quickstart", "svahnar", "ai agent", "get started", "tutorial"],
    },
    "GetStarted/Models.mdx": {
        "title": "Models",
        "description": "Explore the large language models (LLMs) supported by SVAHNAR, including GPT-4, Claude, Gemini, and more.",
        "keywords": ["ai models", "llm", "gpt-4", "claude", "gemini", "svahnar models"],
    },
    # ── AgenticNetwork ──────────────────────────────────────────────────────
    "AgenticNetwork/introduction.mdx": {
        "title": "Introduction",
        "description": "Learn the fundamentals of SVAHNAR's AI framework and how agentic networks enable multi-agent orchestration.",
        "keywords": ["agentic network", "ai framework", "multi-agent", "svahnar", "introduction"],
    },
    "AgenticNetwork/Create_simple_agent.mdx": {
        "title": "Create Simple Agent",
        "description": "Step-by-step guide to creating a simple AI agent on SVAHNAR using YAML configuration.",
        "keywords": ["create agent", "simple agent", "yaml config", "svahnar", "ai agent tutorial"],
    },
    "AgenticNetwork/Create_agentic_network.mdx": {
        "title": "Create Agentic Network",
        "description": "Learn how to build and configure multi-agent networks on SVAHNAR for complex, collaborative AI workflows.",
        "keywords": ["agentic network", "multi-agent", "workflow", "svahnar", "agent orchestration"],
    },
    "AgenticNetwork/Agent_configuration.mdx": {
        "title": "Agent Configuration",
        "description": "Complete reference for configuring AI agents on SVAHNAR, including LLM settings, tools, edges, and agent functions.",
        "keywords": ["agent configuration", "yaml", "svahnar", "llm config", "agent settings"],
    },
    "AgenticNetwork/Configuration/Initialization.mdx": {
        "title": "Initialization",
        "description": "Learn how to configure the initialization settings for your SVAHNAR AI agents.",
        "keywords": ["agent initialization", "configuration", "svahnar", "setup", "ai agent"],
    },
    "AgenticNetwork/Configuration/LLM.mdx": {
        "title": "LLM",
        "description": "Configure the large language model (LLM) for your SVAHNAR agents, including model selection, temperature, and parameters.",
        "keywords": ["llm configuration", "ai model", "gpt", "claude", "svahnar", "language model"],
    },
    "AgenticNetwork/Configuration/Tools.mdx": {
        "title": "Tools",
        "description": "Learn how to configure and assign tools to your SVAHNAR agents for enhanced capabilities.",
        "keywords": ["tools configuration", "agent tools", "svahnar", "tool setup", "ai tools"],
    },
    "AgenticNetwork/Configuration/Agent_function.mdx": {
        "title": "Agent Function",
        "description": "Configure agent functions in SVAHNAR to control agent behavior, prompts, and decision logic.",
        "keywords": ["agent function", "configuration", "svahnar", "prompt", "agent behavior"],
    },
    "AgenticNetwork/Configuration/Edges.mdx": {
        "title": "Edges",
        "description": "Configure edges in SVAHNAR agentic networks to define routing logic and agent-to-agent communication.",
        "keywords": ["edges", "agent routing", "agentic network", "svahnar", "workflow routing"],
    },
    # ── Agents ──────────────────────────────────────────────────────────────
    "Agents/validate_config.mdx": {
        "title": "Validate Agent",
        "description": "Learn how to validate your SVAHNAR agent YAML configuration before deployment to catch errors early.",
        "keywords": ["validate agent", "yaml validation", "svahnar", "config check", "agent setup"],
    },
    "Agents/test_agent.mdx": {
        "title": "Test Agent",
        "description": "Learn how to test your SVAHNAR AI agent to verify its behavior, responses, and tool usage before going live.",
        "keywords": ["test agent", "svahnar", "agent testing", "qa", "ai agent debug"],
    },
    "Agents/create_agent.mdx": {
        "title": "Create Agent",
        "description": "Follow this guide to create and deploy an AI agent on SVAHNAR using the console or YAML configuration.",
        "keywords": ["create agent", "svahnar", "deploy agent", "ai agent", "new agent"],
    },
    "Agents/run_agent.mdx": {
        "title": "Run Agent",
        "description": "Learn how to run and execute your SVAHNAR AI agent, trigger workflows, and monitor real-time responses.",
        "keywords": ["run agent", "execute agent", "svahnar", "ai agent", "agent execution"],
    },
    "Agents/get_agent_details.mdx": {
        "title": "Get Agent Details",
        "description": "Retrieve detailed information about a specific SVAHNAR AI agent, including its configuration and status.",
        "keywords": ["get agent", "agent details", "svahnar", "agent info", "view agent"],
    },
    "Agents/list_agents.mdx": {
        "title": "List All Agents",
        "description": "View and manage all your AI agents on the SVAHNAR platform from a single list view.",
        "keywords": ["list agents", "agent management", "svahnar", "all agents", "agent dashboard"],
    },
    "Agents/update_agent_info.mdx": {
        "title": "Update Agent",
        "description": "Learn how to update the configuration, name, and settings of an existing SVAHNAR AI agent.",
        "keywords": ["update agent", "edit agent", "svahnar", "agent settings", "modify agent"],
    },
    "Agents/delete_agent.mdx": {
        "title": "Delete Agent",
        "description": "Learn how to permanently delete an AI agent from your SVAHNAR workspace.",
        "keywords": ["delete agent", "remove agent", "svahnar", "agent management"],
    },
    # ── Knowledge Repository ─────────────────────────────────────────────
    "Knowledge Repository/Overview.mdx": {
        "title": "Knowledge Repository",
        "description": "Learn how SVAHNAR's Knowledge Repository enables Retrieval-Augmented Generation (RAG) for your AI agents with semantic search.",
        "keywords": ["knowledge repository", "rag", "retrieval augmented generation", "svahnar", "semantic search"],
    },
    "Knowledge Repository/Connectors/URL.mdx": {
        "title": "URL",
        "description": "Connect web URLs as a knowledge source for your SVAHNAR Knowledge Repository to enable URL-based RAG.",
        "keywords": ["url connector", "knowledge repository", "svahnar", "rag", "web content"],
    },
    "Knowledge Repository/Connectors/AWS S3.mdx": {
        "title": "AWS S3",
        "description": "Connect your AWS S3 buckets as a knowledge source for SVAHNAR's Knowledge Repository and RAG pipelines.",
        "keywords": ["aws s3", "s3 connector", "knowledge repository", "svahnar", "rag"],
    },
    "Knowledge Repository/Connectors/Confluence.mdx": {
        "title": "Confluence",
        "description": "Integrate Atlassian Confluence as a knowledge source for SVAHNAR's AI agents via the Knowledge Repository.",
        "keywords": ["confluence connector", "atlassian", "knowledge repository", "svahnar", "rag"],
    },
    "Knowledge Repository/Connectors/Sharepoint.mdx": {
        "title": "SharePoint",
        "description": "Connect Microsoft SharePoint as a knowledge source for SVAHNAR's Knowledge Repository and AI agent RAG workflows.",
        "keywords": ["sharepoint connector", "microsoft", "knowledge repository", "svahnar", "rag"],
    },
    # ── Tools ────────────────────────────────────────────────────────────────
    "Tools/Understanding_Tools.mdx": {
        "title": "Understanding Tools",
        "description": "Learn how tools work in SVAHNAR AI agents, including how LLMs call tools to take real-world actions.",
        "keywords": ["ai tools", "agent tools", "svahnar", "tool calling", "llm tools"],
    },
    "Tools/list_of_tools.mdx": {
        "title": "List of Tools",
        "description": "Browse the complete list of tools available in SVAHNAR, from web search and databases to CRM, email, and more.",
        "keywords": ["tools list", "svahnar tools", "ai agent tools", "integrations", "plugins"],
    },
    # ── Tools / ToolList ─────────────────────────────────────────────────────
    "Tools/ToolList/API.mdx": {
        "title": "API",
        "description": "Configure the SVAHNAR API tool to let your agents make custom HTTP requests to any external REST API.",
        "keywords": ["api tool", "http requests", "rest api", "svahnar", "agent integration"],
    },
    "Tools/ToolList/Arxiv.mdx": {
        "title": "Arxiv",
        "description": "Enable SVAHNAR agents to search and retrieve academic papers from Arxiv for research and analysis workflows.",
        "keywords": ["arxiv", "academic papers", "research tool", "svahnar", "ai agent"],
    },
    "Tools/ToolList/AWS_Lambda.mdx": {
        "title": "AWS Lambda",
        "description": "Trigger AWS Lambda serverless functions directly from your SVAHNAR AI agents for custom backend logic.",
        "keywords": ["aws lambda", "serverless", "function execution", "svahnar", "agent tool"],
    },
    "Tools/ToolList/AWS_SES_send_email.mdx": {
        "title": "AWS SES",
        "description": "Send transactional emails from your SVAHNAR AI agents using Amazon Simple Email Service (SES).",
        "keywords": ["aws ses", "send email", "amazon ses", "svahnar", "email automation"],
    },
    "Tools/ToolList/Calendly.mdx": {
        "title": "Calendly",
        "description": "Automate scheduling and meeting management with the SVAHNAR Calendly tool integration for AI agents.",
        "keywords": ["calendly", "scheduling", "meeting automation", "svahnar", "calendar tool"],
    },
    "Tools/ToolList/DatabaseTool.mdx": {
        "title": "Database Tool",
        "description": "Enable SVAHNAR AI agents to read and write to databases using the Database Tool with full SQL support.",
        "keywords": ["database tool", "sql", "query database", "svahnar", "agent database"],
    },
    "Tools/ToolList/DatabaseToolReadOnly.mdx": {
        "title": "Database Tool (Read-Only)",
        "description": "Allow SVAHNAR AI agents to safely query databases in read-only mode without risk of data modification.",
        "keywords": ["database read only", "sql", "read only queries", "svahnar", "safe database"],
    },
    "Tools/ToolList/Discord.mdx": {
        "title": "Discord",
        "description": "Send messages and interact with Discord channels directly from your SVAHNAR AI agents.",
        "keywords": ["discord tool", "discord bot", "messaging", "svahnar", "agent communication"],
    },
    "Tools/ToolList/GitHubTool.mdx": {
        "title": "GitHub",
        "description": "Manage GitHub repositories, issues, and pull requests directly from your SVAHNAR AI agents.",
        "keywords": ["github tool", "repository", "code management", "svahnar", "git integration"],
    },
    "Tools/ToolList/Gitlab.mdx": {
        "title": "GitLab",
        "description": "Connect your SVAHNAR AI agents to GitLab to manage repositories, pipelines, and issues programmatically.",
        "keywords": ["gitlab tool", "devops", "ci cd", "svahnar", "git integration"],
    },
    "Tools/ToolList/Google calendar.mdx": {
        "title": "Google Calendar",
        "description": "Let your SVAHNAR AI agents create, update, and manage Google Calendar events and schedules automatically.",
        "keywords": ["google calendar", "calendar automation", "scheduling", "svahnar", "agent tool"],
    },
    "Tools/ToolList/Google drive.mdx": {
        "title": "Google Drive",
        "description": "Enable SVAHNAR AI agents to read, write, and manage files and folders in Google Drive.",
        "keywords": ["google drive", "file management", "google workspace", "svahnar", "agent tool"],
    },
    "Tools/ToolList/Google finance.mdx": {
        "title": "Google Finance",
        "description": "Fetch real-time and historical stock market data via Google Finance in your SVAHNAR AI agents.",
        "keywords": ["google finance", "stock data", "market data", "svahnar", "finance tool"],
    },
    "Tools/ToolList/Google flight.mdx": {
        "title": "Google Flights",
        "description": "Search for flights and travel data using Google Flights within your SVAHNAR AI agent workflows.",
        "keywords": ["google flights", "flight search", "travel", "svahnar", "agent tool"],
    },
    "Tools/ToolList/Google hotel.mdx": {
        "title": "Google Hotels",
        "description": "Search for hotels and accommodation options using Google Hotels within your SVAHNAR AI agents.",
        "keywords": ["google hotels", "hotel search", "accommodation", "svahnar", "travel tool"],
    },
    "Tools/ToolList/Google Mail.mdx": {
        "title": "Gmail",
        "description": "Read, send, and manage Gmail emails directly from your SVAHNAR AI agents with full OAuth integration.",
        "keywords": ["gmail tool", "google mail", "email automation", "svahnar", "google workspace"],
    },
    "Tools/ToolList/Google scholar.mdx": {
        "title": "Google Scholar",
        "description": "Enable SVAHNAR AI agents to search academic research and citations via Google Scholar.",
        "keywords": ["google scholar", "academic research", "citations", "svahnar", "research tool"],
    },
    "Tools/ToolList/Google Jobs.mdx": {
        "title": "Google Jobs",
        "description": "Search and retrieve job listings from Google Jobs within your SVAHNAR AI agent workflows.",
        "keywords": ["google jobs", "job search", "recruitment", "svahnar", "agent tool"],
    },
    "Tools/ToolList/HubSpot.mdx": {
        "title": "HubSpot",
        "description": "Connect your SVAHNAR AI agents to HubSpot CRM to manage contacts, deals, and marketing workflows.",
        "keywords": ["hubspot", "crm", "marketing automation", "svahnar", "sales tool"],
    },
    "Tools/ToolList/JiraTool.mdx": {
        "title": "Jira",
        "description": "Create, update, and manage Jira issues and projects directly from your SVAHNAR AI agents.",
        "keywords": ["jira tool", "project management", "atlassian", "svahnar", "issue tracking"],
    },
    "Tools/ToolList/KnowledgeRepo.mdx": {
        "title": "Knowledge Repo",
        "description": "Enable SVAHNAR AI agents to perform semantic search over your Knowledge Repositories for RAG workflows.",
        "keywords": ["knowledge repo", "semantic search", "rag", "svahnar", "vector search"],
    },
    "Tools/ToolList/Notion.mdx": {
        "title": "Notion",
        "description": "Manage Notion pages, databases, and blocks directly from your SVAHNAR AI agents with full API integration.",
        "keywords": ["notion tool", "notion api", "workspace automation", "svahnar", "productivity"],
    },
    "Tools/ToolList/Outlook.mdx": {
        "title": "Outlook & Calendar",
        "description": "Read, send, and manage Microsoft Outlook emails and calendar events from your SVAHNAR AI agents.",
        "keywords": ["outlook tool", "microsoft outlook", "email automation", "calendar", "svahnar"],
    },
    "Tools/ToolList/Pinecone.mdx": {
        "title": "Pinecone",
        "description": "Perform semantic, lexical, and hybrid vector searches on Pinecone indexes from your SVAHNAR AI agents.",
        "keywords": ["pinecone", "vector search", "semantic search", "svahnar", "embeddings"],
    },
    "Tools/ToolList/Reddit.mdx": {
        "title": "Reddit",
        "description": "Search Reddit discussions, threads, and comments from your SVAHNAR AI agents for community insights.",
        "keywords": ["reddit tool", "reddit api", "community search", "svahnar", "social media"],
    },
    "Tools/ToolList/Salesforce.mdx": {
        "title": "Salesforce",
        "description": "Query and manage Salesforce CRM data, accounts, and opportunities directly from your SVAHNAR AI agents.",
        "keywords": ["salesforce tool", "crm", "salesforce api", "svahnar", "sales automation"],
    },
    "Tools/ToolList/Slack.mdx": {
        "title": "Slack",
        "description": "Send messages, read channels, and manage Slack workspaces directly from your SVAHNAR AI agents.",
        "keywords": ["slack tool", "slack api", "team messaging", "svahnar", "communication"],
    },
    "Tools/ToolList/Tavily.mdx": {
        "title": "Tavily",
        "description": "Empower SVAHNAR AI agents with real-time web search using Tavily, the search engine built for AI.",
        "keywords": ["tavily", "web search", "real-time search", "svahnar", "ai search"],
    },
    "Tools/ToolList/Twilio_sms.mdx": {
        "title": "Twilio SMS",
        "description": "Send SMS notifications and alerts from your SVAHNAR AI agents using Twilio's messaging API.",
        "keywords": ["twilio sms", "sms tool", "text messaging", "svahnar", "notification"],
    },
    "Tools/ToolList/Twilio_whatsapp.mdx": {
        "title": "Twilio WhatsApp",
        "description": "Send automated WhatsApp messages from your SVAHNAR AI agents using Twilio's WhatsApp API.",
        "keywords": ["twilio whatsapp", "whatsapp messaging", "svahnar", "messaging automation"],
    },
    "Tools/ToolList/Weather.mdx": {
        "title": "Weather",
        "description": "Fetch real-time weather conditions and forecasts for any city using OpenWeatherMap in SVAHNAR agents.",
        "keywords": ["weather tool", "openweathermap", "weather api", "svahnar", "real-time weather"],
    },
    "Tools/ToolList/WikiData.mdx": {
        "title": "Wikidata",
        "description": "Query structured factual data about people, places, and events from Wikidata in your SVAHNAR agents.",
        "keywords": ["wikidata", "structured knowledge", "knowledge graph", "svahnar", "facts"],
    },
    "Tools/ToolList/Wikipedia.mdx": {
        "title": "Wikipedia",
        "description": "Enable SVAHNAR AI agents to search Wikipedia for article summaries and encyclopedic knowledge.",
        "keywords": ["wikipedia tool", "encyclopedia", "knowledge search", "svahnar", "agent tool"],
    },
    "Tools/ToolList/Wolframalpha.mdx": {
        "title": "WolframAlpha",
        "description": "Solve mathematical problems and complex factual queries using WolframAlpha in your SVAHNAR AI agents.",
        "keywords": ["wolframalpha", "math tool", "computation", "svahnar", "scientific calculations"],
    },
    "Tools/ToolList/Yahoo finance.mdx": {
        "title": "Yahoo Finance",
        "description": "Retrieve stock prices, financial metrics, and market data via Yahoo Finance in your SVAHNAR AI agents.",
        "keywords": ["yahoo finance", "stock market", "financial data", "svahnar", "finance tool"],
    },
    "Tools/ToolList/Zapier.mdx": {
        "title": "Zapier",
        "description": "Trigger Zapier Zaps from your SVAHNAR AI agents to connect with thousands of third-party applications.",
        "keywords": ["zapier tool", "zapier integration", "automation", "svahnar", "workflow automation"],
    },
    "Tools/ToolList/Zerodha.mdx": {
        "title": "Zerodha Kite",
        "description": "Fetch market data, place trades, and manage portfolios via Zerodha Kite Connect in your SVAHNAR AI agents.",
        "keywords": ["zerodha", "kite connect", "trading", "stock market", "svahnar"],
    },
    "Tools/ToolList/webpage_search.mdx": {
        "title": "Webpage Search",
        "description": "Enable SVAHNAR AI agents to extract and read content from any public web page URL for analysis.",
        "keywords": ["webpage search", "web scraping", "url reader", "svahnar", "web content"],
    },
    # ── Additional ───────────────────────────────────────────────────────────
    "additional/YAML_Conversion_Guide.mdx": {
        "title": "JSON to YAML Conversion Guide",
        "description": "Learn how to convert JSON agent configurations to YAML format for use with the SVAHNAR platform.",
        "keywords": ["yaml conversion", "json to yaml", "svahnar", "agent configuration", "yaml guide"],
    },
}


def build_frontmatter(data: dict) -> str:
    title = data["title"]
    description = data["description"]
    keywords = ", ".join(data["keywords"])
    return f"""---
title: "{title}"
description: "{description}"
keywords: [{", ".join(repr(k) for k in data["keywords"])}]
---

"""


def has_description(content: str) -> bool:
    """Return True if the file already has a `description:` field in front matter."""
    if not content.startswith("---"):
        return False
    end = content.find("---", 3)
    if end == -1:
        return False
    front = content[3:end]
    # return "description:" in front
    return False


def process_file(rel_path: str, fm_data: dict):
    abs_path = os.path.join(DOCS_DIR, rel_path)
    if not os.path.exists(abs_path):
        print(f"  SKIP (not found): {rel_path}")
        return

    with open(abs_path, "r", encoding="utf-8") as f:
        content = f.read()

    if has_description(content):
        print(f"  SKIP (already has description): {rel_path}")
        return

    fm_block = build_frontmatter(fm_data)

    if content.startswith("---"):
        # Has front matter but no description — strip it and prepend ours
        end = content.find("---", 3)
        if end != -1:
            after_fm = content[end + 3:].lstrip("\n")
            new_content = fm_block + after_fm
        else:
            new_content = fm_block + content
    else:
        # No front matter at all — just prepend
        new_content = fm_block + content.lstrip("\n")

    with open(abs_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"  UPDATED: {rel_path}")


def main():
    print(f"Processing {len(FRONTMATTER_MAP)} files in {DOCS_DIR}\n")
    updated = 0
    skipped = 0
    for rel_path, fm_data in FRONTMATTER_MAP.items():
        abs_path = os.path.join(DOCS_DIR, rel_path)
        exists = os.path.exists(abs_path)
        with open(abs_path, "r", encoding="utf-8") as f:
            content = f.read()
        already = has_description(content)
        process_file(rel_path, fm_data)
        if exists and not already:
            updated += 1
        else:
            skipped += 1

    print(f"\nDone. Updated: {updated} | Skipped: {skipped}")


if __name__ == "__main__":
    main()
