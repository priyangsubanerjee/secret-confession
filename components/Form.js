import React, { useState, useEffect } from "react";
import create from "../helpers/create";
import refreshLinks from "../helpers/refresh";
import Loading from "./Loading";
import QuickShareCard from "./QuickShareCard";

function Form({ secretUserId, setActiveLinks }) {
  const [sendEmail, setSendEmail] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [quickShareIsOpen, setQuickShareIsOpen] = useState(false);
  const [shareData, setShareData] = useState("");

  const steps = [
    "Enter your Name, create confession link and share with your friends on Whatsapp, Facebook.",
    "Select the checkbox, if you want to receive notification each time someone replies.",
    "Once your friends send you a message, you will see the results on replies page.",
  ];

  const onSubmit = async () => {
    setLoading(true);
    const res = await create(name, email, secretUserId);
    if (res.success) {
      try {
        const links = await refreshLinks();
        setActiveLinks(links);
        setLoading(false);
        setName("");
        setEmail("");
        setSendEmail(false);
        setShareData(res.data);
      } catch (error) {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shareData.id) {
      setQuickShareIsOpen(true);
    }
  }, [shareData]);

  const closeQuickShare = () => {
    setQuickShareIsOpen(false);
    setShareData("");
  };

  return (
    <div>
      <div className="p-5 bg-transparent">
        <div className="border shadow-md shadow-slate-100 bg-white">
          <ul className="text-xs text-gray-500 py-4 border-b space-y-1">
            {steps.map((step, i) => {
              return (
                <>
                  <li className="py-1 px-4 flex space-x-2 items-baseline">
                    <div className="flex space-x-1">
                      <span>{i + 1}</span>
                      <span>.</span>
                    </div>
                    <span className="leading-5">{step}</span>
                  </li>
                </>
              );
            })}
          </ul>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="p-5"
          >
            <div>
              <input
                type="text"
                required={true}
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-100 px-4 py-2 w-full rounded"
                name=""
                id=""
              />
              <div className="mt-6">
                <div className="flex space-x-2">
                  <input
                    type="checkbox"
                    className="accent-teal-600"
                    name=""
                    id="sendEmailNotification"
                    checked={sendEmail}
                    onChange={(e) => {
                      setSendEmail(e.target.checked);
                    }}
                  />
                  <label
                    htmlFor="sendEmailNotification"
                    className="text-slate-500 text-xs"
                  >
                    Send me email notification for new message.
                  </label>
                </div>
              </div>
              {sendEmail && (
                <input
                  type="email"
                  required={sendEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter a valid email address"
                  className="bg-slate-100 px-4 py-2 w-full mt-6 rounded"
                  name=""
                  id=""
                />
              )}
              <button
                type="submit"
                className="bg-teal-500 text-white rounded mt-6 font-medium w-full py-2"
              >
                Create confession page
              </button>
            </div>
          </form>
        </div>
      </div>
      <Loading visible={loading} />
      <QuickShareCard
        close={closeQuickShare}
        data={shareData}
        visible={quickShareIsOpen}
      />
    </div>
  );
}

export default Form;
