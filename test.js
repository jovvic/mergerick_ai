var canvasS = new fabric.Canvas('canvasS', { renderOnAddition: false, hoverCursor: 'pointer',
    selection: false });
var bars = {}; //storage for bars (bar number indexed by group object)
var selectedBar = null; //selected bar (group object)
var placeholder = new fabric.Text("XXXXX", { fontSize: 12 });

//pass null or a bar
function selectBar(bar) {
    if (selectedBar) {
        //remove the old topmost bar and put it back in the right zindex
        //PROBLEM: It doesn't go back; it stays at the same zindex
        //selectedBar.remove();
        canvasS.moveTo(selectedBar, selectedBar.XZIndex);
        selectedBar = null;
        }
    if (bar) {
        //put a placeholder object ("XXX" for now) in the position
        //where the bar was, and put the bar in the top position
        //so it shows topmost
        selectedBar = bar;
        canvasS.bringToFront(selectedBar);
        //canvasS.moveTo(selectedBar, canvas.size()-1);
        //canvasS.add(bar);
        canvasS.renderAll();
        }
}

canvasS.on({
     'mouse:move': function(e) {
        //hook up dynamic zorder
        if (!e.target) return;
        if (bars[e.target])
            selectBar(e.target);
        else
            selectBar(null);
        },
 });

var objcount = canvasS.getObjects().length;

//create bars
for (var i = 0; i < 20; ++i) {
    var rect = new fabric.Rect({
      left: 0,
      top: 0,
      rx: 3,
      ry: 3,
      stroke: 'red',
      width: 200,
      height: 25,
      fill: '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    });
    /*rect.setGradientFill({
      x1: 0,
      y1: 0,
      x2: 0,
      y2: rect.height,
      colorStops: {
        0: '#080',
        1: '#fff'
      }
    });    */
    var text = new fabric.Text("Bar number " + (i+1), {
        fontSize: 12
    });
    var group = new fabric.Group([ rect, text ], {
      left: i + 101,
      top: i * 4 + 26
    });
    group.hasControls = group.hasBorders = false;

    //our properties (not part of fabric)
    group.XBar = rect;
    group.XZIndex = objcount++;

    canvasS.add(group);
    bars[group] = i;
}

canvasS.renderAll();
