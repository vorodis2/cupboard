export class DevCtrl {
    constructor(par, fun) {
        var self = this;
        this.type = 'DevCtrl';
        this.par = par;
        this.fun = fun;
        this.dC = par.dCont;

        this.param = this.par.param;
        this.dCont = new DCont(this.dC);
        this._active = false;

        this.pan = new DPanel(this.dCont, 0, 0);
        this.pan.width = 300;
    }

    init() {
        this.btn = new DButton(this.pan, 2, 2, 'GetArrInfo', (s, p, p1) => {
            this.world.getArrayInfo();
        });
    }

    transferObj(obj) {
        if (obj) this.world = obj;
        this.init();
    }

    set active(value) {
        if (this._active != value) {
            this._active = value;
            this.pan.visible = this._active;
        }
    }
    get active() {
        return this._active;
    }
}
