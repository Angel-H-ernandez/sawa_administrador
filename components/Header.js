// components/Header.js
"use client";

import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  // Function to get the current page title
  function getPageTitle() {
    switch (pathname) {
      case "/dahsboard/clientes":
        return "Usuarios";
      case "/dahsboard/Permisos_plan":
        return "Permisos plan";
      case "/dahsboard/Plan_servicio":
        return "Plan servicio";
      default:
        return "Home";
    }
  }

  return (
    <header className="text-black py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-500">{getPageTitle()}</h1>
        {/* Other header elements */}
      </div>
    </header>
  );
}
