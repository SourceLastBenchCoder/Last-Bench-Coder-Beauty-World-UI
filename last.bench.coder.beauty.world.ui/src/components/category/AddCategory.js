import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BASE_URL, CATEGORY_CREATE_URL } from '../constatnt/AppConstants'

const AddCategory = () => {
  const initialData = {
    title: '',
    description: '',
    banner: '',
    status: '',
    createdBy: ''
  }

  const [Category, setCategory] = useState(initialData)
  const [isSubmitted, setSubmitted] = useState(false)
  const [isFailed, setIsFailed] = useState({})

  const { accessToken, fullName } = useSelector(state => state)

  const handleInputChange = event => {
    const { name, value } = event.target
    setCategory({ ...Category, [name]: value })
  }

  const URL = BASE_URL + CATEGORY_CREATE_URL

  useEffect(() => {
    document.title = 'DashBoard - Category Update'
  }, [])

  const saveCategory = e => {
    e.preventDefault()
    const jsonData = {
      title: Category.title,
      description: Category.description,
      banner: Category.banner,
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
      .then(res => res.json())
      .then(result => {
        debugger
        if (result.status === 400) {
          setIsFailed({
            errorCode: result.status,
            errorDetail: result.detail
          })
          return false
        } else {
          setSubmitted(true)
          setIsFailed({})
        }
      })
  }

  const newStore = () => {
    setCategory(initialData)
    setSubmitted(false)
    setIsFailed({})
  }

  return (
    <React.Fragment>
      <div className='row'>
        <h5 className='card-header d-flex justify-content-between align-items-center'>
          Add Category
          <Link to='/category/allcategory' className='btn btn-sm btn-primary'>
            Go Back to List&nbsp;&nbsp;
            <i className='bi bi-arrow-left'></i>
          </Link>
        </h5>
      </div>
      <br />
      <div className='col-md-12'>
        {isFailed.errorCode ? (
          <div className='col-sm-12'>
            <div className='alert alert-danger' role='alert'>
              Oops! {isFailed.errorDetail}
            </div>
          </div>
        ) : (
          ''
        )}
        {isSubmitted ? (
          <React.Fragment>
            <div className='col-sm-12'>
              <div className='alert alert-success' role='alert'>
                Hurray! Data Submitted Successfully
              </div>
            </div>
            <div className='col-sm-12'>
              <Link to='/category/allcategory' className='btn btn-primary'>
                Go Back to List&nbsp;&nbsp;
                <i className='bi bi-arrow-left'></i>
              </Link>
              &nbsp;&nbsp;
              <button onClick={newStore} className='btn btn-primary'>
                Add New Category&nbsp;&nbsp;
                <i className='bi bi-save'></i>
              </button>
            </div>
          </React.Fragment>
        ) : (
          <form onSubmit={saveCategory}>
            <div className='mb-3 row'>
              <label for='inputPassword' className='col-sm-2 col-form-label'>
                Category Name
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
              <label className='col-sm-2 col-form-label'>Banner</label>
              <div className='col-sm-6'>
                <textarea
                  type='text'
                  className='form-control'
                  id='banner'
                  required
                  value={Category.banner}
                  onChange={handleInputChange}
                  name='banner'
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

export default AddCategory
