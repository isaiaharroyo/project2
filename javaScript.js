/* var weatherPromise = 
    d3.json("https://national-weather-service.p.rapidapi.com/products/types/%7BtypeId%7D", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "national-weather-service.p.rapidapi.com",
		"x-rapidapi-key": "02852ea2a3msh7a2dd6a12e10041p14e36djsnacea46edb14a"
	}
})

weatherPromise.then(

function(weather)
    {
        setHeader("Check the Weather: ");
        console.log("Weather",weather);
    },
    
function(err)
    {
        setHeader("No Weather Today");
        console.log("what happened?",err);
    }) */

var setHeader = function(message)
{
    d3.select("h1").text(message);
}

console.log(
    d3.select ("#filmBar")
    .property("value")
)


d3.select("#button")
    .on("click", function()
    {
    console.log(d3.select("#filmBar").property("value"))
    })
