#!/usr/bin/env node
/**
 * Converts docs from content/en/docs/9.0/docs to Hugo format
 * and writes to content/en/docs/9.0/library
 */

const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'content', 'en', 'docs', '9.0', 'docs');
const libraryDir = path.join(__dirname, '..', 'content', 'en', 'docs', '9.0', 'library');

const FILE_MAP = {
  'AGENTIC_SUPPORT.md': { slug: 'agentic-support', title: 'Agentic Support' },
  'Genocs.Auth-Agent-Documentation.md': { slug: 'genocs-auth-agent', title: 'Genocs.Auth Agent Reference' },
  'Genocs.Common-Agent-Documentation.md': { slug: 'genocs-common-agent', title: 'Genocs.Common Agent Reference' },
  'Genocs.Common-Documentation.md': { slug: 'genocs-common', title: 'Genocs.Common Library' },
  'Genocs.Core-Agent-Documentation.md': { slug: 'genocs-core-agent', title: 'Genocs.Core Agent Reference' },
  'Genocs.Core-Documentation.md': { slug: 'genocs-core', title: 'Genocs.Core Library' },
  'Genocs.Http-Agent-Documentation.md': { slug: 'genocs-http-agent', title: 'Genocs.Http Agent Reference' },
  'Genocs.Logging-Agent-Documentation.md': { slug: 'genocs-logging-agent', title: 'Genocs.Logging Agent Reference' },
  'Genocs.Messaging-Agent-Documentation.md': { slug: 'genocs-messaging-agent', title: 'Genocs.Messaging Agent Reference' },
  'Genocs.Messaging.Outbox-Agent-Documentation.md': { slug: 'genocs-messaging-outbox-agent', title: 'Genocs.Messaging.Outbox Agent Reference' },
  'Genocs.Messaging.Outbox.MongoDB-Agent-Documentation.md': { slug: 'genocs-messaging-outbox-mongodb-agent', title: 'Genocs.Messaging.Outbox.MongoDB Agent Reference' },
  'Genocs.Messaging.RabbitMQ-Agent-Documentation.md': { slug: 'genocs-messaging-rabbitmq-agent', title: 'Genocs.Messaging.RabbitMQ Agent Reference' },
  'Genocs.Persistence.MongoDB-Agent-Documentation.md': { slug: 'genocs-persistence-mongodb-agent', title: 'Genocs.Persistence.MongoDB Agent Reference' },
  'Genocs.Saga-Agent-Documentation.md': { slug: 'genocs-saga-agent', title: 'Genocs.Saga Agent Reference' },
  'Genocs.Saga.Integrations.MongoDB-Agent-Documentation.md': { slug: 'genocs-saga-integrations-mongodb-agent', title: 'Genocs.Saga.Integrations.MongoDB Agent Reference' },
  'Genocs.Saga.Integrations.Redis-Agent-Documentation.md': { slug: 'genocs-saga-integrations-redis-agent', title: 'Genocs.Saga.Integrations.Redis Agent Reference' },
  'Genocs.WebApi-Agent-Documentation.md': { slug: 'genocs-webapi-agent', title: 'Genocs.WebApi Agent Reference' },
  'Genocs.WebApi.CQRS-Agent-Documentation.md': { slug: 'genocs-webapi-cqrs-agent', title: 'Genocs.WebApi.CQRS Agent Reference' },
  'Genocs.WebApi.OpenApi-Agent-Documentation.md': { slug: 'genocs-webapi-openapi-agent', title: 'Genocs.WebApi.OpenApi Agent Reference' },
  'INTERFACE_MIGRATION_ASSESSMENT.md': { slug: 'interface-migration-assessment', title: 'Interface Migration Assessment' },
  'Library-Documentation-Template.md': { slug: 'library-documentation-template', title: 'Library Documentation Template' },
  'Library-Agent-Documentation-Template.md': { slug: 'library-agent-documentation-template', title: 'Library Agent Documentation Template' },
};

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : 'Documentation';
}

function extractDescription(content, title) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line && !line.startsWith('#') && !line.startsWith('>') && !line.startsWith('-')) {
      const desc = line.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').slice(0, 160);
      return desc + (desc.length >= 160 ? '...' : '');
    }
  }
  return title;
}

function createFrontMatter(meta) {
  const now = new Date().toISOString();
  return `---
title: "${meta.title.replace(/"/g, '\\"')}"
description: "${meta.description.replace(/"/g, '\\"')}"
lead: "${(meta.description || meta.title).slice(0, 100).replace(/"/g, '\\"')}"
date: 2026-03-21T00:00:00+00:00
lastmod: ${now}
draft: false
images: []
menu:
  docs:
    parent: "library"
    identifier: "${meta.slug}"
weight: ${meta.weight}
toc: true
---
`;
}

let weight = 200;
for (const [srcFile, meta] of Object.entries(FILE_MAP)) {
  const srcPath = path.join(docsDir, srcFile);
  if (!fs.existsSync(srcPath)) {
    console.warn('Skip (not found):', srcFile);
    continue;
  }

  const content = fs.readFileSync(srcPath, 'utf-8');
  const title = meta.title || extractTitle(content);
  const description = extractDescription(content, title);
  meta.weight = weight;
  weight += 10;

  const frontMatter = createFrontMatter({ ...meta, title, description });
  const body = content.trim();
  const output = frontMatter + '\n' + body;

  const outFile = meta.slug + '.md';
  const outPath = path.join(libraryDir, outFile);
  fs.writeFileSync(outPath, output, 'utf-8');
  console.log('Converted:', srcFile, '->', outFile);
}

console.log('\nDone.');
