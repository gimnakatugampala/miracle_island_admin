
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Badge, Button, Container } from '@themesberg/react-bootstrap';

import './style.css'
import { GetAllSellers ,DeactivateSellers ,ActivateSellers } from "../../../api";
import Pagination from "../../../components/Pagination";
import moment from 'moment'

import Loading from "../../../components/Loading";
import ToastComponent from "../../../components/ToastComponent";
import NotFoundItem from '../../../components/NotFoundItem'

import Swal from 'sweetalert2';

export default () => {

  
  const [sellers, setsellers] = useState([])
  const [currentPage, setcurrentPage] = useState(1)
  const [notfound, setnotfound] = useState(false)
  const [sellersPerPage] = useState(10)

  useEffect(() => {
    
    console.log(sellers)
  
     GetAllSellers(setsellers,setnotfound)

  }, [])

  // Deactivate Product
  const handleDeActiveSeller = (ID) =>{

    Swal.fire({
      title: 'Are you sure?',
      text: "The Seller Will be Deactivated",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Deactivate it!'
    }).then((result) => {
      if (result.isConfirmed) {
        DeactivateSellers(ID,GetAllSellers,setsellers,setnotfound)
        // console.log(sellers)

        GetAllSellers(setsellers,setnotfound)   

      }
    })

    // let text = "Are You Sure You Want To Deactivate Seller";

    // if (window.confirm(text) == true) {
    //   DeactivateSellers(ID,GetAllSellers,setsellers,setnotfound)
    //   console.log(sellers)
      
    // }
    
    // GetAllSellers(setsellers,setnotfound)     
  }

  // Activate Products
  const handleActivateSeller = (ID) =>{

    Swal.fire({
      title: 'Are you sure?',
      text: "The Seller Will be Activated",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Activate it!'
    }).then((result) => {
      if (result.isConfirmed) {
      
        ActivateSellers(ID)
        GetAllSellers(setsellers,setnotfound)  

      }
    })

    // let text = "Are You Sure You Want To Activate Seller";

    // if (window.confirm(text) == true) {

    //   ActivateSellers(ID)
    //   console.log(sellers)
      
      
    // }
    // GetAllSellers(setsellers,setnotfound)  
  }
  

    // Pagination Orders
    const indexofLastOrder = currentPage * sellersPerPage;
    const indexofFirstOder = indexofLastOrder - sellersPerPage;
    const currentSellers = sellers.slice(indexofFirstOder , indexofLastOrder)
  
  
    // Change Page
    const paginate = (pageNumber) => setcurrentPage(pageNumber)


    

  return (
    <>
      <div className="row">
        <ToastComponent />
        <div className="col-md-12">
        {/* Filter Options */}
        <div className="card">
          <div className="card-body">

            <h2>All Sellers</h2>

            {/* <form className="row">
              <div className="col-md-4">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Enter Seller Name" />
                <button className="btn btn-success" type="button" id="button-addon2"><i className="fa-sharp fa-solid fa-magnifying-glass"></i></button>
              </div>
              </div>

              <div className="col-md-4">
                <div className="input-group">
                <select className="form-select" aria-label="Default select example">
                  <option selected>Select Country</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
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

        {currentSellers.length > 0 ? (

          <div className="card-body">
             <div className="table-responsive">
          <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Seller Name</th>
              <th scope="col">Email</th>
              <th scope="col">Joined Date</th>
              <th scope="col">Country</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>

            {notfound ? <NotFoundItem  title="Sellers Not Found" /> :  currentSellers.map((seller,index) => (

            <tr key={index}>
              <th>{seller.sellerId}</th>
              <td>{seller.sellerName}</td>
              <td>{seller.email}</td>
              <td>{moment(seller.date).format('DD-MM-YYYY')}</td>
              <td>{seller.country}</td>
              <td> 
                {seller.status == true ? (
                  <Badge bg="success" >Active</Badge>
                ) : (
                  <Badge bg="danger" >Inactive</Badge>
                )}
              </td>
              <td>

              {seller.status == true ? (

                <button onClick={() => {
                  handleDeActiveSeller(seller.sellerId)
                }} type="button" className="btn btn-outline-danger btn-sm mx-1">
                <i className="fa-sharp fa-solid fa-ban"></i>
                </button>
              ) : (

                <button onClick={() =>{
                  handleActivateSeller(seller.sellerId)
                }} type="button" className="btn btn-outline-success btn-sm mx-1">
                <i className="fa-solid fa-check"></i>
                </button>
              )}


          
              

              </td>
            </tr>
            ))}
      
          </tbody>
        </table>
        </div>
                
          </div>

        ) :(
          <Loading />
        )}


          <Pagination productsPerPage={sellersPerPage} totalProducts={sellers.length} paginate={paginate} />
        </div>


        </div>
      </div>


  {/* Show Modal */}
  <div className="modal fade" id="showdetails" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Seller Details</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
        <div className="row">

          <div className="col-md-6">
            <div className="mt-2">
              <p className="modal-attr">Seller ID</p>
              <p className="modal-val">001</p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Seller Name</p>
              <p className="modal-val">Gimna Katugampala</p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Seller Email</p>
              <p className="modal-val">gimnakatugamnpala1@gmail.com</p>
            </div>

          </div>


          <div className="col-md-6">
            <div className="mt-2">
              <p className="modal-attr">Country</p>
              <p className="modal-val">Sri Lanka</p>
            </div>

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


  {/* Product Show Modal */}
  <div className="modal fade" id="productdetails" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Product Details</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
        <div className="row">

          <div className="col-md-12">
           
          <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Pots</td>
              <td>Arts & craft</td>
              <td>2000</td>
            </tr>
     
        
          </tbody>
        </table>

       
          </div>

        </div>
        
      </div>

    </div>
  </div>
</div>



    
    </>
  );
};
