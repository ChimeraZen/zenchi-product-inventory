import React from 'react'
import { connect } from 'react-redux'
import uniqid from 'uniqid'

// Actions
import { getUsersTable, resetUsersTableCheckboxes } from 'actions/usersTable'

let FilterPerPage = ({ perPage, activePage, sortBy, direction, filters, ...props }) => {
  // Handlers
  const handlePerPageChange = e => {
    perPage = parseInt(e.target.value)
    
    props.resetUsersTableCheckboxes()
    props.getUsersTable({
      perPage,
      activePage, 
      sortBy, 
      direction, 
      filters 
    })
  }
  
  const uniqueId = uniqid()
  
  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor={`usersPerPage${uniqueId}`}>Show</label>
      </div>
      <select id={`usersPerPage${uniqueId}`} className="custom-select" value={ perPage } onChange={handlePerPageChange}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="0">All</option>
      </select>
    </div>
  )
}

const mapStateToProps = state => state.usersTable

const mapDispatchToProps = dispatch => ({
  getUsersTable: params => dispatch(getUsersTable(params)),
  resetUsersTableCheckboxes: () => dispatch(resetUsersTableCheckboxes())
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterPerPage)