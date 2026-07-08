import { Header } from "semantic-ui-react";

import "./About.css";
import Tlogo from "../../images/Tlogobig.png";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import vision from "../../images/vision01.jpg";
import logoBh from "../../images/TlogoB01.png";
import WSP from "../../images/wSp.jpeg";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef } from "react";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import FingerprintOutlinedIcon from "@mui/icons-material/FingerprintOutlined";
import ino from "../../images/ino2.png";

export const About = () => {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 900px)" });
  const backgroundRef2 = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  function animateValue(
    obj: HTMLElement,
    start: number,
    end: number,
    duration: number,
  ) {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start).toString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  useEffect(() => {
    const animateValue = (
      obj: HTMLElement,
      start: number,
      end: number,
      duration: number,
    ) => {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toString();
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    // Select all elements with a specific class
    const elements = document.querySelectorAll<HTMLElement>(".animate-value");

    if (elements.length === 0) {
      console.error("No elements with class 'animate-value' found in the DOM.");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const endValue = parseInt(
              target.getAttribute("data-end") || "100",
              10,
            ); // Use `data-end` for dynamic values
            animateValue(target, 0, endValue, 2000); // Start animation
            observer.unobserve(target); // Stop observing this element after animation starts
          }
        });
      },
      { threshold: 0.5 }, // Trigger when 50% of the element is visible
    );

    // Observe each element
    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect(); // Cleanup observer on component unmount
    };
  }, []);
  useEffect(() => {
    // if (heroRef.current && backgroundRef.current) {
    //   heroRef.current.style.background = 'none';
    //   backgroundRef.current.style.backgroundImage = `url(${bgImage2})`;
    // }
    const handleScroll = () => {
      if (backgroundRef2.current) {
        const maxScroll = 450;
        const maxScaleTransform = 1.8;
        const maxScaleTop = 1.6;
        const maxScaleTop2 = 1.8;

        let scale = window.scrollY / 900 + 1;
        let scaleFont = window.scrollY / 710 + 1;
        let scaleTop = window.scrollY / 710 + 1;
        let scale1 = Math.max(1.4, scaleFont);
        console.log(scaleTop);

        if (window.scrollY > maxScroll) {
          // scale = maxScaleTransform;
          scale1 = maxScaleTop;
          scaleTop = maxScaleTop2;
          // backgroundRef.current.style.top = `${(scaleTop + 1) * 100}vh`;
        }
        backgroundRef2.current.style.transform = `scale(${scale}, ${scale})`;
        backgroundRef2.current.style.transformOrigin = "bottom right";
        backgroundRef2.current.style.top = `${(scaleTop - 1) * 100}vh`;
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="about">
        <div className="stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
        <section className="about_hero">
          <Header className="hero_heading2 animate">About Us</Header>

          {/* <div   ref={backgroundRef}className='glow'></div> */}
        </section>
        <div style={{ height: "fit-content", width: "fill" }}>
          <section className="about_section2">
            <div className="third-section__right2 animate">
              <div className="sideImg animate">
                <div className="light"></div>
                <div className="img_box">
                  <img src={WSP} alt="T" className="icon animate" />
                </div>
              </div>
              <div className="content1">
                <a>About Us</a>
                <h1 className="title">
                  Driving Innovation. Delivering Talent.
                </h1>

                <div className="para">
                  <img src={logoBh} alt="Qshikshak" className="icon_small" />
                  Tekcog is a global technology and staffing services company
                  helping businesses embrace the digital future. Headquartered
                  in the USA with operations in India, we specialise in Cloud
                  Solutions, Data Science & Analytics, Custom Software
                  Development, and IT Staffing.
                  <br></br>Our mission is to empower enterprises with
                  cutting-edge technology and top-tier talent—delivering
                  scalable, efficient, and future-ready solutions.
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="about_section3">
          <div className="third-section__right3 animate">
            <div className="content1">
              <a>Our Vision</a>
              <h1 className="title">
                Empowering the future through innovative technology
              </h1>

              <div className="para">
                <img src={logoBh} alt="Qshikshak" className="icon_small" />
                At Tekcog, our vision is to redefine the staffing industry by
                delivering exceptional talent solutions that drive business
                growth and individual success. We are committed to creating
                strong partnerships—connecting skilled professionals with
                forward-thinking employers.
                <br></br>
                <br></br>
                With deep expertise across multiple domains, we aim to provide
                services that prioritise success for both candidates and
                clients. Our mission is rooted in understanding your needs and
                delivering mutual value—something we’ve stood by since day one.
                <br></br>
              </div>
            </div>
            <div className="sideImg_2 animate">
              <div className="img_box_2">
                <img src={vision} alt="T" className="icon_2 animate" />
              </div>
              <div className="light"></div>
            </div>
          </div>
        </section>

        <div className="about-content">
          <div className="second-section__right3">
            <div className="content2">
              <div className="skills_content">
                <h1 className="title">Our Skills</h1>
                <p>
                  <a>Communication : </a>Clear, effective verbal and written
                  communication, with strong active listening.
                  <br></br>
                  <a>Teamwork and Collaboration :</a> Productive cooperation,
                  conflict resolution, and constructive feedback.<br></br>
                  <a>Problem-Solving :</a> Analytical thinking and decisive
                  action to overcome challenges.<br></br>
                  <a>Adaptability and Flexibility :</a> Flexibility to shift
                  with changing priorities and technologies.<br></br>
                  <a>Time Management :</a> Strategic task planning to meet
                  deadlines efficiently.<br></br>
                  <a>Critical Thinking :</a> Logical analysis to support sound
                  decision-making.<br></br>
                  <a>Leadership and Management :</a> Inspiring teams, delegating
                  effectively, and driving accountability.
                </p>
              </div>

              {/* <div style={{width:'100%',height:2, backgroundColor:'black',marginTop:30,marginBottom:30}}></div> */}
              <div className="wrapper_countn">
                <div className="container">
                  <i className="fas fa-utensils"></i>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <span className="num animate-value" data-end="5">
                      0
                    </span>
                    <a style={{ fontSize: "50px" }}>+</a>
                  </div>
                  <span className="text">Years Of Experience</span>
                </div>
                <div className="container">
                  <i className="fas fa-smile-beam"></i>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <span className="num animate-value" data-end="500">
                        0
                      </span>
                      <a style={{ fontSize: "50px" }}>+</a>
                    </div>
                  </div>
                  <span className="text">IT Problems Solved</span>
                </div>
                <div className="container">
                  <i className="fas fa-list"></i>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <span className="num animate-value" data-end="200">
                      0
                    </span>
                    <a style={{ fontSize: "50px" }}>+</a>
                  </div>
                  <span className="text">Satisfied Clients</span>
                </div>
                <div className="container">
                  <i className="fas fa-star"></i>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <span className="num animate-value" data-end="100">
                      0
                    </span>
                    <a style={{ fontSize: "50px" }}>+</a>
                  </div>
                  <span className="text">Pro Team Members</span>
                </div>
              </div>
              {/* <!-- Script --> */}
              {/* scritpt() */}
            </div>
          </div>
          <section className="about_section2">
            <div className="third-section__right2 animate">
              <div className="sideImg animate">
                <div className="light"></div>
                <div className="img_box">
                  <img src={ino} alt="T" className="icon animate" />
                </div>
              </div>
              <div className="content1">
                <h1 className="title">Innovation. Passion. Ignition</h1>

                <div className="para">
                  <img src={logoBh} alt="Qshikshak" className="icon_small" />
                  At Tekcog, we’ve revolutionised the recruitment process
                  through advanced technology and data-driven insights. Our
                  proprietary systems track, analyse, and synthesise candidate
                  data to deliver highly customised talent portfolios—perfectly
                  aligned with your business goals.
                  <br></br>
                  We’re selective by design. Only the most qualified candidates
                  make it through our rigorous screening process, ensuring you
                  get professionals who are not just skilled, but a seamless fit
                  for your organisation.
                  <br></br>
                  Because we believe the right hire is worth the wait—our focus
                  is always on precision over speed. <br></br>
                </div>
              </div>
            </div>
          </section>
          <div className="section_core">
            <div
              style={{
                display: "flex",
                flexDirection: isMobileScreen ? "column" : "row",
                justifyContent: "center",
                alignItems: "center",
                paddingInline: "30px",
              }}
            >
              <h1
                style={{
                  display: "flex",
                  width: "60%",
                  fontSize: "35px",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Core Values
              </h1>

              <p style={{ display: "flex", width: "100%" }}>
                Technology is the engine behind modern business—and we’re here
                to keep it running smoothly. At Tekcog, we understand how
                critical IT services are to operational success, even when their
                impact goes unnoticed. Our core values are rooted in expertise,
                reliability, and innovation. We streamline technology services
                while partnering closely with businesses to provide strategic
                guidance, technical support, and deep visibility into their
                enterprise ecosystem. With a commitment to delivering
                excellence, we empower organisations through skilled talent and
                forward-thinking tech solutions.
              </p>
            </div>
            <div className="core-box">
              <div className="core-boxin animate">
                <div className="core_icon ">
                  <div className="subhead animate">
                    <h1>Teamwork</h1>
                  </div>
                  <p>
                    Great achievements in business are not the doing of
                    individuals. They are results of collective efforts of
                    teams.
                  </p>
                </div>
                <div className="core_icon2 ">
                  {/* <img src={slaesforce} className='icon_in' /> */}
                  <GroupsOutlinedIcon className="icon_in"> </GroupsOutlinedIcon>
                </div>

                <div className="core_icon ">
                  <div className="subhead animate">
                    <h1>Commitment</h1>
                  </div>
                  <p>
                    Productivity is never an accident. It is always the result
                    of a commitment to excellence, intelligent planning, and
                    focused effort.
                  </p>
                </div>
                <div className="core_icon2 ">
                  {/* <img src={slaesforce} className='icon_in' /> */}
                  <HandshakeOutlinedIcon className="icon_in">
                    {" "}
                  </HandshakeOutlinedIcon>
                </div>
              </div>
              <img
                src={Tlogo}
                alt="tekcog"
                height={350}
                className="float_image"
              />
              <div className="core-boxin2 animate">
                <div className="core_icon ">
                  <div className="subhead animate">
                    <h1>Accountability</h1>
                  </div>
                  <p>
                    Leaders inspire accountability through their ability to
                    accept responsibility and being role models.
                  </p>
                </div>
                <div className="core_icon2 ">
                  {/* <img src={sslaesforce} className='icon_in' /> */}
                  <FingerprintOutlinedIcon className="icon_in">
                    {" "}
                  </FingerprintOutlinedIcon>
                </div>
                <div className="core_icon ">
                  <div className="subhead animate">
                    <h1>Innovation</h1>
                  </div>
                  <p>
                    A company that follows innovative ideas and theories can
                    develop customer trust and keep their employees interested
                    in working for them. .
                  </p>
                </div>
                <div className="core_icon2 ">
                  {/* <img src={slaesforce} className='icon_in' /> */}
                  <TipsAndUpdatesOutlinedIcon className="icon_in">
                    {" "}
                  </TipsAndUpdatesOutlinedIcon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
