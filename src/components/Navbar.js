
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog, faEnvelopeOpen, faSearch, faSignOutAlt, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Form, Image, Navbar, Dropdown, Container, ListGroup, InputGroup , Card } from '@themesberg/react-bootstrap';

import NOTIFICATIONS_DATA from "../data/notifications";
import Profile3 from "../assets/img/Profile.png";
import { Link , useHistory } from 'react-router-dom';
import { Routes } from "../routes";
import { GetAllNotifications, ViewAllNotifications, ViewSingleNotifications } from "../api";




export default (props) => {

  
  


  // Dashboard TopNav Bar with the Display of Users
  const history = useHistory();
  const [notifications, setNotifications] = useState([]);
  // const areNotificationsRead = notifications.reduce((acc, notif) => acc && notif.read, true);

  // const markNotificationsAsRead = () => {
  //   setTimeout(() => {
  //     setNotifications(notifications.map(n => ({ ...n, read: true })));
  //   }, 300);
  // };

  
    // Rediect if user not found
    let CURRENT_USER = JSON.parse(localStorage.getItem("miracle_island_admin"))

    useEffect(() => {
     
      if(CURRENT_USER == null){
        window.location.href = "/signin"
      
      }
  
      GetAllNotifications(setNotifications)

      console.log(notifications)
      
    }, [])
    

  const handleLogout = () => {

    localStorage.removeItem("miracle_island_admin");

    if(localStorage.getItem("miracle_island_admin") == null){
      history.push("/signin?logout=true");
    }

  }

  // View All Notifications
  const handleViewAllNotifications = () =>{
    ViewAllNotifications(GetAllNotifications,setNotifications)
  }

  // Single Notifications
  const handleSingleNotifications = (ID) =>{

    ViewSingleNotifications(ID,GetAllNotifications,setNotifications)
    
  }


  const Notification = (props) => {
    const { type, notification, date , id ,viewed} = props;
    // const readClassName = read ? "" : "";


    return (
      <ListGroup.Item onClick={() => handleSingleNotifications(id)} action  className={`border-bottom border-light ${viewed ? "bg-dark": ""}`}>
        <Row  className="align-items-center p-2">
  
          <Col className="ps-0 ms--2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className={`h6 mb-0 text-small ${viewed ? "text-white" : ""}`}>{type}</h4>
              </div>
              <div className="text-end">
                <small className="text-danger">{date}</small>
              </div>
            </div>
            <p className="font-small mt-1 mb-0">{notification}</p>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            {/* <Form className="navbar-search">
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge search-bar">
                  <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                  <Form.Control type="text" placeholder="Search" />
                </InputGroup>
              </Form.Group>
            </Form> */}
          </div>
          <Nav className="align-items-center">
            <Dropdown  as={Nav.Item}  >
              <Dropdown.Toggle as={Nav.Link} className="text-dark icon-notifications me-lg-3">
                <span className="icon icon-sm">
                  <FontAwesomeIcon icon={faBell} className="bell-shake" />
                  {notifications.length != 0 && <span className="icon-badge rounded-circle unread-notifications" />}
                  

                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu  className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-center mt-2 py-0">
                <ListGroup  className="list-group-flush">
                  <Nav.Link href="#" className="text-center text-primary fw-bold border-bottom border-light py-3">
                    Notifications
                  </Nav.Link>

                  <div style={{height:'400px',overflowY:'scroll'}}>

                    {notifications.length != 0  ? notifications.map((n,index)=> 
                      <Notification  key={`notification-${n.id}`} {...n} />
                    ) : <div className="d-flex justify-content-center align-items-center pt-5">No Notifications Yet !</div>}
                  </div>


                  <Dropdown.Item  onClick={handleViewAllNotifications} className="text-center text-primary fw-bold py-3">
                    View all
                  </Dropdown.Item>
                </ListGroup>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image src={Profile3} className="user-avatar md-avatar rounded-circle" />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">{CURRENT_USER == null ? '' : CURRENT_USER.name}</span>
                    <p className="mb-0 font-small fw-bold">{CURRENT_USER == null ? '' :  CURRENT_USER.email}</p>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                {/* <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" /> My Profile
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faEnvelopeOpen} className="me-2" /> Messages
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faUserShield} className="me-2" /> Support
                </Dropdown.Item> */}

                {/* <Dropdown.Divider /> */}

                <Dropdown.Item className="fw-bold">
                <Card.Link onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
                </Card.Link>

                </Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
