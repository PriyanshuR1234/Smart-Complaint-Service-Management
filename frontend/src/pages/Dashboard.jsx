import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiClock, FiMessageSquare, FiShield, FiTrendingUp } from 'react-icons/fi';
import axios from 'axios';
import PageHeader from '../components/PageHeader';
import SkeletonCard from '../components/SkeletonCard';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [backendMessage, setBackendMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:8081/api/test')
      .then((response) => {
        setBackendMessage(response.data.message);
      })
      .catch((error) => {
        console.error('Error connecting to backend:', error);
        setBackendMessage('Failed to connect to backend.');
      })
      .finally(() => setLoading(false));
  }, []);

  const quickStats = useMemo(() => [
    { title: 'System status', value: loading ? 'Checking...' : backendMessage.includes('Failed') ? 'Needs attention' : 'Healthy', icon: FiShield, tone: 'from-indigo-500 to-violet-500' },
    { title: 'Open cases', value: '12', icon: FiMessageSquare, tone: 'from-sky-500 to-cyan-500' },
    { title: 'Resolved this week', value: '24', icon: FiCheckCircle, tone: 'from-emerald-500 to-green-500' },
    { title: 'Avg. response', value: '2h', icon: FiClock, tone: 'from-amber-500 to-orange-500' },
  ], [backendMessage, loading]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${user?.name || 'there'}!`}
        subtitle="Your service workspace is ready. Track updates, review priorities, and keep every complaint moving forward."
        action={
          <button className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700">
            View all tickets
            <FiArrowRight className="ml-2 h-4 w-4" />
          </button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)] backdrop-blur"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Backend connection</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">Live system health</h3>
            </div>
            <div className={`rounded-full px-3 py-1 text-sm font-semibold ${backendMessage.includes('Failed') ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {loading ? 'Checking...' : backendMessage.includes('Failed') ? 'Attention required' : 'Operational'}
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-slate-100">
            <p className="text-sm text-slate-400">API status</p>
            <p className="mt-2 text-lg font-semibold">{loading ? 'Connecting to backend...' : backendMessage}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-white shadow-[0_25px_60px_-30px_rgba(79,70,229,0.8)]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-100">Performance</p>
              <h3 className="mt-1 text-xl font-semibold">Case momentum</h3>
            </div>
            <div className="rounded-2xl bg-white/15 p-3">
              <FiTrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-6">
            <p className="text-4xl font-semibold">+18%</p>
            <p className="mt-2 text-sm text-indigo-100">Resolution efficiency improved versus last week.</p>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {quickStats.map((item) => (
          <motion.div key={item.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className={`inline-flex rounded-2xl bg-gradient-to-br ${item.tone} p-3 text-white`}>
              <item.icon className="h-5 w-5" />
            </div>
            <p className="mt-4 text-sm text-slate-500">{item.title}</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)] backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Activity</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">Recent updates</h3>
            </div>
            <button className="text-sm font-medium text-indigo-600">View timeline</button>
          </div>
          <div className="mt-6 space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4">
                <div className="mt-0.5 rounded-xl bg-indigo-100 p-2 text-indigo-600">
                  <FiMessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Complaint {item} moved to the next stage</p>
                  <p className="mt-1 text-sm text-slate-500">A status update was recorded and is ready for review.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)] backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Agent focus</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">Priority queue</h3>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {['Escalation review', 'Billing clarification', 'Service interruption'].map((item, index) => (
              <div key={item} className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-slate-50/80 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item}</p>
                  <p className="text-sm text-slate-500">Priority {index + 1}</p>
                </div>
                <div className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">High</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
