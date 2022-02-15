import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  BASE_URL,
  STORE_DETAIL_URL,
  STORE_UPDATE_URL
} from '../constatnt/AppConstants'

const UpdateStore = () => {
  const [Store, setStore] = useState({})
  const [error, setError] = useState(false)
  const [isSubmitted, setSubmitted] = useState(false)

  let { StoreId } = useParams()
  const { accessToken, fullName } = useSelector(state => state)

  const handleInputChange = event => {
    const { name, value } = event.target
    setStore({ ...Store, [name]: value })
  }

  const URL_DETAIL = BASE_URL + STORE_DETAIL_URL

  useEffect(() => {
    document.title = 'DashBoard - Store Update'

    fetch(URL_DETAIL + StoreId, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => res.json())
      .then(
        result => {
          setStore(result)
        },
        error => {
          setError(error)
        }
      )
  }, [])

  const URL = BASE_URL + STORE_UPDATE_URL

  const saveStore = () => {
      debugger
    const jsonData = {
      StoreId: Store.storeId,
      storeName: Store.storeName,
      description: Store.description,
      address: Store.address,
      contactDetail: Store.contactDetail,
      zipCode: Store.zipCode,
      createdBy: fullName,
      status: Store.status
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
          Add Store
          <Link to='/store/allstore' className='btn btn-sm btn-primary'>
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
              <Link to='/store/allStore' className='btn btn-primary'>
                Go To List
              </Link>
            </div>
          </React.Fragment>
        ) : (
          <form onSubmit={saveStore}>
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>
                Store Name
              </label>
              <div className='col-sm-6'>
                <input
                  type='text'
                  className='form-control'
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
              <div className='col-sm-6'>
                <textarea
                  type='text'
                  className='form-control'
                  id='description'
                  required
                  value={Store.description}
                  onChange={handleInputChange}
                  name='description'
                ></textarea>
              </div>
            </div>
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>Address</label>
              <div className='col-sm-6'>
                <textarea
                  type='text'
                  className='form-control'
                  id='description'
                  required
                  value={Store.address}
                  onChange={handleInputChange}
                  name='address'
                ></textarea>
              </div>
            </div>
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>Contact Detail</label>
              <div className='col-sm-6'>
                <textarea
                  type='text'
                  className='form-control'
                  id='contactDetail'
                  required
                  value={Store.contactDetail}
                  onChange={handleInputChange}
                  name='contactDetail'
                ></textarea>
              </div>
            </div>
            <div className='mb-3 row'>
              <label className='col-sm-2 col-form-label'>Zip Code</label>
              <div className='col-sm-6'>
                <input
                  type='text'
                  className='form-control'
                  id='zipCode'
                  required
                  value={Store.zipCode}
                  onChange={handleInputChange}
                  name='zipCode'
                />
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
                  value={Store.status}
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

export default UpdateStore
