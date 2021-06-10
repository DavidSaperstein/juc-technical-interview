import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EmailValidator from 'email-validator'
import { isFuture } from 'date-fns'

const Form = (props) => {
  
  const initialState = {
    name: '',
    email: '',
    birthDate: '',
    emailConsent: false
  }
  
  const [inputs, setInputs] = useState(initialState)
  const [isDisabled, setIsDisabled] = useState(true)
  const [dateError, setDateError] = useState('')
  
  const {name, email, birthDate, emailConsent} = inputs
  
  useEffect(() => {  
    const isValid = inputs.name.length > 0 && 
      EmailValidator.validate(inputs.email) === true && 
      inputs.emailConsent === true && 
      (inputs.birthDate === '' || isFuture(new Date(inputs.birthDate)) === false)
    setIsDisabled(!isValid)
  }, [inputs])

  // const handleDateError = (date) => {
  //   if(isFuture(new Date(date))) {
  //     setDateError('Birthdate cannot be in the future.')
  //   }
  // }
  const handleChange = (e) => {
    const {name} = e.target
    const value = e.target.type === 'checkbox'
      ? e.target.checked
      : e.target.value
    setInputs(prevInputs => {
      return {...prevInputs, [name] : value}
    })
    // if(e.target.type === 'date') {
    //   handleDateError(value)
    //   e.target.setCustomValidity(dateError)
    // }
  }

  const handleClear = (e) => {
    e.preventDefault()
    setInputs(initialState)
    setIsDisabled(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users', inputs)
    .then(res => {
      console.log(res)
      alert(`Contact request successful. Your message number is ${res.data.id}.`)
      setInputs(initialState)
    })
    .catch(err => {
      console.error(err)
      alert(`There was a JSON error`)
    })
    props.toggle()
  }



  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Contact Us</h1>
        <label>
          Name {name.length > 0 ? '' : '*'}
          <input
            // style={{border: name.length > 0 === true ? '1px solid black' : '3px dotted red'}}
            type='text' 
            name='name' 
            value={name} 
            placeholder='Name' 
            onChange={handleChange} 
            required
          />
        </label>

        <label>
          Email {EmailValidator.validate(email) ? '' : '*'}
          <input
            // style={{border: EmailValidator.validate(email) === true ? '1px solid black' : '3px dotted red'}}
            type='email' 
            name='email' 
            value={email} 
            placeholder='Email' 
            onChange={handleChange} 
            required
          />
        </label>

        <label>
          Birthdate: {isFuture(new Date(birthDate)) ? 'Birthdate cannot be in the future.' : ''}
          <input 
            type='date' 
            name='birthDate' 
            value={birthDate} 
            placeholder='Birthday' 
            onChange={handleChange}
          />
        </label>

        <label className='checkbox-container'>
          <input
            style={{border: emailConsent === false ? '1px solid black' : '3px dotted red'}}
            type='checkbox' 
            name='emailConsent' 
            value={emailConsent} 
            checked={emailConsent} 
            onChange={handleChange} 
            required
          />
          I agree to be contacted via email.{emailConsent === true ? '' : '*'}
        </label>

        <div className='button-container'>
          <button onClick={handleClear}>Clear</button>
          <button disabled={isDisabled}>Submit</button>
        </div>
      </form>
    </>
  )
}

export default Form