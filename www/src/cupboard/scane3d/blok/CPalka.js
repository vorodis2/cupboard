import { Blok } from './Blok.js';
import { CPGron } from './CPGron';

export class CPalka extends Blok {
    constructor(mO, o, idArr, fun) {
        super(mO, o, idArr, fun);
        var self = this;
        this.type = 'CPalka';

        this._width = 10;
        this._height = 100;
        this._depth = 100;

        this._bool = false;
        this._bool1 = false;
        this._bool2 = false;
        this._bool3 = false;


        this.cnt3d = new THREE.Object3D();
        this.content3d.add(this.cnt3d);

        // this.mesh = new THREE.Mesh(mO.gBox, mO.mat2);
        // this.mesh.rotation.x = -Math.PI / 2;
        // this.content3d.add(this.mesh);

        let aa = new THREE.AxesHelper(50);
        this.content3d.add(aa);

        this.arrayGron = [];

        this.sob = function (s, p, p1) {
            if (s == 'dragMy') {
                trace('>>>>>>>', s);
            }
        };

        this.arrayGron[0] = new CPGron(this, this.sob);
        this.arrayGron[0].boolOut = this._bool;
        this.arrayGron[0].content3d.rotation.x = Math.PI / 2;
        this.arrayGron[0].mesh.material = global.pm.mat.getId('m_7', () => {});

        this.arrayGron[1] = new CPGron(this, this.sob);
        this.arrayGron[1].boolOut = this._bool1;
        this.arrayGron[1].mesh.material = global.pm.mat.getId('m_7', () => {});

        this.arrayGron[2] = new CPGron(this, this.sob);
        this.arrayGron[2].boolOut = this._bool2;
        this.arrayGron[2].content3d.rotation.x = -Math.PI / 2;
        this.arrayGron[2].mesh.material = global.pm.mat.getId('m_7', () => {});

        this.arrayGron[3] = new CPGron(this, this.sob);
        this.arrayGron[3].boolOut = this._bool3;
        this.arrayGron[3].content3d.rotation.z = Math.PI;
        this.arrayGron[3].mesh.material = global.pm.mat.getId('m_7', () => {});

        this.arrayGron[4] = new CPGron(this, this.sob);
        this.arrayGron[4].content3d.rotation.x = Math.PI;
        this.arrayGron[4].content3d.rotation.z = Math.PI / 2;
        this.arrayGron[4].mesh.material = global.pm.mat.getId('m_5', () => {});

        this.arrayGron[5] = new CPGron(this, this.sob);
        this.arrayGron[5].content3d.rotation.z = Math.PI / 2;
        this.arrayGron[5].content3d.rotation.y = Math.PI;
        this.arrayGron[5].mesh.material = global.pm.mat.getId('m_5', () => {});

        /* for (var i = 0; i < 6; i++) {
            this.arrayGron[i]=new CPGron(this, this.sob);
            this.arrayGron[i].idArr=i
        }
        this.arrayGron[0].boolOut=true
        this.arrayGron[1].boolOut=true
        this.arrayGron[2].boolOut=true
        this.arrayGron[3].boolOut=true*/

        this.funDrag = function () {
            // this.mesh.scale.set(
            //     this._width * 0.9,
            //     this._height * 0.9,
            //     this._depth * 0.9,
            // );
            // this.mesh.position.y = this._depth / 2;

            //////////////////////////////////////////
            this.arrayGron[0].width = this._width;
            this.arrayGron[0].height = this._depth;

            this.arrayGron[0].content3d.position.x = -this._width / 2;
            this.arrayGron[0].content3d.position.y = 0;
            this.arrayGron[0].content3d.position.z = -this._height / 2;

            ///////////////////////////////////////
            this.arrayGron[1].width = this._width;
            this.arrayGron[1].height = this._height;

            this.arrayGron[1].content3d.position.x = -this._width / 2;
            this.arrayGron[1].content3d.position.z = this._height / 2;

            ///////////////////////////////////////////////
            this.arrayGron[2].width = this._width;
            this.arrayGron[2].height = this._depth;

            this.arrayGron[2].content3d.position.x = -this._width / 2;
            this.arrayGron[2].content3d.position.y = this._depth;
            this.arrayGron[2].content3d.position.z = this._height / 2;

            ////////////////////////////////////////////////////
            this.arrayGron[3].width = this._width;
            this.arrayGron[3].height = this._height;

            this.arrayGron[3].content3d.position.x = this._width / 2;
            this.arrayGron[3].content3d.position.y = this._depth;
            this.arrayGron[3].content3d.position.z = this._height / 2;

            //////////////////////////////////////////////
            this.arrayGron[4].width = this._depth;
            this.arrayGron[4].height = this._height;

            this.arrayGron[4].content3d.position.x = this._width / 2;
            this.arrayGron[4].content3d.position.y = this._depth;
            this.arrayGron[4].content3d.position.z = -this._height / 2;

            //////////////////////////////////////////////////////
            this.arrayGron[5].width = this._depth;
            this.arrayGron[5].height = this._height;

            this.arrayGron[5].content3d.position.x = -this._width / 2;
            this.arrayGron[5].content3d.position.z = -this._height / 2;
        };

        this.setpositLocel = function (x, y, z) {
            this.setXYPosit(x, y, z);
        };

        this.dragObjNWD();

        this.dragColor = function () {
            this.arrayGron[5].mesh.material =this.arrayGron[4].mesh.material = global.pm.mat.getId(this._material, () => {});
            
            //this.mesh.material = pm.mat.getId(this._material);

        };

        let sum;
        this.funSetInfo = function () {
            this.objInfo.type = this.type;
            this.objInfo.width = this._width;
            this.objInfo.height = this._height;
            this.objInfo.depth = this._depth;

            sum = 0;
            this.arrayGron.forEach((gron) => {
                if (gron._boolOut) {
                    sum += gron._height;
                }
            });

            this.objInfo.gron = sum;
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

            obj.children = [];
            for (var i = 0; i < this.children.length; i++) {
                obj.children[i] = this.children[i].getObj();
            }
            return obj;
        };

        var ob, ooo;
        this.setObj = function (obj) {
            this.setXYPosit(obj.x, obj.y, obj.z);
            if (obj.children);
            for (var i = 0; i < obj.children.length; i++) {
                ooo = mO.getIdObj(obj.children[i].id);
                ob = mO.getBlok(ooo.obj);
                ob.setObj(obj.children[i]);
                this.add(ob);
            }
            this._width = obj.width;
            this._height = obj.height;
            this._depth = obj.depth;

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

    set bool(value) {
        if (this._bool != value) {
            this._bool = value;
            this.arrayGron[0].boolOut = value;
            this.fun('tickInfo');
        }
    }
    get bool() {
        return this._bool;
    }

    set bool1(value) {
        if (this._bool1 != value) {
            this._bool1 = value;
            this.arrayGron[1].boolOut = value;
            this.fun('tickInfo');
        }
    }
    get bool1() {
        return this._bool1;
    }

    set bool2(value) {
        if (this._bool2 != value) {
            this._bool2 = value;
            this.arrayGron[2].boolOut = value;
            this.fun('tickInfo');
        }
    }
    get bool2() {
        return this._bool2;
    }
    set bool3(value) {
        if (this._bool3 != value) {
            this._bool3 = value;
            this.arrayGron[3].boolOut = value;
            this.fun('tickInfo');
        }
    }
    get bool3() {
        return this._bool3;
    }
}
