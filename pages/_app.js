import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#14B8A6" className="text-teal-500" />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
