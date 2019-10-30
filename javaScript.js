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
        setHeader("Loading Weather Data")
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
            setHeader("Weather Unavaliable: check spelling");
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
            setHeader("Weather Unavaliable: check spelling");
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
            setHeader("Weather Unavaliable: check spelling");
        })
} //end of API access

//Display
var makeDisplay = function(data)
{
    var foreArray = data.properties.periods;
    
    d3.select("#foreBody")
    .append("h1")
    .text(d3.select("#city").property("value") + 
                    ", " + d3.select("#state").property("value"))
    
    var ButtonDiv=d3.select("#foreBody")
    .append("div")
    .attr("id","CENTER")
    
    ButtonDiv.append("button")
    .text("Week at a Glance")
    .attr("id", "simple")
    
    console.log(foreArray)
    
    d3.select("#simple")
    .on("click", function()
        {
                console.log("got here");
        
                makeSimpleDisplay(foreArray);
        })
    
    var makeDiv = d3.select("#foreBody")
    .selectAll("div")
    .data(foreArray)
    .enter()
    .append("div")
    .attr("id", "forecast")
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
            return "Temp: " + period.temperature + " "+"\xB0" +"F";
        })
    
    makeDiv.append("h3")
    .text(function(period)
         {
            return "Wind Speed: " + period.windSpeed;
        })
    
    makeDiv.append("h3")
    .text(function(period)
         {
            return "Wind Direction: " + period.windDirection;
        })
    
    makeDiv.append("img")
    .attr("src", function(period)
         {
            if (period.shortForecast.includes("Thunder"))
                {
                    return "img/thunderstorm.png";
                }
            else if (period.shortForecast.includes("Mostly"))
                {
                    return "img/sunnyCloudy.png";
                }
            else if(period.shortForecast.includes("Heavy"))
                {
                    return "img/heavyRain.png";
                }
            else if (period.shortForecast.includes("Rain"))
                {
                    return "img/rain.png";
                }
            else if (period.shortForecast.includes("Snow"))
                {
                    return "img/snow.png";
                }
            else if (period.shortForecast.includes("Sunny"))
                {
                    return "img/sun.png";                
                }
            else if (period.shortForecast.includes("Cloudy")) 
                {
                    return "img/cloudy.png";
                }
            else
                {
                    if (period.isDaytime == true)
                    {
                        return "img/sun.png";
                    }
                    
                    else
                    {
                        return "img/moon.png";
                    }
                }
        })
}


var makeSimpleDisplay = function(foreArray)
{
    //var foreArray = crazyforecast.properties.periods;
    
    d3.selectAll("#forecast")
    .remove();
    
    d3.select("#foreBody")
    .append("table")
    .attr("id", "TABLE");
    
    var makeRow1 = d3.select("#TABLE")
    .append("tr");
    
    //because we didn't bind data to the button, it needed to be function() and not function(foreArray)
    
    makeRow1.selectAll("td")
    .data(foreArray)
    .enter()
    .append("td")
    .text(function(period)
        {
            return period.name
        });
    
    var makeRow2 = d3.select("TABLE")
    .append("tr");
    
   makeRow2.selectAll("td")
    .data(foreArray)
    .enter()
    .append("td")
    .text(function(period)
        {
            return period.temperature + " "+"\xB0" +"F";
        });
    var makeRow3 = d3.select("TABLE")
    .append("tr");
    
    makeRow3.selectAll("td")
    .data(foreArray)
    .enter()
    .append("td")
    .append("img")
    .attr("src", function(period)
         {
            if (period.shortForecast.includes("Thunder"))
                {
                    return "img/thunderstorm.png";
                }
            else if (period.shortForecast.includes("Mostly"))
                {
                    return "img/sunnyCloudy.png";
                }
            else if(period.shortForecast.includes("Heavy"))
                {
                    return "img/heavyRain.png";
                }
            else if (period.shortForecast.includes("Rain"))
                {
                    return "img/rain.png";
                }
            else if (period.shortForecast.includes("Snow"))
                {
                    return "img/snow.png";
                }
            else if (period.shortForecast.includes("Sunny"))
                {
                    return "img/sun.png";                
                }
            else if (period.shortForecast.includes("Cloudy")) 
                {
                    return "img/cloudy.png";
                }
            else
                {
                    if (period.isDaytime == true)
                    {
                        return "img/sun.png";
                    }
                    
                    else
                    {
                        return "img/moon.png";
                    }
                }
        })
}


// or is ||

//.includes(string)