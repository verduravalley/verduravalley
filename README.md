This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DIRECT_URL` | yes | Postgres connection string. Without it every data-backed page and API route returns 500. |
| `JWT_SECRET` | yes | Signs the dashboard session cookie. Without it no one can sign in to `/dashboard`. |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | for uploads | Image and video uploads from the dashboard. |
| `RESEND_API_KEY` | for email | Contact and custom-product form notifications. |

## Setting up the database

Against a new, empty database, run:

```bash
DIRECT_URL="postgresql://..." node scripts/setup-db.mjs
```

This applies the schema and prompts for the first admin account. Set
`ADMIN_USERNAME`, `ADMIN_EMAIL` and `ADMIN_PASSWORD` to run it unattended.
It is safe to re-run: the schema is idempotent and an existing admin is left
alone.

Use this script rather than `POST /api/init-db` for a new database. That route
is admin-only, and a new database has no admin yet - it is for applying later
schema changes once you can already sign in. Both share `lib/schema.mjs`, so
they cannot drift.

Sign in at `/en/sign-in`.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
