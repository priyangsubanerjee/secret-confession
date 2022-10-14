import React, { useState, useLayoutEffect } from "react";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import checkUserId from "../helpers/userId";
import refreshLinks from "../helpers/refresh";
import LinkCard from "../components/LinkCard";
import Head from "next/head";

export default function Home() {
  const [secretUserId, setSecretUserId] = useState(null);
  const [activeLinks, setActiveLinks] = useState([]);

  useLayoutEffect(() => {
    const uid = checkUserId();
    setSecretUserId(uid);
    (async () => {
      try {
        const links = (await refreshLinks()) || [];
        setActiveLinks(links);
      } catch (error) {}
    })();
  }, []);

  return (
    <div>
      <Head>
        <title>
          Secret Confession 2022 | Send anonymous message to your friends.
        </title>
        <link rel="apple-touch-icon" href="/favicon.png"></link>
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
        <meta
          name="description"
          content="Secret Confession allows you to receive anonymous messages from your friends. It’s you in discovering your strengths and areas for improvement by receiving honest, constructive feedback from your employees and your friends. What if someone has a secret crush on you or thinks that you're awesome, lazy or whatever else, you’ll find it out on Secret Confession. 😉 We’re all good at something, and it’s really important to know and hear from somebody else from time to time."
        />
        <meta
          name="keywords"
          content="secret, message, confession, crush, love, fun, link, share, secret message app, webapp, app, website, tools"
        />
        <meta name="author" content="Priyangsu Banerjee" />
        <meta
          property="og:title"
          content="Secret Confession allows you to receive anonymous messages from your friends."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://secretconfession.vercel.app/ogimage.png"
        />
        <meta property="og:url" content="https://secretconfession.vercel.app" />
        <meta property="og:image:type" content="image/png" />
      </Head>
      <Form secretUserId={secretUserId} setActiveLinks={setActiveLinks} />
      <div className="p-5 bg-transparent">
        {activeLinks.length > 0 && (
          <h1 className="font-bold text-slate-600 flex items-center space-x-2">
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
            <div>
              <span className="text-teal-600">Active</span> links
            </div>
          </h1>
        )}
        <div className="grid grid-cols-1 mt-5 gap-4">
          {activeLinks.map((link, i) => {
            return (
              <LinkCard setActiveLinks={setActiveLinks} data={link} key={i} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
