import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  BASE_URL,
  ADMIN_UPDATE_URL,
  STORE_LIST_URL,
  ADMIN_DETAIL_URL
} from '../constatnt/AppConstants'

const defaultImageSrc = '/img/nobanner.png'

const UpdateAdmin = () => {
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
    status: '',
    imageSrc: defaultImageSrc,
    imageFile: null
  }

  const [admin, setAdmin] = useState(initialData)
  const [store, setStore] = useState([])
  const [isSubmitted, setSubmitted] = useState(false)
  const [isFailed, setIsFailed] = useState({})
  const [errors, setErrors] = useState({})

  let { AdminId } = useParams()
  const { accessToken, fullName } = useSelector(state => state)

  const handleInputChange = event => {
    const { name, value } = event.target
    setAdmin({ ...admin, [name]: value })
  }

  const URL = BASE_URL + ADMIN_UPDATE_URL
  const STORE_URL = BASE_URL + STORE_LIST_URL
  const URL_DETAIL = BASE_URL + ADMIN_DETAIL_URL

  useEffect(() => {
    document.title = 'DashBoard - Admin Update'

    fetch(STORE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => res.json())
      .then(result => {
        setStore(result)
      })

    fetch(URL_DETAIL + AdminId, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => res.json())
      .then(result => {
        setAdmin(result)
      })
  }, [])

  const saveAdmin = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('adminId', admin.adminId)
    formData.append('storeId', admin.storeId)
    formData.append('fullName', admin.fullName)
    formData.append('emailId', admin.emailId)
    formData.append('phoneNo', admin.phoneNo)
    formData.append(
      'banner',
      admin.imageFile ? admin.imageFile.name : 'nobanner.png'
    )
    formData.append('dateOfBirth', admin.dateOfBirth)
    formData.append('loginId', admin.loginId)
    formData.append('password', admin.password)
    formData.append('role', admin.role)
    formData.append('status', admin.status)
    formData.append('createdBy', fullName)
    formData.append(
      'imageName',
      admin.imageFile ? admin.imageFile.name : 'nobanner.png'
    )
    formData.append('imageFile', admin.imageFile)

    fetch(URL, {
      method: 'POST',
      mode: 'cors',
      body: formData,
      headers: {
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

  const showPreview = e => {
    debugger
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0]
      const reader = new FileReader()
      reader.onload = x => {
        setAdmin({
          ...admin,
          imageFile,
          imageSrc: x.target.result
        })
      }
      reader.readAsDataURL(imageFile)
    } else {
      setAdmin({
        ...admin,
        imageFile: null,
        imageSrc: defaultImageSrc
      })
    }
  }

  const newAdmin = () => {
    setAdmin(initialData)
    setSubmitted(false)
    setIsFailed({})
  }

  const applyErrorClass = field =>
    field in errors && errors[field] == false ? ' invalid-field' : ''

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
              <label className='col-sm-2 col-form-label'>Select Store</label>
              <div className='col-sm-4'>
                <select
                  className='form-control form-control-sm'
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
              <label className='col-sm-2 col-form-label'>Full Name</label>
              <div className='col-sm-4'>
                <input
                  type='text'
                  className='form-control form-control-sm'
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
              <div className='col-sm-4'>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  id='emailId'
                  required
                  value={admin.emailId}
                  onChange={handleInputChange}
                  name='emailId'
                  readOnly='true'
                />
              </div>
              <label className='col-sm-2 col-form-label'>Phone Number</label>
              <div className='col-sm-4'>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  id='phoneNo'
                  required
                  value={admin.phoneNo}
                  onChange={handleInputChange}
                  name='phoneNo'
                  readOnly='true'
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>Banner</label>
              <div className='col-sm-4'>
              <img
                      src={
                        admin.imageSrc
                          ? admin.imageSrc
                          : BASE_URL + '/images/' + admin.banner
                      }
                      className='card-img-top mb-3'
                      style={{width:'150px'}}
                    />
                    <br/>
                    <input
                      type='file'
                      accept='image/*'
                      className={
                        'form-control-file form-control-sm' + applyErrorClass('imageSrc')
                      }
                      onChange={showPreview}
                      id='image-uploader'
                    />
              </div>
              <label className='col-sm-2 col-form-label'>Date Of Birth</label>
              <div className='col-sm-4'>
                <input
                  type='datetime'
                  className='form-control form-control-sm'
                  id='dateOfBirth'
                  required
                  value={admin.dateOfBirth}
                  onChange={handleInputChange}
                  name='dateOfBirth'
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>Login User Id</label>
              <div className='col-sm-4'>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  id='dateOfBirth'
                  required
                  value={admin.loginId}
                  onChange={handleInputChange}
                  name='loginId'
                  readOnly
                />
              </div>
              <label className='col-sm-2 col-form-label'>Password</label>
              <div className='col-sm-4'>
                <input
                  type='password'
                  className='form-control form-control-sm'
                  id='password'
                  required
                  value={admin.password}
                  onChange={handleInputChange}
                  name='password'
                  readOnly
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <label for='inputPassword' className='col-sm-2 col-form-label'>
                Role
              </label>
              <div className='col-sm-4 form-control-sm'>
                <select
                  value={admin.role}
                  onChange={handleInputChange}
                  required
                  className='form-control form-control-sm'
                  aria-label='Select Role'
                  name='role'
                  id='role'
                >
                  <option value=''>Select Role</option>
                  <option value='Admin'>Admin</option>
                  <option value='SuperAdmin'>Super Admin</option>
                </select>
              </div>
              <label className='col-sm-2 col-form-label'>Created By</label>
              <div className='col-sm-4'>
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
                  className='form-control form-control-sm'
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

export default UpdateAdmin
