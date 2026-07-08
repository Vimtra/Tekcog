import { useEffect, useState } from "react";
import {
  Button,
  Dimmer,
  Form,
  Loader,
  Message,
  TextArea,
} from "semantic-ui-react";
import "./Apply.css";
import EastIcon from "@mui/icons-material/East";
import FileUploader from "../Home/FileUploader";
// import WSP from '../../images/wSp.jpeg';
import WSP from "../../images/apply.jpeg";
import Tlogo from "../../images/Tlogobig.png";

import java from "../../images/java01.png";
import devops01 from "../../images/devops.png";
import python from "../../images/python01.png";
import bi from "../../images/bi.png";
import ai2 from "../../images/ai.png";
import cloud from "../../images/cloud.png";
import Modal from "@mui/material/Modal";
import close from "../../images/close.png";

import analyst from "../../images/analyst.png";
import api from "../../images/api.png";
import oracle from "../../images/oracle.png";
import bug from "../../images/bug.png";
import react from "../../images/react.png";
import Dialog from "@mui/material/Dialog";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js";

interface FormData {
  file: File | null;
}

interface Status {
  type: "success" | "error" | "";
  message: string;
}
export const Apply = () => {
  const [form, setForm] = useState({
    fullName: "",
    contactNo: "",
    emailId: "",
    role: "",
    about: "",
    resumeFile: null as File | null,
  });
  const [showErrMsg, setShowErrMsg] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false);
  const [showDes1, setShowDes1] = useState<boolean>(false);
  const [showDes2, setShowDes2] = useState<boolean>(false);
  const [showDes3, setShowDes3] = useState<boolean>(false);
  const [showDes4, setShowDes4] = useState<boolean>(false);
  const [showDes5, setShowDes5] = useState<boolean>(false);
  const [showDes6, setShowDes6] = useState<boolean>(false);
  const [showDes7, setShowDes7] = useState<boolean>(false);
  const [showDes8, setShowDes8] = useState<boolean>(false);
  const [showDes9, setShowDes9] = useState<boolean>(false);
  // const [showDes10, setShowDes10] = useState<boolean>(false);
  const [showDes11, setShowDes11] = useState<boolean>(false);
  // const [showDes12, setShowDes12] = useState<boolean>(false);
  // const [showDes13, setShowDes13] = useState<boolean>(false);
  // const [showDes14, setShowDes14] = useState<boolean>(false);
  // const [showDes15, setShowDes15] = useState<boolean>(false);

  const [applyed, setApplyed] = useState<string | null>(null);

  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const [pendingCloseModal, setPendingCloseModal] = useState<
    null | "dev" | "ai" | "sec"
  >(null);

  const [resumeFile, setResumeFile] = useState<any | null>(null);

  const [value, setValue] = useState<E164Number | undefined>(undefined);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const [formData, setFormData] = useState<FormData>({
    file: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>({ type: "", message: "" });
  const EMAIL_TO = "prudhvi.bangaru12@gmail.com";
  const EMAIL_SUBJECT = "New Application Submission";

  // Replace with your Apps Script Web App URL

  // --- START OF NEW/UPDATED CODE ---

  // 1. Add this handler to manage the file input and check for file size.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    { name, value }: any,
  ) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeRes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.size > 8 * 1024 * 1024) {
      setShowErrMsg("File size should be less than 8MB.");
      setForm((prev) => ({ ...prev, resumeFile: null }));
    } else {
      setShowErrMsg(null);
      setForm((prev) => ({ ...prev, resumeFile: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.emailId ||
      !form.about ||
      !form.contactNo ||
      !applyed
    ) {
      setShowErrMsg("* fields are required");
      return;
    }
    if (!form.resumeFile) {
      setShowErrMsg("Please upload a resume.");
      return;
    }

    setLoading(true);
    setShowErrMsg(null);
    setShowSuccessMsg(false);

    try {
      // Convert file to Base64
      const fileBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(form.resumeFile as Blob);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

      // Prepare all data in one JSON object
      const payload = {
        fullName: form.fullName,
        contactNo: form.contactNo,
        emailId: form.emailId,
        role: applyed || "",
        about: form.about,
        resumeFileName: form.resumeFile?.name || "resume.pdf",
        resumeFileData: fileBase64,
      };

      // Create FormData with JSON string
      const fd = new FormData();
      fd.append("data", JSON.stringify(payload));

      // Web App URL
      const scriptUrl =
        "https://script.google.com/macros/s/AKfycbyiAz1SZCp3zMkaqJRX331OTed05M9QBQEo-qNfPCqFxg5QT7gmHKvQLqqWNeHftTQ/exec";

      const response = await fetch(scriptUrl, {
        method: "POST",
        body: fd, // No headers → avoids preflight
      });

      const result = await response.json();

      if (result.status === "success") {
        setShowSuccessMsg(true);
        setForm({
          fullName: "",
          contactNo: "",
          emailId: "",
          role: "",
          about: "",
          resumeFile: null,
        });
        setApplyed(null);
        const fileInput = document.getElementById(
          "customFile",
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        setShowErrMsg(
          `Submission failed: ${result.message || "An unknown error occurred."}`,
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setShowErrMsg("An error occurred during submission. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleChangeRes = (e: React.ChangeEvent<HTMLInputElement>) => {

  // };

  ////////////

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
    // if (pendingCloseModal === 'ai') setOpen2(false);
    // if (pendingCloseModal === 'sec') setOpen3(false);
    setShowConfirmClose(false);
    setPendingCloseModal(null);
    setForm({
      fullName: "",
      contactNo: "",
      emailId: "",
      role: "",
      about: "",
      resumeFile: null,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  // const [form, setForm] = useState({
  //   fullName: "",
  //   contactNo: "",
  //   emailId: "",
  //   role: "",
  //   about: "",
  //   resumeFile: null as File | null, // This is the file object
  // });

  useEffect(() => {
    setForm((prev) => ({ ...prev, role: applyed || "" }));
  }, [applyed]);

  useEffect(() => {
    if (showSuccessMsg) {
      setTimeout(() => setShowSuccessMsg(false), 5000);
    }
  }, [showSuccessMsg]);

  const submitForm = async () => {};

  const validator = (name: string, value: string) => {
    switch (name) {
      case "fullName":
        return value.length >= 3;
      case "collegeName":
        return value.length >= 3;
      case "role":
        return value.trim().length > 0;
      case "contactNo":
        return /^\+[1-9]\d{1,14}$/.test(String(value || ""));
      case "emailId":
        return String(value)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          );
    }
  };

  // const handleSubmit = async () => {
  //   if (form.fullName && form.about && form.contactNo && form.emailId  && form.role  && applyed) {
  //     if (!validator("fullName", form.fullName)) {
  //       setShowErrMsg("Full Name should be atleast 3 characters");
  //       return;
  //     }

  //     if (!validator("contactNo", form.contactNo)) {
  //       setShowErrMsg("Invalid Contact No");
  //       return;
  //     }

  //     if (!validator("emailId", form.emailId)) {
  //       setShowErrMsg("Invalid Email Id");
  //       return;
  //     }
  //     if (!validator("role", form.role)) {
  //       setShowErrMsg("select one role");
  //       return;
  //     }
  //     if (!validator("collegeName", form.about)) {
  //       setShowErrMsg("About should be atleast 3 characters");
  //       return;
  //     }

  //     setShowErrMsg(null);
  //     await submitForm();
  //     // SubmitRes(resumeFile);

  //     setForm({
  //       fullName: "",
  //       contactNo: "",
  //       emailId: "",
  //       role: applyed || "",
  //       about: "",
  //       link: ""
  //     })
  //   } else {
  //     setShowErrMsg("* fields are required")
  //   }
  // }

  return (
    <>
      <div className="apply_page">
        <div className="stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
        <div className="job_containerP_test">
          <h1>Careers</h1>
          <p>Discover opportunities to build your future and make a meaningful impact with us.</p>
          <div className="job_card_test">
            <div className="job_card_inner">
              <div className="job_note">
                <strong>Note:</strong> Current Job Postings and Openings can be obtained by contacting HR directly.
              </div>
              <div className="last_updated">Last Updated: 24-03-2026</div>
            </div>
          </div>
        </div>
        <div className="job_containerP" style={{ display: "none" }}>
          <h1>Looking for new opportunities?</h1>
          <p>Browse our latest job openings</p>
          <div className="job_box" onClick={() => setShowDes1(!showDes1)}>
            <div className="job_boxUP">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={java} className="icon_Job" alt="Java job icon" />
                <div>
                  <h2>Software Developer</h2>
                  <p>40 hours per week</p>
                  <div className="job_typeBox">
                    <div className="job_type">Full Time</div>
                    {/* <div className='job_type' >AWS</div> */}
                    <div className="job_type">Java</div>
                  </div>
                </div>
              </div>
              <div className="job_end">
                <h2>$206,315/year </h2>
                <p>14-03-2025</p>
                {showDes1 ? (
                  <></>
                ) : (
                  <div className="job_details">View More</div>
                )}
              </div>
            </div>
            {showDes1 ? (
              <>
                <div className="job_boxDown">
                  <h2>Location</h2>
                  <p>Tekcog Inc 3300 Dallas Parkway, Plano, TX 75093, USA</p>
                  <h2>Job Description</h2>
                  <p>
                    Develop, Create, Analyze and Modify software applications
                    and assist in Software Development using the latest Cloud
                    based software development technologies. Design and develop
                    reusable software components and application libraries,
                    conduct code reviews, refactor non-performing assets, define
                    best practices for software applications development by
                    studying and incorporating latest cloud based technologies.
                    Utilize latest cloud based software development technologies
                    based on latest technologies such as Java, C#, AWS, Azure,
                    DevOps, AngularJS to develop various software. Work under
                    supervision. Travel And/or Relocation to Unanticipated
                    Client Sites throughout the USA is required.
                  </p>
                  <h2>Education Required</h2>
                  <p>
                    Master’s degree in Computer Science / IT/IS/Engineering
                    (Any) or closely related field.
                  </p>
                  <h2>Experience Required</h2>
                  <p>
                    Experience of Six (6) Months using Java, Spring and Oracle
                    Database Server is required. Travel and/or relocation is
                    required to unanticipated client sites within the USA. The
                    frequency of travel is currently not known as it depends on
                    the client and project requirement that cannot be currently
                    anticipated. Employer provides Information technology
                    services to various clients in the USA and hence
                    implementing projects will require such travel.
                    International travel to other countries is not required.
                  </p>
                  <div
                    className="job_Apply"
                    onClick={() => {
                      handleOpen();
                      setApplyed("Software  Developer");
                      scrollToTop();
                    }}
                  >
                    Apply Now
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {/* 
          
          <div className="job_box" onClick={() => setShowDes2(!showDes2)}>
            <div className="job_boxUP">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={bi} className="icon_Job" />
                <div>
                  <h2>Software Engineer (BI)</h2>
                  <p>40 hours per week</p>
                  <div className="job_typeBox">
                    <div className="job_type">Full Time</div>
                    <div className="job_type">BI</div>
                    <div className="job_type">SQL</div>
                  </div>
                </div>
              </div>
              <div className="job_end">
                <h2>$168,3970/year </h2>
                <p>14-03-2025</p>
                {showDes2 ? (
                  <></>
                ) : (
                  <div className="job_details">View More</div>
                )}
              </div>
            </div>
            {showDes2 ? (
              <>
                <div className="job_boxDown">
                  <h2>Location</h2>
                  <p>Tekcog Inc 3300 Dallas Parkway, Plano, TX 75093, USA</p>
                  <h2>Job Description</h2>
                  <p>
                    Analyze science, engineering, business, and other data
                    processing problems to implement and improve computer
                    systems using Business Intelligence (BI) tools and
                    technologies. Analyze user requirements, procedures, and
                    problems to automate or improve existing systems and review
                    computer system capabilities, workflow, and scheduling
                    limitations using Qlik based BI technologies and design
                    solutions using QlikView, QlikSense and SQL SSRS and SQL
                    SSIS. Work under supervision. Travel and/or Relocation to
                    Unanticipated Client Sites throughout the USA is required.
                  </p>
                  <h2>Education Required</h2>
                  <p>
                    Develop, Create, Analyze and Modify software applications
                    and assist in Software Development using the latest Cloud .
                  </p>
                  <h2>Experience Required</h2>
                  <p>
                    Experience of Six (6) Months with Software Quality Testing,
                    Selenium is required. Travel and/or relocation is required
                    to unanticipated client sites within the USA. The frequency
                    of travel is currently not known as it depends on the client
                    and project requirement that cannot be currently
                    anticipated. Employer provides Information technology
                    services to various clients in the USA and hence
                    implementing projects will require such travel.
                    International travel to other countries is not required.
                  </p>
                  <div
                    className="job_Apply"
                    onClick={() => {
                      handleOpen();
                      setApplyed("Software Engineer (BI)");
                      scrollToTop();
                    }}
                  >
                    Apply Now
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>          
          
          */}
          <div className="job_box" onClick={() => setShowDes3(!showDes3)}>
            <div className="job_boxUP">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={cloud} className="icon_Job" alt="Cloud job icon" />
                <div>
                  <h2>Application Security Engineer</h2>
                  <p>40 hours per week</p>
                  <div className="job_typeBox">
                    <div className="job_type">Full Time</div>
                    <div className="job_type">Cloud</div>
                    <div className="job_type">AWS</div>
                  </div>
                </div>
              </div>
              <div className="job_end">
                <h2>$184,579/year </h2>
                <p>14-03-2025</p>
                {showDes3 ? (
                  <></>
                ) : (
                  <div className="job_details">View More</div>
                )}
              </div>
            </div>
            {showDes3 ? (
              <>
                <div className="job_boxDown">
                  <h2>Location</h2>
                  <p>Tekcog Inc 3300 Dallas Parkway, Plano, TX 75093, USA</p>
                  <h2>Job Description</h2>
                  <p>
                    Plan, implement, upgrade, or monitor security measures for
                    the protection of computer networks and information. Ensure
                    appropriate security controls are in place that will
                    safeguard various cloud based (such as Azure, AWS or Google
                    Cloud) IT applications. Interact with developers on
                    providing solutions to flaws or vulnerabilities in
                    applications. Install maintain, or repair security systems
                    and continue to recommend improvements in security systems
                    or procedures, perform risk analyses so that appropriate
                    countermeasures can be developed. Keep updated with latest
                    security techniques and implement latest security techniques
                    to protect various Cloud based software applications. Work
                    under Supervision. Travel and/or Relocation to Unanticipated
                    Client Sites throughout the USA is required.
                  </p>
                  <h2>Education Required</h2>
                  <p>
                    Master’s degree in Computer Science, Computer Engineering,
                    Information Technology, Engineering(Any) or closely related
                    field with Six (6) months of experience in the job offered
                    or as an IT Consultant or Security Analyst or Engineer or
                    Programmer or Developer or very closely related area.
                    Employer also accepts Bachelor’s degree in Computer Science,
                    Computer Engineering, Information Technology,
                    Engineering(Any) or closely related field plus five years of
                    progressive work experience in related field.
                  </p>
                  <h2>Experience Required</h2>
                  <p>
                    Experience of Six (6) Months should include working with
                    Security Testing/Analysis of Cloud Based Networks
                    /Applications (Either Azure or AWS or Google Cloud) is
                    required. Travel and/or relocation is required to
                    unanticipated client sites with in the USA. The frequency of
                    travel is currently not known as it depends on the client
                    and project requirement that cannot be currently
                    anticipated. Employer provides Information technology
                    services to various clients in the USA and hence
                    implementing projects will require such travel.
                    International travel to other countries is not required.
                  </p>
                  <div
                    className="job_Apply"
                    onClick={() => {
                      handleOpen();
                      setApplyed("Application Security  Engineer");
                      scrollToTop();
                    }}
                  >
                    Apply Now
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="job_box" onClick={() => setShowDes4(!showDes4)}>
            <div className="job_boxUP">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={api} className="icon_Job" alt="API job icon" />
                <div>
                  <h2>System Analyst</h2>
                  <p>40 hours per week</p>
                  <div className="job_typeBox">
                    <div className="job_type">Full Time</div>
                    <div className="job_type">DataPower</div>
                    <div className="job_type">API</div>
                  </div>
                </div>
              </div>
              <div className="job_end">
                <h2>$168,397/year </h2>
                <p>14-03-2025</p>
                {showDes4 ? (
                  <></>
                ) : (
                  <div className="job_details">View More</div>
                )}
              </div>
            </div>
            {showDes4 ? (
              <>
                <div className="job_boxDown">
                  <h2>Location</h2>
                  <p>Tekcog Inc 3300 Dallas Parkway, Plano, TX 75093, USA</p>
                  <h2>Job Description</h2>
                  <p>
                    Analyze science, engineering, business and other data
                    processing problems to implement and improve computer
                    systems using DataPower, API Connect and related frameworks
                    using those programming languages. Utilize EDI, ESQL, Web
                    Services along with OAuth2.0, Security Policies. Analyze
                    user needs and implement integration solutions using IBM
                    DataPower and IBM API Connect. Support administration of API
                    Connect and DataPower appliances. Work under supervision.
                    Travel and/or Relocation to Unanticipated Client Sites
                    throughout the USA is required.
                  </p>
                  <h2>Education Required</h2>
                  <p>
                    Master’s degree in Computer Science, Computer Engineering,
                    Information Technology, Engineering(Any), Business or
                    closely related field with Six (6) months of experience in
                    the job offered or as an IT Consultant or Analyst or
                    Engineer or Programmer or Developer or very closely related
                    area. Employer also accepts Bachelor’s degree in Computer
                    Science, Computer Engineering, Information Technology,
                    Engineering(Any), Business or closely related field plus
                    five years of progressive work experience in related field.
                  </p>
                  <h2>Experience Required</h2>
                  <p>
                    Experience of Six months using DATAPOWER, API Connect is
                    required. Travel and/or Relocation to unanticipated client
                    sites throughout the USA is required.
                  </p>
                  <div
                    className="job_Apply"
                    onClick={() => {
                      handleOpen();
                      setApplyed("System Analyst");
                      scrollToTop();
                    }}
                  >
                    Apply Now
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="job_box" onClick={() => setShowDes5(!showDes5)}>
            <div className="job_boxUP">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img
                  src={analyst}
                  className="icon_Job"
                  alt="System analyst job icon"
                />
                <div>
                  <h2>System Analyst</h2>
                  <p>40 hours per week</p>
                  <div className="job_typeBox">
                    <div className="job_type">Full Time</div>
                    <div className="job_type">J2EEE</div>
                    <div className="job_type">Java</div>
                  </div>
                </div>
              </div>
              <div className="job_end">
                <h2>$168,397/year </h2>
                <p>01-01-2025</p>
                {showDes5 ? (
                  <></>
                ) : (
                  <div className="job_details">View More</div>
                )}
              </div>
            </div>
            {showDes5 ? (
              <>
                <div className="job_boxDown">
                  <h2>Location</h2>
                  <p>Tekcog Inc 3300 Dallas Parkway, Plano, TX 75093, USA</p>
                  <h2>Job Description</h2>
                  <p>
                    Analyze science, engineering, business, and other data
                    processing problems to implement and improve computer
                    systems using Java based technology. Analyze user
                    requirements, procedures, and problems to automate or
                    improve existing systems and review computer system
                    capabilities by using Java and Java based frameworks,
                    SPRING, J2EE, Java Script and Oracle server backend
                    databases. Work under Supervision. Travel and/or Relocation
                    to Unanticipated Client Sites throughout the USA is
                    required.
                  </p>
                  <h2>Education Required</h2>
                  <p>
                    Master’s degree in Computer Science/Computer Engineering/IT
                    /Engineering(Any)/Business or closely related field with Six
                    (6) months of experience in the job offered or as an IT
                    Consultant or Analyst or Programmer or Developer or very
                    closely related area. Employer also accepts Bachelor’s
                    degree in Computer Science/ Computer Engineering/IT
                    /Engineering(Any)/Business or closely related field plus
                    five years of progressive work experience in related field.
                  </p>
                  <h2>Experience Required</h2>
                  <p>
                    Experience of Six (6) Months Using Java, J2EE, Spring,
                    Hibernate and Oracle Database Server is required. Travel
                    and/or Relocation to unanticipated client sites throughout
                    the USA is required.
                  </p>
                  <div
                    className="job_Apply"
                    onClick={() => {
                      handleOpen();
                      setApplyed("System Analyst (Java)");
                      scrollToTop();
                    }}
                  >
                    Apply Now
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="job_box" onClick={() => setShowDes6(!showDes6)}>
            <div className="job_boxUP">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={oracle} className="icon_Job" alt="Oracle job icon" />
                <div>
                  <h2>System Analyst</h2>
                  <p>40 hours per week</p>
                  <div className="job_typeBox">
                    <div className="job_type">Full Time</div>
                    <div className="job_type">Oracle</div>
                    {/* <div className='job_type' >Java</div> */}
                  </div>
                </div>
              </div>
              <div className="job_end">
                <h2>$168,397/year </h2>
                <p>14-03-2025</p>
                {showDes6 ? (
                  <></>
                ) : (
                  <div className="job_details">View More</div>
                )}
              </div>
            </div>
            {showDes6 ? (
              <>
                <div className="job_boxDown">
                  <h2>Location</h2>
                  <p>Tekcog Inc 3300 Dallas Parkway, Plano, TX 75093, USA</p>
                  <h2>Job Description</h2>
                  <p>
                    Analyze science, engineering, business, and other data
                    processing problems to implement and improve computer
                    systems using Oracle Applications and various Oracle Apps
                    modules. Analyze user requirements, procedures, and problems
                    to automate or improve existing systems and review computer
                    system capabilities, with a goal to minimize risk of
                    defaulting of payments using Oracle OM and AR modules for
                    order management and accounts receivables modules to analyze
                    and minimize risk of business enterprises. Analyze and
                    recommend effective tools for Order Management, Cash
                    Processing, Customer data processing, customer risk analysis
                    using Oracle Applications. Work under supervision. Travel
                    and/or Relocation to Unanticipated Client Sites throughout
                    the USA is required.{" "}
                  </p>
                  <h2>Education Required</h2>
                  <p>
                    Master’s degree in Computer Science, Computer Engineering,
                    Information Technology, Engineering(Any), Management,
                    Business or closely related field with Six (6) months of
                    experience in the job offered or as an IT Consultant or
                    Analyst or Engineer or Programmer or Developer or very
                    closely related area. Employer also accepts Bachelor’s
                    degree in Computer Science, Computer Engineering,
                    Information Technology, Engineering(Any), Management,
                    Business or closely related field plus five years of
                    progressive work experience in related field.
                  </p>
                  <h2>Experience Required</h2>
                  <p>
                    Experience of Six (6) Months using Oracle Applications is
                    required. Travel and/or relocation is required to
                    unanticipated client sites with in the USA. The frequency of
                    travel is currently not known as it depends on the client
                    and project requirement that cannot be currently
                    anticipated. Employer provides Information technology
                    services to various clients in the USA and hence
                    implementing projects will require such travel.
                    International travel to other countries is not
                    required.{" "}
                  </p>
                  <div
                    className="job_Apply"
                    onClick={() => {
                      handleOpen();
                      setApplyed("System Analyst (Oracle)");
                      scrollToTop();
                    }}
                  >
                    Apply Now
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="job_box" onClick={() => setShowDes7(!showDes7)}>
            <div className="job_boxUP">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={java} className="icon_Job" alt="Java job icon" />
                <div>
                  <h2>Software Engineer</h2>
                  <p>40 hours per week</p>
                  <div className="job_typeBox">
                    <div className="job_type">Full Time</div>
                    <div className="job_type">Java</div>
                    <div className="job_type">Spring</div>
                  </div>
                </div>
              </div>
              <div className="job_end">
                <h2>$206,315/year </h2>
                <p>14-03-2025</p>
                {showDes7 ? (
                  <></>
                ) : (
                  <div className="job_details">View More</div>
                )}
              </div>
            </div>
            {showDes7 ? (
              <>
                <div className="job_boxDown">
                  <h2>Location</h2>
                  <p>Tekcog Inc 3300 Dallas Parkway, Plano, TX 75093, USA</p>
                  <h2>Job Description</h2>
                  <p>
                    Develop, create and modify general computer applications
                    software or specialized utility programs using Java, J2EE,
                    SPRING, HIBERNATE and related JAVA frameworks using those
                    programming languages. Utilize SQL server or Oracle server
                    database servers along with front-end programming languages.
                    Analyze user needs and develop software solutions. Design
                    software or customize software for client use with the aim
                    of optimizing operational efficiency. Work under
                    supervision. Travel and/or Relocation to Unanticipated
                    Client Sites throughout the USA is required.{" "}
                    <h2>Education Required</h2>
                  </p>
                  <p>
                    Master’s degree in Computer Science/Computer Engineering/IT
                    /Engineering(Any)/Business or closely related field with Six
                    (6) months of experience in the job offered or as an IT
                    Consultant or Analyst or Programmer or Developer or very
                    closely related area. Employer also accepts Bachelor’s
                    degree in Computer Science/ Computer Engineering/IT
                    /Engineering(Any)/Business or closely field plus five years
                    of progressive work experience in related field.
                  </p>
                  <h2>Experience Required</h2>
                  <p>
                    Experience of Six (6) Months using Java, Spring and Oracle
                    Database Server is required. Travel and/or Relocation to
                    unanticipated client sites throughout the USA is required.
                  </p>
                  <div
                    className="job_Apply"
                    onClick={() => {
                      handleOpen();
                      setApplyed("Software Engineer");
                      scrollToTop();
                    }}
                  >
                    Apply Now
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="job_box" onClick={() => setShowDes8(!showDes8)}>
            <div className="job_boxUP">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img
                  src={bug}
                  className="icon_Job"
                  alt="Bug testing job icon"
                />
                <div>
                  <h2>System Analyst</h2>
                  <p>40 hours per week</p>
                  <div className="job_typeBox">
                    <div className="job_type">Full Time</div>
                    <div className="job_type">Software Testing</div>
                    {/* <div className='job_type' >Spring</div> */}
                  </div>
                </div>
              </div>
              <div className="job_end">
                <h2>$168,397/year </h2>
                <p>14-03-2025</p>
                {showDes8 ? (
                  <></>
                ) : (
                  <div className="job_details">View More</div>
                )}
              </div>
            </div>
            {showDes8 ? (
              <>
                <div className="job_boxDown">
                  <h2>Location</h2>
                  <p>Tekcog Inc 3300 Dallas Parkway, Plano, TX 75093, USA</p>
                  <h2>Job Description</h2>
                  <p>
                    Analyze Science, Engineering, Business and other data
                    processing problems to implement and improve computer
                    systems by utilizing various software testing methodologies.
                    Work with Unit testing using Junit, utilize SQL skills to
                    analyze the computer systems, utilize quality assurance
                    methodologies and QA automation tools such as Selenium,
                    mobile testing tools, use SOAP UI to test web services,
                    perform middleware testing and create automation test
                    frameworks. Work under supervision. Travel and/or Relocation
                    to Unanticipated Client Sites throughout the USA is
                    required.{" "}
                  </p>
                  <p></p>
                  <h2>Education Required</h2>
                  <p>
                    Master’s degree in Computer Science/Computer Engineering/IT
                    /Engineering(Any)/Business or closely related field with Six
                    (6) months of experience in the job offered or as an IT
                    Consultant or Analyst or Programmer or Developer or very
                    closely related area. Employer also accepts Bachelor’s
                    degree in Computer Science/ Computer Engineering/IT
                    /Engineering(Any)/Business or closely related field plus
                    five years of progressive work experience in related field.
                  </p>
                  <h2>Experience Required</h2>
                  <p>
                    Experience of Six (6) Months with Software Quality Testing,
                    Selenium is required. Travel and/or relocation is required
                    to unanticipated client sites with in the USA. The frequency
                    of travel is currently not known as it depends on the client
                    and project requirement that cannot be currently
                    anticipated. Employer provides Information technology
                    services to various clients in the USA and hence
                    implementing projects will require such travel.International
                    travel to other countries is not required.
                  </p>
                  <div
                    className="job_Apply"
                    onClick={() => {
                      handleOpen();
                      setApplyed("Software Engineer (software testing)");
                      scrollToTop();
                    }}
                  >
                    Apply Now
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="job_box" onClick={() => setShowDes9(!showDes9)}>
            <div className="job_boxUP">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={react} className="icon_Job" alt="React job icon" />
                <div>
                  <h2>UI Developer</h2>
                  <p>40 hours per week</p>
                  <div className="job_typeBox">
                    <div className="job_type">Full Time</div>
                    <div className="job_type">ReactJs</div>
                    <div className="job_type">NodeJs</div>
                  </div>
                </div>
              </div>
              <div className="job_end">
                <h2>$155,605/year </h2>
                <p>14-03-2025</p>
                {showDes9 ? (
                  <></>
                ) : (
                  <div className="job_details">View More</div>
                )}
              </div>
            </div>
            {showDes9 ? (
              <>
                <div className="job_boxDown">
                  <h2>Location</h2>
                  <p>Tekcog Inc 3300 Dallas Parkway, Plano, TX 75093, USA</p>
                  <h2>Job Description</h2>
                  <p>
                    Developing web applications using various Front-End
                    technologies, AEM, restful, Jsp, ReactJs, TypeScript,
                    NodeJs. Perform application development of Client/server and
                    web applications using JAVA, J2EE and Web technologies for
                    enterprise applications. Install, Patch and maintain and
                    also monitor oracle Database. Adding Chrone Jobs using
                    Oracle DB. Implementation of the Object- Oriented
                    Programming, Multithreading, Error Handling in JS with ES6
                    standards. Developing Object- Oriented Web applications
                    using MVC architecture, Spring MVC. Work under supervision.
                    Travel and/or Relocation to Unanticipated Client Sites
                    throughout the USA is required.
                  </p>
                  <h2>Education Required</h2>
                  <p>
                    Bachelor’s degree in Computer Science / IT / Information
                    Systems/ Science or related with Twelve (12) months of
                    experience in the job offered or as an IT Consultant or
                    Analyst or Engineer or Programmer or Developer or very
                    closely related area. Employer also accepts A Bachelors
                    degree(or foreign Equivalent) in Computer Science / IT /
                    Information Systems/ Science or related field earned through
                    any suitable combination of education, training and/or
                    experience, as determined by a professional evaluation
                    service plus Twelve (12) months of progressive work
                    experience in related field.{" "}
                  </p>
                  <h2>Experience Required</h2>
                  <p>
                    Experience of Twelve (12) months working with HTML, CSS,
                    JavaScript is required.
                  </p>
                  <div
                    className="job_Apply"
                    onClick={() => {
                      handleOpen();
                      setApplyed("UI Developer");
                      scrollToTop();
                    }}
                  >
                    Apply Now
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="job_box" onClick={() => setShowDes11(!showDes11)}>
            <div className="job_boxUP">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={java} className="icon_Job" alt="Java job icon" />
                <div>
                  <h2>Java Developer with MongoDB</h2>
                  <p>40 hours per week</p>
                  <div className="job_typeBox">
                    <div className="job_type">Full Time</div>
                    <div className="job_type">Java</div>
                    <div className="job_type">MongoDB</div>
                  </div>
                </div>
              </div>
              <div className="job_end">
                {/* <h2>$155,605/year </h2> */}
                <p>19-03-2025</p>
                {showDes11 ? (
                  <></>
                ) : (
                  <div className="job_details">View More</div>
                )}
              </div>
            </div>
            {showDes11 ? (
              <>
                <div className="job_boxDown">
                  <h2>Location</h2>
                  <p> McLean, VA</p>
                  <h2>Job Description</h2>
                  <p>
                    We are looking for a highly skilled Java Developer with
                    strong expertise in MongoDB to join our client’s dynamic
                    team. This is a long-term onsite opportunity where you will
                    collaborate with cross functional teams to design, develop,
                    and implement scalable enterprise applications. The ideal
                    candidate will have a strong background in Java, MongoDB,
                    AngularJS, and AWS, with proven problem-solving skills and
                    the ability to thrive in a fast-paced environment.{" "}
                  </p>
                  <h2>Required Skills and Qualification</h2>
                  <p>
                    Java Development: Minimum 4+ years of hands-on experience.
                    MongoDB: 4+ years of experience in database design, queries,
                    and performance tuning. AngularJS: 4+ years of experience in
                    front-end development. AWS Cloud: At least 3+ years of
                    experience with cloud-native development and deployment.
                    Strong knowledge of OOP concepts, design patterns, and best
                    practices.
                  </p>
                  <h2>Responsibilities </h2>
                  <p>
                    Develop, enhance, and maintain enterprise applications using
                    Java and MongoDB. Build and optimize responsive front-end
                    applications using AngularJS. Design and deploy cloud-based
                    solutions leveraging AWS services. Participate in all phases
                    of the Software Development Life Cycle (SDLC) – including
                    analysis, design, coding, testing, and deployment.
                    Collaborate with business stakeholders and technical teams
                    to deliver high-quality solutions. Troubleshoot and resolve
                    application and database issues efficiently.
                  </p>
                  <div
                    className="job_Apply"
                    onClick={() => {
                      handleOpen();
                      setApplyed("Java Developer with MongoDB");
                      scrollToTop();
                    }}
                  >
                    Apply Now
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {/* 
          
          <div className="job_box" onClick={() => setShowDes12(!showDes12)}>
            <div className="job_boxUP">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={ai2} className="icon_Job" />
                <div>
                  <h2>AI-Cloud Integration Engineer</h2>
                  <p>40 hours per week</p>
                  <div className="job_typeBox">
                    <div className="job_type">Full Time</div>
                    <div className="job_type">AI/ML</div>
                    <div className="job_type">AWS</div>
                    <div className="job_type">GCP</div>
                    <div className="job_type">Azure</div>
                  </div>
                </div>
              </div>
              <div className="job_end">
                <h2>$156,998.00 /year </h2>
                <p>08-20-2025</p>
                {showDes12 ? (
                  <></>
                ) : (
                  <div className="job_details">View More</div>
                )}
              </div>
            </div>
            {showDes12 ? (
              <>
                <div className="job_boxDown">
                  <h2>Location</h2>
                  <p>Tekcog Inc 3300 Dallas Parkway, Plano, TX 75093, USA</p>
                  <h2>Job Description</h2>
                  <p>
                    Deploy and manage AI/ML models on cloud platforms (AWS, GCP,
                    Azure). Integrate AI services with cloud-native solutions
                    such as AWS SageMaker, GCP Vertex AI, and Azure ML. Optimize
                    model inference for performance and cost efficiency using
                    serverless, Kubernetes, or GPU-based deployments. Automate
                    AI/ML pipelines using Terraform, Kubernetes, and CI/CD
                    tools. Implement cloud-based feature stores and vector
                    databases for AI applications. Design and maintain
                    cloud-based data pipelines for real-time AI model serving.
                    Ensure AI deployments follow cloud security best practices,
                    IAM policies, and data encryption standards. Implement
                    governance policies for AI model access and auditing. Set up
                    monitoring for AI services using Prometheus, Grafana, or
                    cloud-native observability tools. Develop APIs and
                    microservices for AI model consumption. Collaborate with
                    DevOps and MLOps teams to enhance AI-driven workflows. Work
                    under supervision. Travel and/or Relocation to various
                    unanticipated client sites throughout USA is required.
                  </p>
                  <h2>Required Skills and Qualification</h2>
                  <p>
                    Master’s degree in Computer Science/Information Technology
                    /IS/Engineering (any) or closely related field with Six (6)
                    months of experience in the job offered or as an IT
                    Consultant or Analyst or Programmer or Developer or Engineer
                    or closely related field. Employer also accepts Bachelor’s
                    degree in Computer Science/ Information Technology
                    /IS/Engineering (any) or closely related field plus five
                    years of progressive work experience in related field.
                  </p>
                  <h2>Responsibilities </h2>
                  <p>
                    Experience of Six (6) months working with Vector databases
                    and LLMOps (LangChain, Weaviate, Pinecone) is required.
                    Travel and/or relocation is required to unanticipated client
                    sites within USA. International travel is not required. The
                    frequency of travel is currently not known exactly but it
                    could reach as high as 100% as it depends on the client and
                    project requirement that cannot be currently anticipated.
                    Employer provides Information technology services to various
                    clients in USA and hence implementing projects will require
                    such travel which could be as high as 100%.
                  </p>
                  <div
                    className="job_Apply"
                    onClick={() => {
                      handleOpen();
                      setApplyed("AI-Cloud Integration Engineer");
                      scrollToTop();
                    }}
                  >
                    Apply Now
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="job_box" onClick={() => setShowDes13(!showDes13)}>
            <div className="job_boxUP">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={ai2} className="icon_Job" alt="AI job icon" />
                <div>
                  <h2>AI/ML Operations Engineer (MLOps)</h2>
                  <p>40 hours per week</p>
                  <div className="job_typeBox">
                    <div className="job_type">Full Time</div>
                    <div className="job_type">CI/CD </div>
                    <div className="job_type">MLOps</div>
                    <div className="job_type">AI/ML </div>
                  </div>
                </div>
              </div>
              <div className="job_end">
                <h2>$156,998.00 /year </h2>
                <p>08-20-2025</p>
                {showDes13 ? (
                  <></>
                ) : (
                  <div className="job_details">View More</div>
                )}
              </div>
            </div>
            {showDes13 ? (
              <>
                <div className="job_boxDown">
                  <h2>Location</h2>
                  <p>Tekcog Inc 3300 Dallas Parkway, Plano, TX 75093, USA</p>
                  <h2>Job Description</h2>
                  <p>
                    Develop, automate, and manage CI/CD pipelines for ML model
                    deployment. Implement scalable model serving architectures
                    (e.g., REST APIs, gRPC, Kubernetes, Serverless). Track model
                    drift, accuracy, and performance in production. Implement
                    alerting systems for retraining and model degradation.
                    Optimize ML workloads for speed, cost, and efficiency.
                    Automate data preprocessing pipelines. Work with feature
                    stores and real-time data streaming frameworks. Deploy
                    models on AWS, GCP, or Azure using cloud-native services.
                    Leverage Kubernetes, Docker, and Terraform for
                    infrastructure automation. Ensure ML workflows adhere to
                    security best practices. Implement governance policies for
                    responsible AI. Work under supervision. Travel and/or
                    Relocation to various unanticipated client sites throughout
                    USA is required.
                  </p>
                  <h2>Required Skills and Qualification</h2>
                  <p>
                    Master’s degree in Computer Science/Information Technology
                    /IS/Engineering (any) or closely related field with Six (6)
                    months of experience in the job offered or as an IT
                    Consultant or Analyst or Programmer or Developer or Engineer
                    or closely related field. Employer also accepts Bachelor’s
                    degree in Computer Science/ Information Technology
                    /IS/Engineering (any) or closely related field plus five
                    years of progressive work experience in related field.
                  </p>
                  <h2>Responsibilities </h2>
                  <p>
                    Experience of Six (6) months working with Vector databases,
                    LLMOps (LangChain, Weaviate, Pinecone) and DevOps is
                    required. Travel and/or relocation is required to
                    unanticipated client sites within USA. International travel
                    is not required. The frequency of travel is currently not
                    known exactly but it could reach as high as 100% as it
                    depends on the client and project requirement that cannot be
                    currently anticipated. Employer provides Information
                    technology services to various clients in USA and hence
                    implementing projects will require such travel which could
                    be as high as 100%{" "}
                  </p>
                  <div
                    className="job_Apply"
                    onClick={() => {
                      handleOpen();
                      setApplyed("AI/ML Operations Engineer (MLOps)");
                      scrollToTop();
                    }}
                  >
                    Apply Now
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="job_box" onClick={() => setShowDes14(!showDes14)}>
            <div className="job_boxUP">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={cloud} className="icon_Job" alt="Cloud job icon" />
                <div>
                  <h2>Cloud Engineer</h2>
                  <p>40 hours per week</p>
                  <div className="job_typeBox">
                    <div className="job_type">Full Time</div>
                    <div className="job_type">AWS</div>
                    <div className="job_type">GCP</div>
                    <div className="job_type">Azure</div>
                  </div>
                </div>
              </div>
              <div className="job_end">
                <h2>$156,998.00 /year </h2>
                <p>08-20-2025</p>
                {showDes14 ? (
                  <></>
                ) : (
                  <div className="job_details">View More</div>
                )}
              </div>
            </div>
            {showDes14 ? (
              <>
                <div className="job_boxDown">
                  <h2>Location</h2>
                  <p>Tekcog Inc 3300 Dallas Parkway, Plano, TX 75093, USA</p>
                  <h2>Job Description</h2>
                  <p>
                    Design and implement cloud architectures using AWS, GCP, or
                    Azure. Deploy and manage compute, storage, networking, and
                    security resources. Optimize cloud workloads for
                    performance, cost, and scalability. Develop and maintain
                    Infrastructure as Code (IaC) using Terraform,
                    CloudFormation, or Bicep. Automate cloud provisioning,
                    scaling, and configuration management with Ansible, Puppet,
                    or Chef. Implement CI/CD pipelines for automated deployments
                    and updates. Ensure cloud security best practices, including
                    IAM policies, encryption, and network security. Implement
                    monitoring, logging, and incident response strategies.
                    Maintain compliance with industry standards (SOC 2, ISO
                    27001, HIPAA, etc.). Monitor cloud resources using
                    Prometheus, Grafana, CloudWatch, or Stackdriver. Optimize
                    application and infrastructure performance through
                    auto-scaling and load balancing. Troubleshoot cloudrelated
                    issues and improve system reliability. Work with DevOps,
                    software engineers, and security teams to ensure seamless
                    cloud integration. Support microservices and containerized
                    deployments using Docker and Kubernetes. Integrate cloud
                    solutions with CI/CD, logging, and observability tools. Work
                    under supervision. Travel and/or Relocation to various
                    unanticipated client sites throughout USA is required.
                  </p>
                  <h2>Required Skills and Qualification</h2>
                  <p>
                    Master’s degree in Computer Science/Information Technology/
                    IS/Engineering (any) or closely related field with Six (6)
                    months of experience in the job offered or as an IT
                    Consultant or Analyst or Programmer or Developer or Engineer
                    or closely related field. Employer also accepts Bachelor’s
                    degree in Computer Science/Information Technology
                    /IS/Engineering (any) or closely related field plus five
                    years of progressive work experience in related field.
                  </p>
                  <h2>Responsibilities </h2>
                  <p>
                    Experience of Six (6) months working with Docker or
                    Kubernetes or Helm is required. Travel and/or relocation is
                    required to unanticipated client sites within USA.
                    International travel is not required. The frequency of
                    travel is currently not known exactly but it could reach as
                    high as 100% as it depends on the client and project
                    requirement that cannot be currently anticipated. Employer
                    provides Information technology services to various clients
                    in USA and hence implementing projects will require such
                    travel which could be as high as 100%.
                  </p>
                  <div
                    className="job_Apply"
                    onClick={() => {
                      handleOpen();
                      setApplyed("Cloud Engineer");
                      scrollToTop();
                    }}
                  >
                    Apply Now
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="job_box" onClick={() => setShowDes15(!showDes15)}>
            <div className="job_boxUP">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={ai2} className="icon_Job" alt="AI job icon" />
                <div>
                  <h2>Data Scientist - AI/ML</h2>
                  <p>40 hours per week</p>
                  <div className="job_typeBox">
                    <div className="job_type">Full Time</div>
                    <div className="job_type">AI/ML</div>
                    <div className="job_type">NLP</div>
                    <div className="job_type">AWS</div>
                    <div className="job_type">Azure</div>
                  </div>
                </div>
              </div>
              <div className="job_end">
                <h2>$141,773.00 /year </h2>
                <p>08-20-2025</p>
                {showDes15 ? (
                  <></>
                ) : (
                  <div className="job_details">View More</div>
                )}
              </div>
            </div>
            {showDes15 ? (
              <>
                <div className="job_boxDown">
                  <h2>Location</h2>
                  <p>Tekcog Inc 3300 Dallas Parkway, Plano, TX 75093, USA</p>
                  <h2>Job Description</h2>
                  <p>
                    Design, develop, and optimize machine learning models for
                    classification, regression, clustering, and NLP tasks.
                    Experiment with deep learning architectures (CNNs, RNNs,
                    Transformers) for complex AI applications. Fine-tune large
                    language models (LLMs) and deploy AI-driven solutions.
                    Perform data cleaning, transformation, and feature
                    engineering to improve model accuracy. Work with structured
                    and unstructured data, including text, images, and
                    time-series data. Implement feature selection and
                    dimensionality reduction techniques. Deploy and maintain ML
                    models in production using cloud services (AWS, GCP, Azure).
                    Automate ML workflows with MLflow, Kubeflow, or Airflow.
                    Monitor model performance, detect drift, and ensure
                    continuous improvements. Conduct statistical analysis and
                    hypothesis testing to derive meaningful business insights.
                    Create visualizations and reports to communicate findings to
                    stakeholders. Work closely with data engineers, MLOps
                    engineers, and business teams to develop AI-driven
                    solutions. Translate business problems into machine learning
                    solutions. Work under supervision. Travel and/or Relocation
                    to various unanticipated client sites throughout USA is
                    required.
                  </p>
                  <h2>Required Skills and Qualification</h2>
                  <p>
                    Master’s degree in Computer Science/Information Technology/
                    IS/Engineering (any) or closely related field with Six (6)
                    months of experience in the job offered or as a Data
                    Scientist or IT Consultant or Analyst or Programmer or
                    Developer or Engineer or closely related field. Employer
                    also accepts Bachelor’s degree in Computer
                    Science/Information Technology /IS/Engineering (any) or
                    closely related field plus five years of progressive work
                    experience in related field.
                  </p>
                  <h2>Responsibilities </h2>
                  <p>
                    Experience of Six (6) months working with Vector databases,
                    LLMOps (LangChain, Weaviate, Pinecone) and MLOps (CI/CD for
                    ML pipelines) is required. Travel and/or relocation is
                    required to unanticipated client sites within USA.
                    International travel is not required. The frequency of
                    travel is currently not known exactly but it could reach as
                    high as 100% as it depends on the client and project
                    requirement that cannot be currently anticipated. Employer
                    provides Information technology services to various clients
                    in USA and hence implementing projects will require such
                    travel which could be as high as 100%.
                  </p>
                  <div
                    className="job_Apply"
                    onClick={() => {
                      handleOpen();
                      setApplyed("Data Scientist - AI/ML");
                      scrollToTop();
                    }}
                  >
                    Apply Now
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          */}
        </div>
        <Modal
          open={open}
          onClose={(event, reason) => {
            if (reason === "backdropClick" || reason === "escapeKeyDown") {
              requestCloseModal("dev");
            } else {
              setOpen(false);
            }
          }}
          // onClose={handleClose}
          className="modal_job"
        >
          <div className="apply2">
            <img
              src={Tlogo}
              alt="tekcog"
              height={400}
              className="float_image_contact"
            />

            <div className="apply__left1 animate">
              <div className="apply__right_A">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      color: "white",
                      fontSize: 30,
                      fontFamily: "mont",
                      paddingBottom: 20,
                    }}
                  >
                    Apply Here
                  </div>
                  <img
                    src={close}
                    className="close_image"
                    style={{ cursor: "pointer" }}
                    onClick={() => requestCloseModal("dev")}
                  />
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Input
                    fluid
                    className="input"
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
                    // onChange={(phone: any) => {setValue(phone);handleChange(phone, {value: phone, name: "contactNo"})}}
                    onChange={(value: E164Number | undefined) => {
                      setValue(value); // if you still need local state
                      setForm((prev) => ({
                        ...prev,
                        contactNo: value || "", // store as string in form
                      }));
                    }}
                  />
                  {/* <Form.Input
            fluid
            // label='Contact No*'
            placeholder='Contact No'
            name="contactNo"
            onChange={handleChange}
            value={form.contactNo}
          /> */}
                  <Form.Input
                    // fluid label='Email Id*'
                    placeholder="Email Id"
                    name="emailId"
                    onChange={handleChange}
                    value={form.emailId}
                  />

                  <Form.Input
                    // fluid label='Email Id*'
                    placeholder="Role"
                    name="role"
                    // value={form.role}
                    value={applyed || ""}
                    readOnly
                  />
                  {/* <Form.Select
            fluid
            // label='Role'
            options={options}
            placeholder='Role'
            name="role"
            onChange={handleChange}
            value={form.role}
      
          /> */}
                  <Form.Field
                    control={TextArea}
                    // label='About'
                    placeholder="..."
                    name="about"
                    onChange={handleChange}
                    value={form.about}
                  />
                  <div className="upload">
                    {/* <FileUploader /> */}
                    {loading && (
                      <Loader active inline="centered" content="Uploading..." />
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
                    <p className="upload_text">.pdf (max 8mb)</p>
                  </div>
                  {showErrMsg && (
                    <div style={{ color: "red" }}>{showErrMsg}</div>
                  )}
                  <Dimmer active={showLoader}>
                    <Loader />
                  </Dimmer>
                  <div className="apply__btn">
                    <Form.Field control={Button} className="button">
                      Submit
                      <EastIcon className="arrow"></EastIcon>
                    </Form.Field>
                  </div>
                </Form>
                {showSuccessMsg && (
                  <Message positive>
                    <Message.Header>
                      Application successfully submitted!!<br></br>
                      Thank you for applying to TekCog. We will get back to you
                      soon.
                    </Message.Header>
                  </Message>
                )}
              </div>
            </div>
          </div>
        </Modal>
        <Dialog
          className="dialog_modal"
          open={showConfirmClose}
          onClose={() => setShowConfirmClose(false)}
        >
          <div className="dialog">
            {/* <div className='dialog_title'>Are you sure to close modal?</div> */}

            <div className="dialog_content">
              Are you sure you want to close the Form? Any unsaved changes will
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
    </>
  );
};
