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

- **DNS API Credentials:** Enter the tokens/keys of your DNS provider in the `.env` file - there are more providers possible.
- **Synology Credentials:** Adjust the hostname, port, and login credentials (dedicated account for this container/script - needs admin privileges) of your NAS in the `.env` file.
- **Volume Paths:** Ensure the path `/volume2/docker/acme/config` in the `docker-compose.yml` matches your actual folder structure so certificates survive container restarts.

## Initial Setup

Once your configuration is ready and the container is running, you need to execute the following commands *once* inside the container's shell to kick off the automated process.

Access the container shell first (e.g., via `docker exec -it acme-sh sh`), then follow these steps:
### 1. Register Account
Register your email address with Let's Encrypt to receive expiration notices.
```shell
acme.sh --register-account -m mail@example.com --home /acme.sh
```

### 2. Issue Certificate
Choose your DNS provider from the tabs below to issue the certificate. Make sure you use the correct `--dns` flag for your provider.

::: code-group

```sh [Cloudflare]
acme.sh --issue --dns dns_cf -d syn.example.com -d '*.syn.example.com' --home /acme.sh
```

```sh [Hetzner]
acme.sh --issue --dns dns_hetzner -d syn.example.com -d '*.syn.example.com' --home /acme.sh
```

```sh [Netcup]
acme.sh --issue --dns dns_netcup -d syn.example.com -d '*.syn.example.com' --home /acme.sh
```
:::

### 3. Deploy to Synology
This step configures the deployment hook so `acme.sh` knows how to push the certificate to your NAS - in this case for the synology provicer.

```sh
acme.sh --deploy --insecure -d syn.example.com --deploy-hook synology_dsm --home /acme.sh
```

### 4. Install Certificate
Finally, install the certificate into the Synology DSM system.
Afterward, it will appear inside the settings and can be used as the default one - even if the Synology Webserver restarts after that, a good restart of the whole NAS preferred.

```sh
acme.sh --install-cert -d syn.example.com --deploy-hook synology_dsm --home /acme.sh
```

### 5. (Optional) Disable DNS Rebind Protection

If you are using a **FritzBox** as your router, you might not be able to access your NAS via your new domain (`syn.example.com`) from *inside* your own local network. 
To fix this, you need to add an exception in your router settings.

::: tip Why is this necessary?
By default, the FritzBox blocks DNS responses that resolve to private/local IP addresses to prevent DNS rebinding attacks. 
Since your custom domain points to the local IP of your Synology NAS, you must explicitly tell the router that these specific domains are safe.
:::

**Configuration Steps:**
1. Open your router interface (usually `http://fritz.box`).
2. Navigate to: **Home Network** → **Network** → **Network Settings** → **Advanced Network Settings** (at the bottom).
3. Find the section **DNS Rebind Protection** (Host name exceptions).
4. Enter your domains, each on a new line:
   ```text
   syn.example.com
   *.syn.example.com
   ```
5. Click **Apply** to save your settings.


## Links

- Source Code & Official Website: [acmesh-official/acme.sh (GitHub)](https://github.com/acmesh-official/acme.sh)
- Documentation (Synology Guide): [acme.sh Wiki - Synology NAS Guide](https://github.com/acmesh-official/acme.sh/wiki/Synology-NAS-Guide)
- Docker Image: [neilpang/acme.sh on Docker Hub](https://hub.docker.com/r/neilpang/acme.sh)
- Challenge Types: [Challenge Types](https://letsencrypt.org/docs/challenge-types/)
- DNS Rebind Explanation: [GitHub Blog](https://github.blog/security/application-security/dns-rebinding-attacks-explained-the-lookup-is-coming-from-inside-the-house/)
