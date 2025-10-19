# Deployment Guide - Pastilla Maison

This guide walks you through deploying your Pastilla Maison restaurant website to Vercel with Supabase as your database.

## Prerequisites

- A GitHub account with your repository pushed
- A Vercel account (free tier available)
- A Supabase account with your project set up
- Your Supabase credentials ready

## Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. Make sure all your code is committed and pushed to GitHub:

\`\`\`bash
git add .
git commit -m "Ready for deployment"
git push origin main
\`\`\`

### Step 2: Create a Vercel Project

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** and select **"Project"**
3. Select **"Import Git Repository"**
4. Find and select your `pastillamaison` repository
5. Click **"Import"**

### Step 3: Configure Environment Variables

1. In the Vercel project settings, go to **Settings > Environment Variables**
2. Add the following environment variables:

| Variable | Value | Source |
|----------|-------|--------|
| `SUPABASE_NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL | Supabase Dashboard > Settings > SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY_ANON_KEY` | Your Supabase Anon Key | Supabase Dashboard > Settings > API |
| `NEXT_PUBLIC_APP_URL` | Your Vercel deployment URL | Will be shown after first deploy |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Your secure admin password | Create your own |

#### How to Get Your Supabase Credentials

1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **Settings** in the left sidebar
4. Click the **API** tab
5. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys > anon** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 4: Deploy

1. Click **"Deploy"** button in Vercel
2. Wait for the deployment to complete (usually 2-5 minutes)
3. Once complete, you'll get a deployment URL like `https://pastillamaison.vercel.app`

### Step 5: Update Environment Variables with Deployment URL

1. After your first deployment, go back to Vercel project settings
2. Update `NEXT_PUBLIC_APP_URL` with your actual deployment URL
3. Redeploy the project

### Step 6: Verify Database Setup

1. Make sure your Supabase database tables are created
2. If not, run the SQL scripts:
   - Go to Supabase Dashboard > SQL Editor
   - Run `scripts/01-init-database.sql` to create tables
   - Run `scripts/02-seed-admin.sql` to seed data

## Accessing Your Deployed Site

Your site will be available at: `https://your-project-name.vercel.app`

### Admin Access

1. Go to `https://your-project-name.vercel.app/admin`
2. Log in with:
   - Email: `admin@pastillamaison.com`
   - Password: `admin123` (or your custom password)

## Custom Domain Setup

To use a custom domain (e.g., `www.pastillamaison.com`):

1. In Vercel project settings, go to **Domains**
2. Click **"Add Domain"**
3. Enter your domain name
4. Follow the DNS configuration instructions
5. Update your domain registrar's DNS settings

## Environment Variables Reference

### Required for Production

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=https://pastillamaison.vercel.app
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
\`\`\`

### Optional

- `NEXT_PUBLIC_ANALYTICS_ID` - For analytics tracking

## Monitoring and Maintenance

### Check Deployment Status

1. Go to Vercel Dashboard
2. Select your project
3. View deployment history and logs

### View Application Logs

1. In Vercel project, go to **Deployments**
2. Click on a deployment
3. Click **"Logs"** to see real-time logs

### Database Monitoring

1. Go to Supabase Dashboard
2. Check **Database > Logs** for query logs
3. Monitor **Database > Backups** for automatic backups

## Troubleshooting Deployment

### Deployment Failed

**Check the logs:**
1. Go to Vercel Dashboard > Deployments
2. Click the failed deployment
3. Click **"Logs"** to see error messages

**Common issues:**
- Missing environment variables
- Database not initialized
- Node.js version mismatch

### Environment Variables Not Working

1. Verify variables are set in Vercel Settings > Environment Variables
2. Redeploy after adding/changing variables
3. Check that variable names are exactly correct (case-sensitive)

### Database Connection Errors

1. Verify Supabase project is active
2. Check that database tables exist (run SQL scripts if needed)
3. Verify credentials are correct in environment variables
4. Check Supabase project status at https://supabase.com/dashboard

### Site Shows Blank Page

1. Check Vercel deployment logs
2. Check browser console for errors (F12)
3. Verify all environment variables are set
4. Try clearing browser cache

## Updating Your Site

To update your deployed site:

1. Make changes locally
2. Commit and push to GitHub:
   \`\`\`bash
   git add .
   git commit -m "Your changes"
   git push origin main
   \`\`\`
3. Vercel will automatically redeploy your site
4. Check deployment status in Vercel Dashboard

## Database Migrations

To update your database schema in production:

1. Create a new SQL file in `scripts/` folder
2. Go to Supabase Dashboard > SQL Editor
3. Run your migration script
4. Test thoroughly before deploying code changes

## Performance Optimization

### Enable Caching

1. In Vercel project settings, go to **Deployment Protection**
2. Configure cache settings for static assets

### Monitor Performance

1. Go to Vercel Analytics (if enabled)
2. Check Core Web Vitals
3. Optimize images and assets as needed

## Security Best Practices

1. **Never commit `.env.local`** - Use `.env.local.example` instead
2. **Rotate admin password** - Change default password immediately
3. **Enable RLS** - All database tables have Row Level Security enabled
4. **Use HTTPS** - Vercel provides free HTTPS
5. **Monitor logs** - Regularly check Vercel and Supabase logs

## Rollback to Previous Deployment

If something goes wrong:

1. Go to Vercel Dashboard > Deployments
2. Find the previous working deployment
3. Click the three dots menu
4. Select **"Promote to Production"**

## Support and Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/help

## Checklist Before Going Live

- [ ] All environment variables are set in Vercel
- [ ] Database tables are created in Supabase
- [ ] Admin account is created and working
- [ ] Menu items are seeded in database
- [ ] Test ordering flow works
- [ ] Test reservation flow works
- [ ] Test admin dashboard access
- [ ] Custom domain is configured (if applicable)
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] Backups are enabled in Supabase
