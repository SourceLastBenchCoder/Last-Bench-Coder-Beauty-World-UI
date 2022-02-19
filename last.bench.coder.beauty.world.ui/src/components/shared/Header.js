import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../constatnt/AppConstants'

const Header = () => {
  const loginInfo = useSelector(state => state)
  const welcomeMessage = 'Welcome, ' + loginInfo.fullName
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark fixed-top'>
      <div className='container-fluid'>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#sidebar'
          aria-controls='offcanvasExample'
        >
          <span
            className='navbar-toggler-icon'
            data-bs-target='#sidebar'
          ></span>
        </button>
        <Link
          className='navbar-brand me-auto ms-lg-0 ms-3 text-uppercase fw-bold'
          href='#'
          to='/'
        >
          S3 Beauty World
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#topNavBar'
          aria-controls='topNavBar'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='topNavBar'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle ms-2'
                href='#'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                <img
                  src={BASE_URL + '/images/' + loginInfo.banner}
                  height={20}
                  width={20}
                  style={{
                    borderRadius: '20px',
                    border: '3px solid lightblue'
                  }}
                />
                &nbsp;&nbsp;
                {welcomeMessage.toUpperCase()}
              </a>
              <ul className='dropdown-menu dropdown-menu-end'>
                <li>
                  <Link
                    to='/admin/loginprofile'
                    className='dropdown-item'
                    href='#'
                  >
                    Login Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: '/admin/updatepassword/' + `${loginInfo.adminId}`
                    }}
                    className='dropdown-item'
                    href='#'
                  >
                    Account Password
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: '/admin/detailadmin/' + `${loginInfo.adminId}`
                    }}
                    className='dropdown-item'
                    href='#'
                  >
                    Account
                  </Link>
                </li>
                <li>
                  <a className='dropdown-item' onClick={handleLogout} href='#'>
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
