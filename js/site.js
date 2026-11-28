(function(){
var page=location.pathname.split('/').pop()||'index.html';
if(page==='lantern.html')page='index.html';
var params=new URLSearchParams(location.search);
var raw=(params.get('header')||'a').toLowerCase();
var variant=(raw==='b'||raw==='drawer')?'b':'a';
var q='?header='+variant;
var links=[
['index.html','The English Lantern'],
['resources.html','Resources'],
['writing.html','My Writings for Students'],
['feedback.html','Student Feedback'],
['book.html','Book your session']
];
function href(file){return file+q;}
function item(l){
return '<li><a href="'+href(l[0])+'"'+(l[0]===page?' aria-current="page"':'')+'>'+l[1]+'</a></li>';
}
var sub='<a class="btn" href="https://substack.com/@vkcsir" rel="noopener" target="_blank">Subscribe on Substack</a>';
var h=document.getElementById('site-header');
if(h){
h.innerHTML='<div class="wrap bar"><button type="button" class="menu-toggle" aria-expanded="false" aria-controls="site-menu" aria-label="Open menu"><span class="menu-toggle-lines" aria-hidden="true"></span></button><a class="identity" href="'+href('index.html')+'"><img class="identity-photo" src="images/portrait.jpg" width="640" height="641" alt="Vijay Kumar Ch"><span class="identity-name">Vijay Kumar Ch</span></a></div>';
}
var f=document.getElementById('site-footer');
if(f)f.innerHTML='<div class="wrap"><nav aria-label="Footer"><ul>'+links.map(item).join('')+'</ul></nav><p>'+sub+'</p><p><a href="mailto:vijaykumarchsir@gmail.com">vijaykumarchsir@gmail.com</a> · <a href="https://wa.me/916302479339">WhatsApp +91 63024 79339</a></p><p>&copy; '+new Date().getFullYear()+' Vijay Kumar Ch</p></div>';

document.documentElement.setAttribute('data-header',variant);

var menu=document.createElement('div');
menu.id='site-menu';
menu.className=variant==='b'?'menu-drawer':'menu-overlay';
menu.setAttribute('role','dialog');
menu.setAttribute('aria-modal','true');
menu.setAttribute('aria-labelledby','menu-title');
menu.setAttribute('aria-hidden','true');
var closeBtn='<button type="button" class="menu-close" aria-label="Close menu"><span class="menu-close-icon" aria-hidden="true"></span></button>';
var title='<h2 id="menu-title" class="visually-hidden">Menu</h2>';
if(variant==='b'){
var textLinks=links.filter(function(l){return l[0]!=='book.html';});
var bookCurrent=page==='book.html'?' aria-current="page"':'';
menu.innerHTML=closeBtn+title+'<nav aria-label="Main"><ul>'+textLinks.map(item).join('')+'</ul><a class="btn menu-book" href="'+href('book.html')+'"'+bookCurrent+'>Book your session</a></nav>';
}else{
menu.innerHTML=closeBtn+title+'<nav aria-label="Main"><ul>'+links.map(item).join('')+'</ul></nav>';
}
var backdrop=null;
if(variant==='b'){
backdrop=document.createElement('div');
backdrop.className='menu-backdrop';
backdrop.setAttribute('hidden','');
document.body.appendChild(backdrop);
}
document.body.appendChild(menu);

function syncHeaderHeight(){
var header=document.getElementById('site-header');
if(header)document.documentElement.style.setProperty('--header-h',Math.ceil(header.getBoundingClientRect().height)+'px');
}
syncHeaderHeight();
window.addEventListener('resize',syncHeaderHeight);
var toggle=h?h.querySelector('.menu-toggle'):null;
var close=menu.querySelector('.menu-close');
var lastFocus=null;

function focusable(){
return Array.prototype.slice.call(menu.querySelectorAll('a[href],button:not([disabled])'));
}
function setInert(on){
['main','site-footer'].forEach(function(id){
var el=document.getElementById(id);
if(el)el.inert=on;
});
}
function openMenu(){
if(menu.classList.contains('is-open'))return;
syncHeaderHeight();
lastFocus=document.activeElement;
menu.classList.add('is-open');
menu.setAttribute('aria-hidden','false');
if(backdrop){backdrop.removeAttribute('hidden');backdrop.classList.add('is-open');}
document.body.classList.add('menu-open');
if(toggle){toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Close menu');}
setInert(true);
menu.setAttribute('tabindex','-1');
requestAnimationFrame(function(){
requestAnimationFrame(function(){
var list=focusable();
(close||list[0]||menu).focus();
});
});
}
function closeMenu(){
if(!menu.classList.contains('is-open'))return;
menu.classList.remove('is-open');
menu.setAttribute('aria-hidden','true');
if(backdrop){backdrop.classList.remove('is-open');backdrop.setAttribute('hidden','');}
document.body.classList.remove('menu-open');
if(toggle){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open menu');}
setInert(false);
if(lastFocus&&typeof lastFocus.focus==='function')lastFocus.focus();
else if(toggle)toggle.focus();
}
if(toggle)toggle.addEventListener('click',function(){
if(menu.classList.contains('is-open'))closeMenu();else openMenu();
});
if(close)close.addEventListener('click',closeMenu);
if(backdrop)backdrop.addEventListener('click',closeMenu);
menu.addEventListener('click',function(e){
if(variant==='a'&&e.target===menu)closeMenu();
});
document.addEventListener('keydown',function(e){
if(!menu.classList.contains('is-open'))return;
if(e.key==='Escape'){e.preventDefault();closeMenu();return;}
if(e.key!=='Tab')return;
var list=focusable();
if(!list.length)return;
var first=list[0],last=list[list.length-1];
var inMenu=menu.contains(document.activeElement);
if(!inMenu){e.preventDefault();(e.shiftKey?last:first).focus();return;}
if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
});

var s=document.getElementById('purpose');
if(s){var p=params.get('purpose');if(p){for(var i=0;i<s.options.length;i++)if(s.options[i].value.toLowerCase()===p.toLowerCase())s.selectedIndex=i;}}
var n=document.getElementById('next');
if(n)n.value=location.href.split('?')[0].replace(/[^/]*$/,'')+'thanks.html';
})();
