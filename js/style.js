function getDir(obj,ev){
    var scrollT=document.documentElement.scrollTop || document.body.scrollTop;
    var scrollL=document.documentElement.scrollLeft || document.body.scrollLeft;
    var y=obj.offsetHeight/2+getPos(obj).top-(ev.clientY+scrollT);
    var x=obj.offsetWidth/2+getPos(obj).left-(ev.clientX+scrollL);
    return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
};
function rnd(v){
    return v<10?'0'+v:''+v;
}
function getByClass(oParent,sClass){
    if(oParent.getElementsByClassName){
        return oParent.getElementsByClassName(sClass);
    }else{
        var aEle=oParent.getElementsByTagName('*');
        var arr=[];
        var reg=new RegExp('\\b'+sClass+'\\b');
        for(var i=0;i<aEle.length;i++){
            if(reg.test(aEle.className)){
                arr.push(aEle[i]);
            }
        }
        return arr;
    }
}
$(function(){
    var aDos=getByClass(document,'xuanyi');
    var oLiaojie=document.getElementById('liaojie');
    oLiaojie.onclick=function(){
        document.documentElement.scrollTop=document.body.scrollTop=aDos[2].offsetTop;
    }
    ;(function(){
        var oZou=document.getElementById('zou');
        var oBox=document.getElementById('box');
        var oBox2=document.getElementById('box2');
        var offsetT=oBox.offsetTop;
        var timer;
        var bSys=false;
        window.onscroll=function(){
            var scrollT=document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollT==0){
                oZou.src='img/ting.gif';
            }else{
                oZou.src='img/zou.gif';
            }
            if(window.navigator.userAgent.toLowerCase().indexOf('msie 6.0')!=-1){
                oZou.style.top=scrollT+300+'px';
                oZou.style.right=0;
                oZou.style.position='absolute';
                if(scrollT>=offsetT){
                    oBox.style.top=scrollT+'px';
                    oBox.style.position='absolute';
                }else{
                    oBox.style.position='static';
                }
            }else{
                oZou.style.position='fixed';
                oZou.style.top=300+'px';
                oZou.style.right=0;
                if(scrollT>=offsetT){
                    oBox.style.position='fixed';
                    oBox.style.top=0;
                    oBox.style.zIndex=6;
                    oBox2.style.display='block';
                }else{
                    oBox.style.position='static';
                    oBox2.style.display='none';
                }
            };

            if(bSys){
                clearInterval(timer);
            }
            bSys=true;
        };

        oZou.onclick=function(){
            clearInterval(timer);
            var statr=document.documentElement.scrollTop || document.body.scrollTop;
            var dis=0-statr;
            var iCont=parseInt(1000/30);
            var n=0;
            timer=setInterval(function(){
                bSys=false;
                n+=4;
                var a=n/iCont;
                var cur=statr+dis*a;
                document.documentElement.scrollTop=document.body.scrollTop=cur;
                if(n==iCont){
                    bSys=true;
                    clearInterval(timer);
                }
            },200);
        }

        var oJsh=document.getElementById('js_hover');
        var aJli=oJsh.getElementsByTagName('li');
        for(var i=0;i<aJli.length;i++){
            aJli[i].onmouseover=function(ev){
                var oEvent=ev || event;
                var oSpa=this.children[0];
                var oFrom=oEvent.fromElement || oEvent.relatedTarget;
                if(this.contains(oFrom))return false;
                var n=getDir(this,oEvent);
                switch(n){
                    case 0:
                        oSpa.style.left='200px';
                        oSpa.style.top=0;
                        break;
                    case 1:
                        oSpa.style.left=0;
                        oSpa.style.top='200px';
                        break;
                    case 2:
                        oSpa.style.left='-200px';
                        oSpa.style.top=0;
                        break;
                    case 3:
                        oSpa.style.left=0;
                        oSpa.style.top='-200px';
                        break;
                }
                move(oSpa,{left:0,top:0});
            };
            aJli[i].onmouseout=function(ev){
                var oEvent=ev || event;
                var oSp=this.children[0];
                var oTo=oEvent.toElement || oEvent.relatedTarget;
                if(this.contains(oTo))return false;
                var n=getDir(this,oEvent);
                switch(n){
                    case 0:
                        move(oSp,{left:200,top:0});
                        break;
                    case 1:
                        move(oSp,{left:0,top:200});
                        break;
                    case 2:
                        move(oSp,{left:-200,top:0});
                        break;
                    case 3:
                        move(oSp,{left:0,top:-200});
                        break;
                };
            };
        };
    })();
    ;(function(){
        var oBox=document.getElementById('box');
        var aIm=oBox.getElementsByTagName('img');
        function shi(){
            var oDate=new Date();
            var y=oDate.getMonth();
            var r=oDate.getDate();
            var h=oDate.getHours();
            var m=oDate.getMinutes();
            var s=oDate.getSeconds();
            var str=rnd(y)+rnd(r+1)+rnd(h)+rnd(m)+rnd(s);
            for(var i=0;i<aIm.length;i++){
                move(aIm[i],{top:-(35*parseInt(str.charAt(i)))},{duration:600});
            }
        }
        shi();
        setInterval(shi,1000);
    })();

    ;(function(){
        var oZhang=document.getElementById('zhang');
        var oBox=document.getElementById('box');
        var oOn=document.getElementById('on');
        var oUl=oBox.getElementsByTagName('ul')[1];
        var aLi=oUl.getElementsByTagName('li');
        var oJsh=document.getElementById('js_hover');
        var aDos=getByClass(document,'xuanyi');

        oZhang.onclick=function(){
            document.documentElement.scrollTop=document.body.scrollTop=0;
        }
        for(var i=0;i<aLi.length-1;i++){
            aLi[i].onmouseover=function(){
                oOn.style.width=this.offsetWidth+'px';
                elastic(oOn, this.offsetLeft);
            }
            aLi[i].onmouseout=function(){
                oOn.style.width=aLi[0].offsetWidth+'px';
                elastic(oOn,0);
            }
            aLi[i].index=i;
            aLi[i].onclick=function(){
                document.documentElement.scrollTop=document.body.scrollTop=aDos[this.index].offsetTop;

            }
        }

    })();
    ;(function(){
        var oBtn=document.getElementById('qou');
        var oHeader=document.getElementById('header');
        var iSpeedX=0;
        var iSpeedY=0;
        var lastX=0;
        var lastY=0;
        var timer;
        oBtn.onmousedown=function(ev){
            clearInterval(timer);
            var oEvent=ev || event;
            var disX=oEvent.clientX-oBtn.offsetLeft;
            var disY=oEvent.clientY-oBtn.offsetTop;
            document.onmousemove=function(ev){
                var oEvent=ev || event;
                oBtn.style.left=oEvent.clientX-disX+'px';
                oBtn.style.top=oEvent.clientY-disY+'px';
                iSpeedX=oEvent.clientX-lastX;
                iSpeedY=oEvent.clientY-lastY;
                lastX=oEvent.clientX;
                lastY=oEvent.clientY;
            }
            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
                collision();
                oBtn.releaseCapture && oBtn.releaseCapture();
            }
            oBtn.setCapture && oBtn.setCapture();
            return false;
        }
        function collision(){
            clearInterval(timer);
            timer=setInterval(function(){
                iSpeedY+=1;
                var l=oBtn.offsetLeft+iSpeedX;
                var t=oBtn.offsetTop+iSpeedY;
                var clientW=document.documentElement.clientWidth-oBtn.offsetWidth;
                var clientH=document.documentElement.clientHeight-oBtn.offsetHeight;
                if(l>clientW){
                    l=clientW;
                    iSpeedX*=-0.8;
                    iSpeedY*=0.8;
                }
                if(t>=clientH){
                    t=clientH;
                    iSpeedX*=0.8;
                    iSpeedY*=-0.8;
                }
                if(t<0){
                    t=0;
                    iSpeedX*=0.8;
                    iSpeedY*=-0.8;
                }
                if(l<0){
                    l=0;
                    iSpeedX*=-0.8;
                    iSpeedY*=0.8;
                }
                oBtn.style.left=l+'px';
                oBtn.style.top=t+'px';
                if(Math.abs(iSpeedY)<1){
                    iSpeedY=0;
                }
                if(Math.abs(iSpeedX)<1){
                    iSpeedX=0;
                }
                if(iSpeedY==0 && iSpeedX==0 && t==clientH){
                    clearInterval(timer);
                    setTimeout(coll,3000);
                }
            },(1000/60));
        }
        function coll(){
            var iSpeedX=6;
            var iSpeedY=8;
            clearInterval(timer);
            timer=setInterval(function(){
                //iSpeedY+=2;
                var l=oBtn.offsetLeft+iSpeedX;
                var t=oBtn.offsetTop+iSpeedY;
                var clientW=document.documentElement.clientWidth-oBtn.offsetWidth;
                var clientH=document.documentElement.clientHeight-oBtn.offsetHeight;
                if(l>clientW){
                    l=clientW;
                    iSpeedX*=-0.9;
                    iSpeedY*=0.9;
                }
                if(t>=clientH){
                    t=clientH;
                    iSpeedX*=0.9;
                    iSpeedY*=-0.9;
                }
                if(t<0){
                    t=0;
                    iSpeedX*=0.9;
                    iSpeedY*=-0.9;
                }
                if(l<0){
                    l=0;
                    iSpeedX*=-0.9;
                    iSpeedY*=0.9;
                }
                oBtn.style.left=l+'px';
                oBtn.style.top=t+'px';
            },(1000/60));
        }
        coll();
    })();
    ;(function(){
        var oZsku=document.getElementById('zsku');
        var oUl=oZsku.getElementsByTagName('ul')[0];
        var aLi=oZsku.getElementsByTagName('li');
        var divC=oZsku.offsetWidth/2;
        oUl.onmousedown=function(ev){
            var oEvent=ev || event;
            var disX=oEvent.clientX-oUl.offsetLeft;
            document.onmousemove=function(ev){
                var oEvent=ev || event;
                var l=oEvent.clientX-disX;
                if(l>(divC-aLi[0].offsetWidth*(0 +.5))){
                    l=divC-aLi[0].offsetWidth*(0 +.5);
                }
                if(l<(divC-aLi[0].offsetWidth*(aLi.length-1 +.5))){
                    l=divC-aLi[0].offsetWidth*(aLi.length-1 +.5);
                }
                setSize();
                oUl.style.left=l+'px';

            }
            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
                oUl.releaseCapture && oUl.releaseCapture();
            }
            oUl.setCapture && oUl.setCapture();
            return false;
        }
        oUl.style.left=divC-aLi[0].offsetWidth*(1 +.5)+'px';
        function setSize(){
            for(var i=0;i<aLi.length;i++){
                var dis=Math.abs(divC-oUl.offsetLeft-aLi[i].offsetLeft-aLi[i].offsetWidth/2);
                var scale=1-dis/500;
                (scale<.5)&&(scale=.5)
                aLi[i].style.width=520*scale+'px';
                aLi[i].style.height=358*scale+'px';
                aLi[i].style.marginTop=-(aLi[i].offsetHeight-179)/2+'px';
                aLi[i].style.marginLeft=-(aLi[i].offsetWidth-260)/2+'px';
                aLi[i].style.zIndex=scale*100;
            }
        }
        setSize();
        var arr=['yang/huanxingtu.html','yang/3dliti.html','buyu/buyu.html','yang/baozha.html','yang/CSS3shizhong.html','yang/fanye.html'];
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].ondblclick=function(){
                window.open(arr[this.index],'_blank');
            }
        }
    })();
    ;(function(){
        var oUl=document.getElementById('erwei');
        var aLi=oUl.getElementsByTagName('li');
        var arr=[];
        aLi[0].onclick=function(){
            arr.push(arr.shift());
            round();
            
        };
        aLi[2].onclick=function(){
            arr.unshift(arr.pop());
            round();
        };
        for(var i=0;i<aLi.length;i++){
            arr.push({left:aLi[i].offsetLeft,
                      top:aLi[i].offsetTop,
                      opacity:getStyle(aLi[i],'opacity'),
                      fnClick:aLi[i].onclick

            });
        }
        function round(){
            for(var i=0;i<aLi.length;i++){
                move(aLi[i],{left:arr[i].left,top:arr[i].top});
                aLi[i].style.opacity=arr[i].opacity;
                aLi[i].onclick=arr[i].fnClick;
            }
        }
    })();
});
