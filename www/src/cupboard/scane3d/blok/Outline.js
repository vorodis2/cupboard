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
        this.cubsW = [];
        this.cubsH = [];

        /*
        this.cubs.forEach((cub) => (cub.material = this.material));
        this.setCubs(this.cubs[0], this.cubs[1], this.cubs[2]);


*/

        this.setWH = function (w, h) {
            //if(this._width!=w||this._height!=h) {
            this._width = w;
            this._height = h;
            this.redrawCubes();
            //}
        };
    }

    redrawCubes() {
        if (this.cubs.length == 0) return;

        this.cubs[0].position.x = this.cubsW[0] / 2;
        this.cubs[1].position.x = this._height / 2;
        this.cubs[2].position.x = this._height - this.cubsW[2] / 2;
        let ww = this._height - this.cubsW[0] - this.cubsW[2];
        let hh = this._width / this.cubsH[0];

        this.cubs[1].scale.set(ww / this.cubsW[1], 1, hh);

        this.cubs[0].scale.set(1, 1, hh);
        this.cubs[2].scale.set(1, 1, hh);

        /*if (this._bLeft && this._bRight) {
            this.cubs[1].scale.x =
                this._width - this.getCubParam(this.cubs[0], 'x') * 2;
        }

        this.cubs[1].position.x = 100;
        this.cubs[2].position.x = -100;

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

        this.setCubsPosition(...this.cubs);
        this.par.par.myRender();*/
    }

    setGeometrys(g, g1, g2) {
        if (g.boundingBox == null) {
            g.computeBoundingBox();
            g1.computeBoundingBox();
            g2.computeBoundingBox();
        }

        this.cubsW[0] = g.boundingBox.max.x - g.boundingBox.min.x;
        this.cubsW[1] = g1.boundingBox.max.x - g1.boundingBox.min.x;
        this.cubsW[2] = g2.boundingBox.max.x - g2.boundingBox.min.x;

        this.cubsH[0] = g.boundingBox.max.z - g.boundingBox.min.z;
        this.cubsH[1] = g1.boundingBox.max.z - g1.boundingBox.min.z;
        this.cubsH[2] = g2.boundingBox.max.z - g2.boundingBox.min.z;

        if (this.cubs.length == 0) {
            this.cubs.push(
                new THREE.Mesh(g, this._material),
                new THREE.Mesh(g1, this._material),
                new THREE.Mesh(g2, this._material),
            );
            this.content3d.add(...this.cubs);
        } else {
            this.cubs[0].geometry = g;
            this.cubs[1].geometry = g1;
            this.cubs[2].geometry = g2;
        }
        // this.xzSamPredumai();
    }

    // xzSamPredumai() {
    //     this._width =
    //         this.getCubParam(this.cubs[0], 'x') +
    //         this.getCubParam(this.cubs[1], 'x') +
    //         this.getCubParam(this.cubs[2], 'x');

    //     this._height = this.getCubParam(this.cubs[1], 'z');
    //     this._depth = this.getCubParam(this.cubs[1], 'y');

    //     trace('start', this._width, this._height, this._depth);
    //     this.setCubsPosition(...this.cubs);
    // }

    // setCubs(c, c1, c2) {
    //     for (var i = 0; i < this.cubs.length; i++) {
    //         if (this.cubs[i].parent != undefined)
    //             this.cubs[i].parent.remove(this.cubs[i]);
    //     }

    //     this.cubs.length = 0;
    //     this.cubs.push(c, c1, c2);
    //     if (this._material != undefined) {
    //         for (var i = 0; i < this.cubs.length; i++) {
    //             this.cubs[i].material = this._material;
    //         }
    //     }

    //     this.content3d.add(c, c1, c2);
    //     this._width =
    //         this.getCubParam(c, 'x') +
    //         this.getCubParam(c1, 'x') +
    //         this.getCubParam(c2, 'x');

    //     this._height = this.getCubParam(c, 'z');
    //     this._depth = this.getCubParam(c, 'y');
    //     this.setCubsPosition(c, c1, c2);
    // }

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
