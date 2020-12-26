
export class MLeft  {
  	constructor(par,fun) {  		
  		this.type="MLeft";
  		var self=this;
        this.par=par
        this.fun=fun
        
        this.param = this.par.param;


        this._index=-1;
        this._tipVisi=-1;
        this._tipDrav=-1;
        this.dCont=new DCont(par.dCont);

        this.objectBase=undefined;
        this.objThree=undefined;
        this.panel=undefined;

        this.array=[];

        //new DPanel(this.dCont,0,0)
        /*setTimeout(function() {
            self.dCont.visible=true
            trace(self.dCont)
        }, 10);*/

    //    var aa=[
    //         {src:"resources/image/p1_100.png",array:[]},
    //         {src:"resources/image/p2_100.png",array:[
    //             {src:"resources/image/p2_100.png",array:[],id:0},
    //             {src:"resources/image/p4_100.png",array:[],id:0}
    //         ]},
    //         {src:"resources/image/size.png",array:[]},
    //         {src:"resources/image/w.png",array:[
    //             {src:"resources/image/w0.png",array:[],id:0},
    //             {src:"resources/image/w1.png",array:[],id:1},
    //             {src:"resources/image/w2.png",array:[],id:2},
    //             {src:"resources/image/w0.png",array:[],id:4},
    //             {src:"resources/image/w4.png",array:[],id:5},
    //             {src:"resources/image/w5.png",array:[],id:6},
    //         ]},
    //     ]

    //     this.objZ={}
    //     this.objZ.three=[{
    //         keyName:"MLeft",
    //         array:aa
    //     }]


    this.init=function(o){            
        this.objectBase=o;
        for (var i = 0; i < o.three.length; i++) {                
            if(o.three[i].keyName=="MLeft"){
                this.objThree=o.three[i]
            }
        }            

        for (var i = 0; i < this.objThree.array.length; i++) {
            this.array[i]= new MLButGal(this,this.drag,i,this.objThree.array[i])
        }         
        
        this.array[0].active = true;
    }

    this.drag=function(s,p){
        if(s=="gallery"){}  
        if(s=="gIndex"){
            if(this.idArr==0)global.dragPic.start(64, 'resources/data/'+p.obj.id+'/64.png', p.obj );
            if(this.idArr==1)self.fun("material",p.obj.id)
        }
        self.fun(s,p);    
    }
        
    this.init(this.par.objectBase)

    this.dragParam=function(){
        this.dCont.x=this.param.otstup;
        this.dCont.y=this.param.otstup*4 + this.param.wh*0.8;

        for (var i = this.array.length - 1; i >= 0; i--) {
            if(this.array[i].dragParam)this.array[i].dragParam();
        }
    }
    this.sobMenu=function(s,p,e){}
}

    set index(value) {
        if(this._index!=value){
            this._index= value;
            
            for (var i = 0; i < this.array.length; i++) {
                if(i==this._index){                    
                    this.array[i].active=true;
                }else{
                    this.array[i].active=false;
                }
            }       
        }
    }    
    get index() { return  this._index;} 

    set tipVisi(value) {
        if(this._tipVisi!=value){
            this._tipVisi= value;
            //this.array[0].startIndex=value;       
        }
    }    
    get tipVisi() { return  this._tipVisi;}

    set tipDrav(value) {
        if(this._tipDrav!=value){
            this._tipDrav= value;
            //this.array[1].startIndex=value;  
        }
    }    
    get tipDrav() { return  this._tipDrav;}
}



export class MLButGal  {
    constructor(par,fun,idArr,obj) { 
        this.type="MLButGal";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.idArr=idArr;
        this.obj=obj;

        this._active=false;
        this._startIndex=-1;

        this.param = this.par.param;

        this.gallery=undefined;

        this.dCont=new DCont(par.dCont);
        this.dCGal=new DCont(this.dCont);     
        this.button=new DButton(this.dCont,0,0,"",() => this.fun("index",this.idArr),"resources/data/"+obj.id+"/100.png");

        this.dragParam=function(){  
            this.button.y = this.idArr*(this.param.wh+this.param.otstup)
            this.button.width = this.button.height = this.param.wh
            this.dCGal.x=(this.param.wh)

            if (this.gallery) {
                this.gallery.widthPic=this.param.wh*1.5; 
                this.gallery.heightPic=this.param.wh*1.5; 

                this.gallery.otstup = this.param.otstup;
                this.gallery.y = -this.param.otstup;
                this.gallery.width = this.param.wh*1.5*2 + this.gallery.otstup*2+2;
                this.gallery.height = this.param.wh*1.5* this.gallery.kolII+2 + this.gallery.otstup*2+2;
                this.gallery.panelBool = false;
                this.gallery.boolPositOtctup = false;
                this.gallery.boolPositScrol = false;
                this.gallery.boolWheel = false;
            }
        }

        this.init=function(o){ 
            if(this.gallery!=undefined)return
            if(this.obj.array.length!=0){
                if(this.idArr==2) {
                    this.gallery=new DGalObj(this.dCGal,0,0,function(s,p){},this)
                }    
                if(this.idArr==0||this.idArr==1||this.idArr==3||this.idArr==4) {
                    this.gallery=new DGallery(this.dCGal,0,0,function(){
                        var o={}
                        o.idArr=self.idArr;
                        o.index=this.index;
                        o.obj=this.obj;
                        self.fun("gIndex", o);
                    })              
                }            
                this.gallery.kolII=3;
                this.gallery.widthPic=64;
                this.gallery.heightPic=64;
                this.gallery.width=66*this.gallery.kolII+2;


                for (var i = 0; i < this.obj.array.length; i++) {
                    this.obj.array[i].title=""
                    this.obj.array[i].src="resources/data/"+this.obj.array[i].id+"/128.png"
                }

                this.gallery.start(this.obj.array);

                if(this.obj.array.length==0){
                    this.gallery.visible=false;
                }else{
                    if(this.obj.array.length<=this.gallery.kolII){
                        this.gallery.width=66*this.obj.array.length+2;                  
                    }

                    this.gallery.height=Math.ceil(this.obj.array.length/this.gallery.kolII)*66+2

                    if(this._startIndex!=-1)this.gallery.index=this._startIndex;
                }
            }
        }
    }

    set active(value) {
        if(this._active!=value){
            this._active= value;
            this.dCGal.visible= value;           
            this.init() 
            this.dragParam()

            if(this._active==true)this.button.color=dcmParam.activButton;
            else this.button.color=dcmParam.color;

        }
    }    
    get active() { return  this._active;} 

    set startIndex(value) {
        if(this._startIndex!=value){
            this._startIndex= value;
            if(this.gallery!=undefined)this.gallery.index=value;

        }
    }    
    get startIndex() { return  this._startIndex;} 


}



////////////////////////////////////////////////////////////



export class DGalObj extends DGallery {
    constructor(dCont, _x, _y, _fun, par) {  
        super(dCont, _x, _y, _fun);
        this.par=par
       

        this._index=-1;
        this.par=par
        var self=this

        // Функция клика по иконке
        this.downBtn = function (s,p) {
          /*  if(s=="index")self.index = this.idArr; 
            if(s=="index1")self.index1 = this.idArr; 

            if(s=="indexBig"){
                self.index = this.idArr;
                self.index1 = this.idArr;
            } 
            
            self.obj = self.array[this.idArr].object;*/
            if (self.fun) self.fun(s,p);
        };


        this.createZamen=function(){ 
            var r=new DGOBox(this.content, 0, 0, this.downBtn,  this);                 
            return r;
        }

        var aa=0.3
        this.dragIndex=function(){ 
            for (var i = 0; i < this.array.length; i++) {
                if(this._index1 == i||this._index == i){
                    if (this._index == i) {
                        this.array[i].activ = true;
                        this.array[i].setAct(0,true)                      
                        if (this._index1 != i)this.array[i].setAct(1,false)
                    }
                    if (this._index1 == i) {
                        this.array[i].activ = true;
                        this.array[i].setAct(1,true)  
                        if (this._index != i)this.array[i].setAct(0,false)
                    }

                }else {
                    this.array[i].activ = false;
                    this.array[i].setAct(0,false)
                    this.array[i].setAct(1,false)                   
                }
            } 

        }
    }

    set index(value) {   
        this._index = value;        
    }    
    get index() { return  this._index;} 





    
}
export class DGOBox extends DBox {
    constructor(_cont, _x, _y, _fun,par) {  
        super(_cont, _x, _y, _fun);
        this.par=par
        
        this.dragPic=this.par.par.par.par.dragPic

        var self=this
        var otstup=2
       


        this.down = function (e) {  
            
            if (self.fun) self.fun("indexBig");
        }
        this.drag = function (e) {
            var o=self.object;
            o.typeThree="Blok"
            var l="resources/data/"+self.object.id+"/original.png";            
            self.dragPic.start(32, l, o); 
        }

        this.mouseDownNew = function (e) {
            self.dragPic.testDrag(5, self.down, self.drag);           
        };


        if(dcmParam.mobile==false){
            this.image.image.removeEventListener("mousedown", this.mouseDown)
            this.panel.div.removeEventListener("mousedown", this.mouseDown)
            }else{
            this.image.image.removeEventListener("touchstart", this.mouseDown)
            this.panel.div.removeEventListener("touchstart", this.mouseDown)
        }

        



        if(dcmParam.mobile==false){
            this.image.image.addEventListener("mousedown", this.mouseDownNew)
            this.panel.div.addEventListener("mousedown", this.mouseDownNew)
            }else{
            this.image.image.addEventListener("touchstart", this.mouseDownNew)
            this.panel.div.addEventListener("touchstart", this.mouseDownNew)
        }
    }
}





/*
export class MLButGal  {
    constructor(par,fun,idArr,obj) { 
        this.type="MLButGal";
        var self=this;
        this.par=par
        this.fun=fun
        this.idArr=idArr
        this.obj=obj

        this._active=false;
        this._startIndex=-1;

        this.otstup=this.par.otstup;
        this.otstup1=this.par.otstup1;
        this.wh=this.par.wh;

        this.gallery=undefined

        this.dCont=new DCont(par.dCont);        
        this.button=new DButton(this.dCont,0,idArr*(this.wh+this.otstup),"",function(){
            self.fun("index",self.idArr);
        },obj.src)//,"resources/data/"+obj.id+"/100.png");
        this.button.width=this.button.height=this.wh;        

        this.dCGal=new DCont(this.dCont);  
        this.dCGal.x=(this.wh+this.otstup);

        
        this.init=function(o){ 
            if(this.gallery!=undefined)return

            if(this.obj.array.length!=0){

                if(this.idArr==2) {
                    this.gallery=new DGalObj(this.dCGal,0,0,function(s,p){                        
                        
                    },this)
                }    

                if(this.idArr==0||this.idArr==1||this.idArr==3) {
                    this.gallery=new DGallery(this.dCGal,0,0,function(){
                        var o={}
                        o.idArr=self.idArr;
                        o.index=this.index;
                        o.obj=this.obj;
                        self.fun("gIndex", o);
                    })                    
                }            
                this.gallery.kolII=3;
                this.gallery.widthPic=64;
                this.gallery.heightPic=64;
                this.gallery.width=66*this.gallery.kolII+2;


                for (var i = 0; i < this.obj.array.length; i++) {
                    this.obj.array[i].title=" "
                    this.obj.array[i].src=this.obj.array[i].src
                }

                this.gallery.start(this.obj.array);

                if(this.obj.array.length==0){
                    this.gallery.visible=false;
                }else{
                    if(this.obj.array.length<=this.gallery.kolII){
                        this.gallery.width=66*this.obj.array.length+2;                  
                    }

                    this.gallery.height=Math.ceil(this.obj.array.length/this.gallery.kolII)*66+2

                    if(this._startIndex!=-1)this.gallery.index=this._startIndex;
                }

                if(this.idArr==1)this.gallery.index=0//актианый первый элемент



            }


           


        }
    }

    set active(value) {
        if(this._active!=value){
            this._active= value;
            this.dCGal.visible= value;           
            this.init() 

            if(this._active==true)this.button.color=dcmParam.activButton;
            else this.button.color=dcmParam.color;

        }
    }    
    get active() { return  this._active;} 

    set startIndex(value) {
        if(this._startIndex!=value){
            this._startIndex= value;
            if(this.gallery!=undefined)this.gallery.index=value;

        }
    }    
    get startIndex() { return  this._startIndex;} 


}



////////////////////////////////////////////////////////////



export class DGalObj extends DGallery {
    constructor(dCont, _x, _y, _fun, par) {  
        super(dCont, _x, _y, _fun);
        this.par=par
       

        this._index=-1;
        this.par=par
        var self=this

        // Функция клика по иконке
        this.downBtn = function (s,p) {
         
            if (self.fun) self.fun(s,p);
        };


        this.createZamen=function(){ 
            var r=new DGOBox(this.content, 0, 0, this.downBtn,  this);                 
            return r;
        }

        var aa=0.3
        this.dragIndex=function(){ 
            for (var i = 0; i < this.array.length; i++) {
                if(this._index1 == i||this._index == i){
                    if (this._index == i) {
                        this.array[i].activ = true;
                        this.array[i].setAct(0,true)                      
                        if (this._index1 != i)this.array[i].setAct(1,false)
                    }
                    if (this._index1 == i) {
                        this.array[i].activ = true;
                        this.array[i].setAct(1,true)  
                        if (this._index != i)this.array[i].setAct(0,false)
                    }

                }else {
                    this.array[i].activ = false;
                    this.array[i].setAct(0,false)
                    this.array[i].setAct(1,false)                   
                }
            } 

        }
    }

    set index(value) {   
        this._index = value;        
    }    
    get index() { return  this._index;} 





    
}
export class DGOBox extends DBox {
    constructor(_cont, _x, _y, _fun,par) {  
        super(_cont, _x, _y, _fun);
        this.par=par
        
        this.dragPic=this.par.par.par.par.dragPic

        var self=this
        var otstup=2
       


        this.down = function (e) {  
            
            if (self.fun) self.fun("indexBig");
        }
        this.drag = function (e) {
            var o=self.object;
            o.typeThree="Blok"
            var l="resources/data/"+self.object.id+"/original.png";            
            self.dragPic.start(32, l, o); 
        }

        this.mouseDownNew = function (e) {
            self.dragPic.testDrag(5, self.down, self.drag);           
        };


        if(dcmParam.mobile==false){
            this.image.image.removeEventListener("mousedown", this.mouseDown)
            this.panel.div.removeEventListener("mousedown", this.mouseDown)
            }else{
            this.image.image.removeEventListener("touchstart", this.mouseDown)
            this.panel.div.removeEventListener("touchstart", this.mouseDown)
        }

        



        if(dcmParam.mobile==false){
            this.image.image.addEventListener("mousedown", this.mouseDownNew)
            this.panel.div.addEventListener("mousedown", this.mouseDownNew)
            }else{
            this.image.image.addEventListener("touchstart", this.mouseDownNew)
            this.panel.div.addEventListener("touchstart", this.mouseDownNew)
        }
    }
}*/