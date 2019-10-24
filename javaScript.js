var weatherPromise = 
    d3.json("https://ghibliapi.herokuapp.com/films");

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
    })

var setHeader = function(message)
{
    d3.select("h1").text(message);
}

console.log(
    d3.select ("#filmBar")
    .property("value")
)


d3.select("#filmBar")
    .on("input", function()
    {
    console.log(this.value)
    //alert("something happened")
    })
