import { DevCupboard } from './DevMenu/DevCupboard.js'

export class MDev {
    constructor (par, fun) {
        this.type = "MDev";
        var self = this;
        this.par = par;
        this.fun = fun; 
        
        

        this.param=this.par.param;



        this.setActiveObject=function(obj) {
            if(this.dCont)this.devCupboard.setActiveObject(obj);
        }


        
        if(this.param.debug==false){

            var c=new DCheckBox(par.mTop.dCont, 200,10,"debug",function(){
                self.par.par.par.localStorage.object.debug=this.value;
                self.par.par.par.localStorage.save();
                setTimeout(function() {
                    location.reload()
                }, 10);
            })
            return
        }	

        this.dCont=new DCont(par.dCont);

        

        this.dCompDev = new DCompDev(this.dCont,0,0,"DevWindow",function(s,p,p1){
            
        });
        this.dCompDev.x = -50;
        this.dCompDev.y = 300//window.innerHeight - this.dCompDev.height - 120;


        this.devCupboard = new DevCupboard(this, function(s, p, p1){})
        this.dCompDev.addCont(this.devCupboard, this.devCupboard.dCont, "ActDev", 300, 400);
        this.dCompDev.index = 2;



    }

    
}