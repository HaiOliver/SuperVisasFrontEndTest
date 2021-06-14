import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Image from './Loading.svg';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid
      container
      spacing={3}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
      >
          <Grid item xs={12} container justify="center">

                <img src={Image} alt="Loading" width={window.innerWidth > 1000 ? "1000px" : "500px"} />

          </Grid>
          <Grid item xs={12}>
                <CircularProgress />
                <CircularProgress color="secondary" />
                <CircularProgress />
                <CircularProgress color="secondary" />
                <CircularProgress />
                <CircularProgress color="secondary" />
                <CircularProgress />
                <CircularProgress color="secondary" />
                <CircularProgress />
                <CircularProgress color="secondary" />
          </Grid>
          <Grid>
            <h2>Please wait .....loading ...... !!!!</h2>
          </Grid>
      </Grid>


    </Container>
  );
}