var weatherPromise = d3.json("https://www.metaweather.com/api/location/2487956/");

weatherPromise.then(

function(weather)
    {
        setHeader("Check the Weather: ");
        console.log("Weather",weather);
    },
    
function(err)
    {
        setHeader("No Weather Today");
        console.log(err);
    })

var setHeader = function(message)
{
    d3.select("h1").text(message);
}