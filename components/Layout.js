import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default Layout;
