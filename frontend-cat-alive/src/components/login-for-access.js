import React from 'react';
import { Link } from "react-router-dom";
import LoginLogo from '../images/sign-in-for-access.png';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import FadeIn from 'react-fade-in';


function LoginForAcces({ getSignIn }) {
  const [open, setOpen] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    let form = e.currentTarget
    getSignIn(e)
    form.reset()
    setOpen(false)
    console.log('whats going on')
  }

  return (
    <Modal
    className='login-for-acces'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<div>Adopt</div>}
    >
      <FadeIn>
      <Modal.Header id='title-login'>Please Sign In</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={LoginLogo} wrapped />
        <form onSubmit={handleSubmit}>
          <input className='login-name' type='text' name='name' placeholder='Enter your name'></input>
          <input className='login-password' type='password' name='password' placeholder='Enter your password'></input>
          <input className='login-submit' type='submit' value='Login'></input>
        </form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Go back
        </Button>
        <Link to={`/cat-alive`}>
        <Button
        content="See new cats"
        labelPosition='right'
        icon='checkmark'
        onClick={() => setOpen(false)}
        positive
        />
        </Link>
      </Modal.Actions>
      </FadeIn>
    </Modal>
  )
}

export default LoginForAcces
