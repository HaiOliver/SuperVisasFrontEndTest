import React,{useState} from 'react'
import { Button } from '@material-ui/core';
import {Link} from "react-router-dom";
import { FormControl } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import HandleSubmit from '../auth-header/postHelper';
import Image from '../../components/loading/2nd.svg';
import { Grid } from '@material-ui/core';

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


export default function YesNoQuestion({data}) {
      console.log("🚀 ~ file: YesnoQuestion.jsx ~ line 4 ~ YesNoQuestion ~ props", data)
            const classes = useStyles();
      var [answer] = useState([]);
      const [disable, setDisable] = useState(true)

      let dataRender = data || JSON.parse(sessionStorage.getItem("YES_NO"))
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

      // console.log("Yes_No question, localStprage: 8888888888888888",sessionStorage.getItem("YES_NO"));


      let renderQuestions = dataRender.map((each,inx) => {

            return (
                  <div key = {inx}>
                        <h2 className={classes.subTitle}>Question {inx+1}: {each.text} ?</h2>
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
                                          {renderAnswer(["Yes", "No"])}
                                    </Select>
                        </FormControl>

                  </div>


            )
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
                                          Submit
                                    </Button>
                              </Link>


            </div>
      )
}
