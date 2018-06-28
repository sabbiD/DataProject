# The decline of bees
### Project: Data processing 2018
#### Sebile Demirtaş
##### 10548270

[See project on Github Pages](https://sabbid.github.io/DataProject/index.html)

## Problem Statement

It has been over a decade that we first heard about the decline of bees. Colony collapse disorder (CCD) (in Dutch: bijenverdwijnziekte)
seems to be the reason but what are the causes for this disorder? And what is the effect of this decline in bees?
What is the current situation in the Netherlands?

###### [The Economist](https://www.economist.com/the-economist-explains/2015/09/06/the-decline-of-bees)


## Solution

Through visualizing all the different aspects around the Colony Collapse Disorder and the bee decline
(in the Netherlands), it will become easier to comprehend the situation and to see if regulation is needed.  

  #### Target Audience
  Beekeepers, farmers, gardeners, honey-lovers, environmentalists, bee-lovers, nature-lovers, and everyone else who is interested in       the wellbeing of the earth.

  ### Visual Sketch
<img src="https://github.com/sabbiD/DataProject/blob/master/doc/blankpage.jpg"/>

  ### Functionalities:

  - A mind map for CCD pointing to the causes of CCD and the related graphs to the causes (Optional).
  - A slider for years that updates the map of the Netherlands of the type of land/soil use and the rose chart showing pesticide use 
    , for that chosen year (MVP). 
  - A nightingale rose chart displaying the use of pesticides for a chosen year (MVP). 
  - A line graph showing the development of winter bee deaths, pesticide use, temperature changes, and possibly decline of 
   soil/land that enables bee health (MVP).
  - A map of the Netherlands that shows the way in which the land/soil is used for a chosen year (Optional).
  - A bar chart comparing the situation concerning the determinants of the bee decline in the US and the 
    Netherlands. Accompanied by a dropdown menu to select different determinants (MVP). 
  - A pie chart breaking down the pesticides into the ones that are harmfull to bees and those that are not (Optional).



## Prerequisites


  ### Data sources:
  
  - [Greenpeace Bees In Decline report](http://www.greenpeace.org/switzerland/Global/international/publications/agriculture/2013/BeesInDecline.pdf)
  - [Land/ soil use from CBS](http://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=80780NED&D1=0%2c2-7%2c13-18%2c24%2c50%2c90%2c116%2c156%2c159%2c226%2c321%2c327%2c332%2c364%2c383-384%2c388%2c400-403%2c406%2c409%2c418%2c427%2c444%2c459%2c504%2c512%2c519%2c526%2c538&D2=0&D3=0%2c5%2c10%2c15-16&HDR=G1%2cG2&STB=T&VW=T)
  - [Pesticide use from CBS](http://www.clo.nl/indicatoren/nl0015-afzet-gewasbeschermingsmiddelen-in-de-land--en-tuinbouw?i=11-61)
  - [Winter bee deaths from CBS](http://www.clo.nl/indicatoren/nl0572-oorzaken-bijensterfte)

  ### External components:
  
  - d3-tip
  - GeoJSON/topoJSON
  - Bootstrap
  - Probably more to come...

  ### Similar visualizations:
  
  - [Fertiziler and pesticide use around the world](https://ourworldindata.org/fertilizer-and-pesticides)  
  This visualizations shows a lot of different graphs concerning pesticide and fertilizer use around the world.
    I would like to make a similar type of line graph and a map as in this visualization. 
  - [Nightingale's rose](http://bl.ocks.org/kgryte/5926740)  
  A basic example of a nightingale's rose chart.
    I would like to make a similar rose chart.
  - [Donut Chart](https://datavizcatalogue.com/methods/donut_chart.html)  
  A basic example of a donut chart.
  - [Bee Informed](https://bip2.beeinformed.org/loss-map/)  
  A visualization of the winter colony losses on the US map. I would have liked to make a similar map for the Netherlands, but
    unfortunately this data for specific regions is not available.
  
  

  ### Difficulties:
  
- Correctly linking visualizations.
- Being able to explain the story through the visualization without having to use text.
- Correctly implementing the nightingale's rose chart.
- Designing an aesthetically pleasing webpage.
- Smooth transitioning for graphs and charts.
