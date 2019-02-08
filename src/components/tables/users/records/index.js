import React from 'react'
import { connect } from 'react-redux'

let Records = ({ totalUsers, perPage, activePage, ...props }) => {
  const showStart = activePage * perPage - perPage + 1
  
  const showEnd = activePage * perPage > totalUsers
    ? totalUsers
    : activePage * perPage
  
  return (
    <div className={`${props.className ? props.className : ''}`}>
      {`Showing ${showStart} - ${showEnd} of ${totalUsers}`}
    </div>
  )
}

const mapStateToProps = state => state.usersTable

export default connect(mapStateToProps, null)(Records)