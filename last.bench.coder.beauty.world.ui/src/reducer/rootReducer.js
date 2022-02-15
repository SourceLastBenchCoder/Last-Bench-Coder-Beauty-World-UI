const initialData = {
  isLoggedIn: false,
  adminId: '',
  fullName: '',
  emailId: '',
  role: '',
  accessToken: ''
}

const RootReducer = (state = initialData, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isLoggedIn: true,
        adminId:action.adminId,
        fullName: action.fullName,
        emailId: action.emailId,
        role: action.role,
        accessToken: action.accessToken
      }

    case 'LOGOUT':
      return {
        isLoggedIn: false,
        adminId:'',
        fullName: '',
        emailId: '',
        role: '',
        accessToken: ''
      }

    default:
      return state
  }
}

export default RootReducer
