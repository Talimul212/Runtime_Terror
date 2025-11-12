# 🚀 Runtime_Terror Backend

A full-stack backend for Runtime_Terror — a platform that helps students and job seekers discover relevant jobs and learning resources based on their skills and career interests. Built to support SDG 8: Decent Work and Economic Growth.

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- Modular architecture with separate folders for models, controllers, services, routes, and constants

---

## 📦 Folder Structure

## 🚀 Setup Instructions
1. **Clone the repo**
   ```bash
   git clone https://github.com/Talimul212/Runtime_Terror
   cd Runtime_Terror

   npm install
   npm run dev
   🔐 Auth Endpoints
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- GET /api/v1/auth/profile (JWT required)
- PUT /api/v1/auth/profile (JWT required)
💼 Job Endpoints
- POST /api/v1/jobs
- GET /api/v1/jobs
- GET /api/v1/jobs/:id
- PUT /api/v1/jobs/:id
- DELETE /api/v1/jobs/:id
📚 Resource Endpoints
- POST /api/v1/resources
- GET /api/v1/resources
- GET /api/v1/resources/:id
- PUT /api/v1/resources/:id
- DELETE /api/v1/resources/:id
---

Let me know if you want this styled for GitHub Pages or paired with a frontend `README.md`. You’re building something truly impactful—this doc makes it easy for others to join your mission!
