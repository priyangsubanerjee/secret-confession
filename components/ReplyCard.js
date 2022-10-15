import React, { useState, useEffect } from "react";
import { Popover } from "@headlessui/react";
import deleteMessage from "../helpers/deleteMessage";
import Loading from "../components/Loading";

function ReplyCard({ message, linkId, setMessages }) {
  const [loading, setLoading] = useState(false);

  const deleteMsg = async () => {
    setLoading(true);
    const response = await deleteMessage(linkId, message.id);
    setMessages(response.data);
    setLoading(false);
  };

  const formatDateTime = (str) => {
    const date = new Date(str);
    let n = date.toLocaleDateString();
    let t = date.toLocaleTimeString().substring(0, 5);
    return n + " " + t;
  };

  return (
    <div>
      <div key={message.id}>
        <div className="bg-white border p-4">
          <div className="text-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {message.date.length > 0 ? formatDateTime(message.date) : ""}
              </span>
              <Popover className="relative">
                <Popover.Button>
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

                <Popover.Panel className="absolute right-0 top-6 z-10 bg-white rounded border shadow text-left">
                  <ul className="text-xs text-gray-500 py-3 space-y-3 whitespace-nowrap">
                    <li className="px-4">
                      <Popover.Button>
                        <button
                          className="text-rose-500"
                          onClick={() => deleteMsg()}
                        >
                          Delete message
                        </button>
                      </Popover.Button>
                    </li>
                  </ul>
                </Popover.Panel>
              </Popover>
            </div>
            <span className="text-gray-700 leading-6 mt-4 block">
              {message.message}
            </span>
          </div>
        </div>
      </div>
      <Loading visible={loading} />
    </div>
  );
}

export default ReplyCard;
