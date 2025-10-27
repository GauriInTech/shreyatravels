# add-api-server (example)

This branch adds a small example API server (file-backed) that provides persistent storage
for contacts and destinations. It's intended as a simple, deployable backend you can
use for cross-device persistence during testing or small deployments.

What is included
- server/example-server.js — Express server with endpoints under /api
- server/package.json — Node deps
- server/seed-import.js — helper to import exported JSON into server data_store
- server/.gitignore — ignore node_modules and data_store

How to run locally
1. cd server
2. npm install
3. npm run dev   # requires nodemon (dev) or npm start

Server endpoints (prefix /api)
- GET /api/health
- GET /api/contacts
- POST /api/contacts        { objectData: {...} } or raw object
- DELETE /api/contacts/:id
- GET /api/destinations
- POST /api/destinations   { objectData: {...} } or raw objectData
- PUT /api/destinations/:id
- DELETE /api/destinations/:id

Connecting the frontend (no changes required to your existing files)
- Option (recommended): add this one-liner to your HTML pages (admin.html, index.html, contact.html)
  before the app scripts:
  <script>window.SHREYA_API_ENDPOINT = 'https://your-server.example.com/api'</script>

  This tells the updated frontend code to call your central API. If you don't add this,
  the frontend still falls back to localStorage.

Migration
- Use the admin UI Export JSON (DestinationsManager) to export destinations.json.
- Use server/seed-import.js to import that file into the server's storage:
  node server/seed-import.js path/to/your/exported/destinations.json

Security
- This example server does not include authentication — secure admin endpoints before production.
- Enable CORS only for your website domain(s) and add rate-limiting / auth as needed.

Deployment
- Host on Render, Vercel (serverless with small changes), Heroku, DigitalOcean Apps, etc.
- Ensure process.env.PORT is respected (default 3000).