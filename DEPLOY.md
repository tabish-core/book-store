# Deployment Guide (Free Tier)

This guide walks you through deploying your **Book Store App**. You can choose between:
**Option 1:** Render (Backend) + Vercel (Frontend) [Recommended for beginners]
**Option 2:** Vercel Only (Both Frontend & Backend) [If you prefer one platform]

## Prerequisites
1.  **GitHub Account:** Push your code to a GitHub repository.
    -   Ensure your repo structure has `frontend` and `backend` folders at the root.
2.  **MongoDB Atlas:** Have your connection string ready (`mongodb+srv://...`).

---

## Part 1: Backend (Render)
1.  Go to [dashboard.render.com](https://dashboard.render.com/) and create a **New Web Service**.
2.  Connect your GitHub repository.
3.  **Configure the Service:**
    -   **Name:** `book-store-backend` (or similar)
    -   **Root Directory:** `backend` (Important!)
    -   **Runtime:** `Node`
    -   **Build Command:** `npm install`
    -   **Start Command:** `node index.js`
    -   **Instance Type:** Free
4.  **Environment Variables:**
    Scroll down to "Environment Variables" and add:
    -   `MONGODBURL`: (Your MongoDB connection string)
    -   `PORT`: `5555`
    -   `JWT_SECRET`: (Your secret key, can be anything random string)
5.  Click **Create Web Service**.
6.  **Wait for Deployment:** It might take a few minutes. Once live, copy the **Service URL** (e.g., `https://book-store-backend.onrender.com`).
    *   *Note: The first request might be slow as the free tier spins down on inactivity.*

---

## Part 2: Frontend (Vercel)
(Follow this for both options)
1.  Go to [vercel.com](https://vercel.com/) and **Add New > Project**.
2.  Import your GitHub repository.
3.  **Configure the Project:**
    -   **Framework Preset:** Vite (Auto-detected usually)
    -   **Root Directory:** Click "Edit" and select `frontend`.
4.  **Environment Variables:**
    Expand the "Environment Variables" section and add:
    -   `VITE_API_URL`: 
        -   **If using Render:** (Paste your Render Backend URL)
        -   **If using Vercel Backend:** (Paste your Vercel Backend URL, see below)
5.  Click **Deploy**.

---

## Option 2: Full Vercel Deployment (Backend on Vercel)
If you prefer to host Everything on Vercel:

1.  **Deploy Backend to Vercel:**
    -   Go to Vercel dashboard > Add New > Project.
    -   Import the **Same Repository** again.
    -   **Project Name:** `book-store-backend`
    -   **Root Directory:** Click "Edit" and select `backend`.
    -   **Framework Preset:** Other (or leave default).
    -   **Environment Variables:**
        -   `MONGODBURL`: (Your MongoDB connection string)
        -   `PORT`: `5555` (Optional but good to keep)
        -   `JWT_SECRET`: (Your secret)
    -   Click **Deploy**.
    -   Copy the **Production URL** (e.g., `https://book-store-backend.vercel.app`).

2.  **Connect Frontend:**
    -   Now go to your **Frontend Project** settings on Vercel.
    -   Update `VITE_API_URL` to point to your new **Vercel Backend URL**.
    -   Redeploy Frontend.

**Congratulations! Your Brutalist Book Store is live!** 🚀
