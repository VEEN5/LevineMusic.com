# Deploy Levine Site

## Vercel

1. Push this folder to a new GitHub repo.
2. Import the repo into Vercel.
3. Use:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

## Domain

1. Open the Vercel project.
2. Go to `Settings > Domains`.
3. Add your custom domain.
4. Point your DNS records to Vercel.

## Important Files

- Site content: `src/data/artistContent.js`
- Hero styling: `src/components/Hero.jsx`
- Music section: `src/components/MusicSection.jsx`
- Security headers: `vercel.json`
