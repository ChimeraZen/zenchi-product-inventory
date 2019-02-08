import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import LoadingSpinner from 'components/loading/spinner'

// Local Components
import Pagination from './pagination'
import Records from './records'

// Filters
import FilterPerPage from './filters/perPage'
import FilterRole from './filters/role'

// Actions
import { getUsersTable, setUsersTableCheckboxes } from 'actions/usersTable'

class UsersTable extends Component {
  constructor(props) {
    super(props)
    
    const { 
      checkAll, 
      checked,
      perPage, 
      activePage, 
      sortBy, 
      direction, 
      filters 
    } = this.props.usersTable
    
    this.props.setUsersTableCheckboxes({
      checkAll, 
      checked
    })
    
    this.props.getUsersTable({
      perPage, 
      activePage, 
      sortBy, 
      direction, 
      filters 
    })
  }

  // Row Handlers
  handleCheckAll = () => {
    const { users } = this.props.usersTable
    
    let { checked, checkAll } = {...this.props.usersTable}
    
    checkAll = !checkAll
    
    if(checkAll) {
      for(let i=0; i < users.length; i++) {
        checked.push(i)
      }
    } else {
      checked = []
    }
    
    this.props.setUsersTableCheckboxes({ checkAll, checked })
  }
  handleCheckRow = e => {
    const { checked, users } = this.props.usersTable
    const checkAll = checked.length === users.length
    const id = parseInt(e.target.dataset.id)
    
    if(checked.indexOf(id) === -1) {
      checked.push(id)
    } else {
      checked.splice(checked.indexOf(id), 1)
    }
    
    this.props.setUsersTableCheckboxes({checkAll, checked})
  }
  
  render() {
    const { isLoading,
            users, 
            checkAll, 
            checked, 
            headers, 
            totalPages, 
            sortBy, 
            direction
          } = this.props.usersTable
    
    return (
      <section className="container-fluid position-relative">
        <div className="container-fluid p-0 mt-1 my-3">
          <div className="row mx-2">
            <div className="mt-auto mr-3">
              <FilterPerPage />
            </div>
            <div className="mt-auto mr-3">
              <FilterRole />
            </div>
          </div>
        </div>
        { isLoading && <LoadingSpinner /> }
        <table className={`table mb-0`}>
          <thead>
            <tr>
              <th scope="col">
                <input 
                  type="checkbox" 
                  checked={checkAll} 
                  onChange={this.handleCheckAll} 
                />
              </th>
              {
                Object.keys(headers).map((key, i) => {
                  return <th key={`header${i}`} className="pointer" scope="col" data-name={key} onClick={this.handleSortBy}>
                    <span className="mr-2">{headers[key]}</span>
                    {
                      (key === sortBy && direction === 'asc')
                        ? <i className="fas fa-sort-up ml-auto"></i>
                        : (key === sortBy && direction === 'desc') && 
                            <i className="fas fa-sort-down ml-auto"></i>
                    }
                  </th>
                })
              }
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              const date = new Date(user.date)
              
              return <tr key={`user${i}`}>
                <td>
                  <input 
                    type="checkbox" 
                    data-id={i}
                    checked={checked.indexOf(i) !== -1 ? true : false} 
                    onChange={this.handleCheckRow} 
                  />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{date.toDateString()}</td>
              </tr>
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="100%" className="container-fluid">
                <div className="row">
                  <div className="my-auto mr-3">
                    <Records />
                  </div>
                  {
                    totalPages > 1 &&
                      <div className="mx-auto">
                        <Pagination />
                      </div>
                  }
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
    )
  }
}

UsersTable.propTypes = {
  usersTable: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  usersTable: state.usersTable,
  userForms: state.userForms,
  errors: state.errors
})

const mapDispatchToProps = dispatch => ({
  getUsersTable: params => dispatch(getUsersTable(params)),
  setUsersTableCheckboxes: params => dispatch(setUsersTableCheckboxes(params))
})



export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)