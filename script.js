//Get Current Location weather 
function getCurrentLocationWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const apiKey = 'cca1f1d61930fc126710a7c18e1aef74'; // Replace with your OpenWeatherMap API key
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            displayWeather(data);
                        })
                        .catch(error => {
                            console.error('Error fetching weather data:', error);
                            alert('Error fetching weather data. Please try again.');
                        });
                },
                function(error) {
                    console.error('Error getting current location:', error);
                    alert('Error getting current location. Please try again.');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    }

document.getElementById('cityInput').addEventListener('keyup', function(event) {
	if (event.key === 'Enter') {
		getWeather();
	}
});

function getWeather() {
	const apiKey = 'cca1f1d61930fc126710a7c18e1aef74'; // Replace with your OpenWeatherMap API key
	const city = document.getElementById('cityInput').value;
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			displayWeather(data);
		})
		.catch(error => {
			console.error('Error fetching weather data:', error);
			alert('Error fetching weather data. Please try again.');
		});
}

function displayWeather(data) {
	const weatherResult = document.getElementById('weatherResult');
	const temperatureCelsius = kelvinToCelsius(data.main.temp);

	// Display the date
	const currentDate = new Date();
	const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	const dateString = currentDate.toLocaleDateString('en-US', dateOptions);

	weatherResult.innerHTML = `
	<h2 class="right">${dateString}</h2>
		<h2>${data.name}, ${data.sys.country}</h2>
		   
        <h2 class="right"><span id="currentTime"></span></h2>
        <h1 class="temp">Temperature :${temperatureCelsius.toFixed(2)}&deg;C</h1>
		<table>
    <tr>
        <th>Weather</th>
        <th>Humidity</th>
        <th>Pressure (hPa)</th>
        <th>Wind Speed (m/s)</th>
        <th>Visibility (meters)</th>
    </tr>
    <tr>
        <td>${data.weather[0].description}</td>
        <td>${data.main.humidity}%</td>
        <td>${data.main.pressure}</td>
        <td>${data.wind.speed}</td>
        <td>${data.visibility}</td>
    </tr>
</table>
	`;
//Clear input field
	document.getElementById('cityInput').value = "";
	// Update time every second
	setInterval(function() {
		const currentTime = new Date();
		const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
		const timeString = currentTime.toLocaleTimeString('en-US', timeOptions);
		document.getElementById('currentTime').innerText = timeString;
	}, 1000);
	
}

function kelvinToCelsius(kelvin) {
	return kelvin - 273.15;
}
