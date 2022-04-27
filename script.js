const app = {
    init: () => {
        document
            .getElementById("btnGet")
            .addEventListener("click", app.fetchWeather);
        document
            .getElementById("btnCurrent")
            .addEventListener("click", app.getLocation);
    },
    fetchWeather: (ev) => {
        //use the values from latitude and longitude to fetch weather
        let lat = document.getElementById("latitude").value;
        let lon = document.getElementById("longitude").value;
        let key = "9e0d965d9df17c861c3f9a9b0ef68856";
        let lang = "en";
        let units = "metric";
        let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
        //fetch the weather
        fetch(url)
            .then(resp => {
                if (!resp.ok) throw new Error(resp.statusText);
                return resp.json();
            })
            .then((data) => {
                app.showWeather(data);
            })
            .catch(console.err);
    },
    getLocation: () => {
        let opts = {
            enableHighAccuracy: true,
            timeOut: 1000 * 10, //10 seconds
            maximumAge: 1000 * 60 * 5, //5 minutes
        };
        navigator.geolocation.getCurrentPosition(app.ftw, app.wtf, opts);
    },
    ftw: (position) => {
        //got position
        document.getElementById("latitude").value = position.coords.latitude.toFixed(2);
        document.getElementById("longitude").value = position.coords.longitude.toFixed(2);
    },
    wtf: (err) => {
        //geolocation failed
        console.error(err); 
    },
    showWeather: (resp) => {
        console.log(resp);
        let row = document.querySelector(".weather ");
        //clear out ther old weather and add the new
        //row.innerHTML = "";
        row.innerHTML = resp.daily.map((day, idx) => { 
            if (idx <= 4) {
             let dt = new Date(day.dt * 1000); //timestamp * 1000
             return `<div class="col-lg-4 col-sm-11 mb-2 m-1">
                        <div class="card">
                            <h5 class="card-title p-2">${dt.toDateString()}</h5>
                       
                            <div class="card-body">
                                <h3 class="card-title">${day.weather[0].main}</h3>
                                <p class="card-text">High ${day.temp.max}&deg;C Low ${day.temp.min}&deg;C</p>
                                <p class="card-text">Humidity ${ day.humidity}%</p>
                                <p class="card-text">Dew Point ${ day.dew_point}</p>
                                <p class="card-text">Wind speed and direction ${ day.wind_speed}m/s, ${ day.wind_deg}&deg;</p>
                            </div>
                        </div>
                    </div>`
                
            }
            
        })
        //.join(' ');

    },
};

app.init();