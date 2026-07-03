import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      <div
        className="container"
        style={{ minHeight: "80vh", marginTop: "25px" }}
      >
        {children}
      </div>

      <Footer />
    </>
  );
}

export default Layout;