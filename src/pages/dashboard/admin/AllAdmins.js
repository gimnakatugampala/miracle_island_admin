
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Badge, Button, Container } from '@themesberg/react-bootstrap';

import { getAllAdmins , DeactivateAdmin , ActivateAdmin } from "../../../api";
import moment from 'moment'
import ToastComponent from '../../../components/ToastComponent'
import Pagination from "../../../components/Pagination";
import Loading from "../../../components/Loading";
import { useHistory } from "react-router-dom";
import NotFoundItem from "../../../components/NotFoundItem";
import Swal from 'sweetalert2';


export default () => {

  const [admins, setadmins] = useState([])
  const [currentPage, setcurrentPage] = useState(1)
  const [adminsPerPage] = useState(10)
  const [notfound, setnotfound] = useState(false)



  useEffect(() => {
    
    getAllAdmins(setadmins,setnotfound)
  }, [])
  

  // Get All Admins
  // Deactive Admin
  const handleDeactiveAdmin = (ID) =>{

    Swal.fire({
      title: 'Are you sure?',
      text: "The Admin Will Be Deactivated",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Deactivate it!'
    }).then((result) => {

      if (result.isConfirmed) {

        DeactivateAdmin(ID,getAllAdmins,setadmins,setnotfound)     
      
        // Get All Admins
        getAllAdmins(setadmins,setnotfound) 

        // Swal.fire(
        //   'Deactivated!',
        //   'Admin Deactivated !',
        //   'success'
        // )
      }
    })

    // let text = "Are You Sure You Want To Deactivate Admin";
    // if (window.confirm(text) == true) {

    //   DeactivateAdmin(e.target.id,getAllAdmins,setadmins,setnotfound)     
      
    //   // Get All Admins
    //   getAllAdmins(setadmins,setnotfound) 
    // }


  }


  // Activate Admin
  const handleActiveAdmin = (ID) =>{

    Swal.fire({
      title: 'Are you sure?',
      text: "The Admin Will Be Activated",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Activate it!'
    }).then((result) => {
      if (result.isConfirmed) {

        ActivateAdmin(ID,getAllAdmins,setadmins,setnotfound)      
        getAllAdmins(setadmins,setnotfound)


        // Swal.fire(
        //   'Activated!',
        //   'Admin Activated !',
        //   'success'
        // )
      }
    })

    // let text = "Are You Sure You Want To Activate Admin";
    // if (window.confirm(text) == true) {

    //   ActivateAdmin(e.target.id,getAllAdmins,setadmins,setnotfound)      
    //   getAllAdmins(setadmins,setnotfound)
    // }

    // console.log(e.target.id)
  }

   // Pagination Orders
   const indexofLastOrder = currentPage * adminsPerPage;
   const indexofFirstOder = indexofLastOrder - adminsPerPage;
   const currentAdmins = admins.slice(indexofFirstOder , indexofLastOrder)
 
 
   // Change Page
   const paginate = (pageNumber) => setcurrentPage(pageNumber)

  

  return (
    <>
      <div className="row card">
        <ToastComponent />
        {currentAdmins.length > 0 ? (
          <>
        <div className="col-md-12">
          {/* Filter Options */}
          <div className="card">
            <div className="card-body">

            <h2>All Admins</h2>

            {/* <form className="row">
              <div className="col-md-4">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Enter Admin Name" />
                <button className="btn btn-success" type="button" id="button-addon2"><i className="fa-sharp fa-solid fa-magnifying-glass"></i></button>
              </div>
              </div>

      

              <div className="col-md-4">

              <button type="button" className="btn btn-success">Filter</button>
              </div>


            </form> */}
         
          </div>
        </div>
  
          </div>
        {/* All Seller */}
        <div className="col-md-12">
        <div className="card">
          <div className="card-body">
          <div className="table-responsive">
          <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Admin Name</th>
              <th scope="col">Email</th>
              <th scope="col">Joined Date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>

            {notfound ? <NotFoundItem title="Admins Not Found" /> : admins.map((admin,index) => (

            <tr key={index}>
              <th>{admin.adminId}</th>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{moment(admin.date).format('DD-MM-YYYY')}</td>

              <td> 
                {admin.state == true ? (
                  <Badge bg="success" >Active</Badge>
                ) : (
                  <Badge bg="danger" >Inactive</Badge>
                )}
              </td>

              <td>
                {/* <button type="button" className="btn btn-outline-primary btn-sm mx-1" data-bs-toggle="modal" data-bs-target="#showdetails">
                <i className="fa-sharp fa-solid fa-eye"></i>
                </button> */}

              {admin.state == true ? (

                <button id={admin.adminId} type="button" onClick={() => handleDeactiveAdmin(admin.adminId)}  className="btn btn-outline-danger btn-sm mx-1">
                <i id={admin.adminId} className="fa-sharp fa-solid fa-ban"></i>
                </button>
              ) : (

                <button id={admin.adminId} onClick={() => handleActiveAdmin(admin.adminId)} type="button" className="btn btn-outline-success btn-sm mx-1">
                <i id={admin.adminId} className="fa-solid fa-check"></i>
                </button>
              )}


                
              



                {/* <button type="button" className="btn btn-outline-success btn-sm mx-1" data-bs-toggle="modal" data-bs-target="#passwordDetails">
                <i className="fa-sharp fa-solid fa-key"></i>
                </button> */}
              </td>
            </tr>
            ))}
      
          </tbody>
        </table>
        </div>
                
          </div>

          <Pagination productsPerPage={adminsPerPage} totalProducts={admins.length} paginate={paginate} />

        </div>

        </div>
        </>
        ) : (
          <Loading />
        )}



      </div>


  {/* Show Modal */}
  <div className="modal fade" id="showdetails" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Admin Details</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
        <div className="row">

          <div className="col-md-6">
            <div className="mt-2">
              <p className="modal-attr">Admin ID</p>
              <p className="modal-val">001</p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Admin Name</p>
              <p className="modal-val">Gimna Katugampala</p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Admin Email</p>
              <p className="modal-val">gimnakatugamnpala1@gmail.com</p>
            </div>

          </div>


          <div className="col-md-6">

            <div className="mt-2">
              <p className="modal-attr">Joined Date</p>
              <p className="modal-val">02-03-2023</p>
            </div>

           

          </div>



        </div>
        
      </div>

    </div>
  </div>
</div>


  {/* Password Details Modal */}
  <div className="modal fade" id="passwordDetails" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Password Details</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
        <div className="row">

          <div className="col-md-12">
           
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">New Password</label>
          <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Enter New Password" />
        </div>

        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Confirm Password</label>
          <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Enter Confirm Password" />
        </div>

        <button type="button" className="btn btn-primary">Change Password</button>

       
          </div>

        </div>
        
      </div>

    </div>
  </div>
</div>



    
    </>
  );
};
