// import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';

/**
 * This is set up to handle per-page layouts with TypeScript.
 * For handling different types of page layouts see:
 * https://nextjs.org/docs/basic-features/layouts
 */

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
