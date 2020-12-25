export class DevControl {
  constructor(par, fun) {
    this.type = 'DevControl';
    this.fun = fun;
    this.par = par;
    this.dC = par.dCont;

    var self = this;

    this.otstup = 2;

    this.dCont = new DCont(this.dC)
    this._active = false;

    this.pan = new DPanel(this.dCont, 0, 0)
    this.pan.width = 300;
  }

  init() {
    var yy = this.otstup;
    this.button=new DButton(this.pan,this.otstup,this.otstup,"Add", () => this.world.array[0].createRandomStick());
    yy += this.otstup + this.button._height;
    this.button1=new DButton(this.pan,this.otstup, yy,"Remove", () => this.world.array[0].removeRandomStick());
  }

  finishInit(world) {
    this.world = world;
    if (this.world) {
      this.init()
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