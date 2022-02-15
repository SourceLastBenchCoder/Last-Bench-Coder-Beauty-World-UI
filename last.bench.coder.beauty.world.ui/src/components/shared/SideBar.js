import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div
      className='offcanvas offcanvas-start sidebar-nav bg-dark'
      id='sidebar'
    >
      <hr className='dropdown-divider bg-light' />
      <div className='offcanvas-body p-0'>
        <nav className='navbar-dark'>
          <ul className='navbar-nav'>
            <li>
              <a
                className='nav-link px-3 sidebar-link'
                data-bs-toggle='collapse'
                href='#layouts_admin'
              >
                <span className='me-2'>
                  <i className='bi bi-files'></i>
                </span>
                <span>Admin & Store</span>
                <span className='ms-auto'>
                  <span className='right-icon'>
                    <i className='bi bi-chevron-down'></i>
                  </span>
                </span>
              </a>
              <div className='collapse' id='layouts_admin'>
                <ul className='navbar-nav ps-3'>
                  <li>
                    <Link to='/store/allstore' className='nav-link px-3'>
                      <span className='me-2'>
                        <i className='bi bi-files'></i>
                      </span>
                      <span>All Store</span>
                    </Link>
                  </li>
                  <li>
                    <Link to='/store/addstore' className='nav-link px-3'>
                      <span className='me-2'>
                        <i className='bi bi-files'></i>
                      </span>
                      <span>Add Store</span>
                    </Link>
                  </li>
                  <hr className='dropdown-divider bg-light' />
                  <li>
                    <Link to='/admin/alladmin' className='nav-link px-3'>
                      <span className='me-2'>
                        <i className='bi-person-circle'></i>
                      </span>
                      <span>All Admin</span>
                    </Link>
                  </li>
                  <li>
                    <Link to='/admin/addadmin' className='nav-link px-3'>
                      <span className='me-2'>
                        <i className='bi-person-circle'></i>
                      </span>
                      <span>Add Admin</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <ul className='navbar-nav'>
            <li>
              <a
                className='nav-link px-3 sidebar-link'
                data-bs-toggle='collapse'
                href='#layouts_category'
              >
                <span className='me-2'>
                  <i className='bi bi-files'></i>
                </span>
                <span>Categories</span>
                <span className='ms-auto'>
                  <span className='right-icon'>
                    <i className='bi bi-chevron-down'></i>
                  </span>
                </span>
              </a>
              <div className='collapse' id='layouts_category'>
                <ul className='navbar-nav ps-3'>
                  <li>
                    <Link to='/category/allcategory' className='nav-link px-3'>
                      <span className='me-2'>
                        <i className='bi bi-files'></i>
                      </span>
                      <span>All Category</span>
                    </Link>
                  </li>
                  <li>
                    <Link to='/category/addcategory' className='nav-link px-3'>
                      <span className='me-2'>
                        <i className='bi bi-files'></i>
                      </span>
                      <span>Add Category</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default SideBar
