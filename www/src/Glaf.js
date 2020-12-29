

import { World } from './cupboard/scane3d/World.js';
import { Menu} from './cupboard/menu/Menu.js';
    
import { ViewServer } from './viewServer/ViewServer.js';

import { MVisi3D } from './visi3D/MVisi3D.js';
import { SceneSB } from './visi3D/SceneSB.js';

import { Calc } from './Calc.js';

export class Glaf  {
    constructor(par) {  		
        this.type="Glaf";
        var self=this;
        this.par=par;

      
        this.sizeMax=10000;

        this.dCont=new DCont(document.body);

        this._intRend=-60;
        this.render = function () {
            this.intRend=1;
        }

        this.param=this.par.param;

        global.calc=new Calc()

        this.div = document.createElement('div');
        this.div.style.position = 'fixed';
        this.div.style.top = '0px';
        this.div.style.left = '0px';
        
        this.content3D = new THREE.Object3D();
        this.visi3D = new MVisi3D(this.div, null, false, true, false, true, false);     
        this.visi3D.sizeWindow(0, 0, window.innerWidth, window.innerHeight)
        //this.visi3D.yes3d = true;           
        this.visi3D.groupObject.add(this.content3D); 
        this.visi3D.isDragPan=true;

        this.dCont.div.appendChild(this.div)
        
        // var o='{"ambient":{"works":true,"active":true,"color":"#fdffff","intensity":0.71},"shadow":{"works":true,"active":true,"mapSize":4096,"color":"#8c8c8c","bias":-0.0014,"intensity":1.01,"radius":1.27,"bAlphaForCoating":false,"fixation":true,"rotationX":0.93,"rotationZ":0.73,"distance":500,"cubWidth":1000,"cubHeight":1000,"distanceUpdateShadow":65.41},"sky":{"works":true,"active":true,"color":"#ffffff","link":"resources/image/sky.jpg","rotZ":2.73,"radius":40000,"x":0,"y":0,"z":0},"mirror":{"works":true,"link":"null","exposure":1.44,"gamma":2.87,"xz":"reflect","link1":"null","exposure1":-1,"gamma1":-1},"visi3D":{"works":true,"alwaysRender":false,"fov":40,"far":77175,"minZum":0,"maxZum":30942,"zume":25000,"minRotationX":3.14,"maxRotationX":0,"rotationX":0.94,"rotationZ":0.17,"debug":false,"isDragPan":false,"alphaAd":false,"globZ":0,"powerZum":1},"fog":{"works":true,"active":false,"color":"#ffffff","near":0,"far":0},"effect":{"works":true,"active":false,"edgeStrength":3,"edgeGlow":0,"pulsePeriod":0,"linkTextur":"null","visibleEdgeColor":"#ffffff","hiddenEdgeColor":"#190a05"}}'
        
       // var scene=JSON.parse(o); 
        var scene=this.par.objectBase.scene 
        this.sceneSB=new SceneSB(this.visi3D);
        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            if (scene[this.sceneSB.array[i].name] === undefined) {
                scene[this.sceneSB.array[i].name] = {};                
            }            
            this.sceneSB.array[i].setBasa(scene[this.sceneSB.array[i].name]);
        }

        this.menu=new Menu(this,function(s,p,p1){  
            trace(s,p,p1)
            if(s=="material"){
                self.world.material=p;
            }
            /*  if(s=="mashtab"){
                    self.p20.mashtab=p;
                    self.menu.mashtab=p;
                }
                if(s=="render"){}
                if(s=="setObjSP"){
                    self.p20.setObj(p)
                }  
                if(s=="dragStyleObj") self.p20.dragStyleObj(p)
    
                if(s=="openId"){
                    self.viewServer.openId(p)
                } 
                if(s=="message"){
                    self.menu.setMessage(p,p1)
                    return
                }
    
                if(s=="saveGetObjId"){
                    console.warn("saveGetObjId@@@@")
                    self.viewServer.saveGetObjId(self.p20.getObj())               
                    return
                }*/
                
                self.render()
            });

        this.world=new World(this,function(s,p,p1){                  
            if(s=="render"){ 
                self.visi3D.intRend=p ? p: 1          
                return;
            }
            if (s=="activeObject") {
                //self.debCupboard.setActiveObj(p);
                
                self.menu.setActiveObject(p)
                return;
            }
            
            /*if(s=="complit"){           
                return;
            }
            if(s=="indexSP"){ 
                self.menu.setSP(p);
            }
            if(s=="message"){
                self.menu.setMessage(p,p1)
                return
            }
            if(s=="rectSP"){ 
                self.menu.setSop(s,p,p1)
            } 

            //if(s=="addChild")self[p].addChild(p1);*/
            self.render()
        });




        this.viewServer = new ViewServer(function(s,p,p1,p2){ 
            if(s=="setObj"){             
                if(p==null)  {
                    self.menu.setMessage("message","Error"+"Проект id ="+self.viewServer.id+" не создан. json еще не сохранен и нечего открывать");
                }else{
                    //self.p20.setObj(p);
                    self.world.setObj(p); 
                }       
                

                return                              
            }
            if(s=="message"){             
                self.menu.setMessage(p,p1);
                return
            }
            
            /*  if(s=="openStart"){
                self.p20.index=1
                return
            }*/
        });  

        this.dragParam=function(){
            self.menu.dragParam()
        }


        //ап дете сцена деленая на 2 в мейне
        this.update = function () {
            /*  if(this.p20.upDate()==true)this.intRend=1;
    
            if(this._intRend<=1 || this._intRend==100){
                this.visiPixi.render();
                this.visi3D.intRend=1;

            }
            
            this._intRend++;  
            if(this._intRend>=100){ 
                this._intRend=1;
            }  */
            
            this.visi3D.upDate();      
        }

        //расчет окна
        this.sizeWindow = function(w,h,s){              
            this.scale=s;
            this.dCont.scale=s;
            this.menu.sizeWindow(w,h,s);  

            this.visi3D.sizeWindow(0,0,w,h);                  
        }

        this.keydown=function(e){ 
            this.menu.keydown(e)
        }

        this.keyup=function(e){
            this.menu.keyup(e);  
        }


        this.dragParam()
        this.viewServer.openURL();
    }
/*
    set intRend(value) {
        if(this._intRend!=value){
            if(this._intRend>value)this._intRend= value;          
        }
    }    
    get intRend() { return  this._intRend;}*/
}






