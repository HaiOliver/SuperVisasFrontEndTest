import React,{useState} from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import HandleSubmit from '../auth-header/postHelper';
import Typography from '@material-ui/core/Typography';
import Image from '../../components/loading/erd.svg'
import { Grid } from '@material-ui/core';
import {Link} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  input:{
      marginBottom: "12px"
  },
  subTitle:{
            fontSize: window.innerWidth > 1000 ? "40px" : "30px",
            color:"#574142",
            fontWeight:"800px",

      },
text:{
                  color:"#3F5300",
                  fontSize: window.innerWidth > 1000 ? "20px" : "15px",
                  fontWeight:"400px",
                  width:"600px",
                  marginTop:"20px",
                  marginBottom:"10px"
            },
button:{
                  textAlign: "center",
                  marginTop: "15px"
            }
}));


export default function NumberQuestion({data}) {
      console.log("🚀 ~ file: NumberQuestion.jsx ~ line 5 ~ NumberQuestion ~ data", data)
      // const {text, question_type, id, choice_list} = data
      const [answer] = useState([]);
      const classes = useStyles();
      const [disable, setDisable] = useState(true)
      let dataRender = data || JSON.parse(sessionStorage.getItem("NUMBER"))
      function isNormalInteger(str) {
            return /^\+?(0|[1-9]\d*)$/.test(str);
            }

            const handleChange = (event, idQuestion) => {
                  //!! Check number or not
                  if(isNormalInteger(event.target.value) === false){
                        return alert("Please input integer number !!")
                        }
                  // remove duplicate idQuestion
                  let found = answer.find(each => {
                        return each.question === idQuestion
                  })

                  if(found){
                        answer.forEach(each => {
                              if(each.question === idQuestion){
                                    each.text = event.target.value
                              }
                        })
                  }else{
                        answer.push({
                        text : event.target.value,
                        question: idQuestion
                        });
                  }
                  // !! unblock button
                  if(answer.length === dataRender.length){
                              setDisable(false)
                        }
                  console.log("🚀 ~ file: MCQuestion.jsx ~ line 23 ~ MCQuestion ~ answer:", answer)
            };

      const renderQuestions =  dataRender.map((each,inx) => {
            return(
            <div key={inx}>
                  <Typography className={classes.subTitle}>Question: {each.text} ?</Typography>

                        <TextField

                        id="outlined-secondary"
                        label="Please answer number only"
                        variant="outlined"
                        color="secondary"
                        className={classes.text}
                        onChange={(e)=> handleChange(e , each.id)}

                        />
            </div>)
      })
      return (
            <div>
                  <Grid container justify="center">
                        <img src={Image} alt="image" width={window.innerWidth > 1000 ? "1000px" : "500px"}/>
                  </Grid>

                  {renderQuestions}

                  

                  <Link
                                    to= '/listAllAnswers'
                                    style={{ textDecoration: 'none' }}
                              >
                                    <Button variant="contained"
                                          className={classes.button}
                                          color="secondary"
                                          disabled={disable}
                                          onClick={() => {HandleSubmit(answer)}}>
                                          Submit All Answer
                                    </Button>
                              </Link>

            </div>
      )
}
