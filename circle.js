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
      app.index = app.blocks.push({ shape: circle, name: blockName });
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


    });

        $('#blDone').off('click');
    });

  });
}
