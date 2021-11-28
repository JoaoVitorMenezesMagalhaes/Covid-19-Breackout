
import * as React from 'react';
import CountUp from 'react-countup';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Grid, 
  Card,
  CardActions,
  CardContent,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  card:{
    margin: 10,
    padding: 10,
    width: 275,
    textAlign: 'start',
      [theme.breakpoints.down('sm')]:{
        maxWidth:435}

  },
  
}))

const Cards = ({data}) =>{
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item>
        <Card variant = 'outlined' className = {classes.card}>
          <CardContent>
            <Typography>
              Casos Confirmados
            </Typography>
            <Typography variant ='h4' component = 'h2'>
              <CountUp start = {0} end={data.TotalCases} duration={2}
              separator='.'/>
            </Typography>
            
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card variant = 'outlined' className = {classes.card}>
          <CardContent>
            <Typography>
              Mortes Confirmadas
            </Typography>
            <Typography variant ='h4' component = 'h2'>
            <CountUp start = {0} end={data.TotalDeaths} duration={2}
              separator='.'/>
            </Typography>
            
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card variant = 'outlined' className = {classes.card}>
          <CardContent>
            <Typography>
              Casos Recuperados
            </Typography>
            <Typography variant ='h4' component = 'h2'>
            <CountUp start = {0} end={data.TotalRecovered} duration={2}
              separator='.'/>
            </Typography>
            
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Cards