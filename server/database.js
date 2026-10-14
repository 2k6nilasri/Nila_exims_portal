const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbFolder = path.join(__dirname, 'data');
const dbFilePath = path.join(dbFolder, 'db.json');

// Ensure data folder exists
if (!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder, { recursive: true });
}

// Default initial state
const defaultDb = {
  users: [],
  requests: [],
  works: [],
  counters: {
    users: 0,
    requests: 0,
    works: 0
  }
};

function readDb() {
  try {
    if (!fs.existsSync(dbFilePath)) {
      writeDb(defaultDb);
      return defaultDb;
    }
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading DB file, reinitializing:", err);
    writeDb(defaultDb);
    return defaultDb;
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error("Error writing DB file:", err);
  }
}

async function initDatabase() {
  const data = readDb();
  let modified = false;
  const demoClientEmail = 'client@example.com';

  const originalUserCount = data.users.length;
  data.users = data.users.filter(user =>
    !(user.role === 'client' && user.email && user.email.trim().toLowerCase() === demoClientEmail)
  );
  if (data.users.length !== originalUserCount) modified = true;

  const originalRequestCount = data.requests.length;
  data.requests = data.requests.filter(request =>
    !request.email || request.email.trim().toLowerCase() !== demoClientEmail
  );
  if (data.requests.length !== originalRequestCount) modified = true;

  const originalWorkCount = data.works.length;
  data.works = data.works.filter(work =>
    !work.client_email || work.client_email.trim().toLowerCase() !== demoClientEmail
  );
  if (data.works.length !== originalWorkCount) modified = true;

  if (!data.users.some(user => user.role === 'admin')) {
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
      throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in server/.env to initialize the first admin account.');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail)) {
      throw new Error('ADMIN_EMAIL must be a valid email address.');
    }
    if (adminPassword.length < 8 || Buffer.byteLength(adminPassword, 'utf8') > 72) {
      throw new Error('ADMIN_PASSWORD must be at least 8 characters and no more than 72 bytes.');
    }

    const adminPasswordHash = await bcrypt.hash(adminPassword, 10);
    data.counters.users += 1;
    data.users.push({
      id: data.counters.users,
      name: 'NILA EXIMS Admin',
      email: adminEmail,
      phone: '',
      password: adminPasswordHash,
      role: 'admin',
      company_name: 'NILA EXIMS',
      created_at: new Date().toISOString()
    });
    modified = true;
  }

  if (modified) {
    writeDb(data);
  }
}

// Async Database Interface Wrapper
const db = {
  // Users
  findUserByEmail: (email) => {
    const data = readDb();
    const normalizedEmail = email.trim().toLowerCase();
    return data.users.find(u => u.email && u.email.trim().toLowerCase() === normalizedEmail);
  },
  findUserById: (id) => {
    const data = readDb();
    return data.users.find(u => u.id === Number(id));
  },
  createUser: (userData) => {
    const data = readDb();
    data.counters.users += 1;
    const newUser = {
      id: data.counters.users,
      ...userData,
      created_at: new Date().toISOString()
    };
    data.users.push(newUser);
    writeDb(data);
    return newUser;
  },
  getAllUsers: () => {
    const data = readDb();
    return data.users.map(({ password, ...rest }) => rest);
  },

  // Requests
  createRequest: (requestData) => {
    const data = readDb();
    data.counters.requests += 1;
    const newReq = {
      id: data.counters.requests,
      status: 'Pending',
      admin_notes: '',
      ...requestData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    data.requests.unshift(newReq);
    writeDb(data);
    return newReq;
  },
  getRequests: ({ role, userId, statusFilter, search }) => {
    const data = readDb();
    let list = [...data.requests];

    if (role !== 'admin') {
      list = list.filter(r => r.user_id === Number(userId));
    } else {
      if (statusFilter && statusFilter !== 'All') {
        list = list.filter(r => r.status === statusFilter);
      }
      if (search) {
        const term = search.toLowerCase();
        list = list.filter(r =>
          (r.name && r.name.toLowerCase().includes(term)) ||
          (r.email && r.email.toLowerCase().includes(term)) ||
          (r.phone && r.phone.includes(term)) ||
          (r.request_code && r.request_code.toLowerCase().includes(term)) ||
          (r.service_type && r.service_type.toLowerCase().includes(term))
        );
      }
    }

    return list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },
  updateRequestStatus: (id, status, admin_notes) => {
    const data = readDb();
    const index = data.requests.findIndex(r => r.id === Number(id));
    if (index === -1) return null;

    data.requests[index].status = status;
    data.requests[index].admin_notes = admin_notes !== undefined ? admin_notes : data.requests[index].admin_notes;
    data.requests[index].updated_at = new Date().toISOString();

    writeDb(data);
    return data.requests[index];
  },
  deleteRequest: (id) => {
    const data = readDb();
    const initialLen = data.requests.length;
    data.requests = data.requests.filter(r => r.id !== Number(id));
    writeDb(data);
    return data.requests.length < initialLen;
  },

  // Works
  getWorks: ({ role, userEmail }) => {
    const data = readDb();
    let list = [...data.works];
    if (role !== 'admin') {
      const normalizedEmail = userEmail.trim().toLowerCase();
      list = list.filter(work =>
        work.client_email && work.client_email.trim().toLowerCase() === normalizedEmail
      );
    }
    return list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },
  createWork: (workData) => {
    const data = readDb();
    data.counters.works += 1;
    const newWork = {
      id: data.counters.works,
      progress: 0,
      status: 'In Progress',
      ...workData,
      created_at: new Date().toISOString()
    };
    data.works.unshift(newWork);
    writeDb(data);
    return newWork;
  },
  updateWork: (id, workData) => {
    const data = readDb();
    const index = data.works.findIndex(w => w.id === Number(id));
    if (index === -1) return null;

    data.works[index] = { ...data.works[index], ...workData };
    writeDb(data);
    return data.works[index];
  },

  // Stats
  getStats: () => {
    const data = readDb();
    const requests = data.requests;
    const totalRequests = requests.length;
    const pendingRequests = requests.filter(r => r.status === 'Pending').length;
    const processingRequests = requests.filter(r => r.status === 'On Processing').length;
    const completedRequests = requests.filter(r => r.status === 'Completed').length;
    const totalClients = data.users.filter(u => u.role === 'client').length;
    const activeWorks = data.works.filter(w => w.status !== 'Completed').length;

    return {
      totalRequests,
      pendingRequests,
      processingRequests,
      completedRequests,
      totalClients,
      activeWorks
    };
  }
};

module.exports = { db, initDatabase };
