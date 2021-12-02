import './App.css';
import Header from './components/Header'
import {Container, makeStyles, Grid, Typography, MenuItem, Select, FormControl} from '@material-ui/core'
import Cards from './components/Cards'
import Country from './components/Country'
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
  const [selectedCountry, setSelectedCountry] = useState('brazil')
  const [countrySummary, setCountrySummary] = useState(null)


  useEffect(() => {
    const getDailySummary = async () =>{
      try{
        const {data} = await axios.get(`https://covid-19-data.p.rapidapi.com/totals`,{ //outra api para pegar os dados diários
          headers: {
            'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
            'x-rapidapi-key': 'f515bab3e7msh391244d9f7238c4p199cebjsnb317fe84a1e1'
          }
        })
        console.log(data)
        setSummary(data)
      } catch (error){
        console.error(error)
      }
    }

    const getCountry = async () => {
      try {
        const { data } = await axios.get(`https://api.covid19api.com/countries`) 
        setCountries(data)
      } catch (error) {
        console.error(error)
      }
    }

    const getCoutryData = async () =>{
      try{
        const {data} = await axios.get(`https://api.covid19api.com/total/dayone/country/${selectedCountry}`)
        
        setCountrySummary(data)
        console.log(data[data.length-1])
        
      } catch (error){
        console.error(error)
      }
    }

    

    getDailySummary()
    getCountry()
    getCoutryData()
    
  },[selectedCountry])


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
          <FormControl style={{ marginTop: 20 }}>
              <Select
                className={classes.country}
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                {countries.map((item, index) => (
                  <MenuItem key={index} value={item.Slug}>
                    {item.Country}
                  </MenuItem>
                ))}
              </Select>
              <Country data = {countrySummary[countrySummary.length-1]}  />
            </FormControl>

          </Grid>
        </Grid>

    </Container>
    </>

  );
}

export default App;
