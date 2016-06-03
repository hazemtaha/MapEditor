app.rectInit = function() {
  $('#rect_btn').on("click",function(e){
    $('#blockInfo').modal('toggle');
    $('#blCancel').click(function(event) {
      $('#blCancel').off('click');
      $('#blDone').off('click');
    });
    $('#blDone').click(function(event) {
        var blockName = $('#blockName').val();
        $('#blockInfo').modal('toggle');
        var rect = app.svg.rect().draw().attr({
          fill: '#d1fffe',
          stroke: "green" ,
          'stroke-width': 4
        });
        var x1;
        var y1;
        var x2;
        var y2;
        var width;
        var height,path;
        var text,drag_rect;
        rect.on('drawstart', function(e){
          x1 = e.detail.p.x;
          y1 = e.detail.p.y;
          text = app.svg.text('').font({
             family:   'verdana'
             , size:    15
             , anchor:   'middle'
             , leading:  '1.5em'
           });
        });
        //$('#rect_btn').off('click');
        rect.on('drawupdate', function(e){
          x2 = e.detail.p.x;
          y2 = e.detail.p.y;
         width = Math.abs(x2-x1)/5;
         height = Math.abs(y2-y1)/5;
         text.text(blockName+"\n"+width+"X"+height).move(rect.bbox().cx,rect.bbox().cy);
        });
        rect.on('drawstop', function(e){
          app.index = app.blocks.push({ shape: rect,name: blockName });
          console.log(rect);
          rect.draggable();
          rect.on('dragend', function(e) {
            text.move(rect.bbox().cx,rect.bbox().cy);
          });
          rect.on('dblclick',function(ev){
            rect.selectize().resize();
            //console.log();
            rect.on('resizedone',function(e){
              text.text(blockName+"\n"+rect.bbox().w/5+"X"+rect.bbox().h/5).move(rect.bbox().cx,rect.bbox().cy);
              rect.selectize(false);
            });
            $(document).on('keydown', function(e){
              if(e.keyCode == 46 && rect._memory._selectHandler.rectSelection.isSelected)
              {
                rect.selectize(false);
                rect.remove();
                text.clear();
                $(document).off('keydown');
              }
              if(e.keyCode == 13) {
                rect.selectize(false);
                $(document).off('keydown');
              }
            });

          });
        });
        $('#blDone').off('click');
      });


    });



}
