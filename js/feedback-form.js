(function(){
var toggle=document.getElementById('open-feedback');
var panel=document.getElementById('submit');
if(!toggle||!panel)return;

function openPanel(){
panel.hidden=false;
requestAnimationFrame(function(){
panel.classList.add('is-open');
});
toggle.setAttribute('aria-expanded','true');
}

function closePanel(){
panel.classList.remove('is-open');
toggle.setAttribute('aria-expanded','false');
var done=function(e){
if(e.propertyName!=='grid-template-rows')return;
if(!panel.classList.contains('is-open'))panel.hidden=true;
panel.removeEventListener('transitionend',done);
};
panel.addEventListener('transitionend',done);
}

function isOpen(){return panel.classList.contains('is-open');}

function syncFromHash(){
if(location.hash==='#submit'){
openPanel();
setTimeout(function(){panel.scrollIntoView({behavior:'smooth',block:'start'});},50);
}
}

toggle.addEventListener('click',function(){
if(isOpen()){
closePanel();
if(location.hash==='#submit')history.replaceState(null,'',location.pathname+location.search);
}else{
openPanel();
if(history.replaceState)history.replaceState(null,'','#submit');
else location.hash='submit';
setTimeout(function(){panel.scrollIntoView({behavior:'smooth',block:'start'});},50);
}
});

window.addEventListener('hashchange',syncFromHash);
syncFromHash();
})();
