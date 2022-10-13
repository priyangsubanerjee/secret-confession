import React, { useState, useEffect, useLayoutEffect } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { Popover } from "@headlessui/react";
import { client, gql } from "../../helpers/graph";
import ReplyCard from "../../components/ReplyCard";
import Head from "next/head";

export async function getServerSideProps(ctx) {
  const id = ctx.params.id;

  const query = gql`
      query MyQuery {
        link(where: { id: "${id}" }) {
          name
          id
          email
          userId
          views
          messages{
            message
            id
          }
        }
      }
    `;

  const response = await client.request(query);

  return {
    props: {
      data: response.link,
    },
  };
}

function Replies({ data }) {
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    let msgs_s = data.messages || [];
    setMessages(msgs_s);
  }, [data.messages]);

  return (
    <div>
      <Head>
        <title>Replies</title>
      </Head>
      <div className="px-5 mt-5 flex items-center">
        <h1 className="font-bold text-xl text-gray-700 shrink-0">Inbox</h1>
        <span className="ml-2 text-sm text-teal-600 font-medium">{`(${messages.length})`}</span>
        <Popover className="relative ml-4 ">
          <Popover.Button className="rounded-full bg-white border h-8 w-8 flex items-center justify-center">
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

          <Popover.Panel className="absolute left-0 top-8 z-10 bg-white rounded border shadow text-left">
            <ul className="text-xs text-gray-500 py-3 space-y-3 whitespace-nowrap">
              <li className="px-4">
                <button
                  onClick={() => {
                    location.reload();
                  }}
                >
                  Refresh
                </button>
              </li>
              <li className="px-4">
                <Link href={`/message/`}>
                  <button>Copy message link</button>
                </Link>
              </li>
              <li className="px-4">
                <button>Share message link</button>
              </li>
              <li className="px-4">
                <Link href={`/message/${data.id}`}>
                  <button>Preview message link</button>
                </Link>
              </li>
            </ul>
          </Popover.Panel>
        </Popover>
      </div>
      <div className="p-5 bg-transparent grid grid-cols-1 gap-3">
        {messages.map((message, i) => {
          return (
            <ReplyCard
              key={message.id}
              message={message}
              linkId={data.id}
              setMessages={setMessages}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Replies;
