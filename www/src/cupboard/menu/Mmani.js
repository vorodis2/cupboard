export class MMani {
    constructor(par, fun) {
        this.type = 'MMani';
        var self = this;
        this.par = par;
        this.fun = fun;

        this.param = this.par.param;
        var sah = 0;
        this.dCont = new DCont(par.dCont);

        this.array = [];

        this.window = new DWindow(this.dCont);
        this.window.width = 300;
        this.window.height = 200;

        this.array[this.array.length] = this.mmBablo = new MMBablo(
            this,
            this.window.content,
            0,
            0,
            (s, p, p1) => {},
        );

        this.setInfoArr = function (a) {
            sah++;
            this.window.title = 'бабло. Счет: ' + sah + ' : ' + a.length;
            this.mmBablo.setInfoArr(a);
        };

        this.sizeWindow = function (w, h, s) {
            this.window.x = w / s / 2;
            this.window.y = 10;
        };

        this.dragParam = function () {
            this.mmBablo.x = this.param.otstup;
            this.mmBablo.y = this.param.otstup;

            this.mmBablo.width = this.window.width;
            this.mmBablo.height = this.window.height - 32;

            for (var i = this.array.length - 1; i >= 0; i--) {
                if (this.array[i].dragParam) this.array[i].dragParam();
            }
        };
    }

    // set index(value) {
    //     if (this._index != value) {
    //         this._index = value;

    //         for (var i = 0; i < this.array.length; i++) {
    //             if (i == this._index) {
    //                 this.array[i].active = true;
    //             } else {
    //                 this.array[i].active = false;
    //             }
    //         }
    //     }
    // }
    // get index() {
    //     return this._index;
    // }
}

export class MMBablo {
    constructor(par, cont, x, y, fun) {
        this.type = 'MMBablo';
        var self = this;
        this.par = par;
        this.fun = fun;

        this._width = 100;
        this._height = 100;

        this.dCont = new DCont(cont);
        this.dCont.x = x;
        this.dCont.y = y;
        //this.panel=new DPanel(this.dCont,0,0);

        this.down = function (s, p) {
            /*    if(s=="openObj"){
              self.fun(s,p)
              return
          }
          self.dragO(this.array[this.index].object);  */
        };

        this.gallary = new DGallary1(this.dCont, 0, 0, this.down, this);
        this.gallary.kolII = 1;
        this.gallary.widthPic = 100; //this.widthMenu/this.gallary.kolII-4;
        this.gallary.heightPic = 64; //130*sxz;
        this.gallary.width = this._width;
        this.gallary.otstup = 5;
        this.gallary.height = 200; //(this.gallary.heightPic+this.gallary.otstup)*3+this.gallary.otstup;

        //this.gallary.panel.visible=false;

        this.gallary.boolPositOtctup = false;
        this.gallary.zScrol = -7;

        var as = [];
        var asDin = [];
        this.setInfoArr = function (a) {
            as = a;
            this.draw();
        };

        this.arrGal = [];
        this.arrGalCesh = [];
        this.clearAL = function () {
            this.arrGal.length = 0;
            for (var i = 0; i < this.arrGalCesh.length; i++) {
                this.arrGalCesh[i].clear();
            }
        };

        this.getGal = function () {
            if (this.arrGalCesh[this.arrGal.length] == undefined) {
                this.arrGalCesh[this.arrGal.length] = new MMBGInfo();
            }
            this.arrGal.push(this.arrGalCesh[this.arrGal.length]);
            return this.arrGal[this.arrGal.length - 1];
        };

        this.clear = function () {
            this.array.length = 0;
            this.clearAL();
            aobj.length = 0;
            aobjFinal.length = 0;
            asDin.length = 0;
            aFinal.length = 0;
            for (var i = 0; i < as.length; i++) {
                asDin.push(as[i]);
            }
        };
        var aobj = [];
        var aobjFinal = [];
        var aFinal = [];

        this.array = [];
        this.draw = function () {
            this.clear();

            this.drawObj();
            this.drawVso();

            this.gallary.start(aFinal);
        };

        this.drawVso = function () {
            for (var i = 0; i < aobjFinal.length; i++) {
                aFinal.push(aobjFinal[i]);
            }

            for (var i = 0; i < aFinal.length; i++) {
                aFinal[i].dragText();
            }
        };

        var b;
        this.drawObj = function () {
            for (var i = asDin.length - 1; i >= 0; i--) {
                if (asDin[i].type == 'CPalka') {
                    aobj.push(asDin[i]);
                    asDin.splice(i, 1);
                }
            }

            for (var i = 0; i < aobj.length; i++) {
                b = -1;
                for (var j = 0; j < aobjFinal.length; j++) {
                    if (aobjFinal[j].obj.id == aobj[i].id) {
                        b = j;
                        j == 99999999;
                    }
                }

                if (b != -1) {
                    aobjFinal[b].setO(aobj[i]);
                    continue;
                }

                aobjFinal.push(this.getGal());
                aobjFinal[aobjFinal.length - 1].setO(aobj[i]);
            }
        };
    }

    set width(value) {
        if (this._width != value) {
            this._width = value;

            this.gallary.width = value;
            this.gallary.widthPic = value - this.gallary.otstup * 2;
            this.draw();
        }
    }
    get width() {
        return this._width;
    }

    set height(value) {
        if (this._height != value) {
            this._height = value;
            this.gallary.height = value;
            // this.panel.height= value;
            this.draw();
        }
    }
    get height() {
        return this._height;
    }
}

export class MMBGInfo {
    constructor() {
        this.type = 'MMBGInfo';
        this.text = 'infoXZ';
        this.text1 = 'infoXZ';
        this.text2 = 'infoXZ';
        this.text3 = 'infoXZ';
        this.src = 'null';

        this.obj = undefined;
        this.array = [];
        this.kol = 0;
        this.area = null;
        this.gronSize = null;

        this.clear = function () {
            this.kol = 0;
            this.obj = undefined;
            this.array.length = 0;
            this.area = null;
            this.gronSize = null;
        };

        this.setO = function (o) {
            this.array.push(o);
            this.kol = this.array.length;
            if (this.kol == 1) {
                this.obj = o;
            }

            if (o.type === 'CPalka') {
                this.area += (o.depth * o.height) / 10000;
                this.gronSize += o.gron / 100;
            }
        };

        this.dragText = function () {
            if (this.obj.type == 'CPalka') {
                this.area = this.area.toFixed(2);
                this.gronSize = this.gronSize.toFixed(2);

                this.text = 'id : ' + this.obj.id;
                this.text1 = 'количество : ' + this.kol;
                this.text2 = `${this.obj.object.str[1]} ${this.area}м² (${
                    this.area
                } * ${this.obj.object.num[1]}) ${(
                    this.obj.object.num[1] * this.area
                ).toFixed(2)}грн`;
                this.text3 = `${this.obj.object.str[2]} ${this.gronSize}м (${
                    this.gronSize
                } * ${this.obj.object.num[2]}) ${(
                    this.gronSize * this.obj.object.num[2]
                ).toFixed(2)}грн`;
                this.src = 'resources/data/' + this.obj.id + '/100.png';
            }
        };
    }
}

function DGallary1(dCont, _x, _y, _fun, par) {
    DGallery.call(this, dCont, _x, _y, _fun);
    this.par = par;
    this.type = 'DGallary1';
    this.bRadius = par.bRadius;
    this.createZamen = function () {
        var r = new BXZ1(this.content, 0, 0, this.downBtn, this);
        return r;
    };
}

DGallary1.prototype = Object.create(DGallery.prototype);
DGallary1.prototype.constructor = DGallary1;
Object.defineProperties(DGallary1.prototype, {
    index: {
        // активный элемент
        set: function (value) {
            if (this._index == value) return;
            this._index = value;
        },
        get: function () {
            return this._index;
        },
    },
});

function BXZ1(dCont, _x, _y, _fun, par) {
    DBox.call(this, dCont, _x, _y, _fun);
    this.type = 'BXZ1';
    var self = this;
    this.par = par;

    this.label1 = new DLabel(this);
    this.label2 = new DLabel(this);
    this.label3 = new DLabel(this);

    /* this.label.bold = true;
  this.label.fontSize=12;*/

    this.arLabel = [this.label, this.label1, this.label2, this.label3];

    for (var i = 0; i < this.arLabel.length; i++) {
        this.arLabel[i].fontSize = 12;
        this.arLabel[i].activMouse = false;
    }

    this.startLoad = function (_obj) {
        this.object = _obj;
        this.image.link = this.object.src;

        this.label.text = this.object.text;
        this.label1.text = this.object.text1;
        this.label2.text = this.object.text2;
        this.label3.text = this.object.text3;
        /* this.setTT(_obj.name);
     // this.label.text= 
      this.label.visible=true;

      let link="resources/image/notPicture.png"
      if(_obj.icon!=undefined)if(_obj.icon.url!=undefined)link=_obj.icon.url

      //let link=_obj.icon.url!=undefined ? _obj.icon.url : _obj.icon
      //if(this.image.link!=_obj.icon)this.image.link = link;
      this.image.link = link;
      this.image.visible= true 

      var col=dcmParam.color1;
      this.batton2.visible=false
      if(_obj.direkt!=undefined)if(_obj.direkt==1){
          col="#999999";
          this.batton2.visible=true;
      }
      this.color=col
      this.panel.color1=this.color;

      this.imege2.visible=  _obj.active 
      this.imege1.visible=  !_obj.active  */

        self.funLoad();
        this.draw();
        self.funLoad();
    };

    var bb = true;
    var ss;
    this.draw = function () {
        this.image.visible = false;
        this.label.x = 100;
        this.label.y = 10;

        let hh = this._height; //-30
        ss = this._width / this.image.picWidth;
        if (ss > (hh - this._otstup * 2) / this.image.picHeight)
            ss = (hh - this._otstup * 2) / this.image.picHeight;

        this.image.width = this.image.picWidth * ss;
        this.image.height = this.image.picHeight * ss;

        this.image.x = 0;
        this.image.y = 0;

        for (var i = 0; i < this.arLabel.length; i++) {
            if (i == 0) {
                this.arLabel[i].y = this.otstup;
            } else {
                this.arLabel[i].y =
                    this.arLabel[i - 1].fontSize + this.arLabel[i - 1].y;
            }

            this.arLabel[i].x = this.image.width + this.otstup;
            this.arLabel[i].width = this.panel.width - this.arLabel[i].x;
            this.arLabel[i].visible = true;
        }

        this.image.visible = true;
        if (this.postDraw) this.postDraw();
    };

    /*  this.label.div.style.pointerEvents="none";
  //this.label.textAlign="center";
  this.label.color="#000000";
  
  this.label.x=this.par.wPlus+148
  this.label.y=10;
  this.panel.boolLine=false;
  this.label.bold = true;
  this.label.fontSize=12;
  

  var wh=24;
  var ot=4;

  this.imege2=new DImage(this,this.par.widthPic-wh-ot,this.par.heightPic-wh-ot,"resources/image/dd0.png")
  this.imege2.width=this.imege2.height=wh;

  this.imege1=new DImage(this,this.par.widthPic-wh-ot,this.par.heightPic-wh-ot,"resources/image/dd1.png")
  this.imege1.width=this.imege1.height=wh;

  

  this.panel.borderRadius =this.par.bRadius;
  this.panel.glowSah=1;
  this.panel.glowColor=par.par.glowColor;



  var s=this.par.bRadius//ss
  this.image.image.style.borderRadius=""+s+"px "+s+"px 0 0";
  var sss="rect(0px "+this.par.widthMenu+"px "+(this.par.heightPic-32)+"px 0px)";
  this.image.div2.style.clip = sss;
  
  this.batton2=new DButton(this,0,0,"",function(){        
      self.par.fun("openObj",self.object);
  },"resources/image/dd0.png")
  this.batton2.width=this.batton2.height=this.batton2.borderRadius=wh*0.8;
  //this.batton2.boolFond=false;
  this.batton2.visible=false*/
}
BXZ1.prototype = Object.create(DBox.prototype);
BXZ1.prototype.constructor = BXZ1;

Object.defineProperties(BXZ1.prototype, {
    activ: {
        // активный элемент
        set: function (value) {
            if (this._activ == value) return;
            this._activ = value;
            if (this._activ) {
                this.label.color = '#93c32f';
            } else {
                this.label.color = '#000000';
            }
            if (this._activ == false) this.panel.color1 = this._color1;
            else this.panel.color1 = this._color;
        },
        get: function () {
            return this._activ;
        },
    },
});
