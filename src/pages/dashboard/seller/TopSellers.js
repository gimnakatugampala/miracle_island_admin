
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import './style.css'


export default () => {
  return (
    <>
       <div className="row">

        {/* Top Seller */}
        <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            
          <h2>Top Sellers</h2>
            
          <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Seller Name</th>
              <th scope="col">Email</th>
              <th scope="col">Joined Date</th>
              <th scope="col">Country</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Gimna Katugamapala</td>
              <td>gimnakatugamnpala1@gmail.com</td>
              <td>02-03-2023</td>
              <td>Sri Lanka</td>
              <td>
                <button type="button" className="btn btn-outline-primary btn-sm mx-1" data-bs-toggle="modal" data-bs-target="#showdetails">
                <i className="fa-sharp fa-solid fa-eye"></i>
                </button>

                <button type="button" className="btn btn-outline-danger btn-sm mx-1">
                <i className="fa-sharp fa-solid fa-ban"></i>
                </button>

                <button type="button" className="btn btn-outline-warning btn-sm mx-1">
                <i className="fa-sharp fa-solid fa-at"></i>
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
