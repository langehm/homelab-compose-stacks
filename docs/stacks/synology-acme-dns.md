---
title: Synology acme dns
---

# Synology ACME DNS Challenge

This stack enables the automated generation and renewal of `Let's Encrypt` (or other) certificates on a Synology NAS using the secure DNS-01 challenge.

## About

Synology's built-in `Let's Encrypt` feature usually requires the HTTP-01 challenge, which strictly requires port `80` to be exposed to the internet. This stack solves that problem. It uses `acme.sh` to perform the DNS-01 challenge instead, communicating directly with your domain provider's API (e.g., Cloudflare, Hetzner, Netcup).

You **do not need to open any ports on your firewall / router**, you can issue wildcard certificates (`*.example.com`), and the container automatically pushes the finished certificate into DSM using the Synology API.

## Included Services

- **acme-sh**: The main container that communicates with the DNS API, validates the certificate, and handles the automated deployment to Synology DSM.

## What You Should Review

Before using this stack, adjust:

- **DNS API Credentials:** Enter the tokens/keys of your DNS provider in the `.env` file.
- **Synology Credentials:** Adjust the hostname, port, and login credentials (dedicated account for this container/script) of your NAS in the `.env` file.
- **Volume Paths:** Ensure the path `/volume2/docker/acme/config` in the `docker-compose.yml` matches your actual folder structure so certificates survive container restarts.
- **Initial Setup:** Run the `acme.sh` commands provided in the `.env` file *once* inside the container's shell to kick off the automated process.

## Links

- Source Code & Official Website: [acmesh-official/acme.sh (GitHub)](https://github.com/acmesh-official/acme.sh)
- Documentation (Synology Guide): [acme.sh Wiki - Synology NAS Guide](https://github.com/acmesh-official/acme.sh/wiki/Synology-NAS-Guide)
- Docker Image: [neilpang/acme.sh on Docker Hub](https://hub.docker.com/r/neilpang/acme.sh)
- Challenge Types: [Challenge Types](https://letsencrypt.org/docs/challenge-types/)