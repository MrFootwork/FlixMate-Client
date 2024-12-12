import { useState } from 'react'
import './AuthPage.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { MessageContext } from '../contexts/MessageWrapper'

const API_URL = import.meta.env.VITE_API_URL

const AuthPage = () => {
  const [formState, setFormState] = useState('login')
  const { message, setMessage } = useContext(MessageContext)
  const navigate = useNavigate()

  function handleInvertFormState() {
    formState === 'login' ? setFormState('signin') : setFormState('login')
  }

  async function logIn(e) {
    const { data } = await axios.post(
      API_URL + '/auth/login',
      {
        email: e.target.email.value,
        password: e.target.password.value,
      },
      {
        withCredentials: true,
      }
    )
    console.log(data)
    setMessage({
      type: 'good',
      message: 'Succesfully logged in!',
    })
    navigate('/browse')
  }

  async function signIn(e) {
    if (e.target.password.value !== e.target.password2.value) {
      setMessage({
        type: 'bad',
        message: 'Password does not match the repeated password!',
      })
      return
    }
    const { data } = await axios.post(
      API_URL + '/auth/signup',
      {
        email: e.target.email.value,
        name: e.target.elements.name.value,
        password: e.target.password.value,
      },
      {
        withCredentials: true,
      }
    )
    console.log(data)
    setMessage({ type: 'good', message: 'Succesfully created an account!' })
    setFormState('login')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      console.log(e.target.elements)
      if (formState === 'login') {
        await logIn(e)
      } else {
        await signIn(e)
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message)
        setMessage({ type: 'bad', message: error.response.data.message })
      }
    }
  }

  return (
    <div className='AuthPage'>
      <div className='formContainer'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>
            Email
            <input type='text' name='email' />
          </label>
          {formState === 'signin' && (
            <label htmlFor='name'>
              Name
              <input type='text' name='name' />
            </label>
          )}
          <label htmlFor='password'>
            Password
            <input type='password' name='password' />
          </label>
          {formState === 'signin' && (
            <label htmlFor='password2'>
              Repeat Password
              <input type='password' name='password2' />
            </label>
          )}
          <input type='submit' value={formState.toUpperCase()} />
        </form>
        <button onClick={handleInvertFormState}>
          {formState === 'login' ? (
            <p>
              You don't have an account ? Maybe try to <b>SignIn</b>
            </p>
          ) : (
            <p>
              You already have an account ? Maybe try to <b>LogIn</b>
            </p>
          )}
        </button>
      </div>
    </div>
  )
}

export default AuthPage
