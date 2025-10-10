/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'

// Basic routes setup
const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="sign_up" element={<SignUpForm />} />
    <Route path="login" element={<LoginForm />} />
  </Route>,
)

export default routes
