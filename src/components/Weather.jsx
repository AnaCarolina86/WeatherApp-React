import axios from 'axios';
import { TextField, Button, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  root: {
    maxWidth: 350,
  },
}));

function Weather(){
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [icon, setIcon] = useState("");
  const [urlIcon, setUrlIcon] = useState("");
  const [click, setClick] = useState(false);
  const [isError, setIsError] = useState(false);

  const classes = useStyles();

  function handleCityChange({currentTarget}){
    setCity(currentTarget.value);    
  }

  useEffect(() => {    
    async function handleGetData(){
      setIsError(false);
      const apiKey = "bce045eb8de5970ec7a49acc5a914ca3";
      const unit = "metric";
      try {
        const resources = await 
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`);
        setTemperature(resources.data.main.temp);
        setDescription(resources.data.weather[0].description);
        setMaxTemp(resources.data.main.temp_max);
        setMinTemp(resources.data.main.temp_min);
        setIcon(resources.data.weather[0].icon);
        setUrlIcon(`http://openweathermap.org/img/wn/${icon}@2x.png`);
      } catch (error) {
        setIsError(true);
      }
     
    }
    handleGetData();    
  }, [city, icon]);

  function handleClick(){
    setClick(!click);
  }
 
  return (
    <>
      <div className="inputData">
      <TextField className={classes.margin} id="standard-basic" label="Cidade" value={city} 
      onChange={handleCityChange} ></TextField>
      <Button className={classes.margin} size="large" type="button" variant="contained" color="primary" onClick={handleClick}   >
        Veja a previsão
      </Button>
      </div>

      {click && (
      <Card className="card">
        <CardContent className={classes.root}>  
          <div className={classes.margin}>
            <p>Temperatura: {temperature}</p>
            <p>Condições do Tempo: {description}</p>
            <p>Temperatura Máxima (hoje): {maxTemp}</p>
            <p>Temperatura Mínima (hoje): {minTemp}</p>
            <img src={urlIcon} alt="condicoes do tempo"/>
          </div>
        </CardContent>
      </Card>
      )}
     {isError && <div className={classes.margin} >Digite o nome da cidade corretamente ...</div>}
     {click && ( <Button className={classes.margin} type="button" size="large" variant="contained" 
      color="secondary" onClick={handleClick}>Limpar</Button>)}
    </>
  );
}

export default Weather;

// temp = resources.data.main.temp;
// description = resources.weather[0].description;
// icon = resources.weather[0].icon;
// imageUrl = "http://openweathermap.org/img/wn/" + icon +"@2x.png";

// const resources = await 
//       axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=${unit}`);