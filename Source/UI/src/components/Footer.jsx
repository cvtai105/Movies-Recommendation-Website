import React from 'react';

const Footer = () => {
  return (
    <footer class="bg-white rounded-lg shadow dark:bg-gray-900 w-screen">
      <div class="w-full max-w-screen-xl mx-auto py-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-8"
              alt="Flowbite Logo"
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              MRW
            </span>
          </a>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/about" class="hover:underline me-4 md:me-6 text-2xl">
                Thông tin thành viên
              </a>
            </li>
            <li>
              <a href="https://facebook.com/minhbusquets" class="hover:underline text-2xl">
              Liên hệ
              </a>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{' '}
          <a href="https://flowbite.com/" class="hover:underline">
            MRW™
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
