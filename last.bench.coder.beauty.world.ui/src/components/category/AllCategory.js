import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BASE_URL, CATEGORY_LIST_URL } from '../constatnt/AppConstants'

const AllCategory = () => {
  const [category, setCategory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const URL = BASE_URL + CATEGORY_LIST_URL
  const accessToken = useSelector(state => state.accessToken)

  useEffect(() => {
    document.title = 'DashBoard - All Store'

    fetch(URL, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
      .then(res => res.json())
      .then(
        result => {
          setCategory(result)
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
          <Link to='/category/addcategory' className='btn btn-sm btn-primary'>
            Add New Category &nbsp;<i className='bi bi-plus'></i>
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
              <h5>Category Detail Loading in Progress</h5>
            ) : (
              <table id='category' className='table table-striped data-table'>
                <thead>
                  <tr>
                    <th>#</th>
                    <td>Title</td>
                    <td>Created By</td>
                    <td>Date Created</td>
                    <td>Status</td>
                    <td>Edit</td>
                  </tr>
                </thead>
                <tbody>
                  {category.map(item => (
                    <tr key={item.categoryId}>
                      <td>{item.categoryId}</td>
                      <td>{item.title}</td>
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
                            pathname: '/category/detailcategory/' + `${item.categoryId}`
                          }}
                        >
                          <i className='bi bi-gear'></i>
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

export default AllCategory
