import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Link, useParams } from 'react-router-dom'
import {
  BASE_URL,
  ADMIN_UPDATE_URL,
  ADMIN_DETAIL_URL
} from '../constatnt/AppConstants'

export default function UpdatePassword () {
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is mendatory')
      .min(4, 'Password must be at 4 char long'),
    confirmPwd: Yup.string()
      .required('Password is mendatory')
      .oneOf([Yup.ref('password')], 'Passwords does not match')
  })

  const formOptions = { resolver: yupResolver(formSchema) }
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const [admin, setAdmin] = useState({})
  const [isSubmitted, setSubmitted] = useState(false)

  let { AdminId } = useParams()
  const { accessToken, fullName } = useSelector(state => state)

  const { errors } = formState
  const URL = BASE_URL + ADMIN_UPDATE_URL
  const URL_DETAIL = BASE_URL + ADMIN_DETAIL_URL

  useEffect(() => {
    document.title = 'DashBoard - Reset Account Password'

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

  function onSubmit (data, e) {
    console.log(JSON.stringify(data, null, 4))

    e.preventDefault()

    const formData = new FormData()
    formData.append('adminId', AdminId)
    formData.append('password', data.password)
    alert(data.password)
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
          alert(result.detil)
        } else {
          setSubmitted(true)
        }
      })

    return false
  }

  const passwordUpdate = () => {
    setSubmitted(false)
  }

  return (
    <React.Fragment>
      <div className='row'>
        <h5 className='card-header d-flex justify-content-between align-items-center'>
          Reset Account Password
          <Link to='/Admin/alladmin' className='btn btn-sm btn-primary'>
            Go Back to List&nbsp;&nbsp;
            <i className='bi bi-arrow-left'></i>
          </Link>
        </h5>
      </div>
      <br />
      {isSubmitted ? (
        <React.Fragment>
          <div className='col-sm-12'>
            <div className='alert alert-success' role='alert'>
              Hurray! Password Updated Successfully
            </div>
          </div>
        </React.Fragment>
      ) : (
        ''
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label>Password</label>
          <div className='col-sm-4'>
            <input
              name='password'
              type='password'
              {...register('password')}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            <div className='invalid-feedback'>{errors.password?.message}</div>
          </div>
        </div>
        <div className='form-group'>
          <label>Confirm Password</label>
          <div className='col-sm-4'>
            <input
              name='confirmPwd'
              type='password'
              {...register('confirmPwd')}
              className={`form-control ${
                errors.confirmPwd ? 'is-invalid' : ''
              }`}
            />
            <div className='invalid-feedback'>{errors.confirmPwd?.message}</div>
          </div>
        </div>
        <div className='mt-3'>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </form>
    </React.Fragment>
  )
}
