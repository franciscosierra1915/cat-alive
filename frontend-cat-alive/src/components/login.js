import React from 'react'
import { Link } from "react-router-dom";
import LoginLogo from '../images/login.png'
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import FadeIn from 'react-fade-in';


function ModalExampleModal({ getSignIn, currentUser, logout }) {
  const [open, setOpen] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    let form = e.currentTarget
    getSignIn(e)
    form.reset()
    setOpen(false)
  }

  const handleLogOut= () => (
    fetch('http://localhost:3000/logout', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => logout()),
    setOpen(false)
)


  return (
    <Modal
    className='login-form'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<div className='title'>Login</div>}
    >
      <FadeIn>
      <Modal.Header id='title-login'>Login</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={LoginLogo} wrapped />
        <form onSubmit={handleSubmit}>
          <input className='login-name' type='text' name='name' placeholder='Enter your name'></input>
          {/* <input className='login-email' type='email' name='email' placeholder='Enter your email'></input> */}
          <input className='login-password' type='password' name='password' placeholder='Enter your password'></input>
          <input className='login-submit' type='submit' value='Login'></input>
        </form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Go back
        </Button>
        {currentUser ?
        <Button
        content="Logout"
        labelPosition='right'
        icon='checkmark'
        onClick={handleLogOut}
        positive
        />
        :
        <Link to={`/cat-alive`}>
        <Button
        content="See new cats"
        labelPosition='right'
        icon='checkmark'
        onClick={() => setOpen(false)}
        positive
        />
        </Link>
        }
      </Modal.Actions>
      </FadeIn>
    </Modal>
  )
}

export default ModalExampleModal
