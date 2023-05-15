import "../styles/globals.css";
import '../pages/index.css'
import { ThemeProvider } from "next-themes";
import Layout from "../components/layout";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useRouter } from "next/router";
import { MetaMaskProvider } from "metamask-react";
import Meta from "../components/Meta";
import UserContext from "../components/UserContext";
import { useRef } from "react";
import { SupercoolAuthContextProvider } from "../context/supercoolContext";
import { env } from "process";
// const dotenv = require("dotenv")
// dotenv.config()
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pid = router.asPath;
  const scrollRef = useRef({
    scrollPos: 0,
  });

  const NEXT_PUBLIC_APP_OPEN_AI = process.env.NEXT_PUBLIC_APP_OPEN_AI;
  // console.log('NEXT_PUBLIC_APP_OPEN_AI---', NEXT_PUBLIC_APP_OPEN_AI);

  // console.log(' NEXT_PUBLIC_APP_INFURA_PROJECT_KEY=== ', process.env.NEXT_PUBLIC_APP_INFURA_PROJECT_KEY);

  console.log(' NEXT_PUBLIC_APP_INFURA_APP_SECRET_KEY ++++ ', process.env.NEXT_PUBLIC_APP_INFURA_APP_SECRET_KEY );

  return (
    <>

      <Meta title="Home 1" />

      <Provider store={store}>
        <ThemeProvider enableSystem={true} attribute="class">
          <MetaMaskProvider>
            <SupercoolAuthContextProvider>

              <UserContext.Provider value={{ scrollRef: scrollRef }}>
                {pid === "/login" ? (
                  <Component {...pageProps} />
                ) : (
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                )}
              </UserContext.Provider>
            </SupercoolAuthContextProvider>
          </MetaMaskProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
