import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Loading from '../../components/loading/loading'
import Image from '../../components/loading/header.svg';


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
    fontSize: window.innerWidth > 1000 ? "20px" : "15px",
      fontWeight:"400px",
},
  card: {
    maxWidth: 345,
  },
}));

const access_token = process.env.REACT_APP_TOKEN


export default function Questions() {
      const [questions, setQuestions] = useState([])
      const [loading,SetLoading] = useState(false)
      const classes = useStyles();

      useEffect(()=>{
            // !! Fetch request for question:
            const fetch_questions_type = async () => {

                  axios.get(`https://sv-survey.herokuapp.com/api/question_lists/`,
                        {
                        headers: {
                              'Authorization': `Token ${access_token}`
                        },
                        })
                  .then((res) => {

                        setQuestions(res.data)
                        SetLoading(false)
                  })
                  .catch((error) => {
                        console.error(error)
                  })
            }
            fetch_questions_type()
                  },[])



      const renderList = questions.map((each)=>{
            let image = each.name === 'Food'
            ? 'https://media.istockphoto.com/photos/chef-finishing-healthy-salad-on-a-black-plate-with-tweezers-almost-picture-id1146261080?k=6&m=1146261080&s=612x612&w=0&h=MgRJhyTz0jRMz0MPdLuZ5dhGMQ_9GG5JobyrO1uBsx8='
            :  each.name === 'Travel' ? 'https://media.istockphoto.com/photos/holidays-tourist-relaxing-in-luxury-beach-hotel-near-luxurious-pool-picture-id1059344876?k=6&m=1059344876&s=612x612&w=0&h=Y1fGXfX-Iz3EdDTU1LVw-MbTiLBHZqIBuyrzj0W3bAg='
            :  each.name === 'Animals' ? 'https://media.istockphoto.com/photos/funny-raccoon-in-green-sunglasses-showing-a-rock-gesture-isolated-on-picture-id1154370446?s=612x612'
            : 'https://media.istockphoto.com/photos/happy-african-man-in-hat-singing-into-smartphone-like-microphone-picture-id1171092500?k=6&m=1171092500&s=612x612&w=0&h=ne0bvuttjS_IpCL3L4jryVvOmGR7gG0aYk0wO3-gcbw='


            return (
                  <Grid item xs={12} sm={3} key={each.id}>
                            <Card className={classes.card}>
                              <CardActionArea>
                              <CardMedia
                              component="img"
                              alt="Contemplative Reptile"
                              height="300"
                              image={image}
                              title="Contemplative Reptile"
                              style={{objectFit:"fill"}}

                              />

                              <CardContent>
                              <Typography  component="h2" className={classes.subTitle}>
                                    {each.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                              </Typography>
                              </CardContent>
                              </CardActionArea>
                              <CardActions style={{justifyContent: 'center'}}
                        >
                              <Link
                                    to= {{
                                          pathname: `/api/${each.name}Topic`,
                                          data:{
                                                id: each.id,
                                                name:each.name
                                                }
                                          }}
                                    style={{ textDecoration: 'none' }}
                              >
                              <Button variant="contained" color="secondary" > Click here</Button>

                              </Link>
                              </CardActions>
                        </Card>
                  </Grid>

            )
      })

      return (

      <div className={classes.root}>

            {loading
                  ? <Loading/>
                  : (
                        <div>
                              <Grid container justify="center">
                                    <img src={Image} alt="image" width={window.innerWidth > 1000 ? "1200px" : "500px"}/>
                              </Grid>

                              <Typography variant="h1" component="h2" gutterBottom align="center"
                                          justify="center" className={classes.bigTitle}>
                                    All topic questions
                              </Typography>
                                    <Grid
                                                style={{ minHeight: '100vh' }}
                                                container
                                                spacing={4}
                                                align="center"
                                                justify="center"
                                                direction="row"
                                    >
                                          {renderList}
                                    </Grid>

                        </div>
            )}




      </div>
      )
}
