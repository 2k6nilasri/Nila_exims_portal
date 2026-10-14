import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../utils/api';
import { 
  Shield, CheckCircle2, Clock, AlertCircle, Search, Filter, RefreshCw, Trash2, 
  Edit, Plus, User, Building, Calendar, FileText, ArrowLeft, Layers, TrendingUp, Sparkles, Check
} from 'lucide-react';

export const AdminPortal = ({ onNavigateHome }) => {
  const { user, isAdmin, showToast } = useAuth();
  const [activeTab, setActiveTab] = useState('requests'); // 'requests' | 'works' | 'users'
  
  // Requests State
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingRequests, setLoadingRequests] = useState(true);

  // Status Edit Modal State
  const [editingRequest, setEditingRequest] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');

  // Works State
  const [works, setWorks] = useState([]);
  const [loadingWorks, setLoadingWorks] = useState(false);
  const [showWorkModal, setShowWorkModal] = useState(false);
  const [workForm, setWorkForm] = useState({
    client_name: '',
    client_email: '',
    service_type: 'RODTEP Scheme Claim',
    progress: 50,
    status: 'In Progress',
    deadline: '',
    remarks: ''
  });

  // Users State
  const [clientsList, setClientsList] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Stats State
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    processingRequests: 0,
    completedRequests: 0,
    totalClients: 0,
    activeWorks: 0
  });

  const fetchData = async () => {
    setLoadingRequests(true);
    try {
      // Requests
      const reqRes = await apiRequest(`/requests?status=${statusFilter}&search=${encodeURIComponent(searchTerm)}`);
      setRequests(reqRes.requests || []);
      setLoadingRequests(false);

      // Stats
      const statsRes = await apiRequest('/stats');
      setStats(statsRes.stats);
    } catch (err) {
      showToast(err.message, 'error');
      setLoadingRequests(false);
    }
  };

  const fetchWorks = async () => {
    setLoadingWorks(true);
    try {
      const res = await apiRequest('/works');
      setWorks(res.works || []);
      setLoadingWorks(false);
    } catch (err) {
      showToast(err.message, 'error');
      setLoadingWorks(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await apiRequest('/users');
      setClientsList(res.users || []);
      setLoadingUsers(false);
    } catch (err) {
      showToast(err.message, 'error');
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    if (activeTab === 'works') fetchWorks();
    if (activeTab === 'users') fetchUsers();
  }, [activeTab]);

  // Handle Update Status
  const handleUpdateStatusSubmit = async (e) => {
    e.preventDefault();
    if (!editingRequest) return;

    try {
      await apiRequest(`/requests/${editingRequest.id}/status`, 'PUT', {
        status: editStatus,
        admin_notes: editNotes
      });
      showToast(`Request #${editingRequest.request_code} status updated to "${editStatus}"!`, 'success');
      setEditingRequest(null);
      fetchData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Handle Delete Request
  const handleDeleteRequest = async (id, code) => {
    if (!window.confirm(`Are you sure you want to delete request #${code}?`)) return;
    try {
      await apiRequest(`/requests/${id}`, 'DELETE');
      showToast(`Request #${code} deleted.`, 'info');
      fetchData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Handle Add Work
  const handleCreateWorkSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest('/works', 'POST', workForm);
      showToast(`Work entry created for ${workForm.client_name}!`, 'success');
      setShowWorkModal(false);
      fetchWorks();
      fetchData();
      setWorkForm({
        client_name: '',
        client_email: '',
        service_type: 'RODTEP Scheme Claim',
        progress: 50,
        status: 'In Progress',
        deadline: '',
        remarks: ''
      });
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  if (!isAdmin) {
    return (
      <div className="py-24 text-center bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="p-8 max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl space-y-4">
          <Shield className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">Access Denied</h2>
          <p className="text-xs text-slate-500">You must be logged in as an Administrator to view the Admin Portal.</p>
          <button onClick={onNavigateHome} className="px-6 py-2.5 bg-emerald-800 text-white font-bold text-xs rounded-xl">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-800/90 p-6 rounded-3xl border border-slate-700 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="p-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Admin Control Panel</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
                NILA EXIMS Management Portal
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>

        {/* Dashboard Stats Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Requests</span>
            <div className="text-2xl font-extrabold text-white">{stats.totalRequests}</div>
          </div>
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 space-y-1">
            <span className="text-[10px] font-bold uppercase text-amber-400">Pending</span>
            <div className="text-2xl font-extrabold">{stats.pendingRequests}</div>
          </div>
          <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-500/30 text-sky-200 space-y-1">
            <span className="text-[10px] font-bold uppercase text-sky-400">On Processing</span>
            <div className="text-2xl font-extrabold">{stats.processingRequests}</div>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 space-y-1">
            <span className="text-[10px] font-bold uppercase text-emerald-400">Completed</span>
            <div className="text-2xl font-extrabold">{stats.completedRequests}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Clients</span>
            <div className="text-2xl font-extrabold text-emerald-400">{stats.totalClients}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Active Works</span>
            <div className="text-2xl font-extrabold text-white">{stats.activeWorks}</div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex border-b border-slate-800 space-x-4">
          <button
            onClick={() => setActiveTab('requests')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'requests'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Client Requests ({requests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('works')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'works'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Works & Projects Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'users'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Registered Clients</span>
          </button>
        </div>

        {/* TAB 1: REQUESTS MANAGEMENT */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            
            {/* Filters & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              
              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search client, phone, code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-900 border border-slate-700 text-white rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Status Filter Chips */}
              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  Filter:
                </span>
                {['All', 'Pending', 'On Processing', 'Completed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      statusFilter === status
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Requests Table */}
            <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-xl">
              {loadingRequests ? (
                <div className="p-12 text-center text-slate-400">
                  <RefreshCw className="w-8 h-8 mx-auto animate-spin text-emerald-400 mb-2" />
                  <p>Loading requests database...</p>
                </div>
              ) : requests.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                  <p>No client requests found matching the current filters.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-700">
                      <tr>
                        <th className="py-4 px-6">Code & Date</th>
                        <th className="py-4 px-6">Client Info</th>
                        <th className="py-4 px-6">Requested Service</th>
                        <th className="py-4 px-6">Current Status</th>
                        <th className="py-4 px-6">Consultant Notes</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60 font-medium">
                      {requests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-700/40 transition-colors">
                          
                          {/* Code & Date */}
                          <td className="py-4 px-6">
                            <span className="font-extrabold text-white text-sm block">{req.request_code}</span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(req.created_at).toLocaleDateString()}
                            </span>
                          </td>

                          {/* Client Info */}
                          <td className="py-4 px-6 space-y-0.5">
                            <div className="font-bold text-white">{req.name}</div>
                            <div className="text-slate-400">{req.email}</div>
                            <div className="text-emerald-400 font-semibold">{req.phone}</div>
                          </td>

                          {/* Service Requested */}
                          <td className="py-4 px-6">
                            <span className="px-2.5 py-1 bg-slate-900 text-slate-200 border border-slate-700 rounded-lg font-semibold block w-fit">
                              {req.service_type}
                            </span>
                            {req.message && (
                              <p className="text-[10px] text-slate-400 mt-1 line-clamp-1 italic max-w-xs">
                                "{req.message}"
                              </p>
                            )}
                          </td>

                          {/* Status Badge */}
                          <td className="py-4 px-6">
                            <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] inline-block ${
                              req.status === 'Completed'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : req.status === 'On Processing'
                                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}>
                              {req.status}
                            </span>
                          </td>

                          {/* Admin Notes */}
                          <td className="py-4 px-6 max-w-xs text-[11px] text-slate-300">
                            {req.admin_notes || <span className="text-slate-500 italic">No notes set</span>}
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-6 text-right space-x-2">
                            <button
                              onClick={() => {
                                setEditingRequest(req);
                                setEditStatus(req.status);
                                setEditNotes(req.admin_notes || '');
                              }}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] rounded-lg transition-colors inline-flex items-center gap-1"
                            >
                              <Edit className="w-3 h-3" />
                              <span>Update Status</span>
                            </button>

                            <button
                              onClick={() => handleDeleteRequest(req.id, req.request_code)}
                              className="p-1.5 bg-rose-950/60 hover:bg-rose-600 text-rose-300 hover:text-white rounded-lg transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: WORKS MANAGEMENT */}
        {activeTab === 'works' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Ongoing & Completed Works</h2>
                <p className="text-xs text-slate-400">Track client project progress, deadlines & remarks</p>
              </div>
              <button
                onClick={() => setShowWorkModal(true)}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Work Entry</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {works.map((work) => (
                <div key={work.id} className="p-6 bg-slate-800 rounded-3xl border border-slate-700 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-extrabold text-white text-lg">{work.client_name}</h3>
                      <p className="text-xs text-emerald-400 font-semibold">{work.service_type}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      work.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-sky-500/20 text-sky-300'
                    }`}>
                      {work.status}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-emerald-400">{work.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all"
                        style={{ width: `${work.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 pt-2 border-t border-slate-700 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target Deadline:</span>
                      <span className="font-bold text-white">{work.deadline || 'N/A'}</span>
                    </div>
                    <p className="text-slate-400 italic pt-1">"{work.remarks}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: USER MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Registered Clients Directory</h2>
              <span className="text-xs text-slate-400">{clientsList.length} Accounts Registered</span>
            </div>

            <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-4 px-6">Client Name</th>
                    <th className="py-4 px-6">Company Name</th>
                    <th className="py-4 px-6">Contact Email & Phone</th>
                    <th className="py-4 px-6">Role</th>
                    <th className="py-4 px-6">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60">
                  {clientsList.map((client) => (
                    <tr key={client.id} className="hover:bg-slate-700/40">
                      <td className="py-4 px-6 font-bold text-white">{client.name}</td>
                      <td className="py-4 px-6 text-slate-300">{client.company_name || 'Individual'}</td>
                      <td className="py-4 px-6 space-y-0.5">
                        <div className="text-white font-semibold">{client.email}</div>
                        <div className="text-emerald-400">{client.phone}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          client.role === 'admin' ? 'bg-purple-900/60 text-purple-300' : 'bg-emerald-950 text-emerald-400'
                        }`}>
                          {client.role}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-400">
                        {new Date(client.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* EDIT REQUEST STATUS MODAL */}
      {editingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">
              Update Request #{editingRequest.request_code}
            </h3>
            
            <form onSubmit={handleUpdateStatusSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">Select New Status:</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full p-3 bg-slate-800 border border-slate-700 text-white rounded-xl font-bold"
                >
                  <option value="Pending">Pending</option>
                  <option value="On Processing">On Processing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">Consultant Remarks / Admin Notes:</label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="e.g. Documents verified on ICEGATE portal. Scrip generated."
                  className="w-full p-3 bg-slate-800 border border-slate-700 text-white rounded-xl"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingRequest(null)}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE WORK MODAL */}
      {showWorkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Add New Work Project</h3>
            <form onSubmit={handleCreateWorkSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">Client / Firm Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tiruppur Knits Pvt Ltd"
                  value={workForm.client_name}
                  onChange={(e) => setWorkForm({ ...workForm, client_name: e.target.value })}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">Service Type *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ROSCTL Rebate Filing"
                  value={workForm.service_type}
                  onChange={(e) => setWorkForm({ ...workForm, service_type: e.target.value })}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Progress %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={workForm.progress}
                    onChange={(e) => setWorkForm({ ...workForm, progress: e.target.value })}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Target Deadline</label>
                  <input
                    type="date"
                    value={workForm.deadline}
                    onChange={(e) => setWorkForm({ ...workForm, deadline: e.target.value })}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">Work Status</label>
                <select
                  value={workForm.status}
                  onChange={(e) => setWorkForm({ ...workForm, status: e.target.value })}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl font-bold"
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">Remarks</label>
                <input
                  type="text"
                  placeholder="e.g. eBRC upload pending"
                  value={workForm.remarks}
                  onChange={(e) => setWorkForm({ ...workForm, remarks: e.target.value })}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWorkModal(false)}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl"
                >
                  Create Work
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPortal;
