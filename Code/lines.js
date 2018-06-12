// https://codepen.io/dannyhc/pen/WQdmwa?editors=1010 (for horizontal line)

function createLines(dataset) {

    //console.log(dataset)
    
    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

    // Set the ranges
    var x = d3.scaleLinear().domain([2006, 2015]).range([0, width]);
    var y = d3.scaleLinear().domain([-100, 20]).range([height, 0]);

    // Define the axes
    var xAxis = d3.axisBottom(x).scale(x)
            .tickFormat(function(d){ return d.toString();});

    var yAxis = d3.axisLeft(y).tickFormat(function(d){ return d + "%"});

    // Define the line
    var multiLine = d3.line()   
        .x(function(d) {  return x(d["x"]); })
        .y(function(d) { return y(d["y"]); })
        .curve(d3.curveCatmullRom);
        
    // Adds the svg canvas
    var lineGraph = d3.select("#containerGraph")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", 
                 "translate(" + margin.left + "," + margin.top + ")");
    
    var color = d3.scaleOrdinal(d3.schemeSet1);  // set the colour scale

    // Get the data
    dataset.forEach(function(d) {

        
        lineGraph.append("path")
            .data(d)
            .attr("class", "line")
            .style("stroke-width", "2px")
            .attr("id", function(d){ return d["name"] } )
            .attr("d",  multiLine(d))
            .style("stroke", function(d){ return color(d["name"]);});

       });

        
         // Add the X Axis
        lineGraph.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
            
        // Add the Y Axis
        lineGraph.append("g")
            .attr("class", "axis")
            .call(yAxis);

        // Add horizontal red line at zero point
        lineGraph.append("g")
            .attr("transform", "translate(0," + y(0) + ")")
            .append("line")
            .attr("x2", width)
            .style("stroke-dasharray", ("5,3"))
            .style("fill-opacity", .3)
            .style("stroke", "red")

        var legend = lineGraph.selectAll("Legend")
          .data(dataset)
          .enter()
          .append("g")
          .attr("class", "legend");

        legend.append("rect")
          .attr("x", width - 20)
          .attr("y", function(d, i) {
            return i * 20;
          })
          .attr("width", 10)
          .attr("height", 10)
          .style("fill", function(d, i) {
            return color(d[i]["name"]) ;
          });

        legend.append("text")
          .attr("x", width - 8)
          .attr("y", function(d, i) {
            return (i * 20) + 9;
          })
          .text(function(d, i) {
            return d[i]["name"];
          });
    
}