# 🚀 Quick Deployment Guide

The fastest ways to deploy your Data Profiler app to the cloud.

---

## Option 1: Render.com (Easiest - 5 minutes)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Render

**Automatic (Recommended):**
1. Go to https://render.com
2. Sign up/Login with GitHub
3. Click "New" → "Blueprint"
4. Select your repository
5. Render will auto-detect `render.yaml` and deploy both services!

**Manual:**
1. Create Backend Service:
   - "New +" → "Web Service"
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Root Directory: `backend`

2. Create Frontend Static Site:
   - "New +" → "Static Site"
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Root Directory: `frontend`
   - Environment Variable: `VITE_API_URL` = your backend URL

### Step 3: Configure CORS
Add your frontend URL to backend environment variables:
- Variable: `ALLOWED_ORIGINS`
- Value: `https://your-frontend.onrender.com`

**Done!** 🎉 Your app is live!

---

## Option 2: Railway.app (Fast - 5 minutes)

### Step 1: Push to GitHub (same as above)

### Step 2: Deploy
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Create new project
railway init

# Deploy backend
cd backend
railway up

# Deploy frontend (in new terminal)
cd ../frontend
railway up
```

### Step 3: Set Environment Variables
In Railway dashboard:
- Backend: `ALLOWED_ORIGINS` = your frontend URL
- Frontend: `VITE_API_URL` = your backend URL

**Done!** 🎉

---

## Option 3: Docker (Self-Host - 2 minutes)

### Deploy to Any Server with Docker

```bash
# On your server
git clone YOUR_REPO_URL
cd PRPL

# Start with Docker Compose
docker-compose up -d

# Check logs
docker-compose logs -f
```

Access at: `http://your-server-ip:3000`

For production, use Nginx reverse proxy with SSL.

---

## Option 4: Vercel (Frontend) + Render (Backend)

### Backend on Render
Follow "Option 1" backend steps above.

### Frontend on Vercel
```bash
cd frontend

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable in Vercel dashboard
# VITE_API_URL = your backend URL

# Deploy to production
vercel --prod
```

**Done!** 🎉

---

## Environment Variables Reference

### Backend Environment Variables
```bash
# Required for production
ALLOWED_ORIGINS=https://your-frontend.com,https://www.your-frontend.com

# Optional
PORT=8000
MAX_FILE_SIZE=104857600
```

### Frontend Environment Variables
```bash
# Required
VITE_API_URL=https://your-backend.com
```

---

## Quick Troubleshooting

### CORS Error
- Make sure `ALLOWED_ORIGINS` in backend includes your frontend URL
- Include both `https://domain.com` and `https://www.domain.com` if needed

### Frontend Can't Connect to Backend
- Verify `VITE_API_URL` is set correctly
- Check backend is running and accessible
- Look at browser console for errors

### File Upload Fails
- Check platform file size limits
- Increase timeout settings if needed
- Verify backend has enough memory

---

## Cost Comparison

| Platform | Free Tier | Always On | Best For |
|----------|-----------|-----------|----------|
| **Render** | ✅ 750hrs/mo | ❌ Sleeps | Quick start |
| **Railway** | ✅ $5 credit | ✅ Yes | Small apps |
| **Vercel** | ✅ Unlimited | ✅ Yes | Frontend |
| **Fly.io** | ✅ Limited | ✅ Yes | Global apps |
| **DigitalOcean** | ❌ $4/mo | ✅ Yes | Full control |

---

## Next Steps After Deployment

1. ✅ Test file upload functionality
2. ✅ Add custom domain (optional)
3. ✅ Set up monitoring (UptimeRobot)
4. ✅ Enable analytics (Plausible)
5. ✅ Configure error tracking (Sentry)

---

## Need More Details?

See the full [DEPLOYMENT.md](DEPLOYMENT.md) guide for:
- Detailed step-by-step instructions
- Advanced configuration options
- Production checklist
- Security best practices
- Monitoring setup

---

**Ready to deploy?** Pick an option above and your app will be live in minutes! 🚀

