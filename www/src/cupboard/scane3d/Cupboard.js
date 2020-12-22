import { Board, BackPanel } from './Board.js';
import { Menedsher } from './Menedsher.js';

export class Cupboard {
  constructor(par, fun) {
    var self = this;

    this.type = 'Cupboard';
    this.fun = fun;
    this.par = par;
    this.dCont = this.par.dCont;

    this.array = [];


    this._active = true;
    this._width = 100;
    this._height = 100;

    this.visi3D = par.visi3D;

    this.content3D = new THREE.Object3D();
    this.par.content3D.add(this.content3D);

    this.menedsher = new Menedsher(this, (s, p, p1) => {}) 

    this.boxGeometry = new THREE.BoxBufferGeometry(1,1,1);

    this.render=function(){
      self.fun("render");
    }

    this.backPanel=undefined
    this.init = function() {
      if(this.backPanel!=undefined)return

      this.backPanel = new BackPanel(this, (s, p, p1) => {});
      this.visi3D.addChildMouse(this.backPanel.mesh)
      self.fun("activeObject", this)
    }

    this.init();
  }

  set active(value) {
    if (this._active != value) {
      this._active = value;
      this.backPanel.active = value;
      this.render()
    }
  }

  get active() { return this._active }

  set width(value) {
    if (this._width != value) {
      this._width = value;
      this.backPanel.width = value;
    }
  }
  get width() {return this._width}

  set height(value) {
    if (this._height != value) {
      this._height = value;
      this.backPanel.height = value;
    }
  }
  get height() {return this._height}
}
