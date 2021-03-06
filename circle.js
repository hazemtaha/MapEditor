app.circleInit = function() {
  $('#circle_btn').on("click",function(e){
    $('#blockInfo').modal('toggle');
    $('#blCancel').click(function(event) {
      $('#blCancel').off('click');
      $('#blDone').off('click');
    });
    $('#blDone').click(function(event) {
        var blockName = $('#blockName').val();
        $('#blockInfo').modal('toggle');
    var x1,y1,x2,y2,radius,text;
    var circle = app.svg.circle().draw({snapToGrid:8}).attr({
      fill: '#1ABC9C',
      stroke: "black" ,
      'stroke-width': 5
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
    //  console.log(circle.bbox());
      x2 = e.detail.p.x;
      y2 = e.detail.p.y;
      var x = (x2-x1)*(x2-x1);
      var y = (y2-y1)*(y2-y1);
      radius = Math.sqrt(x+y)/5;
      text.text(blockName+"\n"+"R= "+Math.round(circle.bbox().w/(app.scale(app.width,app.height)*2))).move(circle.bbox().cx,circle.bbox().cy);
    });
    circle.on('drawstop', function(e){
      app.index = app.blocks.push({ shape: circle,name: blockName, type: 'circle' });
      circle.draggable();
      circle.on('dragend', function(e) {
        text.move(circle.bbox().cx,circle.bbox().cy);
      });
      circle.on('dblclick',function(ev){
        circle.selectize().resize();
        circle.on('resizedone',function(e){
          text.text(blockName+"\n"+"R= "+Math.round(circle.bbox().w/(app.scale(app.width,app.height)*2))).move(circle.bbox().cx,circle.bbox().cy);
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
        ////////////
        $('#setting_btn').on('click',function(){
          $('#toolbox_btns').addClass('hidden');
          $('#room_type').removeClass('hidden');

            $('#living').on('click',function(){
              if(circle._memory._selectHandler.rectSelection.isSelected)
              {
              circle.selectize(false);
              circle.fill('#FFA07A');
              text.text(blockName+"\n"+"R= "+Math.round(circle.bbox().w/(app.scale(app.width,app.height)*2))).move(circle.bbox().cx,circle.bbox().cy);
              }
            });
            $('#reception').on('click',function(){
              if(circle._memory._selectHandler.rectSelection.isSelected)
              {
              circle.selectize(false);
              circle.fill('#778899');
              text.text(blockName+"\n"+"R= "+Math.round(circle.bbox().w/(app.scale(app.width,app.height)*2))).move(circle.bbox().cx,circle.bbox().cy);              }
            });
            $('#kitchen').on('click',function(){
              if(circle._memory._selectHandler.rectSelection.isSelected)
              {
              circle.selectize(false)
              circle.fill('#C8F0C8');
              text.text(blockName+"\n"+"R= "+Math.round(circle.bbox().w/(app.scale(app.width,app.height)*2))).move(circle.bbox().cx,circle.bbox().cy);              }
            });
            $('#hallway').on('click',function(){
              if(circle._memory._selectHandler.rectSelection.isSelected)
              {
              circle.selectize(false)
              circle.fill('#FF5733');
              text.text(blockName+"\n"+"R= "+Math.round(circle.bbox().w/(app.scale(app.width,app.height)*2))).move(circle.bbox().cx,circle.bbox().cy);              }
            });
            $('#bed_room').on('click',function(){
              if(circle._memory._selectHandler.rectSelection.isSelected)
              {
              circle.selectize(false)
              circle.fill('#FFC0CB');
              text.text(blockName+"\n"+"R= "+Math.round(circle.bbox().w/(app.scale(app.width,app.height)*2))).move(circle.bbox().cx,circle.bbox().cy);              }
            });
            $('#bathroom').on('click',function(){
              if(circle._memory._selectHandler.rectSelection.isSelected)
              {
              circle.selectize(false)
              circle.fill('#B0C4DE');
              text.text(blockName+"\n"+"R= "+Math.round(circle.bbox().w/(app.scale(app.width,app.height)*2))).move(circle.bbox().cx,circle.bbox().cy);
              }
            });
            $('#balcony').on('click',function(){
              if(circle._memory._selectHandler.rectSelection.isSelected)
              {
              circle.selectize(false)
              circle.fill('#9ACD32');
              text.text(blockName+"\n"+"R= "+Math.round(circle.bbox().w/(app.scale(app.width,app.height)*2))).move(circle.bbox().cx,circle.bbox().cy);
              }
            });
            $('#cloest').on('click',function(){
              if(circle._memory._selectHandler.rectSelection.isSelected)
              {
              circle.selectize(false)
              circle.fill('#7B68EE');
              text.text(blockName+"\n"+"R= "+Math.round(circle.bbox().w/(app.scale(app.width,app.height)*2))).move(circle.bbox().cx,circle.bbox().cy);
              }
            });
            $('#other').on('click',function(){
              if(circle._memory._selectHandler.rectSelection.isSelected)
              {
              circle.selectize(false)
              circle.fill('#BA55D3');
              text.text(blockName+"\n"+"R= "+Math.round(circle.bbox().w/(app.scale(app.width,app.height)*2))).move(circle.bbox().cx,circle.bbox().cy);
              }
            });
            $('#back').on('click',function(){
              $('#toolbox_btns').removeClass('hidden');
              $('#room_type').addClass('hidden');
            });
        });
        /////////////

      });
    });
        $('#blDone').off('click');
    });

  });
}
app.isInsideCircle = function(point,block){
  var inCircle = false;
  var x1 = point.x;
  var x2 = block.shape.bbox().cx;
  var y1 = point.y;
  var y2 = block.shape.bbox().cy;
  var x = Math.abs(x2-x1);
  var y = Math.abs(y2-y1);
  var distance = Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2));
  if(distance<=block.shape.bbox().w/2)
  {
    inCircle = true;
  }
  return inCircle;
}
