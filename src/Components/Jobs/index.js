import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoSearch} from 'react-icons/io5'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileDetails: [],
    JobDetails: [],
    profileApiStatus: apiStatusConstants.initial,
    jobsApiStatus: apiStatusConstants.initial,
    employmentTypes: [],
    minimumPackage: '',
    searchInput: '',
  }

  componentDidMount = () => {
    this.getprofileDetails()
    this.getJobsDetails()
  }

  getprofileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const profileapiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const profileresponse = await fetch(profileapiUrl, options)

    if (profileresponse.ok === true) {
      const profilefetchedData = await profileresponse.json()
      const profileUpdatedData = {
        name: profilefetchedData.profile_details.name,
        profileImageUrl: profilefetchedData.profile_details.profile_image_url,
        shortBio: profilefetchedData.profile_details.short_bio,
      }
      this.setState({
        profileDetails: profileUpdatedData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  getJobsDetails = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const {employmentTypes, minimumPackage, searchInput} = this.state
    const employmentTypeString = employmentTypes.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const jobsapiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${minimumPackage}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const jobsresponse = await fetch(jobsapiUrl, options)

    if (jobsresponse.ok === true) {
      const jobsfetchedData = await jobsresponse.json()

      const jobUpdateddata = jobsfetchedData.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        JobDetails: jobUpdateddata,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  profileSuccessView = () => {
    const {profileDetails, JobDetails} = this.state
    return (
      <div className='profileCard'>
        <img src={profileDetails.profileImageUrl} alt='profile' />
        <h1>{profileDetails.name}</h1>
        <p>{profileDetails.shortBio}</p>
      </div>
    )
  }

  profileFailureView = () => (
    <div className='profileCardRetryButton'>
      <button
        type='button'
        className='LoginButton'
        onClick={this.getprofileDetails}
      >
        Retry
      </button>
    </div>
  )

  profileLoadingView = () => (
    <div className='profileCardRetryButton' data-testid='loader'>
      <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
    </div>
  )

  renderProfileView = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusConstants.inProgress:
        return this.profileLoadingView()
      case apiStatusConstants.success:
        return this.profileSuccessView()
      case apiStatusConstants.failure:
        return this.profileFailureView()
      default:
        return null
    }
  }

  onChangeSearchINput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.getJobsDetails()
  }

  jobsSuccessView = () => {
    const {JobDetails, searchInput, employmentTypes} = this.state
    if (JobDetails.length === 0) {
      return (
        <div className='jobsFailureDiv'>
          <img
            src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png'
            alt='no jobs'
          />
          <h1>No Jobs Found</h1>
          <p>We Could not find any jobs. Try other filters.</p>
        </div>
      )
    }

    return (
      <div className='jobsContainer'>
        <ul className='jobcard'>
          {JobDetails.map(each => (
            <Link to={`/jobs/${each.id}`} className='nav-link' key={each.id}>
              <li className='jobItemDiv'>
                <div className='titleDiv'>
                  <img
                    src={each.companyLogoUrl}
                    className='Companylogo'
                    alt='company logo'
                  />
                  <div>
                    <h1 className='jobhead'>{each.title}</h1>
                    <div className='ratingDiv'>
                      <BsStarFill className='starIcon' />
                      <p className='ratingPara'>{each.rating}</p>
                    </div>
                  </div>
                </div>
                <div className='locationDiv'>
                  <div className='location-employee-div'>
                    <div className='locationDivv'>
                      <MdLocationOn className='location-icon' />
                      <p>{each.location}</p>
                    </div>
                    <div className='employeeTypeDivv'>
                      <BsBriefcaseFill className='briefcase-icon' />
                      <p>{each.employmentType}</p>
                    </div>
                  </div>
                  <div className='lpaDiv'>
                    <p>{each.packagePerAnnum}</p>
                  </div>
                </div>
                <hr className='separator' />
                <h1 className='descriptionhead'>Description</h1>
                <p className='descriptionPara'>{each.jobDescription}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  jobsFailureView = () => (
    <div className='jobsFailureDiv'>
      <img
        src='https://assets.ccbp.in/frontend/react-js/failure-img.png'
        alt='failure view'
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type='button'
        className='LoginButton'
        onClick={this.getJobsDetails}
      >
        Retry
      </button>
    </div>
  )

  jobsLoadingView = () => (
    <div className='jobsFailureDiv' data-testid='loader'>
      <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
    </div>
  )

  renderJobsView = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.jobsLoadingView()
      case apiStatusConstants.success:
        return this.jobsSuccessView()
      case apiStatusConstants.failure:
        return this.jobsFailureView()
      default:
        return null
    }
  }

  onChangeEmploymentType = event => {
    const {employmentTypes} = this.state
    const {value, checked} = event.target

    if (checked) {
      const updatedTypes = [...employmentTypes, value]
      this.setState({employmentTypes: updatedTypes}, this.getJobsDetails)
    } else {
      const updatedTypes = employmentTypes.filter(each => each !== value)
      this.setState({employmentTypes: updatedTypes}, this.getJobsDetails)
    }
  }

  onChangeSalaryRange = event => {
    this.setState({minimumPackage: event.target.value}, this.getJobsDetails)
  }

  render() {
    const {searchInput, employmentTypes} = this.state
    console.log(employmentTypes)

    return (
      <div className='jobContainer'>
        <Header />
        <div className='jobDivv'>
          <div className='profileContainer'>
            {this.renderProfileView()}
            <hr className='separator' />
            <ul className='employeeTypeDiv'>
              <h1 className='descriptionhead'>Type of Employment</h1>
              {employmentTypesList.map(each => (
                <li key={each.employmentTypeId}>
                  <input
                    type='checkbox'
                    id={each.employmentTypeId}
                    className='check-input'
                    value={each.employmentTypeId}
                    onChange={this.onChangeEmploymentType}
                  />
                  <label
                    htmlFor={each.employmentTypeId}
                    className='check-label'
                  >
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className='separator' />
            <ul className='employeeTypeDiv'>
              <h1 className='descriptionhead'>Salary Range</h1>
              {salaryRangesList.map(each => (
                <li key={each.salaryRangeId}>
                  <input
                    type='radio'
                    id={each.salaryRangeId}
                    name='salary'
                    className='radio-input'
                    value={each.salaryRangeId}
                    onChange={this.onChangeSalaryRange}
                  />
                  <label htmlFor={each.salaryRangeId} className='radio-label'>
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className='jobsContainer'>
            <div className='searchDiv'>
              <input
                type='search'
                className='search-input'
                placeholder='Search'
                onChange={this.onChangeSearchINput}
                value={searchInput}
              />
              <button
                type='button'
                className='searchButton'
                onClick={this.onClickSearchButton}
                data-testid='searchButton'
              >
                <IoSearch className='inputIcon' />
              </button>
            </div>
            {this.renderJobsView()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs