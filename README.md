# 🌐 NILA EXIMS – Import Export Consultant

> **YOUR TRUSTED TRADE PARTNER**  
> Professional Full-Stack Website, Client Portal & Admin Management Dashboard for **NILA EXIMS**, Tiruppur - 641607.

---

## 🎨 Design & Theme Highlights
- **Color Theme**: Modern Green & White (`#0d5c3a` Forest Emerald, `#16a34a` Vibrant Green, `#ffffff` Crisp White, and `#f8fafc` Slate Gray).
- **Logo Concept**: Custom SVG emblem featuring a **Globe with Sweeping Import/Export Arrows**, matching the official brand identity.
- **Professional Banner**: High-resolution showcase featuring the official **NILA EXIMS Visiting Card** (`NilaExims_visiting card.png`).
- **Responsive Layout**: Mobile-first design with a responsive drawer menu, interactive smooth scrolling, and dynamic modals.

---

## 🔐 Role-Based Portals & Authentication
- **Secure JWT Authentication**: Token-based authorization for both Clients and Administrators.
- **Client Accounts**:
  - Clients create an account with their own email address and password using **New Registration**. There is no shared or prefilled client login.
  - Passwords are stored as bcrypt hashes. A client's dashboard only returns requests and work assigned to that account.
- **Admin Portal**: The first admin account is created from `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `server/.env`; credentials are never hard-coded in the repository.

---

## 🏠 Client Portal Features & Sections
1. **Hero Banner**: Highlighting company tagline *"YOUR TRUSTED TRADE PARTNER"*, core pillars (*EXPORT | IMPORT | CONSULT | DELIVER*), contact badges, and visiting card spotlight.
2. **About NILA EXIMS**: Company history led by **T.S. Shankar Kumar (BBM)** in Tiruppur (India's textile export hub).
3. **Interactive Services Portfolio (14+ Services)**:
   - Documentation (Import & Export)
   - ROSCTL (Rebate of State & Central Taxes and Levies)
   - RODTEP (Remission of Duties and Taxes on Exported Products)
   - EPCG (Export Promotion Capital Goods Scheme)
   - EDI Registration
   - ICEGATE Registration
   - AA Licence (Advance Authorization)
   - AEO Certification
   - ISO Certification
   - AEPC (RCMC) Registration
   - IEC (Import Export Code)
   - TXC (Textile Commissioner Clearance)
   - REX System (Registered Exporter)
   - GSP / Certificate of Origin / FTA CO
   - *Clicking any card opens a detailed modal with overview, client benefits, and required document checklists!*
4. **Why NILA EXIMS**: 4 core benefit pillars (Trusted Trade Partner, Fast Processing, Expert Consultancy, Reliable Documentation).
5. **Location & GPS**: Complete office address (*52, Ram Nagar, 4th Street, P.N. Road, Tiruppur - 7*) with an interactive **"Open in Google Maps"** redirection button.
6. **Direct Contact**: Click-to-call (`+91 94437 35942`), click-to-email (`nilaexims@gmail.com`), and quick WhatsApp chat integration.
7. **Service Request Form**: Interactive form allowing clients to submit service requests directly stored in the database.
8. **Client Request Dashboard**: Real-time status tracker with progress steppers and consultant updates.

---

## 🛠 Admin Portal Features
- **Dashboard Metrics Cards**: Total Requests, Pending Count, On Processing Count, Completed Count, Total Clients, Active Projects.
- **Requests Management Table**:
  - Filter requests by status (`All`, `Pending`, `On Processing`, `Completed`).
  - Search requests by client name, email, phone, code, or service type.
  - Update status in real-time with custom admin notes/remarks.
  - Delete obsolete requests.
- **Works & Projects Tracker**: Add ongoing/completed consulting works, update progress %, set target deadlines, and record remarks.
- **Client User Management**: Directory of registered client accounts.

---

## 🧠 Backend & Database Architecture
- **Server Framework**: Node.js & Express.
- **Database Engine**: Cross-platform file database (`server/data/db.json`) with MongoDB Mongoose fallback support. Guarantees zero native C++ build requirements and runs out-of-the-box on any OS.
- **REST API Endpoints**:
  - `POST /api/auth/register` - Client account creation
  - `POST /api/auth/login` - Authenticate Client or Admin
  - `GET /api/auth/me` - Fetch profile from JWT token
  - `POST /api/requests` - Submit new service request
  - `GET /api/requests` - Retrieve requests (Client sees own; Admin sees all)
  - `PUT /api/requests/:id/status` - Admin update request status & notes
  - `DELETE /api/requests/:id` - Admin delete request
  - `GET /api/works` & `POST /api/works` - Manage project entries
  - `GET /api/users` - Admin user directory
  - `GET /api/stats` - Admin metrics breakdown

---

## ⚡ Quick Start Guide (Run Locally)

### Prerequisites
- **Node.js**: v16+ or newer installed.

### 1. Installation
Install root dependencies and build client assets:
```bash
# Clone or open the repository folder
cd Nilaexims_antigravity

# Install server dependencies
cd server
npm install

# Install client dependencies & build frontend
cd ../client
npm install
npm run build
```

### 2. Start Application
From the root project directory:
```bash
# Return to root directory
cd ..

# Create server/.env from server/.env.example and set unique JWT_SECRET,
# ADMIN_EMAIL, and ADMIN_PASSWORD values before starting the server.

# Start the full-stack server (Serves Backend APIs + Frontend SPA)
npm start
```

### 3. Open in Browser
Open your browser and navigate to:
👉 **`http://localhost:5000`**

---

## 📁 Project Structure

```text
Nilaexims_antigravity/
├── client/                      # Vite + React + Tailwind CSS Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/          # Navbar, Hero, About, Services, AdminPortal, ClientDashboard, etc.
│   │   ├── context/             # AuthContext (JWT & User state)
│   │   ├── data/                # servicesData.js (All 14+ services info)
│   │   ├── utils/               # api.js (Fetch wrapper)
│   │   ├── App.jsx              # Main App View Router
│   │   ├── index.css            # Tailwind & Custom Styles
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Express Node.js Backend
│   ├── data/                    # JSON Database Storage (db.json)
│   ├── auth.js                  # JWT Middleware & Authentication
│   ├── database.js              # Database Engine & Seeds
│   ├── index.js                 # Express REST APIs & Static File Server
│   └── package.json
│
├── public/                      # Static Brand Assets
│   └── images/
│       └── nilaexims_visiting_card.png
│
├── package.json                 # Root script runner
└── README.md                    # Project Documentation
```

---

## 👨‍💼 Business Information
- **Company**: NILA EXIMS – Import Export Consultant
- **Founder**: T.S. Shankar Kumar (BBM)
- **Address**: 52, Ram Nagar, 4th Street, P.N. Road, Tiruppur - 641607, Tamil Nadu, India
- **Phone**: +91 94437 35942
- **Email**: nilaexims@gmail.com
- **Tagline**: YOUR TRUSTED TRADE PARTNER
