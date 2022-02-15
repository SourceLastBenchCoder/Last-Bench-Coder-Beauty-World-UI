import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  BASE_URL,
  ADMIN_CREATE_URL,
  STORE_LIST_URL
} from '../constatnt/AppConstants'

const AddAdmin = () => {
  const initialData = {
    storeId: '',
    fullName: '',
    emailId: '',
    phoneNo: '',
    banner: '',
    dateOfBirth: '',
    loginId: '',
    password: '',
    role: '',
    status: ''
  }

  const [admin, setAdmin] = useState(initialData)
  const [store, setStore] = useState([])
  const [isSubmitted, setSubmitted] = useState(false)
  const [isFailed, setIsFailed] = useState({})

  const { accessToken, fullName } = useSelector(state => state)

  const handleInputChange = event => {
    const { name, value } = event.target
    setAdmin({ ...admin, [name]: value })
  }

  const URL = BASE_URL + ADMIN_CREATE_URL
  const STORE_URL = BASE_URL + STORE_LIST_URL

  useEffect(() => {
    document.title = 'DashBoard - Admin Create'

    fetch(STORE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => res.json())
      .then(result => {
        setStore(result)
      })
  }, [])

  const saveAdmin = e => {
    e.preventDefault()

    const jsonData = {
      storeId: admin.storeId,
      fullName: admin.fullName,
      emailId: admin.emailId,
      phoneNo: admin.phoneNo,
      banner: admin.banner,
      dateOfBirth: admin.dateOfBirth,
      loginId: admin.loginId,
      password: 'admin',
      role: admin.role,
      status: admin.status,
      createdBy: fullName
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

  const newAdmin = () => {
    setAdmin(initialData)
    setSubmitted(false)
    setIsFailed({})
  }

  return (
    <React.Fragment>
      <div className='row'>
        <h5 className='card-header d-flex justify-content-between align-items-center'>
          Add Admin
          <Link to='/Admin/alladmin' className='btn btn-sm btn-primary'>
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
              <Link to='/admin/alladmin' className='btn btn-primary'>
                Go Back to List&nbsp;&nbsp;
                <i className='bi bi-arrow-left'></i>
              </Link>
              &nbsp;&nbsp;
              <button onClick={newAdmin} className='btn btn-primary'>
                Add New Admin&nbsp;&nbsp;
                <i className='bi bi-save'></i>
              </button>
            </div>
          </React.Fragment>
        ) : (
          <form onSubmit={saveAdmin} id='adminForm'>
            <div className='mb-3 row'>
              <label for='staticEmail' className='col-sm-2 col-form-label'>
                Select Store
              </label>
              <div className='col-sm-4'>
                <select
                  className='form-control'
                  id='storeId'
                  required
                  value={admin.storeId}
                  onChange={handleInputChange}
                  name='storeId'
                >
                  <option value=''>---select---</option>
                  {store.map((h, i) => (
                    <option key={i} value={h.storeId}>
                      {h.storeName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='mb-3 row'>
              <label for='inputPassword' className='col-sm-2 col-form-label'>
                Full Name
              </label>
              <div className='col-sm-6'>
                <input
                  type='text'
                  className='form-control'
                  id='fullName'
                  required
                  value={admin.fullName}
                  onChange={handleInputChange}
                  name='fullName'
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>Email Id</label>
              <div className='col-sm-6'>
                <input
                  type='text'
                  className='form-control'
                  id='emailId'
                  required
                  value={admin.emailId}
                  onChange={handleInputChange}
                  name='emailId'
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>Phone Number</label>
              <div className='col-sm-6'>
                <input
                  type='text'
                  className='form-control'
                  id='phoneNo'
                  required
                  value={admin.phoneNo}
                  onChange={handleInputChange}
                  name='phoneNo'
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>Banner</label>
              <div className='col-sm-6'>
                <input
                  type='text'
                  className='form-control'
                  id='banner'
                  required
                  value={admin.banner}
                  onChange={handleInputChange}
                  name='banner'
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>Date Of Birth</label>
              <div className='col-sm-6'>
                <input
                  type='text'
                  className='form-control'
                  id='dateOfBirth'
                  required
                  value={admin.dateOfBirth}
                  onChange={handleInputChange}
                  name='dateOfBirth'
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <label for='inputPassword' className='col-sm-2 col-form-label'>
                Role
              </label>
              <div className='col-sm-4'>
                <select
                  value={admin.role}
                  onChange={handleInputChange}
                  required
                  className='form-select'
                  aria-label='Select Role'
                  name='role'
                  id='role'
                >
                  <option value=''>Select Role</option>
                  <option value='Admin'>Admin</option>
                  <option value='SuperAdmin'>Super Admin</option>
                </select>
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
                  value={admin.status}
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

export default AddAdmin
