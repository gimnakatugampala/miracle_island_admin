
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Badge, Button, Container } from '@themesberg/react-bootstrap';

import { FilterAllWithdrwals , GetAllWithdrwals } from "../../../api";
import Pagination from "../../../components/Pagination";
import moment from 'moment'

import Loading from "../../../components/Loading";
import ToastComponent from "../../../components/ToastComponent";
import NumberAdjustment from '../../../functions/NumberAdjustment'
import { Modal } from 'react-bootstrap'
import { ErrorToast } from "../../../functions/Toast";
import NotFoundItem from "../../../components/NotFoundItem";
import LoadingBtn from "../../../components/LoadingBtn/LoadingBtn";


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
  const [selectStatus, setselectStatus] = useState("")

  useEffect(() => {

    // setInterval(() => {
        GetAllWithdrwals(setwithdrawals,setnotfound)
    // }, 2000);


  }, [])
  
  

// Filter 
const searchFilter = () =>{

    if(startDate == "" || endDate == "" || selectStatus ==""){
        ErrorToast("Please Fill All Fields !")
        return
    }

    FilterAllWithdrwals(selectStatus,startDate,endDate,setwithdrawals,setnotfound)

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

            <h2>All Withdrawals</h2>

            <form className="row">

            <div className="col-md-2">
                <div className="form-group">
                <label>Select State</label>
                <select onChange={(e) => setselectStatus(e.target.value)} className="form-select" aria-label="Default select example">
                  <option selected>Select Status</option>
                  <option value="1">Requested</option>
                  <option value="2">Approve</option>
                  <option value="4">Disapproved</option>
                </select>
                </div>
              </div>

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
              <button onClick={searchFilter}  type="button" className="btn btn-success">Search</button>
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
              <th scope="col">ID</th>
              <th scope="col">Account No</th>
              <th scope="col">Account Name</th>
              <th scope="col">Amount( $ )</th>
              <th scope="col">Bank</th>
              <th scope="col">Status</th>
              <th scope="col">Reason</th>
              <th scope="col">Date</th>
         
            </tr>
          </thead>
          <tbody>

            {withdrawals.map((withdrawal,index) => (

            <tr key={index}>
              <th>{index+1}</th>
              <th>{withdrawal.accNo}</th>
              <td>{withdrawal.accName}</td>
              <td>{NumberAdjustment(withdrawal.amount)}</td>
              <td>{withdrawal.bank}</td>
              <td>{ withdrawal.withdrawalStatus == "Canceled" ? 
        (<span className="badge bg-danger">Canceled</span>) : withdrawal.withdrawalStatus == "Disapprove" ? (<span className="badge bg-danger">Disapproved</span>) : withdrawal.withdrawalStatus == "Requested" ? (<span className="badge bg-primary">Requested</span>) :  withdrawal.withdrawalStatus == "Approved" ? (<span className="badge bg-success">Approved</span>) : <></>}</td>
              <td>{withdrawal.note == null ? "" : withdrawal.note}</td>

              <td>{withdrawal.date}</td>
            
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


  {/* <Modal show={showDisapproved} onHide={handleshowDisapproved}>
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
        <button type="button" className="btn btn-danger mx-auto text-center my-1">Disapprove</button>
      )}
    </div>
  </div>
</Modal> */}





    
    </>
  );
};
