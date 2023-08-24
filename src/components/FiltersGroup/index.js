import {BsSearch} from 'react-icons/bs'
import ProfileCard from '../ProfileCard'
import './index.css'

const FiltersGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    changeSearch,
    onEnterSearchInput,
    getJobs,
    changeEmploymentType,
    changeSalaryRange,
  } = props

  const changeSearchInput = event => {
    changeSearch(event.target.value)
  }

  const onClickEnter = event => {
    onEnterSearchInput(event.key)
  }

  const onSearchJobs = () => {
    getJobs()
  }

  const renderSearchInputField = () => {
    const {search} = props

    return (
      <div className="search-bar-container">
        <input
          type="search"
          placeholder="Search"
          className="search-bar"
          value={search}
          onChange={changeSearchInput}
          onKeyDown={onClickEnter}
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

  const changeEmployment = event => {
    changeEmploymentType(event.target.value)
  }

  const renderEmploymentCategory = () => (
    <div className="employment-container">
      <h1 className="type-of-employment-title">Type of Employment</h1>
      <ul className="employments-card">
        {employmentTypesList.map(item => (
          <li
            className="employment-item"
            key={item.employmentTypeId}
            onChange={changeEmployment}
          >
            <input
              value={item.employmentTypeId}
              type="checkbox"
              id={item.employmentTypeId}
              className="checkbox"
            />
            <label htmlFor={item.employmentTypeId} className="employment-label">
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const changeSalary = event => {
    changeSalaryRange(event.target.value)
  }

  const renderSalaryRangeCategory = () => (
    <div className="salary-container">
      <h1 className="salary-range-title">Salary Range</h1>
      <ul className="salary-card">
        {salaryRangesList.map(item => (
          <li
            className="salary-item"
            key={item.salaryRangeId}
            onClick={changeSalary}
          >
            <input
              type="radio"
              id={item.salaryRangeId}
              name="salary"
              className="radio"
              value={item.salaryRangeId}
            />
            <label htmlFor={item.salaryRangeId} className="salary-label">
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="filters-group-container">
      {renderSearchInputField()}
      <ProfileCard />
      <hr className="horizontal-line" />
      {renderEmploymentCategory()}
      <hr className="horizontal-line" />
      {renderSalaryRangeCategory()}
    </div>
  )
}

export default FiltersGroup
