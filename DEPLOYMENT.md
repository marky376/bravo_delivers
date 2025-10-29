# Deployment Guide for Bravo Delivers

## Issues Fixed

### 1. **Missing Dependencies**
Added all required packages to `package.json`:
- express
- dotenv
- sequelize
- mysql2
- bcryptjs
- jsonwebtoken
- cors

### 2. **Vercel Configuration**
Updated `vercel.json` to use proper rewrites instead of routes for better compatibility.

### 3. **Static File Serving**
Added proper static file serving and CORS middleware.

### 4. **Route Consolidation**
- Removed duplicate route mounting in `server.js`
- Added `/api` prefix to all API routes for consistency
- Cleaned up redundant order route usage

## Deployment Steps

### Prerequisites
1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your actual values:
   - Database credentials (MySQL)
   - JWT secret
   - Other environment-specific values

### Deploy to Vercel

#### Option 1: Using Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

#### Option 2: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Configure environment variables in the dashboard:
   - `DB_NAME`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_HOST`
   - `DB_PORT`
   - `JWT_SECRET`
   - `NODE_ENV=production`

4. Click "Deploy"

### Important Environment Variables

Make sure to add these in Vercel Dashboard under Project Settings → Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_NAME` | Database name | `bravo_delivers` |
| `DB_USER` | Database username | `admin` |
| `DB_PASSWORD` | Database password | `your_password` |
| `DB_HOST` | Database host | `your-db-host.com` |
| `DB_PORT` | Database port | `3306` |
| `JWT_SECRET` | Secret for JWT tokens | `random_secret_string` |
| `NODE_ENV` | Environment | `production` |

### Database Setup

For production, you'll need a MySQL database. Options:
1. **PlanetScale** (recommended for Vercel)
2. **AWS RDS**
3. **DigitalOcean Managed Database**
4. **Railway**

### Testing Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your `.env` file

3. Run the server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:5000`

### API Endpoints

All API endpoints are prefixed with `/api`:

- `GET /api/status` - Health check
- `GET /api/menu` - Get all menu items
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order
- `POST /api/payments/*` - Payment routes

### Troubleshooting

1. **500 Internal Server Error**
   - Check if all environment variables are set
   - Verify database connection
   - Check Vercel function logs

2. **Database Connection Issues**
   - Ensure your database allows connections from Vercel's IP addresses
   - Verify database credentials
   - Check if database is running

3. **Static Files Not Loading**
   - Ensure files are committed to Git
   - Check Vercel build logs
   - Verify file paths are correct

4. **API Routes Not Working**
   - Check that `/api` prefix is used in frontend requests
   - Verify `vercel.json` configuration
   - Check function logs in Vercel dashboard

### Performance Optimization

1. Enable caching for static assets
2. Use connection pooling for database
3. Implement rate limiting
4. Add compression middleware
5. Optimize images

### Security Checklist

- [ ] Environment variables are not committed to Git
- [ ] JWT secret is strong and random
- [ ] Database credentials are secure
- [ ] CORS is properly configured
- [ ] Input validation is in place
- [ ] SQL injection protection (using Sequelize parameterized queries)
- [ ] Rate limiting is implemented
- [ ] HTTPS is enforced (automatic with Vercel)

### Next Steps

1. Set up database migrations
2. Add logging service (e.g., LogRocket, Sentry)
3. Implement monitoring (e.g., Vercel Analytics)
4. Add tests
5. Set up CI/CD pipeline
6. Configure custom domain
