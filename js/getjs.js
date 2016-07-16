function $(fn){
	if(document.addEventListenetr){
		document.addEventListener('DOMContentLoaded',function(){
			if(fn){
				fn();
			}
		},false);
	}else{
		document.onreadystatechange=function(){
			if(document.readyState=='complete'){
				if(fn){
					fn();
				}
			}
		}
	}
}
function findInArr(n,arr){
    for(var a=0;a<arr.length;a++){
        if(n==arr[a]){
            return true;
        }
    }
    return false;
}
function getPos(obj){
	var l=0;
	var t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {left:l,top:t};
}
var Tween={Linear:function(t,b,c,d){return c*t/d+b},Quad:{easeIn:function(t,b,c,d){return c*(t/=d)*t+b},easeOut:function(t,b,c,d){return -c*(t/=d)*(t-2)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b}return -c/2*((--t)*(t-2)-1)+b}},Cubic:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t+b}return c/2*((t-=2)*t*t+2)+b}},Quart:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t+b},easeOut:function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b}return -c/2*((t-=2)*t*t*t-2)+b}},Quint:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t*t+b}return c/2*((t-=2)*t*t*t*t+2)+b}},Sine:{easeIn:function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b},easeOut:function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOut:function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b}},Expo:{easeIn:function(t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b},easeOut:function(t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOut:function(t,b,c,d){if(t==0){return b}if(t==d){return b+c}if((t/=d/2)<1){return c/2*Math.pow(2,10*(t-1))+b}return c/2*(-Math.pow(2,-10*--t)+2)+b}},Circ:{easeIn:function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOut:function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return -c/2*(Math.sqrt(1-t*t)-1)+b}return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b}},Elastic:{easeIn:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return(a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b)},easeInOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d/2)==2){return b+c}if(!p){p=d*(0.3*1.5)}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}if(t<1){return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b}return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b}},Back:{easeIn:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*(t/=d)*t*((s+1)*t-s)+b},easeOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b}return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b}},Bounce:{easeIn:function(t,b,c,d){return c-Tween.Bounce.easeOut(d-t,0,c,d)+b},easeOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else{if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b}else{if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b}}}},easeInOut:function(t,b,c,d){if(t<d/2){return Tween.Bounce.easeIn(t*2,0,c,d)*0.5+b}else{return Tween.Bounce.easeOut(t*2-d,0,c,d)*0.5+c*0.5+b}}}};
function getStyle(obj,name){
	return (obj.currentStyle || getComputedStyle(obj,false))[name];
};
function getAjax(json){
	var arr=[];
	json.t=Math.random();
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	return arr.join('&');
}
function ajax(json){
	json=json || {};
	if(json.url){
		return;
	}
	json.data=json.data || {};
	json.type=jsopn.type || 'get';
	json.time=json.time || 3000;
	var timer;
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	};
	switch(json.type.toLowerCase()){
		case 'get':
			oAjax.open('get',json.url+'?'+getAjax(json.data),true);
			oAjax.send();
			break;
		case 'post':
			oAjax.open('post',json.url+'?',true);
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
			oAjax.send(gatAjax(json.data));
			break;
	};
	json.loading && json.loading();
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			if(json.complete){
				json.complete();
			}
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
				if(json.fnSucc){
					json.fnSucc(oAjax.responseText);
				}
			}else{
				if(json.fnFali){
					json.fnFali(oAjax.status);
				}
			};
			clearTimeout(timer);
		}
	};
	timer=setTimeout(function(){
		oAjax.onreadystatechange=null;
		alert('亲！网络超时了！');
	},json.time);

};
function jsonp(json){
	if(json.url){
		return;
	};
	json.data=json.data || {};
	json.cbName=json.cbName || 'cb';
	fnName='show'+Math.random();
	fnName=fnName.replace('.','');
	window[fnName]=function(json1){
		if(json.fnSucc){
			json.fnSucc(json1);
		};
		oHead.removeChild(oSc);
	};
	var arr=[];
	json[json.cbName]=fnName;
	for(var name in json.data){
		arr.push(name+'='+json.data[name]);
	};
	var oSc=document.createElement('script');
	oSc.src=json.url+'?'+arr.join('&');
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oSc);
}
;(function(window){
    var left=0;
    var iSpeed=0;
    var timer;
    window.elastic=function(obj,iTarget){
        clearInterval(timer);
        timer=setInterval(function(){
            iSpeed+=(iTarget-left)/5;
            iSpeed*=0.8;
            left+=iSpeed;
            obj.style.left=Math.round(left)+'px';
            if(Math.abs(iSpeed)<1 && Math.round(left)==iTarget){
                clearInterval(timer);
            }
        },30);
    }

})(window);
;(function(window){
    var left=0;
    var iSpeed=0;   // 速度
    var timer;
    window.elastic=function(obj, iTarget){
        clearInterval(timer);
        timer=setInterval(function(){
            iSpeed+=(iTarget-left)/5;
            iSpeed*=0.8;
            left+=iSpeed;

            obj.style.left=Math.round(left)+'px';
            // 关闭定时器
            if(Math.abs(iSpeed)<1 && Math.round(left)==iTarget){
                clearInterval(timer);
            }
        }, 30);
    }
})(window);



























