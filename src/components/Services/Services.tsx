// import { motion } from "motion/react";
// import { motion, AnimatePresence } from "framer-motion";

import ai from "../../images/ai1.png";
import ai2 from "../../images/ai.png";
import cloud from "../../images/cloud.png";
import Tlogo from "../../images/Tlogobig.png";
import devops from "../../images/devops1.png";
import staff from "../../images/staffA.png";
import mobileDev from "../../images/mobileDev3.png";

import python from "../../images/python01.png";
import net from "../../images/net.png";
import devops01 from "../../images/devops.png";
import sql from "../../images/sql.png";

import aws from "../../images/aws.png";
import azure from "../../images/azure.png";
import java from "../../images/java01.png";
import slaesforce from "../../images/salesforce.png";

import SecurityIcon from "@mui/icons-material/Security";

import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import BatteryCharging90Icon from "@mui/icons-material/BatteryCharging90";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

import PsychologyIcon from "@mui/icons-material/Psychology";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

import "./Services.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Autoplay,
  EffectCreative,
  FreeMode,
  Navigation,
  Thumbs,
} from "swiper/modules";

import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css";
import "swiper/css/pagination";
import React, { useEffect, useState, useRef } from "react";

// import FileUploader from './FileUploader';

export const Services = () => {
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [searchParams] = useSearchParams();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const [width, setWidth] = useState(window.innerWidth);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef2 = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleOpen3 = () => setOpen3(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);

  const [showErrMsg, setShowErrMsg] = useState<string | null>(null);
  const [slideFirst, setSlideFirst] = useState<number>(0);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false);

  // Handle URL parameter for initial slide
  useEffect(() => {
    const slideParam = searchParams.get("slide");

    if (slideParam) {
      const slideIndex = parseInt(slideParam);
      console.log("slideIndex:", slideIndex);
      if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex <= 3) {
        console.log("Setting slideFirst to:", slideIndex);
        setSlideFirst(slideIndex);
      }
    }
  }, [searchParams]);

  // Debug useEffect to check if component is mounting properly
  useEffect(() => {
    console.log("Services component mounted, slideFirst:", slideFirst);
  }, []);
  const [form, setForm] = useState<{
    fullName: string;
    contactNo: string;
    emailId: string;
    about: string;
  }>({
    fullName: "",
    contactNo: "",
    emailId: "",
    about: "",
  });

  useEffect(() => {
    if (heroRef.current && backgroundRef.current) {
      heroRef.current.style.background = "none";
      // backgroundRef.current.style.backgroundImage = `url(${bgImage2})`;
    }
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
        backgroundRef2.current.style.fontSize = `${(scale1 - 1) * 100 + 40}px`;
        backgroundRef2.current.style.top = `${(scaleTop - 1) * 100}vh`;
      }
    };
    const handleScrollMobile = () => {
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
        // backgroundRef2.current.style.fontSize = `${(scale1 - 1) * 100 + 10}px`;
        backgroundRef2.current.style.fontSize = `${(scale1 - 1) * 100 + 10}px`;
        backgroundRef2.current.style.top = `${(scaleTop - 1) * 120}vh`;
      }
    };

    const updateScrollHandler = () => {
      const isMobile = window.innerWidth <= 900; // Adjust breakpoint as needed
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollMobile);

      if (isMobile) {
        window.addEventListener("scroll", handleScrollMobile);
      } else {
        window.addEventListener("scroll", handleScroll);
      }
    };

    // Set the initial scroll handler
    updateScrollHandler();
    // Update the scroll handler on resize
    window.addEventListener("resize", updateScrollHandler);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollMobile);
      window.removeEventListener("resize", updateScrollHandler);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="wrapper2">
      <div className="stars">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
      <section
        id="hero2"
        ref={heroRef}
        className="hero2"
        // style={{ backgroundImage: `url(${bgImage2})`, backgroundSize: 'auto', background: 'cover' }}
      >
        <div ref={backgroundRef2} className="background_text">
          Services
        </div>
        <div ref={backgroundRef} className="background">
          {/* Services */}
        </div>
        <div className="hero__flex">
          <div className="hero__left">
            <div>
              {/* <div className='rightbox_paragraph'>
            Services
            </div> */}
            </div>
          </div>

          <div className="hero__right">
            <div className="rightbox_paragraph">
              At Tekcog, we provide comprehensive technology and staffing
              solutions tailored for today’s digital-first businesses. Our team
              brings deep expertise in Generative AI, Full Stack Development,
              Mobile App Development, and Staff Augmentation. Whether you're
              building intelligent AI-driven products, scaling your development
              teams, or seeking top-tier technical talent, our services are
              designed to support your business at every stage. From hands-on
              project execution to strategic technology consulting, we empower
              organisations to innovate, grow, and stay competitive in a rapidly
              evolving digital landscape.{" "}
            </div>
          </div>
        </div>
      </section>
      <section className="sectionP5" id="section2">
        <Swiper
          // style={{
          //     '--swiper-navigation-color': '#fff',
          //   '--swiper-pagination-color': '#fff',
          // }}
          key={slideFirst} // Add key to force re-render when slideFirst changes
          initialSlide={slideFirst}
          loop={true}
          spaceBetween={0}
          allowTouchMove={false}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          // modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
          grabCursor={false}
          pagination={{
            clickable: true,
          }}
          speed={2000}
          modules={[Autoplay, EffectCreative, Navigation, Thumbs]}
          effect={"creative"}
          autoplay={{
            reverseDirection: false,
            delay: 30000,
          }}
          creativeEffect={{
            prev: {
              // shadow: false,
              translate: ["135%", 0, -100],
              rotate: [0, 0, 10],
            },
            next: {
              // shadow: true,

              translate: ["-125%", 20, -100],
              rotate: [90, 0, 40],
            },
          }}
        >
          <SwiperSlide>
            <div className="big_slide">
              <div className="big_slide_l">
                <div className="heading_1 animate">
                  <h1>Generative AI</h1>
                </div>

                <p>
                  Generative AI is transforming the way businesses create
                  content, interact with users, and build intelligent systems.
                  Hiring a Generative AI expert enables you to infuse your
                  applications with creativity, automation, and
                  personalization—unlocking new dimensions of value for your
                  customers.
                </p>
                <div
                  className="knowMore2"
                  onClick={() => {
                    navigate("/contact");
                    scrollToTop();
                  }}
                >
                  Know More
                </div>
              </div>
              <div className="big_slide_r">
                <div className="heading_2">
                  <h1>Generative AI</h1>
                </div>

                <ul>
                  <li>
                    <a>Technologies:</a> OpenAI GPT, LLaMA, Claude, Stable
                    Diffusion.
                  </li>
                  <li>
                    <a>Focus:</a> Custom-trained models for text, image, audio
                    or video generation.
                  </li>
                  <li>
                    <a>Tools:</a> LangChain, LlamaIndex, PromptLayer.
                  </li>
                  {/* <li>
              <a>Stack:</a> Node.js, Python, React, Next.js, Firebase.
              </li> */}
                  <li>
                    <a>Benefits:</a> Scalable, secure, production-ready
                    deployment of AI models.
                  </li>
                </ul>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="big_slide">
              <div className="big_slide_l">
                <div className="heading_1 animate">
                  <h1>Staff Augmentation</h1>
                </div>

                <p>
                  Staff Augmentation is a flexible, high-impact solution that
                  enables businesses to scale their teams with skilled
                  professionals—precisely when and where they’re needed. This
                  approach helps organizations bridge talent gaps, speed up
                  project delivery, and remain agile in an ever-evolving tech
                  landscape, all without the long-term overhead of full-time
                  hires.
                </p>
                <div
                  className="knowMore2"
                  onClick={() => {
                    navigate("/contact");
                    scrollToTop();
                  }}
                >
                  Know More
                </div>
              </div>
              <div className="big_slide_r">
                <div className="heading_2  ">
                  <h1>Staff Augmentation</h1>
                </div>
                <ul>
                  <li>
                    <a>Roles:</a> Developers, Designers, Product Managers, QA
                    Engineers.
                  </li>
                  <li>
                    <a>Benefit:</a> Access top-tier experts without the overhead
                    of full-time hires.
                  </li>
                  <li>
                    <a>Impact:</a> Quickly ramp up your team to meet tight
                    deadlines and ambitious goals
                  </li>
                  <li>
                    <a>Result:</a> Remote talent that blends into your existing
                    workflows and culture.
                  </li>
                </ul>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="big_slide">
              <div className="big_slide_l">
                <div className="heading_1 animate">
                  <h1>Full Stack Development</h1>
                </div>

                <p>
                  Hiring a Full Stack developer is one of the most effective
                  ways to build high-quality applications that run smoothly
                  across all devices. At Tekcog, our Full Stack developers are
                  experts in designing, developing, and maintaining complete
                  solutions—handling both front-end and back-end with ease. They
                  bring a strong sense of accountability and ownership, ensuring
                  seamless project delivery from start to finish.
                </p>
                <div
                  className="knowMore2"
                  onClick={() => {
                    navigate("/contact");
                    scrollToTop();
                  }}
                >
                  Know More
                </div>
              </div>
              <div className="big_slide_r">
                <div className="heading_2  ">
                  <h1>Full Stack Development</h1>
                </div>
                <ul>
                  <li>
                    <a>Front-end:</a> HTML, CSS, JavaScript, React, Vue.js,
                    Angular.
                  </li>
                  <li>
                    <a>Back-end:</a> Node.js, Python, Ruby, Java.
                  </li>
                  <li>
                    <a>Databases:</a> MySQL, MongoDB, PostgreSQL.
                  </li>
                  <li>
                    <a>DevOps:</a> DevOps: Git, Docker, Jenkins.
                  </li>
                  <li>Builds trust and accountability.</li>
                </ul>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="big_slide">
              <div className="big_slide_l">
                <div className="heading_1 animate">
                  <h1>Mobile App Development</h1>
                </div>

                <p>
                  In today’s digital-first landscape, a high-performing mobile
                  app is key to customer engagement, operational efficiency, and
                  business growth. At Tekcog, our skilled mobile app development
                  team turns your ideas into fast, secure, and intuitive
                  applications tailored to your goals. Whether you’re looking
                  for cross-platform convenience or native performance, we build
                  solutions that scale with your business.
                </p>
                <div
                  className="knowMore2"
                  onClick={() => {
                    navigate("/contact");
                    scrollToTop();
                  }}
                >
                  Know More
                </div>
              </div>
              <div className="big_slide_r">
                <div className="heading_2  ">
                  <h1>Mobile App Development</h1>
                </div>
                <ul>
                  <li>
                    <a>Technologies:</a> React Native, Flutter, Swift (iOS),
                    Kotlin (Android).
                  </li>
                  <li>
                    <a>Focus:</a> Build once, deploy everywhere or go fully
                    native for peak performance.
                  </li>
                  <li>
                    <a>UI/UX Design & Prototyping:</a> Figma, Adobe XD, Zeplin.
                  </li>
                  <li>
                    <a>Testing & Deployment:</a> Appium, Detox, TestFlight, Play
                    Store.
                  </li>
                </ul>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Navigation, Thumbs]}
          className="mySwiper animate"
        >
          <SwiperSlide className="animate">
            <div className="small_slide">
              <img src={ai} className="img2_in" />
              <h1>Generative AI</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide className="animate">
            <div className="small_slide ">
              <img src={staff} className="img2_in" />
              <h1>Staff Augmentation</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide className="animate">
            <div className="small_slide">
              <img src={devops} className="img2_in" />
              <h1>Full-Stack Development</h1>
            </div>
          </SwiperSlide>
          <SwiperSlide className="animate">
            <div className="small_slide">
              <img src={mobileDev} className="img2_in" />
              <h1>Mobile App Development</h1>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      <div className="section3">
        <div className="content3">
          <h1>Our Technology Expertise</h1>

          <p>
            Technology is the backbone of modern business operations—and we make
            sure it runs at peak performance. At Tekcog, We provide expert
            services on the latest cutting-edge technologies that streamline
            operations, enhance productivity, and support strategic growth. From
            consulting with leadership to optimizing enterprise systems, our
            team helps create a clear, connected view of your entire tech
            environment. We bring deep knowledge and hands-on experience across
            a wide range of technologies, ensuring your business has the tools
            and talent it needs to thrive in an ever-evolving digital world.
          </p>
        </div>
        <div className="tech-box ">
          <div className="tech-boxin animate">
            <div className="tech_icon ">
              <img src={slaesforce} className="icon_in" />
            </div>
            <div className="subhead animate">
              <h1>Salesforce</h1>
            </div>

            <div className="tech_icon">
              <img src={devops01} className="icon_in" />
            </div>
            <div className="subhead animate">
              <h1>DevOps</h1>
            </div>
            <div className="tech_icon">
              <img src={azure} className="icon_in" />
            </div>
            <div className="subhead animate">
              <h1>Azure</h1>
            </div>
            <div className="tech_icon">
              <img src={python} className="icon_in" />
            </div>
            <div className="subhead animate">
              <h1>Python</h1>
            </div>
            <div className="tech_icon">
              <img src={net} className="icon_in" />
            </div>
            <div className="subhead animate">
              <h1>.net</h1>
            </div>
          </div>
          <img className="centerImage" src={Tlogo} alt="tekcog" />
          <div className="tech-boxin2 animate">
            <div className="tech_icon">
              <img src={java} className="icon_in" />
            </div>
            <div className="subhead animate">
              <h1>Java</h1>
            </div>
            <div className="tech_icon">
              <img src={ai2} className="icon_in" />
            </div>
            <div className="subhead animate">
              <h1>Gen-AI</h1>
            </div>
            <div className="tech_icon">
              <img src={aws} className="icon_in" />
            </div>
            <div className="subhead animate">
              <h1>AWS</h1>
            </div>
            <div className="tech_icon">
              <img src={sql} className="icon_in" />
            </div>
            <div className="subhead animate">
              <h1>SQL</h1>
            </div>
            <div className="tech_icon">
              <img src={cloud} className="icon_in" />
            </div>
            <div className="subhead animate">
              <h1>Cloud</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="section4">
        <div className="content4">
          <h1>Our Industry Expertise</h1>

          <p style={{ display: "flex", width: "100%" }}>
            In today’s competitive landscape, building the right team is
            essential—but sourcing top talent has become more complex and
            time-consuming than ever. At Tekcog, Our Direct Hire Services
            address exactly this problem. With high-quality and thoroughly
            screened staff readily available, we are able to provide you with
            immense expertise and in-depth experience at a fast pace,
            recognizing and appreciating your needs. Backed by deep industry
            knowledge and years of experience, our team understands your unique
            needs and delivers highly qualified candidates who are the right
            fit—technically and culturally. We don’t just fill roles—we build
            teams that drive success.
          </p>
        </div>
        <div className="grid_I">
          <div className="grid_box">
            {/* <img
            src={dMedia}
            className='img_gird'
            
            /> */}
            <PsychologyIcon className="img_gird"></PsychologyIcon>
            <h1>AI & Machine Learning</h1>
          </div>
          <div className="grid_box">
            <SecurityIcon className="img_gird"></SecurityIcon>
            <h1>Cybersecurity</h1>
          </div>
          <div className="grid_box">
            <PublishedWithChangesIcon className="img_gird"></PublishedWithChangesIcon>
            <h1>Renewable Energy</h1>
          </div>
          <div className="grid_box">
            <BatteryCharging90Icon className="img_gird"></BatteryCharging90Icon>
            <h1>EV & Battery Tech</h1>
          </div>
          <div className="grid_box">
            <CloudUploadIcon className="img_gird"></CloudUploadIcon>
            <h1>Cloud Computing & Devops</h1>
          </div>
          <div className="grid_box">
            <CastForEducationIcon className="img_gird"></CastForEducationIcon>
            <h1>EdTech & Digital Learning</h1>
          </div>
          <div className="grid_box">
            <QueryStatsIcon className="img_gird"></QueryStatsIcon>
            <h1>Data Science & Big Data Analytics</h1>
          </div>

          <div className="grid_box">
            <CurrencyBitcoinIcon className="img_gird"></CurrencyBitcoinIcon>
            <h1>Blockchain & Web3 </h1>
          </div>
        </div>

        {/* <img
            src={Tlogo}
            className='imageSide'
            
            /> */}
      </div>
    </div>
  );
};
