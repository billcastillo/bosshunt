import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/changa/500.css";

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
