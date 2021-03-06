import { Menedsher } from './Menedsher.js';
import { PM } from '../../pm/PM.js';

export class World {
    constructor(par, fun) {
        var self = this;

        this.type = 'Cupboard';
        this.fun = fun;
        this.par = par;
        this.dCont = this.par.dCont;

        this.array = [];
        this.arrInfo = [];
        this.children = this.array;

        this._active = true;
        this._width = 100;
        this._height = 100;

        this.visi3D = par.visi3D;

        this.content3d = new THREE.Object3D();
        this.par.content3D.add(this.content3d);

        global.pm = this.pm = new PM(this.visi3D, this.par.par.objectBase);

        this._material = pm.getThreeName('defolt_mat').id;

        this.menedsher = new Menedsher(this, (s, p, p1) => {
            self.fun(s, p, p1);
            if (s == 'visi3d') {
                this.render();
            }
            if (s === 'tickInfo') {
                self.startTickInfo();
            }
        });

        this.render = function () {
            self.fun('render');
        };

        var oo, ooo;
        this.create = function (id, sObj) {
            oo = this.menedsher.menedsherObject.getIdObj(id);
            if (oo) {
                ooo = this.menedsher.menedsherObject.getBlok(oo.obj);
                ooo.init();
                if (sObj) {
                    ooo.setObj(sObj);
                }
                this.add(ooo);
                self.fun('activeObject', ooo);
            }
            return null;
        };

        this.init = function () {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const id = urlParams.get('id');

            if (id == null) {
                oo = this.menedsher.menedsherObject.getIdObj(2);
                let pp = this.menedsher.menedsherObject.getBlok(oo.obj);

                this.add(pp);

                pp.init();
            }
        };

        this.add = function (blok) {
            this.remove(blok);
            this.content3d.add(blok.content3d);
            this.children.push(blok);
            blok.parent = this;
        };

        this.remove = function (blok) {
            var p = -1;
            var r = null;
            for (var i = 0; i < this.children.length; i++) {
                if (this.children[i].idArr == blok.idArr) {
                    p = i;
                }
            }
            if (p != -1) {
                r = this.children.splice(p, 1)[0];
                this.content3d.remove(blok.content3d);
                r.parent = undefined;
            }
            return r;
        };

        this.setObj = function (o) {
            for (var i = 0; i < o.children.length; i++) {
                this.create(o.children[i].id, o.children[i]);
            }
        };

        this.getObj = function () {
            var o = {};
            o.children = [];
            for (var i = 0; i < this.array.length; i++) {
                o.children[i] = this.array[i].getObj();
            }
            return o;
        };

        this.getArrayInfo = function () {
            this.arrInfo.length = 0;
            this.array.forEach((arr) => arr.getArrayInfo(this.arrInfo));

            this.fun('getInfo', this.arrInfo);
        };

        this.sah = 0;
        this.startTickInfo = function (t) {
            if (t == undefined) t = 500;
            this.sah++;
            var s = this.sah;
            setTimeout(() => {
                if (this.sah == s) this.getArrayInfo();
            }, t);
        };

        this.init();
        this.fun('initDone', this);
    }

    set active(value) {
        if (this._active != value) {
            this._active = value;
            this.render();
        }
    }

    get active() {
        return this._active;
    }

    set width(value) {
        if (this._width != value) {
            this._width = value;
        }
    }
    get width() {
        return this._width;
    }

    set height(value) {
        if (this._height != value) {
            this._height = value;
        }
    }
    get height() {
        return this._height;
    }

    set material(v) {
        if (this._material != v) {
            this._material = v;

            for (var i = 0; i < this.children.length; i++) {
                this.children[i].material = v;
            }
            // this.dragColor();
        }
    }
    get material() {
        return this._material;
    }
}
