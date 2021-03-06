import React from 'react'
import LoginLogo from '../images/login-menu.png'
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import FadeIn from 'react-fade-in';


function ModalExampleModal({ getSignIn }) {
  const [open, setOpen] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    let form = e.currentTarget
    getSignIn(e)
    form.reset()
    setOpen(false)
  }

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
          <input autocomplete="off" className='login-name' type='text' name='name' placeholder='Enter your name'></input>
          <input autocomplete="off" className='login-password' type='password' name='password' placeholder='Enter your password'></input>
          <input className='login-submit' type='submit' value='Login'></input>
        </form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Go back
        </Button>
        <Button
        content="See new cats"
        labelPosition='right'
        icon='checkmark'
        onClick={() => setOpen(false)}
        positive
        />
      </Modal.Actions>
      </FadeIn>
    </Modal>
  )
}

export default ModalExampleModal
