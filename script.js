document.getElementById('enter').onclick=()=>{document.getElementById('gate').classList.add('gone');window.scrollTo({top:0,behavior:'smooth'})};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>io.observe(x));
const song=document.getElementById('song'),btn=document.getElementById('music');

song.addEventListener('error',()=>{
  btn.title='No music.mp3 file found. Add one beside index.html to enable the soundtrack.';
  btn.classList.remove('on');
});

btn.onclick=async()=>{
  if(song.paused){
    try{
      await song.play();
      btn.classList.add('on');
      btn.title='Pause background music';
    }catch(e){
      btn.title='No music.mp3 file found. Add one beside index.html to enable the soundtrack.';
      btn.classList.remove('on');
    }
  }else{
    song.pause();
    btn.classList.remove('on');
    btn.title='Play background music';
  }
};

// Interactive photo constellation and full-screen memory viewer
const stage=document.getElementById('orbitStage');
const cards=[...document.querySelectorAll('.memory-card')];
const lightbox=document.getElementById('lightbox');
const lbImage=document.getElementById('lightboxImage');
const lbCaption=document.getElementById('lightboxCaption');
function closeMemory(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true')}
cards.forEach(card=>card.addEventListener('click',()=>{lbImage.src=card.dataset.photo;lbCaption.textContent=card.dataset.caption;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false')}));
document.getElementById('lightboxClose').addEventListener('click',closeMemory);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeMemory()});
addEventListener('keydown',e=>{if(e.key==='Escape')closeMemory()});
if(stage && matchMedia('(hover:hover)').matches){stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;cards.forEach((card,i)=>{const base=[-11,9,8,-9,3][i];card.style.marginLeft=(px*14)+'px';card.style.marginTop=(py*12)+'px';card.style.setProperty('--pointer-tilt',(px*5)+'deg')})});stage.addEventListener('pointerleave',()=>cards.forEach(card=>{card.style.margin='0'}))}

// Open the sealed personal letter
const envelopeEl=document.getElementById('envelope');
const letterModal=document.getElementById('letterModal');
function showLetter(){envelopeEl.classList.add('open');setTimeout(()=>{letterModal.classList.add('open');letterModal.setAttribute('aria-hidden','false')},450)}
function hideLetter(){letterModal.classList.remove('open');letterModal.setAttribute('aria-hidden','true')}
document.getElementById('openLetter').addEventListener('click',showLetter);
envelopeEl.addEventListener('click',showLetter);
document.getElementById('closeLetter').addEventListener('click',hideLetter);
letterModal.addEventListener('click',e=>{if(e.target===letterModal)hideLetter()});
addEventListener('keydown',e=>{if(e.key==='Escape')hideLetter()});

const c=document.getElementById('sky'),x=c.getContext('2d');let pts=[];function size(){c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);pts=Array.from({length:Math.min(140,Math.floor(innerWidth/7))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.4+.2,a:Math.random(),v:Math.random()*.008+.002}))}function paint(){x.clearRect(0,0,innerWidth,innerHeight);for(const p of pts){p.a+=p.v;if(p.a>1||p.a<.12)p.v*=-1;x.beginPath();x.arc(p.x,p.y,p.r,0,Math.PI*2);x.fillStyle=`rgba(255,225,242,${p.a})`;x.fill()}requestAnimationFrame(paint)}addEventListener('resize',size);size();paint();
