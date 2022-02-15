const ErrorNotification = props => {
  return (
    <div className='alert alert-danger alert-dismissible fade show' role='alert'>
      <span className='alert-icon'>
      </span>
      <span className="alert-text-color">
        <strong>Failed!</strong> {props.message}!
      </span>
    </div>
  )
}

export default ErrorNotification
