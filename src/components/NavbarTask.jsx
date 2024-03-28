import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function NavbarTask() {
  
  useEffect(() => {
    // Navbar Fixed
    const handleScroll = () => {
      const NavbarTask = document.querySelector(".navbar");
      const fixednav = NavbarTask.offsetTop;
      if (window.pageYOffset > fixednav) {
        NavbarTask.classList.add("navbar-fixed");
      } else {
        NavbarTask.classList.remove("navbar-fixed");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup untuk menghapus event listener saat komponen tidak lagi digunakan
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Perhatikan bahwa kita memberikan array kosong sebagai argumen kedua untuk useEffect, sehingga ini hanya akan dijalankan sekali saat komponen dipasang



  // State untuk mengontrol mode gelap
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Efek samping untuk menambahkan atau menghapus kelas 'dark' pada elemen html
  useEffect(() => {
    const html = document.querySelector('html');
    if (isDarkMode) {
      html.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      html.classList.remove('dark');
      localStorage.theme = 'light';
    }
    // Simpan status tema ke localStorage saat isDarkMode berubah
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Fungsi untuk menangani klik tombol mode gelap
  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    toast('Dark Mode!',
  {
    icon: '👏',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }
);
  };

  return (
    <header className="absolute left-0 top-0 z-10 flex w-full items-center bg-primaryBackgroundColor shadow-md navbar dark:bg-transparent">
      <div className="container">
        <div className="relative flex items-center justify-between">
          <div className="px-4 py-4">
            <a href="" className="py-6 text-2xl font-bold text-primaryColor dark:text-white">
              What do you want to do?
            </a>
          </div>
          <div className="flex items-center px-4">
            <nav
              id="nav-menu"
              className="absolute right-4 top-full hidden w-full max-w-[250px] rounded-lg bg-white py-4 shadow-lg lg:static lg:block lg:max-w-full lg:rounded-none lg:bg-transparent lg:shadow-none"
            >
              <ul className="block lg:flex">
                <li className="flex items-center pl-8">
                  <div className="flex">
                    <span className="mr-2 text-sm text-slate-500">light</span>
                    <input
                      type="checkbox"
                      className="hidden"
                      id="dark-toggle"
                      checked={isDarkMode}
                      onChange={handleDarkModeToggle}
                    />
                    <label for="dark-toggle">
                      <div className="flex h-5 w-9 cursor-pointer items-center rounded-full bg-slate-500 p-1">
                        <div className="toggle-circle h-4 w-4 rounded-full bg-white transition duration-300 ease-in-out"></div>
                      </div>
                    </label>
                    <span className="ml-2 text-sm text-slate-500">dark</span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
