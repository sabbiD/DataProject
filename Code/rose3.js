
function createRose(data){

var margin = {top: 25, right: 10, bottom: 25, left: 10};
var width = 300 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;

var cx = width/2;
var cy = height/2;

var radius = Math.min(cx,cy);

console.log(radius)

var categories = [data[0].Categorie, data[1].Categorie, data[2].Categorie, data[3].Categorie]

var i = 0;

var scale = d3.scaleLinear()
.range([0,radius])
.domain([0, 500]) // Hard coded domain (input data range).

console.log(data)

//for (var i = 0; i < data.length; i++){

//Arc for pie chart
var arc = d3.arc()
.outerRadius(function(d) { console.log(d.data[1995]); return  scale(d.data[1995]) }) 
.innerRadius(0)
.startAngle(function(d) { return d.startAngle - Math.PI/4; })
.endAngle(function(d) { return d.endAngle - Math.PI/4; });

// Arc for text
var textArc = d3.arc()
.outerRadius(function(d) { return scale(d); })
.innerRadius(function(d) { return scale(d); })
.startAngle(-0.5)
.endAngle(Math.PI * 2);


// Piechart layout, all equal width wedges
var pie = d3.pie()
.sort(null)
.value(function(d) { return 1; });

var roseGraph = d3.select("#containerRose").append("svg")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("transform", "translate(" + cx + "," + cy + ")");


	var g = roseGraph.selectAll(".arc")
	  .data(pie(data))
	.enter().append("g")
	  .attr("class", "arc");

	var wedge = g.append("path")
	.attr("d", arc)
	.style("fill","steelblue")
	.style("stroke","white")
	.on("click",cycle);
		  
	//Cycle through the data
	function cycle() {
		i++;
		
		//reset counter if at limit 
		if (i == 4) { i = 0; }
		
		//Show appropriate data
		pie.value(function(d) { return d[i]; })
		wedge.transition().duration(1000).attr("d",arc);
	}

	// Tick/Grid data
	var ticks = [0, 300];
	//var tickLabels = ["50% of total","30% of total"];	

	//Add the circles for each tick
	/*var grid = roseGraph.selectAll(".circle")
		.data(ticks)
		.enter().append("circle")
		.attr("r", function(d) { return scale(d); })
		.attr("id", function(d,i) { return "tick" + i; })
		.style("stroke-dasharray", ("3, 3"))
		.style("fill","none")
		.style("stroke","#333");*/
		
	//Add the paths for the text
	roseGraph.selectAll(".label")
		.data(ticks)
		.enter().append("path")
		.append("path")
		.attr("d",textArc)
		.attr("id",function(d,i) { return "tic" + i; } )
							;
	//And add the text 	
	roseGraph.selectAll(".label")
		.data(categories)
		.enter().append("text")
		.style("font-size",10)
		//.style("font-weight",200)
		.style("stroke-width",0)
		.style("fill","#333")
		.append("textPath")
		.attr("xlink:href",function(d,i) { return "#tic" + i; } )
		.text(function(d,i) { return categories[i];} )
		//.attr("startOffset",function(d,i){return "16%";});

	//}
}