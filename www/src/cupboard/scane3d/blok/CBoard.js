import { Blok } from './Blok.js';

export class CBoard extends Blok {
    constructor(mO, o, idArr, fun) {
        super(mO, o, idArr, fun);
        var self = this;
        this.type = 'CBoard';
        this._width = 100;
        this._height = 100;
        this._depth = 100;
        this._cDepth = 10;
        this._boolInt = 100;
        let aa = new THREE.AxesHelper(100);
        aa.position.x = 20;
        this.content3d.add(aa);

        this.arrPalka = [];

        this.funDrag = function () {
            if (this.arrPalka)
                if (this.arrPalka[0]) {
                    this.arrPalka[0].width = this._cDepth;

                    this.arrPalka[0].setXYPosit(
                        this._width / 2,
                        -this._depth / 2 + this._cDepth / 2,
                        -this._height / 2,
                    );

                    this.arrPalka[0].height = this._height;
                    this.arrPalka[0].depth = this._width;

                    this.arrPalka[1].setXYPosit(
                        -this._width / 2 + this.arrPalka[1]._width / 2,
                        -this._depth / 2 + this._cDepth,
                        -this._height / 2,
                    );

                    this.arrPalka[1].height = this._height;
                    this.arrPalka[1].depth = this._depth - this._cDepth;

                    this.arrPalka[2].setXYPosit(
                        this._width / 2 - this.arrPalka[2]._width / 2,
                        -this._depth / 2 + this._cDepth,
                        -this._height / 2,
                    );

                    this.arrPalka[2].height = this._height;
                    this.arrPalka[2].depth = this._depth - this._cDepth;

                    this.arrPalka[3].setXYPosit(
                        0,
                        -this._depth / 2 + this.cDepth,
                        -this.arrPalka[3]._width / 2 - this._boolInt,
                    );

                    this.arrPalka[3].height =
                        this._width - this.arrPalka[4]._width * 2;
                    this.arrPalka[3].depth = this._depth - this.cDepth;

                    this.arrPalka[4].setXYPosit(
                        0,
                        -this._depth / 2 + this.cDepth,
                        -this._height + this.arrPalka[4]._width / 2,
                    );

                    this.arrPalka[4].height =
                        this._width - this.arrPalka[4]._width * 2;
                    this.arrPalka[4].depth = this._depth - this.cDepth;

                    this.arrPalka[5].setXYPosit(
                        0,
                        -this._depth / 2 + this.cDepth,
                        -this._boolInt / 2,
                    );

                    this.arrPalka[5].width = this._boolInt;
                    this.arrPalka[5].height =
                        this._width - this.arrPalka[4]._width * 2;
                    this.arrPalka[5].depth = this._depth - this.cDepth;
                }
        };

        this.dragObjNWD();

        /*
    0-зад
    1-лево
    2-право
    3-низ
    4-вверх
    5-самый низ
    */

        var xz, oo, ooo;
        this.funInitMod = function () {
            for (let i = 0; i < 6; i++) {
                oo = this.mO.getIdObj(3);
                ooo = this.mO.getBlok(oo.obj);
                ooo.xzPar = this;
                ooo.content3d.xzPar = this;

                ooo.init();
                this.add(ooo);
                ooo.width = 5;

                ooo.content3d.blok = null;
                ooo.content3d.parent.blok = null;

                this.arrPalka.push(ooo);
            }

            this.arrPalka[0].content3d.rotation.z = Math.PI / 2;

            this.arrPalka[3].content3d.rotation.y = Math.PI / 2;
            this.arrPalka[4].content3d.rotation.y = Math.PI / 2;
            this.arrPalka[5].content3d.rotation.y = Math.PI / 2;

            this.dragObjNWD();
        };

        this.getObj = function () {
            var obj = {};
            obj.type = this.type;
            obj.id = this.id;
            obj.x = self.content3d.position.x;
            obj.y = self.content3d.position.y;
            obj.z = self.content3d.position.z;

            obj.width = this._width;
            obj.height = this._height;
            obj.depth = this._depth;
            obj.boolInt = this._boolInt;

            obj.children = [];
            for (var i = 0; i < this.children.length; i++) {
                if (this.children[i].xzPar != undefined) continue;
                obj.children[i] = this.children[i].getObj();
            }
            return obj;
        };

        var ob, ooo;
        this.setObj = function (obj) {
            this.setXYPosit(obj.x, obj.y, obj.z);
            if (obj.children.length) {
                for (var i = 0; i < obj.children.length; i++) {
                    if (obj.children[i]) {
                        ooo = mO.getIdObj(obj.children[i].id);
                        ob = mO.getBlok(ooo.obj);
                        ob.setObj(obj.children[i]);
                        this.arrPalka.push(ob);
                        this.add(ob);
                    }
                }
            }

            this._width = obj.width;
            this._height = obj.height;
            this._depth = obj.depth;
            this._boolInt = obj.boolInt || 100;

            this.dragObjNWD();
            return obj;
        };
    }

    set width(value) {
        if (this._width != value) {
            this._width = value;
            this.dragObjNWD();
        }
    }
    get width() {
        return this._width;
    }

    set height(value) {
        if (this._height != value) {
            this._height = value;

            this.dragObjNWD();
        }
    }
    get height() {
        return this._height;
    }

    set depth(value) {
        if (this._depth != value) {
            this._depth = value;
            this.dragObjNWD();
        }
    }
    get depth() {
        return this._depth;
    }

    set cDepth(value) {
        if (this._cDepth != value) {
            this._cDepth = value;
            this.dragObjNWD();
        }
    }
    get cDepth() {
        return this._cDepth;
    }

    set boolInt(value) {
        if (this._boolInt != value) {
            this._boolInt = value;
            this.dragObjNWD();
        }
    }
    get boolInt() {
        return this._boolInt;
    }
}

/*
export class Board {
  constructor(par, obj) {
    this.par = par;
    this.type = 'Board';

    this._width = 100;
    this._height = 100;
    this._depth = 100;

    this.content3d = new THREE.Object3D();
    this.par.content3d.add(this.content3d);

    this.mesh;

    this.init();
  }

  init() {
    this.mesh = new THREE.Mesh(this.par.boxGeometry);
    this.content3d.add(this.mesh);
    this.dragWHD()
  }

  dragWHD() {
    this.mesh.scale.set(this._width,this._height,this._depth);
    this.mesh.position.z=-this._depth/2;

    this.par.render();
  }

  set width(value) {
    if (this._width != value) {
      this._width = value;
      this.dragWHD();
    }
  }
  get width() {return this._width}

  set height(value) {
    if (this._height != value) {
      this._height = value;
      this.dragWHD();
    }
  }
  get height() {return this._height}

  set depth(value) {
    if (this._depth != value) {
      this._depth = value;
      this.dragWHD();
    }
  }
  get depth() {return this._depth}
}



export class BackPanel {
  constructor(par, fun) {
    this.par = par;
    this.fun = fun;

    this.type = 'BackPanel';

    this.content3D = new THREE.Object3D();
    this.par.content3D.add(this.content3D);

    this._active = true;
    this._width = 100;
    this._height = 100;

    this.init();
  }

  init() {
    this.planeGeometry = new THREE.PlaneBufferGeometry(1, 1);
    this.mesh = new THREE.Mesh(this.planeGeometry);
    this.mesh.position.z =- this._width / 2;
    this.mesh.rotation.x =- Math.PI / 2;
    this.content3D.add(this.mesh);
    this.dragWHD()
  }

  dragWHD() {
    this.mesh.scale.set( this._width, this._height, 1 )
    this.mesh.position.z =- this._height / 2;
    this.par.render();
  }

  set active(value) {
    if (this._active != value) {
      this._active = value;
      this.mesh.visible = value;
      this.par.render()
    }
  }

  get active() { return this._active }

  set width(value) {
    if (this._width != value) {
      this._width = value;
      this.dragWHD();
    }
  }
  get width() {return this._width}

  set height(value) {
    if (this._height != value) {
      this._height = value;
      this.dragWHD();
    }
  }
  get height() {return this._height}

  get depth() {return this._depth}
}*/
