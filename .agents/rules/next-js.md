# Next.js Best Practices & Idiomatic Solutions

This document outlines the standard rules and patterns for developing with Next.js in this project, based on the official documentation in `docs/next-js`.

## 1. Component Architecture (RSC & Client Components)

### Server Components (Default)

- Use **Server Components** by default for:
  - Data fetching (close to the source).
  - Accessing backend resources (databases, file systems).
  - Keeping sensitive information (API keys, tokens) secure.
  - Minimizing client-side JavaScript bundle size.
- **Rules**:
  - Do not use client-only hooks like `useState` or `useEffect`.
  - Do not access browser-only APIs (`window`, `localStorage`).

### Client Components

- Use **Client Components** (`"use client"`) only when necessary for:
  - Interactivity and event handlers (`onClick`, `onChange`).
  - Browser-only APIs.
  - Lifecycle hooks (`useEffect`, `useActionState`).
  - Custom hooks that depend on state or effects.
- **Composition**:
  - Keep Client Components deep in the tree (low-level components).
  - To include Server Components inside a Client Component, pass them as `children` or another slot prop.

## 2. Data Fetching & Caching

### Server-Side Fetching

- **API**: Use the native `fetch` API which is extended by Next.js.
- **Memoization**: Next.js automatically memoizes `GET` requests with the same URL and options within a single render pass.
- **React.cache**: Use `React.cache()` to deduplicate data fetching logic that doesn't use `fetch` (e.g., ORMs, direct DB queries).
- **Parallelism**: Use `Promise.all()` to initiate multiple non-dependent requests simultaneously.

### Caching Strategies

- `fetch(url, { cache: 'force-cache' })`: Opt into persistent caching.
- `fetch(url, { next: { revalidate: 3600 } })`: Time-based revalidation.
- `fetch(url, { next: { tags: ['tag'] } })`: On-demand revalidation via tags.
- **Directive**: Use the `'use cache'` directive (Next.js 15+) for caching entire computations or component outputs.

## 3. Data Mutations (Server Actions)

- **Definition**: Use Server Actions (`"use server"`) for data mutations.
- **Invocation**:
  - Preferred: Use `<form action={action}>` for automatic progressive enhancement.
  - Use `startTransition` or `useTransition` when calling actions outside of forms (e.g., in event handlers).
- **Pending States**: Use `useActionState` (or `useFormStatus` for nested inputs) to handle loading states and action results.
- **Post-Mutation**:
  - Use `revalidatePath('/path')` or `revalidateTag('tag')` to purge cached data.
  - Use `updateTag('tag')` for immediate cache expiry in read-your-own-writes scenarios.
  - Use `redirect('/path')` for navigating after a successful mutation.

## 4. Performance & UX

- **Streaming**: Use `loading.tsx` for route-level loading states or `<Suspense>` for granular component-level streaming.
- **Preloading**: Use `preload` utility functions to initiate data fetching before the component that needs it is rendered.
- **Images & Fonts**: Use `next/image` and `next/font` for automatic optimization.

## 5. Security

- **Environment Variables**:
  - Only prefix variables with `NEXT_PUBLIC_` if they must be accessible in the browser.
  - Keep secrets (database URLs, API keys) without the prefix to ensure they stay server-side.
- **Environment Poisoning**:
  - Use the `server-only` package in modules that should never be imported into Client Components.
  - Use the `client-only` package for modules that depend on browser APIs.
