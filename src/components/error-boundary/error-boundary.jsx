import React, { Component } from 'react'


import { Grid } from '@material-ui/core';
import Logo from './broken.svg'

export default class errorBoundary extends Component {

      constructor(){
            super()
            this.state = {
                  hasErrored : false
            }

      }
      // built-in function -> if error occur
      static getDerivedStateFromError(error){
            return {hasErrored: true}
      }


      // catch Error
      componentDidCatch(error, info){
            console.log("🚀 ~ file: error-boundary.jsx ~ line 21 ~ errorBoundary ~ componentDidCatch ~ error", error)

      }


      render() {
            return (
                  this.state.hasErrored
                  // !if error occur in any route => render this
                  ?(<div>
                        <Grid container justify="center">
                              <img src={Logo} alt="error" width={1000}/>
                        </Grid>
                        <Grid container justify="center">
                              <h1> Sorry this page is broken. Please contact support team </h1>
                        </Grid>

                  </div>)
                  :(this.props.children)
            )
      }
}
