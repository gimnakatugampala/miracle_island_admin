
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Badge, Button, Container } from '@themesberg/react-bootstrap';
import { AllBuyers , ActivateBuyer ,DeactivateBuyer} from "../../../api";
import Pagination from "../../../components/Pagination";
import moment from 'moment'
import Loading from "../../../components/Loading";
import ToastComponent from "../../../components/ToastComponent";
import NotFoundItem from "../../../components/NotFoundItem";
import Swal from 'sweetalert2';

export default () => {

  
  const [buyers, setbuyers] = useState([])
  const [currentPage, setcurrentPage] = useState(1)
  const [notfound, setnotfound] = useState(false)
  const [buyersPerPage] = useState(10)

  useEffect(() => {
    
     AllBuyers(setbuyers,setnotfound)
    
  }, [])
  
  

 

    // Pagination Orders
    const indexofLastOrder = currentPage * buyersPerPage;
    const indexofFirstOder = indexofLastOrder - buyersPerPage;
    const currentBuyers = buyers.slice(indexofFirstOder , indexofLastOrder)
  
  
    // Change Page
    const paginate = (pageNumber) => setcurrentPage(pageNumber)

    const handleDeActiveBuyer = (ID) =>{

      Swal.fire({
        title: 'Are you sure?',
        text: "Buyer Will Be Deactivated",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Deactivate it!'
      }).then((result) => {
        if (result.isConfirmed) {

          DeactivateBuyer(ID)   
          AllBuyers(setbuyers,setnotfound)   

        }
      })

      // let text = "Are You Sure You Want To Deactivate Buyer";
      // if (window.confirm(text) == true) {
  
      //   DeactivateBuyer(ID)   
      //   AllBuyers(setbuyers,setnotfound)   
      // }

    }


    const handleActivateBuyer = (ID) =>{

      Swal.fire({
        title: 'Are you sure?',
        text: "Buyer Will Be Activated",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Deactivate it!'
      }).then((result) => {
        if (result.isConfirmed) {

         
        ActivateBuyer(ID)     
        AllBuyers(setbuyers,setnotfound) 

        }
      })

      // let text = "Are You Sure You Want To Activate Buyer";
      // if (window.confirm(text) == true) {
  
      //   ActivateBuyer(ID)     
      //   AllBuyers(setbuyers,setnotfound) 
      // }

    }


  

  return (
    <>
     <div className="row">
      <ToastComponent />
        <div className="col-md-12">
        {/* Filter Options */}
        <div className="card">
          <div className="card-body">

            <h2>All Buyer</h2>

            {/* <form className="row">
              <div className="col-md-4">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Enter Buyer Name" />
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


            </form>
          */}
          </div>
        </div>

        </div>



        {/* All Seller */}
        <div className="col-md-12">
        <div className="card">
        {currentBuyers.length > 0 ? (
            <div className="card-body">
           <div className="table-responsive">  
            <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Buyer Name</th>
                <th scope="col">Email</th>
                <th scope="col">Joined Date</th>
                <th scope="col">Status</th>
                <th scope="col">Country</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
  
              {notfound ?  <NotFoundItem title="Buyers Not Found" /> :currentBuyers.map((buyer,index) => (
  
              <tr key={index}>
                <th>{buyer.buyerId}</th>
                <td>{buyer.buyerName}</td>
                <td>{buyer.email}</td>
               
                <td>{moment(buyer.date).format('DD-MM-YYYY')}</td>
                <td> 
                  {buyer.status == true ? (
                    <Badge bg="success" >Active</Badge>
                  ) : (
                    <Badge bg="danger" >Inactive</Badge>
                  )}
                </td>
                <td>{buyer.country}</td>
                <td>
                  {/* <button type="button" className="btn btn-outline-primary btn-sm mx-1" data-bs-toggle="modal" data-bs-target="#showdetails">
                  <i className="fa-sharp fa-solid fa-eye"></i>
                  </button> */}
  
                    
                  {buyer.status == true ? (
  
                  <button onClick={() => {
                    handleDeActiveBuyer(buyer.buyerId)
                  }} type="button" className="btn btn-outline-danger btn-sm mx-1">
                  <i className="fa-sharp fa-solid fa-ban"></i>
                  </button>
                  ) : (
  
                  <button onClick={() =>{
                    handleActivateBuyer(buyer.buyerId)
                  }} type="button" className="btn btn-outline-success btn-sm mx-1">
                  <i className="fa-solid fa-check"></i>
                  </button>
                  )}
  
                  {/* <button type="button" className="btn btn-outline-warning btn-sm mx-1">
                  <i className="fa-sharp fa-solid fa-at"></i>
                  </button> */}
  {/* 
                  <button type="button" className="btn btn-outline-success btn-sm mx-1" data-bs-toggle="modal" data-bs-target="#productdetails">
                  <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                  </button> */}
                </td>
              </tr>
  
              ))}
        
            </tbody>
          </table>
          </div>
                  
            </div>
        ) : (
          <Loading />
        ) }
        
          <Pagination productsPerPage={buyersPerPage} totalProducts={buyers.length} paginate={paginate} />
        </div>

        </div>
      </div>


  {/* Show Modal */}
  <div className="modal fade" id="showdetails" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Buyer Details</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
        <div className="row">

          <div className="col-md-6">
            <div className="mt-2">
              <p className="modal-attr">Buyer ID</p>
              <p className="modal-val">001</p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Buyer Name</p>
              <p className="modal-val">Gimna Katugampala</p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Buyer Email</p>
              <p className="modal-val">gimnakatugamnpala1@gmail.com</p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Zip Code</p>
              <p className="modal-val">10600</p>
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

            <div className="mt-2">
              <p className="modal-attr">Address</p>
              <p className="modal-val">No. 393/5, Awissawella Rd, Megoda Kolonnawa Road, Wellampitiya</p>
            </div>

           

          </div>



        </div>

        
        
      </div>

    </div>
  </div>
</div>


  {/* Bought Product Show Modal */}
  <div className="modal fade" id="productdetails" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Bought Products Details</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">

           
          <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">QTY</th>
              <th scope="col">Discount</th>
              <th scope="col">Purchase Date</th>
              <th scope="col">Price (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Pots</td>
              <td>20</td>
              <td>10%</td>
              <td>01-02-2023</td>
              <td>300</td>
            </tr>
     
        
          </tbody>
        </table>
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
