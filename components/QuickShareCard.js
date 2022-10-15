/* eslint-disable @next/next/no-img-element */
import React from "react";
import toast, { Toaster } from "react-hot-toast";

function QuickShareCard({ data, visible, close }) {
  const shareData = {
    title: "Secret message",
    text: `Send a secret message 🗝 to ${data.name}, Wanna tell anything or something else to me? Now it's time 😎, I'm very excited 😍 ,I will never know who send me!, Just fun lets try 🗝 👉 https://secretconfession.vercel.app/message/${data.id}`,
  };
  return (
    <>
      {visible && (
        <div className="fixed inset-0 z-10 bg-black/50 flex items-end lg:items-center lg:justify-center">
          <div className="bg-white w-full lg:w-[600px]">
            <div className="p-5 bg-transparent">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <span className="text-teal-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>Confession page created successfully</span>
                </span>
                <button onClick={() => close()} className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center mt-7">
                <button
                  onClick={async () => {
                    try {
                      await navigator.share(shareData);
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                  className="bg-gray-50 active:bg-gray-100 border py-2 px-4 rounded text-sm flex items-center space-x-2"
                >
                  <span className="text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>Share</span>
                </button>
                <button
                  onClick={() => {
                    try {
                      toast("Copied");
                      navigator.clipboard.writeText(
                        `https://secretconfession.vercel.app/message/${data.id}`
                      );
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  className="bg-gray-50 active:bg-gray-100 border ml-4 py-2 px-4 rounded text-sm flex items-center space-x-2"
                >
                  <span className="text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                      />
                    </svg>
                  </span>
                  <span>Copy</span>
                </button>
                <button className="ml-7 hidden">
                  <img src="/whatsapp.png" className="h-8 w-8" alt="" />
                </button>
                <button className="ml-7 hidden">
                  <img src="/twitter.png" className="h-7 w-7" alt="" />
                </button>
              </div>
              <p className="text-xs text-gray-500 leading-6 mt-5">
                Please Understand If you have used a service called anonymous
                messages, you must understand the identity of users sending you
                messages are not stored.
              </p>
              <ul className="text-xs text-gray-500 py-4 border-b ml-2">
                <li className="py-1 flex space-x-2">
                  <div className="flex space-x-1">
                    <span>•</span>
                  </div>
                  <span>Now share your link with your friends.</span>
                </li>
                <li className="py-1 flex space-x-2">
                  <div className="flex space-x-1">
                    <span>•</span>
                  </div>
                  <span>
                    There are no ways to understand who sent you the messages.
                  </span>
                </li>
                <li className="py-1 flex space-x-2">
                  <div className="flex space-x-1">
                    <span>•</span>
                  </div>
                  <span>Even developers cant find who messaged you.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QuickShareCard;
