var app = {
  blocks: [],
  beacons: []
};
$('#confirm').click(function(e) {
    $('#data').hide();
    $('#drawing').removeClass('hidden');
    $('#toolbox').removeClass('hidden');
    // floor width and height
    var width = $('#width').val() * 5;
    var height = $('#height').val() * 5;
    // draw the floor
    app.svg = SVG('drawing').size(width, height);
    var rect = app.svg.rect(width, height).attr({
        fill: '#bdbdbd',
        rx: 25,
        ry: 25
    });
    app.polygonInit();
});
