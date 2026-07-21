import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlertCircle, FiSend } from 'react-icons/fi';
import axios from 'axios';
import PageHeader from '../components/PageHeader';

const RaiseComplaint = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', category: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = ['Hardware Issue', 'Software Issue', 'Network/Internet', 'Billing/Account', 'General Inquiry'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = { ...formData, customerId: 3 };
      const response = await axios.post('http://localhost:8081/api/complaints', payload);

      if (response.data.success) {
        navigate('/complaints');
      }
    } catch (err) {
      console.error('Error submitting complaint:', err);
      setError(err.response?.data?.message || 'Failed to submit complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader title="Raise a New Complaint" subtitle="Describe your issue clearly so the support team can respond faster." />

      <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-4 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)] backdrop-blur sm:p-8">
        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            <FiAlertCircle className="mt-0.5 h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-semibold text-slate-700">Complaint Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white"
              placeholder="E.g., Internet not working"
            />
          </div>

          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-semibold text-slate-700">Category</label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-semibold text-slate-700">Detailed Description</label>
            <textarea
              id="description"
              name="description"
              rows={5}
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white"
              placeholder="Please provide as much detail as possible..."
            />
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => navigate('/complaints')} className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:opacity-60">
              <FiSend className="mr-2 h-4 w-4" />
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RaiseComplaint;
