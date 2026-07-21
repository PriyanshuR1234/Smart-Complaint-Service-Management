import { Outlet } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-transparent px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 lg:flex-row lg:items-stretch">
        <div className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.45)] backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
              <FiShield className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-500">Smart Portal</p>
              <h2 className="text-2xl font-semibold text-slate-900">Complaint Management</h2>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Access your service workspace and manage every case with clarity, speed, and confidence.
          </p>
        </div>

        <div className="w-full max-w-md rounded-[2rem] border border-slate-200/80 bg-white/80 p-4 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.45)] backdrop-blur sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
