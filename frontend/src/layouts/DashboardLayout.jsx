import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiBell, FiHome, FiFileText, FiSettings, FiLogOut, FiUser, FiShield, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = () => setDropdownOpen(false);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const allNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome, roles: ['CUSTOMER', 'AGENT', 'ADMIN'] },
    { name: 'My Complaints', href: '/complaints', icon: FiFileText, roles: ['CUSTOMER'] },
    { name: 'Admin Stats', href: '/admin/dashboard', icon: FiSettings, roles: ['ADMIN'] },
    { name: 'Manage Complaints', href: '/admin/complaints', icon: FiFileText, roles: ['ADMIN'] },
  ];

  const navigation = allNavigation.filter(item => user && item.roles.includes(user.role));
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100/70">
      <div className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div className={`fixed inset-0 bg-slate-900/60 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setSidebarOpen(false)} />
        <div className={`relative flex w-full max-w-xs flex-1 flex-col bg-slate-950 text-slate-100 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600">
                <FiShield className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Smart Portal</p>
                <p className="text-xs text-slate-400">Service Desk</p>
              </div>
            </div>
            <button className="rounded-full p-2 text-slate-300 hover:bg-white/10" onClick={() => setSidebarOpen(false)}>
              <FiX className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-4 flex-1 space-y-1 px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`${isActive(item.href) ? 'bg-white/12 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'} flex items-center rounded-2xl px-3 py-3 text-sm font-medium transition`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <aside className={`hidden md:flex ${collapsed ? 'w-20' : 'w-72'} flex-shrink-0 flex-col transition-all duration-300`}>
        <div className="flex h-full flex-col border-r border-slate-200/80 bg-slate-950 text-slate-100 shadow-[12px_0_40px_-24px_rgba(15,23,42,0.7)]">
          <div className="flex items-center justify-between px-5 py-6">
            <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-600/20">
                <FiShield className="h-5 w-5" />
              </div>
              {!collapsed && (
                <div>
                  <p className="text-[0.95rem] font-semibold">Smart Portal</p>
                  <p className="text-xs text-slate-400">Service Desk</p>
                </div>
              )}
            </div>
            <button
              className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
              onClick={() => setCollapsed(!collapsed)}
            >
              <FiChevronRight className={`h-4 w-4 transition ${collapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <nav className="mt-4 flex-1 space-y-1 px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${isActive(item.href) ? 'bg-white/12 text-white shadow-lg shadow-indigo-500/10' : 'text-slate-300 hover:bg-white/10 hover:text-white'} flex items-center rounded-2xl px-3 py-3 text-sm font-medium transition`}
              >
                <item.icon className={`h-5 w-5 ${collapsed ? 'mr-0' : 'mr-3'}`} />
                {!collapsed && <span className="truncate">{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="z-10 flex h-18 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 py-4 shadow-[0_10px_35px_-24px_rgba(15,23,42,0.5)] backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            <button className="rounded-2xl border border-slate-200 p-2 text-slate-600 md:hidden" onClick={() => setSidebarOpen(true)}>
              <FiMenu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Workspace</p>
              <h1 className="text-lg font-semibold text-slate-900">{location.pathname === '/dashboard' ? 'Dashboard' : location.pathname.replace('/', '').replace(/-/g, ' ')}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button className="relative rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-500 shadow-sm transition hover:text-slate-900">
              <FiBell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-2 py-2 shadow-sm"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white uppercase">
                  {user ? user.name.charAt(0) : 'U'}
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-semibold text-slate-800">{user?.name || 'User'}</p>
                  <p className="text-xs text-slate-500">{user?.role || 'Member'}</p>
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  <div className="rounded-xl border border-slate-100 px-3 py-2">
                    <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                    <p className="text-xs text-slate-500">{user?.role}</p>
                  </div>
                  <button
                    onClick={() => { setDropdownOpen(false); navigate('/profile'); }}
                    className="mt-2 flex w-full items-center rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                  >
                    <FiUser className="mr-2" /> Edit Profile
                  </button>
                  <button
                    onClick={() => { setDropdownOpen(false); logout(); }}
                    className="mt-1 flex w-full items-center rounded-xl px-3 py-2 text-sm text-rose-600 transition hover:bg-rose-50"
                  >
                    <FiLogOut className="mr-2" /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
