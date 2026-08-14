---
title: Traefik Reverse Proxy
---

# Traefik Reverse Proxy & Sablier

This stack provides the core routing infrastructure, SSL termination, and dynamic container management for the homelab. It utilizes Traefik as the primary reverse proxy and integrates Sablier to start containers on-demand to save resources.

## About

All external and internal HTTP/HTTPS traffic is routed through this stack. Traefik automatically discovers services attached to the `traefik` Docker network. Static routes for external hardware (like Raspberry Pi modules or Synology DSM) are defined in the `dynamic.yml`.

Sablier is integrated via a Traefik middleware plugin. It intercepts traffic to stopped containers, displays a loading screen, starts the target container via the Docker socket, and proxies the traffic once the service is healthy. Error pages are handled globally by a dedicated container.

## Included Services

- **traefik** – The main reverse proxy handling routing and ACME DNS-01 certificate generation.
- **traefik-error-pages** – Provides standardized HTTP error pages.
- **sablier** – Manages on-demand container starting and stopping.

## What You Should Review

Before deploying this stack, verify the following configurations:

- **DNS Provider Credentials:** Adjust the `traefik.yml` certificate resolvers to match your DNS provider. An `.env` template is not included, as the required variables differ per provider. Refer to the [Traefik Let's Encrypt DNS Challenge Documentation](https://doc.traefik.io/traefik/https/acme/#dnschallenge) for exact variable names. For enhanced security, Traefik supports loading variables from files. Append `_FILE` to the provider's variable name (e.g., `CF_DNS_API_TOKEN_FILE=/path/to/secret`) to load values securely without exposing plain text secrets in the environment.
- **Dynamic Routes:** Update the IPs in `dynamic.yml` to match your actual hardware.
- **Network Configuration:** Ensure the external `traefik` Docker network is created with the correct subnet before deploying, as Traefik requires a static IPv4 address in this configuration.
- **Permissions:** Traefik and Sablier require read-only and read-write access to the `docker.sock` respectively. Ensure this aligns with your host security model.

## Middlewares Overview

The `dynamic.yml` defines several middlewares and chains to standardize traffic handling across services:

- **pihole-admin-redirect:** Automatically redirects requests from the root domain (`pihole.example.com`) directly to the `/admin` path, bypassing the default blocked-domain landing page.
- **digest-auth:** Enforces HTTP Digest Authentication using credentials stored in `/etc/traefik/auth_users`. It strips the authorization header before forwarding traffic to the backend services.
- **security-headers:** Injects standard HTTP security headers (e.g., browser XSS filter, content-type nosniff) into responses.
- **sablier-code-server / sablier-dynamic:** Triggers the Sablier plugin to start stopped containers on demand. These configure specific UI themes and session expiration durations based on the target service.
- **error-pages / extended-error-pages:** Intercepts backend HTTP errors (e.g., 404-599 or 400-599) and serves static HTML error pages from the `traefik-error-pages` container.
- **no-auth / with-auth / reduced-middleware:** Middleware chains that group authentication, security headers, and error handling for simplified assignment to specific routers.

## Configuration Files

Expand the sections below to view the deployment and configuration files for this stack.

::: details View compose.yml
<<< ../../traefik/compose.yml{yaml}
:::

::: details View traefik.yml (Static Configuration)
<<< ../../traefik/traefik.yml{yaml}
:::

::: details View dynamic.yml (File Provider)
<<< ../../traefik/dynamic.yml{yaml}
:::

::: details View sablier.yml
<<< ../../traefik/sablier.yml{yaml}
:::

::: details View custom security headers reference
<<< ../../traefik/security_headers{text}
:::

## Links

- Official Website (Traefik): [traefik.io](https://traefik.io/)
- Documentation (Traefik): [doc.traefik.io](https://doc.traefik.io/traefik/)
- Documentation (Traefik ACME DNS): [doc.traefik.io/traefik/https/acme/#dnschallenge](https://doc.traefik.io/traefik/https/acme/#dnschallenge)
- Plugin Repository (Sablier): [acouvreur/sablier](https://github.com/acouvreur/sablier)