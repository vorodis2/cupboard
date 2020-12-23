

import { Php} from './PhpE6.js';
export class ViewServer  {
  	constructor(fun) {  		
  		this.type="ViewServer";
  		var self=this;
        this.fun=fun;

        this.id=undefined;

        var php=new Php()
        this.openId=function(_id) {
            this.id=_id;
            trace("---_id",_id)
            let link = "save/"+_id+"/config.json";

            $.ajax({
                url: link,
                success: function function_name(data) {                         
                    var oo;
                    if(typeof data === "string") {
                        var conf = JSON.parse(data)
                        oo = conf;
                    } else oo = data;   

                    self.fun("setObj",oo)
                  
                   
                                  
                },
                error:function function_name(data) {
                    self.fun("message","Что то случилось с конфигом","Не верный ид==",self.id)
                    console.error("Что то случилось с конфигом")
                }
            });          
        }


        this.saveGetObjId=function(o) {
            var str=JSON.stringify(o)

            if(this.id==undefined){
                /*self.fun("message","Error Проект не имеет ИД","Этот проект не открыт, в плане не имеет связи с сервером")
                return*/


            }else{
                var l="../save/"+this.id+"/config.json";  
                
                php.load({tip:"saveJSON", link:l, text:str},function(e){
                    trace(e)
                    /*var ll = self.link+self.idSave +'/icon.png'            
                    self.php.savePhoto(ll, self.base, function () {                
                        self.poiskId3()
                    });*/
                });
            }


/*

            var obj={//то что посылаем через аякс на сервер, собственно тут сам запрос
                url: 'https://alphakp.ru/catalog/plan/'+this.id+'/edit_scheme/set_scheme',
                type: 'POST',
                data: {
                    json:JSON.stringify(o),
                },
                cache: false,
                async: false,
                success:function(e){                       
                    self.fun("message","Проект сохронен","Проект сохронен на сервере.",500)

                },             
                error:function(e){
                    self.fun("message","Error","Чо то не грузит линк")
                                      
                }
            }
            $.ajax(obj)*/
        }




        this.openURL=function() {   
            var _id=getURLParameters("id")

            if(_id!=null){
                this.openId(_id);
            }else{
                self.fun("openStart")
            }

        }

        //customDepth+trasparent
        function getURLParameters(paramName, _sURL){
            var sURL = window.document.URL.toString();
            if(_sURL)sURL =_sURL
            var arrParams = sURL.split("/");                        
            if (sURL.indexOf("?") > 0) {
                var arrParams = sURL.split("?");
                var arrURLParams = arrParams[1].split("&");
                var arrParamNames = new Array(arrURLParams.length);
                var arrParamValues = new Array(arrURLParams.length);

                arrParams = sURL.split("?");
                arrURLParams = arrParams[1].split("&");
                arrParamNames = new Array(arrURLParams.length);
                arrParamValues = new Array(arrURLParams.length);


                var i = 0;
                for (i = 0; i < arrURLParams.length; i++) {

                    var sParam =  arrURLParams[i].split("=");
                    arrParamNames[i] = sParam[0];
                    if (sParam[1] != "")
                        arrParamValues[i] = unescape(sParam[1]);
                    else
                        arrParamValues[i] = null;
                }

                for (i=0; i<arrURLParams.length; i++) {
                    if (arrParamNames[i] == paramName) {

                        return arrParamValues[i];
                    }
                }
                return null;
            }
        }


  
  	}
}






