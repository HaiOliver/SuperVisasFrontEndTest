import React,{useState} from 'react'
import { Button } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import HandleSubmit from '../auth-header/postHelper';
import Typography from '@material-ui/core/Typography';
import Image from '../../components/loading/4th.svg';
import { Grid } from '@material-ui/core';
import {Link} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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



export default function MCQuestion({data}) {


      //!! data = [{answer1}, {answer2}]

      const classes = useStyles();
      var [answer] = useState([]);
      const [disable, setDisable] = useState(true)
      let dataRender = data || JSON.parse(sessionStorage.getItem("MC"))
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

            // !! unblock button
            if(answer.length === dataRender.length){
                  setDisable(false)
            }
            console.log("🚀 ~ file: MCQuestion.jsx ~ line 23 ~ MCQuestion ~ answer:", answer)
      };

      const renderAnswer = (arr) => {
            return arr.map((each,inx) =>
                  <MenuItem key={inx} value={each}>{each}</MenuItem>

            )

      }



      let renderQuestions = dataRender.map((each,inx) => {

            return (
                  <div key = {inx}>
                        <Typography component="h2" className={classes.subTitle}>Question {inx+1}: {each.text} ?</Typography>
                        <FormControl required className={classes.formControl} >
                        <InputLabel
                              style={{ disableAnimation: false }}
                              disableAnimation={false}
                              htmlFor="searchCriteria"
                              id="demo-simple-select-label">
                              Answer:

                              </InputLabel>

                              <Select
                                    defaultValue={"Please choose"}
                                    inputProps={{
                                          name: 'name',
                                          id: 'uncontrolled-native',
                                    }}

                                    onChange={(e)=> handleChange(e , each.id)}
                                    >
                                          <MenuItem selected disabled value="">
                                          <em>None</em>
                                          </MenuItem>
                                          {renderAnswer(each.choice_list)}
                                    </Select>
                        </FormControl>

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

