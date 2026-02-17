---
title: Getting Started
outline: deep
---

# Getting Started

This repository contains a collection of Docker Compose stacks intended for homelab usage.

Each directory represents **one stack**.  
A stack may consist of:
- a single application, or
- multiple services that logically belong together (e.g. app + database + reverse proxy).

The repository provides:
- `compose.yml` (or `docker-compose.yml`) files
- optional example configuration files
- optional environment templates (e.g. `.env.example`)
- minimal documentation per stack

It does **not** provide:
- production hardening
- enterprise-grade security guarantees
- automated provisioning
- opinionated infrastructure tooling

The goal is simplicity and reproducibility for self-hosted environments.


## Repository Structure

A typical structure looks like this:

```
.
├─ stack-a/
│  ├─ compose.yml
│  ├─ .env.example
│  └─ config/
│     └─ example-config.yml
│  └─ README.md
├─ stack-b/
│  ├─ compose.yml
│  └─ README.md
└─ ...
```

- Each folder = one deployable stack.
- Configuration examples are provided where useful.
- You are expected to adapt environment variables and configs to your setup.


## Basic Usage

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <repo-name>
````

2. Navigate to the desired stack:

```bash
cd stack-a
```

3. Copy and adjust environment variables if required:

```bash
cp .env.example .env
```

4. Start the stack:

```bash
docker compose up -d
```

5. Verify logs if necessary:

```bash
docker compose logs -f
```

::: info Usage in portainer
Or use portainer, where you can directly refernce these compose-files.
:::


## Naming & Conventions

The stacks intentionally use generic `compose.yml` filenames.
You may:

* keep them as-is and run from within the directory
* rename them if integrating into an existing infrastructure
* merge them into a larger compose setup if needed

The repository does not enforce a specific deployment pattern.


## Homelab Philosophy

These stacks are designed for:

* experimentation
* learning
* self-hosted services
* small-scale personal environments

They are intentionally pragmatic.
If something needs to be adapted for your network, hardware, or reverse proxy setup — adjust it.

Homelabs differ widely. There is no universal configuration.


## Before You Deploy

You should understand:

* basic Docker and Docker Compose concepts
* networking fundamentals
* reverse proxy configuration (if applicable)
* how to secure exposed services

If you expose services to the public internet, you are responsible for securing them properly.


## Next Steps

* Browse the available stacks on the home page.
* Open the stack-specific documentation.
* Adjust configurations for your environment.
* Deploy and iterate.
