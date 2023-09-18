import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";
import jwt_decode from "jwt-decode";
import { useHistory  } from 'react-router-dom'

// pages
import Presentation from "./Presentation";
// import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";


import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./authentication/NotFound";
import ServerError from "./examples/ServerError";

// Authentication
import Signin from "./authentication/Signin";
import Signup from "./authentication/Signup";
import ForgotPassword from "./authentication/ForgotPassword";


// Dashboard
import AllSeller from './dashboard/seller/AllSeller';
import TopSellers from './dashboard/seller/TopSellers';
import AllBuyer from  './dashboard/buyer/AllBuyer';
import TopBuyers from './dashboard/buyer/TopBuyer';

// Products
import AllProducts from './dashboard/products/AllProducts';
import ActivateProducts from './dashboard/products/ActivateProducts';
import TopProducts from './dashboard/products/TopProducts';

// Admins
import AllAdmins from './dashboard/admin/AllAdmins';
import AddAdmin from './dashboard/admin/AddAdmin';

// Manage Trsanactions
import AllWithdrawals from './transactions/approve-withdrawals/AllWithdrawals';
import ApproveWithdrawals from './transactions/approve-withdrawals/ApproveWithdrawals';


// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";




const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  let CURRENT_USER = JSON.parse(localStorage.getItem("miracle_island_admin"))
    
  // Rediect if user is not available
  useEffect(() => {
    
    if(CURRENT_USER == null){

      return () =>{
        window.location.href = "/signin?sessionLogout=true"
      }
      
   }else{

    return () =>{
      window.location.href = "/"
    }

   }
  },[CURRENT_USER])
  


  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);
  const [accessTokenExp, setAccessTokenExp] = useState();

  let history = useHistory();



  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }


  



  // Get the User Is Login or NOT to Rediect
  useEffect(() => {

    try {
      
      const accessToken = localStorage.getItem("miracle_island_admin");

      let decodedAccessToken = '';
  
      if(accessToken == null){
  
        decodedAccessToken = ''
        history('/signin')
  
      }else{
        
         decodedAccessToken = jwt_decode(JSON.parse(accessToken).token);
      }
  
      if (decodedAccessToken) {
        setAccessTokenExp(decodedAccessToken.exp * 1000); // Convert expiration time from seconds to milliseconds
      }
      
      const timeUntilExp = accessTokenExp - Date.now();
  
      if(isNaN(timeUntilExp)){
        console.log("NOT A NUMBER")
      }else{
  
      if (timeUntilExp < 0) {
        logout();
        return;
      }
  
        console.log(timeUntilExp)
      }
  


    } catch (error) {
      if (error.message === "Invalid token specified") {
        
        localStorage.removeItem("miracle_island_admin");
        history('/signin?sessionTimeout=true')

      } else {
        localStorage.removeItem("miracle_island_admin");
        history('/signin?sessionTimeout=true')
      }
    }
   
  });


  function logout() {
    localStorage.removeItem("miracle_island_admin");
    return history('/signin?sessionTimeout=true')

  }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />

        <main className="content">
          <Navbar />
          <Component {...props} />
          {/* <Footer toggleSettings={toggleSettings} showSettings={showSettings} /> */}
        </main>
      </>
    )}
    />
  );
};

export default () => (



  <Switch>
 
    <RouteWithLoader exact path={Routes.Presentation.path} component={Presentation} />
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
    <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />
    
 
    {/* Dashboard */}
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    <RouteWithSidebar exact path={Routes.AllSeller.path} component={AllSeller} />
    <RouteWithSidebar exact path={Routes.TopSeller.path} component={TopSellers} />
    <RouteWithSidebar exact path={Routes.AllBuyer.path} component={AllBuyer} />
    <RouteWithSidebar exact path={Routes.TopBuyer.path} component={TopBuyers} />

    {/* Products */}
    <RouteWithSidebar exact path={Routes.AllProducts.path} component={AllProducts} />
    <RouteWithSidebar exact path={Routes.ActivateProducts.path} component={ActivateProducts} />
    <RouteWithSidebar exact path={Routes.TopProducts.path} component={TopProducts} />

    {/* Admins */}
    <RouteWithSidebar exact path={Routes.AllAdmins.path} component={AllAdmins} />
    <RouteWithSidebar exact path={Routes.AddAdmin.path} component={AddAdmin} />


    {/* Managae Trsanactions */}
    <RouteWithSidebar exact path={Routes.AllWithdrawals.path} component={AllWithdrawals} />
    <RouteWithSidebar exact path={Routes.ApproveWithdrawals.path} component={ApproveWithdrawals} />
    



    
    {/* pages */}
    <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />





    {/* components */}
    <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} />
    <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
    <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
    <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
    <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
    <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
    <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
    <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
    <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
    <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} />
    <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
    <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
    <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
    <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
    <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
    <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />

  <Redirect to={Routes.NotFound.path} />
  </Switch>
);
