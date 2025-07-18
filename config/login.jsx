import React from 'react'
import loginImage from './assets/user-interface.png'; // adjust the path if needed


const Login = ()=>{
    return(
        <>
            <div className="page" id='bg'>
  <div className="page-single">
    <div className="container">
      <div className="justify-content-center">
        <div className="col-md-12">
          <div className="card p-4 mb-0 mt-7 mt-md-2">
            <div className="card-body">
              
              <div className="btn-list d-lg-flex">
                
               
               
              </div>
              <img className="divider my-4" />
              <img
  src={loginImage}
  alt="Login Divider"
  className="my-2 img-fluid"
  style={{ maxWidth: '100px', height: 'auto' }}
/>

              <div className="input-group mb-3">
                <span className="input-group-addon">
                  <svg
                    className="svg-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    height={24}
                    viewBox="0 0 24 24"
                    width={24}
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                      d="M12 16c-2.69 0-5.77 1.28-6 2h12c-.2-.71-3.3-2-6-2z"
                      opacity=".3"
                    />
                    <circle cx={12} cy={8} opacity=".3" r={2} />
                    <path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H6zm6-6c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                />
              </div>
              <div className="input-group mb-4">
                <span className="input-group-addon">
                  <svg
                    className="svg-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    height={24}
                    viewBox="0 0 24 24"
                    width={24}
                  >
                    <g fill="none">
                      <path d="M0 0h24v24H0V0z" />
                      <path d="M0 0h24v24H0V0z" opacity=".87" />
                    </g>
                    <path
                      d="M6 20h12V10H6v10zm6-7c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"
                      opacity=".3"
                    />
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                  </svg>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <div className="row">
                <div className="col-12">
                  <a
                    href="index.html"
                    className="btn btn-lg btn-primary btn-block w-100"
                  >
                    <i className="fe fe-arrow-right" /> Login
                  </a>
                </div>
                <div className="col-12">
                  <a
                    href="forgot.html"
                    className="btn btn-link text-primary box-shadow-0 px-0"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center pt-4">
            <div className="fw-normal fs-16">
              You Don't have an account{" "}
              <a className="btn-link fw-normal text-primary" href="index.html">
                Register Here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </>
    )
}
export default Login;