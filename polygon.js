app.polygonInit = function() {
  // polygon button click event
    $('#poly_btn').click(drawPolygon);
}

function drawPolygon(ev) {
  console.log("hello");
  // free draw
    var polygon = app.svg.polygon().draw().attr('stroke-width',1).attr('fill','none');
    // points we use to measure line length and contain it's text
    var pointOfLine,newPoint,dimText,textArr = [],tmpPoly;
    // when user initiate the first point
    polygon.on('drawstart', function(ev) {
      // store the point to use it in measurement later
        pointOfLine = ev.path[0].points[0];
        // initiate an empty text on the svg
        dimText = app.svg.text('');
        // add keydown event to the document to enable user to stop the polygon shape drawing
        document.addEventListener('keydown', function(e) {
          // listen to the 'enter' key
            if (e.keyCode == 13) {
              // stop the drawing
                polygon.draw('done');
              // delete the event
                polygon.off('drawstart');
            }
        });
    });
    // this event fired every new click to initiate an edge point
    polygon.on('drawpoint', function(e) {
      // we store every new point aka every edge of the polygon shape
        pointOfLine = e.path[0].points[e.path[0].points.length-1];
        textArr.push(dimText);
        dimText = app.svg.text('');
    });
    // this event fired with every new point
    polygon.on('drawupdate', function(e) {
      // store the new point to use it in line length measurement
        newPoint = e.path[0].points[e.path[0].points.length-1];
        // get the center point on the line to put the text on it
        var cx = pointOfLine.x + ((newPoint.x - pointOfLine.x)/2);
        var cy = pointOfLine.y + ((newPoint.y - pointOfLine.y)/2);
        // print the line length as a text on the line
        dimText.text((Math.floor(Math.sqrt(Math.pow((newPoint.x - pointOfLine.x), 2) + Math.pow(newPoint.y - pointOfLine.y, 2)))/5).toString()).move(cx,cy);
    });
    // fired when the user stop drawing
    polygon.on('drawstop', function(e) {
      // store the points to get the last connected line length that closes the shape
      pointOfLine = e.path[0].points[e.path[0].points.length-1];
      newPoint = e.path[0].points[0];
      var cx = pointOfLine.x + ((newPoint.x - pointOfLine.x)/2);
      var cy = pointOfLine.y + ((newPoint.y - pointOfLine.y)/2);
      dimText = app.svg.text((Math.floor(Math.sqrt(Math.pow((newPoint.x - pointOfLine.x), 2) + Math.pow(newPoint.y - pointOfLine.y, 2)))/5).toString()).move(cx,cy);
      textArr.push(dimText);
        $(document).off('keydown');
        // enable the shape to be draggable
        polygon.attr('fill','#83adb5').draggable();
        polygon.on('dragstart',function(e) {
          // clone a temp poly to fill the place until drag is ended
          tmpPoly = polygon.clone().attr('stroke-width',1).attr('fill','none')

        });
        // listen to the drag end event
        polygon.on('dragend',function(ev) {
          // remove the tmp poly
          tmpPoly.remove();
          // move the texts to the new positions
          moveText(e,textArr);
        });
        // double click to select an element
        polygon.on('dblclick', function(ev) {
          // enable resizeing
          polygon.selectize().resize();
          polygon.on('resizedone',function(ev) {
            // move text to their new position after resize is ended
              moveText(e,textArr);
          });
          // add keydown event to the document to unselect the shape
          $(document).on('keydown', function(e) {
            // listen to the 'enter' or 'esc' keys for deselect
              if (e.keyCode == 27 || e.keyCode == 13 ) {
                // deselect
                  polygon.selectize(false);
                  $(document).off('keydown');
              }
              // listen for 'delete' key for removing the element
              if (e.keyCode == 46) {
                // deselect
                  polygon.selectize(false);
                  // remove the element
                  polygon.remove();
                  // remove the text
                  for (var i = 0; i < textArr.length; i++) {
                    textArr[i].clear();
                  }
                  $(document).off('keydown');
              }
          });
        });
    });
}
function calcCntrPts(path) {
  var centerPoints = [],point,newPoint
  for (var i = 0; i < path.length; i++) {
    point = {x: path[i].x,y: path[i].y};
    // if the point is the last point compare it with the first point
    if (i == path.length - 1) {
      newPoint = {x: path[0].x,y: path[0].y};
    } else {
      newPoint = {x: path[i+1].x,y: path[i+1].y};
    }
    var cx = point.x + ((newPoint.x - point.x)/2);
    var cy = point.y + ((newPoint.y - point.y)/2);
    centerPoints.push([cx,cy]);
  }
  return centerPoints;
}
function moveText(e,textArr) {
  // calculate the center of each line in the poly
  var centerPoints = calcCntrPts(e.path[0].points);
  // move the line lengths to their new position
  for (var i = 0; i < centerPoints.length; i++) {
    textArr[i].move(centerPoints[i][0],centerPoints[i][1]);
  }
}
