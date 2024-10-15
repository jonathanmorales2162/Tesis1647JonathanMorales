import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../images/logo/logo.svg';
import SidebarLinkGroup from './SidebarLinkGroup';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });
  // Función para el botón "Conócenos"
  const handleContactClick = () => {
    window.open('https://wa.me/50241010503?text=Quiero%20más%20información.', '_blank');
  };

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);
 

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-blue-2 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* SIDEBAR HEADER */}

      <div className="flex flex-col justify-between h-full">
        {/* Sidebar Menu */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">MENU</h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/perfil"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('perfil') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  Perfil de Usuario
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ordenes"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('ordenes') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  Ordenes
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        {/* Botón Conócenos al final */}
        <div className="p-4">
        <button
            onClick={handleContactClick}
            
            className="flex bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 w-full"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.371 0 0 5.371 0 12c0 2.125.557 4.125 1.617 5.879L.068 24l6.332-1.595A11.91 11.91 0 0012 24c6.629 0 12-5.371 12-12S18.629 0 12 0zm5.883 17.082c-.241.682-1.396 1.328-1.961 1.398-.508.063-1.078.085-1.722-.133-.396-.126-.903-.284-1.547-.557a13.43 13.43 0 01-2.32-1.207 10.67 10.67 0 01-2.688-2.563c-.447-.596-.797-1.164-1.054-1.694-.33-.682-.048-1.122.108-1.356.126-.195.278-.316.391-.494.145-.223.291-.447.433-.67.134-.223.276-.447.398-.67.145-.248.298-.517.538-.564.227-.047.517.048.808.126.272.085.644.17.915.292.276.122.546.223.778.428.233.205.523.776.608.912.086.145.086.271.01.419-.085.134-.198.248-.34.413-.098.098-.211.211-.304.334-.11.145-.233.223-.11.419.126.198.392.458.593.649.205.19.447.362.649.534.21.162.392.336.593.478.155.104.362.223.517.2.134-.019.264-.145.392-.26.126-.116.276-.3.413-.456.14-.154.313-.154.485-.085.177.07 1.125.532 1.318.626.198.09.382.126.544.194.165.068.52.192.57.296.055.11.048.693-.193 1.374z" />
            </svg>
            Conócenos
          </button>

        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
