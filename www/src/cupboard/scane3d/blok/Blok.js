export class Blok {
    constructor(mO, o, idArr, fun) {
        this.type = 'Blok';
        this.typeConst = 'Blok';
        var self = this;
        this.uuid = Math.random();
        this.children = [];
        this.boolDinColor = false;
        this.object = o;
        this._material = mO.mat2.idObj.id;

        this.idArr = idArr;
        this.fun = fun;
        this.mO = mO;
        this.id = o.id;

        this.link = 'resources/data/' + this.id + '/original.png';

        this.aa = ['copy', 'clear'];
        this.funDrag = undefined;
        this.funInitMod = undefined;
        this.durXY = undefined;
        this.durRect = undefined;

        this.content3d = new THREE.Object3D();
        this.content3d.blok = this;

        this.c3dNa = new THREE.Object3D();
        this.content3d.add(this.c3dNa);

        this.clear = function (b) {};

        this.rect = [];
        this.rect1 = [];
        for (var i = 0; i < o.mod.r.length; i++) this.rect[i] = o.mod.r[i];
        for (i = 0; i < o.mod.r1.length; i++) this.rect1[i] = o.mod.r1[i];

        this.setXYPosit = function (_x, _y, _z) {
            self.content3d.position.x = _x;
            self.content3d.position.y = _y;
            self.content3d.position.z = _z;
        };

        this.dragObjNWD = function () {
            this.fun('tickInfo');
            if (this.funDrag != undefined) this.funDrag();
            this.fun('visi3d');
        };

        this.dragObjHA = function (bH, a) {};

        this.dragColor = function () {};

        this.funInit = undefined;
        this.modelObj;
        this.init = function (_obj) {
            if (self.funInitMod != undefined) self.funInitMod();
        };

        this.dragObjNWD();

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

        this.funSetInfo = undefined;
        this.objInfo = {};
        this.objInfo.type = this.type;
        this.objInfo.id = this.id;
        this.objInfo.object = this.object;
        this.getArrayInfo = function (a) {
            if (this.funSetInfo) this.funSetInfo();
            a.push(this.objInfo);

            for (let i = 0; i < this.children.length; i++) {
                this.children[i].getArrayInfo(a);
            }

            // this.children.forEach((child) => {
            //     var obj = {};
            //     obj.type = child.type;
            //     obj.obj = {
            //         width: child.width,
            //         height: child.height,
            //         depth: child.depth,
            //         gron: (() => {
            //             let sum = 0;
            //             child.arrayGron.forEach((gron, idx) => {
            //                 if (gron.boolOut) {
            //                     sum += gron.height;
            //                 }
            //             });
            //             return sum;
            //         })(),
            //     };

            //     a.push(obj);
            // });
        };

        this.getObj = function () {
            var obj = {};
            obj.type = this.type;
            obj.id = this.id;
            obj.x = self.content3d.position.x;
            obj.y = self.content3d.position.y;
            obj.z = self.content3d.position.z;
            
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
            return obj;
        };

        this.sobKey = function (tip, e, arrNa) {};
    }

    set x(v) {
        if (this._x != v) {
            this._x = v;
        }
    }
    get x() {
        return this._x;
    }

    set material(v) {
        if (this._material != v) {
            this._material = v;

            for (var i = 0; i < this.children.length; i++) {
                this.children[i].material = v;
            }
            this.dragColor();
        }
    }
    get material() {
        return this._material;
    }

    set parent(v) {
        if (this._parent != v) {
            // if(this.dragParentDo) this.dragParentDo(this._parent, v)
            this._parent = v;
            if (this._parent == undefined) {
                this.mO.visi3D.event3DArr.removeChild(this.content3d);
            } else {
                this.mO.visi3D.event3DArr.addChild(this.content3d);
            }
            /* if(this.dragParent) this.dragParent()  

            if(this.parent!=undefined){                 
                if(this.drahShadow)this.drahShadow()               
            } */
        }
    }
    get parent() {
        return this._parent;
    }
}
