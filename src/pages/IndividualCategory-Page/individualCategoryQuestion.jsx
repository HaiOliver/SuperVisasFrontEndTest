import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SectionQuestion from '../../components/sectionQuestion/sectionQuestion';
import Loading from '../../components/loading/loading'
import Typography from '@material-ui/core/Typography';
const access_token = process.env.REACT_APP_TOKEN
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bigTitle:{
    color:"#574142",
    fontWeight:"800px",
    fontSize: window.innerWidth > 1000 ? "80px" : "50px",
},
  card: {
    maxWidth: 345,
  }
}));

export default function IndividualCategoryQuestion({location}) {


      var needData ;
      // !! user go back page => location === undefine
      if(location.hasOwnProperty('data') === false){
            needData = JSON.parse(sessionStorage.getItem("CURRENT_TOPIC"))


      }else{
            // !!  has properties data = {A,B}
            needData = location.data
            // ! track current topic
            sessionStorage.setItem("CURRENT_TOPIC",JSON.stringify(location.data))
      }
      /* sessionStorage.setItem("CURRENT_TOPIC",JSON.stringify(location.data)) */

      const classes = useStyles();
      const [questionID] = useState(needData.id)
      const [questions, setQuestions] = useState([])
      const [yesNoQuestion] = useState([])
      const [ MCQuestion] = useState([])
      const [ TextQuestion] = useState([])
      const [numberQuestion ] = useState([])
      const [loading, setLoading] = useState(true)

      useEffect(()=>{

            const fetch_questions_type = async () => {

                  axios.get(`https://sv-survey.herokuapp.com/api/questions/?list=${questionID}`,
                        {
                        headers: {
                              'Authorization': `Token ${access_token}`
                        },
                        })
                  .then((res) => {

                        setQuestions(res.data)

                        res.data.forEach(each => {
                              switch (each.question_type){
                                    case "MC":
                                          MCQuestion.push(each)
                                          break;
                                    case "YES_NO":
                                          yesNoQuestion.push(each)
                                          break;
                                    case "NUMBER":
                                          numberQuestion.push(each)
                                          break;
                                    case "TEXT":
                                          TextQuestion.push(each)
                                          break;
                                    default:
                                          break;
                              }
                        })
                        setLoading(false)
                  })
                  .catch((error) => {
                        console.error(error)
                  })
            }

            fetch_questions_type()
      },[])

      // !!! set sessionStorage => those object
      if(questions !== []){

            sessionStorage.setItem("YES_NO",JSON.stringify(yesNoQuestion))
            sessionStorage.setItem("MC", JSON.stringify(MCQuestion ))
            sessionStorage.setItem("NUMBER", JSON.stringify(numberQuestion))
            sessionStorage.setItem("TEXT", JSON.stringify(TextQuestion))
      }

      return (

            <Grid

                  container justify = "center"
                  style={{ minHeight: '100vh' }}
            >

            <Typography variant="h2" component="h2" gutterBottom align="center"
                        justify="center" className={classes.bigTitle}>
                  List all type questions about { JSON.parse(sessionStorage.getItem("CURRENT_TOPIC")).name }:
            </Typography>

             {loading ? (
                  <Grid
                         container justify = "center"
                        style={{ minHeight: '100vh' }}
                  >
                        <Loading/>
                  </Grid>

                  ) : (

                  <Grid
                        style={{ minHeight: '100vh' }}
                        container
                        spacing={4}
                        align="center"
                        justify="center"
                        direction="row"

                  >

                        <SectionQuestion data = {MCQuestion} about = {needData.name}/>
                        <SectionQuestion data = {TextQuestion} about = {needData.name}/>
                        <SectionQuestion data = {yesNoQuestion} about = {needData.name}/>
                        <SectionQuestion data = {numberQuestion} about = {needData.name}/>


                  </Grid>
             )}
      </Grid>

      )
}


