import React from 'react'
import AuthService from "../services/auth.service";
import { Redirect, Route } from 'react-router-dom'


const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
 // const isLoggedIn = AuthService.isLoggedIn()

  return (
    <Route
      {...rest}
      render={props =>{
          if(!AuthService.getCurrentUser()){
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
             
          }
          else{
            return  <Component {...props} />
          }
      }
    }
    />
  )
}

export default PrivateRoute;