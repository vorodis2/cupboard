import { DebCupboard } from '../DebCupboard.js'

export class MDev {
  constructor (par, fun) {

    this.type = "MDev";
    var self = this;

    this.par = par;
    this.fun = fun;
    this.dCont=new DCont(par.dCont);

    this.debCupboard = new DebCupboard(this, function(s, p, p1){})

    this.dCompDev = new DCompDev(this.dCont,0,0,"DevWindow",function(s,p,p1){});
    this.dCompDev.x = -50;
    this.dCompDev.y = window.innerHeight - this.dCompDev.height - 120;
    this.dCompDev.addCont(this.debCupboard, this.debCupboard.dCont, "ActDev", 300, 400);
    this.dCompDev.index = 2;
  }

  setActiveObject(obj) {
    this.debCupboard.setActiveObject(obj);
  }
}