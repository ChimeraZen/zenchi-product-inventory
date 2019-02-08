import React from 'react'
import { connect } from 'react-redux'
import uniqid from 'uniqid'

// Actions
import { getUsersTable, resetUsersTableCheckboxes } from 'actions/usersTable'

let FilterRole = ({ perPage, activePage, sortBy, direction, filters, ...props }) => {
  // Handlers
  const handleFilterRoleChange = e => {
    const params = {
      perPage,
      activePage, 
      sortBy, 
      direction,
      filters
    }
    
    
    const { value } = e.target
    params.filters.role = value
    
    props.resetUsersTableCheckboxes()
    props.getUsersTable(params)
  }
  
  const uniqueId = uniqid()
  
  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor={`usersFilterRole${uniqueId}`}>Role</label>
      </div>
      <select id={`usersFilterRole${uniqueId}`} name="role" className="custom-select" value={filters.role} onChange={handleFilterRoleChange}>
        <option value="">--No Filter--</option>
        <option value="super">Super Admin</option>
        <option value="admin">Admin</option>
        <option value="staff">Staff</option>
      </select>
    </div>
  )
}

const mapStateToProps = state => state.usersTable

const mapDispatchToProps = dispatch => ({
  getUsersTable: params => dispatch(getUsersTable(params)),
  resetUsersTableCheckboxes: () => dispatch(resetUsersTableCheckboxes())
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterRole)