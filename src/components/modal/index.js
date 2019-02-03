import React, { Component } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'

class Modal extends Component {
  state = {
    activePage: 1
  }

  handlePagination = e => {
    const id = parseInt(e.currentTarget.dataset.id)
    const modalPage = $(`#modal-page-${id}`)[0]
    
    // Scroll the element into view
    modalPage.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    
    this.setState({
      activePage: id
    })
  }

  render() {
    const { activePage } = this.state
    const { saveAll } = this.props
    const pages = []
    
    for(let i=0; i < this.props.children.length; i++) {
      pages.push(i)
    }
    
    return (
      <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby={this.props.label} aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={this.props.label}>{this.props.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body xy-overflow-hidden">
              {
                this.props.children.length > 1
                  ? <div className="d-flex wx-max">{
                      React.Children.map(this.props.children, (child, i) => {
                        return React.cloneElement(child, {
                          formId: `modal-page-${++i}`
                        })
                      })
                    }</div>
                  : this.props.children
              }
            </div>
            {
              pages.length > 1 && 
                <div className="modal-footer">
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
                  {
                    pages.length > 1 && <span className="col-3">
                      <button type="button" className="btn btn-outline-success" onClick={saveAll}>Save All</button>
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
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Modal