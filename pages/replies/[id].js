import React, { useState, useEffect, useLayoutEffect } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { Popover } from "@headlessui/react";
import { client, gql } from "../../helpers/graph";
import ReplyCard from "../../components/ReplyCard";
import Head from "next/head";
import checkUserId from "../../helpers/userId";
import toast, { Toaster } from "react-hot-toast";

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
  const [verified, setVerified] = useState(false);

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

  useLayoutEffect(() => {
    let msgs_s = data.messages || [];
    setMessages(msgs_s);
  }, [data.messages]);

  useLayoutEffect(() => {
    const uid = checkUserId();
    if (data.userId == uid) {
      setVerified(true);
    }
  }, [data.userId]);

  return (
    <div>
      {verified ? (
        <div>
          {" "}
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
                    <Popover.Button>
                      <button onClick={() => copyLink()}>
                        Copy message link
                      </button>
                    </Popover.Button>
                  </li>
                  <li className="px-4">
                    <Popover.Button>
                      <button onClick={() => shareLink()}>
                        Share message link
                      </button>
                    </Popover.Button>
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
      ) : (
        <div>
          <div className="p-5 bg-transparent">
            <Head>
              <title>Not authorized</title>
            </Head>
            <div className="border bg-white p-4">
              <div className="flex flex-col items-center justify-center mt-5">
                <div className="text-teal-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </div>
                <span className="w-full font-medium text-sm text-center text-gray-700 mt-6 border-b pb-5">
                  You are not <span className="text-teal-600">authorized</span>{" "}
                  to view replies.
                </span>
                <ul className="text-xs text-gray-500 py-4 border-b">
                  <li className="py-1 px-4 flex space-x-2">
                    <div className="flex space-x-1">
                      <span>•</span>
                    </div>
                    <span>
                      Wanna receive anonymous message from your friends?
                    </span>
                  </li>
                  <li className="py-1 px-4 flex space-x-2">
                    <div className="flex space-x-1">
                      <span>•</span>
                    </div>
                    <span>Messages are end-to-end encrypted.</span>
                  </li>
                  <li className="py-1 px-4 flex space-x-2">
                    <div className="flex space-x-1">
                      <span>•</span>
                    </div>
                    <span>Receive notification on new messages.</span>
                  </li>
                  <li className="py-1 px-4 flex space-x-2">
                    <div className="flex space-x-1">
                      <span>•</span>
                    </div>
                    <span>Create your own link now!</span>
                  </li>
                </ul>
                <Link href="/">
                  <button
                    type="submit"
                    className="bg-teal-500 text-white rounded mt-5 font-medium w-full py-2"
                  >
                    Create your confession page
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Replies;
