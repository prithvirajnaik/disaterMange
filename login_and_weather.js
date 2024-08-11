function signUp() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (email && password) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                const user = {
                    password: password,
                    location: location
                };
                localStorage.setItem(email, JSON.stringify(user));
                alert('User registered successfully with location!');
            }, (error) => {
                alert('Geolocation error: ' + error.message);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    } else {
        alert('Please enter a valid email and password.');
    }
}

function signIn() {
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    const storedUser = JSON.parse(localStorage.getItem(email));

    if (storedUser && storedUser.password === password) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const currentLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };

               
                alert("User Authentication Successful");
                
                fetchWeather(currentLocation.latitude, currentLocation.longitude);

            }, (error) => {
                alert('Geolocation error: ' + error.message);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    } else {
        alert('Incorrect email or password.');
    }
}

function fetchWeather(latitude, longitude) {
    const apiKey = 'a50fcb52187587db242120ff7b072229';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`; 

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('weatherData', JSON.stringify({
                description: data.weather[0].description,
                temp: data.main.temp,
                feels_like: data.main.feels_like,
                temp_min: data.main.temp_min,
                temp_max: data.main.temp_max,
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                wind_speed: data.wind.speed,
                wind_deg: data.wind.deg,
                cloudiness: data.clouds.all,
                location: `${data.name}, ${data.sys.country}`
            }));
            
            window.location.href = "./index.html";
        })
        .catch(error => {
            alert('Error fetching weather data: ' + error.message);
        });
}


