import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import * as Constants from '../constatnt/AppConstants'

const AllStore = () => {
  const [stores, setStores] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const URL = Constants.BASE_URL + Constants.STORE_LIST_URL
  const accessToken = useSelector(state => state.accessToken)

  useEffect(() => {

    document.title="DashBoard - All Store"

    fetch(URL, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
      .then(res => res.json())
      .then(
        result => {
          setStores(result)
          setIsLoading(false)
          setError(null)
          console.log(result)
        },
        error => {
          setIsLoading(false)
          setError(error)
        }
      )
  }, [])

  return (
    <React.Fragment>
      <div className='row'>
        <h5 className='card-header d-flex justify-content-between align-items-center'>
          All Stores
          <Link to='/store/addstore' className='btn btn-sm btn-primary'>
            Add New Store &nbsp;<i className="bi bi-plus"></i>
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
              <h5>Store Detail Loading in Progress</h5>
            ) : (
              <table id='stores' className='table table-striped data-table'>
                <thead>
                  <tr>
                    <th>#</th>
                    <td>Store Name</td>
                    <td>Zip Code</td>
                    <td>Created By</td>
                    <td>Date Created</td>
                    <td>Status</td>
                    <td>Edit</td>
                  </tr>
                </thead>
                <tbody>
                  {stores.map(item => (
                    <tr key={item.storeId}>
                      <td>{item.storeId}</td>
                      <td>{item.storeName}</td>
                      <td>{item.zipCode}</td>
                      <td>{item.dateCreated}</td>
                      <td>{item.createdBy}</td>
                      <td>
                        {item.status === 'Active' ? (
                          <span className='badge bg-success'>
                            {item.status}
                          </span>
                        ) : (
                          <span className='badge bg-danger'>{item.status}</span>
                        )}
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname:
                              '/store/detailstore/' + `${item.storeId}`
                          }}
                        >
                         <i className="bi bi-gear"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export default AllStore
