import React from 'react'
import { useSelector } from 'react-redux'

const LoginProfile = () => {

    const myLoginInfo = useSelector(state => state)

    return (
        <React.Fragment>
            <div className="row">
                <h5 className="card-header d-flex justify-content-between align-items-center">
                    My Login Info
                </h5>
            </div>
            <br />
            <div className="col-md-8">
                <dl className="row">
                    <dt className="col-sm-3">User Name : </dt>
                    <dd className="col-sm-9">{myLoginInfo.fullName}</dd>
                    <dt className="col-sm-3">Email Id : </dt>
                    <dd className="col-sm-9">{myLoginInfo.emailId}</dd>
                    <dt className="col-sm-3">Role : </dt>
                    <dd className="col-sm-9">{myLoginInfo.role}</dd>
                    <dt className="col-sm-3">Access Token : </dt>
                    <dd className="col-sm-9">{myLoginInfo.accessToken}</dd>
                </dl>
            </div>
        </React.Fragment>
    )
}

export default LoginProfile