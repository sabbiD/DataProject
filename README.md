# The decline of bees
### Project: Data processing 2018
#### Sebile Demirtaş
##### 10548270


## Introduction

It has been over a decade that we first heard about the decline of bees. Collony collapse disorder (CCD) (in Dutch: bijenverdwijnziekte)
seems to be the reason but what are the causes for this disorder? And what is the effect of this decline in bees?
What is the current situation in the Netherlands?

###### [The Economist](https://www.economist.com/the-economist-explains/2015/09/06/the-decline-of-bees)


## Solution
Through visualizing all the different aspects around the Collony Collapse Disorder and the bee decline
(in the Netherlands), it will become easier to comprehend the situation and to see if regulation is needed.  

<img src="https://github.com/sabbiD/DataProject/blob/master/doc/blankpage.jpg"/>

Functionalities:
- A mind map for CCD pointing to the causes of CCD and the related graphs to the causes (Optional).
- A slider for years that updates the map of the Netherlands of the type of land/soil use and the rose chart showing pesticide use 
  , for that chosen year (MVP). 
- A nightingale rose chart displaying the use of pesticides (MVP). 
- A line graph showing the development of winter bee deaths, pesticide use, temperature changes, and possibly decline of 
 soil/land that enables bee health (MVP).
- A map of the Netherlands that shows the way in which the land/soil is used (Optional).
- A bar chart comparing the situation concerning the determinants of the bee decline in the US and the 
  Netherlands. Accompanied by a dropdown menu to select different determinants (MVP). 
- A pie chart breaking down the pesticides into the ones that are harmfull to bees and those that are not (Optional).



## Prerequisites


  ### Data sources:
  - [Land/ soil use from CBS] (http://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=80780NED&D1=0%2c2-7%2c13-18%2c24%2c50%2c90%2c116%2c156%2c159%2c226%2c321%2c327%2c332%2c364%2c383-384%2c388%2c400-403%2c406%2c409%2c418%2c427%2c444%2c459%2c504%2c512%2c519%2c526%2c538&D2=0&D3=0%2c5%2c10%2c15-16&HDR=G1%2cG2&STB=T&VW=T)
  - [Pesticide use from CBS](http://www.clo.nl/indicatoren/nl0015-afzet-gewasbeschermingsmiddelen-in-de-land--en-tuinbouw?i=11-61)
  - [Winter bee deaths from CBS] (http://www.clo.nl/indicatoren/nl0572-oorzaken-bijensterfte)

  ### External components:
  - d3-tip
  - GeoJSON/topoJSON
  - Bootstrap
  - Probably more to come...

  ### Similar visualizations:
  - [Fertiziler and pesticide use around the world] (https://ourworldindata.org/fertilizer-and-pesticides)
  - [Nightingale's rose](http://bl.ocks.org/kgryte/5926740)
  - [Donut Chart](https://datavizcatalogue.com/methods/donut_chart.html)
  

  ### Difficulties:
- Correctly linking visualizations.
- Being able to explain the story through the visualization without having to use text.
- Correctly implementing the nightingale's rose chart.
- Designing an aesthetically pleasing webpage.

