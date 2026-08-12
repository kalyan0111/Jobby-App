import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickHome = () => {
    const {history} = props
    console.log(history)
    history.replace('/')
  }

  const onClickJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <ul className="headerDiv">
      <li>
        <Link className="nav-link" to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/">
          <button
            type="button"
            className="HomeTextButton"
            onClick={onClickHome}
          >
            Home
          </button>
        </Link>
        <Link className="nav-link" to="/jobs">
          <button
            type="button"
            className="HomeTextButton"
            onClick={onClickJobs}
          >
            Jobs
          </button>
        </Link>
      </li>
      <li>
        <button type="button" className="LogoutButton" onClick={onClickLogout}>
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)