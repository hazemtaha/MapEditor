app.circleInit = function() {
  $('#circle_btn').on("click",function(e){
    $('#blockInfo').modal('toggle');
    $('#blDone').click(function(event) {
        var blockName = $('#blockName').val();
        $('#blockInfo').modal('toggle');
    var x1,y1,x2,y2,radius,text;
    var circle = app.svg.circle().draw().attr({
      fill: '#00FFFF',
      stroke: "blue" ,
      'stroke-width': 4
    });
    //$('#circle_btn').off('click');
    circle.on('drawstart', function(e){
      //console.log(e.detail.p);
      x1 = e.detail.p.x;
      y1 = e.detail.p.y;
      text =  app.svg.text('').font({
         family:   'verdana'
         , size:    15
         , anchor:   'middle'
         , leading:  '1.5em'
       });

    });
    circle.on('drawupdate',function(e){
      //console.log(e.detail.p);
      x2 = e.detail.p.x;
      y2 = e.detail.p.y;
      var x = (x2-x1)*(x2-x1);
      var y = (y2-y1)*(y2-y1);
      radius = Math.sqrt(x+y)/5;
      text.text(blockName+"\n"+"R= "+Math.round(radius)).move(circle.bbox().cx,circle.bbox().cy);
    });
    circle.on('drawstop', function(e){
      //console.log(circle.bbox());
      app.index = app.blocks.push({ shape: circle,name: blockName });
      circle.draggable();
      circle.on('dragend', function(e) {
        text.move(circle.bbox().cx,circle.bbox().cy);
      });
      circle.on('dblclick',function(ev){
        circle.selectize().resize();
        circle.on('resizedone',function(e){
          text.text(blockName+"\n"+"R= "+Math.round(circle.bbox().w/5)).move(circle.bbox().cx,circle.bbox().cy);
          circle.selectize(false);
        });
          $(document).on('keydown', function(e){
          if(e.keyCode == 46 && circle._memory._selectHandler.rectSelection.isSelected)
          {
            circle.selectize(false);
            // console.log(ev);
            ev.target.remove();
            text.clear();
            $(document).off('keydown');
          }
          if(e.keyCode == 13) {
            circle.selectize(false);
            $(document).off('keydown');
          }
        });


      });
      var testPoint = {x:0,y:0};
      console.log(app.insideCircle(testPoint,app.blocks[0]));

    });

        $('#blDone').off('click');

    });

  });
}
app.insideCircle = function(point,block){
  var inCircle = false;
  var x1 = point.x;
  var x2 = block.shape.bbox().cx;
  var y1 = point.y;
  var y2 = block.shape.bbox().cy;
  var x = Math.abs(x2-x1);
  var y = Math.abs(y2-y1);
  var distance = Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2));
  if(distance<=block.shape.bbox().w)
  {
    inCircle = true;
  }
  return inCircle;
}
// console.log(app.insideCircle);
