import { Board, BackPanel } from './Board.js';
import { CBoard } from './blok/CBoard.js'
import { Menedsher } from './Menedsher.js';

export class Cupboard {
    constructor(par, fun) {
        var self = this;

        this.type = 'Cupboard';
        this.fun = fun;
        this.par = par;
        this.dCont = this.par.dCont;

        this.array = [];
        this.children = this.array;

        this._active = true;
        this._width = 100;
        this._height = 100;

        this.visi3D = par.visi3D;

        this.content3d = new THREE.Object3D();
        this.par.content3D.add(this.content3d);

        this.menedsher = new Menedsher(this, (s, p, p1) => {}) 

        this.boxGeometry = new THREE.BoxBufferGeometry(1,1,1);

        this.render=function(){
            self.fun("render");
        }

        var oo,ooo
        this.creat=function(id,sObj){
            
            oo= this.menedsher.menedsherObject.getIdObj(id)
            if(oo){               
                ooo=this.menedsher.menedsherObject.getBlok(oo.obj)
                ooo.init()
                if(sObj){
                    ooo.setObj(sObj)
                }
                this.add(ooo)
                self.fun("activeObject", ooo)
                
            }
            return null
        }



        this.backPanel=undefined;
        this.cBoard = undefined;

        this.init = function() {
            /*if(this.backPanel!=undefined)return
            if(this.cBoard!=undefined)return
            oo= this.menedsher.menedsherObject.getIdObj(2) ;
            let pp=this.menedsher.menedsherObject.getBlok(oo.obj)
            trace("oo",pp)  
            this.add(pp)
            trace("oo",oo)   

           // this.cBoard = new 

           /* this.backPanel = new BackPanel(this, (s, p, p1) => {});
            this.visi3D.addChildMouse(this.backPanel.mesh)*/
           /*self.fun("activeObject", pp)*/
        }


        this.add = function(blok){
            this.remove(blok);
            this.content3d.add(blok.content3d);
            this.children.push(blok)
            blok.parent=this;
        }
        this.remove = function(blok){
            var p = -1;
            var r = null;
            for (var i = 0; i < this.children.length; i++) {                
                if(this.children[i].idArr==blok.idArr){                    
                    p=i;
                }
            }            
            if(p!=-1){
                r = this.children.splice(p,1)[0];
                this.content3d.remove(blok.content3d);
                r.parent=undefined;                
            }           
            return r;
        }






        this.setObj = function(o) {
            trace("!!!!!",o)
            for (var i = 0; i < o.children.length; i++) {
                this.creat(o.children[i].id,o.children[i])
            }

        }
        this.getObj = function() {
            var o={}
            o.children=[];
            for (var i = 0; i < this.array.length; i++) {
                o.children[i]=this.array[i].getObj();
            }
            return o;
        }

        this.init();
    }

    set active(value) {
        if (this._active != value) {
            this._active = value;
            this.backPanel.active = value;
            this.render()
        }
    }

    get active() { return this._active }

    set width(value) {
        if (this._width != value) {
            this._width = value;
            this.backPanel.width = value;
        }
    }
    get width() {return this._width}

    set height(value) {
        if (this._height != value) {
            this._height = value;
            this.backPanel.height = value;
        }
    }
    get height() {return this._height}
}
