import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Popover } from "@headlessui/react";
import deleteLink from "../helpers/delete";
import Loading from "./Loading";
import toast, { Toaster } from "react-hot-toast";

function LinkCard({ data, setActiveLinks }) {
  const [loading, setLoading] = useState(false);
  const shareLink = async () => {
    const shareData = {
      title: "Secret message",
      text: `Send a secret message 🗝 to ${data.name}, Wanna tell anything or something else to me? Now it's time 😎, I'm very excited 😍 ,I will never know who send me!, Just fun lets try 🗝 👉 https://secretconfession.vercel.app/message/${data.id}`,
    };

    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log(err);
    }
  };

  const copyLink = async () => {
    try {
      toast("Copied");
      navigator.clipboard.writeText(
        `https://secretconfession.vercel.app/message/${data.id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSubmit = async () => {
    setLoading(true);
    const links = await deleteLink(data.id);
    setActiveLinks(links);
    setLoading(false);
  };

  return (
    <div className="border bg-white rounded-md p-4">
      <div>
        <h1 className="text-gray-700 text-sm">
          Send a secret message to{" "}
          <span className="text-teal-600 font-medium">{data.name}</span>.
        </h1>
        <div className="mt-4 flex items-center w-full">
          <div className="w-fit flex items-center space-x-2">
            <span className="text-gray-500">
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
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </span>
            <span className="text-xs text-gray-700">{data.views}</span>
          </div>
          <div className="w-fit flex items-center space-x-2 ml-4">
            <span className="text-gray-500">
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
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
            </span>
            <span className="text-xs text-gray-700">
              {data.messages.length}
            </span>
          </div>
          <div className="w-fit ml-5">
            <Popover className="relative">
              <Popover.Button className="mt-[1px] block">
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
                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                  />
                </svg>
              </Popover.Button>

              <Popover.Panel className="absolute left-0 top-6 z-10 bg-white rounded border shadow text-left">
                <ul className="text-xs text-gray-500 py-3 space-y-3 whitespace-nowrap">
                  <li className="px-4">
                    <Popover.Button>
                      <button
                        onClick={() => {
                          shareLink();
                        }}
                      >
                        Share message link
                      </button>
                    </Popover.Button>
                  </li>
                  <li className="px-4">
                    <Popover.Button>
                      <button onClick={() => copyLink()}>
                        Copy message link
                      </button>
                    </Popover.Button>
                  </li>
                  <li className="px-4">
                    <Link href={`/message/${data.id}`}>
                      <button>Preview message page</button>
                    </Link>
                  </li>
                  <li className="px-4 opacity-50">
                    <button>
                      {data.email.length > 0 ? "Remove email" : "Add email"}
                    </button>
                  </li>
                  <li className="px-4">
                    <Popover.Button>
                      <button
                        className="text-rose-600"
                        onClick={() => {
                          deleteSubmit();
                        }}
                      >
                        Delete
                      </button>
                    </Popover.Button>
                  </li>
                </ul>
              </Popover.Panel>
            </Popover>
          </div>
          <Link href={`/replies/${data.id}`}>
            <button className="text-xs ml-auto text-slate-600 bg-slate-50 border py-1 px-4 rounded-full flex items-center space-x-1">
              <span>Replies</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </div>
      <Loading visible={loading} />
    </div>
  );
}

export default LinkCard;
