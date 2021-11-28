import './App.css';
import Header from './components/Header'
import {Container, makeStyles, Grid, Typography, InputLabel, MenuItem, Select, FormControl} from '@material-ui/core'
import Cards from './components/Cards'
import {useEffect, useState} from 'react'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  country:{
    margin: 10,
    fontWeight: 'bold',
  },
  
}))

const App = () => {
  const classes = useStyles()
  const [summary, setSummary] = useState(null)
  const [countries, setCountries] = useState(null)
  const [selected, setSelected] = useState('Selecione um País')

  useEffect(() => {
    const getDailySummary = async () =>{
      try{
        const {data} = await axios.get(`https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world`,{
          headers: {
            'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
            'x-rapidapi-key': 'f515bab3e7msh391244d9f7238c4p199cebjsnb317fe84a1e1'
          }
        })
        console.log(data)
        setSummary(data)
      } catch (error){
        console.error(error)
      }
    }

    const getCountries = async () =>{
      try{
        const {data} = await axios.get(`https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries-name-ordered`,{
          headers: {
            'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
            'x-rapidapi-key': 'f515bab3e7msh391244d9f7238c4p199cebjsnb317fe84a1e1'
          }
        })
        console.log(data)
        setCountries(data)
      } catch (error){
        console.error(error)
      }
    }

    getDailySummary()
    getCountries()
  },[])

  return summary  === null ? <h1> Loading... </h1> : (
    <>
      <Header />

      <Container>
        <Grid container>
          <Grid item>
            {/*left*/}
            <div style = {{marginTop:20}}>
              <Typography variant ='h5'> Overview Mundial </Typography>
              <Cards data = {summary['0']}/>
            </div>
          </Grid>
          <Grid item>
            <FormControl style = {{marginTop:20}}>
              <Select className={classes.country} value ={selected}>
                {countries.map((item) => (
                  <MenuItem key = {item.ThreeLetterSymbol}>{item.Country}</MenuItem>
                ))}
                
            </Select>
          </FormControl>

          </Grid>
        </Grid>

    </Container>
    </>

  );
}

export default App;
