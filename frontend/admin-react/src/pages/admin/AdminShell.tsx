import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AdminLayout, { type MenuItem } from '../../layouts/admin/AdminLayout';

type AdminShellProps = {
  onLogout: () => void;
};

const routeByMenu: Record<MenuItem, string> = {
  Home: '/admin/home',
  'User Management': '/admin/user-management',
  Reports: '/admin/reports',
  Notifications: '/admin/notifications',
  Statistics: '/admin/statistics',
};

const menuByRoute: Array<{ prefix: string; menu: MenuItem }> = [
  { prefix: '/admin/home', menu: 'Home' },
  { prefix: '/admin/user-management', menu: 'User Management' },
  { prefix: '/admin/reports', menu: 'Reports' },
  { prefix: '/admin/notifications', menu: 'Notifications' },
  { prefix: '/admin/statistics', menu: 'Statistics' },
];

function resolveActiveMenu(pathname: string): MenuItem {
  const matched = menuByRoute.find((item) => pathname.startsWith(item.prefix));
  return matched ? matched.menu : 'Home';
}

export default function AdminShell({ onLogout }: AdminShellProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <AdminLayout
      activeItem={resolveActiveMenu(pathname)}
      onMenuSelect={(menu) => navigate(routeByMenu[menu])}
      onLogout={onLogout}
    >
      <Outlet />
    </AdminLayout>
  );
}
