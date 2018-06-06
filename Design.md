# Design Document

## Data sources:  

- Data about the land use in the Netherlands (2000 - 2017) from the CBS: [Link](http://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=80780NED&D1=0%2c2-7%2c13-18%2c24%2c50%2c90%2c116%2c156%2c159%2c226%2c321%2c327%2c332%2c364%2c383-384%2c388%2c400-403%2c406%2c409%2c418%2c427%2c444%2c459%2c504%2c512%2c519%2c526%2c538&D2=0&D3=0%2c5%2c10%2c15-16&HDR=G1%2cG2&STB=T&VW=T)  
This data will be used for the map of the Netherlands and in the multi-line graph. 
- Data about the winter bee deaths in the Netherlands (2006 - 2017) from the CLO: [Link](http://www.clo.nl/indicatoren/nl0572-oorzaken-bijensterfte)  
This data will be used in the multi-line graph and in the bar chart to compare the Netherlands with the US.
- Data about the yearly average temperture in the Netherlands (1906 - 2015) from the CLO: [Link](www.clo.nl/nl022612)  
This data will be used in the multi-line graph.
- Data about the winter bee deaths in the US (2008 - 2017) from the Bee Informed Partnership: [Link](https://bip2.beeinformed.org/survey/)  This data will be used in the bar chart to compare the situation in the Netherlands with the situation in the US.
- Data about the use of pesticides in the Netherlands (1985 - 2015) from the CLO: [Link](http://www.clo.nl/indicatoren/nl0015-afzet-gewasbeschermingsmiddelen-in-de-land--en-tuinbouw?i=11-61)  
This data will be used in the Nightingale's Rose chart to display the use of pesticides in a specific year.
- Data about the use of specific types pesticides in the Netherlands (1995 - 2012) from the CLO: [Link](http://www.clo.nl/indicatoren/nl0560-gebruik-gewasbeschermingsmiddelen-in-land--en-tuinbouw-per-actieve-stof)  
This data will be used in the donut chart to display the use of specific pesticides that are harmfull to the health of the bees.
- TopoJSON for the Netherlands to make a map: [Link](http://bl.ocks.org/phil-pedruco/9344373)


Except for the TopoJSON file, all the other files will be converted to JSON-files with a python converter (convertCSV2JSOn.py).

<br><br>
### Functions and operations  
<br><br>

| Function name   | Description  | File name  |
|-------------|-------------|-------------|
| ***General functions***  |   |   |
| getAllData  | Retrieves all data that will be necessary for visualizations.  | index.js  |

##### Table 1. General functions  
<br><br>

| Function name   | Description  | File name  |
|-------------|-------------|-------------|
| ***Event listeners***  |   |   |
| onClick  | When clicked on part in Rose chart calls donut chart with corresponding information. | Rose.js  |   
| onHover  | When hovered over region in the map shows tooltip with corresponding information. | map.js  | 
| onSlide  | When slider is used calls update functions for map and Rose chart. | index.js  | 
| onSelect | When choice in the dropdown menu is selected calls update function for bar chart with corresponding information. | bar.js  |  

##### Table 2. Event listeners  
<br><br>

| Function name   | Description  | File name  |
|----|----|----|
| ***Map***  | | |
|    createMap  | Draws map of the Netherlands using TopoJson, coloring regions according to data for default chosen year.  | map.js  |   
|    updateMap  | Update map when slider is used for corresponding year.  | map.js  | 
||||
| ***Nightingale's Rose chart***  |   |   |
|    createRose   | Draw a Nightingale's Rose chart with data for the default chosen year.  | rose.js  |
|    updateRose  | Update rose chart when slider is used for corresponding year.  | rose.js  |
||||
| ***Multi-line graph***  |   |   |
|    createLines  | Draws a multi-line graph   | lines.js  |
|    linkLines | When slider is used highlight corresponding period on the multi-line graph.| lines.js|
||||
| ***Bar chart***  |   |   |
|    createBars  | Draw bar chart with data for the default chosen year.  | bar.js  |
|    updateBars  | Update bar chart when slider is used for corresponding year.  | bar.js  |
||||
| ***Donut chart***  |   |   |
|    createDonut  | Draw donut chart with data for the default chosen year.  | donut.js  |
|    updateDonut  | Update donut chart when slider is used for corresponding year.  | donut.js  |

##### Table 3. Visualization functions
<br><br>


#### Flow of operations

The main functions will be run from index.js, libraries and scripts will be imported in index.html. The lay-out of the webpage is constructed with layout.css and a bootstrap theme will be used for the overall look of the webpage.

<br><br>

### D3 plugins (Preliminary)

- d3.queue
- d3.legend
- d3.container
- d3.tip
- d3.TopoJSON
- d3.collections
- d3.scale
- d3.lineChunked
- d3.colorBar
- d3.geoProjection

<br><br>

### D3 Libraries (Preliminary)
- Bootstrap 
- to be continued...

