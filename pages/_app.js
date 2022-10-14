import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#14B8A6" className="text-teal-500" />
      <Navbar />
      <div className="lg:w-[700px] lg:mx-auto">
        <Component {...pageProps} />
      </div>
      <Toaster />
    </>
  );
}

export default MyApp;
