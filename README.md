# Authentic Online Store

E-commerce storefront inspired by modern phone/router shop layouts, branded for **Authentic Financial Services**.

## Stack

- Vite + React + TypeScript
- Tailwind CSS
- React Router
- Lucide icons

## Brand colours

- Green: `#0B3D2E`
- Gold accent: `#D4AF37`

## Run locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

## Deploy (Cloudflare Workers)

```bash
npx wrangler login
npm run deploy
```

This builds the Vite app and deploys it to `authentic-accesories` on your `*.workers.dev` subdomain.

## Features

- Home, Shop (filters), Product detail
- Cart, Wishlist, Checkout
- Login / Register (local demo auth)
- USD / ZWG currency toggle
- Head Office contacts from Authentic

© Authentic Financial Services. Authentic™ and related marks are trademarks of Authentic Financial Services.
