import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BASE_URL, STORE_DETAIL_URL } from '../constatnt/AppConstants'

const DetailStore = () => {
  const [item, setItem] = useState({})
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  let { StoreId } = useParams()
  const accessToken = useSelector(state => state.accessToken)

  const URL = BASE_URL + STORE_DETAIL_URL

  useEffect(() => {
    document.title = 'DashBoard - Store Detail'
    fetch(URL + StoreId, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => res.json())
      .then(
        result => {
          console.log(result)
          setItem(result)
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
          Detail : {item.storeName}
          <Link to='/store/allstore' className='btn btn-sm btn-primary'>
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
              <dl className='row'>
                <dt className='col-sm-3'>Store Id</dt>
                <dd className='col-sm-9'>{item.storeId}</dd>
                <dt className='col-sm-3'>Store Name</dt>
                <dd className='col-sm-9'>{item.storeName}</dd>
                <dt className='col-sm-3'>Description</dt>
                <dd className='col-sm-9'>{item.description}</dd>
                <dt className='col-sm-3'>Address</dt>
                <dd className='col-sm-9'>{item.address}</dd>
                <dt className='col-sm-3'>Contact Detail</dt>
                <dd className='col-sm-9'>{item.contactDetail}</dd>
                <dt className='col-sm-3'>Zip Code</dt>
                <dd className='col-sm-9'>{item.zipCode}</dd>
                <dt className='col-sm-3'>Status</dt>
                <dd className='col-sm-9'>
                  {item.status === 'Active' ? (
                    <span className='badge bg-success'>{item.status}</span>
                  ) : (
                    <span className='badge bg-danger'>{item.status}</span>
                  )}
                </dd>
                <dt className='col-sm-3'>Created By</dt>
                <dd className='col-sm-9'>{item.createdBy}</dd>
                <dt className='col-sm-3'>Date Created</dt>
                <dd className='col-sm-9'>{item.dateCreated}</dd>
                <dt className='col-sm-3'>Date Updated</dt>
                <dd className='col-sm-9'>{item.dateUpdated}</dd>
              </dl>
            )}
          </div>
        )}
      </div>
      <hr />
      <Link
        className='btn btn-success'
        to={{
          pathname: '/store/updatestore/' + `${item.storeId}`
        }}
      >
        Update Detail
      </Link>
    </React.Fragment>
  )
}

export default DetailStore
