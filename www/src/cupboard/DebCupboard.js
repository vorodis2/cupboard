export class DebCupboard {
  constructor(par, fun) {
    var self = this;

    this.par = par;
    this.fun = fun;
    this.dC = par.dCont;

    this.otstup=2

    this.dCont = new DCont(this.dC);
    this._active = false;

    this.pan = new DPanel(this.dCont, 0, 0)
    this.pan.width = 300;
/*
    this.pan.visible = this._active;

    var yy = this.otstup;
    var yOtstup = this.otstup;
    

    this.slider = new DSliderBig(self.pan, this.otstup, yy, function(){
      if(self.activeObject != undefined){
        self.activeObject[this.text]=this.value
      }
    }, 'height', 1, 500);
    yy+=this.otstup+this.slider.height
    this.slider1 = new DSliderBig(self.pan, this.otstup, yy, null, 'height', 1, 500);
    yy+=this.otstup+this.slider.height
    this.slider2 = new DSliderBig(self.pan, this.otstup, yy, null, 'Depth', 1, 500);
    yy+=this.otstup+this.slider.height



    this.slider.width = this.pan.width-this.otstup*2;
    this.slider1.width = this.pan.width-this.otstup*2;
    this.slider2.width = this.pan.width-this.otstup*2;

*/

  var pObject=new DParamObject(this.pan ,2,2,function(){			
    
  },true);



    this.activeObject = undefined;
    this.setActiveObject = function(obj) {
      this.activeObject = obj;
      pObject.addObject(obj)
/*
      this.slider.value = this.activeObject.width;
      this.slider1.value = this.activeObject.height;
      this.slider2.value = this.activeObject.depth;

      this.slider.funChange = function() { self.activeObject.width = this.value; }
      this.slider1.funChange = function() { self.activeObject.height = this.value }
      this.slider2.funChange = function() { self.activeObject.depth = this.value }*/
    }
  }

  set active(value) {
    if(this._active!=value){
        this._active = value;
        this.pan.visible = this._active;
    }       
  }   
  get active() { return this._active } 
}