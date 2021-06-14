import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  subTitle:{
      fontSize: window.innerWidth > 1000 ? "35px" : window.innerWidth > 500 ? "20px" : "15px",
      color:"#926674",
      fontWeight:"800px",
      maxHeight: window.innerWidth > 1000 ? "100px" : "70px"

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

export default function SectionQuestion({data, about}) {
      const { question_type} = data[0]
      const classes = useStyles()
      let image = data[0].question_type === 'MC'
            ? 'https://elearningindustry.com/wp-content/uploads/2019/06/do-this-not-that-when-writing-multiple-choice-questions.jpg'
            :  data[0].question_type === 'YES_NO' ? 'https://image.freepik.com/free-vector/yes-no-signs_1325-370.jpg'
            :  data[0].question_type === 'NUMBER' ? 'https://thumbs.dreamstime.com/z/colorful-numbers-2068996.jpg'
            : 'https://www.quickanddirtytips.com/sites/default/files/images/168/punctuating-questions.png'


      return (
                        <Grid item xs={12} sm={3} >
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
                              <Typography gutterBottom variant="h5" component="h2" className={classes.subTitle}>
                                     Questions about {question_type}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                              </Typography>
                              </CardContent>
                              </CardActionArea>
                              <CardActions style={{justifyContent: 'center'}}>



                              <Link
                                    to= {{
                                          pathname: `/api/${about}/${question_type}Questions`,
                                          data: data,
                                          topic: about
                                          }}
                                    style={{ textDecoration: 'none' }}
                              >
                                    <Button variant="contained" color="primary">Click to see questions</Button>
                              </Link>


                              </CardActions>
                        </Card>



                  </Grid>
      )
}

