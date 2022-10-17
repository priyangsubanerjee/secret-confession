import React from "react";

function Footer() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-20 items-center justify-center mt-10 mb-10">
      <div className="text-sm text-zinc-700">
        made with <span className="text-rose-500">&hearts;</span> by{" "}
        <span className="text-teal-600 font-medium">
          <a href="https://priyangsu.vercel.app">Priyangsu Banerjee</a>
        </span>
      </div>
      <div className="text-xs text-zinc-500">
        All right reserved @ Virtual Base Corp.
      </div>
    </div>
  );
}
export default Footer;
