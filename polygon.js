app.polygonInit = function() {
    $('#poly_btn').click(drawPolygon);
}

function drawPolygon(ev) {
    var polygon = app.svg.polygon().draw({
        snapToGrid: 1
    }).attr('stroke-width',1).attr('fill','none');
    var pointOfLine,newPoint,dimText;
    polygon.on('drawstart', function(ev) {
        pointOfLine = ev.path[0].points[0];
        dimText = app.svg.text('');
        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 13) {
                polygon.draw('done');
                polygon.off('drawstart');
            }
        });
    });
    polygon.on('drawpoint', function(e) {
        pointOfLine = e.path[0].points[e.path[0].points.length-1];
        dimText = app.svg.text('');
    });
    polygon.on('drawupdate', function(e) {
        newPoint = e.path[0].points[e.path[0].points.length-1];
        var cx = pointOfLine.x + ((newPoint.x - pointOfLine.x)/2);
        var cy = pointOfLine.y + ((newPoint.y - pointOfLine.y)/2);
        dimText.text((Math.floor(Math.sqrt(Math.pow((newPoint.x - pointOfLine.x), 2) + Math.pow(newPoint.y - pointOfLine.y, 2)))/5).toString()).move(cx,cy);
    });
    polygon.on('drawstop', function(e) {
      console.log(e);
      pointOfLine = e.path[0].points[e.path[0].points.length-1];
      newPoint = e.path[0].points[0];
      var cx = pointOfLine.x + ((newPoint.x - pointOfLine.x)/2)
      var cy = pointOfLine.y + ((newPoint.y - pointOfLine.y)/2)
      app.svg.text((Math.floor(Math.sqrt(Math.pow((newPoint.x - pointOfLine.x), 2) + Math.pow(newPoint.y - pointOfLine.y, 2)))/5).toString()).move(cx,cy);
        $(document).off('keydown');
        console.log(polygon.toPath());
    });
}
