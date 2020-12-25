export class MTop  {
  constructor(par,fun) {  		
    this.type="MTop";
    var self=this;
      this.par=par
      this.fun=fun
      this.otstup=this.par._otstup;
      this.otstup1=this.par._otstup1;
      this.wh=this.par._wh;       

      this._index=-1;

      this.dCont=new DCont(par.dCont);

      this.panel = new DPanel(this.dCont, this.otstup, this.otstup)
      this.panel.height = this.wh + this.otstup * 2;
      this.panel.width = 800;
  }

  changeOtstups() {
    this.otstup=this.par._otstup;
    this.otstup1=this.par._otstup1;
    this.wh=this.par._wh;  

    this.panel.x = this.otstup;
    this.panel.y = this.otstup;

    this.panel.height = this.wh + this.otstup * 2;
  }
} 
