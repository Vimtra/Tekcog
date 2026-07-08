import { Routes, Route, useLocation, useSearchParams } from "react-router-dom";
import { Header, TabNames } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { lazy, Suspense, useEffect, useState } from "react";
import { MenuItemProps } from "semantic-ui-react";
// import { Mobile } from "./components/MobileF/Mobile";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import Tlogo from "./images/Tlogobig.png";
import $ from "jquery";

import "./App.css";

const Home = lazy(() =>
  import("./components/Home/Home").then((module) => ({ default: module.Home })),
);
const Services = lazy(() =>
  import("./components/Services/Services").then((module) => ({
    default: module.Services,
  })),
);
const Apply = lazy(() =>
  import("./components/Apply/Apply").then((module) => ({ default: module.Apply })),
);
const Contact = lazy(() =>
  import("./components/Contact/Contact").then((module) => ({ default: module.Contact })),
);
const About = lazy(() =>
  import("./components/About/About").then((module) => ({ default: module.About })),
);

const PageLoader = () => (
  <div className="page-loading" style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
    <span>Loading...</span>
  </div>
);

const SplashScreen = () => {
  useEffect(() => {
    // Execute the jQuery logic after the component mounts
    const welcomeSection = $(".welcome-section");

    setTimeout(() => {
      welcomeSection.removeClass("content-hidden");
    }, 800); // Adjust the delay as needed
  }, []);
  return (
    <div className="splash-screen">
      <img src={Tlogo} alt="Logo" className="splash-logo" />
      {/* <img     src={Tgif} alt="Logo" className="splash-gif" /> */}
      {/* <img     src={Tgif2} alt="Logo" className="splash-gif2" /> */}
      <div className="welcome-section content-hidden">
        <div className="content-wrap">
          <ul className="fly-in-text">
            <li>T</li>
            <li>E</li>
            <li>K</li>
            <li>C</li>
            <li>O</li>
            <li>G</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const App = () => {
  const [activeItem, setActiveItem] = useState<TabNames>(TabNames.HOME);
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(false);

  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    // Hide the splash screen after 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    });

    document.querySelectorAll(".animate").forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const changeNavBg = () => {
    window.scrollY >= 150 ? setNavBg(true) : setNavBg(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const [, setSearchParams] = useSearchParams();
  useEffect(() => {
    const pathname1 = location.pathname.split("?")[0];

    switch (pathname1) {
      case "/services":
        setActiveItem(TabNames.SERVICES);
        break;
      case "/apply":
        setActiveItem(TabNames.MOBILE);
        break;
      case "/contact":
        setActiveItem(TabNames.CONTACT);
        break;
      case "/demo":
        setActiveItem(TabNames.DEMO);
        break;
      case "/about-us":
        setActiveItem(TabNames.ABOUT_US);
        break;
      default:
        setActiveItem(TabNames.HOME);
        break;
    }
  }, [location.pathname]);

  const handleItemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: MenuItemProps,
  ) => {
    if (data.name) {
      setActiveItem(data.name as TabNames);

      if (data.name === TabNames.SERVICES) {
        setSearchParams({ q: "Class_Student" });
      }
    }
  };

  return (
    <div>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          <Header activeItem={activeItem} handleItemClick={handleItemClick} />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about-us" element={<About />} />
            </Routes>
          </Suspense>
          <Footer activeItem={activeItem} handleItemClick={handleItemClick} />

          <ArrowUpwardOutlinedIcon
            className={navBg ? "Uparrow" : "UparrowHiden"}
            onClick={scrollToTop}
          ></ArrowUpwardOutlinedIcon>
        </>
      )}
    </div>
    //   <>
    //   <Header activeItem={activeItem} handleItemClick={handleItemClick} />
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/product" element={<Product />} />
    //       <Route path="/apply" element={<Apply />} />
    //       <Route path="/contact" element={<Contact />} />
    //       <Route path="/about-us" element={<About />} />
    //     </Routes>
    //   <Footer activeItem={activeItem} handleItemClick={handleItemClick}/>

    //   <ArrowUpwardOutlinedIcon className= {navBg ? ('Uparrow') : ('UparrowHiden')} onClick={scrollToTop}></ArrowUpwardOutlinedIcon>
    // </>
  );
};
