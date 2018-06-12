function createLines(dataset, nameList) {

    //console.log(dataset)
    console.log(nameList)
    
    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

    // Set the ranges
    var x = d3.scaleLinear().domain([2006, 2015]).range([0, width]);
    var y = d3.scaleLinear().domain([-30, 30]).range([height, 0]);

    // Define the axes
    var xAxis = d3.axisBottom(x).scale(x)
            .tickFormat(function(d){ return d.toString();});

    var yAxis = d3.axisLeft(y).tickFormat(function(d){ return d + "%"});

    // Define the line
    var multiLine = d3.line()   
        .x(function(d) {  return x(d["x"]); })
        .y(function(d) { return y(d["y"]); });
        
    // Adds the svg canvas
    var lineGraph = d3.select("#containerGraph")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", 
                 "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    var data = dataset.forEach(function(d) {

        var color = d3.scaleOrdinal(d3.schemeCategory10);  // set the colour scale

        lineGraph.append("path")
            .data(d)
            .attr("class", "line")
            .attr("id", function(d, i){ i++ ; return nameList[i] } )
            .attr("d",  multiLine(d))
            .style("stroke", color(d[10]));

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
    
}