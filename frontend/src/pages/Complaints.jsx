import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSearch } from 'react-icons/fi';
import axios from 'axios';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import StatusBadge from '../components/StatusBadge';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/complaints/customer?customerId=3');
      if (response.data.success) {
        setComplaints(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const text = `${complaint.title} ${complaint.category} ${complaint.status}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Complaints"
        subtitle="Review your service requests, follow their progress, and create new tickets when needed."
        action={
          <Link to="/complaints/new" className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700">
            <FiPlus className="mr-2 h-4 w-4" />
            Raise Complaint
          </Link>
        }
      />

      <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-4 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)] backdrop-blur sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none ring-0 transition focus:border-indigo-400 focus:bg-white"
              placeholder="Search complaints"
            />
          </div>
          <div className="text-sm text-slate-500">{filteredComplaints.length} result{filteredComplaints.length === 1 ? '' : 's'}</div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="h-3 w-24 rounded-full bg-slate-200" />
                <div className="mt-3 h-4 w-40 rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        ) : filteredComplaints.length === 0 ? (
          <EmptyState
            title="No complaints found"
            description={query ? 'Try a different search term or clear the filter.' : "You haven't raised any complaints yet. Create a new ticket to get started."}
            action={<Link to="/complaints/new" className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">New complaint</Link>}
          />
        ) : (
          <div className="space-y-3">
            {filteredComplaints.map((complaint) => (
              <div key={complaint.id} className="flex flex-col gap-3 rounded-[1.5rem] border border-slate-200/80 bg-slate-50/70 p-4 transition hover:border-indigo-300 hover:bg-white sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">#{complaint.id} - {complaint.title}</p>
                    <StatusBadge status={complaint.status} />
                  </div>
                  <p className="mt-2 text-sm text-slate-500">Category: {complaint.category}</p>
                </div>
                <div className="text-sm text-slate-500">
                  <p>Created {new Date(complaint.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Complaints;
