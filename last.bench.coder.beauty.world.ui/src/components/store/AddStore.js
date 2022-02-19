import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BASE_URL, STORE_CREATE_URL } from '../constatnt/AppConstants'

const defaultImageSrc = '/img/nobanner.png'

const AddStore = () => {
  const initialData = {
    storeName: '',
    description: '',
    address: '',
    zipCode: '',
    contactDetail: '',
    status: '',
    createdBy: '',
    banner: '',
    imageSrc: defaultImageSrc,
    imageFile: null
  }

  const [Store, setStore] = useState(initialData)
  const [isSubmitted, setSubmitted] = useState(false)
  const [isFailed, setIsFailed] = useState({})
  const [errors, setErrors] = useState({})

  const { accessToken, fullName } = useSelector(state => state)

  const handleInputChange = event => {
    const { name, value } = event.target
    setStore({ ...Store, [name]: value })
  }

  const URL = BASE_URL + STORE_CREATE_URL

  useEffect(() => {
    document.title = 'DashBoard - Store Create'
  }, [])

  const showPreview = e => {
    debugger
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0]
      const reader = new FileReader()
      reader.onload = x => {
        setStore({
          ...Store,
          imageFile,
          imageSrc: x.target.result
        })
      }
      reader.readAsDataURL(imageFile)
    } else {
      setStore({
        ...Store,
        imageFile: null,
        imageSrc: defaultImageSrc
      })
    }
  }

  const saveStore = e => {
    e.preventDefault()
    const jsonData = {
      storeName: Store.storeName,
      description: Store.description,
      address: Store.address,
      contactDetail: Store.contactDetail,
      zipCode: Store.zipCode,
      createdBy: fullName,
      status: Store.status
    }

    const formData=new FormData()
    formData.append("storeName",Store.storeName)
    formData.append("description",Store.description)
    formData.append("address",Store.address)
    formData.append("contactDetail",Store.contactDetail)
    formData.append("zipCode",Store.zipCode)
    formData.append("createdBy",Store.createdBy)
    formData.append("status",Store.status)
    formData.append(
      'banner',
      Store.imageFile ? Store.imageFile.name : 'nobanner.png'
    )
    formData.append(
      'imageName',
      Store.imageFile ? Store.imageFile.name : 'nobanner.png'
    )
    formData.append('imageFile', Store.imageFile)

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

  const newStore = () => {
    setStore(initialData)
    setSubmitted(false)
    setIsFailed({})
  }

  const applyErrorClass = field =>
    field in errors && errors[field] == false ? ' invalid-field' : ''

  return (
    <React.Fragment>
      <div className='row'>
        <h5 className='card-header d-flex justify-content-between align-items-center'>
          Add Store
          <Link to='/store/allstore' className='btn btn-sm btn-primary'>
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
              <Link to='/store/allstore' className='btn btn-primary'>
                Go Back to List&nbsp;&nbsp;
                <i className='bi bi-arrow-left'></i>
              </Link>
              &nbsp;&nbsp;
              <button onClick={newStore} className='btn btn-primary'>
                Add New Store&nbsp;&nbsp;
                <i className='bi bi-save'></i>
              </button>
            </div>
          </React.Fragment>
        ) : (
          <form onSubmit={saveStore}>
            <div className='mb-3 row'>
              <label for='inputPassword' className='col-sm-2 col-form-label'>
                Store Name
              </label>
              <div className='col-sm-10'>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  id='storeName'
                  required
                  value={Store.storeName}
                  onChange={handleInputChange}
                  name='storeName'
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>Description</label>
              <div className='col-sm-4'>
                <textarea
                  type='text'
                  className='form-control form-control-sm'
                  id='description'
                  required
                  value={Store.description}
                  onChange={handleInputChange}
                  name='description'
                ></textarea>
              </div>
              <label className='col-sm-2 col-form-label'>Address</label>
              <div className='col-sm-4'>
                <textarea
                  type='text'
                  className='form-control form-control-sm'
                  id='description'
                  required
                  value={Store.address}
                  onChange={handleInputChange}
                  name='address'
                ></textarea>
              </div>
            </div>
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>Banner</label>
              <div className='col-sm-4'>
              <img
                      src={
                        Store.imageSrc
                          ? Store.imageSrc
                          : BASE_URL + '/images/' + Store.banner
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
              <label className='col-sm-2 col-form-label'>Contact Detail</label>
              <div className='col-sm-4'>
                <textarea
                  type='text'
                  className='form-control form-control-sm'
                  id='contactDetail'
                  required
                  value={Store.contactDetail}
                  onChange={handleInputChange}
                  name='contactDetail'
                  style={{height:'190px'}}
                ></textarea>
              </div>
            </div>
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>Zip Code</label>
              <div className='col-sm-4'>
                <input
                  type='text'
                  className='form-control form-control-sm'
                  id='zipCode'
                  required
                  value={Store.zipCode}
                  onChange={handleInputChange}
                  name='zipCode'
                />
              </div>
              <label className='col-sm-2 col-form-label'>Created By</label>
              <div className='col-sm-4'>
              <input
                  type='text'
                  className='form-control form-control-sm'
                  id='fullName'
                  required
                  value={fullName}
                  onChange={handleInputChange}
                  name='fullName'
                  readOnly
                />
              </div>              
            </div>
            <div className='mb-3 row'>
            <label className='col-sm-2 col-form-label'>Status</label>
              <div className='col-sm-4'>
                <select
                  value={Store.status}
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

export default AddStore
