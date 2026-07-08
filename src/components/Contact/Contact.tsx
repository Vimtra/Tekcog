import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useEffect, useState } from "react";
import {
  Button,
  Dimmer,
  Form,
  Header,
  Loader,
  Message,
  TextArea,
} from "semantic-ui-react";
import "./Contact.css";
import EastIcon from "@mui/icons-material/East";
import Tlogo from "../../images/Tlogobig.png";
import map from "../../images/map.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js";

export const Contact = () => {
  const [showErrMsg, setShowErrMsg] = useState<string | null>(null);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false);

  const [value, setValue] = useState<E164Number | undefined>(undefined);

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
    if (showSuccessMsg) {
      setTimeout(() => {
        setShowSuccessMsg(false);
      }, 2000);
    }
  }, [showSuccessMsg]);
  const handleChange = (e: any, { value, name }: any) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const submitForm = async () => {
    setShowLoader(true);

    try {
      // Replace with your Google Apps Script Web App URL after deployment
      const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbzIGMgjqkN8gPZmOCLPm0vbzPJ1QYZYyegm3_MLJHV3pOYLJOe0LKkcN0swntsBNZa1IA/exec";

      // Create a URLSearchParams object from your form state
      const formData = new URLSearchParams();
      formData.append("fullName", form.fullName);
      formData.append("contactNo", form.contactNo);
      formData.append("emailId", form.emailId);
      formData.append("about", form.about);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        // Omit the 'Content-Type' header here. The browser will set it correctly.
        body: formData,
      });

      // Since the script now returns text, we'll read the response as text
      const result = await response.text();

      // Check for the success message from the script's text output
      if (result === "Success") {
        setShowSuccessMsg(true);
        // Reset form
        setForm({
          fullName: "",
          contactNo: "",
          emailId: "",
          about: "",
        });
        setValue(undefined);
      } else {
        setShowErrMsg("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setShowErrMsg("Failed to submit form. Please try again.");
    } finally {
      setShowLoader(false);
    }
  };

  const validator = (name: string, value: string) => {
    switch (name) {
      case "fullName":
        return value.length >= 3;
      case "collegeName":
        return value.length >= 3;
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

  const handleSubmit = async () => {
    if (form.fullName && form.about && form.contactNo && form.emailId) {
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
      if (!validator("collegeName", form.about)) {
        setShowErrMsg("About should be atleast 3 characters");
        return;
      }

      setShowErrMsg(null);
      await submitForm();
    } else {
      setShowErrMsg("* fields are required");
    }
  };

  return (
    <div className="contact">
      <div className="apply">
        <div className="stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
        <img
          src={Tlogo}
          alt="tekcog"
          height={400}
          className="float_image_contact"
        />
        <div className="apply__left12">
          <div className="apply__left2">
            <h1>Get in Touch with Us</h1>
            <p>Gain enough knowledge to help scale through the industry</p>
            <div className="apply-flex">
              <div className="apply-menu-item2">
                <LocalPhoneOutlinedIcon className="icon"></LocalPhoneOutlinedIcon>
                <div>
                  {/* <div style={{fontSize:'12px',color:'rgba(255, 255, 255, 0.8)'}} >Tel</div> */}
                  <h2>US: +1 510-462-1232</h2>
                  <h2>IN : +91 79755 90120</h2>
                </div>
              </div>
              <div className="apply-menu-item2">
                <EmailOutlinedIcon className="icon"></EmailOutlinedIcon>

                <div>
                  <h2>hr@tekcog.com</h2>
                </div>
              </div>
              <div className="footer__itemC">
                <h2>Social Media</h2>
                <div
                  style={{ flexDirection: "row", display: "flex", gap: "20px" }}
                >
                  <div
                    className="footer-menu-item3"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <a
                      href="https://www.facebook.com/Tekcog"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FacebookIcon className="icon"></FacebookIcon>
                    </a>
                  </div>
                  <div
                    className="footer-menu-item3"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <a
                      href="https://www.linkedin.com/company/85660572/admin/dashboard/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedInIcon className="icon"></LinkedInIcon>
                    </a>
                  </div>
                  <div
                    className="footer-menu-item3"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <a
                      href="https://www.instagram.com/tek_cog/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <InstagramIcon className="icon"></InstagramIcon>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="apply__right">
            <div
              style={{
                color: "white",
                fontSize: 30,
                fontFamily: "mont",
                paddingBottom: 20,
                lineHeight: 1.5,
              }}
            >
              Have us Get in Touch with You
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
                // Add this import

                onChange={(value: E164Number | undefined) => {
                  setValue(value); // if you still need local state
                  setForm((prev) => ({
                    ...prev,
                    contactNo: value || "", // store as string in form
                  }));
                }}
                // onChange={(phone: any) => {setValue(phone);handleChange(phone, {value: phone, name: "contactNo"}); console.log("Phone number changed:", phone);}}
                // onChange={(phone:any) => {
                //   // phone will be in full international format, e.g. "+15551234567"
                //   setValue(phone);
                //   handleChange("contactNo", phone);
                //   console.log("Phone number changed:", phone);
                // }}
              />
              <Form.Input
                // fluid label='Email Id*'
                placeholder="Email Id"
                name="emailId"
                onChange={handleChange}
                value={form.emailId}
              />

              <Form.Field
                control={TextArea}
                // label='About'
                placeholder="about"
                name="about"
                onChange={handleChange}
                value={form.about}
              />
              {showErrMsg && <div style={{ color: "red" }}>{showErrMsg}</div>}
              <Dimmer active={showLoader}>
                <Loader />
              </Dimmer>
              <div className="apply__btn2">
                <Form.Field control={Button} className="button">
                  Submit
                  <EastIcon className="arrow"></EastIcon>
                </Form.Field>
              </div>
            </Form>
            {showSuccessMsg && (
              <Message positive>
                <Message.Header>
                  Thank you for your interest in TekCog. We sill contact you
                  shortly.
                </Message.Header>
              </Message>
            )}
          </div>
        </div>
      </div>
      <div className="sectionM">
        <div className="map_box">
          <img src={map} className="map" alt="Tekcog location map" />
        </div>
        <div className="address_contact">
          <h1>Tekcog Locations</h1>
          <div>
            <a
              href="https://maps.app.goo.gl/GPyk5kkfWH32ob798"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="address_head">Corporate HQ, USA</div>
              <div className="address_text">
                3300 Dallas Parkway, Plano, TX 75093, USA
              </div>
            </a>
          </div>
          <div>
            <a
              href="https://maps.app.goo.gl/m8KvUmsT2ELTfcFP8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="address_head">USA, California</div>
              <div className="address_text">
                39355 California Street, #303, Fremont CA 94538, USA
                <br></br>
              </div>
            </a>
          </div>
          <div>
            <a
              href="https://maps.app.goo.gl/739Crdm3UmZopgxS9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="address_head">USA, Noth Carolina</div>
              <div className="address_text">
                1981 J N Pease Place, Suite 104, Charlotte, NC 28262, USA
                <br></br>
                1909 J N Pease Place, Suite 103, Charlotte, NC 28262, USA
              </div>
            </a>
          </div>
          <div>
            <a
              href="https://maps.app.goo.gl/uXF2PzdstrEDyGKMA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="address_head">IND, Hyderabad</div>
              <div className="address_text">
                1st Floor , AV HUB, Vittal Rao Nagar, HITEC City, Hyderabad,
                Telangana 500081, INDIA
              </div>
            </a>
          </div>
          <div>
            <a
              href="https://maps.app.goo.gl/fmKU7pDj2Z1pADKP7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="address_head">IND, Chennai</div>
              <div className="address_text">
                Plot No.11 & 12, Indira Priyadarshini Nagar, Perumbakkam,
                Chennai-600100, INDIA
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
