# English documentation copywriting upgrade — backlog

**Scope:** `content/en` (101 Markdown files as of assessment)  
**Goal:** Clearer, more consistent voice, terminology, and structure across the Genocs docs site.  
**Prepared for:** Prioritized editing passes and content ownership decisions.

### Wave A — done (2026-04-04)

Mechanical copy pass on `content/en`: spelling and grammar (e.g. seamless, comprehensive, been, environment), **GitHub** branding, **.NET 10** spacing in prose (TFM `net10.0` unchanged in package tables), fixed **contact** `mailto:`, **monitoring** overview (Application Insights, MassTransit, system/config phrasing), **contributing** sample-doc path and **library** hub link to `/contributing/`, **introduction** “starter templates” wording, **getting-started** project cards and vision copy, **builder** redundant phrasing, templating **GitHub** / **environment** fixes, and YAML pipeline comments for .NET 10.

### Wave B — done (2026-04-04)

Unified **Genocs Library** naming in site config (`params.toml`, English `languages.toml`), **home** `_index.md` (title, meta, diagram broker label **Genocs.Messaging**), **`docs/_index.md`** and **`docs/9.0/_index.md`** landing copy with navigation and package tables, **introduction** rewrite (tone + links), **getting-started** meta, **library** hub meta, and `package.json` description. Italian locale strings unchanged.

### Wave C — done (2026-04-04)

Filled **`library/messaging`**, **`library/persistence`** (fixed menu spelling **Persistence**), and **`library/metrics`** with overview + cross-links to **[v9.0](/docs/9.0/)**; rewrote **[contributing](/contributing/)** (repo table, doc workflow, correct **contrib.rocks** per repo); fixed **Blazor** card on **getting started** (repository → `blazor-template`); replaced broken **`/docs/templates/...`** links with **`/templating/general/...`** in templating pages.

## 1. Executive summary

The English docs mix **three overlapping “products”** in naming and promise: *Genocs Framework Documentation*, *Genocs Library*, and *template* content. **v9.0 package reference pages** follow a modern, structured “agent reference” style, while **library topic pages** and **templating** sections vary from detailed to empty, with repeated marketing blurbs and legacy phrasing.

Highest-impact wins: **unify naming and positioning**, **fix systematic typos and grammar**, **standardize .NET version formatting**, **align library topics with v9 package docs or cross-link**, and **repair broken or placeholder sections** (empty pages, wrong contributor blocks, bad links).

## 2. Inventory by area

| Area | Role | Notes |
|------|------|--------|
| `_index.md` (home) | Landing | Short; mermaid diagram; meta description repeats lead |
| `introduction/` | Marketing + onboarding | Long feature list; “template templates” error |
| `introduction/getting-started/` | Projects hub | Cards, external links; duplicate “Template”; .NET version strings |
| `library/` + `library/*/index.md` | Topic guides | Mix of depth: some full (e.g. authentication), some **empty body** (messaging) |
| `library/_index.md` | Version hub | Strong; minor link text (“Contributing” vs root) |
| `docs/_index.md` | Stub | Nearly empty; typo in description |
| `docs/9.0/` | Version landing | Minimal body |
| `docs/9.0/packages/*.md` | NuGet reference | Consistent “Agent Reference” pattern |
| `templating/**` | Templates deep-dive | Large; duplicate overview text; `/docs/templates/` links updated to `/templating/` (Wave C) |
| `cli/`, `contact/`, `contributing/` | Satellite | CLI repeats generic .NET CLI wording; contributing has structural issues |
| `infrastructure/`, `containerization/`, `devops/` | Ops | Substantial overlap potential (similar KEDA/contributor blocks) |

## 3. Voice, naming, and positioning (P0)

**Issues**

- Inconsistent product naming: “Genocs Framework Documentation” vs “Genocs Library” vs “Genocs Library Documentation.”
- Home meta/lead over-claims (“everything your projects will ever need”) and repeats the same sentence in `description` and `lead`.
- Introduction reads as **vendor marketing**; library index is **concise and technical**—audiences conflict (evaluator vs implementer).

**Backlog**

1. **Define a one-line positioning statement** (who it’s for, what it is: libraries + CLI + templates) and use it on home + introduction only; derivative pages get shorter, specific leads.
2. **Pick canonical naming** (e.g. always “Genocs Library” for the product family; “this documentation site” for the site).
3. **Tone ladder:** Home = short promise + diagram; Introduction = capabilities map; Getting Started = concrete next steps; Library/Docs = reference tone.
4. **Reduce repeated superlatives** (“revolutionize,” “premium,” “elite”) or confine them to a single brand page.

## 4. Typos, grammar, and mechanical consistency (P0–P1)

**Known patterns (non-exhaustive)**

| Issue | Example locations / pattern |
|-------|-----------------------------|
| `seemless` → `seamless` | `content/en/_index.md` (meta) |
| `comprensive` → `comprehensive`; subject-verb: “documentation … explains” | `content/en/docs/_index.md` |
| `bee` → `been` | `library/authentication`, `library/authorization` (“has bee overwritten”) |
| `enviroment` → `environment` | `templating/general/overview.md`, `templating/general/getting-started/index.md` |
| `it's` → `its` (possessive) | `templating/blazor-template/overview/index.md` |
| `Github` → `GitHub` (brand) | Multiple files |
| Duplicate words | “Template Template,” “template templates” (`introduction/_index.md`, `introduction/getting-started/index.md`) |
| Subject-verb | “templates … that will help” vs “template … that will help”; “tool … allow” → “allows” (`cli/index.md`) |
| Technical typos | `sistem` → `system` (`library/monitoring/index.md`); `Appinsights` → “Application Insights” where appropriate |

**Backlog**

1. Run a **repo-wide pass** for the table above plus common ESL issues (articles, hyphenation “end-to-end,” “open source”).
2. **Standardize .NET branding:** prefer Microsoft-style “.NET 10” / “.NET 10.0” in prose; `net10.0` in TFM tables; avoid `.NET10.0` glued form unless house style dictates—**choose one style guide** and apply everywhere.
3. **Fix `description` / `lead` duplication** on pages where both are identical (SEO: vary `description` slightly or shorten `lead`).

## 5. Factual and UX consistency (P1)

**Issues**

- **Getting started** project cards: Blazor repo link points to `genocs-library-docs` for one card; verify each “View GitHub Repository” target.
- **Contributing** references `content/en/templates/...` but repo uses `content/en/templating/...` — **broken contributor path**.
- **Templating** `general/overview.md` links to `/docs/templates/...` — verify against actual Hugo routes (`/templating/` vs `/docs/`).
- **Library** `messaging/index.md` is **front matter only** (no body)—users hit a dead end.
- **Contributing** “Genocs Library Documentation” subsection announces contributors but **no image**; multiple subsections reuse **genocs-library** contributor image for different templates—**wrong or placeholder**.

**Backlog**

1. **Link audit:** internal paths, GitHub repos, Discord, email (`contact/index.md`: `mailto:` link for info@genocs.com is malformed in source).
2. **Fill or redirect** empty library pages; minimum: overview + install + link to `docs/9.0/packages/...`.
3. **Contributing page:** one contributor widget per repo or a single list with correct repos; remove “soon” sections or mark clearly as roadmap.

## 6. Structural and style alignment: Library vs v9 packages (P1–P2)

**Observation**

- `docs/9.0/packages/*.md` uses a **consistent** pattern: Consumer mode → Purpose → Quick Facts → Install → Recipes → Configuration.
- `library/*` pages are **hand-written**, mix **Program.cs** and **Startup/Configure** language, and differ in section order.

**Backlog**

1. **Per topic, decide:** “library” page is the **narrative guide** and package page is **API-oriented reference**, with explicit cross-links both ways—or merge strategy for v10.
2. **Normalize headings:** Installation → Dependencies → Usage → Configuration → See also (package doc).
3. **Retire or label** legacy ASP.NET Startup snippets where the stack is minimal hosting only.

## 7. Duplicate and boilerplate YAML descriptions (P2)

**Observation**

- Same `description` string reused across several `library/*/index.md` files (e.g. “Enterprise Level Libraries and Templates…”).

**Backlog**

1. **Unique `description` per page** (one sentence, topic-specific) for SEO and social previews.
2. Shared boilerplate → short **“About Genocs Library”** include or single parent page—not repeated meta.

## 8. Templating section (P2)

**Issues**

- Repeated **same `description`/`lead`** across `library-template`, `multitenancy-template`, `onion-template` overviews.
- Long `general/overview.md` mixes goals, features, fork instructions, license—**very long single page**.
- Informal elements (“Click to See More!”, Discord deep-links) may be fine but should match **global tone**.

**Backlog**

1. Split **overview** vs **contributing/developer workflow** vs **changelog** (already partially separate).
2. Normalize **feature lists** (checkbox style, capitalization “Multi-tenancy”).
3. Verify **Makefile** and docker-compose doc links (e.g. reported bad GitHub path in `makefile-commands.md`).

## 9. DevOps / infrastructure / containerization (P2)

**Observation**

- Similar blocks (KEDA, Buy Me a Coffee, contributor credits) appear across files—risk of **drift** when one is updated.

**Backlog**

1. **Single source** via Hugo partial/shortcode or shared include for repeated deployment instructions.
2. Align **terminology** (AKS, Kubernetes, step numbering) across the three pages.

## 10. Accessibility and formatting (P3)

**Backlog**

1. Prefer semantic Markdown headings over `<p><b>` where possible (`introduction/getting-started/index.md`) for consistency and accessibility.
2. **Alt text / figure captions** for hero images (`introduction/_index.md`, templating).
3. **Tables:** ensure header rows and consistent terminology in package Quick Facts.

## 11. Suggested execution order

| Wave | Focus | Outcome |
|------|--------|---------|
| **A** | P0 typos + grammar + brand (GitHub, .NET) + contact mailto | Clean, trustworthy baseline |
| **B** | Naming + home/intro + `docs/_index` + v9 landing copy | Clear entry experience |
| **C** | Empty/broken pages (messaging, contributing, links) | No dead ends |
| **D** | Library vs package alignment + YAML descriptions | Consistent reference experience |
| **E** | Templating split + dedupe devops blocks | Maintainable long-form content |

## 12. Open decisions (for product/docs owner)

1. **Primary audience** for the homepage: framework evaluators, existing users, or contributors?
2. **“Agent Reference”** framing on v9 pages: keep for all versions or rename for human readers on the public site?
3. **Blog (genocs-blog.netlify.app)** vs on-site docs: which is canonical for tutorials?
4. **Roadmap visibility:** “Coming soon” templates—dates or remove from main nav?

*This backlog is a planning artifact; update checkboxes or tickets in your tracker as items complete.*
