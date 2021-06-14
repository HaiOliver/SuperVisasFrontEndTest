import React from 'react'
import NumberQuestion from '../NumberQuestion/NumberQuestion'
import TextQuestion from '../TextQuestion/TextQuestion'
import YesNOQuestion from '../YesnoQuestion/YesnoQuestion'
import MCQuestion from '../MCQuestion/MCQuestion'
import { Grid } from '@material-ui/core'




export default function RenderQuestion({location}) {


      var needData ;
      // !! user go back page => location === undefine
      if(location.hasOwnProperty('data') === false){
            needData = JSON.parse(sessionStorage.getItem("CURRENT_QUESTION"))


      }else{
            // !!  has properties data = {A,B}
            needData = location.data
            // ! track current topic
            sessionStorage.setItem("CURRENT_QUESTION",JSON.stringify(location.data))
      }

      return (
            <Grid
                        container
                        justify = "center"
                        style={{ minHeight: '100vh' }}
            >

                  {needData[0].question_type === "TEXT"
                                    ?<TextQuestion data = {location.data}/>
                                    : needData[0].question_type === "MC"
                                    ? <MCQuestion data = {location.data} />
                                    : needData[0].question_type === "YES_NO"
                                    ? <YesNOQuestion data = {location.data}/>
                                    : <NumberQuestion data = {location.data}/>
                                    }


            </Grid>
      )
}

