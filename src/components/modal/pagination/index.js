import React from 'react'

let Pagination = props => {
  // Handlers
  const handlePagination = e => {
    const params = {
      checkAll, 
      checked, 
      perPage,
      sortBy, 
      direction,
      filters
    }
    
    params.activePage = isNaN(parseInt(e.target.value))
      ? parseInt(e.currentTarget.dataset.id)
      : parseInt(e.target.value)
  }
  
  return (
    <div className={props.className ? props.className : ''}>
      <div className="input-group">
        <div className="input-group-prepend">
          <button id="modal-previous" className="btn btn-success" type="button" aria-label="Previous" data-id={activePage === 1 ? activePage : activePage - 1} disabled={activePage === 1} onClick={handlePagination}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </button>
        </div>
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor={`user-table-page-select-${uniqueId}`}>Page</label>
        </div>
        <select id={`user-table-page-select-${uniqueId}`} className="custom-select" value={ activePage } onChange={handlePagination}>
          {
            pages.map(page => {
              return <option key={`page_${page}`} value={page}>{page}</option>
            })
          }
        </select>
        <div className="input-group-append">
          <label className="input-group-text" htmlFor="userPageSelect">{`of ${totalPages}`}</label>
        </div>
        <div className="input-group-append">
          <button id="modal-next" className="btn btn-success" type="button" aria-label="Next" data-id={pages.length === activePage ? activePage : activePage + 1} disabled={activePage === pages.length} onClick={handlePagination}>
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pagination