import React from 'react'

const LoadingBtnCustom = ({btnColor}) => {
  return (
    <button  type="button" className={`${btnColor} mx-2 mt-2`}>
    <div className="spinner-border spinner-border-sm" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </button>
  )
}

export default LoadingBtnCustom