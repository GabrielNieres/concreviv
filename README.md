# CONCREVIV V4

A modern web application for home design customization, built with Next.js, Tailwind CSS, and Supabase.

---

## 🚀 Deployment Guide (Vercel)

### 1. Push Your Code to GitHub

If you haven't already:

```bash
git init
git add .
git commit -m "Initial commit"
```

Create a new repository on GitHub, then:

```bash
git remote add origin https://github.com/your-username/your-repo.git
git branch -M main
git push -u origin main
```

---

### 2. Prepare Environment Variables

Create a `.env.local` file in your project root with:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

You will add these to Vercel in the next step.

---

### 3. Deploy to Vercel

1. Go to [https://vercel.com/](https://vercel.com/) and sign in with your GitHub account.
2. Click **"New Project"** and import your repository.
3. Vercel will auto-detect Next.js. Click **"Deploy"**.
4. When prompted, add your environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
5. Wait for the build to finish. You'll get a live URL (e.g., `https://your-project.vercel.app`).

---

### 4. Post-Deployment Checklist

- [ ] App loads at your Vercel URL
- [ ] Authentication works (login/logout)
- [ ] Database operations (save preferences, leads, dashboard) work
- [ ] Environment variables are set in Vercel dashboard
- [ ] Supabase CORS settings allow your Vercel domain

---

### 5. Custom Domain (Optional)

- In Vercel, go to your project > Settings > Domains > Add Domain
- Follow the instructions to point your domain to Vercel

---

### 6. Troubleshooting

- **Build fails?**
  - Check your environment variables in Vercel
  - Make sure your Supabase project is set up and tables exist
- **Auth not working?**
  - Check that your Supabase URL and anon key are correct
  - Check Supabase Auth settings (redirect URLs)
- **Database errors?**
  - Check Supabase table policies and RLS settings
  - Use the Supabase dashboard to inspect data and logs

---

## 📖 Project Features
- Next.js App Router
- Tailwind CSS for styling
- Supabase for authentication and database
- User dashboard, preferences, and leads
- Real-time updates

---

## 🛠️ Development

```bash
npm install
npm run dev
```

---

## 📬 Need Help?
If you have any issues, open an issue on GitHub or contact the project maintainer.

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
