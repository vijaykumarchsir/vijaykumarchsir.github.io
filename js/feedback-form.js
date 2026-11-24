(function(){
var toggle=document.getElementById('open-feedback');
var panel=document.getElementById('submit');
var form=document.getElementById('feedback-form');
var message=document.getElementById('message');
var checkBtn=document.getElementById('check-writing');
var results=document.getElementById('lt-results');
if(!toggle||!panel||!form||!message)return;

var matches=[];
var checkedText=null;
var allowSend=false;
var checkFailed=false;

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

message.addEventListener('input',function(){
if(checkedText!==null&&message.value!==checkedText){
allowSend=false;
checkFailed=false;
}
});

function escapeHtml(s){
return String(s).replace(/[&<>"']/g,function(ch){
return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
});
}

function snippet(text,offset,length){
var start=Math.max(0,offset-24);
var end=Math.min(text.length,offset+length+24);
var before=text.slice(start,offset);
var mid=text.slice(offset,offset+length);
var after=text.slice(offset+length,end);
if(start>0)before='…'+before;
if(end<text.length)after=after+'…';
return{before:before,mid:mid||' ',after:after};
}

function render(){
if(!matches.length){
results.hidden=true;
results.innerHTML='';
return;
}
var n=matches.length;
var html='<p class="lt-status">'+n+' suggested correction'+(n===1?'':'s')+'.</p>';
html+='<div class="lt-toolbar"><button type="button" class="btn alt" data-fix-all>Fix all</button></div>';
html+='<ul class="lt-list">';
matches.forEach(function(m,i){
var sug=m.replacements&&m.replacements[0]?m.replacements[0].value:'';
var bit=snippet(message.value,m.offset,m.length);
html+='<li class="lt-item"><div class="lt-suggest"><p><span class="lt-from">'+escapeHtml(bit.mid)+'</span> → <span class="lt-to">'+escapeHtml(sug||bit.mid)+'</span></p>';
if(m.shortMessage||m.message)html+='<p class="lt-why">'+escapeHtml(m.shortMessage||m.message)+'</p>';
html+='</div><button type="button" class="btn alt" data-fix="'+i+'">Fix</button></li>';
});
html+='</ul>';
results.innerHTML=html;
results.hidden=false;
}

function applyAt(index){
var m=matches[index];
if(!m||m.replacements&&m.replacements.length===0)return;
var next=m.replacements[0].value;
var text=message.value;
var from=m.offset,len=m.length;
if(text.slice(from,from+len)!==m.contextSlice&&text.slice(from,from+len)!==m.original){
// still apply at recorded offset if in range
if(from<0||from+len>text.length)return;
}
message.value=text.slice(0,from)+next+text.slice(from+len);
var delta=next.length-len;
matches=matches.filter(function(other,i){
if(i===index)return false;
if(other.offset>=from&&other.offset<from+len)return false;
if(other.offset>=from+len)other.offset+=delta;
return true;
});
checkedText=message.value;
render();
}

function applyAll(){
// Apply from the end so earlier offsets stay valid
var idxs=[];
for(var i=0;i<matches.length;i++)idxs.push(i);
idxs.sort(function(a,b){return matches[b].offset-matches[a].offset;});
idxs.forEach(function(i){applyAt(i);});
}

results.addEventListener('click',function(e){
var all=e.target.closest('[data-fix-all]');
if(all){applyAll();return;}
var one=e.target.closest('[data-fix]');
if(one)applyAt(parseInt(one.getAttribute('data-fix'),10));
});

function normalise(raw){
return (raw.matches||[]).map(function(m){
var original=(typeof m.offset==='number')?message.value.slice(m.offset,m.offset+m.length):'';
return{
offset:m.offset,
length:m.length,
original:original,
message:m.message||'',
shortMessage:m.shortMessage||'',
replacements:(m.replacements||[]).filter(function(r){return r&&typeof r.value==='string';})
};
}).filter(function(m){return m.replacements.length&&typeof m.offset==='number';});
}

function setBusy(busy,label){
checkBtn.disabled=busy;
checkBtn.textContent=label||'Check writing';
}

function checkWriting(){
var text=message.value.trim();
if(!text){
results.hidden=false;
results.innerHTML='<p class="lt-status">Please write a message first.</p>';
return Promise.resolve('empty');
}
setBusy(true,'Checking…');
var body=new URLSearchParams();
body.set('language','en-GB');
body.set('text',message.value);
return fetch('https://api.languagetool.org/v2/check',{
method:'POST',
headers:{'Content-Type':'application/x-www-form-urlencoded'},
body:body.toString()
}).then(function(res){
if(!res.ok)throw new Error('HTTP '+res.status);
return res.json();
}).then(function(data){
matches=normalise(data);
checkedText=message.value;
checkFailed=false;
allowSend=true;
setBusy(false);
if(!matches.length){
results.hidden=false;
results.innerHTML='<p class="lt-status">No corrections suggested.</p>';
return 'clear';
}
render();
return 'suggestions';
}).catch(function(){
matches=[];
checkedText=message.value;
checkFailed=true;
allowSend=true;
setBusy(false);
results.hidden=false;
results.innerHTML='<p class="lt-status">The checker is unavailable just now. You can still send your feedback.</p>';
return 'failed';
});
}

checkBtn.addEventListener('click',function(){
if(!form.reportValidity())return;
checkWriting();
});

form.addEventListener('submit',function(e){
if(!form.reportValidity()){e.preventDefault();return;}
var stale=checkedText===null||message.value!==checkedText;
if(allowSend&&!stale)return;
e.preventDefault();
checkWriting().then(function(state){
if(state==='clear'||state==='failed'){
allowSend=true;
form.submit();
}
// If suggestions, wait: the student can Fix, Fix all, then Send again.
});
});
})();
