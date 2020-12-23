

// import { SobIndex } from './fManager/SobIndex.js';
// import { SobIndex0 } from './fManager/SobIndex0.js';
// import { SobIndex1 } from './fManager/SobIndex1.js';
// import { SobIndex2 } from './fManager/SobIndex2.js';
// import { SobIndex3 } from './fManager/SobIndex3.js';
// import { SobIndex4 } from './fManager/SobIndex4.js';

// import { SpDebugPixi } from '../spSten/SpDebugPixi.js';

export class MDragScane  {
    constructor(par,fun) {  		
        this.type="MDragScane";
        var self=this;
        this.par=par
        this.fun=fun
        this.p20=undefined;
        this.cont=undefined;
        this.cont1=undefined;
        this.stage=undefined;
        this._menuIndex=-1
        this._mashtab=1;

        this.otstup=this.par.otstup;
        this.otstup1=this.par.otstup1;
        this.wh=this.par.wh;


        /* function disablecontext(e) {
            trace(e)
            var clickedEl = (e==null) ? event.srcElement.tagName : e.target.tagName;
            if (clickedEl == "IMG") {
                alert(errorMsg);
                return false;
            }
        }
        var errorMsg = "Вы не можете сохранять изображения с этого сайта.";
        document.oncontextmenu = disablecontext;*/
        $(document).bind('contextmenu', function(e) {
            return false;
        });

        this.actAI=undefined;
        this.sobIndex=[];
        // this.sobIndex[0]=new SobIndex0(this);
        // this.sobIndex[1]=new SobIndex1(this);
        // this.sobIndex[2]=new SobIndex2(this);
        // this.sobIndex[3]=new SobIndex3(this);
        // this.sobIndex[4]=new SobIndex4(this);






        this.sobSP=function(s,p,e){                       
            if(self.actAI!=undefined){                  
                self.actAI.sobSP(s,p,e)
            }   
        }

        this.sobMenu=function(s,p,p1){            
            if(self.actAI!=undefined){                  
                self.actAI.sobMenu(s,p,p1)
            }  
        }

        /*this.deb=new DebbugPixi(); 
        this.div.appendChild(this.deb.div);
        this.content2d = new PIXI.Container();*/
      
       
        // this.helpDP=new SpDebugPixi(); 




        this.klikGoem=function(e){
            //self.sobSP("downFont",null,e);
        }

        this.setP20=function(p20){
            if(this.p20!=undefined)return
            this.cont=p20.cont2d;
            this.cont1=p20.c2dNiz;
            this.p20=p20;
            this.p20.sobSP=this.sobSP;
            for (var i = 0; i < this.sobIndex.length; i++) {
                this.sobIndex[i].setP20(p20);
            }
        } 
        this.sp=undefined
        this.setSP=function(sp){
            this.sp=sp;
            for (var i = 0; i < this.sobIndex.length; i++) {
                this.sobIndex[i].setSP(sp)
            }      
        } 

        this.redrag  = function(){  
            this.p20.creatRect()
            this.cont.x=this.p20.rectXX1.xs;
            this.cont.y=this.p20.rectXX1.ys;
            this.scale(this.p20.rectXX1.s)            
        }



  		this.sizeWindow = function(w,h,s){ 
            if(this.cont){
                this.cont.x=w/2;
                this.cont.y=h/2;  
            }      		            	
  		} 

        this.keydown=function(e){
            for (var i = this.sobIndex.length - 1; i >= 0; i--) {
                if(this.sobIndex[i].keydown)this.sobIndex[i].keydown(e);
            } 
            
        }
        this.keyup=function(e){
            for (var i = this.sobIndex.length - 1; i >= 0; i--) {
                if(this.sobIndex[i].keyup)this.sobIndex[i].keyup(e);
            } 
        }
  	}

    set menuIndex(value) {      
        if(this._menuIndex!=value){
            this._menuIndex= value;
            for (var i = 0; i < this.sobIndex.length; i++) {
                this.sobIndex[i].active=false
            }
           
            this.actAI=undefined
            if(this.sobIndex[this._menuIndex]!=undefined){
                this.actAI = this.sobIndex[this._menuIndex];
                this.sobIndex[this._menuIndex].active=true
            }
            
        }
    }    
    get menuIndex() { return  this._menuIndex;}

    set mashtab(value) {  
        if(this._mashtab!= value) {
            this._mashtab= value;            
            for (var i = 0; i < this.sobIndex.length; i++) {           
                this.sobIndex[i].mashtab= value;
            }
        }    
              
    }    
    get mashtab() { return  this._mashtab;}
}
