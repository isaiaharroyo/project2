var setHeader = function(message)
{
    d3.select("h1").text(message);
}

//takes inputted city and state and returns url for long and lat api page      
var coordURL = function(city,state)
{
    return "https://api.opencagedata.com/geocode/v1/json?q=" + city + "%2C" +state
    + "&key=1e7eba3be9c4461696bfb9cad80b23b6" + "&language=en&pretty=1";
}

d3.select("#button")
    .on("click", function()
        {
        var city = d3.select("#city").property("value");
        var state = d3.select("#state").property("value");
        coordURL(city,state);
    
        var coordPromise = d3.json(coordURL(city,state))

        coordPromise.then(

        function(data)
        {
            getCoord(data);
            console.log("Coordinates",data);
        },
        function(err)
        {
            console.log("error",err);
        })
        })

var getCoord = function(data)
{
    var latitude = data.results[0].geometry.lat;
    var longitude = data.results[0].geometry.lng;
    
    var weatherPromise = d3.json(weatherURL(latitude,longitude))

        weatherPromise.then(

        function(data)
        {
            console.log("Weather",data);
            getForecast(data);
        },
        function(err)
        {
            console.log("error",err);
        })
}

var weatherURL = function(latitude,longitude)
{
    return "https://api.weather.gov/points/" + latitude + "," + longitude;
}

var getForecast = function(data)
{
    var forecastPromise = d3.json(data.properties.forecast)
    
    forecastPromise.then(
        function(data)
        {
            console.log("Forecast",data);
            setHeader("Forecasted Weather");
            makeDisplay(data);
        },
        function(err)
        {
            console.log("error",err);
            setHeader("Weather Unavaliable: check spelling")
        })
} //end of API access

//Display
var makeDisplay = function(data)
{
    var foreArray = data.properties.periods;
    
    d3.select("#foreBody").append("h1").text(d3.select("#city").property("value") + 
                    ", " + d3.select("#state").property("value"));
    
    var makeDiv = d3.select("#foreBody")
    .selectAll("div")
    .data(foreArray)
    .enter()
    .append("div")
    .attr("class",function(period)
         {
           return period.isDaytime;
        })
    
    makeDiv.append("h2")
    .text(function(period)
         {
            return period.name;
        })
    
    makeDiv.append("h3")
    .text(function(period)
         {
            return period.detailedForecast;
        })
    
    makeDiv.append("h3")
    .text(function(period)
         {
            return period.temperature;
        })
    
    makeDiv.append("h3")
    .text(function(period)
         {
            return period.windSpeed;
        })
    
    makeDiv.append("h3")
    .text(function(period)
         {
            return period.windDirection;
        })
    
    makeDiv.append("img")
    .attr("src", function(period)
         {
            if (period.shortForecast == "Cloudy") 
                {
                    return "img/cloudy.png";
                }
            else if (period.shortForecast == "Sunny")
                {
                    return "img/sun.png";                
                }
            else
                {
                    return "   ";
                }
        })
}
