// https://codepen.io/dannyhc/pen/WQdmwa?editors=1010 (for horizontal line)
// https://bl.ocks.org/larsenmtl/e3b8b7c2ca4787f77d78f58d41c3da91 (for mouseover)

function createLines(dataset) {

    //console.log(dataset)
    
    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 320 - margin.top - margin.bottom;

    // Set the ranges
    var x = d3.scaleLinear().domain([2006, 2015]).range([0, width]);
    var y = d3.scaleLinear().domain([-70, 20]).range([height, 0]);

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
            .attr("id", function(d){ console.log(d["name"].trim()); return d["name"];} )
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


        var Legned = d3.select(".legend").append("svg")
            .attr("width", width)
            .attr("height", height - 50)
        
        var dataL = 0;
        var offset = 80;
        
        var legend = lineGraph.selectAll('.legend')
            .data(dataset)
            .enter().append('g')
            .attr("class", "legend")
            .attr("transform", function (d, i) {
             if (i === 0) {
                dataL = d.length + offset 
                return "translate(0,0)"
            } else { 
             var newdataL = dataL
             dataL +=  d.length + offset
             return "translate(" + (newdataL) + ",0)"
            }
        })

        legend.append('rect')
            .attr("x", 0)
            .attr("y", 280)
            .attr("width", 10)
            .attr("height", 10)
            .attr("id", function(d, i){ return d[i]["name"] + "rect"})
            .style("fill", function (d, i) {
            return color(d[i]["name"])
        })
        
        legend.append('text')
            .attr("x", 100)
            .attr("y", 280)
            .attr("dy", ".35em")
            .text(function (d, i) {
                return d[i]["name"]
            })
            .attr("class", "textselected")
            .style("text-anchor", "end")
            .style("font-size", 12)
    
    var mouseG = lineGraph.append("g")
      .attr("class", "mouse-over-effects");

    mouseG.append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line")
      .style("stroke", "black")
      //.style("stroke-dasharray", ("10, 10"))
      .style("stroke-width", "3px")
      .style("opacity", "0.5");
      
    var lines = document.getElementsByClassName('line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(dataset)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

    mousePerLine.append("circle")
      .attr("r", 5)
      .style("fill", function(d, i) {
        return color(d[i]["name"]);
      })
      .style("stroke-width", "1px")
      //.style("opacity", 0.25);

    mousePerLine.append("text")
      .attr("transform", "translate(10,3)");

    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', width) // can't catch mouse events on a g element
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
              else break; //position found
            }
            
            d3.select(this).select('text')
              .text(y.invert(pos.y).toFixed(2));
              
            return "translate(" + mouse[0] + "," + pos.y +")";
          });
      });

    console.log(document.getElementsByClassName("dropdown-item")[0].innerText)
    //.onclick= dropLines
}
    function dropLines(name){

      var svg = d3.select("#containerGraph").select("#Temperature Change")//.transition();
      d3.select("#Pesticide Use").remove()
      console.log(svg)
      svg.select("text[id='Pesticide Use']").remove()
      //.duration(750)
      //.attr("d", multiLine(data))
      console.log("yup")

    }

    //dropLines()
