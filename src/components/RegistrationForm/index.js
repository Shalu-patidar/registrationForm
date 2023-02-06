// Write your JS code here
import {Component} from 'react'

import './index.css'

class RegistrationForm extends Component {
  state = {
    isFormSubmitted: false,
    showFirstNameError: false,
    showLastNameError: false,
    firstNameInput: '',
    lastNameInput: '',
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validateFirstName()
    this.setState({showFirstNameError: !isValidFirstName})
  }

  onBlurLastName = () => {
    const isValidLastName = this.validateLastName()
    this.setState({showLastNameError: !isValidLastName})
  }

  onChangeFirstName = event => {
    const {target} = event
    const {value} = target
    this.setState({
      firstNameInput: value,
    })
  }

  onChangeLastName = event => {
    const {target} = event
    const {value} = target
    this.setState({
      lastNameInput: value,
    })
  }

  validateLastName = () => {
    const {lastNameInput} = this.state
    return lastNameInput !== ''
  }

  validateFirstName = () => {
    const {firstNameInput} = this.state
    return firstNameInput !== ''
  }

  onClickSubmitAnotherResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      firstNameInput: '',
      lastNameInput: '',
    }))
  }

  renderSubmissionView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-image"
      />
      <p>Submitted Successfully</p>
      <button
        type="button"
        className="submit-button"
        onClick={this.onClickSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </>
  )

  onSubmitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.validateFirstName()
    const isValidLastName = this.validateLastName()
    if (isValidFirstName && isValidLastName) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showFirstNameError: !isValidFirstName,
        showLastNameError: !isValidLastName,
        isFormSubmitted: false,
      })
    }
  }

  render() {
    const {
      isFormSubmitted,
      showFirstNameError,
      showLastNameError,
      firstNameInput,
      lastNameInput,
    } = this.state
    const className = showFirstNameError
      ? 'name-input-field error-field'
      : 'name-input-field'
    const classNames = showLastNameError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="registration-form-container">
        <h1 className="form-title">Registration</h1>
        <div className="container">
          {isFormSubmitted ? (
            this.renderSubmissionView()
          ) : (
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <div className="input-container">
                <label htmlFor="firstName" className="input-label">
                  First Name
                </label>
                <input
                  type="text"
                  className={className}
                  value={firstNameInput}
                  id="firstName"
                  placeholder="First name"
                  onChange={this.onChangeFirstName}
                  onBlur={this.onBlurFirstName}
                />
                {showFirstNameError && (
                  <p className="error-message">Required</p>
                )}
                <div className="input-container">
                  <label className="input-label" htmlFor="lastName">
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className={classNames}
                    value={lastNameInput}
                    placeholder="Last name"
                    onChange={this.onChangeLastName}
                    onBlur={this.onBlurLastName}
                  />
                  {showLastNameError && (
                    <p className="error-message">Required</p>
                  )}
                  <button type="submit" className="submit-button">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    )
  }
}
export default RegistrationForm
