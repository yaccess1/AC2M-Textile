(function(){
"use strict";
const DATA = window.AC2M_DATA;
const LOGO = window.AC2M_LOGO || "assets/logo-monogramme.png";
const CALAGE = new URLSearchParams(location.search).has("calage");
const S = 0.6; // px par mm (poitrine ~55 cm = 330 px)
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s,r=document)=>r.querySelector(s);
const esc = s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* ---------- couleurs ---------- */
function rgb(h){h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h,16);return[n>>16&255,n>>8&255,n&255]}
function hex(a){return'#'+a.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('')}
function mix(a,b,t){const x=rgb(a),y=rgb(b);return hex(x.map((v,i)=>v+(y[i]-v)*t))}
function shade(c,t){return t<0?mix(c,'#000000',-t):mix(c,'#ffffff',t)}
function lum(c){const[r,g,b]=rgb(c).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*r+.7152*g+.0722*b}

/* ---------- vêtements ---------- */
const MIR = 'transform="matrix(-1 0 0 1 600 0)"';
const G = {
  longSleeve:"M152 176 C 124 184 106 214 99 262 L 80 548 C 94 556 112 559 128 558 L 150 318 C 152 290 153 262 152 240 Z",
  longCuff:"M80 548 C 94 556 112 559 128 558 L 126 604 C 110 606 92 603 77 596 Z",
  shortSleeve:"M152 176 C 128 184 108 204 94 236 L 76 300 C 96 312 116 318 132 320 L 150 262 Z",
  shortBand:"M76 300 C 96 312 116 318 132 320 L 129 333 C 112 331 92 325 71 313 Z",
  sweatBody:"M152 176 C 178 162 204 152 230 144 C 252 158 348 158 370 144 C 396 152 422 162 448 176 C 450 230 452 300 453 360 C 455 450 457 530 458 598 L 142 598 C 143 530 145 450 147 360 C 148 300 150 230 152 176 Z",
  sweatHem:"M142 598 L458 598 L456 648 C 352 654 248 654 144 648 Z",
  teeBody:"M152 176 C 178 162 204 152 232 144 C 252 158 348 158 368 144 C 396 152 422 162 448 176 C 450 240 450 300 451 360 C 453 450 455 540 456 628 C 352 636 248 636 144 628 C 145 540 147 450 149 360 C 150 300 150 240 152 176 Z"
};
function isLong(t){return t!=='tee'&&t!=='polo'}
function garment(p, view, color, opt={}){
  const t=p.type, long=isLong(t), c=color;
  const dk=shade(c,-.14), dk2=shade(c,-.28), lt=shade(c,.12);
  const seam=`stroke="${shade(c,-.34)}" stroke-opacity=".55" stroke-width="1.2" stroke-dasharray="3 2.6" fill="none"`;
  const body = long?G.sweatBody:G.teeBody;
  const sl = long?G.longSleeve:G.shortSleeve, cuff = long?G.longCuff:G.shortBand;
  let back='', front='', det='', clip='';
  // capuche (arrière-plan)
  if(t==='hoodie'){
    if(view==='front'){
      back+=`<path d="M222 152 C 200 100 220 46 300 36 C 380 46 400 100 378 152 Z" fill="${shade(c,-.07)}"/><path d="M222 152 C 200 100 220 46 300 36 C 380 46 400 100 378 152 Z" fill="url(#gBody)"/>`;
      clip+=`<path d="M222 152 C 200 100 220 46 300 36 C 380 46 400 100 378 152 Z"/>`;
    }
  }
  // manches
  front+=`<path d="${sl}" fill="${c}"/><path d="${sl}" fill="url(#gSleeve)"/>`;
  front+=`<g ${MIR}><path d="${sl}" fill="${c}"/><path d="${sl}" fill="url(#gSleeve)"/></g>`;
  front+=`<path d="${cuff}" fill="${dk}"/><path d="${cuff}" fill="url(#pRib)"/><g ${MIR}><path d="${cuff}" fill="${dk}"/><path d="${cuff}" fill="url(#pRib)"/></g>`;
  clip+=`<path d="${sl}"/><path d="${cuff}"/><g ${MIR}><path d="${sl}"/><path d="${cuff}"/></g>`;
  // corps
  front+=`<path d="${body}" fill="${c}"/>`;
  clip+=`<path d="${body}"/>`;
  if(long){front+=`<path d="${G.sweatHem}" fill="${dk}"/><path d="${G.sweatHem}" fill="url(#pRib)"/>`;clip+=`<path d="${G.sweatHem}"/>`}
  // plis doux
  det+=`<g filter="url(#fFold)" opacity=".5"><path d="M168 320 C 196 352 204 408 196 462" stroke="#000" stroke-opacity=".16" stroke-width="12" fill="none"/><path d="M432 320 C 404 352 396 408 404 462" stroke="#000" stroke-opacity=".16" stroke-width="12" fill="none"/><path d="M250 560 C 280 548 320 548 350 560" stroke="#fff" stroke-opacity=".12" stroke-width="10" fill="none"/></g>`;
  // coutures
  const arm = long?"M152 176 C 155 212 154 246 150 318":"M152 176 C 154 206 153 236 150 262";
  det+=`<path d="${arm}" ${seam}/><path d="${arm}" ${seam} ${MIR}/>`;
  det+=`<path d="M232 144 L152 176" ${seam}/><path d="M368 144 L448 176" ${seam}/>`;
  if(!long){det+=`<path d="M146 618 C 250 626 350 626 454 618" ${seam}/><path d="M146 622 C 250 630 350 630 454 622" ${seam}/>`}
  // encolures & détails
  if(view==='front'){
    if(t==='hoodie'){
      const rim="M300 202 C 282 192 260 172 250 148 C 244 104 266 70 300 66 C 334 70 356 104 350 148 C 340 172 318 192 300 202";
      det+=`<path d="${rim} Z" fill="${dk2}"/><path d="${rim} Z" fill="url(#gHoodIn)"/>`;
      det+=`<path d="${rim}" stroke="${c}" stroke-width="13" fill="none" stroke-linejoin="round"/><path d="${rim}" stroke="url(#gBody)" stroke-width="13" fill="none" opacity=".6"/><path d="${rim}" ${seam} transform="translate(0 0)"/>`;
      det+=`<path d="M300 202 L300 214" stroke="${shade(c,-.25)}" stroke-width="1.4"/>`;
      const cord=shade(c,lum(c)<.08?.35:-.2);
      det+=`<path d="M283 182 C 282 214 281 240 278 272" stroke="${cord}" stroke-width="4.5" stroke-linecap="round" fill="none"/><path d="M317 182 C 318 214 319 240 322 272" stroke="${cord}" stroke-width="4.5" stroke-linecap="round" fill="none"/><rect x="274.5" y="268" width="7" height="14" rx="2" fill="${shade(cord,-.3)}" transform="rotate(4 278 275)"/><rect x="318.5" y="268" width="7" height="14" rx="2" fill="${shade(cord,-.3)}" transform="rotate(-4 322 275)"/>`;
      det+=`<path d="M196 440 C 250 434 350 434 404 440 C 414 482 426 532 438 576 L 162 576 C 174 532 186 482 196 440 Z" fill="${shade(c,-.03)}"/><path d="M196 440 C 250 434 350 434 404 440 C 414 482 426 532 438 576 L 162 576 C 174 532 186 482 196 440 Z" fill="url(#gBody)"/><path d="M196 440 C 250 434 350 434 404 440 C 414 482 426 532 438 576 L 162 576 C 174 532 186 482 196 440 Z" fill="url(#gVert)"/><path d="M196 440 C 250 434 350 434 404 440 C 414 482 426 532 438 576 L 162 576 C 174 532 186 482 196 440 Z" ${seam}/><path d="M196 440 C 188 482 176 530 162 576" stroke="${dk2}" stroke-opacity=".5" stroke-width="2.2" fill="none"/><path d="M404 440 C 412 482 424 530 438 576" stroke="${dk2}" stroke-opacity=".5" stroke-width="2.2" fill="none"/>`;
    } else if(t==='zip'){
      det+=`<path d="M232 142 C 250 128 350 128 368 142 L 366 172 C 346 184 254 184 234 172 Z" fill="${dk}"/><path d="M232 142 C 250 128 350 128 368 142 L 366 172 C 346 184 254 184 234 172 Z" fill="url(#pRib)"/>`;
      det+=`<path d="M300 132 L300 300" stroke="#7b7c76" stroke-width="3.2"/><path d="M300 132 L300 300" stroke="#b9bab3" stroke-width="1.2" stroke-dasharray="1.6 1.6"/><rect x="295.5" y="176" width="9" height="20" rx="3" fill="#8a8b85"/><path d="M296 150 L296 300 M304 150 L304 300" ${seam}/>`;
    } else if(t==='polo'){
      det+=`<path d="M288 186 L312 186 L312 292 L288 292 Z" fill="${shade(c,-.03)}"/><path d="M288 186 L288 292 L312 292 L312 186" ${seam}/><circle cx="300" cy="222" r="3.6" fill="${shade(c,-.2)}"/><circle cx="300" cy="262" r="3.6" fill="${shade(c,-.2)}"/>`;
      det+=`<path d="M232 140 C 256 128 344 128 368 140 L 382 164 C 352 176 322 186 304 198 L 296 198 C 278 186 248 176 218 164 Z" fill="${lt}"/><path d="M232 140 C 256 128 344 128 368 140 L 382 164 C 352 176 322 186 304 198 L 296 198 C 278 186 248 176 218 164 Z" ${seam}/><path d="M300 150 L300 198" stroke="${dk}" stroke-width="1.4"/>`;
    } else {
      const w = long?16:10;
      det+=`<path d="M232 144 C 250 196 350 196 368 144 C 346 136 254 136 232 144 Z" fill="${dk2}"/>`;
      det+=`<path d="M232 144 C 250 196 350 196 368 144" stroke="${dk}" stroke-width="${w}" fill="none"/><path d="M232 144 C 250 196 350 196 368 144" stroke="url(#pRib)" stroke-width="${w}" fill="none"/>`;
      if(t==='capri') det+=`<path d="M290 190 L310 190 L300 210 Z" fill="none" stroke="${shade(c,-.3)}" stroke-width="1.6"/>`;
    }
  } else {
    if(t==='hoodie'){
      det+=`<path d="M226 150 C 204 98 226 44 300 36 C 374 44 396 98 374 150 C 350 176 250 176 226 150 Z" fill="${shade(c,-.03)}"/><path d="M226 150 C 204 98 226 44 300 36 C 374 44 396 98 374 150 C 350 176 250 176 226 150 Z" fill="url(#gVert)"/><path d="M300 38 C 303 90 303 130 300 172" ${seam}/><path d="M226 150 C 250 176 350 176 374 150" stroke="#000" stroke-opacity=".12" stroke-width="3" fill="none"/>`;
      clip+=`<path d="M226 150 C 204 98 226 44 300 36 C 374 44 396 98 374 150 C 350 176 250 176 226 150 Z"/>`;
    } else if(t==='polo'){
      det+=`<path d="M232 140 C 256 128 344 128 368 140 L 372 158 C 346 150 254 150 228 158 Z" fill="${lt}"/><path d="M232 140 C 256 128 344 128 368 140 L 372 158 C 346 150 254 150 228 158 Z" ${seam}/>`;
    } else if(t==='zip'){
      det+=`<path d="M232 142 C 250 128 350 128 368 142 L 366 166 C 346 158 254 158 234 166 Z" fill="${dk}"/><path d="M232 142 C 250 128 350 128 368 142 L 366 166 C 346 158 254 158 234 166 Z" fill="url(#pRib)"/>`;
    } else {
      const w = long?14:9;
      det+=`<path d="M232 144 C 256 156 344 156 368 144" stroke="${dk}" stroke-width="${w}" fill="none"/><path d="M232 144 C 256 156 344 156 368 144" stroke="url(#pRib)" stroke-width="${w}" fill="none"/>`;
    }
  }
  const shading=`<path d="${body}" fill="url(#gBody)"/><path d="${body}" fill="url(#gVert)"/>`;
  return {back, front, shading, det, clip};
}
function photoOf(p,ci){const code=p.colors[ci][0];return p.photos&&(p.photos[code]||p.photos.default)}
function cardVisual(p,ci){
  const alt=esc(p.model+', '+p.colors[ci][1]);
  const ph=photoOf(p,ci); if(ph) return `<img class="photo" src="${esc(ph)}" alt="${alt}" loading="lazy">`;
  const mk=autoMock(p,ci,'front'); if(mk) return `<img class="photo mock" src="${esc(mk)}" alt="${alt}" loading="lazy">`;
  return garmentSVG(p,p.colors[ci][2]);
}
// Photos de maquette : champ "mockups" dans data.js, ou détection automatique
// des fichiers préparés avec outils/preparer-photo.html :
// assets/maquettes/<réf>-<code couleur>-face.webp (ou -dos, ou .png)
const MOCKS={};
function autoMock(p,ci,view){
  const base=`assets/maquettes/${p.sku.toLowerCase()}-${p.colors[ci][0]}-${view==='back'?'dos':'face'}`;
  if(base in MOCKS) return MOCKS[base];
  MOCKS[base]=null;
  const tryExt=list=>{if(!list.length)return;const url=base+'.'+list[0];const im=new Image();
    im.onload=()=>{MOCKS[base]=url;
      if(state.p===p&&$('#pv').classList.contains('open'))renderStage();
      // la carte de la collection affiche aussi la photo si elle montre ce coloris
      if(view!=='back'){const shot=document.querySelector(`[data-shot="${p.sku}"]`);if(shot&&+shot.dataset.ci===ci)swapCard(shot,p,ci)}};
    im.onerror=()=>tryExt(list.slice(1));im.src=url};
  tryExt(['webp','png','jpg']);
  return null;
}
function mockupOf(p,ci,view){const code=p.colors[ci][0];const m=p.mockups&&(p.mockups[code]||p.mockups.default);return (m&&m[view])||autoMock(p,ci,view)}
function garmentSVG(p,color,view='front'){
  const g=garment(p,view,color);
  return `<svg viewBox="40 20 520 650" aria-hidden="true"><g>${g.back}${g.front}${g.shading}${g.det}</g></svg>`;
}

/* ---------- zones ---------- */
function sleeveAxis(p,side){ // side 'md' (droite du porteur = gauche écran) | 'mg'
  const long=isLong(p.type);
  let a=long?[148,214]:[146,196], b=long?[100,548]:[106,314];
  const ov=p.zones&&p.zones[side]; if(ov&&ov.a&&ov.b) return {a:ov.a,b:ov.b,len:Math.hypot(ov.b[0]-ov.a[0],ov.b[1]-ov.a[1])};
  if(side==='mg'){const o=p.zones&&p.zones.md;if(o&&o.a&&o.b){a=o.a;b=o.b}a=[600-a[0],a[1]];b=[600-b[0],b[1]]}
  return {a,b,len:Math.hypot(b[0]-a[0],b[1]-a[1])};
}
function zoneGeom(p,pl,tech){
  const w=tech[3], h=tech[4];
  if(pl==='md'||pl==='mg'){
    const ax=sleeveAxis(p,pl), maxmm=Math.floor((ax.len-34)/S);
    const hh=Math.min(h,maxmm), limited=hh<h;
    const dx=ax.b[0]-ax.a[0], dy=ax.b[1]-ax.a[1], L=ax.len;
    const along=16+hh*S/2;
    const cx=ax.a[0]+dx/L*along, cy=ax.a[1]+dy/L*along;
    const rot=Math.atan2(-dx,dy)*180/Math.PI;
    return {cx,cy,rot,wmm:w,hmm:hh,limited,view:'front'};
  }
  const long=isLong(p.type);
  const hoodie=p.type==='hoodie';
  const ov=(p.zones&&p.zones[pl])||{};
  const top = ov.top!==undefined?ov.top:{pg:214,pd:214,face:hoodie?214:206,dos:hoodie?190:178}[pl];
  const cx= ov.cx!==undefined?ov.cx:{pg:374,pd:226,face:300,dos:300}[pl];
  let cy=top+h*S/2;
  if(ov.top!==undefined) return {cx,cy,rot:0,wmm:w,hmm:h,limited:false,view:pl==='dos'?'back':'front'};
  if(pl==='pg'||pl==='pd') cy=Math.max(cy,top+36);
  // face des capuches : rester au-dessus de la poche
  if(pl==='face'&&hoodie){const bottom=432;if(cy+h*S/2>bottom)cy=Math.max(top+h*S/2-(cy+h*S/2-bottom),bottom-h*S/2)}
  return {cx,cy,rot:0,wmm:w,hmm:h,limited:false,view:pl==='dos'?'back':'front'};
}

/* ---------- visuels (logo) ---------- */
let artSeq=0;
function loadArt(src,name,forceRemove){
  return new Promise((res,rej)=>{
    const im=new Image();
    im.onload=()=>{ try{
      const max=900; let w=im.naturalWidth||600, h=im.naturalHeight||600;
      const k=Math.min(1,max/Math.max(w,h)); w=Math.round(w*k); h=Math.round(h*k);
      const cv=document.createElement('canvas'); cv.width=w; cv.height=h;
      const cx=cv.getContext('2d',{willReadFrequently:true}); cx.drawImage(im,0,0,w,h);
      const d=cx.getImageData(0,0,w,h); let alphaPx=0;
      for(let i=3;i<d.data.length;i+=4) if(d.data[i]<250) alphaPx++;
      const hasAlpha=alphaPx>d.data.length/4*0.01;
      const art={id:++artSeq,name,w,h,orig:d,hasAlpha,removeWhite:forceRemove!==undefined?forceRemove:!hasAlpha,cache:{}};
      buildArt(art); res(art);
    }catch(err){rej(err)} };
    im.onerror=()=>rej(new Error('image'));
    im.src=src;
  });
}
function buildArt(art){
  const {w,h}=art; const src=art.orig.data; const out=new ImageData(w,h); const o=out.data;
  for(let i=0;i<src.length;i+=4){
    let r=src[i],g=src[i+1],b=src[i+2],a=src[i+3];
    if(art.removeWhite){
      const mn=Math.min(r,g,b), mx=Math.max(r,g,b);
      if(mx-mn<28){ const t=(mn-205)/(245-205); if(t>0){ a=Math.round(a*Math.max(0,1-t)); } }
    }
    o[i]=r;o[i+1]=g;o[i+2]=b;o[i+3]=a;
  }
  // recadrage sur le contenu
  let x0=w,y0=h,x1=0,y1=0;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){if(o[(y*w+x)*4+3]>16){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}}
  if(x1<x0){x0=0;y0=0;x1=w-1;y1=h-1}
  const cw=x1-x0+1, ch=y1-y0+1;
  const cv=document.createElement('canvas'); cv.width=cw; cv.height=ch;
  const c2=cv.getContext('2d'); const tmp=document.createElement('canvas'); tmp.width=w; tmp.height=h; tmp.getContext('2d').putImageData(out,0,0);
  c2.drawImage(tmp,x0,y0,cw,ch,0,0,cw,ch);
  art._rot=null; art.cw=cw; art.ch=ch; art.data=c2.getImageData(0,0,cw,ch); art.src=cv.toDataURL('image/png'); art.cache={};
  // couleur dominante
  let best=null; const cnt={};
  const dd=art.data.data; for(let i=0;i<dd.length;i+=16){ if(dd[i+3]<128)continue; const k=(dd[i]>>4)+','+(dd[i+1]>>4)+','+(dd[i+2]>>4); cnt[k]=(cnt[k]||0)+1; if(!best||cnt[k]>cnt[best])best=k }
  art.dominant = best? hex(best.split(',').map(v=>v*16+8)) : '#333333';
}
function artVariant(art,kind,arg){
  const key=kind+':'+arg; if(art.cache[key])return art.cache[key];
  const {cw,ch}=art; const d=new ImageData(new Uint8ClampedArray(art.data.data),cw,ch); const p=d.data;
  if(kind==='mono'){const [r,g,b]=rgb(arg);for(let i=0;i<p.length;i+=4){p[i]=r;p[i+1]=g;p[i+2]=b}}
  if(kind==='post'){
    const k=arg; const pts=[];
    for(let i=0;i<p.length;i+=4*Math.max(1,Math.floor(p.length/4/12000))){ if(p[i+3]>100) pts.push([p[i],p[i+1],p[i+2]]) }
    if(pts.length){
      let cents=[]; for(let j=0;j<k;j++) cents.push(pts[Math.floor((j+.5)*pts.length/k)].slice());
      for(let it=0;it<8;it++){
        const acc=cents.map(()=>[0,0,0,0]);
        for(const q of pts){let bi=0,bd=1e9;for(let j=0;j<k;j++){const c=cents[j];const dd=(q[0]-c[0])**2+(q[1]-c[1])**2+(q[2]-c[2])**2;if(dd<bd){bd=dd;bi=j}}const a=acc[bi];a[0]+=q[0];a[1]+=q[1];a[2]+=q[2];a[3]++}
        cents=cents.map((c,j)=>acc[j][3]?[acc[j][0]/acc[j][3],acc[j][1]/acc[j][3],acc[j][2]/acc[j][3]]:c);
      }
      for(let i=0;i<p.length;i+=4){ if(!p[i+3])continue; let bi=0,bd=1e9; for(let j=0;j<k;j++){const c=cents[j];const dd=(p[i]-c[0])**2+(p[i+1]-c[1])**2+(p[i+2]-c[2])**2;if(dd<bd){bd=dd;bi=j}} p[i]=cents[bi][0];p[i+1]=cents[bi][1];p[i+2]=cents[bi][2]; p[i+3]=p[i+3]>110?255:0 }
    }
  }
  const cv=document.createElement('canvas'); cv.width=cw; cv.height=ch; cv.getContext('2d').putImageData(d,0,0);
  return art.cache[key]=cv.toDataURL('image/png');
}

function rotArt(a){
  if(a._rot)return a._rot;
  const src=document.createElement('canvas');src.width=a.cw;src.height=a.ch;src.getContext('2d').putImageData(a.data,0,0);
  const cv=document.createElement('canvas');cv.width=a.ch;cv.height=a.cw;const c=cv.getContext('2d');
  c.translate(0,a.cw);c.rotate(-Math.PI/2);c.drawImage(src,0,0);
  const r={id:a.id+'r',name:a.name,cw:a.ch,ch:a.cw,data:c.getImageData(0,0,a.ch,a.cw),src:cv.toDataURL('image/png'),cache:{},dominant:a.dominant};
  return a._rot=r;
}
function artOf(m){return m.rot90?rotArt(m.art):m.art}
/* ---------- techniques ---------- */
const FAMS=[
  ['Impression',['print','dtg','dtg3d','hf']],
  ['Transfert',['transfer','flex','t3d']],
  ['Broderie',['emb','embq','emb3d','outline','patch','sequins']],
  ['Effets spéciaux',['emboss','embossT','strass','doming']]
];
const ESSENTIAL=['Impression textile','Transfert numérique','Broderie','Flex'];
const DESC={
  print:"Encres déposées directement dans la fibre, en aplats nets. Idéal pour les grands visuels, jusqu’à 3 couleurs.",
  dtg:"Impression numérique directe sur le textile : toutes les couleurs, les dégradés et les photos passent.",
  dtg3d:"Impression directe avec un léger relief qui se sent au toucher.",
  hf:"Marquage thermo-soudé haute fréquence, rendu net avec un effet gaufré brillant.",
  transfer:"Visuel imprimé en quadrichromie puis thermocollé : couleurs vives, finition lisse et légèrement satinée.",
  flex:"Film vinyle découpé et thermocollé, une seule couleur, rendu mat satiné très net.",
  t3d:"Transfert en relief, jusqu’à 2 couleurs, pour un logo qui ressort du tissu.",
  emb:"Fils cousus point par point : rendu premium, en léger relief, jusqu’à 4 couleurs de fil.",
  embq:"Broderie en toutes couleurs, pour les logos riches en nuances.",
  emb3d:"Broderie posée sur une mousse : un relief marqué, très visible.",
  outline:"Seul le contour du motif est brodé, d’un seul fil. Discret et élégant.",
  patch:"Votre logo brodé sur un écusson, puis cousu sur le vêtement.",
  sequins:"Broderie de sequins, un effet brillant qui accroche la lumière.",
  emboss:"Motif embossé dans le tissu, pour un relief ton sur ton.",
  embossT:"Transfert couleur combiné à un embossage en relief.",
  strass:"Pierres thermocollées qui dessinent votre motif, jusqu’à 2 couleurs.",
  doming:"Visuel recouvert d’une résine bombée et brillante."
};
const INKS=[['#FFFFFF','Blanc'],['#222222','Noir'],['#68704B','Kaki ac2m'],['#9A8A76','Brun ac2m'],['#C9B27C','Or clair']];
function colTxt(n){return n===0?'Toutes couleurs':(n===1?'1 couleur':`Jusqu’à ${n} couleurs`)}
function fmtTxt(f){return f==='XL'?'XL':(f==='Std'?'Standard':'')}
const PL_ORDER=['pd','face','pg','md','dos','mg'];

/* ---------- état ---------- */
const state={p:null,color:0,view:'front',pl:'face',showAll:false,marks:{},art:null,hoverTech:null,qty:{}};
let defaultArt=null;
function textArt(){ // visuel de secours si le logo ne peut pas être lu
  const cv=document.createElement('canvas');cv.width=600;cv.height=220;const c=cv.getContext('2d');
  c.fillStyle='#68704B';c.font='800 120px Montserrat, Arial, sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText('ac2m',300,115);
  return loadArt(cv.toDataURL('image/png'),'Votre logo',false);
}
const artReady=loadArt(LOGO,'Monogramme ac2m',false).catch(err=>{console.warn('Logo par défaut illisible, visuel de secours utilisé.',err);return textArt()}).then(a=>{defaultArt=a;return a});

/* ---------- engagement matières ---------- */
const LEAF='<svg class="leaf" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 19.5C4.5 10.6 10.4 4.8 20 4c-.3 9.8-6.3 15.5-15.5 15.5z" fill="currentColor"/><path class="v" d="M4.5 19.5 14 10" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>';
function ecoInfo(p){let bio=0,rec=0;p.comp.split(',').forEach(s=>{const n=parseFloat(s)||0;if(/bio/i.test(s))bio+=n;else if(/recycl/i.test(s))rec+=n});return{bio,rec}}
function ecoLabel(p){const e=ecoInfo(p);return e.rec?'Bio et recyclé':(e.bio===100?'100 % coton bio':'Coton bio')}
function ecoBlock(p){
  const e=ecoInfo(p);
  const txt=e.rec
    ?`Cette pièce associe du coton issu de l’agriculture biologique, cultivé sans pesticides ni engrais de synthèse, et des fibres recyclées, qui valorisent une matière existante plutôt que d’en produire une nouvelle.`
    :`Cette pièce est taillée dans un coton issu de l’agriculture biologique, cultivé sans pesticides ni engrais de synthèse.`;
  const tags=[`${e.bio} % coton biologique`];
  if(e.rec)tags.push(`${e.rec} % fibres recyclées`);
  if(p.pt)tags.push('Fabriqué au Portugal');
  return `<div class="eco"><div class="ic">${LEAF}</div><div><b>Des matières choisies pour durer</b><p>${txt}</p><div class="tags">${tags.map(t=>`<span>${t}</span>`).join('')}</div></div></div>`;
}
/* ---------- catalogue ---------- */
const TYPES=[['all','Tout'],['hoodie','Capuches'],['crew','Cols ronds'],['zip','Col zippé'],['tee','T-shirts'],['polo','Polo']];
const PREF=['Beige','Vert foncé','Marron clair','Bleu marine','Gris chiné','Taupe','Bleu pétrole','Vert armée','Blanc cassé','Terracotta','Gris clair','Bordeaux'];
function cardColor(p,i){for(let k=0;k<PREF.length;k++){const n=PREF[(k+i*3)%PREF.length];const j=p.colors.findIndex(c=>c[1]===n);if(j>=0)return j}return 0}
function typeOf(p){return p.type==='capri'?'crew':p.type}
function renderFilters(cur='all'){
  $('#filters').innerHTML=TYPES.map(([k,l])=>{const n=k==='all'?DATA.products.length:DATA.products.filter(p=>typeOf(p)===k).length;return `<button class="chip" type="button" data-k="${k}" aria-pressed="${k===cur}">${l}<span>${n}</span></button>`}).join('');
}
function renderGrid(cur='all'){
  const list=DATA.products.filter(p=>cur==='all'||typeOf(p)===cur);
  $('#grid').innerHTML=list.map((p,pi)=>{const ci=cardColor(p,DATA.products.indexOf(p));return `
    <article>
      <button class="card" type="button" data-sku="${p.sku}" aria-label="${esc(p.model+', '+p.sub)}">
        <div class="shot" data-shot="${p.sku}" data-ci="${ci}">${cardVisual(p,ci)}${p.pt?'<span class="pt">Fabriqué au Portugal</span>':''}<span class="gsm">${p.gsm} g/m²</span><span class="eco-pill">${LEAF}${ecoLabel(p)}</span></div>
        <h3>${esc(p.model)}</h3>
        <p class="sub">${esc(p.sub)}</p>
      </button>
      <div class="dots" role="group" aria-label="Coloris de ${esc(p.model)}">${p.colors.map((c,i)=>`<button class="dot" type="button" style="background:${c[2]}" title="${esc(c[1])}" aria-label="${esc(c[1])}" data-sku="${p.sku}" data-i="${i}"></button>`).join('')}</div>
    </article>`}).join('');
}
function renderGauge(){
  const min=120,max=360, pos=g=>(g-min)/(max-min)*100;
  const clusters=[[140,180],[240,240],[300,300],[340,340]];
  let h='<div class="axis"></div>';
  for(let g=140;g<=340;g+=40){h+=`<div class="tick" style="left:${pos(g)}%">${g} g/m²</div>`}
  DATA.products.forEach(p=>{h+=`<span style="position:absolute;bottom:40px;left:${pos(p.gsm)}%;width:10px;height:10px;margin-left:-5px;border-radius:50%;background:#EEEFE7"></span>`});
  clusters.forEach(([a,b])=>{
    const list=DATA.products.filter(p=>p.gsm>=a&&p.gsm<=b).sort((x,y)=>x.gsm-y.gsm);
    const c=list.reduce((s,p)=>s+p.gsm,0)/list.length;
    h+=`<div class="stack" style="left:${pos(c)}%">${list.map(p=>`<button type="button" data-sku="${p.sku}">${esc(p.model)}${a!==b?` <span style="opacity:.6;font-weight:500">${p.gsm}</span>`:''}</button>`).join('')}</div>`;
  });
  $('#gauge').innerHTML=h;
}
/* ---------- loupe du hero ---------- */
const FAB={
  jersey:{tag:'Jersey simple, maille fine et régulière',small:9,big:4},
  fleece:{tag:'Molleton gratté, envers brossé tout doux',small:9,big:4},
  terry:{tag:'Bouclette, petites boucles qui respirent',small:9,big:4}
};
function fabricPattern(kind,id,cell){
  const k='#68704B', l=shade(k,.2), d=shade(k,-.28);
  if(kind==='jersey'){
    return `<pattern id="${id}" width="${cell}" height="${cell}" patternUnits="userSpaceOnUse"><rect width="${cell}" height="${cell}" fill="${d}"/>
      <g transform="scale(${cell/12})"><ellipse cx="3.3" cy="6" rx="2.35" ry="5.3" transform="rotate(-24 3.3 6)" fill="url(#${id}g)"/><ellipse cx="8.7" cy="6" rx="2.35" ry="5.3" transform="rotate(24 8.7 6)" fill="url(#${id}g)"/></g></pattern>
      <linearGradient id="${id}g" x1="0" x2="1"><stop offset="0" stop-color="${d}"/><stop offset=".45" stop-color="${l}"/><stop offset="1" stop-color="${k}"/></linearGradient>`;
  }
  if(kind==='terry'){
    return `<pattern id="${id}" width="${cell}" height="${cell}" patternUnits="userSpaceOnUse"><rect width="${cell}" height="${cell}" fill="${d}"/>
      <g transform="scale(${cell/12})" fill="none" stroke-linecap="round"><path d="M2 9 C 1 3 6 1.6 6.2 5.6 C 6.4 9 2.6 9.6 3.6 6" stroke="${l}" stroke-width="1.5"/><path d="M8 3.4 C 7 -1.6 12.4 -2 12.2 1.6 C 12 4.8 8.8 4.8 9.6 2.2" stroke="${k}" stroke-width="1.5"/><path d="M8.4 11 C 7.4 6.6 12.2 6 12 9.6" stroke="${shade(k,.1)}" stroke-width="1.4"/></g></pattern>`;
  }
  // molleton gratté : fibres croisées
  let fib=''; let seed=5; const rnd=()=>{seed=(seed*9301+49297)%233280;return seed/233280};
  for(let i=0;i<34;i++){const x=rnd()*12,y=rnd()*12,a=rnd()*Math.PI,L=2+rnd()*4;fib+=`<line x1="${(x).toFixed(2)}" y1="${y.toFixed(2)}" x2="${(x+Math.cos(a)*L).toFixed(2)}" y2="${(y+Math.sin(a)*L).toFixed(2)}" stroke="${rnd()>.5?l:shade(k,.32)}" stroke-opacity="${(.35+rnd()*.5).toFixed(2)}" stroke-width=".38" stroke-linecap="round"/>`}
  return `<pattern id="${id}" width="${cell}" height="${cell}" patternUnits="userSpaceOnUse"><rect width="${cell}" height="${cell}" fill="${k}"/>
    <g transform="scale(${cell/12})"><ellipse cx="3.3" cy="6" rx="2.2" ry="5.1" transform="rotate(-24 3.3 6)" fill="${shade(k,.05)}" opacity=".55"/><ellipse cx="8.7" cy="6" rx="2.2" ry="5.1" transform="rotate(24 8.7 6)" fill="${shade(k,.05)}" opacity=".55"/>${fib}</g></pattern>`;
}
const loupe={fab:'jersey',x:380,y:290,tx:380,ty:290,active:false,raf:0,t0:performance.now()};
function renderLoupe(){
  const f=FAB[loupe.fab];
  $('#loupeSvg').innerHTML=`<defs>${fabricPattern(loupe.fab,'fs',f.small)}${fabricPattern(loupe.fab,'fb',f.small)}
    <clipPath id="lc"><circle id="lcc" cx="0" cy="0" r="115"/></clipPath>
    <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient></defs>
    <rect width="600" height="612" fill="url(#fs)"/><rect width="600" height="612" fill="url(#vig)"/>
    <g clip-path="url(#lc)"><g id="lzoom"><rect x="-2000" y="-2000" width="5000" height="5000" fill="url(#fb)"/></g></g>`;
  $('#loupeTag').textContent=f.tag;
  placeLoupe();
}
function placeLoupe(){
  const card=$('#loupe'), r=card.getBoundingClientRect(); if(!r.width)return;
  // conversion px -> unités svg (slice)
  const sc=Math.max(r.width/600,r.height/612), ox=(r.width-600*sc)/2, oy=(r.height-612*sc)/2;
  const sx=(loupe.x-ox)/sc, sy=(loupe.y-oy)/sc, big=FAB[loupe.fab].big;
  const c=$('#lcc'); if(!c)return; c.setAttribute('cx',sx); c.setAttribute('cy',sy); c.setAttribute('r',115/sc);
  // le motif agrandi est dessiné à la bonne taille ; on l'ancre sur le point regardé
  $('#lzoom').setAttribute('transform',`translate(${sx-sx*big} ${sy-sy*big}) scale(${big})`);
  const ring=$('#loupeRing'); ring.style.left=loupe.x+'px'; ring.style.top=loupe.y+'px';
  const tag=$('#loupeTag'); tag.style.left=loupe.x+'px'; tag.style.top=(loupe.y+128)+'px';
}
function loupeLoop(now){
  if(!loupe.active && !reduce){ // flânerie douce quand personne ne pointe
    const card=$('#loupe'); const r=card.getBoundingClientRect(); const t=(now-loupe.t0)/1000;
    loupe.tx=r.width*(.55+.18*Math.sin(t*.45)); loupe.ty=r.height*(.42+.12*Math.sin(t*.7+1));
  }
  loupe.x+=(loupe.tx-loupe.x)*.14; loupe.y+=(loupe.ty-loupe.y)*.14;
  placeLoupe(); loupe.raf=requestAnimationFrame(loupeLoop);
}
function initLoupe(){
  const card=$('#loupe');
  renderLoupe();
  card.addEventListener('pointermove',e=>{if(e.target.closest('.fabric-tabs'))return;const r=card.getBoundingClientRect();loupe.active=true;loupe.tx=e.clientX-r.left;loupe.ty=e.clientY-r.top;$('#loupeHint').style.opacity=0});
  card.addEventListener('pointerleave',()=>{loupe.active=false});
  card.querySelectorAll('.fabric-tabs button').forEach(b=>b.addEventListener('click',()=>{
    card.querySelectorAll('.fabric-tabs button').forEach(x=>x.setAttribute('aria-pressed',x===b));loupe.fab=b.dataset.fab;renderLoupe();
  }));
  const r=card.getBoundingClientRect(); loupe.x=loupe.tx=r.width*.6; loupe.y=loupe.ty=r.height*.42;
  if(reduce){placeLoupe()} else loupe.raf=requestAnimationFrame(loupeLoop);
  window.addEventListener('resize',placeLoupe);
}
function threadIntro(){
  const p=$('#threadPath'); if(!p||reduce)return;
  const L=p.getTotalLength(); const mask=document.createElementNS('http://www.w3.org/2000/svg','path');
  p.style.strokeDasharray='14 11';
  // révélation progressive par clip
  const svg=p.ownerSVGElement; const defs=document.createElementNS(svg.namespaceURI,'defs');
  defs.innerHTML=`<mask id="thm" maskUnits="userSpaceOnUse"><path d="${p.getAttribute('d')}" stroke="#fff" stroke-width="8" fill="none" stroke-dasharray="${L}" stroke-dashoffset="${L}" id="thmp"/></mask>`;
  svg.prepend(defs); p.setAttribute('mask','url(#thm)');
  const mp=$('#thmp'); const t0=performance.now();
  (function step(now){const k=Math.min(1,(now-t0)/1800);const e=1-Math.pow(1-k,3);mp.setAttribute('stroke-dashoffset',L*(1-e));if(k<1)requestAnimationFrame(step)})(t0);
}

/* ---------- vue produit ---------- */
function openProduct(sku,opts={}){
  if(!defaultArt){artReady.then(()=>openProduct(sku,opts));return}
  const p=DATA.products.find(x=>x.sku===sku); if(!p)return;
  state.p=p; state.color=opts.color||0; state.marks={}; state.view='front'; state.pl='face'; state.qty={}; state.showAll=false;
  state.marks.face=newMark('face',p);
  $('#pvCrumb').textContent=p.model;
  renderPanel(); renderStage(true); focusCamera(true);
  const pv=$('#pv'); pv.classList.add('open'); document.body.style.overflow='hidden';
  if(location.hash!=='#produit-'+sku) history.pushState(null,'','#produit-'+sku);
  setTimeout(()=>pv.focus({preventScroll:true}),60);
}
function closeProduct(push=true){
  $('#pv').classList.remove('open'); document.body.style.overflow='';
  if(push&&location.hash.startsWith('#produit-')) history.pushState(null,'','#collection');
}
function techList(pl){const own=state.p&&state.p.placements;return ((own&&own[pl])||DATA.placements[pl]).techs}
function defaultTech(pl){const t=techList(pl);return t.find(x=>x[0]==='Broderie')||t.find(x=>x[0]==='Transfert numérique')||t[0]}
function newMark(pl,p){
  const tech=defaultTech(pl);
  const g=garmentColor(p||state.p);
  return {pl,tech,art:state.art||defaultArt,ox:0,oy:0,size:.72,rot90:pl==='md'||pl==='mg',ink:lum(g)<.3?'#FFFFFF':'#68704B'};
}
function garmentColor(p){p=p||state.p;return p.colors[state.color][2]}
function markKind(m){const f=m.tech[1],n=m.tech[5];
  if(['flex','sequins','outline'].includes(f)) return ['mono',m.ink];
  if(n>0) return ['post',n];
  return ['full',0];
}
function artHref(m){const [k,a]=markKind(m); const A=artOf(m); return k==='full'?A.src:artVariant(A,k,a)}
function artBox(m,z){
  const zw=z.wmm*S, zh=z.hmm*S, a=artOf(m);
  const k=Math.min(zw/a.cw,zh/a.ch)*m.size; const w=a.cw*k, h=a.ch*k;
  const mx=(zw-w)/2, my=(zh-h)/2;
  m.ox=Math.max(-mx,Math.min(mx,m.ox)); m.oy=Math.max(-my,Math.min(my,m.oy));
  return {x:m.ox-w/2,y:m.oy-h/2,w,h,zw,zh,wmm:w/S,hmm:h/S};
}
function markSVG(m,idx){
  const p=state.p, z=zoneGeom(p,m.pl,m.tech), b=artBox(m,z), f=m.tech[1];
  const href=artHref(m);
  const img=`<image href="${href}" x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" preserveAspectRatio="none"/>`;
  const mid=`mk${idx}`;
  const mask=`<mask id="${mid}" maskUnits="userSpaceOnUse" x="${b.x-4}" y="${b.y-4}" width="${b.w+8}" height="${b.h+8}" style="mask-type:alpha">${img}</mask>`;
  const over=(fill,op=1)=>`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="${fill}" opacity="${op}" mask="url(#${mid})"/>`;
  let below='',above='';
  const T=`transform="translate(${z.cx} ${z.cy}) rotate(${z.rot})"`;
  const drag=`data-mark="${m.pl}" style="cursor:grab"`;
  const hit=`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="transparent"/>`;
  if(['print','dtg','hf'].includes(f)){
    const blend=lum(garmentColor())>.45?' style="mix-blend-mode:multiply"':'';
    below=`<g ${T} ${drag}><g filter="url(#fInk)" opacity="${f==='dtg'?.9:.95}"${blend}>${img}</g>${hit}</g>`;
  } else {
    let inner='';
    if(f==='transfer') inner=`<g filter="url(#fSheen)">${img}</g>`;
    else if(f==='flex') inner=`<g filter="url(#fSatin)">${img}</g>`;
    else if(['t3d','dtg3d','emboss','embossT'].includes(f)) inner=`<g filter="url(#fRaised)">${img}</g>`;
    else if(f==='emb'||f==='embq') inner=`<defs>${mask}</defs><g filter="url(#fEmb)">${img}</g>${over('url(#pStitch)')}`;
    else if(f==='emb3d') inner=`<defs>${mask}</defs><g filter="url(#fEmb3d)">${img}</g>${over('url(#pStitchB)')}`;
    else if(f==='outline') inner=`<g filter="url(#fOutline)">${img}</g>`;
    else if(f==='patch'){
      const pad=Math.min(b.w,b.h)*.16, g=garmentColor(), pc=lum(g)<.25?'#EEEFE7':'#3E4330';
      const rx=Math.min(b.w,b.h)*.22+pad;
      inner=`<defs>${mask}</defs><g filter="url(#fEmb)"><rect x="${b.x-pad}" y="${b.y-pad}" width="${b.w+pad*2}" height="${b.h+pad*2}" rx="${rx}" fill="${pc}"/></g><rect x="${b.x-pad}" y="${b.y-pad}" width="${b.w+pad*2}" height="${b.h+pad*2}" rx="${rx}" fill="url(#pStitchB)" opacity=".7"/><rect x="${b.x-pad+3}" y="${b.y-pad+3}" width="${b.w+pad*2-6}" height="${b.h+pad*2-6}" rx="${rx-3}" fill="none" stroke="${shade(pc,lum(pc)>.5?-.35:.35)}" stroke-width="1.6" stroke-dasharray="2.4 1.8"/><g filter="url(#fEmb)">${img}</g>${over('url(#pStitch)')}`;
    }
    else if(f==='sequins') inner=`<defs>${mask}</defs><g filter="url(#fSheen)">${img}</g>${over('url(#pSequin)')}`;
    else if(f==='strass'){
      inner=`<defs>${mask}<mask id="${mid}d" maskUnits="userSpaceOnUse" x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" style="mask-type:alpha"><rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="url(#pDots)"/></mask></defs><g filter="url(#fSheen)"><g mask="url(#${mid}d)">${img}</g></g><g mask="url(#${mid}d)">${over('url(#pStrassShine)')}</g>`;
    }
    else if(f==='doming') inner=`<defs>${mask}</defs><g filter="url(#fRaised)">${img}</g>${over('url(#gGloss)',.85)}`;
    else inner=`<g filter="url(#fSheen)">${img}</g>`;
    above=`<g ${T} ${drag}>${inner}${hit}</g>`;
  }
  return {below,above,z,b};
}
function zoneOverlay(z,light,label){
  const w=z.wmm*S,h=z.hmm*S, x=-w/2,y=-h/2;
  const col=light?'#ffffff':'#333333';
  let lines='';
  for(let mm=10;mm<z.wmm;mm+=10){const xx=x+mm*S;lines+=`<line x1="${xx}" y1="${y}" x2="${xx}" y2="${y+h}" stroke-opacity="${mm%50?.16:.34}"/>`}
  for(let mm=10;mm<z.hmm;mm+=10){const yy=y+mm*S;lines+=`<line x1="${x}" y1="${yy}" x2="${x+w}" y2="${yy}" stroke-opacity="${mm%50?.16:.34}"/>`}
  const fs=Math.max(4.5,Math.min(9,Math.max(w,h)*.05));
  return `<g class="zone" transform="translate(${z.cx} ${z.cy}) rotate(${z.rot})" pointer-events="none">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${col}" fill-opacity=".06"/>
    <g stroke="${col}" stroke-width=".6">${lines}</g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${col}" stroke-opacity=".85" stroke-width="1.2" stroke-dasharray="5 3.5"/>
    ${[[x,y],[x+w,y],[x,y+h],[x+w,y+h]].map(([a,bb])=>`<circle cx="${a}" cy="${bb}" r="2.4" fill="${col}"/>`).join('')}
    <text x="${x}" y="${y-fs*.55}" font-family="Montserrat, sans-serif" font-size="${fs}" font-weight="700" fill="${col}">${label}</text>
  </g>`;
}
function renderStage(instant){
  const p=state.p, c=garmentColor(), view=state.view;
  const g=garment(p,view,c);
  const light=lum(c)<.32;
  let below='',above='';
  Object.values(state.marks).forEach((m,i)=>{
    const zv=zoneGeom(p,m.pl,m.tech).view; if(zv!==view)return;
    const r=markSVG(m,i); below+=r.below; above+=r.above;
  });
  // zone active (ou survolée)
  let zone='';
  const tech=state.hoverTech || (state.marks[state.pl]&&state.marks[state.pl].tech) || defaultTech(state.pl);
  const z=zoneGeom(p,state.pl,tech);
  if(z.view===view) zone=zoneOverlay(z,light,`${z.wmm} × ${z.hmm} mm`);
  const heather=/chiné/i.test(p.colors[state.color][1]);
  const L=lum(c), fabOp=({jersey:.1,double:.14,fleece:.16,terry:.15}[p.fabric]||.12)*(L>.6?.45:L>.3?.75:1);
  const svg=$('#stageSvg');
  const mk=mockupOf(p,state.color,view);
  if(mk){
    svg.innerHTML=`<g class="flip" id="flip"><g filter="url(#fDrop)"><image href="${esc(mk)}" x="0" y="0" width="600" height="720" preserveAspectRatio="xMidYMid meet"/></g>${below}${above}${zone}${CALAGE?calageMarks():''}</g>`;
  } else
  svg.innerHTML=`<defs><clipPath id="gclip">${g.clip}</clipPath></defs>
  <g class="flip" id="flip">
    <g filter="url(#fDrop)">${g.back}${g.front}</g>
    ${below}
    <g clip-path="url(#gclip)" pointer-events="none">
      <rect x="0" y="0" width="600" height="720" filter="url(#fNoise)" opacity="${fabOp}"/>
      ${heather?`<rect x="0" y="0" width="600" height="720" filter="url(#fFleck)" opacity=".5"/>`:''}
      <rect x="0" y="0" width="600" height="720" fill="url(#pWale)" opacity="${L>.6?.5:1}"/>
    </g>
    <g pointer-events="none">${g.shading}</g>
    <g pointer-events="none">${g.det}</g>
    ${above}
    ${zone}
    ${CALAGE?calageMarks():''}
  </g>`;
  const pz=state.marks[state.pl];
  const lbl = pz ? `<b>${DATA.placements[state.pl].name}, ${pz.tech[0].toLowerCase()}${pz.tech[2]?' '+fmtTxt(pz.tech[2]):''}</b>Zone ${z.wmm} × ${z.hmm} mm${z.limited?' (réduite à la manche courte)':''}` : `<b>${DATA.placements[state.pl].name}</b>Choisissez une technique pour ajouter ce marquage`;
  $('#zoneLbl').innerHTML=lbl;
  document.querySelectorAll('.seg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.view===view));
}
/* caméra */
const cam={vb:[0,0,600,720],raf:0};
function setVB(v){cam.vb=v;$('#stageSvg').setAttribute('viewBox',v.map(n=>n.toFixed(2)).join(' '))}
function tweenVB(to,instant){
  cancelAnimationFrame(cam.raf);
  if(instant||reduce){setVB(to);return}
  const from=cam.vb.slice(), t0=performance.now(), D=620;
  const step=now=>{const k=Math.min(1,(now-t0)/D), e=1-Math.pow(1-k,4);setVB(from.map((v,i)=>v+(to[i]-v)*e));if(k<1)cam.raf=requestAnimationFrame(step)};
  cam.raf=requestAnimationFrame(step);
}
function stageAspect(){const r=$('#stage').getBoundingClientRect();return r.width&&r.height?r.width/r.height:600/720}
function focusCamera(overview,instant){
  const asp=stageAspect();
  if(overview){let h=720,w=h*asp;if(w<600){w=600;h=w/asp}tweenVB([300-w/2,360-h/2,w,h],instant);return}
  const tech=(state.marks[state.pl]&&state.marks[state.pl].tech)||defaultTech(state.pl);
  const z=zoneGeom(state.p,state.pl,tech);
  const rad=z.rot*Math.PI/180, zw=z.wmm*S, zh=z.hmm*S;
  const bw=Math.abs(zw*Math.cos(rad))+Math.abs(zh*Math.sin(rad)), bh=Math.abs(zw*Math.sin(rad))+Math.abs(zh*Math.cos(rad));
  let h=Math.max(bh*1.9,bw*1.9/asp,300), w=h*asp;
  if(h>720){h=720;w=h*asp}
  tweenVB([z.cx-w/2,z.cy-h/2-8,w,h],instant);
}
function switchView(v,cb){
  if(state.view===v){cb&&cb();return}
  const flip=$('#flip');
  if(reduce||!flip){state.view=v;renderStage();cb&&cb();return}
  flip.style.transition='transform .2s ease-in';flip.style.transform='scaleX(.03)';
  setTimeout(()=>{state.view=v;renderStage();const f2=$('#flip');f2.style.transform='scaleX(.03)';f2.getBoundingClientRect();f2.style.transition='transform .28s cubic-bezier(.2,.8,.2,1)';f2.style.transform='scaleX(1)';cb&&cb()},200);
}
function selectPlacement(pl){
  state.pl=pl; state.hoverTech=null;
  const tech=(state.marks[pl]&&state.marks[pl].tech)||defaultTech(pl);
  const v=zoneGeom(state.p,pl,tech).view;
  switchView(v,()=>{renderStage();focusCamera(false)});
  renderPanel();
}

/* ---------- calage (?calage) ---------- */
let calStep='a';
function calageMarks(){
  const p=state.p; if(!(state.pl==='md'||state.pl==='mg'))return '';
  const ax=sleeveAxis(p,state.pl);
  return `<g pointer-events="none"><line x1="${ax.a[0]}" y1="${ax.a[1]}" x2="${ax.b[0]}" y2="${ax.b[1]}" stroke="#E0543F" stroke-width="1.4" stroke-dasharray="4 3"/><circle cx="${ax.a[0]}" cy="${ax.a[1]}" r="5" fill="#E0543F"/><circle cx="${ax.b[0]}" cy="${ax.b[1]}" r="5" fill="#fff" stroke="#E0543F" stroke-width="2"/></g>`;
}
function calageConfig(){
  const p=state.p, out={};
  if(p.mockups){out.mockups={};for(const code in p.mockups){out.mockups[code]={};for(const v in p.mockups[code]){const src=p.mockups[code][v];out.mockups[code][v]=src.startsWith('data:')?`assets/maquettes/${(p._files&&p._files[code+v])||(p.sku.toLowerCase()+'-'+code+'-'+v+'.png')}`:src}}}
  if(p.photos) out.photos=p.photos;
  if(p.zones) out.zones=p.zones;
  const txt=JSON.stringify(out,null,2).replace(/^\{\n|\n\}$/g,'');
  return `// À coller dans js/data.js, dans le produit ${p.sku} (juste après la ligne "sku": "${p.sku}",)\n${txt},`;
}
/* ---------- panneau ---------- */
function placeIcon(pl){
  const back=pl==='dos';
  const p=state.p; const g=garment(p,back?'back':'front','#d9dbd0');
  const t=defaultTech(pl), z=zoneGeom(p,pl,t);
  const w=z.wmm*S,h=z.hmm*S;
  return `<svg viewBox="50 20 500 640" aria-hidden="true"><g opacity=".9">${g.back}${g.front}</g><g transform="translate(${z.cx} ${z.cy}) rotate(${z.rot})"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" fill="#68704B" fill-opacity=".85" rx="4"/></g></svg>`;
}
function sizesOf(p){const all=['XS','S','M','L','XL','XXL','3XL'];const [a,b]=p.sizes.split(' à ');return all.slice(all.indexOf(a),all.indexOf(b)+1)}
function renderPanel(){
  const p=state.p, col=p.colors[state.color], pl=state.pl, m=state.marks[pl];
  const techs=techList(pl);
  const shown=state.showAll?techs:techs.filter(t=>ESSENTIAL.includes(t[0]));
  const isRef=p.sku==='ASW001'||!!p.placements;
  let techHTML='';
  FAMS.forEach(([fn,fams])=>{
    const list=shown.filter(t=>fams.includes(t[1])); if(!list.length)return;
    techHTML+=`<div class="fam">${fn}</div>`+list.map(t=>{const i=techs.indexOf(t);const on=m&&m.tech===t;const z=zoneGeom(p,pl,t);return `<label class="tech${on?' on':''}" data-ti="${i}"><input type="radio" name="tech" value="${i}" ${on?'checked':''}><span><span class="nm">${esc(t[0])}</span>${t[2]?`<span class="fmt">${fmtTxt(t[2])}</span>`:''}</span><span class="dm">${z.wmm} × ${z.hmm} mm<br>${colTxt(t[5])}</span></label>`}).join('');
  });
  let artHTML='';
  if(m){
    const b=artBox(m,zoneGeom(p,pl,m.tech)); const [k]=markKind(m);
    artHTML=`<div class="block"><h2><span class="n">3</span>Votre visuel</h2>
      <div class="drop" id="drop" role="button" tabindex="0" aria-label="Importer votre logo"><div class="th"><img src="${m.art.src}" alt=""></div><div><b>${esc(m.art.name)}</b><small>Glissez un fichier ici ou cliquez pour importer un PNG, JPG, WEBP ou SVG</small></div></div>
      <div class="row"><label><input type="checkbox" id="rmw" ${m.art.removeWhite?'checked':''}> Retirer le fond blanc</label></div>
      ${k==='mono'?`<div class="row"><span style="font-size:13.5px">Couleur du ${m.tech[1]==='flex'?'film':'fil'}</span><div class="inkc" role="group" aria-label="Couleur du marquage">${INKS.map(([h,n])=>`<button type="button" data-ink="${h}" style="background:${h}" title="${n}" aria-label="${n}" aria-pressed="${m.ink.toLowerCase()===h.toLowerCase()}"></button>`).join('')}</div></div>`:''}
      ${k==='post'?`<p class="note">Votre visuel est réduit à ${m.tech[5]} couleur${m.tech[5]>1?'s':''} maximum pour cette technique.</p>`:''}
      <div class="row"><label for="size">Taille</label><input type="range" id="size" min="0.15" max="1" step="0.01" value="${m.size}"><span class="mm" id="mmOut">${Math.round(b.wmm)} × ${Math.round(b.hmm)} mm</span></div>
      <div class="row"><button class="linkbtn" type="button" id="rot">${m.rot90?'Remettre à l’horizontale':'Pivoter d’un quart de tour'}</button><button class="linkbtn" type="button" id="center">Centrer dans la zone</button><button class="linkbtn" type="button" id="rmMark">Retirer ce marquage</button></div>
    </div>`;
  }
  const marks=Object.values(state.marks).sort((a,b)=>PL_ORDER.indexOf(a.pl)-PL_ORDER.indexOf(b.pl));
  const sizes=sizesOf(p);
  const total=sizes.reduce((s,z)=>s+(+state.qty[z]||0),0);
  const cal=CALAGE?`<div class="block calage" style="border-top:0;padding-top:0;margin-bottom:8px"><div class="recap" style="background:var(--kaki);color:#fff">
      <h2 style="margin-bottom:8px">Outil de calage</h2>
      <p style="margin:0 0 12px;font-size:13.5px;opacity:.9">1. Importez la photo détourée du coloris affiché. 2. Choisissez un emplacement puis faites glisser la zone quadrillée à sa place. Pour une manche, cliquez sur l’épaule puis sur le poignet. 3. Copiez la configuration et collez-la dans js/data.js.</p>
      <div class="row" style="margin-top:0">
        <label class="btn small" style="border-color:#fff;color:#fff">Photo de face<input type="file" accept="image/*" data-mock="front" class="sr"></label>
        <label class="btn small" style="border-color:#fff;color:#fff">Photo de dos<input type="file" accept="image/*" data-mock="back" class="sr"></label>
        <button class="btn small" type="button" id="calCopy" style="background:#fff;color:#333;border-color:#fff">Copier la configuration</button>
      </div></div></div>`:'';
  $('#panel').innerHTML=cal+`
    <h1 class="display" id="pvTitle">${esc(p.model)}</h1>
    <p class="sub">${esc(p.sub)}, réf. ${p.sku}</p>
    <div class="facts-row"><span class="fact">${p.gsm} g/m²</span><span class="fact">${esc(p.comp)}</span><span class="fact">Tailles ${esc(p.sizes)}</span>${p.pt?'<span class="fact pt">Fabriqué au Portugal</span>':''}</div>
    ${ecoBlock(p)}<details class="more"><summary>Détails de fabrication</summary><ul>${p.feat.map(f=>`<li>${esc(f)}</li>`).join('')}</ul></details>
    <div class="block" style="margin-top:22px"><h2>Coloris<span class="aside">${esc(col[1])}, ${col[0]}</span></h2>
      <div class="swatches" role="group" aria-label="Coloris">${p.colors.map((c,i)=>`<button class="sw" type="button" data-ci="${i}" style="background:${c[2]}" title="${esc(c[1])}" aria-label="${esc(c[1])}" aria-pressed="${i===state.color}"></button>`).join('')}</div>
      <p class="note">Teintes à l’écran indicatives.</p></div>
    <div class="block"><h2><span class="n">1</span>Emplacement<span class="aside">${marks.length} marquage${marks.length>1?'s':''}</span></h2>
      <div class="places" role="group" aria-label="Emplacements">${PL_ORDER.map(k=>`<button class="place" type="button" data-pl="${k}" aria-pressed="${k===pl}">${state.marks[k]?'<span class="ok" title="Marquage ajouté"></span>':''}${placeIcon(k)}${DATA.placements[k].name}</button>`).join('')}</div>
      ${isRef?'':'<p class="note">Emplacements et formats indicatifs, repris de la fiche du sweat Bondi. À confirmer pour ce modèle.</p>'}
    </div>
    <div class="block"><h2><span class="n">2</span>Technique<span class="aside toggle">Toutes (${techs.length})<button type="button" role="switch" id="allT" aria-checked="${state.showAll}" aria-label="Afficher toutes les techniques"></button></span></h2>
      <div id="techs" role="radiogroup" aria-label="Techniques de marquage">${techHTML}</div>
      ${m?`<div class="tdesc">${DESC[m.tech[1]]||''}</div>`:''}
    </div>
    ${artHTML}
    <div class="block" id="recap"><h2>Récapitulatif</h2>
      <div class="recap">
        ${marks.length?`<ul>${marks.map(k=>`<li><span><b>${DATA.placements[k.pl].name}</b><br>${esc(k.tech[0])}${k.tech[2]?' '+fmtTxt(k.tech[2]):''}, ${Math.round(artBox(k,zoneGeom(p,k.pl,k.tech)).wmm)} × ${Math.round(artBox(k,zoneGeom(p,k.pl,k.tech)).hmm)} mm</span><button type="button" data-edit="${k.pl}">Modifier</button></li>`).join('')}</ul>`:'<p class="note" style="margin-top:0">Aucun marquage pour l’instant. Choisissez un emplacement puis une technique.</p>'}
        <div style="font-size:13.5px;font-weight:600">Quantités par taille</div>
        <div class="sizes">${sizes.map(z=>`<label>${z}<input type="number" min="0" step="1" inputmode="numeric" data-q="${z}" value="${state.qty[z]||''}" placeholder="0"></label>`).join('')}</div>
        <div class="total"><span><b id="tot">${total}</b> pièce${total>1?'s':''}, coloris ${esc(col[1].toLowerCase())}</span><button class="btn solid small" type="button" id="copy">Copier le récapitulatif</button></div>
        <p class="note">Tarifs sur devis selon quantités et marquages. Collez ce récapitulatif dans votre demande à votre conseiller ac2m.</p>
      </div>
    </div>`;
  const lbl=$('#pvRecapBtn'); lbl.textContent=`Récapitulatif (${marks.length})`;
}
function recapText(){
  const p=state.p, col=p.colors[state.color];
  const marks=Object.values(state.marks).sort((a,b)=>PL_ORDER.indexOf(a.pl)-PL_ORDER.indexOf(b.pl));
  const sizes=sizesOf(p); const q=sizes.filter(z=>+state.qty[z]).map(z=>`${z} : ${state.qty[z]}`).join(', ')||'à préciser';
  return [`Demande de devis ac2m textile`,`Modèle : ${p.model}, ${p.sub} (réf. ${p.sku})`,`Coloris : ${col[1]} (${col[0]})`,`Quantités : ${q}`,`Marquages :`,...(marks.length?marks.map(m=>{const b=artBox(m,zoneGeom(p,m.pl,m.tech));const [k]=markKind(m);return `- ${DATA.placements[m.pl].name} : ${m.tech[0]}${m.tech[2]?' '+fmtTxt(m.tech[2]):''}, visuel « ${m.art.name} » environ ${Math.round(b.wmm)} × ${Math.round(b.hmm)} mm${k==='mono'?`, couleur ${(INKS.find(i=>i[0].toLowerCase()===m.ink.toLowerCase())||['',m.ink])[1]}`:''}`}):['- aucun'])].join('\n');
}
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),2200)}

function swapCard(shot,p,ci){shot.dataset.ci=ci;const old=shot.querySelector('svg,img.photo');const tmp=document.createElement('div');tmp.innerHTML=cardVisual(p,ci);old.replaceWith(tmp.firstElementChild)}
/* ---------- interactions ---------- */
function bind(){
  $('#filters').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;renderFilters(b.dataset.k);renderGrid(b.dataset.k)});
  $('#grid').addEventListener('click',e=>{
    const d=e.target.closest('.dot');
    if(d){const p=DATA.products.find(x=>x.sku===d.dataset.sku);const shot=document.querySelector(`[data-shot="${d.dataset.sku}"]`);swapCard(shot,p,+d.dataset.i);return}
    const c=e.target.closest('.card'); if(c){const shot=c.querySelector('.shot');openProduct(c.dataset.sku,{color:+(shot.dataset.ci||0)})}
  });
  $('#grid').addEventListener('mouseover',e=>{const d=e.target.closest('.dot');if(!d)return;const p=DATA.products.find(x=>x.sku===d.dataset.sku);const shot=document.querySelector(`[data-shot="${d.dataset.sku}"]`);if(shot.dataset.hi===d.dataset.i)return;shot.dataset.hi=d.dataset.i;swapCard(shot,p,+d.dataset.i)});
  $('#gauge').addEventListener('click',e=>{const b=e.target.closest('[data-sku]');if(b)openProduct(b.dataset.sku)});
  $('#heroConfig').addEventListener('click',()=>openProduct('ASW001',{color:2}));
  $('#navConfig').addEventListener('click',()=>openProduct('ASW001',{color:2}));
  $('#pvBack').addEventListener('click',()=>closeProduct());
  $('#zoomOut').addEventListener('click',()=>focusCamera(true));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#pv').classList.contains('open'))closeProduct()});
  window.addEventListener('popstate',()=>{const h=location.hash;if(h.startsWith('#produit-'))openProduct(h.slice(9));else if($('#pv').classList.contains('open'))closeProduct(false)});
  document.querySelectorAll('.seg button').forEach(b=>b.addEventListener('click',()=>{switchView(b.dataset.view,()=>focusCamera(true))}));
  window.addEventListener('resize',()=>{if($('#pv').classList.contains('open'))focusCamera(false,true)});
  $('#pvRecapBtn').addEventListener('click',e=>{e.preventDefault();$('#recap').scrollIntoView({behavior:reduce?'auto':'smooth'})});

  const panel=$('#panel');
  panel.addEventListener('click',e=>{
    const t=e.target;
    const sw=t.closest('.sw'); if(sw){state.color=+sw.dataset.ci;renderStage();renderPanel();return}
    const pl=t.closest('.place'); if(pl){selectPlacement(pl.dataset.pl);return}
    if(t.closest('#allT')){state.showAll=!state.showAll;renderPanel();return}
    const ink=t.closest('[data-ink]'); if(ink){state.marks[state.pl].ink=ink.dataset.ink;renderStage();renderPanel();return}
    if(t.closest('#drop')){$('#file').click();return}
    if(t.closest('#rot')){const m=state.marks[state.pl];m.rot90=!m.rot90;m.ox=0;m.oy=0;renderStage();renderPanel();return}
    if(t.closest('#center')){const m=state.marks[state.pl];m.ox=0;m.oy=0;renderStage();renderPanel();return}
    if(t.closest('#rmMark')){delete state.marks[state.pl];renderStage();renderPanel();return}
    const ed=t.closest('[data-edit]'); if(ed){selectPlacement(ed.dataset.edit);panel.scrollTo({top:0,behavior:reduce?'auto':'smooth'});return}
    if(t.closest('#copy')){const txt=recapText();(navigator.clipboard?navigator.clipboard.writeText(txt):Promise.reject()).then(()=>toast('Récapitulatif copié')).catch(()=>{prompt('Copiez le récapitulatif :',txt)});return}
  });
  panel.addEventListener('change',e=>{
    const t=e.target;
    if(t.name==='tech'){
      const tech=techList(state.pl)[+t.value];
      if(!state.marks[state.pl]) state.marks[state.pl]=newMark(state.pl);
      state.marks[state.pl].tech=tech; state.hoverTech=null;
      const v=zoneGeom(state.p,state.pl,tech).view;
      switchView(v,()=>{renderStage();focusCamera(false)}); renderPanel();
      const el=panel.querySelector(`input[name=tech][value="${t.value}"]`); el&&el.focus({preventScroll:true});
    }
    if(t.id==='rmw'){const m=state.marks[state.pl];m.art.removeWhite=t.checked;buildArt(m.art);renderStage();renderPanel()}
  });
  panel.addEventListener('input',e=>{
    const t=e.target;
    if(t.id==='size'){const m=state.marks[state.pl];m.size=+t.value;renderStage();const b=artBox(m,zoneGeom(state.p,m.pl,m.tech));$('#mmOut').textContent=`${Math.round(b.wmm)} × ${Math.round(b.hmm)} mm`}
    if(t.dataset.q){state.qty[t.dataset.q]=Math.max(0,parseInt(t.value)||0);const tot=sizesOf(state.p).reduce((s,z)=>s+(+state.qty[z]||0),0);$('#tot').textContent=tot}
  });
  panel.addEventListener('keydown',e=>{if(e.target.id==='drop'&&(e.key==='Enter'||e.key===' ')){e.preventDefault();$('#file').click()}});
  // survol d'une technique : la zone se met à jour tout de suite sur l'aperçu
  panel.addEventListener('mouseover',e=>{const r=e.target.closest('.tech');if(!r)return;const tech=techList(state.pl)[+r.dataset.ti];if(state.hoverTech===tech)return;state.hoverTech=tech;if(zoneGeom(state.p,state.pl,tech).view===state.view)renderStage()});
  panel.addEventListener('mouseleave',()=>{if(state.hoverTech){state.hoverTech=null;renderStage()}});
  panel.addEventListener('mouseout',e=>{if(e.target.closest('#techs')&&!e.relatedTarget?.closest?.('#techs')&&state.hoverTech){state.hoverTech=null;renderStage()}});
  // import de fichier
  const handleFile=f=>{if(!f)return;if(!/^image\//.test(f.type)){toast('Choisissez une image PNG, JPG, WEBP ou SVG');return}
    const r=new FileReader();r.onload=()=>loadArt(r.result,f.name).then(a=>{state.art=a;const m=state.marks[state.pl];if(m){m.art=a;m.ox=0;m.oy=0}renderStage();renderPanel();toast('Visuel importé')}).catch(()=>toast('Ce fichier ne peut pas être lu. Essayez un PNG ou un JPG.'));r.readAsDataURL(f)};
  panel.addEventListener('change',e=>{
    const inp=e.target; if(!inp.dataset||!inp.dataset.mock)return; const f=inp.files[0]; if(!f)return;
    const r=new FileReader(); r.onload=()=>{const p=state.p, code=p.colors[state.color][0], v=inp.dataset.mock;
      p.mockups=p.mockups||{}; p.mockups[code]=p.mockups[code]||{}; p.mockups[code][v]=r.result;
      p._files=p._files||{}; p._files[code+v]=f.name.replace(/\s+/g,'-').toLowerCase();
      if(state.view!==(v==='back'?'back':'front')) switchView(v==='back'?'back':'front',()=>{renderStage();focusCamera(true)}); else {renderStage();focusCamera(true)}
      toast('Photo chargée pour ce coloris');}; r.readAsDataURL(f);
  });
  panel.addEventListener('click',e=>{if(e.target.closest('#calCopy')){const t=calageConfig();(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>toast('Configuration copiée')).catch(()=>prompt('Copiez la configuration :',t))}});
  $('#file').addEventListener('change',e=>{handleFile(e.target.files[0]);e.target.value=''});
  panel.addEventListener('dragover',e=>{const d=e.target.closest('#drop');if(d){e.preventDefault();d.classList.add('over')}});
  panel.addEventListener('dragleave',e=>{const d=e.target.closest('#drop');if(d)d.classList.remove('over')});
  panel.addEventListener('drop',e=>{const d=e.target.closest('#drop');if(d){e.preventDefault();d.classList.remove('over');handleFile(e.dataTransfer.files[0])}});
  // glisser le visuel sur l'aperçu
  const svg=$('#stageSvg'); let drag=null;
  const toSvg=(x,y)=>{const pt=svg.createSVGPoint();pt.x=x;pt.y=y;return pt.matrixTransform(svg.getScreenCTM().inverse())};
  let zdrag=null;
  svg.addEventListener('pointerdown',e=>{
    if(CALAGE&&!e.target.closest('[data-mark]')){
      const s=toSvg(e.clientX,e.clientY), p=state.p; p.zones=p.zones||{};
      if(state.pl==='md'||state.pl==='mg'){
        const pt=[Math.round(state.pl==='mg'?600-s.x:s.x),Math.round(s.y)];
        const cur=sleeveAxis(p,'md'); const z=p.zones.md||{a:cur.a,b:cur.b};
        z[calStep]=pt; p.zones.md={a:z.a,b:z.b}; calStep=calStep==='a'?'b':'a';
        renderStage(); toast(calStep==='b'?'Épaule placée, cliquez sur le poignet':'Poignet placé');
        return;
      }
      const tech=(state.marks[state.pl]&&state.marks[state.pl].tech)||defaultTech(state.pl);
      const z=zoneGeom(p,state.pl,tech);
      zdrag={sx:s.x,sy:s.y,cx:z.cx,top:z.cy-z.hmm*S/2}; svg.setPointerCapture(e.pointerId); e.preventDefault(); return;
    }
    const g=e.target.closest('[data-mark]'); if(!g)return;
    const m=state.marks[g.dataset.mark]; if(!m)return;
    if(state.pl!==m.pl){state.pl=m.pl;renderPanel()}
    const z=zoneGeom(state.p,m.pl,m.tech); const s=toSvg(e.clientX,e.clientY);
    drag={m,z,sx:s.x,sy:s.y,ox:m.ox,oy:m.oy}; svg.setPointerCapture(e.pointerId); e.preventDefault();
  });
  svg.addEventListener('pointermove',e=>{
    if(zdrag){const s=toSvg(e.clientX,e.clientY);state.p.zones[state.pl]={cx:Math.round(zdrag.cx+s.x-zdrag.sx),top:Math.round(zdrag.top+s.y-zdrag.sy)};if(!zdrag.pending){zdrag.pending=true;requestAnimationFrame(()=>{if(zdrag)zdrag.pending=false;renderStage()})}return}
    if(!drag)return; const s=toSvg(e.clientX,e.clientY); let dx=s.x-drag.sx, dy=s.y-drag.sy;
    const r=-drag.z.rot*Math.PI/180; const lx=dx*Math.cos(r)-dy*Math.sin(r), ly=dx*Math.sin(r)+dy*Math.cos(r);
    drag.m.ox=drag.ox+lx; drag.m.oy=drag.oy+ly;
    if(!drag.pending){drag.pending=true;requestAnimationFrame(()=>{if(drag){drag.pending=false;renderStage()}})}
  });
  const end=()=>{if(zdrag){zdrag=null;renderStage()}if(drag){drag=null;renderStage();renderPanel()}};
  svg.addEventListener('pointerup',end); svg.addEventListener('pointercancel',end);
  svg.setAttribute('tabindex','0');
  if(CALAGE){svg.addEventListener('pointermove',e=>{const s=toSvg(e.clientX,e.clientY);$('#zoneHint').textContent=`Calage : x ${Math.round(s.x)}, y ${Math.round(s.y)}`})}
  svg.addEventListener('keydown',e=>{const m=state.marks[state.pl];if(!m)return;const st=e.shiftKey?10:2;const k={ArrowLeft:[-st,0],ArrowRight:[st,0],ArrowUp:[0,-st],ArrowDown:[0,st]}[e.key];if(!k)return;e.preventDefault();m.ox+=k[0];m.oy+=k[1];renderStage()});
}

/* ---------- démarrage ---------- */
renderFilters(); renderGrid(); renderGauge(); initLoupe(); threadIntro(); bind();
artReady.then(()=>{const h=location.hash; if(h.startsWith('#produit-'))openProduct(h.slice(9))});
})();