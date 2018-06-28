# Final Report


### This project

The aim of this project is to describe the situation surrounding the bee population in the Netherlands.
To show if the current use of pesticides and/or soil use is having an impact on the population.

### Page overview

<img src="https://github.com/SabbiD/DataProject/blob/master/doc/done_3.png" />


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
||||
| ***Rose chart***  |   |   |
|    createRose   | Draw a Nightingale's Rose chart with data for the default chosen year.  | rose.js  |
|    showTooltip  | Shows tooltips on hover rose chart.  | rose.js  |
||||
| ***Multi-line graph***  |   |   |
|    createLines  | Draws a multi-line graph   | lines.js  |
|    dropLines | Switch between lines when option from dropdown menu is clicked.| lines.js|
||||

### The challenges

| Function name   | Difficulties  | Changes from proposal |
|-------------|-------------|-------------|
| ***Map***  | Had some difficulties finding a good TOPOjson file but no further difficulties.  | No changes. |
||||
| ***Rose chart***  | Had difficulties finding a good example that I could understand. The version that I have followed now did not have an update function. And I later found out that this version was not similar to a pie-chart which is why I could not update with a seperate update function and also could not implement nice transitions when updating.  | No updateRose function and no transitions that I would've liked when updating chart. Instead I've implemented an animation with anime.js when rose chart is first drawn.  |
||||
| ***Multi-line graph***  | Difficulties when trying to find a good way to format data to use in line chart. Due to time constraint could not link the slider to the line chart.  | Slider not linked to line chart, but now the line chart has a dropdown menu to switch between lines. Also lines have circles on datapoints.  |
||||
| ***Bar chart***  | Data showed through chart did not add a significant insight to the story. So decided not to implement due to time constraint.    | Not implemented.  |
||||
| ***Donut chart***  | Data showed through chart did not add new insight to the story. So decided not to implement due to time constraint.  | Not implemented.   |
||||
| ***Mind map***  | Could not find a pretty, good, and comprehensible example.   | Not implemented.  |
||||

Now I can clearly say that when first making the proposal I did not have a good idea of how long these charts would take to implement.
A problem that I faced with two of the charts (rose and mindmap) is that I could not find good examples that I could comprehend well enough to implement them myself in this short amount of time. If I would've had more time I definitely would have liked to implement something more similar to [this](http://bl.ocks.org/kgryte/5926740). 
<br>Also I choose not to change the axis of the line chart when updated, because I think that when also the axis is updated the difference between the categories of pesticide use will not be as clear. Also I would have to draw the other lines again, which would distract from the line that is changed with the dropdown button and is actually important.


