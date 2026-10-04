// ── VENTOS MODERNOS — controles de toque para celular e tablet ─────────
// Só é ativado em telas de toque. Traduz os toques em eventos de teclado,
// de modo que o jogo continua a ler as mesmas teclas (setas, ENTER, 1 2 3).
(function(){
  'use strict';
  const touch=('ontouchstart' in window)||navigator.maxTouchPoints>0||
              (window.matchMedia&&matchMedia('(pointer:coarse)').matches);
  if(!touch)return;
  if(/creditos\.html$/.test(location.pathname))return;  // página de texto, rolagem normal
  window.VM_TOUCH=true;

  const ROOT=new URL('.',document.currentScript.src).href;
  const here=location.href.split('#')[0].split('?')[0];
  const isHub=here===ROOT||here===ROOT+'index.html';
  const isFinal=/final\.html$/.test(here);
  const isStage=!isHub&&!isFinal;

  // ── Eventos sintéticos de teclado ────────────────────────────────────
  const KEYS={ArrowUp:'ArrowUp',ArrowDown:'ArrowDown',ArrowLeft:'ArrowLeft',
    ArrowRight:'ArrowRight',Enter:'Enter',Space:' ',Escape:'Escape',
    Digit1:'1',Digit2:'2',Digit3:'3'};
  const down=new Set();
  function send(type,code){
    if(type==='keydown'){if(down.has(code))return;down.add(code);}
    else{if(!down.has(code))return;down.delete(code);}
    window.dispatchEvent(new KeyboardEvent(type,{code,key:KEYS[code]||code,bubbles:true,cancelable:true}));
  }
  function wakeAudio(){
    try{if(typeof AC!=='undefined'&&AC&&AC.state==='suspended')AC.resume();}catch(e){}
  }

  // ── Estilos ──────────────────────────────────────────────────────────
  const css=`
  html.vm-touch,html.vm-touch body{overscroll-behavior:none;touch-action:manipulation;
    -webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
  html.vm-touch #sub{display:none}
  html.vm-touch body{justify-content:flex-start;padding-top:max(8px,env(safe-area-inset-top))}
  html.vm-touch #c{width:min(98vw,1280px)}
  #vmt{position:fixed;inset:0;pointer-events:none;z-index:50;font-family:'Press Start 2P',monospace}
  #vmt .z{position:absolute;pointer-events:auto;touch-action:none}
  #vmt-pad{left:calc(14px + env(safe-area-inset-left));bottom:calc(18px + env(safe-area-inset-bottom));
    width:144px;height:144px;border-radius:50%;
    background:radial-gradient(circle,rgba(255,240,200,.06) 0 30%,rgba(255,240,200,.10) 31% 100%);
    border:2px solid rgba(220,190,120,.35)}
  #vmt-pad i{position:absolute;width:0;height:0;border:11px solid transparent;opacity:.55}
  #vmt-pad .u{left:61px;top:10px;border-bottom:14px solid #e8d8a0;border-top:0}
  #vmt-pad .d{left:61px;bottom:10px;border-top:14px solid #e8d8a0;border-bottom:0}
  #vmt-pad .l{top:61px;left:10px;border-right:14px solid #e8d8a0;border-left:0}
  #vmt-pad .r{top:61px;right:10px;border-left:14px solid #e8d8a0;border-right:0}
  #vmt-pad .on{opacity:1}
  #vmt-knob{position:absolute;left:50%;top:50%;width:46px;height:46px;margin:-23px 0 0 -23px;
    border-radius:50%;background:rgba(232,216,160,.22);border:2px solid rgba(232,216,160,.45)}
  #vmt .b{display:flex;align-items:center;justify-content:center;border-radius:50%;
    color:#f0e0b0;background:rgba(40,30,16,.55);border:2px solid rgba(220,190,120,.55);
    font-size:12px;text-shadow:0 1px 0 #000}
  #vmt .b.on{background:rgba(220,180,90,.45)}
  #vmt-a{right:calc(20px + env(safe-area-inset-right));bottom:calc(58px + env(safe-area-inset-bottom));
    width:72px;height:72px;font-size:16px}
  #vmt-n{right:calc(14px + env(safe-area-inset-right));bottom:calc(8px + env(safe-area-inset-bottom));
    display:flex;gap:8px}
  #vmt-n .b{position:static;width:40px;height:40px}
  #vmt-h{right:calc(22px + env(safe-area-inset-right));bottom:calc(150px + env(safe-area-inset-bottom));
    width:34px;height:34px;font-size:13px}
  #vmt-a small{position:absolute;bottom:-14px;font-size:6px;color:rgba(232,216,160,.6)}
  @media (orientation:landscape){
    html.vm-touch body{justify-content:center;padding-top:0}
    html.vm-touch #c{width:min(calc(100vw - 340px),calc((100vh - 12px)*16/9))}
  }
  @media (orientation:portrait){
    html.vm-touch #vmt-hint{display:block}
  }
  #vmt-hint{display:none;position:fixed;left:0;right:0;top:calc(min(98vw,1280px)*9/16 + 22px);
    text-align:center;font-size:7px;line-height:1.9;color:#6a5a40;pointer-events:none;padding:0 16px}
  `;
  const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  document.documentElement.classList.add('vm-touch');

  // ── Montagem dos controles ───────────────────────────────────────────
  const ui=document.createElement('div');ui.id='vmt';
  ui.innerHTML=
    '<div id="vmt-pad" class="z"><i class="u"></i><i class="d"></i><i class="l"></i><i class="r"></i><div id="vmt-knob"></div></div>'+
    '<div id="vmt-a" class="z b">A<small>'+(isStage?'agir':'ok')+'</small></div>'+
    (isStage?'<div id="vmt-n" class="z"><div class="b" data-k="Digit1">1</div><div class="b" data-k="Digit2">2</div><div class="b" data-k="Digit3">3</div></div>':'')+
    (!isHub?'<div id="vmt-h" class="z b" title="Voltar ao início">⌂</div>':'')+
    '<div id="vmt-hint">'+(isStage
      ?'Direcional: andar e escolher opções<br>A: interagir, avançar e confirmar<br>1 2 3: responder e classificar'
      :isHub?'Direcional: escolher capítulo · A: começar<br>Também é possível tocar no capítulo'
      :'A: voltar ao início')+'</div>';
  document.body.appendChild(ui);

  // ── Direcional analógico (8 direções) ────────────────────────────────
  const pad=document.getElementById('vmt-pad'),knob=document.getElementById('vmt-knob');
  const arrows={ArrowUp:pad.querySelector('.u'),ArrowDown:pad.querySelector('.d'),
                ArrowLeft:pad.querySelector('.l'),ArrowRight:pad.querySelector('.r')};
  let padId=null,held=new Set();
  function setDirs(next){
    for(const k of held)if(!next.has(k)){send('keyup',k);arrows[k].classList.remove('on');}
    for(const k of next)if(!held.has(k)){send('keydown',k);arrows[k].classList.add('on');}
    held=next;
  }
  function padMove(e){
    const r=pad.getBoundingClientRect();
    let dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);
    const d=Math.hypot(dx,dy),max=r.width/2-23;
    const k=d>max?max/d:1;
    knob.style.transform=`translate(${dx*k}px,${dy*k}px)`;
    const next=new Set();
    if(d>14){
      const a=Math.atan2(dy,dx)*180/Math.PI;           // -180..180, 0 = direita
      if(a>-67.5&&a<67.5)next.add('ArrowRight');
      if(a>112.5||a<-112.5)next.add('ArrowLeft');
      if(a>22.5&&a<157.5)next.add('ArrowDown');
      if(a<-22.5&&a>-157.5)next.add('ArrowUp');
    }
    setDirs(next);
  }
  function padEnd(e){
    if(e.pointerId!==padId)return;
    padId=null;knob.style.transform='';setDirs(new Set());wakeAudio();
  }
  pad.addEventListener('pointerdown',e=>{
    e.preventDefault();padId=e.pointerId;pad.setPointerCapture(e.pointerId);padMove(e);
  });
  pad.addEventListener('pointermove',e=>{if(e.pointerId===padId)padMove(e);});
  pad.addEventListener('pointerup',padEnd);
  pad.addEventListener('pointercancel',padEnd);

  // ── Botões ───────────────────────────────────────────────────────────
  function bindBtn(el,code,onTap){
    el.addEventListener('pointerdown',e=>{
      e.preventDefault();el.setPointerCapture(e.pointerId);el.classList.add('on');
      if(code)send('keydown',code);
    });
    const end=e=>{
      if(!el.classList.contains('on'))return;
      el.classList.remove('on');
      if(code)send('keyup',code);
      wakeAudio();
      if(onTap&&e.type==='pointerup')onTap();
    };
    el.addEventListener('pointerup',end);
    el.addEventListener('pointercancel',end);
  }
  bindBtn(document.getElementById('vmt-a'),'Enter');
  ui.querySelectorAll('#vmt-n .b').forEach(b=>bindBtn(b,b.dataset.k));
  const home=document.getElementById('vmt-h');
  if(home)bindBtn(home,null,()=>{location.href=ROOT+'index.html';});

  // O áudio só pode começar depois de um toque completo (regra dos navegadores)
  window.addEventListener('pointerup',wakeAudio,{passive:true});
  window.addEventListener('touchend',wakeAudio,{passive:true});
  // Evita o menu de contexto de toque longo sobre os controles
  ui.addEventListener('contextmenu',e=>e.preventDefault());
  // Ao sair da aba, solta tudo para o personagem não andar sozinho
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){setDirs(new Set());[...down].forEach(k=>send('keyup',k));}
  });
})();
