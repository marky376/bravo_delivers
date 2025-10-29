# Quick Deployment Checklist

## Before Deployment

- [x] ✅ Dependencies added to package.json
- [x] ✅ Vercel configuration fixed
- [x] ✅ CORS middleware enabled
- [x] ✅ Static file serving configured
- [x] ✅ API routes standardized with `/api` prefix
- [x] ✅ Duplicate routes removed
- [x] ✅ Frontend API calls updated
- [x] ✅ .gitignore enhanced
- [x] ✅ .vercelignore created
- [x] ✅ Environment variable template created

## You Need To Do

### 1. Install Dependencies (Required)
```bash
npm install
```

### 2. Create .env File (Required)
```bash
cp .env.example .env
```

Then edit `.env` and add:
- Your database credentials
- A strong JWT secret
- Other configuration

### 3. Set Up Database (Required)
Options:
- **PlanetScale** (recommended, free tier available)
- **Railway** (easy setup)
- **AWS RDS** (enterprise)
- **DigitalOcean** (simple)

### 4. Deploy to Vercel

**Option 1: Vercel CLI (Fastest)**
```bash
npm install -g vercel
vercel login
vercel
```

**Option 2: Vercel Dashboard**
1. Push to GitHub/GitLab/Bitbucket
2. Go to vercel.com
3. "Import Project"
4. Select your repo
5. Add environment variables
6. Deploy!

### 5. Add Environment Variables in Vercel

Go to: Project Settings → Environment Variables

Add these:
```
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_secure_password
DB_HOST=your_database_host
DB_PORT=3306
JWT_SECRET=your_very_secure_random_string
NODE_ENV=production
```

### 6. Test Your Deployment

Visit these URLs after deployment:
- `https://your-app.vercel.app/` - Homepage
- `https://your-app.vercel.app/api/status` - API status
- `https://your-app.vercel.app/api/menu` - Menu endpoint

---

## Quick Commands

```bash
# Install dependencies
npm install

# Test locally
npm run dev

# Deploy to Vercel (after installing vercel CLI)
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs
```

---

## Need Help?

1. Read `DEPLOYMENT.md` for detailed instructions
2. Read `FIXES_SUMMARY.md` for what was fixed
3. Check Vercel logs: Dashboard → Your Project → Deployments → View Function Logs
4. Test locally first: `npm run dev`

---

## Critical: Don't Forget!

⚠️ **Before going live:**
1. Generate a strong random JWT_SECRET (at least 32 characters)
2. Use a secure database password
3. Never commit your `.env` file
4. Set up database properly
5. Test all API endpoints

---

**Everything is fixed! Just follow steps 1-6 above to deploy. 🚀**
