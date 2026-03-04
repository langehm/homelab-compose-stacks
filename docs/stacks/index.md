---
title: Stack Overview
---

# Homelab Stacks Overview

Welcome to the core of the homelab documentation. This section contains the detailed documentation for all Docker Compose deployments, their configurations, and the specific environment variables used across the infrastructure.

::: tip Navigation
You can find the complete list of all deployed stacks in the **sidebar** on the left. This overview page serves as a high-level introduction to the infrastructure design.
:::

## Architecture Philosophy

All services are strictly containerized and managed via compose files. 
To maintain a clean and secure environment, the infrastructure is logically divided into two main tiers:

| Tier | Description | Examples |
| :--- | :--- | :--- |
| **Core Infrastructure** | Foundational services required for routing, security, and SSL management. | Traefik, ACME DNS, SSO |
| **Applications** | User-facing services, dashboards, and productivity tools. | Homarr, Nextcloud |

> "Treat your infrastructure as code, and your homelab as a production environment."

## Standardized Directory Structure

Every described application is split into the configuration and its corresponding documentation.
The structure is described on the [getting started page](/getting-started).