(()=>{var e={369:e=>{!function(){"use strict";var e,t=[];function n(){for(;t.length;)t[0](),t.shift()}function o(e){this.a=i,this.b=void 0,this.f=[];var t=this;try{e((function(e){a(t,e)}),(function(e){s(t,e)}))}catch(e){s(t,e)}}e=function(){setTimeout(n)};var i=2;function r(e){return new o((function(t){t(e)}))}function a(e,t){if(e.a==i){if(t==e)throw new TypeError;var n=!1;try{var o=t&&t.then;if(null!=t&&"object"==typeof t&&"function"==typeof o)return void o.call(t,(function(t){n||a(e,t),n=!0}),(function(t){n||s(e,t),n=!0}))}catch(t){return void(n||s(e,t))}e.a=0,e.b=t,c(e)}}function s(e,t){if(e.a==i){if(t==e)throw new TypeError;e.a=1,e.b=t,c(e)}}function c(n){!function(n){t.push(n),1==t.length&&e()}((function(){if(n.a!=i)for(;n.f.length;){var e=(r=n.f.shift())[0],t=r[1],o=r[2],r=r[3];try{0==n.a?o("function"==typeof e?e.call(void 0,n.b):n.b):1==n.a&&("function"==typeof t?o(t.call(void 0,n.b)):r(n.b))}catch(e){r(e)}}}))}o.prototype.g=function(e){return this.c(void 0,e)},o.prototype.c=function(e,t){var n=this;return new o((function(o,i){n.f.push([e,t,o,i]),c(n)}))},window.Promise||(window.Promise=o,window.Promise.resolve=r,window.Promise.reject=function(e){return new o((function(t,n){n(e)}))},window.Promise.race=function(e){return new o((function(t,n){for(var o=0;o<e.length;o+=1)r(e[o]).c(t,n)}))},window.Promise.all=function(e){return new o((function(t,n){function o(n){return function(o){a[n]=o,(i+=1)==e.length&&t(a)}}var i=0,a=[];0==e.length&&t(a);for(var s=0;s<e.length;s+=1)r(e[s]).c(o(s),n)}))},window.Promise.prototype.then=o.prototype.c,window.Promise.prototype.catch=o.prototype.g)}(),function(){function t(e,t){document.addEventListener?e.addEventListener("scroll",t,!1):e.attachEvent("scroll",t)}function n(e){this.a=document.createElement("div"),this.a.setAttribute("aria-hidden","true"),this.a.appendChild(document.createTextNode(e)),this.b=document.createElement("span"),this.c=document.createElement("span"),this.h=document.createElement("span"),this.f=document.createElement("span"),this.g=-1,this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;",this.b.appendChild(this.h),this.c.appendChild(this.f),this.a.appendChild(this.b),this.a.appendChild(this.c)}function o(e,t){e.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+t+";"}function i(e){var t=e.a.offsetWidth,n=t+100;return e.f.style.width=n+"px",e.c.scrollLeft=n,e.b.scrollLeft=e.b.scrollWidth+100,e.g!==t&&(e.g=t,!0)}function r(e,n){function o(){var e=r;i(e)&&e.a.parentNode&&n(e.g)}var r=e;t(e.b,o),t(e.c,o),i(e)}function a(e,t){var n=t||{};this.family=e,this.style=n.style||"normal",this.weight=n.weight||"normal",this.stretch=n.stretch||"normal"}var s=null,c=null,l=null,d=null;function u(){return null===d&&(d=!!document.fonts),d}function f(){if(null===l){var e=document.createElement("div");try{e.style.font="condensed 100px sans-serif"}catch(e){}l=""!==e.style.font}return l}function h(e,t){return[e.style,e.weight,f()?e.stretch:"","100px",t].join(" ")}a.prototype.load=function(e,t){var i=this,a=e||"BESbswy",l=0,d=t||3e3,f=(new Date).getTime();return new Promise((function(e,t){if(u()&&!function(){if(null===c)if(u()&&/Apple/.test(window.navigator.vendor)){var e=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);c=!!e&&603>parseInt(e[1],10)}else c=!1;return c}()){var p=new Promise((function(e,t){!function n(){(new Date).getTime()-f>=d?t(Error(d+"ms timeout exceeded")):document.fonts.load(h(i,'"'+i.family+'"'),a).then((function(t){1<=t.length?e():setTimeout(n,25)}),t)}()})),m=new Promise((function(e,t){l=setTimeout((function(){t(Error(d+"ms timeout exceeded"))}),d)}));Promise.race([m,p]).then((function(){clearTimeout(l),e(i)}),t)}else!function(e){document.body?e():document.addEventListener?document.addEventListener("DOMContentLoaded",(function t(){document.removeEventListener("DOMContentLoaded",t),e()})):document.attachEvent("onreadystatechange",(function t(){"interactive"!=document.readyState&&"complete"!=document.readyState||(document.detachEvent("onreadystatechange",t),e())}))}((function(){function c(){var t;(t=-1!=w&&-1!=g||-1!=w&&-1!=y||-1!=g&&-1!=y)&&((t=w!=g&&w!=y&&g!=y)||(null===s&&(t=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),s=!!t&&(536>parseInt(t[1],10)||536===parseInt(t[1],10)&&11>=parseInt(t[2],10))),t=s&&(w==v&&g==v&&y==v||w==b&&g==b&&y==b||w==x&&g==x&&y==x)),t=!t),t&&(T.parentNode&&T.parentNode.removeChild(T),clearTimeout(l),e(i))}var u=new n(a),p=new n(a),m=new n(a),w=-1,g=-1,y=-1,v=-1,b=-1,x=-1,T=document.createElement("div");T.dir="ltr",o(u,h(i,"sans-serif")),o(p,h(i,"serif")),o(m,h(i,"monospace")),T.appendChild(u.a),T.appendChild(p.a),T.appendChild(m.a),document.body.appendChild(T),v=u.a.offsetWidth,b=p.a.offsetWidth,x=m.a.offsetWidth,function e(){if((new Date).getTime()-f>=d)T.parentNode&&T.parentNode.removeChild(T),t(Error(d+"ms timeout exceeded"));else{var n=document.hidden;!0!==n&&void 0!==n||(w=u.a.offsetWidth,g=p.a.offsetWidth,y=m.a.offsetWidth,c()),l=setTimeout(e,50)}}(),r(u,(function(e){w=e,c()})),o(u,h(i,'"'+i.family+'",sans-serif')),r(p,(function(e){g=e,c()})),o(p,h(i,'"'+i.family+'",serif')),r(m,(function(e){y=e,c()})),o(m,h(i,'"'+i.family+'",monospace'))}))}))},e.exports=a}()}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=n(369);new(n.n(e)())("d_CCMonologous",{weight:700}).load().then((function(){console.log("Font has loaded.")})).catch((function(){console.log("Font failed to load.")}));var t=document.querySelector(".btn-big"),o=document.querySelector(".btn-small");console.log(t),t.addEventListener("click",(function(e){t.setAttribute("aria-selected",!1),o.setAttribute("aria-selected",!0)})),o.addEventListener("click",(function(e){o.setAttribute("aria-selected",!1),t.setAttribute("aria-selected",!0)})),t.addEventListener("mouseenter",(function(){i.to(".text-cls-1",{translateX:"-1rem",duration:.2,ease:"back.out(1.7)",stagger:.05,opacity:1}),i.play()})),t.addEventListener("mouseleave",(function(){i.reverse()}));var i=gsap.timeline({repeat:0,yoyo:!1}),r=gsap.timeline({repeat:-1,yoyo:!1});gsap.fromTo(".glass",{x:-25,y:8.5,ease:"none",opacity:.8},{x:55,y:-25,duration:.5,ease:"none",repeat:-1,repeatDelay:6}),r.to(".glass rect",{keyframes:[{height:80},{height:22,x:-19,y:13,opacity:1}],duration:.5,ease:"none",repeat:-1,repeatDelay:6});var a=document.querySelector(".doodle"),s=document.querySelector(".span0"),c=document.querySelector(".span1"),l=document.querySelector(".span2"),d=document.querySelector(".span3"),u={string0:"My name",string1:"is Pavel!",string2:"Welcome to",string3:"my page!"},f=u.string0.split(""),h=u.string1.split(""),p=u.string2.split(""),m=u.string3.split("");setTimeout((function e(){f.length>0?s.innerHTML+=f.shift():clearTimeout(e),setTimeout(e,100)}),3500),setTimeout((function e(){h.length>0?c.innerHTML+=h.shift():clearTimeout(e),setTimeout(e,100)}),4500),setTimeout((function e(){p.length>0?l.innerHTML+=p.shift():clearTimeout(e),setTimeout(e,100)}),5500),setTimeout((function e(){m.length>0?d.innerHTML+=m.shift():clearTimeout(e),setTimeout(e,100)}),6800),document.querySelector(".pre-photo");var w=document.querySelector(".photo"),g=(w.getBoundingClientRect(),a.getBoundingClientRect(),+window.getComputedStyle(w,null).transform.match(/(-?[0-9\.]+)/g)[5]),y=+window.getComputedStyle(w,null).transform.match(/(-?[0-9\.]+)/g)[4];console.log(g),window.innerHeight,window.innerWidth,w.offsetHeight,w.offsetWidth,window.innerWidth,w.getBoundingClientRect().left,window.innerHeight,w.getBoundingClientRect().top,document.addEventListener("DOMContentLoaded",(function(){a.style.transform="translate(".concat(window.innerWidth-a.offsetWidth-.8*w.offsetWidth+y,"px, ").concat(window.innerHeight-(w.offsetHeight-.25*w.offsetHeight-g),"px)")})),window.addEventListener("resize",(function(){a.style.transform="translate(".concat(window.innerWidth-a.offsetWidth-.8*w.offsetWidth+ +window.getComputedStyle(w,null).transform.match(/(-?[0-9\.]+)/g)[4],"px, ").concat(window.innerHeight-(w.offsetHeight-.25*w.offsetHeight-+window.getComputedStyle(w,null).transform.match(/(-?[0-9\.]+)/g)[5]),"px)")}));var v=document.querySelectorAll('[data-name="pre-photo"] .cls-1');gsap.timeline({defaults:{duration:1,repeat:0}}).from(".photo",{x:"200%",ease:"back.out(1.7)",clearProps:"transform"}).from(v,{opacity:0,scale:0,stagger:{each:.002,from:15},ease:"back.out(1.7)"}).to(".doodle",{opacity:1,ease:"back.out(1.7)"},"<0.2").from(t,{y:-500,opacity:0,ease:"elastic.out(1, 0.3)"}).from(".logo",{y:-500,opacity:0,ease:"elastic.out(1, 0.3)"},"<0"),document.getElementById("corner-link").addEventListener("click",(function(e){e.preventDefault(),document.getElementById("wrapper").classList.add("flip"),window.setTimeout((function(){window.location.href="test.html"}),250)}))})()})();
//# sourceMappingURL=bundle.js.map