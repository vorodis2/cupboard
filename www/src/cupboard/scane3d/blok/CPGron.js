import { Outline } from '../Outline.js';

import { GeometrySten } from './GeometrySten.js';

export class CPGron {
    constructor(par, fun) {
        this.type = 'CPGron';
        var self = this;
        this.par = par;
        this.fun = fun;

        this.idArr = -1;
        this.uuid = calc.generateRendom(2);

        this._boolOut=false//Включает полосочки, строго по длене

        this._width = 100;
        this._height = 100;

        this.content3d = new THREE.Object3D();
        //this.content3d.position.x=10    
        this.par.content3d.add(this.content3d);

        let aa = new THREE.AxesHelper(50);
        this.content3d.add(aa);

        
        this.geometry= new GeometrySten();
        this.mesh=new THREE.Mesh(this.geometry,global.pm.mat.getId("m_7", () => {}))
        this.content3d.add(this.mesh);

        this.mesh.rotation.x=-Math.PI/2
       /* this.mesh.position.x=0//-this._width/2
        this.mesh.position.z=0//this._height

        trace(this._width,this._height)*/

        this.draw=function(){

           


            if( this.geometry._rect.w!==this._width || this.geometry._rect.h!==this._height){
                this.geometry.setRect(0,0,this._width,this._height)
            }

            if(this.outlin==undefined)return
            this.outlin.width=  this._width 
            this.outlin.height=  this._height 

           

        }   




////////////////////////////////////////////
     /*   

        this.cubs.forEach((cub) => cub.scale.set(this._width, 1, this._height));

        if (bool) {
            new Outline(this, this.cubs, 'm_5');
        }*/


        this.outlin=undefined;

        
        this.initOut=function(){
            if(this.outlin!=undefined)return
            this.outlin=new Outline(this);

            var g = new THREE.BoxBufferGeometry(1, 1, 1);
            g.computeBoundingBox();

            this.cubs = [
                new THREE.Mesh(g),
                new THREE.Mesh(g),
                new THREE.Mesh(g),
            ];

            this.outlin.content3d.position.x=30
            //this.outlin.setCubs([...this.cubs])
            this.outlin.setCubs(this.cubs[0],this.cubs[1],this.cubs[2])
            this.outlin.materialName='m_5';


        }          

//////////////////////////////

    

    }



    set boolOut(value) {
        if (this._boolOut != value) {
            this._boolOut = value;
            this.initOut()
            this.outlin.content3d.visible=value;
            this.draw()
        }
    }

    get boolOut() {
        return this._boolOut;
    }


    set width(value) {
        if (this._width != value) {
            this._width = value;
            this.draw()
        }
    }

    get width() {
        return this._width;
    }

    set height(value) {
        if (this._height != value) {
            this._height = value;
            this.draw()
        }
    }

    get height() {
        return this._height;
    }
}
