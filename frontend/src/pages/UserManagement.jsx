import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  UsersIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  EyeIcon,
  NoSymbolIcon,
  CheckCircleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { signOut, getAdminUsers, updateUserStatus } from '../services/api';

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(20);
  const [updatingUserId, setUpdatingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAdminUsers(page, pageSize);
      setUsers(data.users || []);
      setTotal(data.total || 0);
    } catch (err) {
      setError(err.message || 'Failed to load users. Please try again.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    const action = currentStatus ? 'reactivate' : 'suspend';
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        setUpdatingUserId(userId);
        await updateUserStatus(userId, !currentStatus);
        // Refresh users list
        await fetchUsers();
      } catch (err) {
        alert(err.message || `Failed to ${action} user. Please try again.`);
        console.error(`Error ${action}ing user:`, err);
      } finally {
        setUpdatingUserId(null);
      }
    }
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      try {
        await signOut();
        navigate('/admin/login');
      } catch (err) {
        console.error('Error signing out:', err);
        navigate('/admin/login');
      }
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="min-h-screen bg-deep-green">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 sm:py-6 lg:py-8">
        <div className="overflow-hidden rounded-2xl bg-cream sm:rounded-3xl">
          {/* Header Navigation */}
          <nav className="border-b border-cream-dark/20 px-4 py-3 sm:px-6 sm:py-4 lg:px-12 lg:py-6">
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <div className="flex items-center gap-3">
                <Link to="/" className="flex-shrink-0 text-lg font-bold text-black sm:text-xl lg:text-2xl">
                  PhotoLog
                </Link>
                <div className="rounded-lg border border-deep-gold/30 bg-gold/10 px-2 py-1">
                  <span className="text-xs font-semibold text-deep-gold sm:text-sm">ADMIN</span>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <Link
                  to="/admin/dashboard"
                  className="px-2 text-xs font-medium text-black whitespace-nowrap transition-colors sm:text-sm lg:text-base hover:text-deep-green sm:px-0"
                >
                  Dashboard
                </Link>
                <span className="hidden text-sm text-black/60 sm:inline sm:text-base">Administrator</span>
                <button
                  onClick={handleLogout}
                  className="rounded-lg p-2 text-black/60 transition-colors hover:bg-cream-dark hover:text-black"
                  title="Logout"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>
          </nav>

          {/* Page Header */}
          <div className="border-b border-cream-dark/20 px-4 py-6 sm:px-6 lg:px-12 sm:py-8 lg:py-10">
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                to="/admin/dashboard"
                className="rounded-lg p-2 text-black/60 transition-colors hover:bg-cream-dark hover:text-black"
                title="Back to Dashboard"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </Link>
              <div className="rounded-xl bg-deep-gold/10 p-3">
                <UsersIcon className="h-6 w-6 text-deep-gold sm:h-8 sm:w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black sm:text-3xl lg:text-4xl">User Management</h1>
                <p className="mt-1 text-sm text-black/60 sm:text-base">Manage host accounts and permissions</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-4 py-6 sm:px-6 lg:px-12 sm:py-8 lg:py-10">
            {error && (
              <div className="mb-6 p-4 rounded-xl border bg-red-50 border-red-200">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="inline-block w-8 h-8 rounded-full border-4 border-solid animate-spin border-deep-green border-r-transparent"></div>
                  <p className="mt-4 text-black/60">Loading users...</p>
                </div>
              </div>
            ) : users.length === 0 ? (
              <div className="py-12 text-center">
                <UsersIcon className="mx-auto h-12 w-12 text-black/20" />
                <p className="mt-4 text-black/60">No users found</p>
              </div>
            ) : (
              <>
                {/* Users Table */}
                <div className="overflow-hidden rounded-xl border border-cream-dark/30 bg-cream-light">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-cream-dark/20 bg-cream">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-black sm:text-base">User</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-black sm:text-base">Email</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-black sm:text-base">Events</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-black sm:text-base">Status</th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-black sm:text-base">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-cream-dark/20">
                        {users.map((user) => (
                          <tr key={user.uid} className="transition-colors hover:bg-cream">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-deep-green/10">
                                  <span className="text-sm font-semibold text-deep-green">
                                    {user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-black sm:text-base">
                                    {user.name || 'No name'}
                                  </p>
                                  <p className="text-xs text-black/50">ID: {user.uid.substring(0, 8)}...</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-black/70 sm:text-base">{user.email}</p>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="inline-flex items-center rounded-lg bg-deep-green/10 px-3 py-1 text-sm font-medium text-deep-green">
                                {user.event_count || 0}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium ${
                                user.is_suspended
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-emerald/10 text-emerald'
                              }`}>
                                {user.is_suspended ? 'Suspended' : 'Active'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleToggleUserStatus(user.uid, user.is_suspended)}
                                  disabled={updatingUserId === user.uid}
                                  className={`rounded-lg p-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                    user.is_suspended
                                      ? 'text-emerald hover:bg-emerald/10'
                                      : 'text-red-600 hover:bg-red-50'
                                  }`}
                                  title={user.is_suspended ? 'Reactivate user' : 'Suspend user'}
                                >
                                  {user.is_suspended ? (
                                    <CheckCircleIcon className="h-5 w-5" />
                                  ) : (
                                    <NoSymbolIcon className="h-5 w-5" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-black/60">
                      Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, total)} of {total} users
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="rounded-lg border border-cream-dark/30 bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-cream-dark disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2 text-sm text-black/60">
                        Page {page} of {totalPages}
                      </span>
                      <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="rounded-lg border border-cream-dark/30 bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-cream-dark disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

