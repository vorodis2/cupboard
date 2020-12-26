export class MTop  {
  constructor(par,fun) {  		
      this.type="MTop";
      var self=this;
      this.par=par
      this.fun=fun
      
      this.param=this.par.param;

      this._index=-1;

      this.dCont=new DCont(par.dCont);

      this.panel = new DPanel(this.dCont, 0, 0)
      this.btn = new DButton(this.panel, 0,0,"save", () => {      
        this.par.par.viewServer.saveGetObjId(this.par.par.world.getObj())
      })


      this.dragParam=function(){
        this.panel.x=this.param.otstup
        this.panel.y=this.param.otstup
        this.panel.height = this.param.wh*0.8 + this.param.otstup*2;
        
        this.btn.x = this.param.otstup;
        this.btn.y = this.param.otstup;
        this.btn.height = this.param.wh*0.8

        this.sizeWindow()
      }

      var w,h,s
      this.sizeWindow=function(_w,_h,_s){
        if(_w){
          w=_w
          h=_h
          s=_s
        }
        this.panel.width = w - this.param.otstup*2;
      }
  }
} 
