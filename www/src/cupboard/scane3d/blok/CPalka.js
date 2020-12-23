




import { Blok } from './Blok.js';

export class CPalka extends Blok {
    constructor(mO, o, idArr, fun) {
        super( mO, o, idArr, fun)
        var self=this;
        this.type = "CPalka";

        this._width = 100;
        this._height = 100;
        this._depth = 100;


        this.boxGeometry = new THREE.BoxBufferGeometry(1,1,1);
        this.mesh = new THREE.Mesh(this.boxGeometry);
        this.content3d.add(this.mesh);
        



        this.funDrag=function () {   
            trace(this.idArr+"   "+this.type)        
            this.mesh.scale.set(30,30,30);
            this.mesh.position.z=-this._depth/2;
        }

        
        this.dragObjNWD()

        //this.dragWHD()



        this.getObj = function(){
            var obj={}
            obj.type=this.type;
            obj.id=this.id;
            obj.x=self.content3d.position.x;
            obj.y=self.content3d.position.y;
            obj.z=self.content3d.position.z;

            obj.width=this._width;
            obj.height=this._height;
            obj.depth=this._depth;    




            obj.children=[];
            for (var i = 0; i < this.children.length; i++) {
                obj.children[i]=this.children[i].getObj();
            }
            return obj;            
        }


        var ob,ooo
        this.setObj = function(obj){                      
            this.setXYPosit(obj.x,obj.y,obj.z); 
            if(obj.children);          
            for (var i = 0; i < obj.children.length; i++) {
                ooo= mO.getIdObj(obj.children[i].id)                  
                ob=mO.getBlok(ooo.obj)
                ob.setObj(obj.children[i])
                this.add(ob);                 
            }
            this._width= obj.width;
            this._height= obj.height;
            this._depth= obj.depth;    

            this.dragObjNWD()


            return obj;            
        }

        
    }

    set width(value) {
        if (this._width != value) {
            this._width = value;
            this.dragObjNWD();
        }
    }
    get width() {return this._width}

    set height(value) {
        if (this._height != value) {
            this._height = value;
            this.dragObjNWD();
        }
    }
    get height() {return this._height}

    set depth(value) {
        if (this._depth != value) {
            this._depth = value;
            this.dragObjNWD();
        }
    }
    get depth() {return this._depth}
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