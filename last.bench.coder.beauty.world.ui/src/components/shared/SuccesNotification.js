const SuccessNotification = props => {
  return (
    <div className='alert alert-success alert-dismissible fade show' role='alert'>
      <span className='alert-icon'>
      </span>
      <span className="alert-text-color">
        <strong>Success!</strong> {props.message}!
      </span>
    </div>
  )
}

export default SuccessNotification
