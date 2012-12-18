# Raphael Charts Plugin

This is a small plugin for RaphaelJS to build bar and ring graphs, its faily flexible enough to style these as you want, but for ultimate customality dive into the code and hack it.

Checkout [Demo bar and pie charts](http://adodson.com/raphael.charts.js)

# Dependencies

* [raphael.js](http://raphaeljs.com/)
* [jquery.js](http://jquery.com/)


# Initiate RaphaelJs

	var chart = Raphael(id, width, height);

* _id_: Element id
* _width_: Width of the target element
* _height_: Height of the target element


# Creating a bar graph

    chart.barGraph(width, height, values, labels, 
        [barParam1,barParam2,..], barMaxWidth);


* _values_: An array of values to create the graphs, these can be integers or strings, the label value will be present above each bar
* _labels_: An array of labels to form the bottom of the graph
* _barParam#_: An object defining how a bar will be styled, if you want alternating color then include many of these in an array,
* _barMaxWidth_: How wide each bar should be.


# Creating a ring chart

    chart.pieGraph(x, y, radius, values, labels, 
        [pieParam1,pieParam2,..]);

* _x_: Pixels from left for the center of the ring
* _y_: Pixels from top for the center of the ring
* _radius_: Radius of the ring

* _values_: An array of values to create the graphs, these can be integers or strings, the label value will be present above each bar
* _labels_: An array of labels to form the bottom of the graph
* _pieParam#_: An object defining how to style a section of a ring, width/color/etc.., if you want alternating color then include many of these in an array, include as many as you have values for unique styles


# License

MIT and GPL license, you are free to use and modify this code and redistribute it for personal and commerical use.