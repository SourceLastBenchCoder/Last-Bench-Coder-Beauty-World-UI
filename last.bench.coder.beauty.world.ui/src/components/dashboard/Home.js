import React from 'react'

function Home () {
  return (
    <React.Fragment>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Dashboard</h1>
      </div>
      <hr />
      <div className='row'>
        <div className='col-md-3 mb-3'>
          <div className='card bg-primary text-white h-100'>
            <div className='card-body py-5'>Primary Card</div>
            <div className='card-footer d-flex'>
              View Details
              <span className='ms-auto'>
                <i className='bi bi-chevron-right'></i>
              </span>
            </div>
          </div>
        </div>
        <div className='col-md-3 mb-3'>
          <div className='card bg-warning text-dark h-100'>
            <div className='card-body py-5'>Warning Card</div>
            <div className='card-footer d-flex'>
              View Details
              <span className='ms-auto'>
                <i className='bi bi-chevron-right'></i>
              </span>
            </div>
          </div>
        </div>
        <div className='col-md-3 mb-3'>
          <div className='card bg-success text-white h-100'>
            <div className='card-body py-5'>Success Card</div>
            <div className='card-footer d-flex'>
              View Details
              <span className='ms-auto'>
                <i className='bi bi-chevron-right'></i>
              </span>
            </div>
          </div>
        </div>
        <div className='col-md-3 mb-3'>
          <div className='card bg-danger text-white h-100'>
            <div className='card-body py-5'>Danger Card</div>
            <div className='card-footer d-flex'>
              View Details
              <span className='ms-auto'>
                <i className='bi bi-chevron-right'></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
