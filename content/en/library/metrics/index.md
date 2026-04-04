---
title: "Metrics"
description: "How metrics fit into Genocs Library: health endpoints, observability sinks, and telemetry integrations—aligned with logging and monitoring packages."
lead: "Metrics are exposed through observability tooling (for example Application Insights, OpenTelemetry, or Prometheus-style endpoints), not a single standalone “metrics-only” package in the v9 reference set."
date: 2023-05-13T15:40:19+02:00
lastmod: 2026-04-04T15:53:29Z
draft: false
images: []
menu:
  library:
    identifier: "metrics"
    name: "Metrics"
    parent: "library"
weight: 8
toc: true
---

### Overview

In Genocs Library, **metrics** usually means **application and infrastructure counters** surfaced through:

- **HTTP endpoints** such as **`/metrics`** (Prometheus-style) or **`/healthz`**, often excluded from noisy log paths—see [Logging](/library/logging/) for `excludePaths` and related options.
- **Azure Application Insights** when you enable metrics in logging or monitoring integrations—see [Logging](/library/logging/) (`azure.enableMetrics`, and similar) and [Monitoring](/library/monitoring/).
- **OpenTelemetry** pipelines where you configure tracing and metrics—see [Monitoring](/library/monitoring/) and [Distributed tracing](/library/distributed-tracing/).

There is **no separate `Genocs.Metrics` package** in the current **[v9.0 package reference](/docs/9.0/)**; behavior is **package-specific** (for example telemetry hooks on a given integration).

### What to configure

1. Pick your **observability stack** (App Insights, Jaeger, Prometheus scrapers, and so on).
2. Enable the relevant **sinks and flags** in **`Genocs.Logging`**, **`Genocs.Monitoring`**, or related packages.
3. Use **versioned package docs** for exact settings—search the **[v9.0 index](/docs/9.0/)** for “metrics”, “telemetry”, or “OpenTelemetry” in the package you use.

### Reference documentation

Start from **[Genocs Library v9.0](/docs/9.0/)** and open the package you have installed (for example **Logging**, **HTTP**, or persistence packages that mention tracing).

---

**Related:** [Logging](/library/logging/) · [Monitoring](/library/monitoring/) · [Distributed tracing](/library/distributed-tracing/)
