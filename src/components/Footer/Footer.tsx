import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import React from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItemProps } from "semantic-ui-react";
import Tlogo from "../../images/Tlogobig.png";
import LogoText from "../../images/Tlogo01.png";
import { TabNames } from "../Header/Header";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export const Footer = (props: {
  activeItem: TabNames;
  handleItemClick: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: MenuItemProps,
  ) => void;
}) => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const scrollToTopS = () => {
    window.scrollTo(0, 700);
  };
  const isMobileScreen = useMediaQuery({ query: "(max-width: 900px)" });
  function setSliderFirst(slideIndex: number) {
    // console.log('Navigating to services with slide:', slideIndex);
    navigate(`/services?slide=${slideIndex}`);
  }

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer_in">
          {/* <div className='cta'>
              <h1>Don't leave just yet,<br></br>
explore the Resources</h1>
            </div> */}
          <div className="content">
            <div className="footer__item">
              <div className="footer-menu-title">
                <h4>Quick Links</h4>
              </div>
              <Menu text vertical className="footer-menu">
                <Menu.Item
                  className="footer-menu-item"
                  name={TabNames.HOME}
                  active={props.activeItem === TabNames.HOME}
                  onClick={(
                    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
                    data: MenuItemProps,
                  ) => {
                    props.handleItemClick(event, data);
                    scrollToTop();
                  }}
                  as={Link}
                  to="/"
                />
                <Menu.Item
                  className="footer-menu-item"
                  name={TabNames.CONTACT}
                  active={props.activeItem === TabNames.CONTACT}
                  onClick={(
                    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
                    data: MenuItemProps,
                  ) => {
                    props.handleItemClick(event, data);
                    scrollToTop();
                  }}
                  as={Link}
                  to="/contact"
                />

                <Menu.Item
                  className="footer-menu-item"
                  name={TabNames.MOBILE}
                  active={props.activeItem === TabNames.MOBILE}
                  onClick={(
                    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
                    data: MenuItemProps,
                  ) => {
                    props.handleItemClick(event, data);
                    scrollToTop();
                  }}
                  as={Link}
                  to="/apply"
                />
                <Menu.Item
                  className="footer-menu-item"
                  name={TabNames.ABOUT_US}
                  active={props.activeItem === TabNames.ABOUT_US}
                  onClick={(
                    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
                    data: MenuItemProps,
                  ) => {
                    props.handleItemClick(event, data);
                    scrollToTop();
                  }}
                  as={Link}
                  to="/about-us"
                />
              </Menu>
            </div>
            <div className="footer__item">
              <div className="footer-menu-title">
                <h4>Services</h4>
              </div>
              <div className="footer-menu">
                <div
                  className="footer-menu-itemS"
                  onClick={() => {
                    setSliderFirst(0);
                    scrollToTopS();
                  }}
                >
                  Generative AI
                </div>
                <div
                  className="footer-menu-itemS"
                  onClick={() => {
                    setSliderFirst(1);
                    scrollToTopS();
                  }}
                >
                  Staffing
                </div>
                <div
                  className="footer-menu-itemS"
                  onClick={() => {
                    setSliderFirst(2);
                    scrollToTopS();
                  }}
                >
                  Full-Stack
                </div>
                <div
                  className="footer-menu-itemS"
                  onClick={() => {
                    setSliderFirst(3);
                    scrollToTopS();
                  }}
                >
                  Mobile Development
                </div>
              </div>
            </div>
            <div className="footer__item">
              <div className="footer-menu-title">
                <h4>Follow Us</h4>
              </div>
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
          <div className="footer__item">
            <div className="footer-menu-titleA">
              <h4>Address</h4>
            </div>
            <div className="address">
              <div>
                <a
                  href="https://maps.app.goo.gl/GPyk5kkfWH32ob798"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="address_head">Corporate HQ, USA</div>
                  <div>
                    3300 Dallas Parkway, Plano, TX 75093, USA
                    <br></br>
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
                  <div>
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
                  <div>
                    1981 J N Pease Place, Suite 104, Charlotte, NC 28262, USA
                    <br></br>
                    <div style={{ height: "8px" }}></div>
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
                  <div>
                    1st Floor, AV HUB, Vittal Rao Nagar, HITEC City, Hyderabad,
                    Telangana 500081, INDIA
                    <br></br>
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
                  <div>
                    Plot No.11 & 12, Indira Priyadarshini Nagar, Perumbakkam,
                    Chennai 600100, INDIA
                    <br></br>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__item1">
          <img src={Tlogo} alt="tekcog" className="tlogoF" loading="lazy" decoding="async" />
          <img
            src={LogoText}
            alt="tekcog"
            className="tlogoText"
            loading="lazy"
            decoding="async"
            height={70}
            style={{ marginTop: "-30px", marginBottom: "20px" }}
          />
          <div className="footer-flex2">
            <div
              className="footer-menu-item2"
              style={{ marginBottom: 10, paddingRight: 10, color: "#88F2FF" }}
            >
              <EmailOutlinedIcon className="icon1"></EmailOutlinedIcon>

              <div>
                <div>hr@tekcog.com </div>
              </div>
            </div>
            <div className="footer-menu-item2">
              <LocalPhoneOutlinedIcon className="icon1"></LocalPhoneOutlinedIcon>

              <div>
                <div>US: +1 510-462-1232, IN : +91 79755 90120 </div>
              </div>
            </div>
          </div>
          {/* <h1 className="feature__heading">SP TECHNO</h1>
      <div className="feature__heading2">SOLUTIONS INC.</div> */}
        </div>
      </div>
      <div className="line"></div>
      <div className="footer__item2">
        {/* <a href="https://www.quinterrasoft.com/" target="_blank">
                <div className='footer__pvt2'> All Rights Reserved. | Developed by Quinterra Software Solutions Pvt. Ltd.</div></a>
               */}
        <div
          className="footer-menu-item2"
          style={{ marginRight: 10, paddingRight: 10, color: "#88F2FF" }}
        >
          {/* <EmailOutlinedIcon className='icon1'></EmailOutlinedIcon> */}

          <div>
            <div>Copyright © 2025 Tekcog Pvt. Ltd. All Rights Reserved. </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
