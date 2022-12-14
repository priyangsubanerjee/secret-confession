/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useLayoutEffect } from "react";
import Navbar from "../../components/Navbar";
import Confetti from "react-confetti";
import Loading from "../../components/Loading";
import { gql, client } from "../../helpers/graph";
import sendMessage from "../../helpers/message";
import sendEmail from "../../helpers/sendMail";
import Link from "next/link";
import Head from "next/head";
import incrementView from "../../helpers/views";

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
        }
      }
    `;

  const response = await client.request(query);
  console.log(response);
  return {
    props: {
      data: response.link,
    },
  };
}

function SecretMessage({ data }) {
  const [sent, setSent] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [runConfetti, setRunConfetti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    setWidth(innerWidth);
    setHeight(innerHeight);
  }, []);

  useLayoutEffect(() => {
    (async () => {
      data.id && (await incrementView(data.id));
    })();
  }, [data]);

  const onSubmit = async () => {
    setLoading(true);
    let n_message = message.replace(/\n/g, "\\n");
    const res = await sendMessage(n_message, data.id);
    if (res.success) {
      if (data.email.length > 0) {
        try {
          const resE = await sendEmail(data.email, message);
          if (resE.success) {
            setSent(true);
            setLoading(false);
            setRunConfetti(true);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setSent(true);
        setLoading(false);
        setRunConfetti(true);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      {data ? (
        <div>
          <Head>
            <title>Send message to {data.name} || Secret confession</title>
            <link rel="apple-touch-icon" href="/favicon.png"></link>
            <link rel="icon" href="/favicon.png" type="image/x-icon" />
            <meta
              name="description"
              content={`Send an anonymous message to ${data.name} || Secret confession`}
            />
            <meta
              name="keywords"
              content="secret, message, confession, crush, love, fun, link, share, secret message app, webapp, app, website, tools"
            />
            <meta name="author" content="Priyangsu Banerjee" />
            <meta property="og:title" content="Secret Confession" />
            <meta property="og:type" content="website" />
            <meta
              property="og:image"
              content="https://secretconfession.vercel.app/ogimage.png"
            />
            <meta
              property="og:url"
              content="https://secretconfession.vercel.app"
            />
            <meta property="og:image:type" content="image/png" />
          </Head>
          {sent == false ? (
            <div className="p-5 bg-transparent">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
                className="border bg-white p-4"
              >
                <span className="text-sm text-gray-600 flex items-center space-x-1">
                  <span>Send</span>
                  <span className="flex items-center space-x-1">
                    <span>anonymous</span>
                  </span>
                  <span>message to</span>
                  <span className="text-teal-600 font-medium">{data.name}</span>
                  .
                </span>
                <ul className="text-xs text-gray-500 py-4 border-b">
                  <li className="py-1 px-4 flex space-x-2">
                    <div className="flex space-x-1">
                      <span>???</span>
                    </div>
                    <span>Send your message directly to {data.name}.</span>
                  </li>
                  <li className="py-1 px-4 flex space-x-2">
                    <div className="flex space-x-1">
                      <span>???</span>
                    </div>
                    <span>
                      {data.name} will never know who sent this message.
                    </span>
                  </li>
                </ul>
                <textarea
                  name=""
                  required={true}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message ..."
                  className="mt-5 whitespace-pre-wrap
                   leading-5 p-3 bg-gray-50 border w-full rounded-md"
                  id=""
                  rows="7"
                ></textarea>
                <button
                  type="submit"
                  className="bg-teal-500 text-white rounded mt-5 font-medium w-full py-2"
                >
                  Send
                </button>
              </form>
            </div>
          ) : (
            <div className="p-5 bg-transparent">
              <div className="border bg-white p-4">
                <div className="flex flex-col items-center justify-center mt-5">
                  <div className="text-teal-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-10 h-10"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="w-full font-medium text-sm text-center text-gray-700 mt-6 border-b pb-5">
                    Message sent successfully to{" "}
                    <span className="text-teal-600">{data.name}</span>
                  </span>
                  <ul className="text-xs text-gray-500 py-4 border-b">
                    <li className="py-1 px-4 flex space-x-2">
                      <div className="flex space-x-1">
                        <span>???</span>
                      </div>
                      <span>
                        Wanna receive anonymous message from your friends?
                      </span>
                    </li>
                    <li className="py-1 px-4 flex space-x-2">
                      <div className="flex space-x-1">
                        <span>???</span>
                      </div>
                      <span>Messages are end-to-end encrypted.</span>
                    </li>
                    <li className="py-1 px-4 flex space-x-2">
                      <div className="flex space-x-1">
                        <span>???</span>
                      </div>
                      <span>Receive notification on new messages.</span>
                    </li>
                    <li className="py-1 px-4 flex space-x-2">
                      <div className="flex space-x-1">
                        <span>???</span>
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
          )}
          <div className="text-center mt-3">
            <span className="text-xs text-gray-700">
              Read privacy policy | Terms & Conditions
            </span>
          </div>
          {runConfetti && (
            <Confetti
              height={height}
              width={width}
              recycle={false}
              onConfettiComplete={() => setRunConfetti(false)}
            />
          )}
          <Loading visible={loading} />
        </div>
      ) : (
        <div>
          <div className="p-5 bg-transparent">
            <Head>
              <title>Error: Page not found</title>
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
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <span className="w-full font-medium text-sm text-center text-gray-700 mt-6 border-b pb-5">
                  Page not <span className="text-teal-600">found</span> or may
                  have been deleted.
                </span>
                <ul className="text-xs text-gray-500 py-4 border-b">
                  <li className="py-1 px-4 flex space-x-2">
                    <div className="flex space-x-1">
                      <span>???</span>
                    </div>
                    <span>
                      Wanna receive anonymous message from your friends?
                    </span>
                  </li>
                  <li className="py-1 px-4 flex space-x-2">
                    <div className="flex space-x-1">
                      <span>???</span>
                    </div>
                    <span>Messages are end-to-end encrypted.</span>
                  </li>
                  <li className="py-1 px-4 flex space-x-2">
                    <div className="flex space-x-1">
                      <span>???</span>
                    </div>
                    <span>Receive notification on new messages.</span>
                  </li>
                  <li className="py-1 px-4 flex space-x-2">
                    <div className="flex space-x-1">
                      <span>???</span>
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
    </>
  );
}

export default SecretMessage;
