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
  if (width<=100 && height<=50) {
    width = width*10;
    height = height*10;
    app.scale_width = 10;
    app.scale_height = 10;
  }
  else if(width<=200 && width>=100 && height<=100 && height>50)
    {
      width = width*5;
      height = height*5;
      app.scale_width = 5;
      app.scale_height = 5;
    }
    else if (width<=200 && height>100 && height<=300) {
      width = width*5;
      height = height*2;
      app.scale_width = 5;
      app.scale_height = 2;
    }
    else if (width>200 && width<=500 && height>100 && height<=300) {
      width = width*2;
      height = height*2;
      app.scale_width = 2;
      app.scale_height = 2;
    }
    else if (width>200 && width<=500 && height<=100) {
      width = width*2;
      height = height*5;
      app.scale_width = 2;
      app.scale_height = 5;
    }
    else {
      app.scale_width = 1;
      app,scale_height = 1;
    }
    // draw the floor
    app.svg = SVG('drawing').size(width, height);
    var rect = app.svg.rect(width, height).attr({
        fill: '#bdbdbd'
    });
    app.rectInit();
    app.circleInit();
    app.ovalInit();
    app.polygonInit();
    app.beaconInit();
});
