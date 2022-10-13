import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#14B8A6" className="text-teal-500" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
