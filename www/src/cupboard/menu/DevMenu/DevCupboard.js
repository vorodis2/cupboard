export class DevCupboard {
  constructor(par, fun) {
    var self = this;

    this.par = par;
    this.fun = fun;
    this.dC = par.dCont;

    this.param=this.par.param;	

    this.otstup=2

    this.dCont = new DCont(this.dC);
    this._active = false;

    this.pan = new DPanel(this.dCont, 0, 0)
    this.pan.width = 300;

    var pObject1=new DParamObject(this.pan ,2,250,function(s){			
      self.par.par.par.dragParam()
      self.par.par.par.par.localStorage.object=self.param
      self.par.par.par.par.localStorage.save()


      if(s)if(s.param)if(s.param=="debug"){          
          setTimeout(function() {
              location.reload()
          }, 10);
          return;
      }   

    });
    pObject1.tipRide=true
    pObject1.addObject(this.param)


  var pObject=new DParamObject(this.pan ,2,2,function(){			
    
  },true);
  // new DButton(this.pan, 200, 2, "Save", () => {this.par.par.localStorage.save()})



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