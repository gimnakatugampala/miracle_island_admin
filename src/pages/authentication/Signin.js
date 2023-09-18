
import React, { useEffect, useState ,useLayoutEffect  } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

import ToastComponent from "../../components/ToastComponent";
import { ErrorToast } from "../../functions/Toast";

import { LoginUser } from "../../api";

import { useHistory  } from "react-router-dom";
import useQuery from "../../functions/SearchQ";
import LOGO from '../../assets/icons/large-logo.png'



export default () => {

  let query = useQuery();
  let CURRENT_USER = JSON.parse(localStorage.getItem("miracle_island_admin"))
    
    useEffect(() => {

      //  if(CURRENT_USER == null){

      //     window.location.href = "/signin?sessionLogout=true"
      
      // }
    

      
    if(query.get("logout")){
      ErrorToast('User Loggoed Out !')
    }

    if(query.get("sessionLogout")){
      ErrorToast('Session Expired !')
    }
    
  }, [])


  const history = useHistory();
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [Loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);


  // Login User
  const handleLoginUser = (e) =>{

    e.preventDefault()

    setLoading(true)

    // Fill All Forms
    if(email == '' || password == ''){
      ErrorToast("Please Fill All Fields !")
      setLoading(false)
      return
    }

 
    // Validate Email
 if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
   
   ErrorToast("Invalid Email address!")
   setLoading(false)
    return false

 }

  // Submit For API
  LoginUser(email, password,history,setLoading)

  

  }

  function handleToggleShowPassword(e) {
    e.preventDefault()
    setShowPassword(!showPassword);
  }

  return (
    <main>
      <ToastComponent />
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <img src={LOGO} />
          </p>
          <Row className="justify-content-center form-bg-image" >
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign As an Admin</h3>
                </div>

                <Form className="mt-4">

                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control onChange={(e) => setemail(e.target.value)}  autoFocus required type="email" placeholder="example@company.com" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>

                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control  onChange={(e) => setpassword(e.target.value)} required type={showPassword ? 'text' : 'password'} placeholder="Password" />
                        <button className="btn btn-primary" onClick={handleToggleShowPassword}>
                          {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                        </button>
                        
                      </InputGroup>
                    </Form.Group>

{/* 
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check>
                      <Card.Link as={Link} to={Routes.ForgotPassword.path} className="small text-end">Forgot password?</Card.Link>
                    </div> */}
                  </Form.Group>
                  {Loading ? (

                  <Button variant="primary" type="submit" className="w-100">
                  <div className="spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                  </Button>
                  ) : (

                  <Button onClick={handleLoginUser} variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                  )}


                </Form>

                {/* <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div> */}
                {/* <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div> */}
                {/* <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
