var app = {
  blocks: [],
  beacons: []
};
app.index;
$('#confirm').click(function(e) {
    $('#data').hide();
    $('#drawing').removeClass('hidden');
    $('#toolbox').removeClass('hidden');
    // floor width and height
    var width = $('#width').val();
    var height = $('#height').val();
    // draw the floor
    app.svg = SVG('drawing').size(1000, 650);
    var rect = app.svg.rect(1000, 650).attr({
        fill: '#bdbdbd',
        rx: 25,
        ry: 25
    });
    app.scale_width = 1000/width;
    app.scale_height = 650/height
    app.rectInit();
    app.circleInit();
    app.ovalInit();
    app.polygonInit();
});
