
import { MLeft } from './MLeft.js';
import { MDev } from './MDev.js'
import { MInfo} from './MInfo.js';
import { MTop } from './MTop.js'

// import { MDragScane } from './MDragScane.js';

/*import { MObject } from './MObject.js';
import { MGridDrag } from './MGridDrag.js';

import { MCont2dHelp } from './MCont2dHelp.js';

import { MStart} from './MStart.js';

import { MenuV3D } from './MenuV3D.js';




import { LocalStorage } from './LocalStorageE6.js';*/

export class Menu  {
    constructor(par,fun) {    	
		this.type="Menu";		
		var self=this;
		this.par=par;
		this.fun=fun;
		this._mashtab=1;
		this.localStorage=par.localStorage;
		this._wh=this.localStorage.object.menu.wh||48;

		this.objectBase=par.par.objectBase
		this._otstup=this.localStorage.object.menu.otstup||5;
		this._otstup1=this.localStorage.object.menu.otstup1||10;
		this.sizeMax=this.par.sizeMax;
		dcmParam.activButton="#f28044";
		this._menuIndex=-1;
		this.dCont=new DCont(this.par.dCont);
		
		// this.mDragScane = new MDragScane(this)

		//new LocalStorage(function(){},"planer2020")	   
	
		this.array=[];

	/*	this.array[this.array.length] = this.mGridDrag = new MGridDrag(this, function(s,p,p1){ 

      self.fun(s,p,p1)
        });



	    this.array[this.array.length]=this.mStart=new MStart(this, function(s,p,p1){             
           	if(s=="index")self.menuIndex=p;

           	self.fun(s,p,p1)
        });*/


	    this.array[this.array.length]=this.mLeft=new MLeft(this, function(s,p,p1){             
				if(s=="index")self.menuIndex=p;
				// trace(s, p)
        // if(s=="gIndex")self.mDragScane.sobMenu(s,p,p1);
           	// trace("$$>>",s,p,p1)
			});
			
			this.array[this.array.length]= this.mDev = new MDev(this, function(s, p, p1){});
			this.array[this.array.length] = this.mTop = new MTop(this, function(s, p, p1){})

		/*this.array[this.array.length]=this.mDragScane=new MDragScane(this, function(s,p){             
           	
        });
	   
		this.array[this.array.length]=this.mObject = new MObject(this,function(s,p){
           // self.fun(s,p)
        });

		this.array[this.array.length]=this.mCont2dHelp = new MCont2dHelp(this,function(s,p){
           // self.fun(s,p)
        });

        this.array[this.array.length]=this.menuV3D = new MenuV3D(this,function(s,p){
           // self.fun(s,p)
        });
*/

        this.array[this.array.length]=global.mInfo=this.mInfo = new MInfo(this.par.dCont);


        this.array[this.array.length]=global.dragPic=this.dragPic = new DDragPic(this.par.dCont);
        global.dragPic.whBase=this.wh;


/*
		this.setP20=function(p20){
			this.p20=p20;
			this.mDragScane.setP20(p20)
			this.mGridDrag.setP20(p20)
			this.mStart.setP20(p20)
		}

		this.sp=undefined
		this.setSP=function(sp){
			this.sp=sp
			this.mDragScane.setSP(sp)
			this.mGridDrag.setSP(sp)
			this.mCont2dHelp.setSP(sp)
			this.mObject.setSP(sp)
			this.mStart.setSP(sp)
		}*/


	   /* this.object;
	    this.setObject=function(object){
	    	this.object=object;

	    	let p=0;	    
	    	for (var i = this.array.length - 1; i >= 0; i--) {
	    		if(this.array[i].testObj)if(this.array[i].testObj(object)==true){	    		
	    			p=i;
	    			break;
	    		}	    			
	    	}	    	
	    	this.openMenu(p);
	    }*/

	    this.setMessage=function(p,p1){
	    	if(p=="messageClose"){
	    		mInfo.closeTime(p1);
	    		return
	    	}


	    	var s=!p ? "Сообщение" : p;
	    	var s1=!p1 ? "null" : p1;
	    
	    	mInfo.setFun(s,s1);
	    }/**/

		

	   /* this.setObj=function(o){
	    	this.mStart.setObj(o)    	
	    	
            
        }*/

 




       /* this.upDate=function(){
        	if(honeyTest){
        		honeyTest.upDate()
        	}
        }*/


	    this.sizeWindow=function(w,h,s){
	    	if(s==undefined)s=1	    	
	    	for (var i = this.array.length - 1; i >= 0; i--) {
	    		if(this.array[i].sizeWindow)this.array[i].sizeWindow(w,h,s);
	    	}
	    }

	    this.keydown=function(e){
	    	for (var i = this.array.length - 1; i >= 0; i--) {
	    		if(this.array[i].keydown)this.array[i].keydown(e);
	    	} 
            
        }
        this.keyup=function(e){
            for (var i = this.array.length - 1; i >= 0; i--) {
	    		if(this.array[i].keyup)this.array[i].keyup(e);
	    	} 
        }

	   // this.menuIndex=0;
	}


	setActiveObject(obj) {
		// this.mDev.setActiveObject(this);
		this.mDev.setActiveObject(obj);
	}

	finishInit(world) {
		this.mDev.devControl.finishInit(world)
	}

	set menuIndex(value) {		
        if(this._menuIndex!=value){
            this._menuIndex= value;
            this.mLeft.index=value;
            // this.mDragScane.menuIndex= value;
            // this.mGridDrag.menuIndex= value;

            // this.mObject.clear()
            // if(this.sp)this.sp.setActive();
        }
    }    
    get menuIndex() { return  this._menuIndex;}


  /*  set mashtab(value) {  
        if(this._mashtab!= value) {
            this._mashtab= value;
            for (var i = this.array.length - 1; i >= 0; i--) {
	  			if(this.array[i]._mashtab!=undefined)this.array[i].mashtab=value;
	  		}
      }    
    }    
		get mashtab() { return  this._mashtab;}*/
		
		set otstup(value) {
			if (this._otstup != value) {
				this._otstup = value;
				this.mTop.changeOtstups()
				this.mLeft.changeOtstups()
				this.localStorage.object.menu.otstup = this._otstup;
			}
		}
		get otstup() { return this._otstup }

		set otstup1(value) {
			if (this._otstup1 != value) {
				this._otstup1 = value;
				this.mTop.changeOtstups()
				this.mLeft.changeOtstups()
				this.localStorage.object.menu.otstup1 = this._otstup1;
			}
		}
		get otstup1() { return this._otstup1 }

		set wh(value) {
			if (this._wh != value) {
				this._wh= value;
				this.mTop.changeOtstups()
				this.mLeft.changeOtstups()
				this.localStorage.object.menu.wh = this._wh;
			}
		}
		get wh() { return this._wh }
} 

