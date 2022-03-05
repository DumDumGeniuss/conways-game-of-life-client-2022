# Conways Game of Life Client 2022

This project is powered by [Next.js](https://nextjs.org/).

![Vercel](https://vercelbadge.vercel.app/api/DumDumGeniuss/conways-game-of-life)

## Deployment Guide

### Env Variables

Update values in `.env`.

| Env Variable Name | Description                                                 | Required |
| ----------------- | ----------------------------------------------------------- | -------- |
| API_URL           | No api available now, but we keep this just for future use. | Yes      |
| SOCKET_URL        | URL to socket server, e.g: https://example.com              | Yes      |

## Start Server

```bash
yarn
yarn build
yarn start
```

## Commands

### Installation

```bash
yarn
```

### Development

```bash
yarn dev
```

### Building Assets

Run this command to build bundles.

```bash
yarn build
```

### Hosting Dynamic Content (Server-Side Rendering)

```bash
yarn start
```

### Building Tests

```bash
yarn test:watch
```

### Sytle Checks

```bash
yarn lint
```

### Pre Commit Hook

Please make .husky/pre-commit executable

```bash
chmod +x .husky/pre-commit
```

## Storybook

Coming soon, maybe.

## E2E Tests

Not yet decided which tool to go with [Cypress](https://www.cypress.io/) of [Playwright](https://playwright.dev/)?.
