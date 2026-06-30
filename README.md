# HostelHub — Hostel Utility Service Management

A full-stack hostel management platform for **students** and **wardens/admins**, built with React + Vite, Node.js/Express, MongoDB, and JWT authentication.

## Features

### Students
- Secure signup/signin with JWT tokens
- Submit complaints (maintenance, food, cleanliness, etc.)
- **Track complaint status** (Pending → In Progress → Resolved)
- View **private warden replies** on their complaints only
- View general **announcements** broadcast to all students
- Browse daily **food menu** by meal type

### Warden / Admin
- Secure admin portal with role-based JWT access
- Manage all student complaints with status updates
- Send **private comments** to individual students (not public announcements)
- Post **general announcements** visible to all students
- Full **food menu CRUD** (create, read, update, delete)
- View registered hostellers

### Platform
- Dark / light mode toggle
- Protected routes by role (student vs admin)
- bcrypt password hashing
- Deployment-ready (Render, Railway, VPS)
- Security headers & CORS configuration

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Zustand, Framer Motion |
| Backend | Node.js, Express (ES modules) |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |

---

## Quick Start (Development)

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone & install

```bash
cd "hostal_managem ent"
npm install
cd frontend && npm install && cd ..
```

### 2. Configure environment

Copy `.env.example` to `.env` in the project root:

```bash
cp .env.example .env
```

Edit `.env`:

```env
MONGO_URI=mongodb://localhost:27017/hostel_utility
JWT_SECRET=your_long_random_secret_key_here
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Run backend & frontend

**Terminal 1 — Backend:**
```bash
npm run dev
```

**Terminal 2 — Frontend:**
```bash
npm run dev:frontend
```

- Frontend: http://localhost:5173
- API: http://localhost:5000/api

---

## Deployment

### Build frontend

```bash
npm run build
```

### Production mode (single server)

Set in `.env`:
```env
NODE_ENV=production
CLIENT_URL=https://your-domain.com
```

Start:
```bash
npm start
```

The Express server serves the built frontend from `frontend/dist` and the API from `/api`.

### Deploy to Render / Railway
1. Push to GitHub
2. Set environment variables (`MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`, `CLIENT_URL`)
3. Build command: `npm install && npm run build`
4. Start command: `npm start`

---

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/signup` | Public | Student registration |
| POST | `/api/signin` | Public | Student login → JWT |
| POST | `/api/signupadmin` | Public | Admin registration |
| POST | `/api/signinadmin` | Public | Admin login → JWT |
| POST | `/api/complaint` | Student | Submit complaint |
| GET | `/api/my-complaints` | Student | Own complaints + status |
| GET | `/api/getcomplaints` | Admin | All complaints |
| PATCH | `/api/complaints/:id` | Admin | Update status + private reply |
| GET/POST | `/api/getfood`, `/api/create_food` | Public / Admin | Food menu |
| PUT/DELETE | `/api/food/:id` | Admin | Edit/delete food |
| GET/POST | `/api/getannounce`, `/api/announce` | Public / Admin | Announcements |
| DELETE | `/api/announce/:id` | Admin | Remove announcement |
| GET | `/api/hostalstud` | Admin | List students |

All protected routes require header: `Authorization: Bearer <token>`

---

## User Flows

### Complaint vs Announcement
- **Complaint**: Student submits → Warden sees in Complaints panel → Updates status + writes private reply → Student sees update on **My Status** page
- **Announcement**: Warden posts general notice → **All students** see it on Announcements page

---

## Project Structure

```
hostal_managem ent/
├── backend/
│   ├── server.js
│   ├── middleware/auth.js
│   ├── controllers/
│   ├── models/
│   └── routes/
├── frontend/
│   └── src/
│       ├── pages/        # Student views
│       ├── admin/        # Warden views
│       ├── components/   # UI + ThemeToggle
│       ├── context/      # Theme provider
│       └── store/        # Zustand + JWT persist
├── .env.example
└── README.md
```

---

## Security Notes

- Passwords are hashed with bcrypt (12 rounds)
- JWT tokens expire after 7 days (configurable)
- Admin routes reject student tokens and vice versa
- Never commit `.env` or real credentials to git
- Change `JWT_SECRET` before production deployment

---

## License

ISC
