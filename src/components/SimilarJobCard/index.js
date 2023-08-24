import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobCard = props => {
  const {jobItem} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    rating,
    location,
    title,
  } = jobItem

  return (
    <div className="job-item-1">
      <div className="card-11">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo-1"
        />
        <div className="role-card-1">
          <h1 className="role-1">{title}</h1>
          <div className="rating-card-1">
            <AiFillStar className="star-1" />
            <p className="rating-1">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="role-1">Description</h1>
      <p className="description-1">{jobDescription}</p>
      <div className="location-employee-container-1">
        <div className="location-card-1">
          <MdLocationOn className="location-icon-1" />
          <p className="location-1">{location}</p>
        </div>
        <div className="brief-case-card-1">
          <BsFillBriefcaseFill className="brief-case-icon-1" />
          <p className="employment-type-1">{employmentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobCard
