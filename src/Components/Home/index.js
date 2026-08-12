import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="homeContainer">
        <Header />
        <div className="homeTitleDiv">
          <h1 className="homeHead">Find The Job That Fits Your Life </h1>
          <p className="homepara">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job taht fits your abilities and potential
          </p>
          <Link className="nav-link" to="/jobs">
            <button type="button" className="LogoutButton">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home