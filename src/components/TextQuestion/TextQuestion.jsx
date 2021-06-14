import React,{useState} from 'react'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HandleSubmit from '../auth-header/postHelper';
import Typography from '@material-ui/core/Typography';
import Image from '../../components/loading/5th.svg';
import { Grid } from '@material-ui/core';
import {Link} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
        textarea: {
            resize: "both"
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
                  width:"800px",
                  marginTop:"20px",
                  marginBottom:"10px"
            },
            button:{
                  textAlign: "center",
                  marginTop: "15px"
            }
}));

export default function TextQuestion({data}) {

      const classes = useStyles();
      var [answer] = useState([]);
      const [disable, setDisable] = useState(true)
      let dataRender = data || JSON.parse(sessionStorage.getItem("TEXT"))
      const handleChange = (event, idQuestion) => {
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

            if(answer.length === dataRender.length){
                  setDisable(false)
            }

            console.log("🚀 ~ file: MCQuestion.jsx ~ line 23 ~ MCQuestion ~ answer:", answer)
      };

      

      let renderQuestions = dataRender.map((each,index) => {
            const { text} = each
            return(
                  <div key={index}>
                        <Typography  component="h2" className={classes.subTitle}>
                                    Question {index+1}: {text}?
                              </Typography>

                              <TextareaAutosize
                                    className={classes.text}
                                    rowsMin={3}
                                    aria-label="empty textarea"
                                    placeholder="Please type in here"
                                    onChange={(e)=> handleChange(e , each.id)}

                                    />
                  </div>
                  )
      })
      return (
            <div >
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
