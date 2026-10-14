import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../utils/api';
import { Clock, CheckCircle2, AlertCircle, FileText, Plus, RefreshCw, User, Calendar, MessageSquare, ArrowLeft, ShieldCheck } from 'lucide-react';

export const ClientDashboard = ({ onNavigateHome, onOpenNewRequest }) => {
  const { user, showToast } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await apiRequest('/requests');
      setRequests(res.requests || []);
      setLoading(false);
    } catch (err) {
      showToast(err.message, 'error');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Completed</span>
          </span>
        );
      case 'On Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-800 border border-sky-300 text-xs font-bold rounded-full animate-pulse">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            <span>On Processing</span>
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold rounded-full">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Pending Review</span>
          </span>
        );
    }
  };

  const getStatusStepIndex = (status) => {
    if (status === 'Completed') return 3;
    if (status === 'On Processing') return 2;
    return 1;
  };

  // Stats calculation
  const totalReqs = requests.length;
  const pendingReqs = requests.filter(r => r.status === 'Pending').length;
  const processingReqs = requests.filter(r => r.status === 'On Processing').length;
  const completedReqs = requests.filter(r => r.status === 'Completed').length;

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Client Portal</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-500">{user?.email}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                My Service Request Dashboard
              </h1>
            </div>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={fetchRequests}
              className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-colors flex items-center gap-2 text-xs font-bold"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={onOpenNewRequest}
              className="px-5 py-3 bg-gradient-to-r from-emerald-800 to-emerald-600 hover:from-emerald-700 hover:to-emerald-500 text-white rounded-2xl font-bold text-xs shadow-md flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Submit New Request</span>
            </button>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Requests</span>
            <div className="text-3xl font-extrabold text-slate-900">{totalReqs}</div>
          </div>

          <div className="p-5 bg-amber-50/70 rounded-2xl border border-amber-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-amber-800 uppercase">Pending</span>
            <div className="text-3xl font-extrabold text-amber-900">{pendingReqs}</div>
          </div>

          <div className="p-5 bg-sky-50/70 rounded-2xl border border-sky-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-sky-800 uppercase">On Processing</span>
            <div className="text-3xl font-extrabold text-sky-900">{processingReqs}</div>
          </div>

          <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-emerald-800 uppercase">Completed</span>
            <div className="text-3xl font-extrabold text-emerald-900">{completedReqs}</div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Submitted Service Applications</h2>
            <span className="text-xs text-slate-500">Real-time DGFT & Customs status tracking</span>
          </div>

          {loading ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin text-emerald-600 mb-2" />
              <p className="text-sm font-semibold">Fetching your request details...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-4">
              <FileText className="w-12 h-12 mx-auto text-slate-300" />
              <div>
                <h3 className="text-lg font-bold text-slate-800">No requests submitted yet</h3>
                <p className="text-xs text-slate-500 mt-1">Submit your first DGFT or Import/Export inquiry to start live status tracking.</p>
              </div>
              <button
                onClick={onOpenNewRequest}
                className="px-6 py-2.5 bg-emerald-800 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Submit Service Request
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {requests.map((req) => {
                const stepIdx = getStatusStepIndex(req.status);

                return (
                  <div
                    key={req.id}
                    className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6 hover:shadow-md transition-shadow"
                  >
                    {/* Request Card Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 text-lg">{req.request_code}</span>
                          <span className="text-xs font-semibold px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                            {req.service_type}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            Submitted: {new Date(req.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          <span>•</span>
                          <span>Applicant: {req.name} ({req.phone})</span>
                        </div>
                      </div>

                      <div>{getStatusBadge(req.status)}</div>
                    </div>

                    {/* Progress Stepper Visualizer */}
                    <div className="px-2 py-4 bg-slate-50 rounded-2xl border border-slate-200/70">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">
                        Status Progress Tracker
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center relative">
                        {/* Connecting Line */}
                        <div className="absolute top-4 left-1/6 right-1/6 h-1 bg-slate-200 -z-0" />
                        <div
                          className="absolute top-4 left-1/6 h-1 bg-emerald-600 transition-all duration-500 -z-0"
                          style={{
                            width: stepIdx === 1 ? '0%' : stepIdx === 2 ? '50%' : '100%'
                          }}
                        />

                        {/* Step 1: Pending */}
                        <div className="relative z-10 flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${
                            stepIdx >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                          }`}>
                            1
                          </div>
                          <span className="text-xs font-bold text-slate-800 mt-2">Pending Review</span>
                          <span className="text-[10px] text-slate-400">Request Received</span>
                        </div>

                        {/* Step 2: On Processing */}
                        <div className="relative z-10 flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${
                            stepIdx >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                          }`}>
                            2
                          </div>
                          <span className="text-xs font-bold text-slate-800 mt-2">On Processing</span>
                          <span className="text-[10px] text-slate-400">Customs / DGFT Action</span>
                        </div>

                        {/* Step 3: Completed */}
                        <div className="relative z-10 flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${
                            stepIdx === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                          }`}>
                            3
                          </div>
                          <span className="text-xs font-bold text-slate-800 mt-2">Completed</span>
                          <span className="text-[10px] text-slate-400">License / Scrip Issued</span>
                        </div>
                      </div>
                    </div>

                    {/* Details & Admin Remarks */}
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="font-bold text-slate-700">Client Requirements / Notes:</span>
                        <p className="text-slate-600 leading-relaxed italic">
                          "{req.message || 'No additional remarks provided.'}"
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                        <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-700" />
                          <span>Consultant Admin Update:</span>
                        </span>
                        <p className="text-slate-700 leading-relaxed font-medium">
                          {req.admin_notes || 'Under review by consultant T.S. Shankar Kumar.'}
                        </p>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ClientDashboard;
