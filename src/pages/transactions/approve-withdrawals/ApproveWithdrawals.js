
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Badge, Button, Container } from '@themesberg/react-bootstrap';

import { ApprovalRequestedWithdrwals ,  GetAllRequestedWithdrwals , DispprovalRequestedWithdrwals , FilterAllWithdrwalsOnlyDate } from "../../../api";
import Pagination from "../../../components/Pagination";

import Loading from "../../../components/Loading";
import ToastComponent from "../../../components/ToastComponent";
import NumberAdjustment from '../../../functions/NumberAdjustment'
import { Modal } from 'react-bootstrap'
import { ErrorToast } from "../../../functions/Toast";
import NotFoundItem from "../../../components/NotFoundItem";
import LoadingBtn from "../../../components/LoadingBtn/LoadingBtn";
import Swal from 'sweetalert2';

export default () => {

  
  const [currentPage, setcurrentPage] = useState(1)
  const [withdrawals, setwithdrawals] = useState([])
  const [sellersPerPage] = useState(10)
  const [comment, setcomment] = useState("")
  const [showDisapproved, setshowDisapproved] = useState(false)
  const [showDiapproveBtnLoading, setshowDiapproveBtnLoading] = useState(false)
  const [currentWithdrawalID, setcurrentWithdrawalID] = useState("")
  const [notfound, setnotfound] = useState(false)
  const [startDate, setstartDate] = useState("")
  const [endDate, setendDate] = useState("")

  useEffect(() => {

    // setInterval(() => {
      
      GetAllRequestedWithdrwals(setwithdrawals,setnotfound)
    // }, 60000);


  }, [])

  // withdrawals
  const handleshowDisapproved = () => setshowDisapproved(!showDisapproved);


  // Disapprove Withdrawls
  const handleDisapproveWithdrawals = () =>{

    if(comment == ""){
      ErrorToast("Please Add A Comment")
      return
    }

    if(currentWithdrawalID != ""){

      Swal.fire({
        title: 'Are you sure?',
        text: "Do You Want to Disppove Withdrawal",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Disaprove it!'
      }).then((result) => {
        if (result.isConfirmed) {

          DispprovalRequestedWithdrwals(currentWithdrawalID,comment,setcomment,setshowDisapproved,setshowDiapproveBtnLoading)
          GetAllRequestedWithdrwals(setwithdrawals,setnotfound)
          // Swal.fire(
          //   'Deleted!',
          //   'Your file has been deleted.',
          //   'success'
          // )
        }
      })
      
      // let text = "Are You Sure You Want To Disapprove Withdrawal";
      // if (window.confirm(text) == true) {
  
      // DispprovalRequestedWithdrwals(currentWithdrawalID,comment,setcomment,setshowDisapproved,setshowDiapproveBtnLoading)
  
      // }
  
      // GetAllRequestedWithdrwals(setwithdrawals,setnotfound)

    }

   

 
  }

  // Approve Withdrawls
  const handleApproveWithdrawals = (ID) =>{

    Swal.fire({
      title: 'Are you sure?',
      text: "Do You Want to Approve Withdrawal",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve it!'
    }).then((result) => {
      if (result.isConfirmed) {
      
        ApprovalRequestedWithdrwals(ID)
        GetAllRequestedWithdrwals(setwithdrawals,setnotfound)

      }
    })

    // let text = "Are You Sure You Want To Approve Withdrawal";

    // if (window.confirm(text) == true) {

    //     ApprovalRequestedWithdrwals(ID)
   
    // }
    // GetAllRequestedWithdrwals(setwithdrawals,setnotfound)

  }

  // Filter
  const filterSearch = () =>{

    if(startDate == "" || endDate == ""){
      ErrorToast("Please Fill All Fields")
      return
    }

    FilterAllWithdrwalsOnlyDate(startDate,endDate,setwithdrawals,setnotfound)

  }

  
    // Pagination Orders
    const indexofLastOrder = currentPage * sellersPerPage;
    const indexofFirstOder = indexofLastOrder - sellersPerPage;
    const currentSellers = withdrawals.slice(indexofFirstOder , indexofLastOrder)
  
  
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

            <h2>Approve Withdrawals</h2>

            <form className="row">

              <div className="col-md-4">

              <div className="form-group">
                <label>Start Date</label>
                <input onChange={(e) => setstartDate(e.target.value)} type="date" className="form-control"  placeholder="Enter Start Date" />
              </div>

              </div>


            <div className="col-md-4">
              <div className="form-group">
                <label>End Date</label>
                <input onChange={(e) => setendDate(e.target.value)} type="date" className="form-control"  placeholder="Enter End Date" />
              </div>
              </div>

              <div className="form-group col-md-2 mt-4">
              <button onClick={filterSearch} type="button" className="btn btn-success">Search</button>
              </div>


            </form>
         
          </div>
        </div>

        </div>



        {/* All Seller */}
        <div className="col-md-12">
        <div className="card">

        {notfound ? <NotFoundItem title="Withdrawals Not Found" /> :currentSellers.length > 0 ? (

          <div className="card-body">
             <div className="table-responsive">
          <table className="table">
          <thead>
            <tr>
              <th scope="col">Account No</th>
              <th scope="col">Account Name</th>
              <th scope="col">Amount( $ )</th>
              <th scope="col">Bank</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>

            {withdrawals.map((withdrawal,index) => (

            <tr key={index}>
              <th>{withdrawal.accNo}</th>
              <td>{withdrawal.accName}</td>
              <td>{NumberAdjustment(withdrawal.amount)}</td>
              <td>{withdrawal.bank}</td>
              <td>{withdrawal.date}</td>
             
              <td>

                <button onClick={() => {
                  // handleDisapproveWithdrawals(withdrawal.sellerId)
                  setcurrentWithdrawalID(withdrawal.sellerId)
                  handleshowDisapproved()
                }} type="button" className="btn btn-outline-danger btn-sm mx-1">
                <i className="fa-sharp fa-solid fa-ban"></i>
                </button>

                <button onClick={() =>{
                    handleApproveWithdrawals(withdrawal.sellerId)
                }} type="button" className="btn btn-outline-success btn-sm mx-1">
                <i className="fa-solid fa-check"></i>
                </button>
          
              

              </td>
            </tr>
            ))}
      
          </tbody>
        </table>
        </div>
                
          </div>

        ) :(
          <Loading />
        )
        }


          <Pagination productsPerPage={sellersPerPage} totalProducts={withdrawals.length} paginate={paginate} />
        </div>


        </div>
      </div>


  <Modal show={showDisapproved} onHide={handleshowDisapproved}>
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title">Disapprove Withdrawal</h5>
      <button type="button" className="btn-close" onClick={handleshowDisapproved}></button>
    </div>

    <div className="modal-body">
    <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">Add Comment</label>
            <textarea onChange={(e) => setcomment(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
    </div>

    <div className="modal-footer">
      {showDiapproveBtnLoading ? (

       <LoadingBtn btnColor="btn btn-danger" />

      ) : (
        <button onClick={handleDisapproveWithdrawals} type="button" className="btn btn-danger mx-auto text-center my-1">Disapprove</button>
      )}
    </div>
  </div>
</Modal>





    
    </>
  );
};
