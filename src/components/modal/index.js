import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'

const uniqueId = uniqid()

class Modal extends Component {
  state = {
    activePage: 1,
    isOpen: false
  }

  modalRef = React.createRef()

  // Check if already open and handle onClose if closing
  observer = new MutationObserver(mutation => {
    const hasShowClass = mutation[0].target.classList.contains('show')
    const { isOpen } = this.state
    
    if(hasShowClass && !isOpen) {
      this.setState({
        isOpen: true
      })
    } else if(!hasShowClass && isOpen) {
      this.props.onClose()
      this.setState({
        activePage: 1,
        isOpen: false
      })
    }
  })

  componentDidMount() {
    this.props.onClose &&
      this.observer.observe(this.modalRef, { 
        attributes: true, 
        attributeFilter: ['class'] 
      })
  }

  componentWillUnmount() {
    this.props.onClose && this.observer.disconnect()
  }

  handleModalPagination = e => {
    e.preventDefault()
    const activePage = isNaN(parseInt(e.target.value))
      ? parseInt(e.currentTarget.dataset.id)
      : parseInt(e.target.value)
    
    const modalPage = document.querySelector(`#multi-modal-page-${activePage}`)[0]
    
    // Scroll the element into view
    modalPage.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
    
    this.setState({
      activePage
    })
  }

  render() {
    const { activePage, prevDisabled, nextDisabled } = this.state
    const length = this.props.children ? this.props.children.length : 1
    const pages = []
    
    for(let i=1; i <= length; i++) {
      pages.push(i)
    }
    
    return (
      <div ref={e => this.modalRef = e} className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby={`user-form-modal-label`} aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userFormModalLabel">{this.props.title}</h5>
              <button type="button" className="close" data-dismiss="modal" onClick={this.onClose} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body xy-overflow-hidden">
              {
                length > 1
                  ? <div className="d-flex wx-max">{
                      React.Children.map(this.props.children, (child, i) => {
                        ++i
                        return React.cloneElement(child, {
                          formId: `multi-modal-page-${i}`
                        })
                      })
                    }</div>
                  : this.props.children
              }
            </div>
            {
              pages.length > 1 && 
                <div className="modal-footer">
                  <div className="mx-auto">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <button id="modal-previous" className={`btn btn-success ${prevDisabled ? 'disabled' : ''}`} type="button" aria-label="Previous" data-id={activePage === 1 ? activePage : activePage - 1} onClick={this.handleModalPagination}>
                          <span aria-hidden="true">&laquo;</span>
                          <span className="sr-only">Previous</span>
                        </button>
                      </div>
                      <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor={`user-table-page-select-${uniqueId}`}>Page</label>
                      </div>
                      <select id={`user-table-page-select-${uniqueId}`} className="custom-select" value={ activePage } onChange={this.handleModalPagination}>
                        {
                          pages.map(page => {
                            return <option key={`page_${page}`} value={page}>{page}</option>
                          })
                        }
                      </select>
                      <div className="input-group-append">
                        <label className="input-group-text" htmlFor="userPageSelect">{`of ${pages.length}`}</label>
                      </div>
                      <div className="input-group-append">
                        <button id="modal-next" className={`btn btn-success ${nextDisabled ? 'disabled' : ''}`} type="button" aria-label="Next" data-id={pages.length === activePage ? activePage : activePage + 1} onClick={this.handleModalPagination}>
                          <span aria-hidden="true">&raquo;</span>
                          <span className="sr-only">Next</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {
                    (pages.length > 1 && this.props.multiAction) &&
                      <span className="col-3 ml-auto">
                        {this.props.multiAction}
                      </span>
                  }
                </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Modal