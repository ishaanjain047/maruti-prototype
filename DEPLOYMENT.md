# 🚀 GitHub Pages Deployment Guide

This guide will help you deploy the Maruti Suzuki Infrastructure Prototype to GitHub Pages.

## ✅ What's Already Done

- ✅ Next.js configured for static export (`output: 'export'`)
- ✅ Static HTML files generated in `/out` folder
- ✅ GitHub Actions workflow created (`.github/workflows/deploy.yml`)
- ✅ All files committed and pushed to repository

## 📋 Steps to Enable GitHub Pages

### Step 1: Go to Repository Settings

1. Navigate to your repository on GitHub:
   ```
   https://github.com/ishaanjain047/maruti-prototype
   ```

2. Click on **Settings** tab (top menu)

### Step 2: Enable GitHub Pages

1. In the left sidebar, scroll down and click **Pages**

2. Under **Source**, select:
   - **Source**: `GitHub Actions`

   ![GitHub Pages Source](https://docs.github.com/assets/cb-47267/mw-1440/images/help/pages/github-actions-source.webp)

3. Click **Save**

### Step 3: Wait for Deployment

1. Go to **Actions** tab in your repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 2-3 minutes)
4. Once complete, you'll see a green checkmark ✅

### Step 4: Access Your Site

Your prototype will be available at:

**Option A: If using custom domain:**
```
https://ishaanjain047.github.io/maruti-prototype/
```

**Option B: If using organization/user pages:**
```
https://ishaanjain047.github.io/maruti-prototype/
```

## 🔧 Alternative: Manual Deployment (No GitHub Actions)

If you prefer manual deployment or GitHub Actions isn't working:

### Method 1: Deploy from `out` folder

1. Go to **Settings** → **Pages**
2. Under **Source**, select `Deploy from a branch`
3. Select branch: `claude/maruti-suzuki-prototype-BNcPz`
4. Select folder: `/out`
5. Click **Save**

### Method 2: Create `gh-pages` branch

```bash
# Create and switch to gh-pages branch
git checkout --orphan gh-pages

# Remove all files
git rm -rf .

# Copy files from out folder
cp -r out/* .

# Add and commit
git add .
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
git push origin gh-pages

# Switch back to main branch
git checkout claude/maruti-suzuki-prototype-BNcPz
```

Then in GitHub Settings → Pages, select `gh-pages` branch and `/` (root) folder.

## 🌐 Custom Domain (Optional)

To use a custom domain like `maruti-prototype.yourdomain.com`:

1. Add your domain in **Settings** → **Pages** → **Custom domain**
2. Add a `CNAME` file in the `out` folder:
   ```bash
   echo "maruti-prototype.yourdomain.com" > out/CNAME
   ```
3. Rebuild and redeploy
4. Configure DNS at your domain registrar:
   ```
   Type: CNAME
   Name: maruti-prototype
   Value: ishaanjain047.github.io
   ```

## 🔄 Updating the Site

Every time you push to the `claude/maruti-suzuki-prototype-BNcPz` branch, GitHub Actions will:

1. Automatically build the static site
2. Deploy to GitHub Pages
3. Your site will be updated in 2-3 minutes

To manually trigger a deployment:
1. Go to **Actions** tab
2. Select "Deploy to GitHub Pages" workflow
3. Click **Run workflow** button

## 📱 Testing Locally

Before deploying, you can test the static export locally:

```bash
# Build the static export
npm run build

# Serve the out folder locally (install serve if needed)
npx serve out

# Or use Python
cd out
python3 -m http.server 8000
```

Then visit `http://localhost:8000`

## 🐛 Troubleshooting

### Issue: 404 on subpages when refreshing

**Solution:** This is normal for static exports. GitHub Pages handles this automatically.

### Issue: CSS/JS not loading

**Cause:** May need to uncomment basePath in `next.config.mjs`

**Solution:**
```javascript
// In next.config.mjs, uncomment these lines:
basePath: '/maruti-prototype',
assetPrefix: '/maruti-prototype',
```

Then rebuild: `npm run build`

### Issue: Deployment fails in GitHub Actions

**Check:**
1. Repository has GitHub Pages enabled
2. Actions have write permissions (Settings → Actions → Workflow permissions)
3. Node version is compatible (workflow uses Node 20)

### Issue: Site not updating after push

**Solutions:**
1. Check Actions tab - workflow might have failed
2. Clear browser cache (Ctrl+F5)
3. Wait 5-10 minutes for CDN to update
4. Try incognito/private browsing mode

## 📊 Build Information

- **Total Pages:** 12 HTML files
- **Build Size:** ~96-136 kB per page (First Load JS)
- **Build Time:** ~2-3 minutes
- **All pages:** Statically pre-rendered

## 🎯 What Works on GitHub Pages

✅ All pages and navigation
✅ Interactive features (buttons, tabs, filters)
✅ AI analysis animation
✅ Provisioning progress tracking
✅ Form validations
✅ Real-time UI updates
✅ Mobile responsive design
✅ Maruti Suzuki branding
✅ Mock data demonstrations

## 📞 Support

If you encounter issues:
1. Check the [GitHub Actions logs](../../actions)
2. Review the [Next.js static export docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
3. Check [GitHub Pages documentation](https://docs.github.com/en/pages)

---

**🎉 Your prototype is ready to be deployed to GitHub Pages!**

Just follow Step 1-3 above, and your site will be live in minutes.
