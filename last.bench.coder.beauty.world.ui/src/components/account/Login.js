import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Constants from '../constatnt/AppConstants'
import ErrorNotification from '../shared/ErrorNotification'
import SuccessNotification from '../shared/SuccesNotification'
import '../../assets/css/login.css'

const Login = () => {
  const initialLoginInfo = {
    userId: '',
    password: ''
  }

  const dispatch = useDispatch()

  const [loginInfo, setLoginInfo] = useState(initialLoginInfo)
  const [loginFailed, setLoginFailed] = useState(false)
  const [error, setError] = useState(null)
  
  const url = Constants.BASE_URL + Constants.LOGIN_URL

  const handleInputChange = event => {
    const { name, value } = event.target
    setLoginInfo({ ...loginInfo, [name]: value })
  }

  const fetchData = e => {
    e.preventDefault()
    let jsonData = {
      userId: loginInfo.userId,
      password: loginInfo.password
    }

    fetch(url, {
      // Enter your IP address here
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(jsonData), // body data type must match "Content-Type" header,
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then(res => res.json())
      .then(
        result => {
          debugger
          if (result.status === undefined || result.status != '401')
            dispatch({
              type: 'LOGIN',
              isLoggedIn: true,
              adminId:result.userUniqueId,
              fullName: result.userId,
              emailId: result.emailId,
              role: result.role,
              accessToken: result.token
            })
          else setLoginFailed(true)
        },
        error => {
          setError(error)
        }
      )
  }

  return (
    <form onSubmit={fetchData}>
        <div className="text-center">
            <main className="form-signin">
                <h1 className="h3 mb-3 fw-normal">S3 Beauty World</h1>
                {loginFailed ?
                    (
                        <div class="alert alert-danger" role="alert">
                            Oops! Login Gailed due to invalid user id or password
                        </div>
                    ) : (
                        ""
                    )}
                {error ?
                    (
                        <div class="alert alert-danger" role="alert">
                            {error.message}
                        </div>
                    ) : (
                        ""
                    )}
                <label>User Id</label>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        id="userId"
                        required
                        value={loginInfo.userId}
                        onChange={handleInputChange}
                        name="userId"
                    />

                </div>
                <label>Password</label>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        required
                        value={loginInfo.password}
                        onChange={handleInputChange}
                        name="password"
                    />
                </div>

                <div className="checkbox mb-3">
                    <a href='#'>Dont Remember Password?</a>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </main>
        </div>
    </form>
)
}

export default Login
