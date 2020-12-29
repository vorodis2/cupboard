import { Outline } from '../Outline.js';

export class CPGron {
    constructor(par, bool, fun) {
        this.type = 'CPGron';
        var self = this;
        this.par = par;
        this.fun = fun;

        this._width = 100;
        this._height = 100;

        this.content3d = new THREE.Object3D();
        this.par.content3d.add(this.content3d);

        this.geometry = new THREE.BoxBufferGeometry(1, 1, 1);
        this.geometry.computeBoundingBox();

        this.cubs = [
            new THREE.Mesh(this.geometry),
            new THREE.Mesh(this.geometry),
            new THREE.Mesh(this.geometry),
        ];

        this.cubs.forEach((cub) => cub.scale.set(this._width, 1, this._height));

        if (bool) {
            new Outline(this, this.cubs, 'm_5');
        }
    }

    set width(value) {
        if (this._width != value) {
            this._width = value;
        }
    }

    get width() {
        return this._value;
    }
}
