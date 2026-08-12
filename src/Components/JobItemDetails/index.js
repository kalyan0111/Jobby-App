import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoSearch} from 'react-icons/io5'
import {FiExternalLink} from 'react-icons/fi'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {jobItemApiStatus: apiStatusConstants.initial, jobItemDetails: []}

  componentDidMount = () => {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({jobItemApiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateddata = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          skills: data.job_details.skills.map(eachSkill => ({
            imageUrl: eachSkill.image_url,
            name: eachSkill.name,
          })),
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          title: data.job_details.title,
        },
        similarJobs: data.similar_jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          rating: eachJob.rating,
          title: eachJob.title,
        })),
      }
      this.setState({
        jobItemApiStatus: apiStatusConstants.success,
        jobItemDetails: updateddata,
      })
    } else {
      this.setState({jobItemApiStatus: apiStatusConstants.failure})
    }
  }

  jobItemLoadingView = () => (
    <div className="profileCardRetryButton" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobItemSuccessView = () => {
    const {jobItemDetails} = this.state
    const {jobDetails, similarJobs} = jobItemDetails
    console.log(jobDetails)

    return (
      <>
        <div className="jobItemCard">
          <div className="titleDiv">
            <img
              src={jobDetails.companyLogoUrl}
              className="Companylogo"
              alt="job details company logo"
            />
            <div>
              <h1 className="jobhead">{jobDetails.title}</h1>
              <div className="ratingDiv">
                <BsStarFill className="starIcon" />
                <p className="ratingPara">{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="locationDiv">
            <div className="location-employee-div">
              <div className="locationDivv">
                <MdLocationOn className="location-icon" />
                <p>{jobDetails.location}</p>
              </div>
              <div className="employeeTypeDivv">
                <BsBriefcaseFill className="briefcase-icon" />
                <p>{jobDetails.employmentType}</p>
              </div>
            </div>
            <div className="lpaDiv">
              <p>{jobDetails.packagePerAnnum}</p>
            </div>
          </div>
          <hr className="separatorr" />
          <div className="locationDiv">
            <h1 className="descriptionhead">Description</h1>
            <a href={jobDetails.companyWebsiteUrl}>
              Visit <FiExternalLink className="visit-icon" />
            </a>
          </div>
          <p className="descriptionPara">{jobDetails.jobDescription}</p>
          <h1 className="descriptionhead">Skills</h1>
          <ul className="skillsUl">
            {jobDetails.skills.map(each => (
              <li className="skillsList" key={each.name}>
                <img
                  src={each.imageUrl}
                  className="SkillsImage"
                  alt={each.name}
                />
                <p className="skillName">{each.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="descriptionhead">Life at Company</h1>
          <div className="lifeAtCompanyDiv">
            <p>{jobDetails.lifeAtCompany.description}</p>
            <img
              src={jobDetails.lifeAtCompany.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similsrdescriptionhead">Similar Jobs</h1>
        <ul className="similarJobDiv">
          {similarJobs.map(each => (
            <li className="similarJobsLi" key={each.id}>
              <div className="titleDiv">
                <img
                  src={each.companyLogoUrl}
                  className="Companylogo"
                  alt="similar job company logo"
                />
                <div>
                  <h1 className="jobhead">{each.title}</h1>
                  <div className="ratingDiv">
                    <BsStarFill className="starIcon" />
                    <p className="ratingPara">{each.rating}</p>
                  </div>
                </div>
              </div>
              <h1 className="descriptionhead">Description</h1>
              <p className="descriptionPara">{each.jobDescription}</p>
              <div className="location-employee-div">
                <div className="locationDivv">
                  <MdLocationOn className="location-icon" />
                  <p>{each.location}</p>
                </div>
                <div className="employeeTypeDivv">
                  <BsBriefcaseFill className="briefcase-icon" />
                  <p>{each.employmentType}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  getJobsitemmDetails = () => {
    this.getJobItemDetails()
  }

  jobItemFailureView = () => (
    <div className="jobsFailureDiv">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="LoginButton"
        onClick={this.getJobsitemmDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemView = () => {
    const {jobItemApiStatus} = this.state
    switch (jobItemApiStatus) {
      case apiStatusConstants.inProgress:
        return this.jobItemLoadingView()
      case apiStatusConstants.success:
        return this.jobItemSuccessView()
      case apiStatusConstants.failure:
        return this.jobItemFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobitemContainer">
        <Header />
        <div className="jobItemCar">{this.renderJobItemView()}</div>
      </div>
    )
  }
}

export default JobItemDetails