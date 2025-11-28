import { useEffect, useState } from "react";
import Header from "./modules/common/Header";
import App from "./App";
import Footer from "./modules/common/Footer";
import { ACCESS_TOKEN } from "../constant";

function Layout() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(ACCESS_TOKEN);
    console.log(storedToken)
    setToken(storedToken);
  }, [setToken]);

  return (
    <>
      {!token ? (
        <>
          <Header />
          <App />
          <Footer />
        </>
      ) : (
        <>
          <App />
        </>
      )}
    </>
  );
}

export default Layout;
