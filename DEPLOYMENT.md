# Deployment Guide for Data Profiler

This guide covers multiple deployment options for your full-stack Data Profiler application.

## 📋 Table of Contents

1. [Quick Deploy (Render)](#option-1-render-recommended)
2. [Railway Deployment](#option-2-railway)
3. [Docker Deployment](#option-3-docker-self-hosting)
4. [Separate Deployments](#option-4-separate-deployments)
5. [Environment Variables](#environment-variables)

---

## Option 1: Render (Recommended)

Render offers free hosting for both frontend and backend with easy setup.

### Backend Deployment on Render

1. **Push your code to GitHub** (if not already)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Create Render Account**: Go to https://render.com and sign up

3. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `data-profiler-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Python 3`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
     - **Instance Type**: Free

4. **Add Environment Variables** (if needed):
   - `PORT`: (automatically set by Render)

5. **Deploy**: Click "Create Web Service"

Your backend will be at: `https://data-profiler-backend.onrender.com`

### Frontend Deployment on Render

1. **Create New Static Site**:
   - Click "New +" → "Static Site"
   - Connect same GitHub repository
   - Configure:
     - **Name**: `data-profiler-frontend`
     - **Root Directory**: `frontend`
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`

2. **Update API URL**:
   - Add environment variable:
     - `VITE_API_URL`: `https://data-profiler-backend.onrender.com`

3. **Deploy**: Click "Create Static Site"

Your app will be at: `https://data-profiler-frontend.onrender.com`

---

## Option 2: Railway

Railway provides easy deployment with automatic HTTPS and custom domains.

### Deploy Backend

1. **Install Railway CLI** (optional):
   ```bash
   npm i -g @railway/cli
   railway login
   ```

2. **Or use Railway Dashboard**:
   - Go to https://railway.app
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Add service for `backend` directory

3. **Configure Backend**:
   - **Root Directory**: `backend`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Build Command**: `pip install -r requirements.txt`

4. **Get Backend URL**: Railway will provide a URL like `backend-production.up.railway.app`

### Deploy Frontend

1. **Add Frontend Service**:
   - In same project, click "New" → "GitHub Repo"
   - Select same repo, different service
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview -- --host 0.0.0.0 --port $PORT`

2. **Set Environment Variable**:
   - `VITE_API_URL`: Your backend URL

---

## Option 3: Docker (Self-Hosting)

Deploy anywhere using Docker containers.

### Prerequisites
- Docker installed on your server
- Docker Compose (optional but recommended)

### Step 1: Build and Run

```bash
# Build and start services
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop services
docker-compose down
```

Your app will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

### Deploy to Server

1. **Copy files to server**:
   ```bash
   rsync -avz . user@your-server.com:/app/data-profiler
   ```

2. **SSH into server and start**:
   ```bash
   ssh user@your-server.com
   cd /app/data-profiler
   docker-compose up -d
   ```

3. **Set up Nginx reverse proxy** (recommended for production)

---

## Option 4: Separate Deployments

Deploy frontend and backend on different platforms.

### Backend Options:
- **Railway**: Best for Python apps
- **Render**: Free tier available
- **Fly.io**: Good for global distribution
- **Heroku**: Classic choice (paid)
- **AWS EC2**: Full control
- **DigitalOcean**: Simple droplets

### Frontend Options:
- **Vercel**: Best for React apps (recommended)
- **Netlify**: Great for static sites
- **Cloudflare Pages**: Fast CDN
- **GitHub Pages**: Free for public repos

### Example: Vercel (Frontend) + Railway (Backend)

**Deploy Backend on Railway** (see Option 2)

**Deploy Frontend on Vercel**:

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Navigate to frontend and deploy:
   ```bash
   cd frontend
   vercel
   ```

3. Set environment variable in Vercel dashboard:
   - `VITE_API_URL`: Your Railway backend URL

4. Redeploy:
   ```bash
   vercel --prod
   ```

---

## Environment Variables

### Backend Environment Variables

Create `backend/.env` file:

```env
# CORS Settings (update with your frontend URL)
FRONTEND_URL=https://your-frontend-url.com

# Optional: Port (if not using default)
PORT=8000

# Optional: Upload limits
MAX_FILE_SIZE=104857600  # 100MB in bytes
MAX_ROWS=1000000
```

### Frontend Environment Variables

Create `frontend/.env` file:

```env
# Backend API URL
VITE_API_URL=https://your-backend-url.com
```

**Important**: Update these in your deployment platform's dashboard!

---

## Production Checklist

Before deploying to production:

- [ ] Update CORS settings in `backend/main.py` with your frontend domain
- [ ] Set appropriate environment variables
- [ ] Enable HTTPS (most platforms do this automatically)
- [ ] Test file upload with various file sizes
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Configure proper file size limits
- [ ] Add rate limiting if needed
- [ ] Set up database for persistent report storage (optional)
- [ ] Configure backup strategy
- [ ] Add analytics (Google Analytics, Plausible, etc.)
- [ ] Set up custom domain (optional)

---

## Updating CORS for Production

Edit `backend/main.py` to allow your frontend domain:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-frontend-domain.com",
        "http://localhost:3000",  # Keep for local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Troubleshooting

### Common Issues

**1. CORS Errors**
- Make sure backend CORS settings include your frontend URL
- Check that HTTPS is used consistently

**2. File Upload Fails**
- Check file size limits on your hosting platform
- Increase timeout settings if needed

**3. Backend Not Starting**
- Verify all dependencies in `requirements.txt`
- Check platform logs for errors

**4. Frontend Can't Connect to Backend**
- Verify `VITE_API_URL` is set correctly
- Check network requests in browser DevTools

---

## Cost Estimates

### Free Tier Options
- **Render**: Free (with 750 hours/month, sleeps after inactivity)
- **Railway**: $5 credit/month (usually enough for small apps)
- **Vercel**: Free (unlimited bandwidth for non-commercial)
- **Netlify**: Free (100GB bandwidth/month)

### Paid Options
- **Render**: $7/month (always on)
- **Railway**: Pay as you go (~$5-10/month)
- **Heroku**: $7/month per dyno
- **DigitalOcean**: $4-6/month (droplet)

---

## Monitoring & Maintenance

### Recommended Tools
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Error Tracking**: Sentry
- **Analytics**: Plausible, Google Analytics
- **Logs**: Built-in platform logs or Papertrail

---

## Need Help?

- Check platform-specific documentation
- Review deployment logs for errors
- Test locally first with production-like settings
- Use Docker for consistent environments

---

**Ready to deploy?** Start with Render (Option 1) for the easiest setup! 🚀

