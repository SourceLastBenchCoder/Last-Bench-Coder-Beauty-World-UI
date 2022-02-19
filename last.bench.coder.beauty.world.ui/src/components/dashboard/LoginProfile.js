import React from 'react'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../constatnt/AppConstants'
import { Link } from 'react-router-dom'

const LoginProfile = () => {
  const loginInfo = useSelector(state => state)

  return (
    <React.Fragment>
      <div className='row'>
        <h5 className='card-header d-flex justify-content-between align-items-center'>
         My Login Information
          <Link to='/admin/alladmin' className='btn btn-sm btn-primary'>
            Go Back to List
          </Link>
        </h5>
      </div>
      <br />
      <div className='col-md-12'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <div className='card' style={{ width: '18rem' }}>
                <img
                  src={BASE_URL + '/images/' + loginInfo.banner}
                  className='card-img-top'
                />
                <div className='card-body'>
                  <h5 class='card-title'>{loginInfo.fullName}</h5>
                  <p className='card-text'>{loginInfo.emailId}</p>
                </div>
              </div>
            </div>
            <div className='col-8'>
              <dl className='row'>
                <dt className='col-sm-3'>Administrator Id</dt>
                <dd className='col-sm-9'>{loginInfo.adminId}</dd>
                <dt className='col-sm-3'>Full Name</dt>
                <dd className='col-sm-9'>{loginInfo.fullName}</dd>
                <dt className='col-sm-3'>Email Id</dt>
                <dd className='col-sm-9'>{loginInfo.emailId}</dd>
                <dt className='col-sm-3'>Role</dt>
                <dd className='col-sm-9'>{loginInfo.role}</dd>
                <dt className='col-sm-3'>Access Token</dt>
                <dd className='col-sm-9'>{loginInfo.accessToken}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <Link
        className='btn btn-success'
        to={{
          pathname: '/admin/updateadmin/' + `${loginInfo.adminId}`
        }}
      >
        Update Detail
      </Link>
    </React.Fragment>
  )
}

export default LoginProfile
