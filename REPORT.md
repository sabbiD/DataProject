# Final Report


### This project

The aim of this project is to describe the situation surrounding the bee population in the Netherlands.
To show if the current use of pesticides and/or soil use is having an impact on the population.

### The design

| Function name   | Description  | File name  |
|-------------|-------------|-------------|
| ***General functions***  |   |   |
| callback  | Retrieves all data that will be necessary for visualizations. Calls draw functions the first time.  | index.js  |
| ***Map***  | | |
|    createMap  | Draws map of the Netherlands using TopoJson, coloring regions according to data for default chosen year.  | map.js  | 
|    updateMap  | Update map when slider is used for corresponding year.  | map.js  | 
|    colorMap   | Colors map according to data.| map.js|
|    showTooltip   | Shows tooltips on hover map.| map.js|

| ***Rose chart***  |   |   |
|    createRose   | Draw a Nightingale's Rose chart with data for the default chosen year.  | rose.js  |
|    showTooltip  | Shows tooltips on hover rose chart.  | rose.js  |
||||
| ***Multi-line graph***  |   |   |
|    createLines  | Draws a multi-line graph   | lines.js  |
|    dropLines | Switch between lines when option from dropdown menu is clicked.| lines.js|
||||

- no update function of rose chart due to problems.
- no update function line chart because not necessary not yearly updated.
- everything called in index.js.


### Design decisions 
- Rose chart difficult to implement no transitions.
- Eventually because of time constraints and not an important addition, no bar chart and pie chart.
- mind map not a good example found.
- no axis transitions in line chart not necessary.
- 

