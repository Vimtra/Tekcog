import {
  Button,
  Dimmer,
  Form,
  Header,
  Loader,
  Message,
  TextArea,
} from "semantic-ui-react";
// import { motion } from "motion/react";
// import { motion, AnimatePresence } from "framer-motion";
import genai from "../../images/genai.png";
import ai from "../../images/ai1.png";
import devJob from "../../images/devJob.png";
import aiJob from "../../images/aijob.png";
import staffA from "../../images/staffA.jpg";
import devImg from "../../images/devImg.jpg";
import mobiledev from "../../images/mobileDev.jpg";

import ring from "../../images/heroring.png";
import close from "../../images/close.png";
import Tlogo from "../../images/Tlogobig.png";
import users from "../../images/users4.png";
import devops from "../../images/devops1.png";
import staff from "../../images/staffA.png";
import stars from "../../images/stars.png";
import citibank from "../../images/clients/citibank01.png";
import verizon from "../../images/clients/verizon.png";
import cbre from "../../images/clients/cbre.png";
import cvs from "../../images/clients/cvs.png";
import att from "../../images/clients/att.png";
import pngegg from "../../images/clients/jpmorgan.png";
import freddie from "../../images/clients/freddie.png";
import fuj from "../../images/clients/fuj.png";
import delta from "../../images/clients/delta.png";
import chevron from "../../images/clients/chevron.png";
import mobileDev from "../../images/mobileDev3.png";

import mindtree from "../../images/clients/mindtree.png";
import lt from "../../images/clients/l&t.png";
import blue from "../../images/clients/blue.png";
import walmart from "../../images/clients/walmart.png";
import first from "../../images/clients/frb1.png";

import java from "../../images/java.png";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import { E164Number } from "libphonenumber-js";

// import Button from '@mui/material/Button';

import bgImage1 from "../../images/image01.jpg";
import bgImage2 from "../../images/heroBg02.png";
import "./Home.css";
import EastIcon from "@mui/icons-material/East";
import secu from "../../images/secur.png";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import { useMediaQuery } from "react-responsive";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Autoplay,
  EffectCards,
  EffectCreative,
  EffectFlip,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import { FileUpload } from "@mui/icons-material";
import FileUploader from "./FileUploader";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export const Home = () => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const [link, setLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
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
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false);
  const isMobileScreen = useMediaQuery({ query: "(max-width: 900px)" });

  const [applyed, setApplyed] = useState<string | null>(null);

  const [value, setValue] = useState<E164Number | undefined>(undefined);
  const [form, setForm] = useState<{
    fullName: string;
    contactNo: string;
    emailId: string;
    role: string;
    about: string;
    link?: string;
  }>({
    fullName: "",
    contactNo: "",
    emailId: "",
    role: "",
    about: "",
    link: "",
  });

  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const [pendingCloseModal, setPendingCloseModal] = useState<
    null | "dev" | "ai" | "sec"
  >(null);

  useEffect(() => {
    if (heroRef.current && backgroundRef.current) {
      heroRef.current.style.background = "none";
      backgroundRef.current.style.backgroundImage = `url(${bgImage2})`;
    }
    const handleScroll = () => {
      if (backgroundRef.current) {
        const maxScroll = 720;
        const maxScaleTransform = 1.8;
        const maxScaleTop = 2;
        let scale = window.scrollY / 900 + 1;
        let scaleTop = window.scrollY / 700 + 1;
        console.log(scaleTop);

        if (window.scrollY > maxScroll) {
          scale = maxScaleTransform;
          scaleTop = maxScaleTop;
          // backgroundRef.current.style.top = `${(scaleTop + 1) * 100}vh`;
        }

        backgroundRef.current.style.transform = `scale(${scale}, ${scale})`;
        backgroundRef.current.style.transformOrigin = "bottom right";
        backgroundRef.current.style.top = `${(scaleTop - 1) * 100}vh`;
      }
    };

    handleScroll(); // Call handleScroll initially

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [bgImage2, heroRef, backgroundRef]);
  useEffect(() => {
    if (showSuccessMsg) {
      setTimeout(() => {
        setShowSuccessMsg(false);
      }, 5000);
    }
  }, [showSuccessMsg]);
  const handleChange = (e: any, { value, name }: any) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  useEffect(() => {
    setForm((prev) => ({ ...prev, role: applyed || "" }));
  }, [applyed]);

  const submitForm = async () => {};
  const validator = (name: string, value: string) => {
    switch (name) {
      case "fullName":
        return value.length >= 3;
      case "collegeName":
        return value.length >= 3;

      case "contactNo":
        return String(value)
          .toLowerCase()
          .match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
      case "emailId":
        return String(value)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          );
    }
  };

  const handleSubmit = async () => {
    if (form.fullName && form.contactNo && form.emailId && applyed) {
      if (!validator("fullName", form.fullName)) {
        setShowErrMsg("Full Name should be atleast 3 characters");
        return;
      }

      if (!validator("contactNo", form.contactNo)) {
        setShowErrMsg("Invalid Contact No");
        return;
      }

      if (!validator("emailId", form.emailId)) {
        setShowErrMsg("Invalid Email Id");
        return;
      }

      setShowErrMsg(null);
      await submitForm();
      // SubmitRes(resumeFile);

      setForm({
        fullName: "",
        contactNo: "",
        emailId: "",
        role: applyed || "",
        about: "",
        link: "",
      });
    } else {
      setShowErrMsg("* fields are required");
    }
  };

  const handleChangeRes = (e: React.ChangeEvent<HTMLInputElement>) => {};
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper to open confirm dialog for a modal
  const requestCloseModal = (modal: "dev" | "ai" | "sec") => {
    setShowConfirmClose(true);
    setPendingCloseModal(modal);
  };

  // Helper to actually close the modal after confirmation
  const confirmCloseModal = () => {
    if (pendingCloseModal === "dev") setOpen(false);
    if (pendingCloseModal === "ai") setOpen2(false);
    if (pendingCloseModal === "sec") setOpen3(false);
    setShowConfirmClose(false);
    setPendingCloseModal(null);
    setForm({
      fullName: "",
      contactNo: "",
      emailId: "",
      role: "",
      about: "",
      link: "",
    });
  };
  return (
    <div id="wrapper">
      <div className="stars">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
      <section
        id="hero"
        ref={heroRef}
        className="hero"
        // style={{ backgroundImage: `url(${bgImage2})`, backgroundSize: 'auto', background: 'cover' }}
      >
        <div ref={backgroundRef} className="background"></div>
        <div className="hero__flex">
          <div className="hero__left">
            <div>
              <div className="rightbox_paragraph">
                Powering Innovation with Top AI Talent.
              </div>
              <div className="button_container">
                <div
                  className="button"
                  onClick={() => {
                    navigate("/contact");
                    scrollToTop();
                  }}
                >
                  {" "}
                  <h4></h4>
                  Hire Now
                </div>
                <div
                  className="button"
                  onClick={() => {
                    navigate("/apply");
                    scrollToTop();
                  }}
                >
                  Get Hired?
                </div>
              </div>
            </div>
            <div className="job_container">
              <img
                src={ring}
                // alt="Class"
                className="ring_image"
              />
              <div className="content1 animate">
                <div>
                  <h2>Apply Now</h2>
                  <a>Top Openings</a>
                </div>
                <div
                  className="job_button animate"
                  onClick={() => {
                    if (!isMobileScreen) {
                      handleOpen();
                      setApplyed("Software Developer");
                      console.log(applyed, "applyedeeeeeee");
                    } else {
                      navigate("/apply");
                    }
                    scrollToTop();
                  }}
                >
                  <div className="job_button_in">
                    <img src={java} className="job_button_img" />
                    <div className="job_button_content">
                      <h4>Software Developer</h4>
                      <a>Fresher - 3 years</a>
                    </div>
                  </div>

                  <ArrowRightIcon className="arrow"></ArrowRightIcon>
                </div>

                <Modal
                  open={open}
                  onClose={(event, reason) => {
                    if (
                      reason === "backdropClick" ||
                      reason === "escapeKeyDown"
                    ) {
                      requestCloseModal("dev");
                    } else {
                      setOpen(false);
                    }
                  }}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  className="modal"
                >
                  <div
                    className="modal_in"
                    //  onClick={handleOpen}
                  >
                    <div className="modal_left">
                      <div className="modal_content">
                        <h2>Role: Software Developer</h2>
                        <a>Fresher - 3 years</a>
                        <h4>Job Description</h4>
                        <p>
                          We are looking for a Full Stack Developer to produce
                          scalable software solutions. You’ll be part of a
                          cross-functional team that’s responsible for the full
                          software development life cycle, from conception to
                          deployment. As a Full Stack Developer, you should be
                          comfortable with both front-end and back-end coding
                          languages, development frameworks and third-party
                          libraries. You should also be a team player with a
                          knack for visual design and utility. If you’re also
                          familiar with Agile methodologies, we’d like to meet
                          you.
                        </p>
                        <h4>Job Requirements</h4>
                        <p>
                          Work with development teams and product managers to
                          ideate software solutions design client-side and
                          server-side architecture Build the front-end of
                          applications through appealing visual design.
                        </p>
                      </div>
                      <Form
                        variant="standard"
                        onSubmit={handleSubmit}
                        className="cjobForm"
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <Form.Input
                            variant="standard"
                            // className='input'
                            // label='Full Name*'
                            placeholder="Full Name"
                            name="fullName"
                            onChange={handleChange}
                            value={form.fullName}
                          />

                          {/* <Form.Input
             variant="standard"
            // label='Contact No*'
            placeholder='Contact No'
            name="contactNo"
            onChange={handleChange}
            value={form.contactNo}
          /> */}
                          <PhoneInput
                            defaultCountry="US"
                            placeholder={"Enter phone number"}
                            value={form.contactNo}
                            name="contactNo"
                            onChange={(value: E164Number | undefined) => {
                              setValue(value); // if you still need local state
                              setForm((prev) => ({
                                ...prev,
                                contactNo: value || "", // store as string in form
                              }));
                            }}
                          />
                        </div>
                        <Form.Input
                          // fluid label='Email Id*'
                          placeholder="Email Id"
                          name="emailId"
                          onChange={handleChange}
                          value={form.emailId}
                        />

                        {/* <Form.Field
            control={TextArea}
            label='About'
            placeholder='...'
            name="about"
            onChange={handleChange}
            value={form.about}
          /> */}

                        <div className="upload">
                          {loading && (
                            <Loader
                              active
                              inline="centered"
                              content="Uploading..."
                            />
                          )}
                          <Form.Input
                            type="file"
                            id="customFile"
                            // onChange={(e) => handleFileChange22(e)}
                            // onChange={(e) =>  SubmitRes(e)}
                            onChange={(e) => handleChangeRes(e)}
                            accept="application/pdf"
                            required
                          />
                          {/* <EastIcon className='arrow' ></EastIcon> */}
                          <p className="upload_text">.pdf,(max 8mb)</p>
                        </div>

                        {showErrMsg && (
                          <div style={{ color: "red" }}>{showErrMsg}</div>
                        )}
                        <Dimmer active={showLoader}>
                          <Loader />
                        </Dimmer>
                        <div className="apply__btn2">
                          <Form.Field control={Button} className="applyButton">
                            Apply
                            {/* <EastIcon className='arrow' ></EastIcon> */}
                          </Form.Field>
                        </div>
                      </Form>
                      {showSuccessMsg && (
                        <Message positive>
                          <Message.Header>
                            Application successfully submitted!!<br></br>
                            Thank you for applying to TekCog. We will get back
                            to you soon.
                          </Message.Header>
                        </Message>
                      )}
                    </div>
                    <div className="modal_right">
                      <img
                        src={close}
                        className="close_image"
                        style={{ cursor: "pointer" }}
                        onClick={() => requestCloseModal("dev")}
                      />

                      <img src={Tlogo} className="imageBig" />
                    </div>
                  </div>
                </Modal>
                <div
                  className="job_button animate"
                  onClick={() => {
                    if (!isMobileScreen) {
                      handleOpen2();
                      setApplyed("AI Engineer");
                      console.log(applyed, "applyedeeeeeee");
                    } else {
                      navigate("/apply");
                    }
                    scrollToTop();
                  }}
                >
                  <div className="job_button_in">
                    <img src={aiJob} className="job_button_img" />
                    <div className="job_button_content">
                      <h4>AI Engineer</h4>
                      <a>Fresher - 4 years</a>
                    </div>
                  </div>

                  <ArrowRightIcon className="arrow"></ArrowRightIcon>
                </div>
                <Modal
                  open={open2}
                  onClose={(event, reason) => {
                    if (
                      reason === "backdropClick" ||
                      reason === "escapeKeyDown"
                    ) {
                      requestCloseModal("ai");
                    } else {
                      setOpen2(false);
                    }
                  }}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  className="modal"
                >
                  <div
                    className="modal_in"
                    //  onClick={handleOpen}
                  >
                    <div className="modal_left">
                      <div className="modal_content">
                        <h2>Role: AI Engineer</h2>
                        <a>Fresher - 4 years</a>
                        <h4>Job Description</h4>
                        <p>
                          We’re looking for an experienced artificial
                          intelligence engineer to join the revolution, using
                          deep learning, neuro-linguistic programming (NLP),
                          computer vision, chatbots and robotics to help us
                          improve various business outcomes and drive
                          innovation. This engineer will join a
                          multidisciplinary team, helping to shape our AI
                          strategy and showcasing the potential for AI through
                          early-stage solutions. This is an excellent
                          opportunity to take advantage of emerging trends and
                          technologies and make a real-world difference.
                        </p>
                        <h4>Job Requirements</h4>
                        <p>
                          Manage and direct processes and R&D (research and
                          development) to meet the needs of our AI Strategy,
                          understand company and client challenges and how
                          integrating AI capabilities can help lead to
                          solutions.
                        </p>
                      </div>
                      <Form
                        variant="standard"
                        onSubmit={handleSubmit}
                        className="cjobForm"
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <Form.Input
                            variant="standard"
                            // className='input'
                            // label='Full Name*'
                            placeholder="Full Name"
                            name="fullName"
                            onChange={handleChange}
                            value={form.fullName}
                          />

                          <PhoneInput
                            defaultCountry="US"
                            placeholder={"Enter phone number"}
                            value={form.contactNo}
                            name="contactNo"
                            onChange={(value: E164Number | undefined) => {
                              setValue(value); // if you still need local state
                              setForm((prev) => ({
                                ...prev,
                                contactNo: value || "", // store as string in form
                              }));
                            }}
                          />
                        </div>
                        <Form.Input
                          // fluid label='Email Id*'
                          placeholder="Email Id"
                          name="emailId"
                          onChange={handleChange}
                          value={form.emailId}
                        />

                        <div className="upload">
                          {loading && (
                            <Loader
                              active
                              inline="centered"
                              content="Uploading..."
                            />
                          )}
                          <Form.Input
                            type="file"
                            id="customFile"
                            // onChange={(e) => handleFileChange22(e)}
                            // onChange={(e) =>  SubmitRes(e)}
                            onChange={(e) => handleChangeRes(e)}
                            accept="application/pdf"
                            required
                          />
                          {/* <EastIcon className='arrow' ></EastIcon> */}
                          <p className="upload_text">.pdf,(max 8mb)</p>
                        </div>

                        {showErrMsg && (
                          <div style={{ color: "red" }}>{showErrMsg}</div>
                        )}
                        <Dimmer active={showLoader}>
                          <Loader />
                        </Dimmer>
                        <div className="apply__btn2">
                          <Form.Field control={Button} className="applyButton">
                            Apply
                            {/* <EastIcon className='arrow' ></EastIcon> */}
                          </Form.Field>
                        </div>
                      </Form>
                      {showSuccessMsg && (
                        <Message positive>
                          <Message.Header>
                            Application successfully submitted!!<br></br>
                            Thank you for applying to TekCog. We will get back
                            to you soon.
                          </Message.Header>
                        </Message>
                      )}
                    </div>
                    <div className="modal_right">
                      <img
                        src={close}
                        className="close_image"
                        style={{ cursor: "pointer" }}
                        onClick={() => requestCloseModal("ai")}
                      />

                      <img src={Tlogo} className="imageBig" />
                    </div>
                  </div>
                </Modal>

                <div
                  className="job_button animate"
                  onClick={() => {
                    if (!isMobileScreen) {
                      handleOpen3();
                      setApplyed("Security  Engineer");
                      console.log(applyed, "applyedeeeeeee");
                    } else {
                      navigate("/apply");
                    }
                    scrollToTop();
                  }}
                >
                  <div className="job_button_in">
                    <img src={secu} className="job_button_img" />
                    <div className="job_button_content">
                      <h4>Security Engineer</h4>
                      <a>Fresher - 3 years</a>
                    </div>
                  </div>

                  <ArrowRightIcon className="arrow"></ArrowRightIcon>
                </div>
                <Modal
                  open={open3}
                  onClose={(event, reason) => {
                    if (
                      reason === "backdropClick" ||
                      reason === "escapeKeyDown"
                    ) {
                      requestCloseModal("sec");
                    } else {
                      setOpen3(false);
                    }
                  }}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  className="modal"
                >
                  <div
                    className="modal_in"
                    //  onClick={handleOpen}
                  >
                    <div className="modal_left">
                      <div className="modal_content">
                        <h2>Role: Security Engineer</h2>
                        <a>Fresher - 3 years</a>
                        <h4>Job Description</h4>
                        <p>
                          {" "}
                          Plan, implement, upgrade, or monitor security measures
                          for the protection of computer networks and
                          information. Ensure appropriate security controls are
                          in place that will safeguard various cloud based (such
                          as Azure, AWS or Google Cloud) IT applications.
                          Interact with developers on providing solutions to
                          flaws or vulnerabilities in applications. Install
                          maintain, or repair security systems and continue to
                          recommend improvements in security systems or
                          procedures, perform risk analyses so that appropriate
                          countermeasures can be developed. Keep updated with
                          latest security techniques and implement latest
                          security techniques to protect various Cloud based
                          software applications. Work under Supervision. Travel
                          And/or Relocation to Unanticipated Client Sites
                          throughout USA is required.
                        </p>
                        <h4>Job Requirements</h4>
                        <p>
                          {" "}
                          Master’s degree in Computer Science, Computer
                          Engineering, Information Technology, Engineering(Any)
                          or closely related field with Six (6) months of
                          experience in the job offered or as an IT Consultant
                          or Security Analyst or Engineer or Programmer or
                          Developer or very closely related area. Employer also
                          accepts Bachelor’s degree in Computer Science,
                          Computer Engineering, Information Technology,
                          Engineering(Any) or closely related field plus five
                          years of progressive work experience in related field.
                        </p>
                      </div>
                      <Form
                        variant="standard"
                        onSubmit={handleSubmit}
                        className="cjobForm"
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <Form.Input
                            variant="standard"
                            // className='input'
                            // label='Full Name*'
                            placeholder="Full Name"
                            name="fullName"
                            onChange={handleChange}
                            value={form.fullName}
                          />
                          <PhoneInput
                            defaultCountry="US"
                            placeholder={"Enter phone number"}
                            value={form.contactNo}
                            name="contactNo"
                            onChange={(value: E164Number | undefined) => {
                              setValue(value); // if you still need local state
                              setForm((prev) => ({
                                ...prev,
                                contactNo: value || "", // store as string in form
                              }));
                            }}
                          />
                        </div>
                        <Form.Input
                          // fluid label='Email Id*'
                          placeholder="Email Id"
                          name="emailId"
                          onChange={handleChange}
                          value={form.emailId}
                        />

                        <div className="upload">
                          {loading && (
                            <Loader
                              active
                              inline="centered"
                              content="Uploading..."
                            />
                          )}
                          <Form.Input
                            type="file"
                            id="customFile"
                            // onChange={(e) => handleFileChange22(e)}
                            // onChange={(e) =>  SubmitRes(e)}
                            onChange={(e) => handleChangeRes(e)}
                            accept="application/pdf"
                            required
                          />
                          {/* <EastIcon className='arrow' ></EastIcon> */}
                          <p className="upload_text">.pdf,(max 8mb)</p>
                        </div>

                        {showErrMsg && (
                          <div style={{ color: "red" }}>{showErrMsg}</div>
                        )}
                        <Dimmer active={showLoader}>
                          <Loader />
                        </Dimmer>
                        <div className="apply__btn2">
                          <Form.Field control={Button} className="applyButton">
                            Apply
                            {/* <EastIcon className='arrow' ></EastIcon> */}
                          </Form.Field>
                        </div>
                      </Form>
                      {showSuccessMsg && (
                        <Message positive>
                          <Message.Header>
                            Application successfully submitted!!<br></br>
                            Thank you for applying to TekCog. We will get back
                            to you soon.
                          </Message.Header>
                        </Message>
                      )}
                    </div>
                    <div className="modal_right">
                      <img
                        src={close}
                        className="close_image"
                        style={{ cursor: "pointer" }}
                        onClick={() => requestCloseModal("sec")}
                      />

                      <img src={Tlogo} className="imageBig" />
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="section2">
        <figure className="animate">
          <div className="get_box">
            <div className="get_box_in">
              <a>GET TO KNOW US</a>
              <h1>Empowering Companies with Top-Tier Talent</h1>
              <p>
                At Tekcog, we specialize in delivering highly skilled,
                deployment-ready IT professionals who are equipped to make an
                immediate impact. Our process goes beyond basic sourcing—we
                rigorously vet and prepare each candidate to ensure not only
                technical excellence but also adaptability within dynamic
                workplace environments. Through structured internal training and
                in-depth evaluations, we ensure every consultant we recommend is
                aligned with your business goals and technical requirements.
                Each profile we share is backed by verified expertise, so you
                can trust you’re hiring dependable, high-performing talent.
                Whether you're scaling your team or filling a critical role, we
                provide staffing solutions that are precise, agile, and built
                for success.
              </p>
              <a>
                Discover top global opportunities and accelerate your career
                with us.
              </a>
            </div>
            <div className="count">
              <img src={users} className="iconImg" />
              <h1>
                200+
                <br></br>
                Clients
              </h1>
            </div>
          </div>
        </figure>
        <img src={Tlogo} className="imageBig2" />
      </div>
      <div className="section3">
        <a>WHAT WE DO</a>
        <h1>Our Services</h1>
        <div className="sevices_in ">
          <div className="sevices_box animate">
            <div className="img_box">
              <img src={ai} className="animeImg" />
              <img src={genai} className="animeImg_hover" />
            </div>
            <div className="text_box">
              <a>Generative AI</a>

              <p>
                Generative AI refers to AI systems that can create new content,
                such as text, images & videos, based on patterns learned from
                existing data.
              </p>
            </div>
          </div>
          <div className="sevices_box animate">
            <div className="img_box">
              <img src={staff} className="animeImg" />
              <img src={staffA} className="animeImg_hover" />
            </div>

            <div className="text_box">
              <a>Staff Augmentation</a>

              <p>
                We make it easy to find the best talent in the industry, across
                a wide range of fields.We help you hire freelancers.
              </p>
            </div>
          </div>
          <div className="sevices_box animate">
            <div className="img_box">
              <img src={devops} className="animeImg" />
              <img src={devImg} className="animeImg_hover" />
            </div>
            <div className="text_box">
              <a>DevOps & Automation</a>

              <p>
                We’ll help you hone your vision with new technology, measure how
                well it’s working and then make improvements where needed.
              </p>
            </div>
          </div>
          <div className="sevices_box animate">
            <div className="img_box">
              <img src={mobileDev} className="animeImg" />
              <img src={mobiledev} className="animeImg_hover" />
            </div>
            <div className="text_box">
              <a>Mobile App Development</a>

              <p>
                We provide highly qualified and skilled mobile app developers
                who can develop any kind of mobile app on any platform you
                require.{" "}
              </p>
            </div>
          </div>
          {/* <img
            src={Tlogo}
            className='imageSide'
            
            /> */}
        </div>
      </div>
      <div className="section4_C">
        <h1>Our Clients</h1>
        <div className="client_grid">
          <div className="client_box">
            <img src={mindtree} className="client_img" />
          </div>
          <div className="client_box">
            <img src={lt} className="client_img" />
          </div>
          <div className="client_box">
            <img src={blue} className="client_img" />
          </div>
          <div className="client_box">
            <img src={verizon} className="client_img" />
          </div>
          <div className="client_box">
            <img src={cbre} className="client_img" />
          </div>
          <div className="client_box">
            <img src={cvs} className="client_img" />
          </div>
          <div className="client_box">
            <img src={att} className="client_img" />
          </div>
          <div className="client_box">
            <img src={pngegg} className="client_img" />
          </div>
          <div className="client_box">
            <img src={walmart} className="client_img" />
          </div>
          <div className="client_box">
            <img src={freddie} className="client_img" />
          </div>
          <div className="client_box">
            <img src={first} className="client_img" />
          </div>
          <div className="client_box">
            <img src={fuj} className="client_img" />
          </div>
          <div className="client_box">
            <img src={delta} className="client_img" />
          </div>
          <div className="client_box">
            <img src={chevron} className="client_img" />
          </div>
          <div className="client_box">
            <img src={citibank} className="client_img" />
          </div>
        </div>

        {/* <img
   src={Tlogo}
   className='imageSide'
   
   /> */}
      </div>
      <div className="section5">
        {/* <div > */}
        <Swiper
          className="swiper"
          slidesPerView={1}
          //  spaceBetween={20}
          loop={true}
          centeredSlides={true}
          //  spaceBetween={0}

          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          speed={2000}
          modules={[Autoplay, EffectCreative]}
          effect={"creative"}
          autoplay={{
            reverseDirection: true,
            delay: 5000,
          }}
          creativeEffect={{
            prev: {
              // shadow: false,
              translate: ["-125%", 20, -100],
              rotate: [90, 0, 40],
            },
            next: {
              // shadow: true,
              translate: ["135%", 0, -100],
              rotate: [0, 0, 10],
            },
          }}
        >
          <SwiperSlide className="slider">
            <div className="colab_box2">
              <div className="review_box">
                <img src={stars} className="starsImg" />
                <FormatQuoteRoundedIcon className="iconQouts"></FormatQuoteRoundedIcon>
              </div>
              <h1>
                Tekcog has a team with cooperative management and a healthy
                environment. Their work structure is something which I should
                appreciate. They have an open door policy. There is no such
                thing as partially here, every employee is treatedwell and
                equal. The incentive patterns they have here is just
                unbelievable. OverallI love working here, blessed to work with
                such a great team.
              </h1>

              <h2>-Prem</h2>
              <div className="pic_box">
                <div className="pic_box_in"></div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="slider">
            <div className="colab_box2">
              <div className="review_box">
                <img src={stars} className="starsImg" />
                <FormatQuoteRoundedIcon className="iconQouts"></FormatQuoteRoundedIcon>
              </div>
              <h1>
                I enjoy working here. I made a few friends who are very
                supportive and hardworking. This was a great opportunity for me,
                I have learned many things here. One thing I can say for sure
                is, there is a lot of scope for an employee for their personal
                and professional growth
              </h1>

              <h2>-Navya</h2>
              <div className="pic_box">
                <div className="pic_box_in"></div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="slider">
            <div className="colab_box2">
              <div className="review_box">
                <img src={stars} className="starsImg" />
                <FormatQuoteRoundedIcon className="iconQouts"></FormatQuoteRoundedIcon>
              </div>
              <h1>
                Working in Tekcog shaped my career. Excellent work culture. The
                management here really cares alot about the employees. We enjoy
                a lot here, there is no work pressure. Along with the work,
                every Friday we have fun activities which create a positive
                environment between the employees. Very very happy to be a part
                of this organization.
              </h1>

              <h2>-Sashi</h2>
              <div className="pic_box">
                <div className="pic_box_in"></div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="slider">
            <div className="colab_box2">
              <div className="review_box">
                <img src={stars} className="starsImg" />
                <FormatQuoteRoundedIcon className="iconQouts"></FormatQuoteRoundedIcon>
              </div>
              <h1>
                I love working here. Tekcog has a very supportive and positive
                environment. Even though I am a fresher I didn't face any
                trouble. The team here helped me alot. Thanks to the management.
              </h1>

              <h2>-Akshaya</h2>
              <div className="pic_box">
                <div className="pic_box_in"></div>
              </div>
            </div>
          </SwiperSlide>
          {/* <SwiperSlide>Slide 4</SwiperSlide> */}
        </Swiper>
      </div>
      {/* Confirmation Dialog for closing modal */},
      <Dialog
        className="dialog_modal"
        open={showConfirmClose}
        onClose={() => setShowConfirmClose(false)}
      >
        <div className="dialog">
          {/* <div className='dialog_title'>Are you sure to close modal?</div> */}

          <div className="dialog_content">
            Are you sure you want to close the modal? Any unsaved changes will
            be lost.
          </div>

          <div className="dialog_button_container">
            <div onClick={confirmCloseModal} className="dialog_button">
              Yes
            </div>
            <div
              onClick={() => setShowConfirmClose(false)}
              className="dialog_button"
            >
              No
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

// export const Home = () => {
//   return (
//     <>
//       <MottoSection />
//       {/* <FeaturesSection />
//       <DescriptionSection2 />
//       <DescriptionSection3 />
//       <DescriptionSection />
//       <DescriptionSection4 /> */}

//     </>
//   )
// }
