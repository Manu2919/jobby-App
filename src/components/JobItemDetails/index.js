import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import SimilarJobCard from '../SimilarJobCard'

import Header from '../Header'

import './index.css'

const apiStatusConsonants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {jobData: {}, similarJobs: [], apiStatus: apiStatusConsonants.initial}

  componentDidMount() {
    this.getJobItemData()
  }

  getFormattedData = jobDetails => ({
    companyLogoUrl: jobDetails.company_logo_url,
    companyWebsiteUrl: jobDetails.company_website_url,
    employmentType: jobDetails.employment_type,
    id: jobDetails.id,
    jobDescription: jobDetails.job_description,
    lifeAtCompany: {
      description: jobDetails.life_at_company.description,
      imageUrl: jobDetails.life_at_company.image_url,
    },
    location: jobDetails.location,
    packagePerAnnum: jobDetails.package_per_annum,
    rating: jobDetails.rating,
    skills: jobDetails.skills.map(item => ({
      name: item.name,
      imageUrl: item.image_url,
    })),
    title: jobDetails.title,
  })

  getSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    rating: data.rating,
    location: data.location,
    title: data.title,
  })

  getJobItemData = async () => {
    this.setState({apiStatus: apiStatusConsonants.inProgress})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const updatedData = this.getFormattedData(data.job_details)
      const updatedSimilarJobs = data.similar_jobs.map(eachSimilarJob =>
        this.getSimilarData(eachSimilarJob),
      )
      this.setState({
        jobData: updatedData,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusConsonants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConsonants.failure})
    }
  }

  // rendering in progress view
  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  // rendering failure view
  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="heading">Oops! Something went wrong</h1>
      <p className="para">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn" onClick={this.getJobItemData}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobData, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      rating,
      title,
      location,
      packagePerAnnum,
      skills,
      lifeAtCompany,
    } = jobData

    return (
      <div className="details-container">
        <div className="job-item">
          <div className="card-1">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="role-card">
              <h1 className="role">{title}</h1>
              <div className="rating-card">
                <AiFillStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="card-2">
            <div className="location-employee-container">
              <div className="location-card">
                <MdLocationOn className="location-icon" />
                <p className="location">{location}</p>
              </div>
              <div className="brief-case-card">
                <BsFillBriefcaseFill className="brief-case-icon" />
                <p className="employment-type">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="description-container">
            <h1 className="role">Description</h1>
            <div className="visit-container">
              <a href={companyWebsiteUrl} className="visit-link">
                Visit
              </a>
              <BiLinkExternal className="visit-icon" />
            </div>
          </div>
          <p className="description">{jobDescription}</p>
          <h1 className="skills-title">Skills</h1>
          <ul className="skills-list-container">
            {skills.map(eachSkill => (
              <li className="skill-card" key={eachSkill.name}>
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="skill-img"
                />
                <p className="skill-name">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-title">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              className="life-at-company-image"
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-jobs-title">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobs.map(eachItem => (
            <SimilarJobCard jobItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConsonants.inProgress:
        return this.renderLoaderView()
      case apiStatusConsonants.success:
        return this.renderSuccessView()
      case apiStatusConsonants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-route">
        <Header />
        <div className="job-item-details-container">
          {this.renderJobItemDetails()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
