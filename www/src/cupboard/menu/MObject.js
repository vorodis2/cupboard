


import { MOPalka } from './MOPalka.js';


/*
import { MOSten } from './MOSten.js';
import { MOSp } from './MOSp.js';
import { MOLine } from './MOLine.js';
import { MOP20 } from './MOP20.js';

import { MOWindow } from './MOWindow.js';
import { MOGroup } from './MOGroup.js';
import { MOPolygon } from './MOPolygon.js';
import { MOVP } from './MOVP.js';*/

export class MObject  {
    constructor(par,fun) {          
        this.type="MObject";
        var self=this;
        this.par=par
        this.fun=fun


        this.otstup=2;
        this.otstup1=10;

        this.wh=64;
        this.width=222;
        this.whSize=1000

        this.dCont=new DCont(par.dCont);
        this.dCont.y=this.wh+this.otstup*4;        

        this.perehvat

        this.array=[];
        //this.dragPic=this.par.dragPic;


        this.array[0]=this.moPoint=new MOPalka(this, function(s,p){});
      /*  this.array[1]=this.moSten=new MOSten(this, function(s,p){});
        this.array[2]=this.moSp=new MOSp(this, function(s,p){});
        this.array[3]=this.moLine=new MOLine(this, function(s,p){});
        this.array[4]=this.moP20=new MOP20(this, function(s,p){});

        this.array[5]=this.moWindow=new MOWindow(this, function(s,p){});
        this.array[6]=this.moGroup=new MOGroup(this, function(s,p){});
        this.array[7]=this.moPolygon=new MOPolygon(this, function(s,p){});
        this.array[8]=this.moVP=new MOVP(this, function(s,p){});*/


        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].clear()
            }
        }
        this.clearActive=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].active=false
            }
        }

        this.setObject=function(obj){
            
            if(this.perehvat!=undefined){
                this.perehvat(obj)
                this.perehvat=undefined
                return
            }


            this.clear();
            if(obj){  
                           
                for (var i = 0; i < this.array.length; i++) {                  
                    if(this.array[i].typeNa==obj.type){                        
                        this.array[i].setObject(obj)
                        this.dCont.visible=true
                    }
                }
            }
        }
        this.keydown=function(e){            
            if(e.keyCode== 46){
                for (var i = this.array.length - 1; i >= 0; i--) {
                    if(this.array[i].active == true)this.array[i].deleteObj();
                }
            }
            /*for (var i = this.array.length - 1; i >= 0; i--) {
                if(this.array[i].keydown)this.array[i].keydown(e);
            }*/ 
            
        }
        this.keyup=function(e){
            /*for (var i = this.array.length - 1; i >= 0; i--) {
                if(this.array[i].keyup)this.array[i].keyup(e);
            }*/ 
        }

        this.sp=undefined
        this.setSP=function(sp){
            this.sp=sp;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].setSP(sp)
            }      
        } 


        this.sizeWindow = function(w,h,s){           
            this.dCont.x=w/s-this.width -   this.otstup;            
        }
  	}

     

}
