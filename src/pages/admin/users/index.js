// ProductPage.js
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Modal from 'components/modal'
import UserForm from 'components/admin/forms/user'

// Actions
import { getUsers, deleteUser, updateUser, setPerPage, setActivePage, setSortBy, setSortDirection } from 'actions/users'

import './styles.css'

const initialState = {
        checkAll: false,
        checked: [],
        formType: 'new',
        formTitle: '',
        formData: [],
        saveAll: false
      }

class UsersPage extends Component {
  constructor(props) {
    super(props)
    
    this.state = initialState
    
    // Get user params and dispatch getUsers()
    const { perPage, activePage, sortBy, direction } = this.props.userContext
    this.props.getUsers({ perPage, activePage, sortBy, direction })
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { pageCount, perPage, activePage, sortBy, direction } = this.props.userContext
    const prevUserContext = prevProps.userContext
    
    if(prevUserContext === this.props.userContext) {
      // If saveAll is still true, reset state
      this.state.saveAll && this.resetState()
    }else if(prevUserContext !== this.props.userContext) {
      const pageConditions = (
        prevUserContext.pageCount === pageCount &&
        prevUserContext.perPage === perPage &&
        prevUserContext.activePage === activePage &&
        prevUserContext.sortBy === sortBy &&
        prevUserContext.direction === direction
      )
    
      const userConditions = prevUserContext.users === this.props.userContext.users
      
      // If any page condition returns false, dispatch getUsers()
      if(!pageConditions) {
        this.props.getUsers({ perPage, activePage, sortBy, direction })
        this.resetState()
      }else if(!userConditions) {
        console.log('prevUserContext', prevUserContext)
        console.log('thisUserContext', this.props.userContext)
        //
        // This is where multi-update single save fails and resets
        //
        this.resetState()
      }
    }
  }
  
  resetState = () => {
    this.setState(initialState)
  }
  
  // Page Handlers
  handlePerPageChange = e => {
    this.props.setPerPage(parseInt(e.target.value))
  }
  handlePagination = e => {
    this.props.setActivePage(parseInt(e.currentTarget.dataset.id))
  }
  handleSortBy = e => {
    const { name } = e.currentTarget.dataset
    const { sortBy, direction } = this.props.userContext
    
    if(name === sortBy) {
      this.props.setSortDirection(direction === 'asc' ? 'desc' : 'asc')
    } else {
      this.props.setSortDirection('asc')
      this.props.setSortBy(name)
    }
  }
  
  // Row Handlers
  handleCheckAll = () => {
    const checkAll = !this.state.checkAll
    const userCount = this.props.userContext.users.length
    
    let checked = [...this.state.checked]
    let formData = [...this.state.formData]
    
    if(checkAll) {
      for(let i=0; i < userCount; i++) {
        checked.push(i)
      }
    } else {
      checked = []
      formData = []
    }
    
    this.setState({
      checkAll,
      checked,
      formData
    })
  }
  handleCheckRow = e => {
    const id = parseInt(e.target.dataset.id)
    const checked = [...this.state.checked]
    let formData = [...this.state.formData]
    
    if(checked.indexOf(id) === -1) {
      checked.push(id)
      
      const userCount = this.props.userContext.users.length
      const checkAll = checked.length === userCount ? true : false
      
      this.setState(prevState => ({
        checkAll,
        checked
      }))
    } else {
      checked.splice(checked.indexOf(id), 1)
      formData = checked.length > 0 ? formData : []
      
      this.setState({
        checkAll: false,
        checked,
        formData
      })
    }
  }
  handleCheckedStatus = id => {
    return this.state.checked.indexOf(id) !== -1
      ? true
      : false
  }
  
  
  // CRUD Handlers
  handleNewUser = () => {
    this.setState({
      formType: 'new',
      formTitle: 'Add User'
    })
  }
  handleUpdateUsers = () => {
    const Users = []
    const checked = this.state.checked
    const { users } = this.props.userContext
    
    // use filter to siphon out the users
    users.forEach((user, i) => {
      checked.indexOf(i) !== -1 && Users.push(user)
    })
    
    const formTitle = `Update User${checked.length > 1 ? 's' : ''}`
    
    this.setState({
      formType: 'update',
      formTitle: formTitle,
      formData: Users
    })
  }
  handleDeleteUsers = async () => {
    const { checked } = this.state
    const { users, 
            perPage, 
            activePage, 
            sortBy, 
            direction } = this.props.userContext
    
    users.forEach(async (user, i) => {
      checked.indexOf(i) !== -1 && 
        await this.props.deleteUser(user._id)
    })
    
    await this.props.getUsers({ perPage, activePage, sortBy, direction })
    
    this.resetState()
  }
  handleSaveAll = () => {
    this.setState({
      saveAll: true
    })
  }
  
  render() {
    const { users, perPage, pageCount, activePage, sortBy, direction } = this.props.userContext
    
    const { checkAll,
            checked,
            formType, 
            formTitle,
            formData,
            saveAll } = this.state
    const closeOnSave = formData.length === 1
    const headers = [
      {username: 'Username'},
      {email: 'Email'},
      {role: 'Role'},
      {firstname: 'First Name'},
      {lastname: 'Last Name'},
      {date: 'Created On'}
    ]
    const pages = []
    
    for(let i=0; i < pageCount; i++) {
      pages.push(i)
    }
    
    const form = formType === 'update' 
      ? formData.map((data, i) => (
          <UserForm 
            key={`user-form-${i}`} 
            id={data._id} 
            dataId={++i}
            lastForm={formData.length}
            type={formType} 
            closeOnSave={closeOnSave} 
            saveAll={saveAll}
            data={data} />
        ))
      : <UserForm type={formType} />
    
    return (
      <section className="container-fluid p-0">
        <nav className="navbar nav-expand navbar-dark px-2" style={{backgroundColor: "#EEE"}}>
          <ul className="nav">
            <li className="nav-item mr-2">
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#userFormModal" onClick={this.handleNewUser}>New User</button>
            </li>
            {
              checked.length > 0 && 
                <React.Fragment>
                  <li className="nav-item mr-2">
                    <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#userFormModal" onClick={this.handleUpdateUsers}>Update</button>
                  </li>
                  <li className="nav-item mr-2">
                    <button type="button" className="btn btn-danger" onClick={this.handleDeleteUsers}>Delete</button>
                  </li>
                </React.Fragment>
            }
          </ul>
        </nav>
        <section className="container-fluid py-3">
          <div className="input-group mb-3 col-sm-7">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="usersPerPage">Show</label>
            </div>
            <select id="usersPerPage" name="perPage" className="custom-select col-2" value={ perPage } onChange={this.handlePerPageChange}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="0">All</option>
            </select>
          </div>
          <table className="table">
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
                  headers.map((header, i) => {
                    return Object.keys(header).map(key => {
                      return <th key={`header${i}`} className="pointer" scope="col" data-name={key} onClick={this.handleSortBy}>
                        <span className="mr-2">{header[key]}</span>
                        {
                          (key === sortBy && direction === 'asc')
                            ? <i className="fas fa-sort-up ml-auto"></i>
                            : (key === sortBy && direction === 'desc') && 
                                <i className="fas fa-sort-down ml-auto"></i>
                        }
                      </th>
                    })
                  })
                }
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => {
                const date = new Date(user.date)
                const checked = this.handleCheckedStatus(i)

                return <tr key={`user${i}`}>
                  <td>
                    <input 
                      type="checkbox" 
                      data-id={i}
                      checked={checked} 
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
            {
              pages.length > 1 && 
                <tfoot>
                  <tr>
                    <td colSpan="100%">
                      <ul className="pagination justify-content-center col-6 mx-auto mb-0">
                        <li className="page-item">
                          <span className="page-link" aria-label="Previous" data-id={activePage === 1 ? activePage : activePage - 1} onClick={this.handlePagination}>
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                          </span>
                        </li>
                        {
                          pages.map((page, i) => {
                            i++
                            return <li key={`page${i}`} data-id={i} className={`page-item ${i === activePage ? 'active' : ''}`} onClick={this.handlePagination}><span className="page-link">{i}</span></li>
                          })
                        }
                        <li className="page-item">
                          <span className="page-link" aria-label="Next" data-id={pages.length === activePage ? activePage : activePage + 1} onClick={this.handlePagination}>
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                          </span>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tfoot>
            }
          </table>
        </section>
        <Modal id="userFormModal" title={formTitle} label="userFormModalLabel" saveAll={this.handleSaveAll}>
          {form}
        </Modal>
      </section>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  setPerPage: (perPage) => dispatch(setPerPage(perPage)),
  setActivePage: (page) => dispatch(setActivePage(page)),
  setSortBy: (sortBy) => dispatch(setSortBy(sortBy)),
  setSortDirection: (direction) => dispatch(setSortDirection(direction)),
  getUsers: (params) => dispatch(getUsers(params)),
  updateUser: (id) => dispatch(updateUser(id)),
  deleteUser: (id) => dispatch(deleteUser(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UsersPage))