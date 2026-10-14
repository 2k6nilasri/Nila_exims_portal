require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const { db, initDatabase } = require('./database');
const { generateToken, authenticateToken, optionalAuthenticateToken, requireAdmin } = require('./auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static images / assets
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Helper to generate unique request code
function generateRequestCode() {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `NILA-${year}-${randomNum}`;
}

// ----------------------------------------------------
// AUTH ROUTES
// ----------------------------------------------------

// User Registration (Clients)
app.post('/api/auth/register', async (req, res) => {
  const { name, email, phone, password, company_name } = req.body;
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

  if (!name || !normalizedEmail || !password || !phone) {
    return res.status(400).json({ error: 'Name, Email, Phone, and Password are required.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({ error: 'Enter a valid email address.' });
  }

  if (typeof password !== 'string' || password.length < 8 || Buffer.byteLength(password, 'utf8') > 72) {
    return res.status(400).json({ error: 'Password must be at least 8 characters and no more than 72 bytes.' });
  }

  const existingUser = db.findUserByEmail(normalizedEmail);
  if (existingUser) {
    return res.status(400).json({ error: 'An account with this email address already exists.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = db.createUser({
      name,
      email: normalizedEmail,
      phone,
      password: hashedPassword,
      role: 'client',
      company_name: company_name || ''
    });

    const { password: _, ...userWithoutPassword } = newUser;
    const token = generateToken(userWithoutPassword);

    res.status(201).json({
      message: 'Registration successful! Welcome to NILA EXIMS.',
      token,
      user: userWithoutPassword
    });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user: ' + err.message });
  }
});

// Login (Client & Admin)
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

  if (!normalizedEmail || typeof password !== 'string' || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = db.findUserByEmail(normalizedEmail);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const { password: _, ...userWithoutPassword } = user;
  const token = generateToken(userWithoutPassword);

  res.json({
    message: 'Login successful!',
    token,
    user: userWithoutPassword
  });
});

// Get Current User Profile
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = db.findUserById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User profile not found.' });

  const { password, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});


// ----------------------------------------------------
// CLIENT SERVICE REQUEST ROUTES
// ----------------------------------------------------

// Submit Service Request (Public or Authenticated)
app.post('/api/requests', optionalAuthenticateToken, (req, res) => {
  const { name, email, phone, service_type, message } = req.body;

  if (!name || !email || !phone || !service_type) {
    return res.status(400).json({ error: 'Name, Email, Phone, and Service Type are required.' });
  }

  const requestCode = generateRequestCode();
  const newRequest = db.createRequest({
    request_code: requestCode,
    user_id: req.user ? Number(req.user.id) : null,
    name,
    email: email.toLowerCase(),
    phone,
    service_type,
    message: message || ''
  });

  res.status(201).json({
    message: 'Service request submitted successfully!',
    request: newRequest
  });
});

// Get Requests (Role-dependent)
app.get('/api/requests', authenticateToken, (req, res) => {
  const { status, search } = req.query;

  const requests = db.getRequests({
    role: req.user.role,
    userId: req.user.id,
    statusFilter: status,
    search
  });

  res.json({ requests });
});

// Update Request Status (Admin Only)
app.put('/api/requests/:id/status', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status, admin_notes } = req.body;

  const validStatuses = ['Pending', 'On Processing', 'Completed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Allowed: Pending, On Processing, Completed.' });
  }

  const updatedReq = db.updateRequestStatus(id, status, admin_notes);
  if (!updatedReq) {
    return res.status(404).json({ error: 'Request not found.' });
  }

  res.json({
    message: `Request status updated to "${status}" successfully.`,
    request: updatedReq
  });
});

// Delete Request (Admin Only)
app.delete('/api/requests/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const deleted = db.deleteRequest(id);
  if (!deleted) return res.status(404).json({ error: 'Request not found.' });

  res.json({ message: 'Request deleted successfully.' });
});


// ----------------------------------------------------
// WORKS MANAGEMENT ROUTES (Admin Portal)
// ----------------------------------------------------

// Get All Works
app.get('/api/works', authenticateToken, (req, res) => {
  const works = db.getWorks({
    role: req.user.role,
    userEmail: req.user.email
  });
  res.json({ works });
});

// Create Work (Admin Only)
app.post('/api/works', authenticateToken, requireAdmin, (req, res) => {
  const { client_name, client_email, service_type, progress, status, deadline, remarks } = req.body;

  if (!client_name || !service_type) {
    return res.status(400).json({ error: 'Client Name and Service Type are required.' });
  }

  const newWork = db.createWork({
    client_name,
    client_email: client_email || '',
    service_type,
    progress: progress !== undefined ? Number(progress) : 0,
    status: status || 'In Progress',
    deadline: deadline || '',
    remarks: remarks || ''
  });

  res.status(201).json({ message: 'Work entry created successfully.', work: newWork });
});

// Update Work (Admin Only)
app.put('/api/works/:id', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { client_name, client_email, service_type, progress, status, deadline, remarks } = req.body;

  const updatedWork = db.updateWork(id, {
    client_name,
    client_email,
    service_type,
    progress: progress !== undefined ? Number(progress) : undefined,
    status,
    deadline,
    remarks
  });

  if (!updatedWork) return res.status(404).json({ error: 'Work item not found.' });
  res.json({ message: 'Work updated successfully.', work: updatedWork });
});


// ----------------------------------------------------
// USER MANAGEMENT ROUTES (Admin Only)
// ----------------------------------------------------

app.get('/api/users', authenticateToken, requireAdmin, (req, res) => {
  const users = db.getAllUsers();
  res.json({ users });
});


// ----------------------------------------------------
// DASHBOARD STATS ROUTE (Admin Only)
// ----------------------------------------------------

app.get('/api/stats', authenticateToken, requireAdmin, (req, res) => {
  const stats = db.getStats();
  res.json({ stats });
});

// Serve frontend in production build if built
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  const indexPath = path.join(__dirname, '../client/dist/index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.send('NILA EXIMS API Server is running on port ' + PORT);
    }
  });
});

// Start Server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 NILA EXIMS Backend Server running on http://localhost:${PORT}`);
    console.log(`=======================================================`);
  });
}).catch(err => {
  console.error("Failed to initialize database:", err);
});
