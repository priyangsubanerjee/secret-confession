import React from "react";

function Loading({ visible }) {
  return (
    <>
      {visible && (
        <div className="fixed inset-0 h-full w-full flex items-center justify-center bg-black/50 z-10">
          <div className="h-16 w-16 rounded-full shadow-lg bg-white flex items-center justify-center">
            <div className="h-10 w-10 rounded-full border-2 border-teal-600 border-t-transparent animate-spin"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Loading;
