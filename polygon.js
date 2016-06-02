app.polygonInit = function() {
    // polygon button click event
    $('#poly_btn').click(function(ev) {
      // modal for getting block name
        $('#blockInfo').modal('toggle');
        $('#blCancel').click(function(ev){
          $('#blDone').off('click');
          $('#blCancel').off('click');
        });
        // done button event
        $('#blDone').click(function(ev) {
          // get the block name
            var blockName = $('#blockName').val();
            // close the modal
            $('#blockInfo').modal('toggle');
            // start drawing
            drawPolygon(blockName);
            // delete the click event on done button so that it dosen't get attached multiple times
            $('#blDone').off('click');
        });
    });
}

var drawPolygon = function(blockName) {
    // points we use to measure line length and contain it's text
    var pointOfLine, newPoint, dimText, textArr = [],
        // tmp variables and some utils variables
        tmpPoly, isInBlock = false,
        blockNameText;
    // free draw
    // var polygon = app.svg.polygon().draw().attr('stroke-width', 1).attr('fill', 'none');
    var polygon = app.svg.polygon();
    // draw a point on mouse down
    app.svg.on('mousedown', function(ev) {
      // place a new point only if the point will exist out of any shapes on the svg
        if (!isInBlock) {
            polygon.draw(ev).attr('stroke-width', 1).attr('fill', 'none');
        }
    });

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
        pointOfLine = e.path[0].points[e.path[0].points.length - 1];
        textArr.push(dimText);
        dimText = app.svg.text('');
    }); //end of drawstart
    // this event fired with every new point
    polygon.on('drawupdate', function(e) {
        // store the new point to use it in line length measurement
        newPoint = e.path[0].points[e.path[0].points.length - 1];
        // check if the current point is inside any shape in the svg
        if (app.isInAny(newPoint, app.blocks)) {
            isInBlock = true;
            // change the cursor PS: not working well
            polygon.style('cursor', 'not-allowed');
        } else {
            isInBlock = false;
            // get cursor to the default
            polygon.style('cursor', 'auto');
        }
        // get the center point on the line to put the text on it
        var cx = pointOfLine.x + ((newPoint.x - pointOfLine.x) / 2);
        var cy = pointOfLine.y + ((newPoint.y - pointOfLine.y) / 2);
        // print the line length as a text on the line
        dimText.text((Math.round(Math.sqrt(Math.pow((newPoint.x - pointOfLine.x), 2) + Math.pow(newPoint.y - pointOfLine.y, 2))) / 5).toString()).move(cx, cy);
    }); // end of drawupdate
    // fired when the user stop drawing
    polygon.on('drawstop', function(e) {
        // store the points to get the last connected line length that closes the shape
        pointOfLine = e.path[0].points[e.path[0].points.length - 1];
        newPoint = e.path[0].points[0];
        // get the center of the currently drawn line
        var cx = pointOfLine.x + ((newPoint.x - pointOfLine.x) / 2);
        var cy = pointOfLine.y + ((newPoint.y - pointOfLine.y) / 2);
        // draw the text on the line
        dimText = app.svg.text((Math.round(Math.sqrt(Math.pow((newPoint.x - pointOfLine.x), 2) + Math.pow(newPoint.y - pointOfLine.y, 2))) / 5).toString()).move(cx, cy);
        // add the text object in the text array
        textArr.push(dimText);
        // delete the keydown event
        $(document).off('keydown');
        // enable the shape to be draggable
        polygon.attr('fill', '#83adb5').draggable();
        polygon.on('dragstart', function(e) {
            // clone a temp poly to fill the place until drag is ended
            tmpPoly = polygon.clone().attr('stroke-width', 1).attr('fill', 'none')
        });
        // listen to the drag end event
        polygon.on('dragend', function(ev) {
            // remove the tmp poly
            tmpPoly.remove();
            // move the texts to the new positions
            moveText(e, textArr, calcLineLengths(e.path[0].points));
            // redraw the block name inside the block
            blockNameText.move(polygon.bbox().cx-20, polygon.bbox().cy-20);
        });
        // double click to select an element
        polygon.on('dblclick', function(ev) {
            console.log("dblclick");
            // enable resizeing
            polygon.selectize({
                deepSelect: true
            }).resize();
            polygon.on('resizedone', function(ev) {
                // move text to their new position after resize is ended
                moveText(e, textArr, calcLineLengths(e.path[0].points));
                // redraw the block name inside the block
                blockNameText.move(polygon.bbox().cx-20, polygon.bbox().cy-20);
            });
            // add keydown event to the document to unselect the shape
            $(document).on('keydown', function(e) {
                // listen to the 'enter' or 'esc' keys for deselect
                if (e.keyCode == 27 || e.keyCode == 13) {
                    // deselect
                    polygon.selectize(false, {
                        deepSelect: true
                    });
                    $(document).off('keydown');
                }
                // listen for 'delete' key for removing the element
                if (e.keyCode == 46) {
                    // deselect
                    polygon.selectize(false, {
                        deepSelect: true
                    });
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
    }); // end of drawstop
    polygon.on('drawdone', function(e) {
      // add the drawn shape into the block array
        app.blocks.push({
            shape: polygon,
            name: blockName
        });
        // delete the mouse down event
        app.svg.off('mousedown');
        // draw the block name inside the block
        blockNameText = app.svg.text(blockName).move(polygon.bbox().cx-20, polygon.bbox().cy-20).style('fill', '#767676');
    }); // end of drawdone
}
// calculate the center point of every line in the shape passed
var calcCntrPts = function(path) {
        var centerPoints = [],
            point, newPoint
        for (var i = 0; i < path.length; i++) {
            point = {
                x: path[i].x,
                y: path[i].y
            };
            // if the point is the last point compare it with the first point
            if (i == path.length - 1) {
                newPoint = {
                    x: path[0].x,
                    y: path[0].y
                };
            } else {
                newPoint = {
                    x: path[i + 1].x,
                    y: path[i + 1].y
                };
            }
            var cx = point.x + ((newPoint.x - point.x) / 2);
            var cy = point.y + ((newPoint.y - point.y) / 2);
            centerPoints.push([cx, cy]);
        }
        return centerPoints;
    }
    // calculate lines lengths of the shape passed
var calcLineLengths = function(path) {
        var lnLengths = [],
            point, newPoint
        for (var i = 0; i < path.length; i++) {
            point = {
                x: path[i].x,
                y: path[i].y
            };
            // if the point is the last point compare it with the first point
            if (i == path.length - 1) {
                newPoint = {
                    x: path[0].x,
                    y: path[0].y
                };
            } else {
                newPoint = {
                    x: path[i + 1].x,
                    y: path[i + 1].y
                };
            }
            lnLengths.push((Math.round(Math.sqrt(Math.pow((newPoint.x - point.x), 2) + Math.pow(newPoint.y - point.y, 2))) / 5).toString());
        }
        return lnLengths;
    }
    // moves the text passed to it's propper position
var moveText = function(e, textArr, lnLengths) {
        // calculate the center of each line in the poly
        var centerPoints = calcCntrPts(e.path[0].points);
        // move the line lengths to their new position
        for (var i = 0; i < centerPoints.length; i++) {
            textArr[i].text(lnLengths[i]).move(centerPoints[i][0], centerPoints[i][1]);
        }
    }
    // determine if a point is inside a polygon or not
app.isInside = function(point, polygon) {
        var x = point.x,
            y = point.y,
            inside = false;
        for (var i = 0, j = polygon.length - 2; i < polygon.length - 1; j = i++) {
            var xi = polygon[i][1],
                yi = polygon[i][2];
            var xj = polygon[j][1],
                yj = polygon[j][2];

            var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }
// check if the given point is inside any shape of the given shapes
app.isInAny = function(point, blocks) {
    var isInAny = false,
        shape;
    for (var i = 0; i < blocks.length; i++) {
        shape = blocks[i].shape.array().value;
        if (app.isInside(point, shape)) {
            return blocks[i];
        }
    }
    return isInAny;
}
