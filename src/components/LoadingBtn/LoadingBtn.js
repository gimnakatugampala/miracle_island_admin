import React from 'react'
import Colors from '../../constants/Colors'

const LoadingBtn = () => {
  return (
    <button style={Colors.ButtonColors} type="button" className="btn btn-light mx-2 mt-2">
    <div className="spinner-border spinner-border-sm" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </button>
  )
}

export default LoadingBtn