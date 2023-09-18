
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Badge, Button, Container } from '@themesberg/react-bootstrap';

import './styles.css'


export default () => {
  return (
    <>
     <div className="row">
    



        {/* All Seller */}
        <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            
          <h2>Top Products</h2>
          <div class="table-responsive">

          <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price (Rs.)</th>
              <th scope="col">Sales</th>
              <th scope="col">Main Category</th>
              <th scope="col">Status</th>
              <th scope="col">Publish</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Pots</td>
              <td>400</td>
              <td>10</td>
              <td>Arts & Crafts</td>
              <td><Badge bg="success" className="me-1">Active</Badge></td>
              <td><Badge bg="success" className="me-1">Published</Badge></td>
              <td>
                <button type="button" className="btn btn-outline-primary btn-sm mx-1" data-bs-toggle="modal" data-bs-target="#showdetails">
                <i className="fa-sharp fa-solid fa-eye"></i>
                </button>

                <button type="button" className="btn btn-outline-danger btn-sm mx-1">
                <i className="fa-sharp fa-solid fa-ban"></i>
                </button>

                <button type="button" className="btn btn-outline-warning btn-sm mx-1" data-bs-toggle="modal" data-bs-target="#imageslidermodal">
                <i className="fa-sharp fa-solid fa-image"></i>
                </button>

                <button type="button" className="btn btn-outline-success btn-sm mx-1" data-bs-toggle="modal" data-bs-target="#productdetails">
                <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                </button>
              </td>
            </tr>
      
          </tbody>
        </table>
        </div>
                
          </div>
        </div>

        </div>
      </div>


  {/* Show Modal */}
  <div className="modal fade" id="showdetails" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Product Details</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
        <div className="row">

          <div className="col-md-6">
            <div className="mt-2">
              <p className="modal-attr">Product ID</p>
              <p className="modal-val">001</p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Product Name</p>
              <p className="modal-val">Pots</p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Discount</p>
              <p className="modal-val">50%</p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Rating</p>
              <p className="modal-val">5</p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Status</p>
              <p className="modal-val"><Badge bg="success" className="me-1">Active</Badge></p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Description</p>
              <p className="modal-val">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</p>
            </div>

          </div>


          <div className="col-md-6">
            <div className="mt-2">
              <p className="modal-attr">No of Sales</p>
              <p className="modal-val">10</p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Main Category</p>
              <p className="modal-val">Arts & Craft</p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Category</p>
              <p className="modal-val">Arts</p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Stock Quantity</p>
              <p className="modal-val">200</p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Publish</p>
              <p className="modal-val"><Badge bg="success" className="me-1">Published</Badge></p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Seller Name</p>
              <p className="modal-val">Gimna Katugampala</p>
            </div>

           

          </div>

          <div className="col-md-12">
          <p className="modal-attr">Tags</p>
            <Badge bg="success" className="me-1">Published</Badge>
            <Badge bg="success" className="me-1">Published</Badge>
            <Badge bg="success" className="me-1">Published</Badge>
            <Badge bg="success" className="me-1">Published</Badge>
            <Badge bg="success" className="me-1">Published</Badge>
            <Badge bg="success" className="me-1">Published</Badge>
          </div>



        </div>
        
      </div>

    </div>
  </div>
</div>


  {/* Buyers List Show Modal */}
  <div className="modal fade" id="productdetails" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Buyers List  Details</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">

           
          <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Buyer Name</th>
              <th scope="col">Total Price (Rs.)</th>
              <th scope="col">QTY</th>
              <th scope="col">Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>John Doe</td>
              <td>3000</td>
              <td>10</td>
              <td>01-02-2023</td>

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


{/* Product Images */}
<div className="modal fade" id="imageslidermodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Product Images</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://images.pexels.com/photos/793012/pexels-photo-793012.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="https://images.pexels.com/photos/866047/pexels-photo-866047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="https://images.pexels.com/photos/3094211/pexels-photo-3094211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" alt="..." />
    </div>
  </div>


  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>

  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>

</div>

      </div>

    </div>
  </div>
</div>



    
    </>
  );
};
