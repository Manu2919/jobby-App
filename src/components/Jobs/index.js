import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import AllJobs from '../AllJobs'
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

const apiStatusConsonants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    jobs: [],
    apiStatus: apiStatusConsonants.initial,
    employmentType: [],
    minimumPackage: 0,
    search: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const {employmentType, minimumPackage, search} = this.state
    this.setState({apiStatus: apiStatusConsonants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${minimumPackage}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.jobs.map(eachJob => ({
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({jobs: updatedData, apiStatus: apiStatusConsonants.success})
    } else {
      this.setState({apiStatus: apiStatusConsonants.failure})
    }
    console.log(data)
  }

  changeSearch = value => {
    this.setState({search: value})
  }

  onEnterSearchInput = key => {
    if (key === 'Enter') {
      this.getJobs()
    }
  }

  changeEmploymentType = type => {
    this.setState(
      prevState => ({
        employmentType: [...prevState.employmentType, type],
      }),
      this.getJobs,
    )
  }

  changeSalaryRange = salary => {
    this.setState({minimumPackage: salary}, this.getJobs)
  }

  render() {
    const {jobs, apiStatus, search} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <FiltersGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            search={search}
            changeSearch={this.changeSearch}
            onEnterSearchInput={this.onEnterSearchInput}
            getJobs={this.getJobs}
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
          />
          <AllJobs
            jobs={jobs}
            apiStatus={apiStatus}
            search={search}
            changeSearch={this.changeSearch}
            onEnterSearchInput={this.onEnterSearchInput}
            getJobs={this.getJobs}
          />
        </div>
      </>
    )
  }
}

export default Jobs
