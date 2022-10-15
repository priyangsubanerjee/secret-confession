import Link from "next/link";
import React from "react";

function Sidebar({ open, close }) {
  const shareLink = async () => {
    const shareData = {
      title: "Secret message",
      text: `Send a secret message 🗝 to friends, Wanna tell anything or something else to them? Now it's time 😎, they will never know who sent it!, Just fun lets try 🗝 👉 https://secretconfession.vercel.app/`,
    };

    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex z-20">
          <div className="h-full w-[70%] bg-white">
            <div className="px-5 py-4 flex items-center justify-end">
              <button onClick={() => close()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="text-xs text-gray-500 py-4 space-y-3 border-b">
              <li className="py-1 px-4 flex space-x-2">
                <span>Terms & Conditions</span>
              </li>
              <li className="py-1 px-4 flex space-x-2">
                <span>Privacy policy</span>
              </li>
              <li className="py-1 px-4 flex space-x-2">
                <span>Contact us</span>
              </li>
              <li className="py-1 px-4 flex space-x-2">
                <Link href="https://www.linkedin.com/in/priyangsu-banerjee/">
                  <span>Developers profile</span>
                </Link>
              </li>

              <li className="py-1 px-4 flex space-x-2">
                <button
                  onClick={() => shareLink()}
                  className="w-full text-sm p-2 bg-teal-500 active:bg-teal-600 text-white rounded font-medium"
                >
                  Share this app
                </button>
              </li>
            </ul>
            <ul className="text-xs text-gray-500 py-4 space-y-3">
              <li className="py-1 px-4 flex space-x-2 opacity-50">
                <span>Download instagram story cover.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
