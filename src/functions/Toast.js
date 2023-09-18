import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SuccessToast = (title) => {

    toast.success(`${title}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

}


export const ErrorToast = (title) => {

    toast.error(`${title}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

}

export const PendingSuccessToast = (ptitle,title,etitle) =>{

const functionThatReturnPromise = () => new Promise(resolve => setTimeout(resolve, 3000));
toast.promise(
    functionThatReturnPromise,
    {
      pending: ptitle,
      success: title,
      error: etitle,
    },
    {theme: "dark"}
)
}

export const PendingInfoToast = (ptitle,title,etitle) =>{

    const functionThatReturnPromise = () => new Promise(resolve => setTimeout(resolve, 3000));
    toast.promise(
        functionThatReturnPromise,
        {
          pending: ptitle,
          success: title,
          error: etitle,
        },
        {
            theme: "dark",
            type:'info'
        }
    )
    }


    
export const InfoToast = (title) => {
        toast.info(`${title}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });

}


