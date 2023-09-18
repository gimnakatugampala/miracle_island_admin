
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield , faFlagUsa,faAngleUp,faFolderOpen, faGlobeEurope  } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup , Card, Image, ListGroup, ProgressBar } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import ToastComponent from "../../components/ToastComponent";

import { Chart } from "react-google-charts";
import useQuery from "../../functions/SearchQ";


import './style.css'
import { SuccessToast } from "../../functions/Toast";
import { DashboardCompletedOrderCount, DashboardProductsApprovalCount, DashboardTotalSellerCount, DashboardWithdrawalCount , DashboardRevenue } from "../../api";

export default () => {

  

  let query = useQuery();
  const [totalSeller, settotalSeller] = useState("")
  const [withdrawlApproval, setwithdrawlApproval] = useState("")
  const [productsApproval, setproductsApproval] = useState("")
  const [orderCompleted, setorderCompleted] = useState("")
  const [revenue, setrevenue] = useState("")

  useEffect(() => {

    let CURRENT_USER = JSON.parse(localStorage.getItem("miracle_island_admin"))

    if(CURRENT_USER == null){
      window.location.href = "/signin"
  
  }


    if(query.get("success")){
      SuccessToast('User LoggedIn !')
    }

    // Dashbaord
    DashboardTotalSellerCount(settotalSeller)
    DashboardWithdrawalCount(setwithdrawlApproval)
    DashboardProductsApprovalCount(setproductsApproval)
    DashboardCompletedOrderCount(setorderCompleted)
    DashboardRevenue(setrevenue)
    
  }, [])

  // Seller Data
   const SellerTotalData = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
  ];

  const SellerTotaloptions = {
    chart: {
      title: "Total Sellers",
      subtitle: "This Data is Gathered from Last Week",
    },
  }

  // Active Sellers Data
  const SellerActiveData = [
    ["Element", "Density", { role: "style" }],
    ["Copper", 8.94, "#b87333"], 
    ["Silver", 10.49, "silver"], 
    ["Gold", 19.3, "gold"],
    ["Platinum", 21.45, "color: #e5e4e2"], 
  ];

  const SellerActiveoptions = {
    
      title: "Total Revenue",
      subtitle: "This Data is Gathered from Last Week",
    
  }


  // Total Buyer Data
  const BuyerTotalData = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
  ];

  const BuyerTotaloptions = {
    chart: {
      title: "Total Buyers",
      subtitle: "This Data is Gathered from Last Week",
    },
  }

    // Ordered Data
    const NoofOrdersData = [
      [
        "Month",
        "Bolivia",
        "Ecuador",
        "Madagascar",
        "Papua New Guinea",
        "Rwanda",
        "Average",
      ],
      ["2004/05", 165, 938, 522, 998, 450, 614.6],
      ["2005/06", 135, 1120, 599, 1268, 288, 682],
      ["2006/07", 157, 1167, 587, 807, 397, 623],
      ["2007/08", 139, 1110, 615, 968, 215, 609.4],
      ["2008/09", 136, 691, 629, 1026, 366, 569.6],
    ];
  
    const NoofOrdersoptions = {
   

      title: "No of Orders",
      subtitle: "This Data is Gathered from Last Week",
      vAxis: { title: "Cups" },
      hAxis: { title: "Month" },
      seriesType: "bars",
      series: { 5: { type: "line" } },
    }



    // Total Product Data
  const ProductTotalData = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
  ];

  const ProductTotaloptions = {
    chart: {
      title: "Total Products",
      subtitle: "Total Products Sold By Sellers",
    },
  }

    // Product Categories Data
    const ProductCategoriesData = [
      ["Pizza", "Popularity"],
      ["Pepperoni", 33],
      ["Hawaiian", 26],
      ["Mushroom", 22],
      ["Sausage", 10], // Below limit.
      ["Anchovies", 9], // Below limit.
    ];
    const ProductCategoriesoptions = {
      
        title: "Most Sold Products By Product Categories",
    
    
    }


    // Buyer Based on Country Data
  const BuyerBasedOnCountryData = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7], // CSS-style declaration
  ];

  const BuyerBasedOnCountryoptions = {
    title: "Buyers Based On Country",
    pieStartAngle: 100,
  }

    // Sub Categories Data
    const SubCategoriesData = [
      ["Pizza", "Popularity"],
      ["Pepperoni", 33],
      ["Hawaiian", 26],
      ["Mushroom", 22],
      ["Sausage", 10], // Below limit.
      ["Anchovies", 9], // Below limit.
    ];
  
    const SubCategoriesptions = {
      title: "Most Sold Products By Sub Categories",
      pieHole: 0.4,
      is3D: false,
    }


  return (
    <>
  <div className="row">
    <ToastComponent />
    {/* Sellers */}
    <a href="/allsellers" className="col-md-3 my-1">
    <Card border="light" className="shadow-sm">
      <Card.Body className="dashboard-card-container">
        {/* <div className="d-flex align-items-center justify-content-between py-1"> */}
          <div>
            <h6 className="mb-0 dashboard-title"><i class="fa-sharp fa-solid fa-users me-2"></i> Total Sellers</h6>
            {/* <div className="small card-stats text-sm">
              From Last 7 Days 
            </div> */}
          </div>
        {/* </div> */}
          <div >
            <Card.Link href="#top" className="text-primary fw-bold">
              {totalSeller == "" ? "0" : totalSeller}
            </Card.Link>
          </div>
  </Card.Body>
    </Card>
    </a>

    <a href="/approve-withdrawals" className="col-md-3 my-1">
    <Card border="light" className="shadow-sm">
      <Card.Body className="dashboard-card-container">
        {/* <div className="d-flex align-items-center justify-content-between py-1"> */}
          <div>
            <h6 className="mb-0 dashboard-title"><i className="fa-sharp fa-solid fa-hand-holding-dollar me-2"></i> Withdraw Approval</h6>
            {/* <div className="small card-stats text-sm">
              From Last 7 Days 
            </div> */}
          </div>
        {/* </div> */}
          <div>
            <Card.Link href="#top" className="text-primary fw-bold">
              {withdrawlApproval == "" ? "0" :withdrawlApproval} 
            </Card.Link>
          </div>
  </Card.Body>
    </Card>
    </a>

    <a href="/activateproducts" className="col-md-3 my-1 ">
    <Card border="light" className="shadow-sm">
      <Card.Body className="dashboard-card-container">
        {/* <div className="d-flex align-items-center justify-content-between py-1"> */}
          <div>
            <h6 className="mb-0 dashboard-title"><i className="fa-sharp fa-solid fa-hammer me-3"></i> Approval Products</h6>
            {/* <div className="small card-stats text-sm">
            From Last 7 Days 
            </div> */}
          </div>
        {/* </div> */}
          <div>
            <Card.Link href="#top" className="text-primary fw-bold">
              {productsApproval == "" ? "0" : productsApproval}
            </Card.Link>
          </div>
  </Card.Body>
    </Card>
    </a>

    <div className="col-md-3 my-1">
    <Card border="light" className="shadow-sm">
      <Card.Body className="dashboard-card-container">
        {/* <div className="d-flex align-items-center justify-content-between py-1"> */}
          <div>
            <h6 className="mb-0 dashboard-title"><i className="fa-sharp fa-solid fa-eye me-2"></i> Revenue</h6>
            {/* <div className="small card-stats text-sm">
              Last 24 Hours  
            </div> */}
          </div>
        {/* </div> */}
          <div>
            <Card.Link href="#top" className="text-primary fw-bold">
              {revenue == "" ? "0" : revenue}
            </Card.Link>
          </div>
  </Card.Body>
    </Card>
    </div>

    {/* Buyer */}
    {/* <div className="col-md-3 my-1">
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between py-1">
          <div>
            <h6 className="mb-0"><i className="fa-sharp fa-solid fa-user-tag me-2"></i> Total Buyers</h6>
            <div className="small card-stats text-sm">
              From Last 7 Days 
            </div>
          </div>
          <div>
            <Card.Link href="#top" className="text-primary fw-bold">
              32
            </Card.Link>
          </div>
        </div>
  </Card.Body>
    </Card>
    </div> */}

    {/* <div className="col-md-3 my-1">
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between py-1">
          <div>
            <h6 className="mb-0"><i className="fa-sharp fa-solid fa-person-circle-check me-2"></i> Pending Orders</h6>
            <div className="small card-stats text-sm">
              From Last 7 Days 
            </div>
          </div>
          <div>
            <Card.Link href="#top" className="text-primary fw-bold">
              32 
            </Card.Link>
          </div>
        </div>
  </Card.Body>
    </Card>
    </div> */}

    <div className="col-md-3 my-1">
    <Card border="light" className="shadow-sm">
      <Card.Body className="dashboard-card-container">
        {/* <div className="d-flex align-items-center justify-content-between py-1"> */}
          <div>
            <h6 className="mb-0 dashboard-title"><i className="fa-sharp fa-solid fa-check me-3"></i> Completed Orders</h6>
            {/* <div className="small card-stats text-sm">
            From Last 7 Days 
            </div> */}
          </div>
        {/* </div> */}

          <div>
            <Card.Link href="#top" className="text-primary fw-bold">
              {orderCompleted == "" ? "0" : orderCompleted}
            </Card.Link>
          </div>
  </Card.Body>
    </Card>
    </div>

    {/* <div className="col-md-3 my-1">
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between py-1">
          <div>
            <h6 className="mb-0"><i className="fa-sharp fa-solid fa-calendar me-2"></i> Cancel Orders</h6>
            <div className="small card-stats text-sm">
              Last 24 Hours  
            </div>
          </div>
          <div>
            <Card.Link href="#top" className="text-primary fw-bold">
              32 
            </Card.Link>
          </div>
        </div>
  </Card.Body>
    </Card>
    </div> */}

 

  
    
    </div>

    {/* Charts */}
    <div className="row">

      {/* Seller Total */}
      {/* <div className="col-md-6 my-1">
      <Card border="light" className="shadow-sm">
          <Card.Body>

          <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Weekly</button>
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Monthly</button>
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Yearly</button>
         </div>

          <Chart
          chartType="Bar"
          width="100%"
          height="100%"
          data={SellerTotalData}
          options={SellerTotaloptions}
        />

    

      </Card.Body>
      </Card>
      </div> */}


      {/* Active Sellers */}
      {/* <div className="col-md-6 my-1">
      <Card border="light" className="shadow-sm">
        <Card.Body>

        <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Weekly</button>
            <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Monthly</button>
            <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Yearly</button>
        </div>

          <Chart
          chartType="ColumnChart"
          width="100%"
          height="100%"
          data={SellerActiveData}
          options={SellerActiveoptions}
        />


   
      </Card.Body>
      </Card>
      </div> */}


      {/* Total Buyer */}
      {/* <div className="col-md-6 my-1">
      <Card border="light" className="shadow-sm">
          <Card.Body>

          <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Weekly</button>
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Monthly</button>
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Yearly</button>
         </div>

          <Chart
          chartType="Bar"
          width="100%"
          height="100%"
          data={BuyerTotalData}
          options={BuyerTotaloptions}
        />
   
      </Card.Body>
      </Card>
      </div> */}
      

       {/* No of Orfers */}
       {/* <div className="col-md-6 my-1">
      <Card border="light" className="shadow-sm">
          <Card.Body>

          <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Weekly</button>
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Monthly</button>
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Yearly</button>
         </div>

          <Chart
          chartType="ComboChart"
          width="100%"
          height="100%"
          data={NoofOrdersData}
          options={NoofOrdersoptions}
        />
   
      </Card.Body>
      </Card>
      </div> */}


      {/* Total Products */}
      {/* <div className="col-md-6 my-1">
      <Card border="light" className="shadow-sm">
          <Card.Body>

          <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Weekly</button>
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Monthly</button>
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Yearly</button>
         </div>

          <Chart
          chartType="Bar"
          width="100%"
          height="100%"
          data={ProductTotalData}
          options={ProductTotaloptions}
        />
   
      </Card.Body>
      </Card>
      </div> */}

      {/* Product Category */}
      {/* <div className="col-md-6 my-1">
      <Card border="light" className="shadow-sm">
          <Card.Body>

          <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Weekly</button>
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Monthly</button>
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Yearly</button>
         </div>

          <Chart
          chartType="PieChart"
          width="100%"
          height="100%"
          data={ProductCategoriesData}
          options={ProductCategoriesoptions}
        />
   
      </Card.Body>
      </Card>
      </div> */}


      {/* Buyer Based On Buyer */}
      {/* <div className="col-md-6 my-1">
      <Card border="light" className="shadow-sm">
          <Card.Body>

          <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Weekly</button>
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Monthly</button>
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Yearly</button>
         </div>

          <Chart
          chartType="PieChart"
          width="100%"
          height="100%"
          data={BuyerBasedOnCountryData}
          options={BuyerBasedOnCountryoptions}
        />
   
      </Card.Body>
      </Card>
      </div> */}

      {/* Sub Categories Products */}
      {/* <div className="col-md-6 my-1">
      <Card border="light" className="shadow-sm">
          <Card.Body>

          <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Weekly</button>
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Monthly</button>
              <button type="button" className="btn btn-primary btn-sm mx-1 my-1">Yearly</button>
         </div>

          <Chart
          chartType="PieChart"
          width="100%"
          height="100%"
          data={SubCategoriesData}
          options={SubCategoriesptions}
        />
   
      </Card.Body>
      </Card>
      </div> */}



    </div>
  
      

    </>
  );
};
