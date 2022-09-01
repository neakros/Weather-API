const firstCity = document.querySelector(".city_one");
const secondCity = document.querySelector(".city_two");
const thirdCity = document.querySelector(".city_tre");
let buttonC = document.querySelector("#buttonC");
let buttonF = document.querySelector("#buttonF");

function setWeather(city, url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            city.querySelector(".city_name").innerHTML = data.name;
            city.querySelector(".temp").innerHTML = Math.round(data.main.temp) - 273 + "&deg;C";
            city.querySelector(".description").innerHTML = data.weather[0]["description"];
            city.querySelector(".weather_icon").innerHTML =
                `<img src="http://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png" alt="icon weather"> `;
            city.querySelector(".wind_speed").innerHTML = data.wind.speed + "m/s";
            city.querySelector(".arrow_deg").style.transform = `rotate(${data.wind.deg}deg)`;
            city.querySelector(".pressure").innerHTML = data.main.pressure;
            city.querySelector(".sunrise").innerHTML = convertTime(data.sys.sunrise, data.timezone);
            city.querySelector(".sunset").innerHTML = convertTime(data.sys.sunset, data.timezone);

//============================sideInfo===========================================
            let sideInfoDate = city.querySelectorAll(".week_date");
            for (let sideInfo of sideInfoDate) {
                for (let i = 1; i < 8; i++) {
                    let sideDate = document.createElement("div");
                    sideDate.innerHTML = `${getDate(i)}`;
                    sideInfo.append(sideDate);
                    sideInfo.style.display = "flex";
                }
            }

            let sideInfoTemp = city.querySelectorAll(".week_temp");
            for (let sideInfo of sideInfoTemp) {
                for (let i = 1; i < 8; i++) {
                    let sideTemp = document.createElement("div");
                    sideTemp.innerHTML = getRandomTemp(10, 35) + "&deg;" + "C";
                    sideInfo.append(sideTemp);
                    sideInfo.style.display = "flex";

//===============================buttons========================================
                    buttonC.addEventListener("click", forC);
                    function forC() {
                        if (buttonC.hasAttributes("button_on")) {
                            buttonC.classList.toggle("button_on");
                            buttonF.classList.remove("button_on");
                            city.querySelector(".temp").innerHTML = Math.round(data.main.temp) - 273 + "&deg;C";
                            let sideInfoTemp = city.querySelectorAll(".week_temp");
                            for (let sideInfo of sideInfoTemp) {
                                sideInfo.innerHTML = "";
                                for (let i = 1; i < 8; i++) {
                                    let sideTemp = document.createElement("div");
                                    sideTemp.innerHTML = Math.round(getRandomTemp(10, 35)) + "&deg;C";
                                    sideInfo.append(sideTemp);
                                    sideInfo.style.display = "flex";
                                }
                            }
                        }
                    }
                }
            }

            buttonF.addEventListener("click", forF);
            function forF() {
                if (buttonF.hasAttributes("button_on")) {
                    buttonF.classList.toggle("button_on");
                    buttonC.classList.remove("button_on");
                    city.querySelector(".temp").innerHTML =
                        Math.floor(Math.round((data.main.temp) - 273) * 1.8 + 32) + "&deg;F";
                    let sideInfoTemp = city.querySelectorAll(".week_temp");
                    for (let sideInfo of sideInfoTemp) {
                        sideInfo.innerHTML = "";
                        for (let i = 1; i < 8; i++) {
                            let sideTemp = document.createElement("div");
                            sideTemp.innerHTML =
                                Math.floor(Math.round(getRandomTemp(10, 35)) * 1.8 + 32) + "&deg;F";
                            sideInfo.append(sideTemp);
                            sideInfo.style.display = "flex";
                        }
                    }
                }
            }
        })
}

setWeather(firstCity, "http://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f");
setWeather(secondCity, "http://api.openweathermap.org/data/2.5/weather?id=2643743&appid=bf35cac91880cb98375230fb443a116f");
setWeather(thirdCity, "http://api.openweathermap.org/data/2.5/weather?id=5128638&appid=bf35cac91880cb98375230fb443a116f");