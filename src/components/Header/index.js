import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="logo-tabs-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
        </Link>

        <ul className="tabs-container">
          <Link to="/">
            <li>
              <AiFillHome className="icon" />
            </li>
          </Link>
          <Link to="/jobs">
            <li>
              <BsFillBriefcaseFill className="icon" />
            </li>
          </Link>
          <li>
            <FiLogOut className="icon" onClick={onClickLogout} />
          </li>
        </ul>
        <ul className="tabs-text-container">
          <Link to="/" className="link-item">
            <li className="tab-item">Home</li>
          </Link>
          <Link to="/jobs" className="link-item">
            <li className="tab-item">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
