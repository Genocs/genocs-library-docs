---
title: "Hugo Documentation De-duplication Strategy"
description: "Comprehensive plan for eliminating content redundancy across Containers, DevOps, and Infrastructure sections"
date: 2026-03-23
author: "Documentation Team"
---

# Hugo Documentation De-duplication Strategy

## Executive Summary

Three major documentation sections contain **210–280 lines of identical or near-identical content** across 1,680+ total lines:

| File | Current Lines | Duplication | Opportunity |
|------|---------------|-------------|------------|
| `containers/_index.md` | 550 | 210–240 lines (38%) | Remove SECTION 2, Code Org, Resource Groups |
| `devops/index.md` | 560 | 220–250 lines (39%) | Remove SECTION 2, Code Org, Resource Groups |
| `infrastructures/index.md` | 575 | 225–280 lines (41%) | Remove SECTION 2, Code Org, Resource Groups |
| **TOTAL GAIN** | **1,685** | **655–770 lines** | **~39% reduction** |

This strategy eliminates redundancy through **Hugo partials** while maintaining distinct section identities via intro/conclusion contextualization.

---

## Section Boundary Definitions

### 1. **Containers** ✓
**Purpose:** Teach containerization concepts and Kubernetes orchestration fundamentals

**Unique Identity:**
- Focus on **container architecture patterns** (Producer/Consumer, microservices)
- Emphasis on **Kubernetes object definitions** (deployments, services, configmaps)
- Container lifecycle management and stateless application deployment
- Runtime instrumentation (Jaeger, Prometheus for containerized workloads)
- Image management via Docker and ACR

**Section-Specific Intro/Context:**
- Explain why containerization is critical for enterprise applications
- Discuss the relationship between container orchestration and Kubernetes
- Reference microservices architecture patterns
- Keep section-specific callout blocks (e.g., "NOTE: AKS is expensive to keep alive")

**What Can Be Shared:**
- SECTION 2 setup steps (infrastructure provisioning is agnostic)
- Code organization references (directory structure unchanged)
- Resource group descriptions
- Kubectl commands and deployment patterns

---

### 2. **DevOps** ✓
**Purpose:** Teach CI/CD pipeline design and deployment automation workflows

**Unique Identity:**
- Focus on **pipeline orchestration** (automated deployments)
- Emphasis on **deployment strategies** (blue-green, rolling updates, rollback)
- Infrastructure-as-code and scripted automation
- Monitoring integration for deployment health assessment
- GitOps workflows and trigger mechanisms
- Relation to cloud-native CI/CD tools (Azure DevOps, GitHub Actions)

**Section-Specific Intro/Context:**
- Explain CI/CD pipeline complexity and stages
- Discuss automation benefits and risk mitigation
- Clarify integration points with monitoring and alerting
- Define deployment workflow ownership

**What Can Be Shared:**
- SECTION 2 setup steps (same infrastructure provisioning)
- Code organization (shared directory structure)
- Resource group descriptions
- PowerShell script references (same scripts, different context)

---

### 3. **Infrastructure** ✓
**Purpose:** Teach cloud resource provisioning and network design on Azure

**Unique Identity:**
- Focus on **cloud infrastructure design** (VNETs, public IPs, peering policies)
- Emphasis on **cloud-native networking** (AGIC, Application Gateway, service endpoints)
- Resource scaling strategies (horizontal, auto-scaling policies)
- Multi-layer security (NSGs, firewall rules, RBAC)
- Infrastructure-as-code (Terraform, Helm) for reproducibility
- Network topology and disaster recovery patterns

**Section-Specific Intro/Context:**
- Explain cloud infrastructure complexity and dependencies
- Discuss architecture decisions and trade-offs
- Clarify Azure-specific resource requirements
- Address compliance and security considerations

**What Can Be Shared:**
- SECTION 2 setup steps (infrastructure provisioning blueprint)
- Code organization (same directory layout)
- Resource group descriptions
- Network infrastructure diagram references

---

## Reusable Partials to Create

### Priority 1: High-Impact Partials (Eliminates 140+ lines)

#### **Partial 1: `section-2-setup-steps.html`**
**Location:** `layouts/_default/partials/section-2-setup-steps.html`  
**Content Scope:** Complete SECTION 2 (Steps 2.1–2.13)  
**Current Lines:** ~140 lines per file × 3 = **420 lines total**  
**Estimated Reduction:** ~280–320 lines (after partial overhead)

**Includes:**
- 2.1: Install Azure Container Registry ACR
- 2.2: Install Kubernetes Cluster AKS
- 2.3: Install Azure Key Vault AKV
- 2.4: Setup Network Infrastructure
- 2.5: Deploy Azure Key Vault Secret
- 2.6: Deploy RabbitMQ
- 2.7: Deploy MongoDB
- 2.8: Deploy Prometheus & Grafana
- 2.9: Deploy Jaeger
- 2.10: Deploy KEDA
- 2.11: Deploy Application
- 2.12: Deploy Application AutoScaler
- 2.13: Get Resources List

**Parameters:**
- None required (fully generic infrastructure setup)

**Hugo Syntax:**
```go-html-template
{{ partial "section-2-setup-steps.html" . }}
```

---

#### **Partial 2: `code-organization-subsections.html`**
**Location:** `layouts/_default/partials/code-organization-subsections.html`  
**Content Scope:** PowerShell, k8s, helm, terraform, skaffold subsections  
**Current Lines:** ~50 lines per file × 3 = **150 lines total**  
**Estimated Reduction:** ~100–130 lines

**Includes:**
- PowerShell helper scripts overview
- k8s manifest files description
- helm RBAC configuration
- terraform Kubernetes setup
- skaffold Kaniko setup

**Parameters:**
- None required (fully generic)

**Hugo Syntax:**
```go-html-template
{{ partial "code-organization-subsections.html" . }}
```

---

#### **Partial 3: `resource-groups-section.html`**
**Location:** `layouts/_default/partials/resource-groups-section.html`  
**Content Scope:** Resource Groups (rg-aks-genocs and rg-agic-genocs)  
**Current Lines:** ~35 lines per file × 3 = **105 lines total**  
**Estimated Reduction:** ~70–90 lines

**Includes:**
- H2 heading: "## Resource Groups"
- Subsection 1: rg-aks-genocs (definition, purpose, configuration)
- Subsection 2: rg-agic-genocs (definition, purpose, configuration)
- Azure-specific requirements and notes

**Parameters:**
- None required (fully generic)

**Hugo Syntax:**
```go-html-template
{{ partial "resource-groups-section.html" . }}
```

---

### Priority 2: Medium-Impact Partials (Partially Shared Content)

#### **Partial 4: `prerequisites-section.html`** (Contextual)
**Location:** `layouts/_default/partials/prerequisites-section.html`  
**Content Scope:** Prerequisites list with context-aware intro  
**Current Lines:** ~15 lines per file × 3 = **45 lines total**  
**Estimated Reduction:** ~25–35 lines

**Includes:**
- Azure Subscription requirement
- kubectl requirement
- PowerShell requirement
- Postman requirement
- Helm requirement
- Optional DockerHub/Github accounts

**Parameters:**
- `sectionName` (string): Controls context framing
  - "Containers" → "to create AKS cluster"
  - "DevOps" → "to create Azure DevOps project"
  - "Infrastructure" → "to create Kubernetes cluster"

**Hugo Syntax:**
```go-html-template
{{ partial "prerequisites-section.html" (dict "sectionName" .Title) }}
```

**Template Logic:**
```go-html-template
<h2>Prerequisites</h2>
{{- if eq .sectionName "Containers" }}
- **Azure Subscription** to create AKS cluster
{{- else if eq .sectionName "DevOps" }}
- **Azure Subscription** to create Azure DevOps project
{{- else if eq .sectionName "Infrastructure" }}
- **Azure Subscription** to create Kubernetes cluster
{{- end }}
- **kubectl** logged into Kubernetes cluster
...
```

---

#### **Partial 5: `introduction-section.html`** (Contextual)
**Location:** `layouts/_default/partials/introduction-section.html`  
**Content Scope:** Introduction with section-specific framing  
**Current Lines:** ~20 lines per file × 3 = **60 lines total**  
**Estimated Reduction:** ~35–45 lines

**Includes:**
- "The setup is split into different steps"
- Step categories (Bare components, Security, [Scaling|CI/CD], Monitoring, Application)
- Common explanation of approach

**Parameters:**
- `sectionName` (string): Determines middle step type
  - "Containers" → includes "Scaling"
  - "DevOps" → includes "CI/CD"
  - "Infrastructure" → includes "Scaling"

**Hugo Syntax:**
```go-html-template
{{ partial "introduction-section.html" (dict "sectionName" .Title) }}
```

**Template Logic:**
```go-html-template
<h2>Introduction</h2>

The setup is spilt into different steps:

- Bare components
- Security
{{- if eq .sectionName "DevOps" }}
- CI/CD
{{- else }}
- Scaling
{{- end }}
- Monitoring
- Application
```

---

### Priority 3: Low-Priority Partials (Audit & Special Handling)

#### **Partial 6: `autoscaler-section.html`**
**Location:** `layouts/_default/partials/autoscaler-section.html`  
**Content Scope:** Autoscaler introduction and context  
**Current Lines:** ~12 lines per file × 3 = **36 lines total**  
**Estimated Reduction:** ~20–28 lines

**Note:** Content appears generic but requires review for section-specific nuances.

---

#### **Partial 7: `setup-overview-section.html`**
**Location:** `layouts/_default/partials/setup-overview-section.html`  
**Content Scope:** Setup overview with architecture diagram  
**Current Lines:** ~30–40 lines per file × 3 = **90–120 lines total**  
**Estimated Reduction:** ~50–70 lines

**Parameters:**
- `diagramImage` (string): Path to section-specific diagram
  - Containers → `k8s-architecture.png`
  - DevOps → `gnx-ci-cd-pipeline.svg`
  - Infrastructure → `gnx-architecture-network.svg`

**Hugo Syntax (with parameter):**
```go-html-template
{{ partial "setup-overview-section.html" (dict "diagramImage" "gnx-architecture-network.svg") }}
```

---

## Extraction Priority Order

### **Phase 1: Critical Setup Infrastructure** (Week 1)
*Highest impact, lowest risk of context loss*

1. ✅ **Extract SECTION 2 setup steps** → `section-2-setup-steps.html`
   - Zero dependencies, 100% identical
   - Saves 280–320 lines across 3 files
   - No contextual parameters needed

2. ✅ **Extract Resource Groups section** → `resource-groups-section.html`
   - Zero dependencies, 100% identical
   - Saves 70–90 lines across 3 files
   - Enables sidebar resource reference

---

### **Phase 2: Code & Directory Organization** (Week 1)
*High impact, 100% identical content*

3. ✅ **Extract Code organization** → `code-organization-subsections.html`
   - Zero dependencies, 100% identical
   - Saves 100–130 lines across 3 files
   - Single-purpose partial (no parameters)

---

### **Phase 3: Contextual Parameterized Partials** (Week 2)
*Medium impact, requires careful parameterization*

4. ✅ **Extract Prerequisites** → `prerequisites-section.html`
   - Parameterize: `sectionName`
   - Saves 25–35 lines after parameter overhead
   - Requires testing across 3 sections

5. ✅ **Extract Introduction** → `introduction-section.html`
   - Parameterize: `sectionName`
   - Saves 35–45 lines after parameter overhead
   - 1 conditional branch (DevOps vs. others)

---

### **Phase 4: Audit & Refinement** (Week 2)
*Verify remaining unique content*

6. 🔍 **Audit Autoscaler section** → Potential partial
   - Review for unique insights per section
   - May require keeping section-specific versions

7. 🔍 **Audit Setup-Overview section** → Potential partial with diagram parameter
   - Parameterize diagram paths
   - Test diagram rendering across sections

---

## Hugo Syntax Examples

### Simple Partial Inclusion (No Parameters)

```markdown
# Setup - Overview

Kubernetes setup requires careful consideration of multiple topics.

{{< section-setup-overview >}}

In this walkthrough we will setup the steps required...
```

**Partial Template (`layouts/_default/partials/setup-overview-section.html`):**
```go-html-template
<p>Setup Kubernetes cluster to be production ready isn't a simple task...</p>

<img src="/images/gnx-architecture-network.svg" alt="Architecture Network">
```

---

### Parameterized Partial Inclusion

```markdown
## Prerequisites

{{< prerequisites-section sectionName="Containers" >}}

## Introduction

{{< introduction-section sectionName="Containers" >}}
```

**Partial Template (`layouts/_default/partials/prerequisites-section.html`):**
```go-html-template
<h2>Prerequisites</h2>

<ul>
  <li><strong>Azure Subscription</strong> 
    {{- if eq .sectionName "Containers" }} to create AKS cluster{{- end }}
    {{- if eq .sectionName "DevOps" }} to create Azure DevOps project{{- end }}
    {{- if eq .sectionName "Infrastructure" }} to create Kubernetes cluster{{- end }}
  </li>
  <li><strong>kubectl</strong> logged into Kubernetes cluster</li>
  ...
</ul>
```

---

### Hugo Shortcode Implementation

**Register in `config.toml`:**
```toml
[markup.goldmark.parser.attribute]
title = true
block = true
```

**Create Shortcode:** `layouts/shortcodes/section-2-setup-steps.html`
```go-html-template
{{ partial "section-2-setup-steps.html" . }}
```

**Usage in Markdown:**
```markdown
## **SECTION 2 - Setup**

{{< section-2-setup-steps >}}
```

---

## File Modifications Summary

### Files to Modify

| File | Current | After | Update Method |
|------|---------|-------|----------------|
| `content/en/containers/_index.md` | 550 lines | 320–340 lines | Replace SECTION 2, Code Org, Resource Groups with partials |
| `content/en/devops/index.md` | 560 lines | 330–350 lines | Replace SECTION 2, Code Org, Resource Groups with partials |
| `content/en/infrastructures/index.md` | 575 lines | 340–360 lines | Replace SECTION 2, Code Org, Resource Groups with partials |

### Partials to Create

| Partial | Lines | Parametrized | Risk Level |
|---------|-------|-------------|-----------|
| `section-2-setup-steps.html` | 140 | No | 🟢 Low |
| `code-organization-subsections.html` | 50 | No | 🟢 Low |
| `resource-groups-section.html` | 35 | No | 🟢 Low |
| `prerequisites-section.html` | 25 | Yes | 🟡 Medium |
| `introduction-section.html` | 20 | Yes | 🟡 Medium |
| `setup-overview-section.html` | 40 | Yes | 🟠 Higher |
| `autoscaler-section.html` | 12 | No | 🟡 Medium |

---

## Expected Outcomes

### Line Count Reduction

```
BASELINE TOTAL:
  containers:      550 lines
  devops:          560 lines
  infrastructures: 575 lines
  ---
  TOTAL:         1,685 lines

AFTER DE-DUPLICATION:
  containers:      320–340 lines (38% reduction)
  devops:          330–350 lines (39% reduction)
  infrastructures: 340–360 lines (41% reduction)
  ---
  TOTAL:         1,000–1,050 lines (40% reduction)

LINES SAVED: 635–685 lines across 3 files
PARTIAL OVERHEAD: ~40–50 lines (file I/O, partial registration)
NET SAVINGS: 585–645 lines
```

### Maintainability Improvements

| Metric | Current | After | Gain |
|--------|---------|-------|------|
| **Setup Steps Duplication** | 420 lines × 1 copy | 140 lines × 3 refs | 280 lines saved |
| **Code Org Duplication** | 150 lines × 1 copy | 50 lines × 3 refs | 100 lines saved |
| **Resource Groups Duplication** | 105 lines × 1 copy | 35 lines × 3 refs | 70 lines saved |
| **Single Source of Truth** | 0 sections | 3 sections | Setup steps fully unified |
| **Update Velocity** | 3 edits per change | 1 edit per change | 3x faster updates |

### Consistency Guarantees

✅ **Setup process stays synchronized** across all 3 sections automatically  
✅ **Directory structure documentation** consistent everywhere  
✅ **Code organization** cannot drift  
✅ **Resource group definitions** unified  
✅ **Section identity maintained** via intro/outro contextualization  
✅ **Reduced review cycles** - one content update, three sections benefited  

---

## Risk Mitigation

### Risk 1: Hugo Partial Rendering Failure
**Mitigation:**
- Test partials with `hugo serve` locally before pushing
- Verify HTML output matches original Markdown rendering
- Use Git diff to compare rendered output before/after

### Risk 2: Broken Parameterized Logic
**Mitigation:**
- Test each parameter value against all 3 sections
- Create conditional branches carefully
- Document parameter semantics in partial comments

### Risk 3: SEO Impact
**Mitigation:**
- Partials are transparent to Hugo; published HTML is identical
- No URL structure changes
- Test `<h1>`, `<h2>` hierarchy unchanged
- Validate with `hugo --buildDrafts && grep -r "h2" public/`

### Risk 4: Search Index Degradation
**Mitigation:**
- No content is removed; only relocated to partials
- Full text indexing produces identical results
- Test with site search functionality post-deployment

---

## Implementation Checklist

### Setup (Day 1)
- [ ] Create `/layouts/_default/partials/` directory structure
- [ ] Set up Git feature branch: `refactor/dedup-setup-steps`
- [ ] Back up original files: commit current state

### Phase 1: Critical Setup (Day 2–3)
- [ ] Extract SECTION 2 to `section-2-setup-steps.html`
  - [ ] Test on containers/_index.md
  - [ ] Test on devops/index.md  
  - [ ] Test on infrastructures/index.md
  - [ ] Verify line count reduction
- [ ] Extract Resource Groups to `resource-groups-section.html`
  - [ ] Test across all 3 sections
  - [ ] Validate formatting

### Phase 2: Code Organization (Day 4–5)
- [ ] Extract Code Org to `code-organization-subsections.html`
  - [ ] Test formatting and code blocks
  - [ ] Verify links render correctly
- [ ] Lint all Markdown files post-update

### Phase 3: Contextual Partials (Day 6–7)
- [ ] Create `prerequisites-section.html` with params
  - [ ] Test each section's context branching
  - [ ] Verify all 3 prerequisite variations
- [ ] Create `introduction-section.html` with params
  - [ ] Test DevOps vs. other branches
  - [ ] Verify step list rendering

### QA & Validation (Day 8–9)
- [ ] Full site build: `hugo --minify`
- [ ] Visual regression testing (diffs between old/new HTML)
- [ ] Search test: verify all setup steps searchable
- [ ] Cross-link test: ensure internal references work
- [ ] Accessibility audit: run a11y tests

### Deployment (Day 10)
- [ ] Create Pull Request with detailed changelog
- [ ] Request review from content/engineering team
- [ ] Merge and deploy to staging
- [ ] Final smoke test on staging
- [ ] Deploy to production

---

## Markdown Template Snippets

### containers/_index.md (After De-duplication)

```markdown
---
title : "Containers"
description: "How to containerize your solution!"
lead: "Containerizing applications is mandatory step for modern enterprise applications. Genocs Library contains containers setup as well!"
date: 2023-05-13T15:40:19+02:00
lastmod: 2026-03-23T21:39:47Z
draft: false
images: []
---

Setup Kubernetes cluster to be production ready isn't a simple task...

{{< prerequisites-section sectionName="Containers" >}}

{{< introduction-section sectionName="Containers" >}}

## Setup - Overview

Kubernetes setup is complex...

{{< setup-overview-section diagramImage="k8s-architecture.png" >}}

## Autoscaler

{{< autoscaler-section >}}

## Code organization

{{< code-organization-subsections >}}

## **SECTION 2 - Setup**

{{< section-2-setup-steps >}}

{{< resource-groups-section >}}

...rest of unique content...
```

---

## Validation Checklist

After implementation, verify:

- [ ] `hugo serve` runs without errors
- [ ] All pages render without 404s
- [ ] Setup steps appear identical to original content
- [ ] Resource groups section matches original layout
- [ ] Code organization subsections display correctly
- [ ] Diff between old and new HTML shows zero content changes
- [ ] Site search indexes all partials correctly
- [ ] Mobile rendering looks correct
- [ ] Code block syntax highlighting works
- [ ] Links to PowerShell scripts resolve correctly

---

## Rollback Plan

If issues occur post-deployment:

1. **Revert Git commits** to previous stable state
2. **Restore original `.md` files** from backup
3. **Run full site rebuild** and test
4. **Post-mortem review** before retry

---

## Questions & Clarifications

**Q: Will this break page anchors (e.g., `#section-2-setup`)?**  
A: No. Hugo renders partials into the same page. Anchor links remain valid.

**Q: How do we test partial rendering locally?**  
A: Run `hugo serve` and inspect the generated HTML in the browser DevTools.

**Q: Can we version-control partials?**  
A: Yes. Partials are standard Hugo files and commit to Git normally.

**Q: What if we need future section-specific variations?**  
A: Partials support conditional logic. Add parameters as needed.

**Q: Should we document the partial changes in CHANGELOG.md?**  
A: Yes. Add entry: "refactor: Extract common setup steps and resource documentation into reusable Hugo partials"

---

## Contact & Support

For questions during implementation:
- Review Hugo documentation: https://gohugo.io/templates/partials/
- Test locally before committing
- Document parameter logic in partial comments
- Keep original files until 100% validation passed
