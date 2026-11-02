(function(){
var page=location.pathname.split('/').pop()||'index.html';
var links=[
['index.html','Home'],
['approach.html','Approach'],
['resources.html','Resources'],
['writing.html','Writing'],
['feedback.html','Feedback'],
['feedback-submit.html','Submit feedback'],
['book.html','Book']
];
function item(l){
return '<li><a href="'+l[0]+'"'+(l[0]===page?' aria-current="page"':'')+'>'+l[1]+'</a></li>';
}
var h=document.getElementById('site-header');
if(h)h.innerHTML='<div class="wrap bar"><a class="brand" href="index.html">Vijay Kumar Ch</a><nav aria-label="Main"><ul>'+links.map(item).join('')+'</ul></nav></div>';
var f=document.getElementById('site-footer');
if(f)f.innerHTML='<div class="wrap"><nav aria-label="Footer"><ul>'+links.map(item).join('')+'</ul></nav><p>Mr Vijay Kumar Ch · English educator, Hyderabad · CBSE · ICSE · Cambridge</p><p><a href="mailto:vijaykumarchsir@gmail.com">vijaykumarchsir@gmail.com</a> · <a href="https://wa.me/916302479339">WhatsApp +91 63024 79339</a></p><p>&copy; '+new Date().getFullYear()+' Vijay Kumar Ch</p></div>';
var s=document.getElementById('purpose');
if(s){var p=new URLSearchParams(location.search).get('purpose');if(p){for(var i=0;i<s.options.length;i++)if(s.options[i].value.toLowerCase()===p.toLowerCase())s.selectedIndex=i;}}
var n=document.getElementById('next');
if(n)n.value=location.href.split('?')[0].replace(/[^/]*$/,'')+'thanks.html';
})();
