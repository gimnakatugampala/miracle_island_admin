import { ErrorToast , InfoToast, SuccessToast } from "../functions/Toast";

const CURRENT_USER = JSON.parse(localStorage.getItem("miracle_island_admin"))


// Unauthorized
const SessionExpired = (result) =>{

  if(result == 401){
    localStorage.removeItem("miracle_island_admin");
    window.location.href = "/signin?sessionLogout=true"
  }

}


export const LoginUser = async(email,password,history,setLoading) =>{

  setLoading(true)

    var formdata = new FormData();
    formdata.append("username", `${email}`);
    formdata.append("password", `${password}`);
    // Admin#124
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    
    fetch("https://miracleisland.tk:2053/miracleIslandadmin/admin-profile/login", requestOptions)
      .then(response => response.json())
      .then(result => {

        
        if(result.status == "OK"){

            let user = {
                "id":result.id,
                "email":result.email,
                "token":result.jwtToken,
                "name":result.name,

            }

            localStorage.setItem("miracle_island_admin", JSON.stringify(user));
            history.push("/?success=true")
            window.location.reload()

            return
        }

        // Incorrect Credentials
        if(result.message != ''){
          ErrorToast("Password Or Email is Invalid")
          setLoading(false)
        }

      })
      .catch(error => {
        ErrorToast("Password Or Email is Invalid")
        setLoading(false)
      });


    
  
}
  

export const AddAdmin = async(first_name, last_name,email,password,confirm_password,setfirst_name,setlast_name,setemail,setpassword,setconfirm_password) =>{

    var formdata = new FormData();
    formdata.append("firstName", `${first_name}`);
    formdata.append("lastName", `${last_name}`);
    formdata.append("email", `${email}`);
    formdata.append("password", `${password}`);
    formdata.append("confirmPassword", `${confirm_password}`);
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("https://miracleisland.tk:2053/miracleIslandadmin/admin-profile/register", requestOptions)
      .then(response => response.json())
      .then(result => {

        console.log(result)

        SessionExpired(result.status)

        if(result.responsecode == "200"){

            SuccessToast("Admin Created !")

            setfirst_name("")
            setlast_name("")
            setemail("")
            setpassword("")
            setconfirm_password("")

        }else if(result.message == "Invalid Type of Email"){

            ErrorToast("Invalid Type of Email")

        }else if(result.variable = "Invalid Password"){
            ErrorToast("Password should br Minimum eight character engliish letter, one number and one special character")

        }else if(result.variable = "The Given Email Already Registered as aseller"){
            ErrorToast("Password should br Minimum eight character engliish letter, one number and one special character")
        }


     

      })
      .catch(error => console.log(error));

    
  
}
  

export const getAllAdmins = async(setadmins,setnotfound) =>{

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://miracleisland.tk:2053/miracleIslandadmin/admin-profile/get-all", requestOptions)
    .then(response => response.json())
    .then(result => {

      SessionExpired(result.status)

      if (!result.ok) {

        if(result.status == "401"){

          // return <Redirect to="/login" />

          throw new Error('Failed to load resource: the server responded with a status of ' + result.status);
        }

      }

      if(result.length > 0){

        setnotfound(false)
        setadmins(result.sort((a,b) => new Date(b.date) - new Date(a.date)))

      }else{
        setnotfound(true)
      }

    })
    .catch(error => console.log(error));
}


export const DeactivateAdmin = async(admin_id,getAllAdmins,setadmins,setnotfound) =>{

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`https://miracleisland.tk:2053/miracleIslandadmin/admin-profile/deactivate/${admin_id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
            console.log(result)

            SessionExpired(result.status)

            if(result.responsecode == 200){
                ErrorToast(result.response)
                getAllAdmins(setadmins,setnotfound)
            }

      })
      .catch(error => console.log(error));
}


export const ActivateAdmin = async(admin_id,getAllAdmins,setadmins,setnotfound) =>{

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`https://miracleisland.tk:2053/miracleIslandadmin/admin-profile/activate/${admin_id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
            console.log(result)

            SessionExpired(result.status)

            if(result.responsecode == 200){
                SuccessToast(result.response)
                getAllAdmins(setadmins,setnotfound)

            }

      })
      .catch(error => console.log(error));
}


export const GetAllProducts = async(setproducts,setnotfound) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);


var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://miracleisland.tk:2053/miracleIslandadmin/products/get-all-products", requestOptions)
  .then(response => response.json())
  .then(result => {

    SessionExpired(result.status)

    if(result.length > 0){

      setproducts(result.sort((a,b) => new Date(b.date) - new Date(a.date)))
      console.log(result)
      setnotfound(false)

    }else{
      setnotfound(true)
    }

  })
  .catch(error => console.log(error));


}


export const GetAllSellers = async(setsellers,setnotfound) =>{


    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://miracleisland.tk:2053/miracleIslandadmin/sellers/get/all", requestOptions)
      .then(response => response.json())
      .then(result => {

        console.log(result)

        SessionExpired(result.status)

        // Unauthorized
        // Unauthorized(result.status)
        
        if(setnotfound.length > 0){
          setsellers(result.sort((a,b) => new Date(b.date) - new Date(a.date)))
          setnotfound(false)
        }else{
          setnotfound(true)
        }

    })
      .catch(error => console.log(error));
}



export const DeactivateSellers = async(ID,GetAllSellers,setsellers,setnotfound) =>{

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
      
      fetch(`https://miracleisland.tk:2053/miracleIslandadmin/sellers/deactivate/${ID}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)

            SessionExpired(result.status)

            if(result.responsecode == 200){
                ErrorToast(result.response)
                GetAllSellers(setsellers,setnotfound)     
            }

            GetAllSellers(setsellers,setnotfound)     
            
        })
        .catch(error => console.log(error));

}

export const ActivateSellers = async(ID,GetAllSellers,setsellers) =>{


    var myHeaders = new Headers();
    myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`https://miracleisland.tk:2053/miracleIslandadmin/sellers/activate/${ID}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)

        SessionExpired(result.status)
        
        // GetAllSellers(setsellers)     
        if(result.responsecode == 200){
            SuccessToast(result.response)
            GetAllSellers(setsellers)     
          }
      })
      .catch(error => console.log(error));

}


export const AllBuyers = async(setbuyers,setnotfound) =>{


    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://miracleisland.tk:2053/miracleIslandadmin/buyers/get-all-buyers", requestOptions)
    .then(response => response.json())
    .then(result => {

      SessionExpired(result.status)

      if(result.length > 0){
        setnotfound(false)
        setbuyers(result.sort((a,b) => new Date(b.date) - new Date(a.date)))
      }else{
        setnotfound(true)
      }

    })
    .catch(error => console.log(error));

  


}

export const ActivateBuyer = async(ID) =>{

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`https://miracleisland.tk:2053/miracleIslandadmin/buyers/activate/${ID}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      SessionExpired(result.status)

      if(result.responsecode == 200){
        SuccessToast(result.response)
      }
    })
    .catch(error => console.log(error));


}


export const DeactivateBuyer = async(ID) =>{

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
    };
      
      fetch(`https://miracleisland.tk:2053/miracleIslandadmin/buyers/deactivate/${ID}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)

          SessionExpired(result.status)

          if(result.responsecode == 200){
            ErrorToast(result.response)
          }

        })
        .catch(error => console.log(error));


}

export const DeactivateProduct = async(comment,ID,setshowProductDetails,setcomment,setshowDisapproved) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);


  
  var formdata = new FormData();
  formdata.append("id", `${ID}`);
  formdata.append("note", `${comment}`);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`https://miracleisland.tk:2053/miracleIslandadmin/products/product/un-publish/`, requestOptions)
    .then(response => response.json())
    .then(result => {

      SessionExpired(result.status)

      if(result.responsecode == 200){
        SuccessToast(result.response)
        setshowProductDetails(false)
        setshowDisapproved(false)
        setcomment('')
      }
      console.log(result)
    })
    .catch(error => console.log(error));


}

export const ActivateProduct = async(ID,setshowProductDetails) =>{

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
    };
      
    fetch(`https://miracleisland.tk:2053/miracleIslandadmin/products/product/publish/${ID}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)

    SessionExpired(result.status)

    if(result.variable == "The selected product not in approval state"){
      ErrorToast(result.message)
      return
    }

    if(result.responsecode == 200){
      SuccessToast(result.response)
      setshowProductDetails(false)
      return
    }

    if(result.message == 'unpublished product can not activate'){
        InfoToast(result.variable)
    }

  })
  .catch(error => console.log(error));


}


export const GetAllPublishedProducts = async(setproducts,setnotfound) =>{

  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://miracleisland.tk:2053/miracleIslandadmin/products/get-all-send-for-approval", requestOptions)
  .then(response => response.json())
  .then(result => {

    SessionExpired(result.status)

    if(result.length > 0){
      setproducts(result.sort((a,b) => new Date(b.date) - new Date(a.date)))
      setnotfound(false)
    }else{
      setnotfound(true)
    }

  })
  .catch(error => console.log(error));




}

// Get All Withdrawsls
export const GetAllWithdrwals = async(setwithdrawals,setnotfound) =>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://miracleisland.tk:2053/miracleIslandadmin/w/get-all/withdrawals", requestOptions)
    .then(response => response.json())
    .then(result => {
      SessionExpired(result.status)

      if(result.length > 0){

        setwithdrawals(result.sort((a,b) => new Date(b.date) - new Date(a.date)))
        setnotfound(false)

      }else{
        setnotfound(true)
      }


      console.log(result)
    })
    .catch(error => console.log('error', error));
}

// Get All the Requested Withdrawals
export const GetAllRequestedWithdrwals = async(setwithdrawals,setnotfound) =>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://miracleisland.tk:2053/miracleIslandadmin/w/get-all/requests", requestOptions)
    .then(response => response.json())
    .then(result => {

      SessionExpired(result.status)

      if(result.length > 0){

        setwithdrawals(result)
        setnotfound(false)

      }else{
        setnotfound(true)
      }


      console.log(result)

    })
    .catch(error => {

      console.log(error)
   
       
    });
}

// Approve Withrawal
export const ApprovalRequestedWithdrwals = async(ID) =>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://miracleisland.tk:2053/miracleIslandadmin/w/approve/${ID}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      SessionExpired(result.status)

      if(result.variable == "can not process the withdrawal"){
        ErrorToast(result.message)
      }

      if(result.responsecode == 200){
        SuccessToast(result.response)
      }


      // console.log(result)

      
    })
    .catch(error => console.log(error));
}

export const DispprovalRequestedWithdrwals = async(ID,comment,setcomment,setshowDisapproved,setshowDiapproveBtnLoading) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);

  var formdata = new FormData();
  formdata.append("note", `${comment}`);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };


  fetch(`https://miracleisland.tk:2053/miracleIslandadmin/w/disapprove/${ID}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      setshowDiapproveBtnLoading(true)

      SessionExpired(result.status)

      if(result.variable == "can not process the withdrawal"){
        ErrorToast(result.message)
        setshowDiapproveBtnLoading(false)

      }

      if(result.responsecode == 200){
        SuccessToast(result.response)
        setshowDisapproved(false)
        setcomment("")
        setshowDiapproveBtnLoading(false)

      }

      // console.log(result)

    })
    .catch(error => console.log(error));
}


// Filter All Withdrawals
export const FilterAllWithdrwals = async(stateID,startDate,endDate,setwithdrawals,setnotfound) =>{
  var myHeaders = new Headers();
myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);

var formdata = new FormData();
formdata.append("stateId", `${stateID}`);
formdata.append("startDate", `${startDate}`);
formdata.append("endDate", `${endDate}`);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("https://miracleisland.tk:2053/miracleIslandadmin/w/search-from/date&status", requestOptions)
  .then(response => response.json())
  .then(result => {
    SessionExpired(result.status)

    if(result.length > 0){

      setwithdrawals(result.sort((a,b) => new Date(b.date) - new Date(a.date)))
      setnotfound(false)

    }else{
      setnotfound(true)
    }


    console.log(result)
  })
  .catch(error => console.log('error', error));
}

// Filter Approve Withdrawals
export const FilterAllWithdrwalsOnlyDate = async(startDate,endDate,setwithdrawals,setnotfound) =>{

  var myHeaders = new Headers();
myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);

var formdata = new FormData();
formdata.append("stateId", "1");
formdata.append("startDate", `${startDate}`);
formdata.append("endDate", `${endDate}`);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("https://miracleisland.tk:2053/miracleIslandadmin/w/search-from/date&status", requestOptions)
  .then(response => response.json())
  .then(result => {
    SessionExpired(result.status)

    if(result.length > 0){

      setwithdrawals(result.sort((a,b) => new Date(b.date) - new Date(a.date)))
      setnotfound(false)

    }else{
      setnotfound(true)
    }


    console.log(result)
  })
  .catch(error => console.log('error', error));

}

// Get All Notifications
export const GetAllNotifications = async(setNotifications) =>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://miracleisland.tk:2053/miracleIslandadmin/admin/notifications/get-all", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    SessionExpired(result.status)
      setNotifications(result)
    })
    .catch(error => console.log('error', error));
}

// View All Notifications
export const ViewAllNotifications = async(GetAllNotifications,setNotifications) =>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://miracleisland.tk:2053/miracleIslandadmin/admin/notifications/read-all", requestOptions)
    .then(response => response.json())
    .then(result => {
      SessionExpired(result.status)
      console.log(result)
      if(result ==200){
        GetAllNotifications(setNotifications)
      }

    })
    .catch(error => console.log('error', error));
}

// Single Notification Read
export const ViewSingleNotifications = async(ID,GetAllNotifications,setNotifications) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://miracleisland.tk:2053/miracleIslandadmin/admin/notifications/read/${ID}/notification`, requestOptions)
    .then(response => response.json())
    .then(result => {
      SessionExpired(result.status)

      if(result ==200){
        GetAllNotifications(setNotifications)
      }

      console.log(result)
    })
    .catch(error => console.log('error', error));
}

// Dashboard
export const DashboardTotalSellerCount = async(settotalSeller) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://miracleisland.tk:2053/miracleIslandadmin/admin/dashboard/get/sellers/count", requestOptions)
    .then(response => response.text())
    .then(result => {
      SessionExpired(result.status)
      settotalSeller(result)
      console.log(result)
    })
    .catch(error => console.log('error', error));
}

export const DashboardWithdrawalCount = async(setwithdrawlApproval) =>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://miracleisland.tk:2053/miracleIslandadmin/admin/dashboard/get/withdrawals-to-accept-count", requestOptions)
    .then(response => response.text())
    .then(result => {
      SessionExpired(result.status)
      setwithdrawlApproval(result)
    })
    .catch(error => console.log('error', error));
}

export const DashboardProductsApprovalCount = async(setproductsApproval) =>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://miracleisland.tk:2053/miracleIslandadmin/admin/dashboard/get/products-to-approve-count", requestOptions)
    .then(response => response.text())
    .then(result => {
      SessionExpired(result.status)
      setproductsApproval(result)
    })
    .catch(error => console.log('error', error));
}

export const DashboardCompletedOrderCount = async(setorderCompleted) =>{
  var myHeaders = new Headers();
myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://miracleisland.tk:2053/miracleIslandadmin/admin/dashboard/get/completed-orders", requestOptions)
  .then(response => response.text())
  .then(result => {
    SessionExpired(result.status)
    setorderCompleted(result)
  })
  .catch(error => console.log('error', error));
}

export const DashboardRevenue = async(setrevenue) =>{

  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://miracleisland.tk:2053/miracleIslandadmin/admin/dashboard/get/total-revenue", requestOptions)
  .then(response => response.text())
  .then(result => {
    SessionExpired(result.status)
    setrevenue(result)
  })
  .catch(error => console.log('error', error));


}