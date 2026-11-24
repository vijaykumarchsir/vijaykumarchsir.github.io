(function(){
var page=location.pathname.split('/').pop()||'index.html';
if(page==='lantern.html')page='index.html';
var links=[
['index.html','The English Lantern'],
['about.html','About'],
['resources.html','Resources'],
['writing.html','My Writings for Students'],
['feedback.html','Student Feedback'],
['book.html','Book your session']
];
function item(l){
return '<li><a href="'+l[0]+'"'+(l[0]===page?' aria-current="page"':'')+'>'+l[1]+'</a></li>';
}
var sub='<a class="btn" href="https://substack.com/@vkcsir" rel="noopener" target="_blank">Subscribe on Substack</a>';
var h=document.getElementById('site-header');
if(h)h.innerHTML='<div class="wrap bar"><nav aria-label="Main"><ul>'+links.map(item).join('')+'</ul></nav><a class="identity" href="index.html"><img class="identity-photo" src="images/portrait.jpg" width="640" height="641" alt="Vijay Kumar Ch"><span class="identity-name">Vijay Kumar Ch</span></a></div>';
var f=document.getElementById('site-footer');
if(f)f.innerHTML='<div class="wrap"><nav aria-label="Footer"><ul>'+links.map(item).join('')+'</ul></nav><p>'+sub+'</p><p><a href="mailto:vijaykumarchsir@gmail.com">vijaykumarchsir@gmail.com</a> · <a href="https://wa.me/916302479339">WhatsApp +91 63024 79339</a></p><p>&copy; '+new Date().getFullYear()+' Vijay Kumar Ch</p></div>';
var s=document.getElementById('purpose');
if(s){var p=new URLSearchParams(location.search).get('purpose');if(p){for(var i=0;i<s.options.length;i++)if(s.options[i].value.toLowerCase()===p.toLowerCase())s.selectedIndex=i;}}
var n=document.getElementById('next');
if(n)n.value=location.href.split('?')[0].replace(/[^/]*$/,'')+'thanks.html';
})();
