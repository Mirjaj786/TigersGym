import { Outlet } from "react-router-dom";

import Navbar from "../../Component/Navbar/NavBar";
import Footer from "../../Component/Footer/Footer";

function MainLayout() {
  return (
    <>
      <Navbar />

      <main style={{ paddingTop: "80px" }}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;
