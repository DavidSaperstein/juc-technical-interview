import React, {useState} from 'react'
import Form from './Form'
import './styles.css'

const App = (props) => {
  const [toggle, setToggle] = useState(false)
  const [message, setMessage] = useState('')

  const handleToggle = () => {
    setToggle(prevToggle => {
      return !prevToggle
    })
    setMessage('')
  }

  return (
    <div className='container'>
      {toggle ? (
        <div className='contact-again'>
          <p>{message}</p>
          <button className='contact-again-button' onClick={handleToggle}>Click Here To Contact Us Again</button>
        </div>
      ) : (
        <Form toggle={handleToggle} setMessage={setMessage}/>
      )
      }
    </div>
  )
}

export default App