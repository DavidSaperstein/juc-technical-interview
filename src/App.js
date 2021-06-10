import React, {useState} from 'react'
import Form from './Form'
import './styles.css'

const App = (props) => {

  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(prevToggle => {
      return !prevToggle
    })
  }

  return (
    <div className='container'>
      {toggle ? (
        <div>
          <button className='contact-again' onClick={handleToggle}>Click Here To Contact Us Again</button>
        </div>
      ) : (
        <Form toggle={handleToggle} />
      )
      }
    </div>
  )
}

export default App