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

        this.cnt3d = new THREE.Object3D();
        this.content3d.add(this.cnt3d);

        this.mesh = new THREE.Mesh(mO.gBox, mO.mat2);
        this.mesh.rotation.x = -Math.PI / 2;
        this.content3d.add(this.mesh);

        this.cpg = new CPGron(this, true);

        let aa = new THREE.AxesHelper(50);
        this.content3d.add(aa);

        this.funDrag = function () {
            this.mesh.scale.set(this._width, this._height, this._depth);
            this.mesh.position.y = this._depth / 2;
        };

        this.setpositLocel = function (x, y, z) {
            this.setXYPosit(x, y, z);
        };

        this.dragObjNWD();

        this.dragColor = function () {
            this.mesh.material = pm.mat.getId(this._material);
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
}
