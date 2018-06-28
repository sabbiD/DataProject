/*
  UvA minor programmeren
  Data Project Spring 2018
  Sebile Demirtas 
  10548270

  This file contains functions to draw a multi-line chart with a mouseover.
  In the createLines function the chart is first drawn and the dropLines 
  function is used to update the chart when a new option in the dropdown 
  is selected.

  Sources:
  - https://codepen.io/dannyhc/pen/WQdmwa?editors=1010 (for horizontal line)
  - https://bl.ocks.org/larsenmtl/e3b8b7c2ca4787f77d78f58d41c3da91 (for mouseover)
  - https://bl.ocks.org/jkeohan/b8a3a9510036e40d3a4e (for legend)

*/

function createLines(dataset) {

    // Make 2 datasets for first drawing of line chart and updating line chart
    var datasetNew = dataset.slice();

    // Split total datasets into chunks for dropdown-options
    datasetFirst = dataset.splice(0, 3);

    // Dataset used for dropLines()
    dataset = datasetNew.splice(2, 5)

    var newLines = []

    // Dict used in dropLines() for finding correct data
    dataset.forEach( function(d, i){

            newLines[d[0]["label"]] = i;
      
    });

    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 320 - margin.top - margin.bottom;

    // Set the ranges
    var x = d3.scaleLinear().domain([2006, 2015]).range([0, width]);
    var y = d3.scaleLinear().domain([-70, 30]).range([height, 0]);

    // Define the axes
    var xAxis = d3.axisBottom(x).scale(x)
            .tickFormat(function(d){
             return d.toString();
            })
            .tickSize(-(height + 20));
    
    var yAxis = d3.axisLeft(y)
            .tickFormat(function(d){ 
              return d + "%";
            })
            .tickSize(-(width+ 20));

    // Define the line
    var multiLine = d3.line()   
        .x(function(d) {  return x(d["x"]); })
        .y(function(d) { return y(d["y"]); })
        .curve(d3.curveCatmullRom);
        
    // Add svg to container
    var lineGraph = d3.select("#containerGraph")
        .append("svg")
            .attr("width", width + margin.left + margin.right + 200)
            .attr("height", height + margin.top + margin.bottom + 50)
        .append("g")
            .attr("transform", 
                 "translate(" + margin.left + "," + margin.top + ")");
    
    // Color scale 
    var color = d3.scaleOrdinal()
    .range(["#a6611a", "#dfc27d", "#80cdc1", "#018571"]);

    // Get the data
    datasetFirst.forEach(function(d) {

        // Draw line for every dataset
        lineGraph.append("path")
                .data(d)
                .attr("class", "line")
                .style("stroke-width", "2px")
                .attr("id", function(d){ return d["label"];} )
                .attr("d",  multiLine(d))
                .style("stroke", function(d){ return color(d["name"]);})

        // Append circles on lines for yearly datapoint
        var points = lineGraph.selectAll('circle.point')
          .data(d);
        points.enter().append('circle')
              .attr("r", 4)
              .style("stroke", function(d){ return color(d["name"]);})
              .style("fill", "white")
              .attr('cx', function(d) { return x(d["x"]) })
              .attr('cy', function(d) { return y(d["y"]) })
              .attr("class", function(d) { return d["label"]; });
    });

        
     // Add the X Axis
    lineGraph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add X axis label
    lineGraph.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Year");

    // Add the Y Axis
    lineGraph.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // Add Y axis label
    lineGraph.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Percentage change");

    // Add horizontal red line at zero point
    lineGraph.append("g")
        .attr("transform", "translate(0," + y(0) + ")")
        .append("line")
        .attr("x2", width)
        .style("stroke-dasharray", ("5,3"))
        .style("fill-opacity", .3)
        .style("stroke", "red")

    // Add space for legend on svg
    var legend = lineGraph.selectAll('.legend')
        .data(datasetFirst)
        .enter().append('g')
        .attr("class", "legend")
        .attr("transform", function (d, i) {
        {
            return "translate(0," + i * 20 + ")";
        }
    });

    // Append legend rectangles
    legend.append('rect')
        .attr("x", 540)
        .attr("y", 0)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d, i) {
        return color(d[i]["name"]);
    });

    // Append legend text
    legend.append('text')
        .attr("x", 560)
        .attr("y", 10)
        .text(function (d, i) {
            return d[i]["name"];
        })
        .attr("class", function(d, i) { return d[i]["label"]; })
        .style("text-anchor", "start")
        .style("font-size", 15);

    var mouseG = lineGraph.append("g")
      .attr("class", "mouse-over-effects");


    var lines = document.getElementsByClassName('line');

    // Append line to follow mouse
    mouseG.append("path")
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", "0.5");
    
    // Append space for mouseover
    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(datasetFirst)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

    // Append circles on mouseover
    mousePerLine.append("circle")
      .attr("r", 5)
      .style("stroke", function(d, i) {
        return color(d[i]["name"]);
      })
      .style("fill", "white")
      .style("stroke-width", "1px");

    // Append text to line
    mousePerLine.append("text")
      .attr("transform", "translate(10,3)");

    // Append rectangles to cath mouse movements on svg
    mouseG.append('svg:rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', function() { // on mouse out hide line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "0");
      })
      .on('mouseover', function() { // on mouse in show line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "1");
      })
      .on('mousemove', function() { // mouse moving over canvas
        var mouse = d3.mouse(this);
        d3.select(".mouse-line")
          .attr("d", function() {
            var d = "M" + mouse[0] + "," + height;
            d += " " + mouse[0] + "," + 0;
            return d;
          });

        d3.selectAll(".mouse-per-line")
          .attr("transform", function(d, i) {
            var beginning = 0,
                end = lines[i].getTotalLength(),
                target = null;

            while (true){
              target = Math.floor((beginning + end) / 2);
              pos = lines[i].getPointAtLength(target);
              if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                  break;
              }
              if (pos.x > mouse[0])      end = target;
              else if (pos.x < mouse[0]) beginning = target;
              else break;
            }
            
            d3.select(this).select('text')
              .text(y.invert(pos.y).toFixed(2));
              
            return "translate(" + mouse[0] + "," + pos.y +")";
          });
      });

   
    function dropLines(name){

      // Get id of option that is clicked 
      var label = this.getAttribute('id');

      // Get data for chosen line
      label = newLines[label];

      // Label names for legend
      var legendLabels = ["Total Pesticide Use", "Pesticides: Insects and mites", 
      "Pesticides: Funghi and bacteria", "Pesticides: Weeds", "Pesticides: Other"];

      // Update legend with new line label
      lineGraph.select("text.totalPest")
              .transition()
              .text(legendLabels[label]);

      // Update existing line with new line data
      var svg = lineGraph.select("#totalPest.line").transition()
                .duration(1000)
                .ease(d3.easeCircle)
                .attr("d", multiLine(dataset[label]));

      // Update existing dots with new line data
      lineGraph.selectAll("circle.totalPest")
                .data(dataset[label])
                .transition()
                .duration(1000)
                .ease(d3.easeBounce)
                .attr('cx', function(d) { return x(d["x"]) })
                .attr('cy', function(d) { return y(d["y"]) });

    }

    // Link update function to button elements
    document.getElementById("totalPest").onclick=dropLines;
    document.getElementById("pestInsects").onclick=dropLines;
    document.getElementById("pestFunghi").onclick=dropLines;
    document.getElementById("pestWeeds").onclick=dropLines;
    document.getElementById("pestOther").onclick=dropLines;
}