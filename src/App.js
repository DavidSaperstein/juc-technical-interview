import React, {useState} from 'react'
import Form from '/Form'
import './styles.css'

const App = (props) => {

  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(prevToggle => {
      return !prevToggle
    })
  }

  return (
    <>
      {toggle ? (
        <div>
          <button onClick={handleToggle}>Contact Us Again?</button>
        </div>
      ) : (
        <Form toggle={handleToggle} />
      )
      }
    </>
  )
}