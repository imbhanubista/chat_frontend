import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

function App(props) {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="body-container">{props.children}</div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default App;
