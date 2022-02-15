import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { BASE_URL,ADMIN_LIST_URL } from '../constatnt/AppConstants'

const AllAdmin = () => {
  const [Admins, setAdmins] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const URL = BASE_URL + ADMIN_LIST_URL
  const accessToken = useSelector(state => state.accessToken)

  useEffect(() => {
    document.title = 'DashBoard - All Admin'

    fetch(URL, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
      .then(res => res.json())
      .then(
        result => {
          setAdmins(result)
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
          All Admins
          <Link to='/admin/addadmin' className='btn btn-sm btn-primary'>
          Add New Admin &nbsp;<i className="bi bi-plus"></i>
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
              <table id='Admins' className='table table-striped data-table'>
                <thead>
                  <tr>
                    <th>#</th>
                    <td>Full Name</td>
                    <td>EmailId</td>
                    <td>Phone No</td>
                    <td>Role</td>
                    <td>Created By</td>
                    <td>Date Created</td>
                    <td>Status</td>
                    <td>Edit</td>
                  </tr>
                </thead>
                <tbody>
                  {Admins.map(item => (
                    <tr key={item.adminId}>
                      <td>{item.adminId}</td>
                      <td>{item.fullName}</td>
                      <td>{item.emailId}</td>
                      <td>{item.phoneNo}</td>
                      <td>{item.role}</td>
                      <td>{item.createdBy}</td>
                      <td>{item.dateCreated}</td>
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
                            pathname: '/admin/detailadmin/' + `${item.adminId}`
                          }}
                          className='dropdown-item'
                          href='#'
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

export default AllAdmin
