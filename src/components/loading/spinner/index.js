import React from 'react'

const LoadingSpinner = (props) =>
  <div className={`container-fluid w-100 h-100 d-flex justify-content-center align-items-center position-absolute loading-spinner ${props.className ? props.className : ''}`}>
    <div className="spinner-border text-success" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>

export default LoadingSpinner