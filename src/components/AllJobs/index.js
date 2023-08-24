import {Link} from 'react-router-dom'
import {BsSearch, BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'

import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConsonants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const AllJobs = props => {
  const {changeSearch, onEnterSearchInput, getJobs} = props

  const onChangeSearch = event => {
    changeSearch(event.target.value)
  }

  const onEnterSearch = event => {
    onEnterSearchInput(event.key)
  }

  const onSearchJobs = () => {
    getJobs()
  }

  const renderSearchInputField = () => {
    const {search} = props

    return (
      <div className="search-bar-container-2">
        <input
          type="search"
          placeholder="Search"
          className="search-bar"
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onEnterSearch}
        />
        <button
          type="button"
          className="search-icon-btn"
          onClick={onSearchJobs}
          data-testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  // rendering Loading view

  const renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const onClickRetryBtn = () => {
    getJobs()
  }

  // rendering failure view

  const renderFailureView = () => (
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
      <button type="button" className="retry-btn" onClick={onClickRetryBtn}>
        Retry
      </button>
    </div>
  )

  // rendering jobs view

  const renderJobsView = () => {
    const {jobs} = props
    const renderJobs = jobs.length > 0

    return renderJobs ? (
      <ul className="all-jobs-list-container">
        {jobs.map(jobItem => (
          <Link
            to={`jobs/${jobItem.id}`}
            key={jobItem.id}
            className="link-item"
          >
            <li className="job-item">
              <div className="card-1">
                <img
                  src={jobItem.companyLogoUrl}
                  alt="company logo"
                  className="company-logo"
                />
                <div className="role-card">
                  <h1 className="role">{jobItem.title}</h1>
                  <div className="rating-card">
                    <AiFillStar className="star" />
                    <p className="rating">{jobItem.rating}</p>
                  </div>
                </div>
              </div>
              <div className="card-2">
                <div className="location-employee-container">
                  <div className="location-card">
                    <MdLocationOn className="location-icon" />
                    <p className="location">{jobItem.location}</p>
                  </div>
                  <div className="brief-case-card">
                    <BsFillBriefcaseFill className="brief-case-icon" />
                    <p className="employment-type">{jobItem.employmentType}</p>
                  </div>
                </div>
                <p className="package">{jobItem.packagePerAnnum}</p>
              </div>
              <hr className="line" />
              <h1 className="role">Description</h1>
              <p className="description">{jobItem.jobDescription}</p>
            </li>
          </Link>
        ))}
      </ul>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-jobs-title">No Jobs Found</h1>
        <p className="no-jobs-para">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  const renderAllJobs = () => {
    const {apiStatus} = props

    switch (apiStatus) {
      case apiStatusConsonants.inProgress:
        return renderLoaderView()
      case apiStatusConsonants.success:
        return renderJobsView()
      case apiStatusConsonants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div className="all-jobs-container">
      {renderSearchInputField()}
      {renderAllJobs()}
    </div>
  )
}

export default AllJobs
