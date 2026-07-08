import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItemProps } from "semantic-ui-react";
import logo from "../../images/Tlogobig.png";
import logo2 from "../../images/Tlogo01.png";
import "./Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "react-responsive";

export enum TabNames {
  HOME = "Home",
  SERVICES = "Services",
  MOBILE = "Careers",
  CONTACT = "Contact Us",
  DEMO = "Demo",
  ABOUT_US = "About Us",
}

export const Header = (props: {
  activeItem: TabNames;
  handleItemClick: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: MenuItemProps,
  ) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const [navBg, setNavBg] = useState(false);

  const isMobileScreen = useMediaQuery({ query: "(max-width: 900px)" });

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="top-bar">
      <a className="logo-link" href="/">
        <img src={logo} alt="Tekcog" className="logo" />
        {/* {!isMobileScreen ?  <></>: < img src={logo2} alt='Tekcog' className='logo_t' />} */}

        <img src={logo2} alt="Tekcog" className="logo_t" />
      </a>
      {/* <div className='mobile-bar' onClick={() => {
                setOpen(!open)
            }}>
                
                <MenuIcon  className='iconMenu'></MenuIcon> 
           
            </div> */}
      <div
        id="nav-icon1"
        className={`mobile-bar ${open ? "open" : ""}`} // Dynamically add 'open' class
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <Menu
        fixed="top"
        className={!navBg ? "header-layout" : "header-layout active"}
        stackable
      >
        <Menu.Menu
          position="right"
          className={open ? "nav-bar-open" : "nav-bar-hide"}
        >
          <Menu.Item
            name={TabNames.HOME}
            active={props.activeItem === TabNames.HOME}
            onClick={(
              event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
              data: MenuItemProps,
            ) => {
              props.handleItemClick(event, data);
              setOpen(false);
              scrollToTop();
            }}
            as={Link}
            to="/"
          />
          <Menu.Item
            name={TabNames.ABOUT_US}
            active={props.activeItem === TabNames.ABOUT_US}
            onClick={(
              event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
              data: MenuItemProps,
            ) => {
              props.handleItemClick(event, data);
              setOpen(false);
              scrollToTop();
            }}
            as={Link}
            to="/about-us"
          />

          <Menu.Item
            name={TabNames.SERVICES}
            active={props.activeItem === TabNames.SERVICES}
            onClick={(
              event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
              data: MenuItemProps,
            ) => {
              props.handleItemClick(event, data);
              setOpen(false);
              scrollToTop();
            }}
            as={Link}
            to="/services"
            // color='red'
          />
          <Menu.Item
            name={TabNames.MOBILE}
            active={props.activeItem === TabNames.MOBILE}
            onClick={(
              event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
              data: MenuItemProps,
            ) => {
              props.handleItemClick(event, data);
              setOpen(false);
              scrollToTop();
            }}
            as={Link}
            to="/apply"
            // color='red'
          />

          <Menu.Item
            name={TabNames.CONTACT}
            active={props.activeItem === TabNames.CONTACT}
            onClick={(
              event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
              data: MenuItemProps,
            ) => {
              props.handleItemClick(event, data);
              setOpen(false);
              scrollToTop();
            }}
            as={Link}
            to="/contact"
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
};
