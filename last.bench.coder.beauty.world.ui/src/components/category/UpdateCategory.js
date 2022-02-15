import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  BASE_URL,
  CATEGORY_DETAIL_URL,
  CATEGORY_UPDATE_URL
} from '../constatnt/AppConstants'

const UpdateCategory = () => {
  const [Category, setCategory] = useState({})
  const [error, setError] = useState(false)
  const [isSubmitted, setSubmitted] = useState(false)

  let { CategoryId } = useParams()
  const { accessToken, fullName } = useSelector(state => state)

  const handleInputChange = event => {
    const { name, value } = event.target
    setCategory({ ...Category, [name]: value })
  }

  const URL_DETAIL = BASE_URL + CATEGORY_DETAIL_URL

  useEffect(() => {
    document.title = 'DashBoard - Category Update'

    fetch(URL_DETAIL + CategoryId, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => res.json())
      .then(
        result => {
          setCategory(result)
        },
        error => {
          setError(error)
        }
      )
  }, [])

  const URL = BASE_URL + CATEGORY_UPDATE_URL

  const saveCategory = () => {
      debugger
    const jsonData = {
      categoryId: Category.categoryId,
      title: Category.title,
      description: Category.description,
      createdBy: fullName,
      status: Category.status
    }

    fetch(URL, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(jsonData),
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`
      }
    })
    setSubmitted(true)
  }

  return (
    <React.Fragment>
      <div className='row'>
        <h5 className='card-header d-flex justify-content-between align-items-center'>
          Update Category
          <Link to='/category/allcategory' className='btn btn-sm btn-primary'>
            Go Back to List
          </Link>
        </h5>
      </div>
      <br />
      <div className='col-md-12'>
        {isSubmitted ? (
          <React.Fragment>
            <div className='col-sm-12'>
              <div className='alert alert-success' role='alert'>
                Hurray! Data Submitted Successfully
              </div>
            </div>
            <div className='col-sm-2'>
              <Link to='/category/allcategory' className='btn btn-primary'>
                Go To List
              </Link>
            </div>
          </React.Fragment>
        ) : (
          <form onSubmit={saveCategory}>
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>
                Title
              </label>
              <div className='col-sm-6'>
                <input
                  type='text'
                  className='form-control'
                  id='title'
                  required
                  value={Category.title}
                  onChange={handleInputChange}
                  name='title'
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>Description</label>
              <div className='col-sm-6'>
                <textarea
                  type='text'
                  className='form-control'
                  id='description'
                  required
                  value={Category.description}
                  onChange={handleInputChange}
                  name='description'
                ></textarea>
              </div>
            </div>
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>Created By</label>
              <div className='col-sm-6'>
                <label>{fullName}</label>
              </div>
            </div>
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>Status</label>
              <div className='col-sm-4'>
                <select
                  value={Category.status}
                  onChange={handleInputChange}
                  required
                  className='form-select'
                  aria-label='Select Status'
                  name='status'
                  id='status'
                >
                  <option value=''>Select Status</option>
                  <option value='Active'>Active</option>
                  <option value='InActive'>In-Active</option>
                </select>
              </div>
            </div>
            <hr />
            <button type='submit' className='btn btn-success'>
              Submit
            </button>
          </form>
        )}
      </div>
    </React.Fragment>
  )
}

export default UpdateCategory
