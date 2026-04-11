import { useRef, useState } from 'react';
import logoImage from '../../assets/logo.png';
import notificationIcon from '../../assets/notification.png';
import avatarImage from '../../assets/avatar.jpg';
import useOutsideClick from '../../shared/hooks/useOutsideClick';

export type MenuItem = 'Home' | 'User Management' | 'Reports' | 'Notifications' | 'Statistics';

type AdminLayoutProps = {
  activeItem: MenuItem;
  onLogout: () => void;
  onMenuSelect: (item: MenuItem) => void;
  children: React.ReactNode;
};

const sideItems: MenuItem[] = ['Home', 'User Management', 'Reports', 'Notifications', 'Statistics'];

export default function AdminLayout({ activeItem, onLogout, onMenuSelect, children }: AdminLayoutProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(menuRef, () => setShowUserMenu(false));

  return (
    <div className="min-h-screen bg-[#F3F3F3] text-slate-700 lg:flex">
      <aside className="hidden w-72 shrink-0 flex-col border-r border-slate-200 bg-white px-6 py-8 lg:flex">
        <div>
          <img src={logoImage} alt="WeCare" className="mb-4 h-12 w-12 rounded-xl object-cover" />
          <h2 className="text-xl font-bold text-slate-800">Editorial Arch</h2>
          <p className="mt-1 text-sm text-slate-400">Global Dashboard</p>
        </div>

        <nav className="mt-10 space-y-1">
          {sideItems.map((item) => {
            const isActive = item === activeItem;
            return (
              <button
                key={item}
                type="button"
                onClick={() => onMenuSelect(item)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition ${
                  isActive
                    ? 'border-r-4 border-[#EE3F57] bg-[#EE3F57]/10 font-semibold text-[#EE3F57]'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <span>{item}</span>
                <span className={isActive ? 'text-[#EE3F57]' : 'text-[#ADAFBB]'}>•</span>
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          className="mt-auto rounded-2xl bg-[#EE3F57] px-4 py-3.5 font-semibold text-white transition hover:bg-[#d7324a]"
        >
          Create Report
        </button>
      </aside>

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 rounded-2xl bg-white px-5 py-4 shadow-[0_16px_34px_-24px_rgba(0,0,0,0.2)] md:flex-row md:items-center md:justify-between">
          <h1 className="bg-[linear-gradient(135deg,#F27121_10%,#E94057_60%,#8A2387_100%)] bg-clip-text text-2xl font-bold text-transparent">
            XXXXX Admin
          </h1>

          <div className="w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search analytics..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-[#EE3F57] focus:ring-4 focus:ring-[#EE3F57]/15"
            />
          </div>

          <div className="flex items-center gap-3">
            <button type="button" className="rounded-full bg-[#F3F3F3] p-2.5">
              <img src={notificationIcon} alt="Notifications" className="h-5 w-5 object-contain" />
            </button>
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setShowUserMenu((prev) => !prev)}
                className="overflow-hidden rounded-full border-2 border-[#EE3F57]/30"
              >
                <img src={avatarImage} alt="Admin Avatar" className="h-10 w-10 object-cover" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-12 z-20 w-32 rounded-xl bg-white p-2 shadow-[0_12px_28px_-16px_rgba(0,0,0,0.35)]">
                  <button
                    type="button"
                    onClick={onLogout}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-[#EE3F57] transition hover:bg-[#F3F3F3]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
