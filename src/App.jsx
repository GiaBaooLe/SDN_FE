import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TawkToChat from "./components/TawkToChat";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3">
        <Outlet /
        >
        <TawkToChat />
      </main>
    </>
  );
};

export default App;
