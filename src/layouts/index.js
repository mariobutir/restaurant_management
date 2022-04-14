import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router'

import FormLayout from './Form'
import MainLayout from './Main'
import Loader from "../components/Loader"

const Layouts = {
  form: FormLayout,
  main: MainLayout,
}

const IndexLayout = props => {
  const { children } = props
  const { authenticated, loading } = useSelector(store => store.session)
  const navigatorPath = useSelector(store => store.navigator.path)

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isLoginLayout = pathname === '/login'

  useEffect(() => {
    if (navigatorPath) navigate(navigatorPath)
  }, [navigatorPath])

  const getLayout = () => {
    if (pathname === '/login') {
      return 'form'
    }
    return 'main'
  }

  const Container = Layouts[getLayout()]

  const BootstrappedLayout = () => {
    // show loader when user in check authorization process, not authorized yet and not on login pages
    if (loading && !authenticated && !isLoginLayout) {
      return <Loader />
    }
    // redirect to login page if current is not login page and user not authorized
    if (!isLoginLayout && !authenticated) {
      return <Navigate replace to="/login" />
    }
    // redirect to main dashboard when user on login page and authorized
    if (isLoginLayout && authenticated) {
      return <Navigate replace to="/overview" />
    }
    // in other case render previously set layout
    return <Container>{children}</Container>
  }

  return BootstrappedLayout()
}

export default IndexLayout
