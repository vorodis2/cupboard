import { DevCupboard } from './DevMenu/DevCupboard.js'
import { DevControl } from './DevMenu/DevControl.js'

export class MDev {
  constructor (par, fun) {
    this.type = "MDev";
    var self = this;

    this.par = par;
    this.fun = fun;
    this.dCont=new DCont(par.dCont);

    this.dCompDev = new DCompDev(this.dCont,0,0,"DevWindow",function(s,p,p1){});
    this.dCompDev.x = -50;
    this.dCompDev.y = 300//window.innerHeight - this.dCompDev.height - 120;


    this.devCupboard = new DevCupboard(this, function(s, p, p1){})
    this.dCompDev.addCont(this.devCupboard, this.devCupboard.dCont, "ActDev", 300, 400);
    this.dCompDev.index = 2;


    this.devControl = new DevControl(this, function(s,p,p1){
      if (s == 'addBoard') { self.fun('addBoard') }
    })
    this.dCompDev.addCont(this.devControl, this.devControl.dCont, "Control", 300, 400);
    this.dCompDev.index = 3;
  }

  setActiveObject(obj) {
    this.devCupboard.setActiveObject(obj);
  }
}