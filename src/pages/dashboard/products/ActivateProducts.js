
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Badge, Button, Container } from '@themesberg/react-bootstrap';

import './styles.css'

import { GetAllPublishedProducts , DeactivateProduct , ActivateProduct} from "../../../api";
import Pagination from "../../../components/Pagination";
import { Modal } from 'react-bootstrap'
import Loading from "../../../components/Loading";
import ToastComponent from "../../../components/ToastComponent";
import { ErrorToast } from "../../../functions/Toast";
import NumberAdjustment from "../../../functions/NumberAdjustment";
import NotFoundItem from "../../../components/NotFoundItem";
import Swal from 'sweetalert2';
// import 'sweetalert2/src/sweetalert2.scss'

export default () => {

  const [products, setproducts] = useState([])
  const [currentPage, setcurrentPage] = useState(1)
  const [productsPerPage] = useState(10)

  const [showImageSlider, setshowImageSlider] = useState(false)
  const [showProductDetails, setshowProductDetails] = useState(false)

  const [showDisapproved, setshowDisapproved] = useState(false)


  const [images, setimages] = useState([])
  const [ProductID, setProductID] = useState('')
  const [Product_Name, setProduct_Name] = useState('')
  const [Price, setPrice] = useState('')
  const [discount, setdiscount] = useState('')
  const [rating, setrating] = useState('')
  const [status, setstatus] = useState('')
  const [is_published, setis_published] = useState('')
  const [slaesQ, setslaesQ] = useState('')
  const [MainC, setMainC] = useState('')
  const [Category, setCategory] = useState('')
  const [Quantity, setQuantity] = useState('')
  const [description, setdescription] = useState('')
  const [shortDescription, setshortDescription] = useState('')
  const [SellerID, setSellerID] = useState('')
  const [tags, settags] = useState([])
  const [showComSection, setshowComSection] = useState(false)
  const [comment, setcomment] = useState('')
  const [shippingCosts, setshippingCosts] = useState([])
  const [shippingType, setshippingType] = useState('')
  const [ProductWeight, setProductWeight] = useState('')
  const [notfound, setnotfound] = useState(false)


  const handleImageSlider = () => setshowImageSlider(!showImageSlider);
  const handleshowProductDetails = () => setshowProductDetails(!showProductDetails);

  const handleshowDisapproved = () => setshowDisapproved(!showDisapproved);




  useEffect(() => {

    GetAllPublishedProducts(setproducts,setnotfound)
  }, [])

  



  // Change Page
  const paginate = (pageNumber) => setcurrentPage(pageNumber)


  // get the single Product Details
const getSingleDetailsProduct = (product) =>{
  console.log(product)

  setimages(product.image)
  setProductID(product.id)
  setProduct_Name(product.name)
  setdiscount(product.discount)
  setrating(product.rating)
  setstatus(product.active)
  setis_published(product.published)
  setslaesQ(product.saleCount)
  setMainC(product.mainCategory[0])
  setCategory(product.category[0])
  setQuantity(product.availableqty)
  setdescription(product.fullDescription)
  setshortDescription(product.shortDescription)
  setSellerID(product.sellerid)
  settags(product.tag)
  setProductWeight(product.weight)

  setshippingCosts(product.shippingCharges)
  setPrice(product.price)
    
  setshippingType(product.shippingCharges[0].shippingType)
  
}


const handleDeActiveProduct = (comment,ID) =>{

  if(comment == ''){
    ErrorToast("Please Add a Comment")
  }else{

    Swal.fire({
      title: 'Are you sure?',
      text: "The Product Will Be Deactivated",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Deactivate it!'
    }).then((result) => {
      if (result.isConfirmed) {

        DeactivateProduct(comment,ID,setshowProductDetails,setcomment,setshowDisapproved)  
        
        setTimeout(() => {
        
          GetAllPublishedProducts(setproducts,setnotfound)   
           
        }, 1000);
  

        // Swal.fire(
        //   'Deactivated!',
        //   'The Product Deactiavted',
        //   'success'
        // )
      }
    })

    // let text = "Are You Sure You Want To Deactivate Product";
    // if (window.confirm(text) == true) {
  
    //   DeactivateProduct(comment,ID,setshowProductDetails,setcomment,setshowDisapproved)   


    //   setTimeout(() => {
        
    //     GetAllPublishedProducts(setproducts,setnotfound)   
         
    //   }, 1000);

    // }


  }

  
}


const handleActivateProduct = (ID) =>{

  Swal.fire({
    title: 'Are you sure?',
    text: "The Product Will Be Activated",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Activated it!'
  }).then((result) => {
    if (result.isConfirmed) {

      ActivateProduct(ID,setshowProductDetails)     
      GetAllPublishedProducts(setproducts,setnotfound) 
  
      setTimeout(() => {
          
        GetAllPublishedProducts(setproducts,setnotfound)   
         
      }, 1000);

      // Swal.fire(
      //   'Deleted!',
      //   'The Product Actiavted',
      //   'success'
      // )

    }
  })

  // let text = "Are You Sure You Want To Activate Product";
  // if (window.confirm(text) == true) {

  //   ActivateProduct(ID,setshowProductDetails)     
  //   GetAllPublishedProducts(setproducts,setnotfound) 

  //   setTimeout(() => {
        
  //     GetAllPublishedProducts(setproducts,setnotfound)   
       
  //   }, 1000);
  // }

}
  

  // Pagination Orders
  const indexofLastOrder = currentPage * productsPerPage;
  const indexofFirstOder = indexofLastOrder - productsPerPage;
  const currentProducts = products.slice(indexofFirstOder , indexofLastOrder)


  return (
    <>
     <div className="row">
      <ToastComponent />
        <div className="col-md-12">
        {/* Filter Options */}
        <div className="card">
          <div className="card-body">

            <h2>Approve Products</h2>

            {/* <form className="row">
              <div className="col-md-4">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Enter Product Name" />
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

          {

          <div class="table-responsive">

          <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price ( $ )</th>
              <th scope="col">Discount ( % )</th>
              <th scope="col">Main Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>

              
            {notfound ? <NotFoundItem title="No Products For Approval" /> : currentProducts.length > 0 ? currentProducts.map((product,index) => (

            <tr key={index}>
              <th>{index + 1}</th>
              <td>{product.name}</td>
              <td>{NumberAdjustment(NumberAdjustment(product.price) - (NumberAdjustment(product.price) * NumberAdjustment(product.discount) / 100.00))}</td>
              <td>{product.discount}</td>
              <td>{product.mainCategory[0]}</td>
              
              <td>
                <button type="button" className="btn btn-outline-primary btn-sm mx-1" onClick={() =>{
                  handleshowProductDetails()
                  getSingleDetailsProduct(product)
                }}>
                <i className="fa-sharp fa-solid fa-eye"></i>
                </button>

               

                

                {/* <button type="button" className="btn btn-outline-success btn-sm mx-1" data-bs-toggle="modal" data-bs-target="#productdetails">
                <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                </button> */}
              </td>
            </tr>
            )) : (
              <Loading />
            )}



      
          </tbody>
        </table>
        </div>


           }
           
        <Pagination productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate} />

                
          </div>
        </div>

        </div>
      </div>


  {/* Show Modal */}
  <Modal size="lg" show={showProductDetails} onHide={handleshowProductDetails}>
  <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Product Details</h1>
        <button type="button" className="btn-close" onClick={handleshowProductDetails}></button>
      </div>
      <div className="modal-body">

        <div className="row">

        {images.map((image,index) => (

          <div key={index} className="col-md-3 my-2">
            <img height="150" src={`https://miracleisland.tk:2053/assets/images/product_images/${image}`} />
        </div>
        ))}

   
        </div>
        
        <div className="row">


          <div className="col-md-6">


            <div className="mt-2">
              <p className="modal-attr">Product Name</p>
              <p className="modal-val">{Product_Name}</p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Discount</p>
              <p className="modal-val">{discount}%</p>
            </div>
     
  



            <div className="mt-2">
              <p className="modal-attr">Main Category</p>
              <p className="modal-val">{MainC}</p>
            </div>

        
            <div className="mt-2">
              <p className="modal-attr">Long Description</p>
              <p className="modal-val">{description}</p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Short Description</p>
              <p className="modal-val">{shortDescription}</p>
            </div>

            <div className="mt-2">
            <p className="modal-attr">Tags</p>
          {tags.map((tag,index) => (
            <Badge key={index} bg="success" className="me-1">{tag}</Badge>
          ))}
            </div>

          </div>
    


          <div className="col-md-6">
            <div className="mt-2">
              <p className="modal-attr">Price ( $ )</p>
              <p className="modal-val">{NumberAdjustment(Price)}</p>
            </div>

         

            <div className="mt-2">
              <p className="modal-attr">Discount Price ( $ )</p>
              <p className="modal-val">{NumberAdjustment(NumberAdjustment(Price) - (NumberAdjustment(Price) * NumberAdjustment(discount) / 100.00))}</p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Category</p>
              <p className="modal-val">{Category}</p>
            </div>

            <div className="mt-2">
              <p className="modal-attr">Stock Quantity ( units )</p>
              <p className="modal-val">{Quantity}</p>
            </div>

      

            <h6 className='modal-attr'>Shipping Type</h6>
            <p className='modal-val'>{shippingType == "By_quantity" || shippingType == "by quantity" ? "By Quantity" : "By Weight"}</p>


            {shippingType == "by weight" && (
              <>
              <h6 className='modal-attr'>Product Weight</h6>
              <p className='modal-val'>{NumberAdjustment(ProductWeight)}g</p>

              </>
            )} 




           

          </div>

    

          <div className='row '>
            {shippingCosts.map((cost,index) => (
              <div className='col-md-2 py-4 text-right' key={index}>
                <h6 className='title-sub-main-modal'>{`${cost.shippingRegion == "North_America" ? "North America" : cost.shippingRegion == "South_America" ? "South America" : cost.shippingRegion} Region`}</h6>
                 <p className='text-value'>${NumberAdjustment(cost.shippingCost)}</p>
              </div>
            ))}
          </div>

          

          <div className="col-md-12 text-center">

         
          
            <button onClick={() => {
             handleshowDisapproved()
              setshowComSection(true)
            }} type="button" className="btn btn-lg btn-outline-danger btn-sm mx-1 ">
             Disapprove
            </button>
           

            <button onClick={() =>{
              handleActivateProduct(ProductID)
              setshowComSection(false)
            }} type="button" className="btn btn-lg btn-outline-success btn-sm mx-1">
              Approve
            </button>
      
          </div>



        </div>
        
      </div>

    </div>
  </Modal>
   


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
<Modal  show={showImageSlider} onHide={handleImageSlider}>
<div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Product Images</h1>
        <button type="button" className="btn-close" onClick={handleImageSlider}></button>
      </div>
      <div className="modal-body">
        
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          
          {images.map((image,index) => (
          <div key={index} className={`carousel-item ${index == 0 ? 'active' : ''}`}>
            <img src={`https://miracleisland.tk:2053/assets/images/product_images/${image}`} className="d-block w-100" alt="..." />
          </div>
          ))}

          
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

   
  </Modal>


  <Modal  show={showDisapproved} onHide={handleshowDisapproved}>
  
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Disapprove Product</h5>
        <button type="button" className="btn-close" onClick={handleshowDisapproved}></button>
      </div>

      <div className="modal-body">
      <div className="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label">Add Comment</label>
              <textarea onChange={(e) => setcomment(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
      </div>

      <div className="modal-footer">
              <button onClick={() => handleDeActiveProduct(comment,ProductID)} type="button" className="btn btn-danger mx-auto text-center my-1">Disapprove</button>

      </div>
      
    </div>
  
  </Modal>


    
    </>
  );
};
