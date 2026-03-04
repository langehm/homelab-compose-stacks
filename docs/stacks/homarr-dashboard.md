---
title: Homarr Dashboard
---

# Homarr Dashboard

This stack deploys [Homarr](https://homarr.dev/), a sleek, modern, and lightweight homepage for your server and homelab. 
It helps you access all your services in one place and integrates with various homelab applications.

## About

This setup is designed to run behind a **Traefik reverse proxy**. 
It uses an internal Docker network (`traefik`) to expose the service without mapping ports directly to the host machine.

Additionally, this stack is configured to use an **OIDC Single Sign-On (SSO)** provider. 
As a best practice, the local username/password authentication (`credentials`) remains enabled as a fallback mechanism to ensure you never get locked out of your dashboard if the SSO provider goes offline.

## Included Services

- **homarr**: The main dashboard application container.

## What You Should Review

Before using this stack, adjust the following configurations:

- **Environment Variables (`.env`):** - Provide a secure `SECRET_ENCRYPTION_KEY` (e.g., generate via `openssl rand -hex 32`).
    - Update the `AUTH_OIDC_*` variables with your actual SSO provider details.
- **Volume Paths:** Ensure the path `/volume2/docker/homarr/appdata` exists on your host machine to store your dashboard configurations, icons, and SQLite database persistently.
- **Traefik Labels:** - Change `Host('homarr.example.com') || Host('example.com')` to your actual domains.
    - Review the `no-auth@file` middleware. If your SSO handles authentication, you might not need a Traefik-level auth middleware here, but ensure it matches your Traefik dynamic configuration.
- **The 7575 Port Routing:** Do **not** change the label `traefik.http.services.homarr-homarr.loadbalancer.server.port=7575`. Homarr internally listens on port `7575`. Traefik uses this label to know which port to send traffic to inside the container network.

## Links

- Official Website: [homarr.dev](https://homarr.dev/)
- Documentation: [Homarr Docs](https://homarr.dev/docs/introduction/)
- Docker Image: [ghcr.io/homarr-labs/homarr](https://github.com/homarr-labs/homarr/pkgs/container/homarr)
- Source Code: [homarr-labs/homarr (GitHub)](https://github.com/homarr-labs/homarr)