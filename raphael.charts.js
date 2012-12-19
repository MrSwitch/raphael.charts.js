//
// @author Andrew Dodson
// @date 12/12/2012
//

Raphael.fn.pieChart = function (cx, cy, r, values, labels, params) {

    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();

    paper.customAttributes.arc = function(startAngle, endAngle) {
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        return {path:["M", x1, y1 , "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2]};
    };

    var angle = 90,
        total = 0,
        ms = 500,
        delta = 10,
        bcolor = "#6A747C", //Raphael.hsb(start, 1, 1),
        process = function (j) {
            var value = parseInt(typeof(values[j])==="string"?values[j].replace(/[^\d\.]/g,''):values[j],10),
                angleplus = 360 * value / total,
                popangle = angle + (angleplus / 2),
//                color = colors[j],
                label = labels[j],
                param = params[j%params.length],
                p = paper.path()
                        .attr(param)
                        .attr({arc:[0,0.001]})
                        .animate({arc:[angle, angle + angleplus]}, ms,
                    function(){
                        txt.stop().animate({opacity: 1}, ms);
                    });

            var txt = paper.text(cx + (r + delta + 55) * Math.cos(-popangle * rad), cy + (r + delta + 25) * Math.sin(-popangle * rad), label)
                    .attr({fill: bcolor, stroke: "none", opacity: 0, "font-size": 13});

            // Fix for creation in a hidden div
            $('tspan:first-child', txt.node).attr('dy', 0);

            p.mouseover(function () {
                p.stop().animate({transform: "s1.02 1.02 " + cx + " " + cy}, ms, "elastic");
                txt.stop().animate({fill: "black", "font-weight":'bold'}, ms, "elastic");
            }).mouseout(function () {
                p.stop().animate({transform: ""}, ms, "elastic");
                txt.stop().animate({fill: bcolor,"font-weight":'normal'}, ms);
            });
            angle += angleplus;
            chart.push(p);
            chart.push(txt);
        };

    for (var i = 0, ii = values.length; i < ii; i++) {
        total += parseInt(typeof(values[i])==="string"?values[i].replace(/[^\d\.]/g,''):values[i],10);
    }
    for (i = 0; i < ii; i++) {
        process(i);
    }
    return chart;
};


Raphael.el.alignFix = function(p) {
    var b = this.getBBox();
    var h = Math.abs(b.y2) - Math.abs(b.y) + 1;
    var w = Math.abs(b.x2) - Math.abs(b.x) + 1;

    var y = b.y + h;
    var x = b.x;

    if(p.cx){
        x = p.cx;
    }
    if(p.valign==='bottom'){
        y = Math.abs(b.y);
    }
    return this.attr({
        'y': y,
        'x': x
    });
};


function array_max(a){
    var max=0;
    if(typeof(a)!=='object'){
        return a;
    }
    for (i = 0; i < a.length; i++) {
        var v = array_max(a[i]);
        if(typeof(v)==='string'){
            v = v.replace(/[^\d\.]+/g,'');
            v = parseFloat(v);
        }
        if(v>max){
            max = v;
        }
    }
    return max;
}


Raphael.fn.barGraph = function (w, h, values, labels, params, barwidth) {

    var paper = this,
        chart = this.set();

    barwidth = barwidth || 30;

    var ms = 500,
        bcolor = "#6A747C", //Raphael.hsb(start, 1, 1),
        bh = h-50,
        th = 50,
        label = function(j){

            var len = labels.length;

            var label = labels[j].replace(/\s/g,'\n');

            var txt = paper.text(j*(w/len), bh, label)
                    .attr({fill: bcolor,
                        stroke: "none",
                        opacity: 0,
                        "font-size": 13
                    })
                    .animate({opacity: 1}, ms)
                    .alignFix({
                        cx : j*(w/len) + ((w/len)/2)
                    });

            // Fix for creation in a hidden div
//            $('tspan:first-child', txt.node).attr('dy', 0);
        },
        bar = function (j) {

            var len = values.length;

            var value = values[j],
                height = ((typeof(value)==="string"?value.replace(/[^\d\.]/g,''):value) / max) * (bh-th),
                param = params[j%params.length],
                width = Math.min(barwidth,w/len),
                dx = (w/len) - width,
                sx = j*(w/len) + (dx?dx/2:0), // start x
                //rect(j*(w/len), h-height, w/len, height);
                p = paper.rect(sx, bh, width, 0)
                        .attr(param)
                        .animate({height:height, y: bh-height}, ms,
                    function(){
                        txt.stop().animate({opacity: 1}, ms);
                    });

            var txt = paper.text(j*(w/len), bh-height, value )
                .attr({fill: bcolor,
                    stroke: "none",
                    opacity: 0,
                    "font-size": 13
                }).alignFix({
                    cx : j*(w/len) + ((w/len)/2),
                    valign : 'bottom'
                });

            // Fix for creation in a hidden div
            $('tspan:first-child', txt.node).attr('dy', 0);

            p.mouseover(function () {
                txt.stop().animate({fill: "black"}, ms, "elastic");
            }).mouseout(function () {
                txt.stop().animate({fill: bcolor}, ms);
            });
            chart.push(p);
        };

    var max = array_max(values);

    for (i = 0; i < values.length; i++) {
        bar(i);
    }


    // Labels
    for (i = 0; i < labels.length; i++) {
        label(i);
    }

    return chart;
};