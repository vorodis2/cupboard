export class Outline {
    constructor(par) {
        var self = this;
        this.type = 'Outline';
        this.par = par;

        this._materialName = 'null';

        // кронка состоит из трех mesh
        this._bLeft = true; //убирает левый mesh
        this._bRight = true; //убирает правый mesh

        this._width = 100;
        this._height = 100;
        this._depth = 100;

        this.content3d = new THREE.Object3D();
        this.par.content3d.add(this.content3d);

        this._material = undefined; //global.pm.mat.getId(this._materialName, () => {});

        this.cubs = [];

        /*
        this.cubs.forEach((cub) => (cub.material = this.material));
        this.setCubs(this.cubs[0], this.cubs[1], this.cubs[2]);


*/
    }

    redrawCubes() {
        if (this.cubs.length == 0) return;

        if (this._bLeft && this._bRight) {
            this.cubs[0].scale.x =
                this._width - this.getCubParam(this.cubs[1], 'x') * 2;
        }

        if (!this._bLeft || !this._bRight) {
            this.cubs[0].scale.x =
                this._width - this.getCubParam(this.cubs[1], 'x');
        }

        if (!this._bLeft && !this._bRight) {
            this.cubs[0].scale.x = this._width;
        }

        this.cubs.forEach((cub) => {
            let mat = global.pm.mat.getId(this._materialName, () => {});
            if (mat) cub.material = mat;

            cub.scale.y = this._depth;
            cub.scale.z = this._height;
        });

        this.setCubsPosition(this.cubs[0], this.cubs[1], this.cubs[2]);
        this.par.par.dragObjNWD();
    }

    setCubs(c, c1, c2) {
        for (var i = 0; i < this.cubs.length; i++) {
            if (this.cubs[i].parent != undefined)
                this.cubs[i].parent.remove(this.cubs[i]);
        }

        this.cubs.length = 0;
        this.cubs.push(c, c1, c2);
        if (this._material != undefined) {
            for (var i = 0; i < this.cubs.length; i++) {
                this.cubs[i].material = this._material;
            }
        }

        this.content3d.add(c, c1, c2);
        this._width =
            this.getCubParam(c, 'x') +
            this.getCubParam(c1, 'x') +
            this.getCubParam(c2, 'x');

        this._height = this.getCubParam(c, 'z');
        this._depth = this.getCubParam(c, 'y');
        this.setCubsPosition(c, c1, c2);
    }

    setCubsPosition(c, c1, c2) {
        if (!this._bLeft) {
            c.position.x = -this.getCubParam(c1, 'x') / 2;
        }

        if (!this._bRight) {
            c.position.x = this.getCubParam(c1, 'x') / 2;
        }

        if (!this._bLeft && !this._bRight) {
            c.position.x = 0;
        }

        if (this._bLeft && this._bRight) {
            c.position.x = 0;
            c1.position.x =
                c.geometry.boundingBox.max.x * c.scale.x -
                c1.geometry.boundingBox.min.x * c1.scale.x;
            c2.position.x =
                c.geometry.boundingBox.min.x * c.scale.x -
                c2.geometry.boundingBox.max.x * c2.scale.x;
        }
    }

    getCubParam(c, param) {
        return (
            c.geometry.boundingBox.max[param] -
            c.geometry.boundingBox.min[param]
        );
    }

    set materialName(value) {
        if (this._materialName != value) {
            this._materialName = value;
            this._material = global.pm.mat.getId(this._materialName, () => {});
            for (var i = 0; i < this.cubs.length; i++) {
                this.cubs[i].material = this._material;
            }

            this.redrawCubes();
        }
    }
    get materialName() {
        return this._materialName;
    }

    set width(value) {
        if (this._width != value) {
            this._width = value;
            this.redrawCubes();
        }
    }
    get width() {
        return this._width;
    }

    set height(value) {
        if (this._height != value) {
            this._height = value;
            this.redrawCubes();
        }
    }
    get height() {
        return this._height;
    }

    set depth(value) {
        if (this._depth != value) {
            this._depth = value;
            this.redrawCubes();
        }
    }
    get depth() {
        return this._depth;
    }

    set bLeft(value) {
        if (this._bLeft != value) {
            this._bLeft = value;
            this.cubs[2].visible = value;
            this.redrawCubes();
        }
    }
    get bLeft() {
        return this._bLeft;
    }

    set bRigth(value) {
        if (this._bRight != value) {
            this._bRight = value;
            this.cubs[1].visible = value;
            this.redrawCubes();
        }
    }
    get bRigth() {
        return this._bRight;
    }
}
