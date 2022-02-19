import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ADMIN_DETAIL_URL, BASE_URL } from '../constatnt/AppConstants'

const DetailAdmin = () => {
  const [item, setItem] = useState({})
  const [store, setStore] = useState({})
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  let { AdminId } = useParams()
  const accessToken = useSelector(state => state.accessToken)

  const URL = BASE_URL + ADMIN_DETAIL_URL

  useEffect(() => {
    fetch(URL + AdminId, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => res.json())
      .then(
        result => {
          setItem(result)
          setStore(result.store)
          setIsLoading(false)
        },
        error => {
          setError(error)
          setIsLoading(false)
        }
      )
  }, [])

  return (
    <React.Fragment>
      <div className='row'>
        <h5 className='card-header d-flex justify-content-between align-items-center'>
          Admin Complete Detail
          <Link to='/admin/alladmin' className='btn btn-sm btn-primary'>
            Go Back to List
          </Link>
        </h5>
      </div>
      <br />
      <div className='col-md-12'>
        {error ? (
          <div className='alert alert-danger' role='alert'>
            {error.message}
          </div>
        ) : (
          <div>
            {isLoading ? (
              <h5>Admin Detail Loading in Progress</h5>
            ) : (
              <div className='container'>
                <div className='row'>
                  <div className='col'>
                    <div className='card' style={{ width: '18rem' }}>
                      <img
                        src={BASE_URL + '/images/' + item.banner}
                        className='card-img-top'
                      />
                      <div className='card-body'>
                      <h5 class="card-title">{item.fullName}</h5>
                        <p className='card-text'>                         
                            {item.emailId}                            
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='col-8'>
                    <dl className='row'>
                      <dt className='col-sm-3'>Administrator Id</dt>
                      <dd className='col-sm-9'>{item.adminId}</dd>
                      <dt className='col-sm-3'>Full Name</dt>
                      <dd className='col-sm-9'>{item.fullName}</dd>
                      <dt className='col-sm-3'>Email Id</dt>
                      <dd className='col-sm-9'>{item.emailId}</dd>
                      <dt className='col-sm-3'>Phone</dt>
                      <dd className='col-sm-9'>{item.phoneNo}</dd>
                      <dt className='col-sm-3'>Store Name</dt>
                      <dd className='col-sm-9'>{store.storeName}</dd>
                      <dt className='col-sm-3'>Role</dt>
                      <dd className='col-sm-9'>{item.role}</dd>
                      <dt className='col-sm-3'>Status</dt>
                      <dd className='col-sm-9'>
                        {item.status === 'Active' ? (
                          <span className='badge bg-success'>
                            {item.status}
                          </span>
                        ) : (
                          <span className='badge bg-danger'>{item.status}</span>
                        )}
                      </dd>
                      <dt className='col-sm-3'>Date Created</dt>
                      <dd className='col-sm-9'>{item.dateCreated}</dd>
                      <dt className='col-sm-3'>Date Updated</dt>
                      <dd className='col-sm-9'>{item.dateUpdated}</dd>
                      <dt className='col-sm-3'>Login User Id</dt>
                      <dd className='col-sm-9'>{item.loginId}</dd>
                      <dt className='col-sm-3'>Password</dt>
                      <dd className='col-sm-9'>*******</dd>
                    </dl>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <hr />
      <Link
        className='btn btn-success'
        to={{
          pathname: '/admin/updateadmin/' + `${item.adminId}`
        }}
      >
        Update Detail
      </Link>
    </React.Fragment>
  )
}

export default DetailAdmin
