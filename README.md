<<<<<<< HEAD
# Portfolio

Personal portfolio of Ram — Java Full Stack Developer. Built with Next.js, React, Tailwind CSS and GSAP.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run check` — lint, typecheck and build
=======
# Raman — Full Stack Developer Portfolio

A premium, animated developer portfolio built with React, Vite, Tailwind CSS v4, Framer Motion, GSAP-ready, React Three Fiber, React Icons, and EmailJS.

## Setup

```bash
npm install
npm run dev
```

## Configure EmailJS

Open `src/components/Contact.jsx` and replace:

```js
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'
```

with your credentials from https://www.emailjs.com — your template should expect `user_name`, `user_email`, and `message` fields (these match the form's `name` attributes).

## Customize

- **Projects**: edit `src/data/projects.js` — swap in real screenshots by replacing the placeholder block in `ProjectCard.jsx` with an `<img>`.
- **Resume**: drop your PDF at `public/resume.pdf` (the Download Resume button already links there).
- **Social links**: update the `#` placeholders in `Contact.jsx` and `Footer.jsx` with your GitHub/LinkedIn URLs.
- **Colors/fonts**: theme tokens live in `src/index.css` under `@theme`.

## Build

```bash
npm run build
```

Output goes to `dist/`.
>>>>>>> a76d8cfb9ee0096fa5eef5948cda96f31e2f6adf
