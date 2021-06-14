import React,{useEffect, useState} from 'react'
import axios from 'axios';
import Loading from '../../components/loading/loading'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Image from '../../components/loading/home.svg'

const access_token = process.env.REACT_APP_TOKEN

const useStyles = makeStyles((theme) => ({

  bigTitle:{
    color:"#574142",
    fontWeight:"800px",
    fontSize: window.innerWidth > 1000 ? "120px" : "80px",
},
  subTitle:{
      fontSize: window.innerWidth > 1000 ? "40px" : "30px",
      color:"#926674",
      fontWeight:"800px",

},
text:{
    color:"#3F5300",
    fontSize: window.innerWidth > 1000 ? "30px" : "20px",
      fontWeight:"400px",
},
  card: {
    maxWidth: 345,
  },
}));

export default function ListAnswerPage() {
      const classes = useStyles();
      const [questions, setQuestions] = useState([])
      const [loading, setLoading] = useState(true)
      useEffect(()=>{
            const fetch_Data = async () => {
                  axios.get(`https://sv-survey.herokuapp.com/api/responses/`,
                        {
                        headers: {
                              'Authorization': `Token ${access_token}`
                        },
                        })
                  .then((res) => {

                        setQuestions(res.data)
                        setLoading(false)
                  })
                  .catch((error) => {
                        console.error(error)
                  })
            }

            fetch_Data()


      },[])
      let renderData = []

      const renderEachQuestion = (arr) => {
            arr.forEach(each => {

                  return renderData.push(
                        {question: each.question.text,
                        answer:each.text})
            })
      }


      questions.forEach((each) => {
            return renderEachQuestion(each.answers)
      })

      const finalRender = renderData.map((each,inx)=>{
            return(
                  <div key={inx}>
                        <Typography variant="h1" component="h2" gutterBottom align="center"
                                          justify="center" className={classes.subTitle}>Question: {each.question} ?</Typography>
                        <h3 Typography variant="h1" component="h2" gutterBottom align="center"
                                          justify="center" className={classes.text}>Answer: {each.answer}</h3>
                  </div>
            )
      })

      console.log("🚀 ~ file: List-Answer-Page.jsx ~ line 55 ~ renderData ~ renderData", renderData)
      return (
            <div >


                  {loading ? <Loading/> : (

                        <div>

                              <Grid container justify="center">
                                    <img src={Image} alt="image" width={window.innerWidth > 1000 ? "1000px" : "500px"}/>
                              </Grid>
                              <Typography variant="h1" component="h2" gutterBottom align="center"
                                          justify="center" className={classes.bigTitle}>
                                    List Answers from user:
                              </Typography>

                              <Grid
                                          style={{ minHeight: '100vh' }}
                                          container
                                          spacing={4}
                                          align="center"
                                          justify="center"
                                          direction="column"

                              >

                                    {finalRender}


                              </Grid>
                        </div>
                  )}

            </div>
      )
}
