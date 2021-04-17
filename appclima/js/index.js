// esta llave la obtenemos desde la API directamente
const API_Key='1321e0e34f739e2cbc1fe3b777ac2778';


//El fetchdatos nos ayudara a extraer la latitud y longitud
// del lugar donde estamos con todas las condiciones climatologicas...
const FetchDatos= position =>{
    const { latitude, longitude } = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_Key}`)
    .then(response => response.json())
    .then(data => SetDataWeather(data))

}


//En este definimos variable de solo lectura 
//para setear o ingresar los datos de la API.
const SetDataWeather = data =>{
    console.log(data);
    const weatherData={
        location: data.name,
        description:data.weather[0].main,
        humidity:data.main.humidity,
        pressure:data.main.pressure,
        temperature:data.main.temp,
        date:getDate(),
    }

    Object.keys(weatherData).forEach( key=>{
        document.getElementById(key).textContent=weatherData[key];
    });

    clear();
}

//Metodo que solo nos va a identificar si no aparece la localización 
// nos provee el css spinner
const clear=()=>{
    let container =document.getElementById('container');
    let loader=document.getElementById('loader');

    loader.style.display='none';
    container.style.display='flex';
}

// metodo para obtener la fecha con formato de dia- mes y año completo
const getDate=()=>{
let date= new Date();
return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}


//metodo para que al inicio nos cargue la geolocalización...
const onload=()=>{
    navigator.geolocation.getCurrentPosition(FetchDatos);
}