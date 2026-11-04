document.getElementById('enter').onclick=()=>{document.getElementById('gate').classList.add('gone');window.scrollTo({top:0,behavior:'smooth'})};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>io.observe(x));

const revealImage = document.querySelector('.reveal-image-wrap');
const unlockModal = document.getElementById('unlockModal');
const unlockInput = document.getElementById('unlockInput');
const unlockSubmit = document.querySelector('.unlock-submit');
const unlockCancel = document.querySelector('.unlock-cancel');

if(revealImage){
  const unlockButton = revealImage.querySelector('.unlock-button');

  const openUnlockModal = () => {
    if(!unlockModal) return;
    unlockModal.classList.add('open');
    unlockModal.setAttribute('aria-hidden','false');
    if(unlockInput){
      unlockInput.value = '';
      setTimeout(() => unlockInput.focus(), 50);
    }
  };

  const closeUnlockModal = () => {
    if(!unlockModal) return;
    unlockModal.classList.remove('open');
    unlockModal.setAttribute('aria-hidden','true');
    if(unlockInput) unlockInput.value = '';
  };

  const openUnlockedViewer = () => {
    if(!lightbox || !lbImage) return;
    const img = revealImage.querySelector('img');
    if(!img) return;
    lbImage.src = img.currentSrc || img.src;
    lbCaption.textContent = 'A dreamy little surprise';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  };

  const unlockPhoto = () => {
    if(!unlockInput) return;
    const enteredPassword = unlockInput.value.trim();
    if(enteredPassword === '2706'){
      revealImage.classList.remove('locked');
      revealImage.classList.add('unlocked');
      if(unlockButton) unlockButton.remove();
      closeUnlockModal();
      openUnlockedViewer();
      return;
    }
    unlockInput.value = '';
    unlockInput.focus();
    alert('Incorrect password. Try again.');
  };

  revealImage.addEventListener('click', (event) => {
    if(revealImage.classList.contains('locked') && (!unlockButton || event.target === unlockButton || event.target === revealImage || event.target.tagName === 'IMG')){
      openUnlockModal();
    }
    if(revealImage.classList.contains('unlocked') && (event.target === revealImage || event.target.tagName === 'IMG')){
      openUnlockedViewer();
    }
  });

  if(unlockButton){
    unlockButton.addEventListener('click', (event) => {
      event.stopPropagation();
      openUnlockModal();
    });
  }

  if(unlockSubmit){
    unlockSubmit.addEventListener('click', unlockPhoto);
  }

  if(unlockCancel){
    unlockCancel.addEventListener('click', closeUnlockModal);
  }

  if(unlockInput){
    unlockInput.addEventListener('keydown', (event) => {
      if(event.key === 'Enter') unlockPhoto();
    });
  }

  unlockModal?.addEventListener('click', (event) => {
    if(event.target === unlockModal) closeUnlockModal();
  });
}

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
const letterParagraphs=[...document.querySelectorAll('.personal-message p')];
const letterChime=document.getElementById('letterChime');

function revealLetterText(){
  letterParagraphs.forEach((paragraph,index)=>{
    setTimeout(()=>paragraph.classList.add('show'), index * 120);
  });
}

function sprinkleRosePetals(){
  let container=document.getElementById('petalSprinkle');
  if(!container){
    container=document.createElement('div');
    container.id='petalSprinkle';
    container.className='petal-sprinkle';
    document.body.appendChild(container);
  }
  container.innerHTML='';
  const petalCount=26;
  for(let i=0;i<petalCount;i++){
    const petal=document.createElement('span');
    petal.className='petal';
    const x=45+Math.random()*18-9;
    const y=38+Math.random()*20-10;
    const driftX=(Math.random()*200)-100;
    const driftY=110+Math.random()*180;
    const spin=(Math.random()*960)-480;
    const duration=1400+Math.random()*900;
    petal.style.setProperty('--x', `${x}%`);
    petal.style.setProperty('--y', `${y}%`);
    petal.style.setProperty('--drift-x', `${driftX}px`);
    petal.style.setProperty('--drift-y', `${driftY}px`);
    petal.style.setProperty('--spin', `${spin}deg`);
    petal.style.setProperty('--duration', `${duration}ms`);
    container.appendChild(petal);
  }
  setTimeout(()=>{container.innerHTML='';},2200);
}

function spawnHeartTrail(x,y){
  const trailContainer=document.getElementById('heartTrail') || (()=>{
    const el=document.createElement('div');
    el.id='heartTrail';
    el.className='heart-trail';
    document.body.appendChild(el);
    return el;
  })();
  const heart=document.createElement('span');
  heart.className='floating-heart';
  heart.textContent='♡';
  const size=12+Math.random()*18;
  heart.style.setProperty('--x', `${x}px`);
  heart.style.setProperty('--y', `${y}px`);
  heart.style.setProperty('--size', `${size}px`);
  heart.style.setProperty('--drift-x', `${(Math.random()*40)-20}px`);
  heart.style.setProperty('--drift-y', `${-30-(Math.random()*90)}px`);
  trailContainer.appendChild(heart);
  setTimeout(()=>heart.remove(),1100);
}

let lastHeartTrail=0;
addEventListener('pointermove',e=>{
  const now=Date.now();
  if(now-lastHeartTrail>45){
    spawnHeartTrail(e.clientX,e.clientY);
    lastHeartTrail=now;
  }
});

function showLetter(){
  envelopeEl.classList.add('open');
  sprinkleRosePetals();
  letterParagraphs.forEach(p=>p.classList.remove('show'));
  revealLetterText();
  if(letterChime){
    letterChime.currentTime=0;
    letterChime.play().catch(()=>{});
  }
  setTimeout(()=>{letterModal.classList.add('open');letterModal.setAttribute('aria-hidden','false')},450)
}
function hideLetter(){letterModal.classList.remove('open');letterModal.setAttribute('aria-hidden','true')}
document.getElementById('openLetter').addEventListener('click',showLetter);
envelopeEl.addEventListener('click',showLetter);
document.getElementById('closeLetter').addEventListener('click',hideLetter);
letterModal.addEventListener('click',e=>{if(e.target===letterModal)hideLetter()});
addEventListener('keydown',e=>{if(e.key==='Escape')hideLetter()});

const c=document.getElementById('sky'),x=c.getContext('2d');let pts=[];function size(){c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);pts=Array.from({length:Math.min(140,Math.floor(innerWidth/7))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.4+.2,a:Math.random(),v:Math.random()*.008+.002}))}function paint(){x.clearRect(0,0,innerWidth,innerHeight);for(const p of pts){p.a+=p.v;if(p.a>1||p.a<.12)p.v*=-1;x.beginPath();x.arc(p.x,p.y,p.r,0,Math.PI*2);x.fillStyle=`rgba(255,225,242,${p.a})`;x.fill()}requestAnimationFrame(paint)}addEventListener('resize',size);size();paint();
