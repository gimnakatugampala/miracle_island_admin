
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Badge, Button, Container } from '@themesberg/react-bootstrap';
import { ErrorToast } from "../../../functions/Toast";

import ToastComponent from "../../../components/ToastComponent";
import { AddAdmin } from "../../../api";


export default () => {

  const [first_name, setfirst_name] = useState('')
  const [last_name, setlast_name] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirm_password, setconfirm_password] = useState('')


  const handleAddAdmin = () =>{

    // Please Fill All forms
    if(first_name == '' || last_name == '' || email == '' || password == '' || confirm_password == ''){
      ErrorToast("Please Fill All Forms")
      return
    }

      // Check if the Email is valid
      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
        
        ErrorToast("Invalid Email address!")
        return false

      }

   
    // Enter A Strong Password
    if(password != confirm_password){
      ErrorToast("Passwords Do Not Match !")
      return false
    }
    // Check If the Passwords Match
    if(!(confirm_password.length > 8)){

      ErrorToast("Enter A 8 Character Password !")
      return false

    }

    AddAdmin(first_name, last_name,email,password,confirm_password,setfirst_name,setlast_name,setemail,setpassword,setconfirm_password)

    // console.log(first_name)
    // console.log(last_name)
    // console.log(email)
    // console.log(password)
    // console.log(confirm_password)
  }




  return (
    <>
      <div className="row">
    <ToastComponent />
        <div className="col-md-12">
        <div className="card">
          <div className="card-body">

            <h2>Add Admin</h2>
            
            <div className="row">

              <div className="col-md-6">
              <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">Admin First Name</label>
                  <input onChange={(e) => setfirst_name(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Admin First Name" />
                </div>
              </div>

              <div className="col-md-6">
              <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">Admin Last Name</label>
                  <input onChange={(e) => setlast_name(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Admin Last Name" />
                </div>
              </div>

              <div className="col-md-12">
              <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">Admin Email</label>
                  <input onChange={(e) => setemail(e.target.value)} type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter Admin Email" />
                </div>
              </div>

              <div className="col-md-6">
              <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">Password</label>
                  <input onChange={(e) => setpassword(e.target.value)} type="password" className="form-control" id="exampleFormControlInput1" placeholder="Enter Password" />
                </div>
              </div>

              <div className="col-md-6">
              <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">Confirm Password</label>
                  <input onChange={(e) => setconfirm_password(e.target.value)} type="password" className="form-control" id="exampleFormControlInput1" placeholder="Enter Confirm Password" />
                </div>
              </div>

              <div className="col-md-6">
              <div className="mb-3">
                <button onClick={handleAddAdmin} type="button" className="btn btn-primary">Create Admin</button>
        
                </div>
              </div>


            </div>
         
                
          </div>
        </div>

        </div>
      </div>








    
    </>
  );
};
