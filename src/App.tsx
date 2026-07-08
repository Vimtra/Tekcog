import { Routes, Route, useLocation, useSearchParams } from "react-router-dom";
import { Header, TabNames } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Contact } from "./components/Contact/Contact";
import { Home } from "./components/Home/Home";
import { Services } from "./components/Services/Services";
import { Apply } from "./components/Apply/Apply";
import { About } from "./components/About/About";
import { useEffect, useState } from "react";
import { MenuItemProps } from "semantic-ui-react";
// import { Mobile } from "./components/MobileF/Mobile";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import Tlogo from "./images/Tlogobig.png";
import Tgif from "./images/TEkCOG.gif";
import Tgif2 from "./images/Tgif02.gif";
import $ from "jquery";

import "./App.css";

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

document.addEventListener("DOMContentLoaded", () => {
  // Use Intersection Observer to determine if objects are within the viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        return;
      }
      entry.target.classList.remove("in-view");
    });
  });

  // Get all the elements with the .animate class applied
  const allAnimatedElements = document.querySelectorAll(".animate");

  // Add the observer to each of those elements
  allAnimatedElements.forEach((element) => observer.observe(element));
});

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
    // Intersection Observer to determine if objects are within the viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    });

    // Function to observe all elements with the .animate class
    const observeElements = () => {
      const allAnimatedElements = document.querySelectorAll(".animate");
      allAnimatedElements.forEach((element) => observer.observe(element));
    };

    // Observe initial elements
    observeElements();

    // MutationObserver to detect DOM changes
    const mutationObserver = new MutationObserver(() => {
      observeElements(); // Reapply IntersectionObserver to new elements
    });

    // Observe the body for changes
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      // Cleanup IntersectionObserver
      observer.disconnect();
      // Cleanup MutationObserver
      mutationObserver.disconnect();
    };
  }, []); // Re-run when `trigger` changes

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

  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const pathname1 = location.pathname.split("?")[0];
    console.log(pathname1, "ssssss");

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
      console.log(data.name, TabNames.SERVICES, "namesssss");

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about-us" element={<About />} />
          </Routes>
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
