import React, { useEffect, useContext, useState, useRef } from "react";

import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../../images/sensiple-logo.svg";
import miniLogo from "../../images/sensiple-icon.png";
import userProfile from "../../images/user/avatar-1.jpg";
import { FiMenu } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdAccountCircle, MdLockOutline, MdWest } from "react-icons/md";
import Swal from "sweetalert2";
import Dropdown from "react-bootstrap/Dropdown";
import { UserContext } from "../../userContext";
import authService from '../../api/auth.service';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";


const Header = () => {
  const { instance } = useMsal();
  let activeAccount;
  const authUser = authService.getAuthUser();
  const [isActive, setActive] = useState("true");
  const [adminName, setadminName] = useState('');
  const [isPopupOpen, setPopupOpen] = useState(false);
  // const [isText, setIsText] = useState(false)
  const [isText, setIsText] = useState('');
  const [feedbackText, setFeedbackText] = useState('');

  const handleTextareaChange = (event) => {
    setFeedbackText(event.target.value);
  };
  
  const handleSubmit = () => {
  };

  const handleFeedback = (feedbackType) => {
    setIsText(feedbackType);
  };

  const backToFeedback = () => {
    setIsText('');
  };
  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  let user_name;
  if (instance) {
    activeAccount = instance.getActiveAccount();
    if (activeAccount) {
      user_name = activeAccount?.name;
      console.log("activeAccount LoginJS:", activeAccount?.name);
    }

  }


  const navigate = useNavigate();




  // const logoutRequest = {
  //   account: instance.getAccountByHomeId(homeAccountId),
  //   postLogoutRedirectUri: "your_app_logout_redirect_uri",
  // };
  useEffect(() => {
    authService.profile()
      .then((res) => {
        //console.log('user info data',res.data);        
        const result = res.data.data;
        setadminName(result.name);

      })
      .catch((error) => {
        console.error("Error fetching userName:", error);
      });
  }, []);



  const dropdownRef = useRef(null);
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActive(true);
    }
  };

  const toggleFullScreen = () => {

    if (document.fullscreenEnabled) {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    };
  }



  //   adminProfile();



  useEffect(() => {


    if (authUser != null) {
      document.body.classList.add('sense-app')
    }
    return () => {
      document.body.classList.remove('sense-app')

    }
  }, [])



  //   if(authUser == null){
  //     return false;
  // }



  const showUserProfile = () => {
    console.log('isActive' + isActive)
    setActive(!isActive);
  };



  const logOut = () => {

    Swal.fire({
      title: "Are you sure to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('authUser');
        document.body.classList.remove('sense-login');
        navigate("/login");
        instance.logoutRedirect().catch((error) => console.log(error));

        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: "danger",
          title: "You’ve have been successfully logged out",
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: "success",
          title: "Thankyou for Staying!",
        });
      }
    });
  };

  const InProgress = () => {

    alert('We are working, coming soon!');
  };
  return (
    <header className="navbar pcoded-header navbar-expand-lg navbar-light">
      <div className="m-header">
        <a className="mobile-menu" id="mobile-collapse1" href="javascript:"><span></span></a>
        <a href="index.html" className="b-brand">
          <div className="b-bg">
            {/* <i className="feather icon-trending-up"></i> */}
            <img src={miniLogo} className="logo-mini" alt="app logo" />
          </div>
          <span className="b-title">TimeSense</span>
        </a>
      </div>
      <a className="mobile-menu" id="mobile-header" href="javascript:">
        <i className="feather icon-more-horizontal"></i>
      </a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li><a href="javascript:" className="full-screen" onClick={toggleFullScreen}><i className="feather icon-maximize"></i></a></li>
          {/* <li className="nav-item dropdown">
                    <a className="dropdown-toggle" onClick={InProgress} data-toggle="dropdown">Dropdown</a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="javascript:">Action</a></li>
                        <li><a className="dropdown-item" href="javascript:">Another action</a></li>
                        <li><a className="dropdown-item" href="javascript:">Something else here</a></li>
                    </ul>
                </li> */}
          {/* <li className="nav-item">
                    <div className="main-search">
                        <div className="input-group">
                            <input type="text" id="m-search" className="form-control" placeholder="Search . . ." />
                            <a href="javascript:" className="input-group-append search-close">
                                <i className="feather icon-x input-group-text"></i>
                            </a>
                            <span className="input-group-append search-btn btn btn-primary">
                                <i className="feather icon-search input-group-text"></i>
                            </span>
                        </div>
                    </div>
                </li> */}
        </ul>
        
        <ul className="navbar-nav ml-auto d-flex">
        <div className="feedback-popup m-auto">
          <button className="feedback-button" onClick={openPopup}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="w-6 h-6 icon">
              <react width="256" height="256" fill="none"></react>
              <path d="M132,216H47.7a7.6,7.6,0,0,1-7.7-7.7V124a92,92,0,0,1,92-92h0a92,92,0,0,1,92,92h0A92,92,0,0,1,132,216Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
              <circle cx="132" cy="128" r="12"></circle>
              <circle cx="84" cy="128" r="12"></circle>
              <circle cx="180" cy="128" r="12"></circle>
            </svg>
            <span className="feedback font-weight-bold feedback-hover-text">feedback</span>
          </button>
          {isPopupOpen && (
            <div className="popup-container">
              <div className="popup mt-2">
              <button className="close-button close text-white" type="button" aria-label="Close" onClick={closePopup}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                <div className="popup-header mb-4">
                  {isText ? <><MdWest onClick={backToFeedback} className="text-white" /><h5 className="text-center text-white">{isText}</h5></> : <h5 className="text-white">Please give us your feedback!</h5>}
                </div>
                <div className="popup-body">
                  {isText ?
                    <div className="">
                      <textarea
                        className="feedback-textarea col"
                        placeholder="Tell in detail what is happening"
                        value={feedbackText}
                        onChange={handleTextareaChange}
                        // style={{ height: "100px" }}
                      ></textarea>
                      <button className="submit-button mt-2 col" onClick={handleSubmit}>
                        Submit
                      </button>
                    </div> : <div className="feedback-type-btn d-flex">
                      <button className="body-button me-1" onClick={() => handleFeedback('Bug')}>
                        <img src="https://react-feedback-widget-mu.vercel.app/assets/bug.cdeb28a1.svg" height='100px' alt="Bug" className="col bug" />
                        <p className="button-name my-2 text-white">Bug</p>
                      </button>
                      <button className="body-button ms-1 me-1" onClick={() => handleFeedback('Idea')}>
                        <img src="https://react-feedback-widget-mu.vercel.app/assets/idea.907b9faf.svg" height='100px' alt="Idea" className="col idea" />
                        <p className="button-name my-2 text-white">Idea</p>
                      </button>
                      <button className="body-button ms-1" onClick={() => handleFeedback('Others')}>
                        <img src="https://react-feedback-widget-mu.vercel.app/assets/thought.69cfdaa0.svg" height='100px' alt="Others" className="col others" />
                        <p className="button-name my-2 text-white">Others</p>
                      </button>
                    </div>}
                </div>
                <div className="popup-footer text-center mt-4">feedback 💜 </div>
              </div>
            </div>
          )}
        </div>
          <li>
            <div className="logout-block cursor" onClick={logOut}>
              <span className="userlogin-title">{user_name}</span>
              <span onClick={logOut} className="ml-2 f-16 userlogout-icon text-c-red material-symbols-outlined"> logout </span>
            </div>

          </li>
          {/* <li>
                    <div className="dropdown">
                        <a className="dropdown-toggle" href="javascript:" data-toggle="dropdown"><i className="icon feather icon-bell"></i></a>
                        <div className="dropdown-menu dropdown-menu-right notification">
                            <div className="noti-head">
                                <h6 className="d-inline-block m-b-0">Notifications</h6>
                                <div className="float-right">
                                    <a href="javascript:" className="m-r-10">mark as read</a>
                                    <a href="javascript:">clear all</a>
                                </div>
                            </div>
                            <ul className="noti-body">
                                <li className="n-title">
                                    <p className="m-b-0">NEW</p>
                                </li>
                                <li className="notification">
                                    <div className="media">
                                        <img className="img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image" />
                                        <div className="media-body">
                                            <p><strong>Super Admin</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10"></i>30 min</span></p>
                                            <p>New ticket Added</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="n-title">
                                    <p className="m-b-0">EARLIER</p>
                                </li>
                                <li className="notification">
                                    <div className="media">
                                        <img className="img-radius" src="assets/images/user/avatar-2.jpg" alt="Generic placeholder image" />
                                        <div className="media-body">
                                            <p><strong>Joseph William</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10"></i>30 min</span></p>
                                            <p>Prchace New Theme and make payment</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="notification">
                                    <div className="media">
                                        <img className="img-radius" src="assets/images/user/avatar-3.jpg" alt="Generic placeholder image" />
                                        <div className="media-body">
                                            <p><strong>Sara Soudein</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10"></i>30 min</span></p>
                                            <p>currently login</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div className="noti-footer">
                                <a href="javascript:">show all</a>
                            </div>
                        </div>
                    </div>
                </li> */}
          {/* <li>
                    <div ref={dropdownRef} className={"dropdown drp-user " + (isActive ? "" : "show")}>
                        <a onClick={showUserProfile} className="dropdown-toggle" data-toggle="dropdown">
                            <i className="icon feather icon-settings"></i>
                        </a>
                        <div className={"dropdown-menu dropdown-menu-right profile-notification " + (isActive ? "" : "show")} >
                            <div className="pro-head">
                                <img src={userProfile} className="img-radius" alt="User-Profile-Image" />
                                <span>{adminName}</span>
                                <a onClick={logOut} className="dud-logout" title="Logout">
                                    <i className="feather icon-log-out"></i>
                                </a>
                            </div>
                            <ul className="pro-body">
                                <li><a href="javascript:" className="dropdown-item"><i className="feather icon-settings"></i> Settings</a></li>
                                <li><a href="javascript:" className="dropdown-item"><i className="feather icon-user"></i> Profile</a></li>
                                <li><a href="message.html" className="dropdown-item"><i className="feather icon-mail"></i> My Messages</a></li>
                                <li><a href="auth-signin.html" className="dropdown-item"><i className="feather icon-lock"></i> Lock Screen</a></li>
                            </ul>
                        </div>
                    </div>
                </li> */}
        </ul>
      </div>
    </header>
  );
};

export default Header;