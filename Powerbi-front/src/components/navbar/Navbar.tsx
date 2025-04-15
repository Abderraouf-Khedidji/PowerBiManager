import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("");
  useEffect(() => {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    setCurrentPage(page || "");
  }, [window.location.pathname]);

  const currentLinkClass =
    "block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500";
  const defaultLinkClass =
    "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";

  const componentStyle =
    currentPage === "components" ? currentLinkClass : defaultLinkClass;
  const addComponentStyle =
    currentPage === "add-component" ? currentLinkClass : defaultLinkClass;

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse gap-4 relative">
          <img
            src="/logo-dseidor22.svg"
            className="h-8 absolute -right-16 -top-2 rotate-12 z-10"
            alt="Logo Seidor"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-900 dark:text-white">
            Powerbi Manager
          </span>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to={"/components"}
                className={componentStyle}
                aria-current="page"
              >
                Componentes
              </Link>
            </li>
            <li>
              <Link to={"/add-component"} className={addComponentStyle}>
                Añadir componente
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
