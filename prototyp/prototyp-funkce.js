/* NašeBanka prototyp · nové funkce (platby, banka, správa, kasino, burza, krypto, zábava, aplikace)
   Načítá se po hlavním skriptu v prototyp.html a rozšiřuje S (stav), A (akce) a P (stránky). */

/* ---------- vzhled ---------- */
document.head.insertAdjacentHTML('beforeend',`<style>
.modal{position:fixed;inset:0;z-index:95;background:rgba(0,0,0,.5);display:none;place-items:center;padding:16px}.modal.open{display:grid}
.modal .in{width:min(400px,100%);padding:24px;background:var(--bg)}
.star{color:var(--mute);font-size:19px;padding:2px 6px;cursor:pointer;line-height:1;user-select:none}.star.on{color:#facc15;text-shadow:0 0 10px rgba(250,204,21,.5)}
.spl{max-height:220px;overflow-y:auto;border:1px solid var(--line);border-radius:12px;padding:4px;margin-top:6px}
.spl label{display:flex;align-items:center;gap:10px;padding:7px 8px;border-radius:10px;cursor:pointer;color:var(--ink);font-weight:600;font-size:14px}
.spl label:hover{background:var(--panel2)}.spl input{width:18px;height:18px;accent-color:var(--a2);margin:0}
.goal{padding:12px 0;border-top:1px solid var(--line)}.goal .row{display:flex;justify-content:space-between;font-size:14px;gap:8px}
.goal .prog{margin:8px 0}
.mini{display:flex;gap:6px}.mini button{flex:1}
.gauge{height:12px;border-radius:99px;background:linear-gradient(90deg,#ef4444,#f59e0b 45%,#22c55e);position:relative;margin:16px 0 6px}
.gauge i{position:absolute;top:-5px;width:6px;height:22px;border-radius:3px;background:var(--ink);box-shadow:0 0 0 3px var(--bg);transform:translateX(-3px)}
.crd{display:inline-grid;place-items:center;width:46px;height:64px;border-radius:9px;background:#f8fafc;color:#0f172a;font-weight:700;font-size:15px;margin:0 6px 6px 0;box-shadow:0 4px 12px rgba(0,0,0,.25)}
.crd.red{color:#dc2626}.crd.back{background:repeating-linear-gradient(45deg,#22d3ee 0 6px,#a855f7 6px 12px);color:transparent}
.hand small{display:block;color:var(--mute);font-size:12px;margin-bottom:6px}
.rlnum{width:96px;height:96px;border-radius:50%;margin:6px auto 14px;display:grid;place-items:center;font-size:34px;font-weight:700;color:#fff;background:#334155;border:4px solid rgba(255,255,255,.25);box-shadow:0 0 30px var(--glow)}
.rlnum.red{background:#dc2626}.rlnum.black{background:#111827}.rlnum.green{background:#16a34a}
.mi .star{font-size:17px}
.bars .b{display:grid;grid-template-columns:130px 1fr 90px;gap:10px;align-items:center;font-size:13px;padding:6px 0}
.bars .t{height:10px;border-radius:99px;background:var(--input);overflow:hidden}.bars .t i{display:block;height:100%;border-radius:99px}
.bars .b b{text-align:right}
.badges{display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:10px}
.bdg{padding:12px 8px;border-radius:14px;border:1px solid var(--line);background:var(--panel2);text-align:center;font-size:11.5px;color:var(--mute)}
.bdg b{display:block;font-size:13px;margin:7px 0 2px;color:var(--ink)}
.bdg .c2{width:44px;height:44px;border-radius:50%;margin:0 auto;display:grid;place-items:center;background:var(--input);color:var(--mute)}
.bdg.on .c2{background:linear-gradient(135deg,var(--a1),var(--a2));color:#0a0b14;box-shadow:0 0 18px var(--glow)}.bdg:not(.on){opacity:.5}
.rx{border:1px solid var(--line);background:var(--panel2);border-radius:999px;padding:4px 10px;font-size:13px;cursor:pointer;margin:10px 6px 0 0;color:var(--ink)}
.rx.on{border-color:var(--a2);box-shadow:0 0 10px var(--glow)}
.notif{position:fixed;top:16px;right:16px;z-index:96;display:flex;gap:12px;align-items:center;padding:14px 16px;border-radius:16px;background:var(--bg);border:1px solid var(--a2);box-shadow:0 10px 40px var(--glow);transform:translateY(-150%);transition:transform .35s;cursor:pointer;max-width:calc(100vw - 32px)}
.notif.show{transform:none}.notif .av{width:36px;height:36px}.notif small{display:block;color:var(--mute)}
.blockbar{padding:12px 16px;border-radius:14px;background:rgba(244,114,182,.13);border:1px solid var(--neg);color:var(--neg);font-weight:600;font-size:14px}
.qopt{display:block;width:100%;text-align:left;padding:13px 14px;border-radius:14px;border:1px solid var(--line);background:var(--panel2);margin-bottom:8px;cursor:pointer;font-weight:600;color:var(--ink)}
.qopt:hover{border-color:var(--a2)}.qopt.ok{border-color:var(--pos);color:var(--pos)}.qopt.bad{border-color:var(--neg);color:var(--neg)}
.addr{font-family:ui-monospace,Consolas,monospace;font-size:13px;padding:8px 8px 8px 12px;border-radius:12px;background:var(--input);border:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:12px}
.switch{width:46px;height:26px;appearance:none;-webkit-appearance:none;border-radius:99px;background:var(--input);border:1px solid var(--line);position:relative;cursor:pointer;flex-shrink:0;margin:0}
.switch::after{content:"";position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:var(--mute);transition:.2s}
.switch:checked{background:linear-gradient(90deg,var(--a1),var(--a2));border-color:transparent}.switch:checked::after{left:22px;background:#fff}
.rolesel{padding:6px 8px;border-radius:9px;border:1px solid var(--line);background:var(--input);color:var(--ink);font-size:12px;font-weight:600}
.tag2{display:inline-block;font-size:11px;font-weight:700;padding:1px 8px;border-radius:7px;background:var(--glow);color:var(--hi)}
.tag2.bad{background:rgba(244,114,182,.15);color:var(--neg)}.tag2.ok{background:rgba(74,222,128,.15);color:var(--pos)}
.cols2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.stack{display:flex;flex-direction:column;gap:20px;min-width:0}
@media(max-width:699px){.bars .b{grid-template-columns:96px 1fr 74px}.cols2{grid-template-columns:1fr}.stack{gap:16px}}
</style>`);
document.querySelector('svg defs').insertAdjacentHTML('beforeend',`
<symbol id="i-coin" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.7 0-3 .9-3 2s1.3 1.7 3 2 3 .9 3 2-1.3 2-3 2c-1 0-2-.5-2.5-1.5M12 6.5v1.5M12 16v1.5"/></symbol>
<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/></symbol>
<symbol id="i-quiz" viewBox="0 0 24 24"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></symbol>
<symbol id="i-down" viewBox="0 0 24 24"><path d="M12 4v11M7 10l5 5 5-5"/><path d="M4 20h16"/></symbol>
<symbol id="i-print" viewBox="0 0 24 24"><path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/></symbol>
<symbol id="i-lock" viewBox="0 0 24 24"><rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/></symbol>
<symbol id="i-pick" viewBox="0 0 24 24"><path d="M3 21l9-9"/><path d="M14.5 3.5c3 0 6 3 6 6-2-1.5-4-2-6-2l-3 3-1.5-1.5 3-3c0-2-.5-4-2-6 1 .5 2.5 1.5 3.5 3.5z"/></symbol>
<symbol id="i-cards" viewBox="0 0 24 24"><rect x="3" y="6" width="11" height="15" rx="2"/><path d="M8 3.5 18.5 5a2 2 0 0 1 1.7 2.3L18.5 18"/></symbol>
<symbol id="i-wheel" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><path d="M12 3v6.5M12 14.5V21M3 12h6.5M14.5 12H21M5.6 5.6l4.6 4.6M13.8 13.8l4.6 4.6M5.6 18.4l4.6-4.6M13.8 10.2l4.6-4.6"/></symbol>
<symbol id="i-crown" viewBox="0 0 24 24"><path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z"/></symbol>
<symbol id="i-wallet" viewBox="0 0 24 24"><path d="M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11"/><path d="M16 13.5h2"/></symbol>
<symbol id="i-repeat" viewBox="0 0 24 24"><path d="M17 3l3 3-3 3"/><path d="M20 6H8a4 4 0 0 0-4 4v1M7 21l-3-3 3-3"/><path d="M4 18h12a4 4 0 0 0 4-4v-1"/></symbol>
<symbol id="i-copy" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24"><rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M11 18.5h2"/></symbol>`);
document.body.insertAdjacentHTML('beforeend','<div class="modal" id="modal"></div><div class="notif" id="notif"></div>');

/* ---------- stav ---------- */
const today=()=>iso(new Date());
const addDays=n=>{const d=new Date();d.setDate(d.getDate()+n);return iso(d)};
const hashN=s=>{let h=7;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h};
Object.assign(S,{
 cfg:{fee:2,sav:5,loanFee:10,loanMax:10000,reserve:20000},
 limit:{on:true,max:100,used:0},
 favs:['Matyáš'],payTab:'send',
 inReq:[{from:'Ondra',a:50,why:'Lístky do kina',d:'Dnes 16:20'}],outReq:[],
 orders:[{to:'Klára',a:20,freq:'weekly',next:addDays(3),why:'Kapesné'}],
 goals:[{n:'Nová sluchátka',t:800,s:120}],
 pin:{on:false,code:'',over:100},notif:true,
 audit:[{w:'Tomáš',t:'Schválil registraci · Petr',d:'Včera 19:02'},{w:'Ondra',t:'Změnil číslo účtu · Klára 1009 → 1006',d:'18. 11.'}],
 blocked:[],score:{},
 debtors:[{n:'Petr',debt:3300},{n:'Klára',debt:1100},{n:'Jakub D.',debt:640}],
 watch:['AAPL','TSLA'],cost:{},badges:[],
 hkc:{sup:4200,hist:[]},wallet:{HKC:0},stakes:[],mined:null,csel:'BTC-USD',
 qz:null,bj:null,bjBet:5,rl:{bet:'red',amt:5,last:null,n:7},
});
CARDS.push({id:'crypto',n:'Krypto · 1 000 Sh v kryptu',bg:'radial-gradient(circle at 80% 20%,#facc15 0 12%,transparent 13%),linear-gradient(135deg,#0f172a,#1e3a8a 50%,#0891b2)',minCrypto:1000});
TEAM.forEach(p=>S.score[p.n]=p.n==='Claude'?640:p.k==='bank'?850:430+hashN(p.n)%390);
S.ann.forEach((a,i)=>{a.r=[{'👍':6,'🎉':3},{'👍':2,'😮':1},{'👍':4}][i]||{};a.mine={}});
{let v=2.4;for(let i=0;i<30;i++){v*=1+(Math.sin(i*1.7)*.03+.006);S.hkc.hist.push(+v.toFixed(3))}S.hkc.hist.push(1+S.hkc.sup/2000)}

/* ---------- práva ---------- */
/* Banka může totéž co majitel. Vývojář skoro všechno jako majitel (ne fond a role). */
Object.assign(can,{
 approve:()=>['bank','own','vice','dev','gfx'].includes(S.role),
 editAcct:()=>['own','bank','dev'].includes(S.role),
 seeBank:()=>['own','bank'].includes(S.role)||S.bankAccess.includes(S.me),
 manageBank:()=>['own','bank'].includes(S.role),
 payFromBank:()=>['own','bank'].includes(S.role),
 config:()=>['own','bank','dev'].includes(S.role),
 admin:()=>['own','bank','dev','vice'].includes(S.role),
 roles:()=>['own','bank'].includes(S.role),
});
NAV.splice(5,0,['krypto','Krypto','coin']);
NAV.splice(NAV.findIndex(n=>n&&n[0]==='nastaveni'),0,['kviz','Kvíz','quiz']);
navList=function(){const ex=[];if(can.seeBank())ex.push(['banka','Banka','vault']);if(can.admin())ex.push(['sprava','Správa','shield']);if(can.approve())ex.push(['zadosti','Žádosti','inbox']);
 if(S.role==='bank')return [...ex,null,['tym','Tým','team'],['oznameni','Oznámení','bell'],['nastaveni','Nastavení','cog']];return ex.length?[...NAV,null,...ex]:NAV.slice()};

/* ---------- pomocné ---------- */
function log(t){S.audit.unshift({w:S.me,t,d:'Teď'})}
const blockedMe=()=>S.blocked.includes(S.me);
function guard(){if(blockedMe()){toast('Tvůj účet je zablokovaný. Ozvi se majiteli nebo Bance.',false);return true}return false}
function scoreMax(n){const s=S.score[n]||600;return s<500?2000:s<650?5000:10000}
function loanMax(){return Math.min(S.cfg.loanMax,scoreMax(S.me))}
function scoreLabel(s){return s<500?['Slabé','bad']:s<650?['Dobré','']:s<750?['Velmi dobré','ok']:['Výborné','ok']}
const others=()=>visible().filter(p=>p.n!==S.me);
const BADGES=[['first-pay','První platba','Poslal jsi první platbu','send'],['saver','Spořič','Vložil jsi na spoření','save'],['goal','Cíl splněn','Naspořil jsi na cíl','gift'],['investor','Investor','Koupil jsi první akcii','chart'],['crypto','Krypťák','Koupil jsi krypto','coin'],['miner','Horník','Vytěžil jsi HokaidoCoin','pick'],['loan-free','Bez dluhů','Splatil jsi půjčku','loan'],['jackpot','Jackpot','Velká výhra v kasinu','crown'],['quiz','Chytrá hlava','5 z 5 v kvízu','quiz']];
function award(id){if(S.badges.includes(id))return;S.badges.push(id);const b=BADGES.find(x=>x[0]===id);setTimeout(()=>toast('Nový odznak: '+b[1]+'!'),1200)}
let M_OK=null;
function modal(title,body,ok,onOk){const m=$('#modal');m.innerHTML=`<div class="glass in"><h3>${title}</h3>${body}<div class="row2" style="margin-top:14px"><button class="ghost" data-act="mClose">Zrušit</button><button class="cta" data-act="mOk">${ok}</button></div></div>`;m.classList.add('open');M_OK=onOk;setTimeout(()=>{const i=m.querySelector('input');i&&i.focus()},40)}
function notify(from,text,go){const n=$('#notif');n.innerHTML=`<span class="av">${from[0]}</span><span><b>${text}</b><small>Klikni pro detail</small></span>`;n.onclick=()=>{n.classList.remove('show');location.hash=go||'#/platby'};n.classList.add('show');clearTimeout(n._t);n._t=setTimeout(()=>n.classList.remove('show'),5500)}
function incoming(from,a,why){S.bal+=a;addTx('in',from,why,a);if(S.notif)notify(from,`${from} ti poslal ${fmt(a)}`);if(['ucet','platby'].includes(route()))render(1)}
const hp=sup=>1+sup/2000;
const hkBuyCost=q=>q+((S.hkc.sup+q)**2-S.hkc.sup**2)/4000;
const hkSellGain=q=>q+(S.hkc.sup**2-(S.hkc.sup-q)**2)/4000;
const cryptoVal=()=>S.wallet.HKC*hp(S.hkc.sup)+ST.filter(x=>x.c==='Krypto').reduce((t,x)=>t+(S.hold[x.id]||0)*x.p,0);
const addr=n=>'hk1-'+hashN(n+'nb').toString(16).padStart(8,'0')+hashN(n).toString(16).slice(0,4);
const _tb=topBar;topBar=(t,s)=>(blockedMe()?`<div class="blockbar">${I('lock')} Tvůj účet je zablokovaný – nemůžeš posílat peníze ani hrát. Ozvi se majiteli nebo Bance.</div>`:'')+_tb(t,s);

/* ---------- obalení původních akcí ---------- */
function pre(k,fn){const f=A[k];A[k]=function(b){if(fn(b)===false)return;return f.call(this,b)}}
function post(k,fn){const f=A[k];A[k]=function(b){const snap={tx:S.tx.length,hold:{...S.hold},loan:S.loan,fund:S.fund};const r=f.call(this,b);fn(snap,b);return r}}
['pay','chipBuy','chipSell','spin','lot','scrBuy','buy','sell','loan','savIn','savOut','repay','repayAll'].forEach(k=>pre(k,()=>guard()?false:undefined));
pre('pay',()=>{const a=num('#pAmt');if(S.pin.on&&S.pin.code&&a>=S.pin.over&&!S._pin){askPin(()=>{S._pin=1;A.pay();S._pin=0});return false}});
post('pay',s=>{if(S.tx.length>s.tx)award('first-pay')});
post('savIn',s=>{if(S.tx.length>s.tx)award('saver')});
const betPre=n=>{if(S.chips<n)return;if(S.limit.on&&S.limit.used+n>S.limit.max){toast(`Dnešní limit sázek je ${S.limit.max} ž. (zbývá ${Math.max(0,S.limit.max-S.limit.used)}). Změníš ho v Kasinu.`,false);return false}S.limit.used+=n};
pre('spin',()=>betPre(S.stake));pre('lot',()=>betPre(2));pre('scrBuy',()=>S.scr&&!S.scr.open?undefined:betPre(3));
post('spin',()=>setTimeout(()=>{if(S.reels.every(r=>r===S.reels[0]))award('jackpot')},1800));
pre('loan',()=>{if(S.fund-S.lAmt<S.cfg.reserve){toast('Banka teď půjčky nedává – fond by klesl pod rezervu.',false);return false}});
post('buy',s=>{const x=stk(S.sel);if((S.hold[x.id]||0)>(s.hold[x.id]||0)){S.cost[x.id]=(S.cost[x.id]||0)+(s.fund<S.fund?S.fund-s.fund:0);award(x.c==='Krypto'?'crypto':'investor')}});
post('sell',s=>{const x=stk(S.sel),o=s.hold[x.id]||0,n=S.hold[x.id]||0;if(n<o&&S.cost[x.id])S.cost[x.id]*=n/o});
['repay','repayAll','simDue'].forEach(k=>post(k,s=>{if(s.loan&&S.tx.length>s.tx){S.score[S.me]=Math.min(850,(S.score[S.me]||600)+10);if(!S.loan){S.score[S.me]=Math.min(850,S.score[S.me]+25);award('loan-free')}}}));
post('reqOk',()=>log('Schválil registraci · '+TEAM.at(-1).n));
pre('reqNo',b=>{log('Zamítl registraci · '+S.reqs[+b.dataset.v].n)});
post('fundPay',s=>{if(S.fund<s.fund)log('Výplata z fondu · '+fmt(s.fund-S.fund)+' → '+$('#fTo')?.value)});
post('interest',s=>{if(S.fund<s.fund)log('Vyplatil úroky ze spoření')});
function askPin(cb){modal('Potvrď platbu PINem',`<p class="mute sm">Platby od ${f0(S.pin.over)} chrání tvůj PIN.</p><label class="field">PIN<input id="pinIn" type="password" inputmode="numeric" maxlength="4" autocomplete="off"></label>`,'Potvrdit',()=>{if($('#pinIn').value!==S.pin.code){toast('Špatný PIN.',false);return false}setTimeout(cb,10)})}

/* ---------- příjemce: oblíbení ---------- */
pickRow=function(p,act){const f=S.favs.includes(p.n);return `<button type="button" class="pick-row ${S.pre===p.n?'on':''} ${act?'act':''}" data-act="pick" data-v="${p.n}" role="option"><span class="av s">${p.n[0]}</span><span class="m"><b>${p.n}</b><small>${p.r}${card(p.card).custom?' · custom karta':''}</small></span>${S.pre===p.n?I('check','ok'):''}<span class="star ${f?'on':''}" data-act="fav" data-v="${p.n}" title="${f?'Odebrat z oblíbených':'Přidat do oblíbených'}">${f?'★':'☆'}</span></button>`};
pickRows=function(q=''){q=norm(q.trim());const o=others();
 if(!q){const fav=S.favs.map(n=>o.find(p=>p.n===n)).filter(Boolean),rec=S.recent.filter(n=>!S.favs.includes(n)).map(n=>o.find(p=>p.n===n)).filter(Boolean);
  return (fav.length?`<div class="pick-h">★ Oblíbení</div>${fav.map(p=>pickRow(p)).join('')}`:'')+(rec.length?`<div class="pick-h">Nedávné</div>${rec.map(p=>pickRow(p)).join('')}`:'')+`<div class="pick-h">Všichni · ${o.length}</div>${o.map(p=>pickRow(p)).join('')}`}
 const list=o.filter(p=>norm(p.n).includes(q)||p.acct.startsWith(q)||norm(p.r).includes(q));
 if(!list.length){const d=/^\d+$/.test(q);return `<div class="pick-empty">${d?(q===me().acct?'To je tvůj vlastní účet.':`Účet ${q} neexistuje.`):'Nikoho takového nemáme.'}</div>`}
 return `<div class="pick-h">Nalezeno · ${list.length}</div>`+list.map((p,i)=>pickRow(p,i===0)).join('')};

/* ---------- stránky ---------- */
const selPeople=(id,cur)=>`<select id="${id}">${others().map(p=>`<option ${cur===p.n?'selected':''}>${p.n}</option>`).join('')}</select>`;
const noAccess=t=>topBar(t)+'<section class="glass box"><p class="mute" style="margin:0">Sem nemáš přístup.</p></section>';

/* Účet: spořicí cíle */
const _ucet=P.ucet;
P.ucet=()=>_ucet().replace('data-act="savOut">Vybrat</button></div></section>',`data-act="savOut">Vybrat</button></div>
<div class="sec" style="margin-top:20px"><h3 style="margin:0">Spořicí cíle</h3><button class="ghost sm" data-act="goalNew">+ Nový cíl</button></div>
${S.goals.length?S.goals.map((g,i)=>`<div class="goal"><div class="row"><b>${g.n}</b><span class="mute">${f0(g.s)} / ${f0(g.t)}</span></div><div class="prog"><i style="width:${Math.min(100,g.s/g.t*100)}%"></i></div><div class="mini"><button class="ghost sm" data-act="goalPut" data-v="${i}">Vložit</button><button class="ghost sm" data-act="goalTake" data-v="${i}">Vybrat</button>${g.s>=g.t?'<span class="tag2 ok" style="align-self:center">splněno</span>':''}</div></div>`).join(''):'<div class="empty">Zatím žádný cíl.</div>'}</section>`);

/* Platby */
P.platby=()=>{const t=S.payTab;const amt=`<label class="field">Částka (Sh)<input id="pAmt" type="number" min="1" placeholder="100" inputmode="decimal"></label>`;
 let form='';
 if(t==='send')form=recipient()+amt+`<label class="field">Zpráva pro příjemce<input id="pMsg" maxlength="60" placeholder="Za oběd"></label><p class="mute sm">Poplatek ${S.cfg.fee} % · k dispozici ${fmt(S.bal)}${S.pin.on?` · od ${f0(S.pin.over)} chce PIN`:''}</p><button class="cta" data-act="pay">${I('send')}Odeslat platbu</button>`;
 if(t==='req')form=recipient()+amt+`<label class="field">Za co<input id="rqWhy" maxlength="40" placeholder="Lístky do kina"></label><button class="cta" data-act="reqMoney">${I('recv')}Poslat žádost o peníze</button>${S.outReq.length?`<div class="pick-h" style="padding-left:0;margin-top:14px">Tvoje žádosti</div>${S.outReq.map(r=>`<div class="stock"><span>${r.to}<small>${r.why} · ${r.d}</small></span><span><b>${fmt(r.a)}</b><small class="mute" style="text-align:right">čeká</small></span></div>`).join('')}`:''}`;
 if(t==='split')form=`<label class="field">Kolik jsi zaplatil celkem (Sh)<input id="spAmt" type="number" min="1" placeholder="600" inputmode="decimal"></label><label class="field">Za co<input id="spWhy" maxlength="40" placeholder="Pizza"></label>
<div class="field">S kým se dělíš<div class="pick-search" style="margin:0">${I('search')}<input id="spSearch" placeholder="Hledej" autocomplete="off"></div><div class="spl">${others().map(p=>`<label data-q="${norm(p.n)}"><input type="checkbox" data-sp="${p.n}"><span class="av s">${p.n[0]}</span>${p.n}</label>`).join('')}</div></div>
<p class="sm" id="spInfo" style="color:var(--mute)">Vyber lidi a každý dostane žádost o svůj díl.</p><button class="cta" data-act="split">${I('team')}Rozdělit a poslat žádosti</button>`;
 return `${topBar('Platby')}
<div class="g2"><section class="glass box" style="position:relative;z-index:5"><div class="seg">${[['send','Poslat'],['req','Požádat'],['split','Rozdělit účet']].map(([k,l])=>`<button data-act="payTab" data-v="${k}" class="${t===k?'on':''}">${l}</button>`).join('')}</div>${form}</section>
<div class="stack">
<section class="glass box"><div class="sec"><h3>Žádosti o peníze pro tebe</h3><small class="mute">${S.inReq.length}</small></div>${S.inReq.length?S.inReq.map((r,i)=>`<div class="tx"><span class="av s">${r.from[0]}</span><div class="m"><b>${r.from} chce ${fmt(r.a)}</b><small>${r.why} · ${r.d}</small></div><div class="mini"><button class="ghost sm" data-act="reqDecline" data-v="${i}">Odmítnout</button><button class="cta" style="width:auto;padding:8px 12px" data-act="reqPay" data-v="${i}">Zaplatit</button></div></div>`).join(''):'<div class="empty">Nikdo po tobě nic nechce.</div>'}</section>
<section class="glass box"><div class="sec"><h3>Trvalé příkazy</h3><button class="ghost sm" data-act="orderNew">+ Nový</button></div>${S.orders.length?S.orders.map((o,i)=>`<div class="tx"><div class="ic">${I('repeat')}</div><div class="m"><b>${o.to} · ${fmt(o.a)}</b><small>${FREQ[o.freq]} · další ${cz(o.next)}${o.why?' · '+o.why:''}</small></div><button class="ghost sm" data-act="orderDel" data-v="${i}" aria-label="Zrušit příkaz">${I('x')}</button></div>`).join('')+`<button class="ghost" data-act="orderRun" style="margin-top:10px">${I('spark')}Provést splatné příkazy (jen prototyp)</button>`:'<div class="empty">Žádné trvalé příkazy.</div>'}</section>
<section class="glass box"><div class="sec"><h3>Historie</h3><div class="mini"><button class="ghost sm" data-act="csv">${I('down')}Výpis</button><button class="ghost sm" data-act="printStmt">${I('print')}PDF</button></div></div>${S.tx.map(txRow).join('')}</section>
</div></div>`};

/* Půjčky: úvěrové skóre */
const _puj=P.pujcky;
P.pujcky=()=>{const s=S.score[S.me]||600,[l,c]=scoreLabel(s);return _puj().replace('<div class="g2">',`<section class="glass box"><div class="sec"><h3>Tvoje úvěrové skóre</h3><span class="tag2 ${c}">${l}</span></div><div class="num md gtext">${s}</div><div class="gauge"><i style="left:${(s-300)/550*100}%"></i></div><div class="sec"><small class="mute">300</small><small class="mute">850</small></div><p class="sm" style="margin:10px 0 0">Můžeš si půjčit až <b>${f0(loanMax())}</b>. Skóre roste, když splácíš včas (+10 za splátku, +25 za splacení). Pod 500 je limit 2 000 Sh, od 650 až ${f0(S.cfg.loanMax)}.</p></section><div class="g2">`)};

/* Kasino: limit, blackjack, ruleta */
const REDS=[1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
const rlColor=n=>n===0?'green':REDS.includes(n)?'red':'black';
const RK=['','A','2','3','4','5','6','7','8','9','10','J','Q','K'];
const draw=()=>({r:1+Math.floor(Math.random()*13),s:'♠♥♦♣'[Math.floor(Math.random()*4)]});
const hv=h=>{let v=0,a=0;h.forEach(c=>{v+=c.r===1?11:Math.min(10,c.r);if(c.r===1)a++});while(v>21&&a){v-=10;a--}return v};
const crd=(c,hide)=>hide?'<span class="crd back">?</span>':`<span class="crd ${'♥♦'.includes(c.s)?'red':''}">${RK[c.r]}${c.s}</span>`;
const _kas=P.kasino;
P.kasino=()=>{const h=_kas(),i=h.lastIndexOf('</div>'),L=S.limit,bj=S.bj,rl=S.rl;
 const lim=`<section class="glass box"><div class="sec"><h3>Můj denní limit sázek</h3><input type="checkbox" class="switch" id="limOn" ${L.on?'checked':''} aria-label="Limit zapnutý"></div>
<p class="mute sm">Limit si nastavuješ sám. Můžeš ho změnit nebo úplně vypnout.</p>
${L.on?`<label class="field">Kolik žetonů můžu vsadit za den<input id="limMax" type="number" min="1" value="${L.max}" inputmode="numeric"></label><div class="prog"><i style="width:${Math.min(100,L.used/L.max*100)}%"></i></div><p class="sm" style="margin:0 0 12px">Dnes vsazeno <b>${L.used}</b> z ${L.max} ž.</p><button class="ghost" data-act="limSave">Uložit limit</button>`:`<p class="sm" style="margin:0">Limit je vypnutý · dnes vsazeno ${L.used} ž.</p>`}</section>`;
 const bjH=`<section class="glass box"><div class="gi">${I('cards')}</div><h3 style="margin:0 0 10px">Blackjack</h3>
${bj?`<div class="hand"><small>Bankéř · ${bj.done?hv(bj.d):'?'}</small>${bj.d.map((c,k)=>crd(c,k===1&&!bj.done)).join('')}</div><div class="hand"><small>Ty · ${hv(bj.p)}</small>${bj.p.map(c=>crd(c)).join('')}</div>
${bj.done?`<p class="sm" style="font-weight:700;margin:6px 0 12px" class="${bj.win?'pos':''}">${bj.msg}</p><button class="cta" data-act="bjNew">Nová hra</button>`:`<div class="row2"><button class="cta" data-act="bjHit">Další karta</button><button class="ghost" data-act="bjStand">Stačí</button></div>`}`
:`<p class="mute sm">Dostaň se co nejblíž 21, ale ne přes. Výhra ×2, blackjack ×2,5.</p><div class="stake">${[5,10,25,50].map(v=>`<button data-act="bjBet" data-v="${v}" class="${S.bjBet==v?'on':''}">${v} ž.</button>`).join('')}</div><button class="cta" data-act="bjDeal">Rozdat · ${S.bjBet} ž.</button>`}</section>`;
 const rlH=`<section class="glass box"><div class="gi">${I('wheel')}</div><h3 style="margin:0">Ruleta</h3><div class="rlnum ${rl.last===null?'':rlColor(rl.last)}" id="rlNum">${rl.last===null?'–':rl.last}</div>
<div class="seg">${[['red','Červená'],['black','Černá'],['green','Zelená 0'],['num','Číslo']].map(([k,l])=>`<button data-act="rlBet" data-v="${k}" class="${rl.bet===k?'on':''}">${l}</button>`).join('')}</div>
${rl.bet==='num'?`<label class="field">Tvoje číslo (0–36)<input id="rlN" type="number" min="0" max="36" value="${rl.n}" inputmode="numeric"></label>`:''}
<div class="stake">${[1,5,10,25].map(v=>`<button data-act="rlAmt" data-v="${v}" class="${rl.amt==v?'on':''}">${v} ž.</button>`).join('')}</div><button class="cta" data-act="rlSpin" id="rlBtn">Roztočit · ${rl.amt} ž.</button><p class="mute sm center" style="margin:10px 0 0">Barva ×2 · zelená a číslo ×36</p></section>`;
 return h.slice(0,i)+bjH+rlH+lim+h.slice(i)};

/* Burza: sledované, bez krypta, vývoj portfolia */
function holdings2(filter){const e=Object.entries(S.hold).filter(([id,q])=>q>0&&stk(id)&&filter(stk(id)));if(!e.length)return '<div class="empty">Zatím nic nevlastníš.</div>';
 return e.map(([id,q])=>{const s=stk(id),v=q*s.p,c=S.cost[id]||v,g=v-c;return `<div class="stock"><span>${s.n}<small>${q} ks · ${fmt(v)}</small></span><span style="text-align:right"><b class="${g>=0?'pos':'neg'}">${g>=0?'+':'−'}${fN(Math.abs(g))}</b><small>${pct(chg(s))} dnes</small></span></div>`}).join('')}
P.burza=()=>{const mk=ST.filter(x=>x.c!=='Krypto');if(!stk(S.sel)||stk(S.sel).c==='Krypto')S.sel=mk[0].id;const s=stk(S.sel),own=S.hold[s.id]||0,cats=[...new Set(mk.map(x=>x.c))],
 list=mk.filter(x=>S.cat==='all'||(S.cat==='watch'?S.watch.includes(x.id):x.c===S.cat)),c=chg(s),m=(s.h.at(-1)/s.h[0]-1)*100,w=S.watch.includes(s.id),
 val=mk.reduce((t,x)=>t+(S.hold[x.id]||0)*x.p,0),cost=mk.reduce((t,x)=>t+((S.hold[x.id]||0)?(S.cost[x.id]||(S.hold[x.id]*x.p)):0),0),g=val-cost;
return `${topBar('Burza','Portfolio '+f0(val))}
<div class="g2"><section class="glass box"><div class="sec"><h3>Trh · ${mk.length} značek</h3><small class="mute">${PRICES.live?`podle skutečného trhu · ${PRICES.at.toLocaleTimeString('cs-CZ',{hour:'2-digit',minute:'2-digit'})}`:'simulované ceny'}</small></div>
<div class="pick-search" style="margin:4px 0 10px">${I('search')}<input id="bSearch" placeholder="Hledej značku" autocomplete="off" value="${S.bq}"></div>
<label class="field"><select id="bCat" aria-label="Kategorie"><option value="all">Všechny kategorie</option><option value="watch" ${S.cat==='watch'?'selected':''}>★ Sledované (${S.watch.length})</option>${cats.map(k=>`<option ${S.cat===k?'selected':''}>${k}</option>`).join('')}</select></label>
<div class="mkt">${list.length?list.map(x=>{const ch=chg(x),wf=S.watch.includes(x.id);return `<button class="mi ${x.id===s.id?'on':''}" data-act="sel" data-v="${x.id}" data-q="${norm(x.n+' '+x.c)}" ${S.bq&&!norm(x.n+' '+x.c).includes(norm(S.bq))?'style="display:none"':''}><span style="display:flex;align-items:center;gap:4px;min-width:0"><span class="star ${wf?'on':''}" data-act="watch" data-v="${x.id}" style="padding:0 4px 0 0">${wf?'★':'☆'}</span><span><b>${x.n}</b><small>${x.c}</small></span></span><span><b>${fmt(x.p)}</b><small class="${ch>=0?'pos':'neg'}">${pct(ch)} dnes</small></span></button>`}).join(''):'<div class="empty">Zatím nic nesleduješ. Klikni na ☆ u značky.</div>'}</div></section>
<section class="glass box"><div class="sec"><small class="mute">${s.c}</small><span class="star ${w?'on':''}" data-act="watch" data-v="${s.id}">${w?'★ Sledováno':'☆ Sledovat'}</span></div><h3 style="font-size:22px;margin:2px 0 0">${s.n}</h3><div class="num md">${fmt(s.p)}</div><small class="${c>=0?'pos':'neg'}" style="font-weight:700">${pct(c)} dnes</small> <small class="mute">· ${pct(m)} za ${s.h.length} dní</small>${chart(s.h)}<p class="mute sm">Vlastníš ${own} ks · ${fmt(own*s.p)} · za svých ${f0(S.bal)} koupíš až ${Math.floor(S.bal/s.p)} ks</p>
<label class="field">Počet kusů<input id="bQty" type="number" min="1" value="1" inputmode="numeric"></label><div class="row2"><button class="cta" data-act="buy">Koupit</button><button class="ghost" data-act="sell">Prodat</button></div></section></div>
<section class="glass box"><div class="sec"><h3>Vývoj mého portfolia</h3><b class="${g>=0?'pos':'neg'}">${g>=0?'+':'−'}${fmt(Math.abs(g))}</b></div><div class="num md">${fmt(val)}</div><small class="mute">Zisk nebo ztráta od nákupu</small>${chart(pfHist())}${holdings2(x=>x.c!=='Krypto')}</section>`};

/* Krypto */
P.krypto=()=>{const cl=ST.filter(x=>x.c==='Krypto');if(!stk(S.csel))S.csel=cl[0]?.id;const s=stk(S.csel),price=hp(S.hkc.sup),h=S.hkc.hist,hc=(price/h[0]-1)*100,cv=cryptoVal(),a=addr(S.me),mined=S.mined===today();
 return `${topBar('Krypto','Peněženka '+f0(cv))}
<div class="r1"><section class="glass box bal"><small>Krypto peněženka</small><div class="num gtext">${fmt(cv)}</div>
<div class="pills"><div class="pill">HokaidoCoin<b>${fN(S.wallet.HKC)} HKC</b></div>${cl.filter(x=>S.hold[x.id]).map(x=>`<div class="pill">${x.n}<b>${S.hold[x.id]} ks</b></div>`).join('')}</div>
<div class="addr"><span>${a}</span><button class="ghost sm" data-act="copyAddr" data-v="${a}">${I('copy')}Kopírovat</button></div></section>
<section class="glass box"><div class="gi">${I('pick')}</div><h3 style="margin:0">Těžba</h3><p class="mute sm">Jednou denně si vytěžíš 5–15 HKC. V ostré bance přibude bonus za hraní na Minecraft serveru.</p>${mined?`<p class="sm" style="margin:0"><b>Dnes už vytěženo.</b> Další těžba zítra.</p>`:`<button class="cta" data-act="mine">${I('pick')}Vytěžit dnes</button>`}</section></div>
<div class="g2">
<section class="glass box"><div class="sec"><h3>HokaidoCoin · HKC</h3><span class="tag2">naše měna</span></div><div class="num md">${fmt(price)}</div><small class="${hc>=0?'pos':'neg'}" style="font-weight:700">${pct(hc)} za měsíc</small>${chart(h)}
<p class="mute sm">Cenu určují hráči: každý nákup ji zvedne, každý prodej sníží. V oběhu ${f0(S.hkc.sup).replace(' Sh','')} HKC.</p>
<label class="field">Kolik HKC<input id="hkQty" type="number" min="1" value="10" inputmode="numeric"></label><p class="sm" id="hkQuote" style="margin:-4px 0 12px;color:var(--mute)">${hkQuote(10)}</p><div class="row2"><button class="cta" data-act="hkBuy">Koupit</button><button class="ghost" data-act="hkSell">Prodat</button></div></section>
<section class="glass box"><div class="sec"><h3>Krypto podle skutečného trhu</h3><small class="mute">obchod i o víkendu</small></div><div class="mkt" style="max-height:220px">${cl.map(x=>`<button class="mi ${x.id===S.csel?'on':''}" data-act="csel" data-v="${x.id}"><span><b>${x.n}</b><small>${x.id.replace('-USD','')}</small></span><span><b>${fmt(x.p)}</b><small class="${chg(x)>=0?'pos':'neg'}">${pct(chg(x))} dnes</small></span></button>`).join('')}</div>
${s?`${chart(s.h)}<p class="mute sm">${s.n}: vlastníš ${S.hold[s.id]||0} ks</p><label class="field">Počet kusů<input id="kQty" type="number" min="1" value="1" inputmode="numeric"></label><div class="row2"><button class="cta" data-act="kBuy">Koupit</button><button class="ghost" data-act="kSell">Prodat</button></div>`:''}</section>
<section class="glass box"><h3>Poslat HKC</h3><label class="field">Komu${selPeople('hkTo')}</label><label class="field">Kolik HKC<input id="hkAmt" type="number" min="1" placeholder="5" inputmode="decimal"></label><p class="mute sm">Poplatek 1 % v HKC jde do Banky.</p><button class="cta" data-act="hkSend">${I('send')}Poslat krypto</button></section>
<section class="glass box"><h3>Staking · úrok za uzamčení</h3><p class="mute sm">Uzamkneš HKC a po skončení dostaneš úrok. Dřív vybrat nejde.</p>
<div class="seg">${[[7,2],[14,5],[30,12]].map(([d,r])=>`<button data-act="stDays" data-v="${d}" class="${(S.stDays||14)==d?'on':''}">${d} dní · ${r} %</button>`).join('')}</div>
<label class="field">Kolik HKC uzamknout<input id="stAmt" type="number" min="1" placeholder="50" inputmode="decimal"></label><button class="cta" data-act="stake2">${I('lock')}Uzamknout</button>
${S.stakes.map((x,i)=>`<div class="tx"><div class="ic">${I('lock')}</div><div class="m"><b>${fN(x.a)} HKC · ${x.r} %</b><small>${x.done?'vybráno':'odemkne se '+cz(x.until)}</small></div>${x.done?'':`<button class="ghost sm" data-act="stakeEnd" data-v="${i}" title="Prototyp: přeskočit čekání">Konec (test)</button>`}</div>`).join('')}</section>
</div>`};
function hkQuote(q){q=Math.floor(q)||0;if(q<=0)return 'Zadej počet.';const b=hkBuyCost(q),sg=q<=S.hkc.sup?hkSellGain(q)*(1-S.cfg.fee/100):0;return `Koupit ${q} HKC stojí ${fmt(b)} · prodej ti dá ${fmt(sg)}`}

/* Tým: udělování rolí */
P.tym=()=>`${topBar('Tým',visible().length+' lidí v bance')}
${can.editAcct()||can.roles()?`<section class="glass box"><p class="sm" style="margin:0">${I('edit')} <b>${ROLES[S.role]}</b> ${[can.roles()&&'uděluje role',can.editAcct()&&'mění čísla účtů'].filter(Boolean).join(' a ')}. Změny se zapíšou do záznamu změn.</p></section>`:''}
<section class="glass box"><div class="sec" style="margin-bottom:12px"><div class="pick-search" style="flex:1;margin:0">${I('search')}<input id="tSearch" placeholder="Hledej jméno nebo roli" autocomplete="off"></div><small class="mute" id="tCount" style="white-space:nowrap">${visible().length} lidí</small></div>
<div class="people">${visible().map(p=>`<div class="person" data-q="${norm(p.n+' '+p.r+' '+p.acct)}"><span class="av">${p.n[0]}</span><div class="m"><b>${p.n}${p.n===S.me?' <small>(ty)</small>':''}${S.blocked.includes(p.n)?' <span class="tag2 bad">zablokovaný</span>':''}</b>
${can.roles()&&p.k!=='own'?`<select class="rolesel" data-role="${p.n}" aria-label="Role ${p.n}">${['cust','vice','gfx','dev'].map(k=>`<option value="${k}" ${p.k===k?'selected':''}>${ROLES[k]}</option>`).join('')}</select>`:`<span class="role k-${p.k}">${p.r}</span>`}
<small>${can.editAcct()?` · účet <input class="acctin" data-acct="${p.n}" value="${p.acct}" inputmode="numeric" maxlength="6" aria-label="Číslo účtu ${p.n}">`:''}</small>${card(p.card).custom?' <small>· custom karta</small>':''}</div>${p.n!==S.me?`<button class="ghost sm" data-act="payTo" data-v="${p.n}">${I('send')}Poslat</button>`:''}</div>`).join('')}</div></section>`;

/* Banka */
const CATS=[['Poplatky',/^Poplatek/,1840],['Kasino',/žeton/i,2260],['Půjčky',/půjčk|splátka/i,1310],['Burza',/akcií/i,-420],['Krypto',/HKC/,180],['Pokuty',/^Pokuta/,300],['Výplaty a úroky',/^(Výplata|Úroky)/,-1660]];
P.banka=()=>{if(!can.seeBank())return noAccess('Banka');
 const inn=S.fundTx.filter(t=>t.d==='Teď'&&t.a>0).reduce((x,t)=>x+t.a,0),out=S.fundTx.filter(t=>t.d==='Teď'&&t.a<0).reduce((x,t)=>x-t.a,0),cas=S.cas.lost-S.cas.won,
  debt=S.debtors.reduce((t,d)=>t+d.debt,0)+(S.loan?S.loan.debt:0),res=S.fund>=S.cfg.reserve,
  rep=CATS.map(([n,re,base])=>[n,base+S.fundTx.filter(t=>t.d==='Teď'&&re.test(t.t)).reduce((x,t)=>x+t.a,0)]),mx=Math.max(...rep.map(r=>Math.abs(r[1])),1),net=rep.reduce((t,r)=>t+r[1],0),
  circ=[['Běžné účty',61800+S.bal],['Spoření',14200+S.sav+S.goals.reduce((t,g)=>t+g.s,0)],['Žetony (v Sh)',39000+S.chips*10],['Akcie',8800+pv()],['Krypto',2100+cryptoVal()]],
  rich=[['Tomáš',8420],['Ondra',5130],['Matyáš',3980],['Eliška',2760],[S.me,S.bal+S.sav]].sort((a,b)=>b[1]-a[1]);
 return `${topBar('Banka','Fond banky · účet 1000')}
<section class="glass box bal"><small>Peníze ve fondu</small><div class="num gtext">${fmt(S.fund)}</div>
<div class="pills"><div class="pill">Teď přišlo<b class="pos">+${f0(inn)}</b></div><div class="pill">Teď odešlo<b class="neg">−${f0(out)}</b></div><div class="pill">Půjčky venku<b>${f0(debt)}</b></div><div class="pill">Kasino pro banku<b class="${cas>=0?'pos':'neg'}">${cas>=0?'+':''}${cas} ž.</b></div><div class="pill">Rezerva<b class="${res?'pos':'neg'}">${res?'v pořádku':'pod limitem!'}</b></div></div>${chart(S.fundHist)}</section>
<div class="g2">
<div class="stack">
<section class="glass box"><div class="sec"><h3>Měsíční zpráva · ${new Date().toLocaleDateString('cs-CZ',{month:'long'})}</h3><b class="${net>=0?'pos':'neg'}">${net>=0?'+':'−'}${f0(Math.abs(net))}</b></div><div class="bars">${rep.map(([n,v])=>`<div class="b"><span>${n}</span><span class="t"><i style="width:${Math.abs(v)/mx*100}%;background:${v>=0?'linear-gradient(90deg,var(--a1),var(--a2))':'var(--neg)'}"></i></span><b class="${v>=0?'pos':'neg'}">${v>=0?'+':'−'}${f0(Math.abs(v))}</b></div>`).join('')}</div></section>
<section class="glass box"><div class="sec"><h3>Pohyby fondu</h3><small class="mute">${S.fundTx.length}</small></div>${S.fundTx.slice(0,10).map(t=>`<div class="tx"><div class="ic ${t.a>=0?'p':'n'}">${I(t.a>=0?'recv':'send')}</div><div class="m"><b>${t.t}</b><small>${t.w} · ${t.d}</small></div><div class="a ${t.a>=0?'pos':'neg'}">${t.a>=0?'+':'−'}${fN(Math.abs(t.a))}</div></div>`).join('')}</section>
<section class="glass box"><h3>Dlužníci</h3>${[...S.debtors,...(S.loan?[{n:S.me,debt:S.loan.debt}]:[])].map(d=>{const sc=S.score[d.n]||600,[l,c]=scoreLabel(sc);return `<div class="tx"><span class="av s">${d.n[0]}</span><div class="m"><b>${d.n} · ${fmt(d.debt)}</b><small>skóre ${sc} · <span class="tag2 ${c}">${l}</span></small></div><button class="ghost sm" data-act="remind" data-v="${d.n}">Upomínka</button></div>`}).join('')}</section>
<section class="glass box"><h3>Peníze v oběhu</h3>${circ.map(([n,v])=>`<div class="kv"><span>${n}</span><b>${f0(v)}</b></div>`).join('')}<div class="kv"><span><b style="color:var(--ink)">Celkem u lidí</b></span><b class="gtext">${f0(circ.reduce((t,c)=>t+c[1],0))}</b></div><div class="kv"><span>Ve fondu banky</span><b>${f0(S.fund)}</b></div></section>
</div>
<div class="stack">
${can.payFromBank()?`<section class="glass box"><h3>Výplata z fondu</h3><label class="field">Komu<select id="fTo">${visible().map(p=>`<option>${p.n}</option>`).join('')}</select></label><label class="field">Částka (Sh)<input id="fAmt" type="number" min="1" placeholder="500" inputmode="decimal"></label><label class="field">Důvod<input id="fWhy" maxlength="40" placeholder="Odměna za soutěž"></label><button class="cta" data-act="fundPay">Vyplatit z fondu</button>
<button class="ghost" data-act="interest" style="margin-top:10px">${I('gift')}Vyplatit pondělní úroky ze spoření</button></section>
<section class="glass box"><h3>Vklad a výběr z fondu</h3><p class="mute sm">Přidat do banky nové Sh (třeba odměny na začátek pololetí), nebo je stáhnout z oběhu.</p><label class="field">Částka (Sh)<input id="mAmt" type="number" min="1" placeholder="5000" inputmode="decimal"></label><div class="row2"><button class="cta" data-act="mint" data-v="1">Vložit do fondu</button><button class="ghost" data-act="mint" data-v="-1">Vybrat z fondu</button></div></section>`:''}
${can.config()?`<section class="glass box"><h3>Nastavení banky</h3><div class="cols2"><label class="field">Poplatek z plateb (%)<input id="cfFee" type="number" min="0" max="20" step="0.5" value="${S.cfg.fee}"></label><label class="field">Úrok spoření (%)<input id="cfSav" type="number" min="0" max="50" step="0.5" value="${S.cfg.sav}"></label><label class="field">Úrok půjček (%)<input id="cfLoan" type="number" min="0" max="100" step="1" value="${S.cfg.loanFee}"></label><label class="field">Max. půjčka (Sh)<input id="cfMax" type="number" min="100" step="100" value="${S.cfg.loanMax}"></label><label class="field">Rezerva fondu (Sh)<input id="cfRes" type="number" min="0" step="1000" value="${S.cfg.reserve}"></label></div><button class="cta" data-act="cfgSave">Uložit nastavení</button><p class="mute sm" style="margin:10px 0 0">Pod rezervou banka přestane dávat nové půjčky.</p></section>`:''}
<section class="glass box"><h3>Nejbohatší účty</h3>${rich.map(([n,v],i)=>`<div class="kv"><span>${i+1}. ${n}${n===S.me?' (ty)':''}</span><b>${f0(v)}</b></div>`).join('')}</section>
${can.manageBank()?`<section class="glass box"><h3>Kdo vidí Banku</h3><p class="mute sm">Majitel a Banka ji vidí vždy. Ostatním ji zapneš tady.</p>${visible().filter(p=>p.k!=='own'&&p.k!=='cust').concat(visible().filter(p=>p.k==='cust').slice(0,4)).map(p=>`<label class="kv" style="cursor:pointer"><span><b style="color:var(--ink)">${p.n}</b> · ${p.r}</span><input type="checkbox" class="switch" data-bacc="${p.n}" ${S.bankAccess.includes(p.n)?'checked':''}></label>`).join('')}</section>`:''}
</div></div>`};

/* Správa */
P.sprava=()=>{if(!can.admin())return noAccess('Správa');const pp=visible().filter(p=>p.k!=='own'&&p.n!==S.me);
 return `${topBar('Správa banky',ROLES[S.role])}
<div class="g2"><div class="stack">
<section class="glass box"><h3>Zablokování účtu</h3><p class="mute sm">Zablokovaný účet nemůže posílat peníze, hrát ani obchodovat, dokud ho neodblokuješ.</p><div class="pick-search" style="margin:0 0 6px">${I('search')}<input id="blSearch" placeholder="Hledej člověka" autocomplete="off"></div>
<div class="spl" style="max-height:260px">${pp.map(p=>{const b=S.blocked.includes(p.n);return `<div class="tx" data-q="${norm(p.n)}" style="padding:6px 6px"><span class="av s">${p.n[0]}</span><div class="m"><b>${p.n}</b><small>${p.r}</small></div><button class="${b?'cta':'ghost'} sm" style="${b?'width:auto;padding:8px 12px':''}" data-act="block" data-v="${p.n}">${b?'Odblokovat':'Zablokovat'}</button></div>`}).join('')}</div></section>
<section class="glass box"><h3>Pokuta</h3><label class="field">Komu${selPeople('fnTo')}</label><label class="field">Částka (Sh)<input id="fnAmt" type="number" min="1" placeholder="50" inputmode="decimal"></label><label class="field">Důvod<input id="fnWhy" maxlength="50" placeholder="Podvod v kasinu"></label><button class="cta" data-act="fine">Udělit pokutu</button><p class="mute sm" style="margin:10px 0 0">Pokuta jde do fondu Banky.</p></section>
</div><div class="stack">
<section class="glass box"><div class="sec"><h3>Záznam změn</h3><small class="mute">${S.audit.length}</small></div>${S.audit.slice(0,14).map(a=>`<div class="tx"><div class="ic">${I('shield')}</div><div class="m"><b>${a.t}</b><small>${a.w} · ${a.d}</small></div></div>`).join('')}</section>
<section class="glass box"><h3>Úvěrové skóre · nejrizikovější</h3>${visible().filter(p=>p.k!=='bank').sort((a,b)=>S.score[a.n]-S.score[b.n]).slice(0,6).map(p=>{const s=S.score[p.n],[l,c]=scoreLabel(s);return `<div class="kv"><span>${p.n}</span><span><span class="tag2 ${c}">${l}</span> <b>${s}</b></span></div>`}).join('')}</section>
</div></div>`};

/* Oznámení: reakce */
const RX=['👍','❤️','😂','🎉','😮'];
P.oznameni=()=>{const h=`${topBar('Oznámení')}<div style="display:flex;flex-direction:column;gap:12px">${S.ann.map((a,i)=>`<div class="ann ${a.n?'new':''}"><small>${a.w} · ${a.d}${a.n?' · <b class="gtext">nové</b>':''}</small><p>${a.t}</p><div>${RX.map(e=>{const n=(a.r[e]||0),m=a.mine[e];return n||m?`<button class="rx ${m?'on':''}" data-act="react" data-v="${i}|${e}">${e} ${n}</button>`:''}).join('')}<button class="rx" data-act="rxMore" data-v="${i}" aria-label="Přidat reakci">+ ${RX.filter(e=>!(a.r[e])).slice(0,3).join(' ')}</button></div></div>`).join('')}</div>`;setTimeout(()=>{if(S.unread){S.unread=0;S.ann.forEach(a=>a.n=0);navs()}},1500);return h};

/* Kvíz */
const QZ=[['Co je úrok?',['Peníze navíc za půjčení nebo spoření','Poplatek za vstup do banky','Druh platební karty'],0],
['Půjčíš si 1 000 Sh s úrokem 10 %. Kolik vrátíš?',['1 000 Sh','1 100 Sh','1 010 Sh'],1],
['Co znamená rozložit investice?',['Koupit jen jednu akcii','Dát peníze do více různých investic','Všechno hned prodat'],1],
['Proč je dobré mít rezervu peněz?',['Na nečekané výdaje','Aby banka nemohla platit','Kvůli vyšším poplatkům'],0],
['Akcie firmy znamená…',['Malý kousek vlastnictví firmy','Půjčku firmě','Slevový kupón'],0],
['Co je inflace?',['Ceny v čase rostou','Ceny v čase klesají','Úrok ze spoření'],0],
['Jak se chránit před podvodem?',['Nikomu neříkat PIN a heslo','Poslat heslo kamarádovi','Napsat PIN na kartu'],0],
['Spoříš 100 Sh měsíčně. Kolik máš za rok bez úroku?',['1 000 Sh','1 200 Sh','120 Sh'],1],
['Co je rozpočet?',['Plán příjmů a výdajů','Druh účtu','Bankovní poplatek'],0],
['Proč na kasinu vydělává banka?',['Hráči v průměru víc prohrají, než vyhrají','Banka vždy prohraje','Kasino nic nevydělává'],0],
['Co je úvěrové skóre?',['Jak spolehlivě splácíš','Počet tvých karet','Výše tvého kapesného'],0],
['Kryptoměna HokaidoCoin zdraží, když…',['Hodně lidí ji kupuje','Hodně lidí ji prodává','Je víkend'],0]];
P.kviz=()=>{const q=S.qz,done=S.qzDay===today();
 if(!q||(!q.qs.length)){return `${topBar('Kvíz o penězích')}<section class="glass box"><div class="gi">${I('quiz')}</div><h3>Denní kvíz</h3><p class="mute sm">5 otázek o penězích. Za každou správnou odpověď dostaneš ${f0(10)} z fondu Banky. Jednou za den.</p>${done?'<p class="sm"><b>Dnes už máš hotovo.</b> Další kvíz zítra.</p>':`<button class="cta" data-act="qStart">Začít kvíz</button>`}</section>`}
 if(q.i>=q.qs.length)return `${topBar('Kvíz o penězích')}<section class="glass box center"><div class="num gtext">${q.score} / ${q.qs.length}</div><p>Získáváš <b>${f0(q.score*10)}</b>.</p><button class="ghost" data-act="qClose">Hotovo</button></section>`;
 const [t,opts,ok]=QZ[q.qs[q.i]];
 return `${topBar('Kvíz o penězích',`Otázka ${q.i+1} z ${q.qs.length}`)}<section class="glass box"><div class="prog"><i style="width:${q.i/q.qs.length*100}%"></i></div><h3 style="font-size:20px;margin:14px 0 16px">${t}</h3>${opts.map((o,k)=>`<button class="qopt ${q.ans!==null?(k===ok?'ok':k===q.ans?'bad':''):''}" data-act="qAns" data-v="${k}" ${q.ans!==null?'disabled':''}>${o}</button>`).join('')}${q.ans!==null?`<p class="sm" style="font-weight:700" >${q.ans===ok?'Správně! +10 Sh':'Tohle nebylo ono.'}</p><button class="cta" data-act="qNext">${q.i+1<q.qs.length?'Další otázka':'Výsledek'}</button>`:''}</section>`};

/* Nastavení: bezpečnost, upozornění, odznaky, instalace */
P.nastaveni=()=>{const p=me(),mine=CARDS.filter(c=>(!c.custom||c.id===p.card||(c.recipients||[]).includes(S.me))&&(!c.collectible||S.mycol.includes(c.id.slice(4)))),cv=cryptoVal();return `${topBar('Nastavení')}
<div class="g2"><div class="stack">
<section class="glass box"><h3>Vzhled</h3><div class="seg"><button data-act="theme" data-v="dark" class="${S.theme==='dark'?'on':''}">Tmavý</button><button data-act="theme" data-v="light" class="${S.theme==='light'?'on':''}">Světlý</button><button data-act="theme" data-v="system" class="${S.theme==='system'?'on':''}">Podle zařízení</button></div><p class="mute sm" style="margin:0">Pamatuje se v tomto prohlížeči.</p></section>
<section class="glass box"><h3>Profil</h3><label class="field">Jméno<input id="nm" value="${p.n}" maxlength="20"></label><div class="kv"><span>Číslo účtu</span><b>${p.acct}</b></div><div class="kv"><span>Role</span><b>${p.r}</b></div><button class="ghost" data-act="rename" style="margin-top:10px">Uložit jméno</button></section>
<section class="glass box"><h3>Bezpečnost</h3><label class="kv" style="cursor:pointer"><span><b style="color:var(--ink)">PIN pro platby</b></span><input type="checkbox" class="switch" id="pinOn" ${S.pin.on?'checked':''}></label>${S.pin.on?`<div class="kv"><span>PIN</span><b>${S.pin.code?'•••• nastavený':'zatím nenastavený'}</b></div><button class="ghost" data-act="pinSet">${I('lock')}${S.pin.code?'Změnit PIN':'Nastavit PIN'}</button><label class="field" style="margin-top:12px">Chtít PIN od částky (Sh)<input id="pinOver" type="number" min="1" value="${S.pin.over}" inputmode="numeric"></label>`:''}
<label class="kv" style="cursor:pointer;margin-top:6px"><span><b style="color:var(--ink)">Upozornění na příchozí platby</b></span><input type="checkbox" class="switch" id="notifOn" ${S.notif?'checked':''}></label></section>
<section class="glass box"><h3>Instalace na telefon</h3><p class="mute sm">Banka jde přidat na plochu a otevře se jako aplikace, bez lišty prohlížeče.</p><button class="cta" data-act="install" ${window._bip?'':'disabled'}>${I('phone')}Nainstalovat aplikaci</button><p class="mute sm" style="margin:10px 0 0"><b>iPhone:</b> Safari → Sdílet → Přidat na plochu. <b>Android:</b> Chrome → ⋮ → Nainstalovat aplikaci.</p></section>
</div><div class="stack">
${S.role==='bank'?'':`<section class="glass box"><h3>Moje karta</h3><div style="max-width:320px;margin-bottom:14px">${pc()}</div><div class="gal">${mine.map(c=>{const lock=(c.min&&S.bal+S.sav<c.min)||(c.minCrypto&&cv<c.minCrypto);return `<button class="gc ${p.card===c.id?'on':''}" data-act="card" data-v="${c.id}" ${lock?'disabled':''}><span class="sw" style="background:${c.bg}"></span>${c.n}${c.custom?' · custom':''}</button>`}).join('')}</div></section>`}
<section class="glass box"><div class="sec"><h3>Odznaky</h3><small class="mute">${S.badges.length} / ${BADGES.length}</small></div><div class="badges">${BADGES.map(([id,n,d,ic])=>`<div class="bdg ${S.badges.includes(id)?'on':''}"><div class="c2">${I(ic)}</div><b>${n}</b>${d}</div>`).join('')}</div></section>
<section class="glass box"><h3>Prototyp · role</h3><p class="mute sm">Přepni roli a vyzkoušej, co kdo vidí. Do Banky se přihlásíš přes Odhlásit → jméno <b>Banka</b>.</p>${S.role==='bank'?'':`<div class="seg" style="flex-wrap:wrap">${['cust','vice','gfx','dev','own'].map(k=>`<button data-act="role" data-v="${k}" class="${S.role===k?'on':''}">${ROLES[k]}</button>`).join('')}</div>`}
${[['Schvaluje registrace',can.approve()],['Mění čísla účtů',can.editAcct()],['Uděluje role',can.roles()],['Správa (blokace, pokuty)',can.admin()],['Nastavení banky',can.config()],['Vidí Banku',can.seeBank()],['Vyplácí z fondu',can.payFromBank()]].map(([n,v])=>`<div class="kv"><span>${n}</span><b class="${v?'pos':''}">${v?'ano':'ne'}</b></div>`).join('')}
<div class="row2" style="margin-top:12px"><button class="ghost" data-act="simIn">${I('recv')}Příchozí platba (test)</button><button class="ghost" data-act="logout">${I('out')}Odhlásit</button></div></section>
</div></div>`};

/* ---------- nové akce ---------- */
const bjFinish=(win,msg)=>{const bj=S.bj;bj.done=1;bj.msg=msg;bj.win=win;S.chips+=win;S.cas.won+=win;if(win>=bj.bet*2.5)award('jackpot');toast(msg,win>0)};
Object.assign(A,{
 mClose(){$('#modal').classList.remove('open')},
 mOk(){if(M_OK&&M_OK()===false)return;A.mClose()},
 fav(b){const n=b.dataset.v;S.favs=S.favs.includes(n)?S.favs.filter(x=>x!==n):[...S.favs,n];$('#pList').innerHTML=pickRows($('#pSearch')?.value||'')},
 payTab(b){S.payTab=b.dataset.v;render(1)},
 reqMoney(){const to=S.pre,a=num('#pAmt'),why=$('#rqWhy').value.trim()||'bez popisu';if(!to)return toast('Vyber, koho žádáš.',false);if(!(a>0))return toast('Zadej částku.',false);S.outReq.unshift({to,a,why,d:'Teď'});toast('Žádost poslána: '+to+' · '+fmt(a));render(1)},
 split(){const t=num('#spAmt'),why=$('#spWhy').value.trim()||'společný účet',ps=[...document.querySelectorAll('[data-sp]:checked')].map(c=>c.dataset.sp);if(!(t>0))return toast('Zadej celkovou částku.',false);if(!ps.length)return toast('Vyber aspoň jednoho člověka.',false);const share=Math.round(t/(ps.length+1)*100)/100;ps.forEach(n=>S.outReq.unshift({to:n,a:share,why,d:'Teď'}));toast(`Žádosti poslány ${ps.length} lidem po ${fmt(share)}`);S.payTab='req';render(1)},
 reqPay(b){if(guard())return;const i=+b.dataset.v,r=S.inReq[i],fee=Math.round(r.a*S.cfg.fee)/100;if(r.a+fee>S.bal)return toast('Nemáš dost peněz.',false);S.bal-=r.a+fee;fund(fee,'Poplatek z platby');addTx('out',r.from,r.why,-(r.a+fee));S.inReq.splice(i,1);toast('Zaplaceno '+r.from+' · '+fmt(r.a));render(1)},
 reqDecline(b){const r=S.inReq.splice(+b.dataset.v,1)[0];toast('Žádost od '+r.from+' odmítnuta.',false);render(1)},
 orderNew(){modal('Nový trvalý příkaz',`<label class="field">Komu${selPeople('oTo')}</label><div class="cols2"><label class="field">Částka (Sh)<input id="oAmt" type="number" min="1" placeholder="20"></label><label class="field">Jak často<select id="oFreq">${Object.entries(FREQ).map(([k,v])=>`<option value="${k}" ${k==='weekly'?'selected':''}>${v}</option>`).join('')}</select></label></div><label class="field">První platba<input id="oDate" type="date" min="${addDays(1)}" value="${addDays(7)}"></label><label class="field">Poznámka<input id="oWhy" maxlength="30" placeholder="Kapesné"></label>`,'Uložit příkaz',()=>{const a=num('#oAmt');if(!(a>0)){toast('Zadej částku.',false);return false}S.orders.push({to:$('#oTo').value,a,freq:$('#oFreq').value,next:$('#oDate').value,why:$('#oWhy').value.trim()});toast('Trvalý příkaz uložen.');setTimeout(()=>render(1))})},
 orderDel(b){const o=S.orders.splice(+b.dataset.v,1)[0];toast('Příkaz pro '+o.to+' zrušen.');render(1)},
 orderRun(){if(guard())return;let n=0;S.orders.forEach(o=>{const fee=Math.round(o.a*S.cfg.fee)/100;if(S.bal>=o.a+fee){S.bal-=o.a+fee;fund(fee,'Poplatek z platby');addTx('out',o.to,'trvalý příkaz'+(o.why?' · '+o.why:''),-(o.a+fee));o.next=nextDate(o.next,o.freq,+o.next.slice(8));n++}});toast(n?`Provedeno ${n} příkazů.`:'Na příkazy nejsou peníze.',!!n);render(1)},
 csv(){const rows=[['Datum','Popis','Částka (Sh)'],...S.tx.map(t=>[t.d,t.t,String(t.a).replace('.',',')])];const csv='﻿'+rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(';')).join('\r\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='vypis-nasebanka.csv';document.body.appendChild(a);a.click();a.remove();toast('Výpis stažen (otevřeš v Excelu).')},
 printStmt(){const w=open('','_blank');if(!w)return toast('Prohlížeč zablokoval nové okno.',false);w.document.write(`<!doctype html><meta charset="utf-8"><title>Výpis z účtu</title><style>body{font-family:sans-serif;padding:28px;color:#111}table{border-collapse:collapse;width:100%}td,th{padding:7px 10px;border-bottom:1px solid #ddd;text-align:left}td:last-child,th:last-child{text-align:right}</style><h2>NašeBanka · výpis z účtu ${me().acct}</h2><p>${S.me} · ${new Date().toLocaleDateString('cs-CZ')} · zůstatek ${fmt(S.bal)}</p><table><tr><th>Datum</th><th>Popis</th><th>Částka</th></tr>${S.tx.map(t=>`<tr><td>${t.d}</td><td>${t.t}</td><td>${fN(t.a)} Sh</td></tr>`).join('')}</table>`);w.document.close();w.print()},
 goalNew(){modal('Nový spořicí cíl','<label class="field">Na co šetříš<input id="gN" maxlength="30" placeholder="Nové boty"></label><label class="field">Kolik potřebuješ (Sh)<input id="gT" type="number" min="1" placeholder="1000"></label>','Vytvořit',()=>{const n=$('#gN').value.trim(),t=num('#gT');if(!n||!(t>0)){toast('Vyplň název i částku.',false);return false}S.goals.push({n,t,s:0});setTimeout(()=>render(1))})},
 goalPut(b){const g=S.goals[+b.dataset.v];modal('Vložit do cíle · '+g.n,`<label class="field">Kolik (Sh) · na účtu máš ${fmt(S.bal)}<input id="gA" type="number" min="1" placeholder="50"></label>`,'Vložit',()=>{const a=num('#gA');if(!(a>0)||a>S.bal){toast('Neplatná částka.',false);return false}S.bal-=a;g.s+=a;addTx('int','Spořicí cíl · '+g.n,'spoření',-a);if(g.s>=g.t)award('goal');setTimeout(()=>render(1))})},
 goalTake(b){const i=+b.dataset.v,g=S.goals[i];if(!g.s){S.goals.splice(i,1);return render(1)}S.bal+=g.s;addTx('int','Výběr z cíle · '+g.n,'spoření',g.s);toast('Vybráno '+fmt(g.s)+' z cíle '+g.n);g.s=0;render(1)},
 limSave(){const m=Math.floor(num('#limMax'));if(!(m>0))return toast('Zadej limit.',false);S.limit.max=m;toast('Limit uložen: '+m+' ž. denně.');render(1)},
 bjBet(b){S.bjBet=+b.dataset.v;render(1)},
 bjDeal(){if(guard())return;const n=S.bjBet;if(S.chips<n)return toast('Nemáš dost žetonů.',false);if(betPre(n)===false)return;S.chips-=n;S.cas.lost+=n;S.bj={bet:n,p:[draw(),draw()],d:[draw(),draw()],done:0};if(hv(S.bj.p)===21)bjFinish(Math.floor(n*2.5),'Blackjack! Vyhráváš '+Math.floor(n*2.5)+' ž.');render(1)},
 bjHit(){const bj=S.bj;bj.p.push(draw());if(hv(bj.p)>21)bjFinish(0,'Přes 21 – prohra.');else if(hv(bj.p)===21)return A.bjStand();render(1)},
 bjStand(){const bj=S.bj;while(hv(bj.d)<17)bj.d.push(draw());const p=hv(bj.p),d=hv(bj.d);if(d>21||p>d)bjFinish(bj.bet*2,'Vyhráváš '+bj.bet*2+' ž.!');else if(p===d)bjFinish(bj.bet,'Remíza – sázka se vrací.');else bjFinish(0,'Bankéř vyhrál ('+d+').');render(1)},
 bjNew(){S.bj=null;render(1)},
 rlBet(b){S.rl.bet=b.dataset.v;render(1)},
 rlAmt(b){S.rl.amt=+b.dataset.v;render(1)},
 rlSpin(){if(guard())return;const rl=S.rl,n=rl.amt;if(rl.bet==='num'){const v=Math.floor(num('#rlN'));if(!(v>=0&&v<=36))return toast('Zadej číslo 0–36.',false);rl.n=v}if(S.chips<n)return toast('Nemáš dost žetonů.',false);if(betPre(n)===false)return;S.chips-=n;S.cas.lost+=n;
  const res=Math.floor(Math.random()*37),el=$('#rlNum'),btn=$('#rlBtn');btn.disabled=true;let k=0;const iv=setInterval(()=>{const r=Math.floor(Math.random()*37);el.textContent=r;el.className='rlnum '+rlColor(r);if(++k>16){clearInterval(iv);rl.last=res;const c=rlColor(res),win=(rl.bet===c?(c==='green'?36:2):rl.bet==='num'&&rl.n===res?36:0)*n;S.chips+=win;S.cas.won+=win;if(win>=n*36)award('jackpot');toast(win?`Padlo ${res} – vyhráváš ${win} ž.!`:`Padlo ${res}. Tentokrát nic.`,!!win);render(1)}},70)},
 watch(b){const id=b.dataset.v;S.watch=S.watch.includes(id)?S.watch.filter(x=>x!==id):[...S.watch,id];render(1)},
 csel(b){S.csel=b.dataset.v;render(1)},
 kBuy(){if(guard())return;const s=stk(S.csel),q=Math.floor(num('#kQty'));if(!(q>0))return toast('Zadej počet.',false);const c=q*s.p;if(c>S.bal)return toast('Nemáš dost Sh.',false);S.bal-=c;fund(c,'Nákup krypta · '+s.n);S.hold[s.id]=(S.hold[s.id]||0)+q;S.cost[s.id]=(S.cost[s.id]||0)+c;addTx('inv','Nákup · '+s.n,'krypto',-c);award('crypto');toast('Koupeno '+q+' ks '+s.n);render(1)},
 kSell(){if(guard())return;const s=stk(S.csel),q=Math.floor(num('#kQty')),o=S.hold[s.id]||0;if(!(q>0)||q>o)return toast('Tolik nemáš.',false);const g=q*s.p;if(g>S.fund)return toast('Banka teď nemá dost peněz.',false);S.hold[s.id]=o-q;if(S.cost[s.id])S.cost[s.id]*=(o-q)/o;S.bal+=g;fund(-g,'Výkup krypta · '+s.n);addTx('inv','Prodej · '+s.n,'krypto',g);toast('Prodáno '+q+' ks '+s.n);render(1)},
 hkBuy(){if(guard())return;const q=Math.floor(num('#hkQty'));if(!(q>0))return toast('Zadej počet.',false);const c=Math.round(hkBuyCost(q)*100)/100;if(c>S.bal)return toast('Nemáš dost Sh.',false);S.bal-=c;S.hkc.sup+=q;S.wallet.HKC+=q;S.hkc.hist.push(hp(S.hkc.sup));fund(c,'Prodej HKC hráči');addTx('inv','Nákup · HokaidoCoin',q+' HKC',-c);award('crypto');toast(`Koupeno ${q} HKC · cena teď ${fmt(hp(S.hkc.sup))}`);render(1)},
 hkSell(){if(guard())return;const q=Math.floor(num('#hkQty'));if(!(q>0)||q>S.wallet.HKC)return toast('Tolik HKC nemáš.',false);const g=Math.round(hkSellGain(q)*(1-S.cfg.fee/100)*100)/100;if(g>S.fund)return toast('Banka teď nemá dost peněz.',false);S.bal+=g;S.hkc.sup-=q;S.wallet.HKC-=q;S.hkc.hist.push(hp(S.hkc.sup));fund(-g,'Výkup HKC');addTx('inv','Prodej · HokaidoCoin',q+' HKC',g);toast(`Prodáno ${q} HKC · cena teď ${fmt(hp(S.hkc.sup))}`);render(1)},
 hkSend(){if(guard())return;const to=$('#hkTo').value,a=num('#hkAmt');if(!(a>0))return toast('Zadej množství.',false);const fee=Math.round(a*1)/100;if(a+fee>S.wallet.HKC)return toast('Tolik HKC nemáš (i s poplatkem).',false);S.wallet.HKC=Math.round((S.wallet.HKC-a-fee)*100)/100;fund(fee*hp(S.hkc.sup),'Poplatek HKC');addTx('inv','HKC → '+to,fN(a)+' HKC',0);toast(`Posláno ${fN(a)} HKC → ${to}`);render(1)},
 copyAddr(b){navigator.clipboard?.writeText(b.dataset.v).then(()=>toast('Adresa zkopírována.'),()=>toast(b.dataset.v))},
 stDays(b){S.stDays=+b.dataset.v;render(1)},
 stake2(){const d=S.stDays||14,r={7:2,14:5,30:12}[d],a=num('#stAmt');if(!(a>0)||a>S.wallet.HKC)return toast('Tolik HKC nemáš.',false);S.wallet.HKC-=a;S.stakes.unshift({a,r,until:addDays(d)});toast(`Uzamčeno ${fN(a)} HKC na ${d} dní.`);render(1)},
 stakeEnd(b){const x=S.stakes[+b.dataset.v],gain=Math.round(x.a*x.r)/100;x.done=1;S.wallet.HKC+=x.a+gain;S.hkc.sup+=gain;toast(`Vráceno ${fN(x.a)} HKC + úrok ${fN(gain)} HKC`);render(1)},
 mine(){if(S.mined===today())return;const q=5+Math.floor(Math.random()*11);S.mined=today();S.wallet.HKC+=q;S.hkc.sup+=q;award('miner');toast(`Vytěženo ${q} HKC!`);render(1)},
 cfgSave(){const v=id=>num(id);const c={fee:v('#cfFee'),sav:v('#cfSav'),loanFee:v('#cfLoan'),loanMax:v('#cfMax'),reserve:v('#cfRes')};if(Object.values(c).some(x=>!(x>=0)))return toast('Zkontroluj čísla.',false);const ch=Object.keys(c).filter(k=>c[k]!==S.cfg[k]);Object.assign(S.cfg,c);if(ch.length)log('Změnil nastavení banky · '+ch.map(k=>({fee:'poplatek',sav:'úrok spoření',loanFee:'úrok půjček',loanMax:'max. půjčka',reserve:'rezerva'})[k]+' '+c[k]).join(', '));toast('Nastavení banky uloženo.');render(1)},
 mint(b){const a=num('#mAmt'),s=+b.dataset.v;if(!(a>0))return toast('Zadej částku.',false);if(s<0&&a>S.fund)return toast('Ve fondu tolik není.',false);fund(s*a,s>0?'Vklad do fondu':'Výběr z fondu');log((s>0?'Vložil do fondu ':'Vybral z fondu ')+fmt(a));toast((s>0?'Vloženo ':'Vybráno ')+fmt(a));render(1)},
 remind(b){log('Poslal upomínku · '+b.dataset.v);toast('Upomínka poslána: '+b.dataset.v)},
 block(b){const n=b.dataset.v,on=!S.blocked.includes(n);S.blocked=on?[...S.blocked,n]:S.blocked.filter(x=>x!==n);log((on?'Zablokoval účet · ':'Odblokoval účet · ')+n);toast(n+(on?' je zablokovaný.':' je odblokovaný.'),!on);render(1)},
 fine(){const to=$('#fnTo').value,a=num('#fnAmt'),why=$('#fnWhy').value.trim()||'bez udání důvodu';if(!(a>0))return toast('Zadej částku.',false);fund(a,'Pokuta · '+why,to);log(`Udělil pokutu · ${to} · ${fmt(a)} (${why})`);toast(`Pokuta ${fmt(a)} → ${to}`);render(1)},
 react(b){const[i,e]=b.dataset.v.split('|'),a=S.ann[+i];a.mine[e]=!a.mine[e];a.r[e]=(a.r[e]||0)+(a.mine[e]?1:-1);if(!a.r[e])delete a.r[e];render(1)},
 rxMore(b){const i=+b.dataset.v,a=S.ann[i];modal('Přidat reakci',`<div style="display:flex;gap:8px;flex-wrap:wrap">${RX.map(e=>`<button class="rx ${a.mine[e]?'on':''}" style="font-size:22px;padding:8px 12px" data-act="react" data-v="${i}|${e}">${e}</button>`).join('')}</div>`,'Hotovo',()=>{})},
 qStart(){const pool=[...QZ.keys()].sort(()=>Math.random()-.5).slice(0,5);S.qz={qs:pool,i:0,score:0,ans:null};render(1)},
 qAns(b){const q=S.qz,k=+b.dataset.v;q.ans=k;if(k===QZ[q.qs[q.i]][2])q.score++;render(1)},
 qNext(){const q=S.qz;q.i++;q.ans=null;if(q.i>=q.qs.length){S.qzDay=today();const r=q.score*10;if(r){S.bal+=r;fund(-r,'Odměna za kvíz');addTx('in','Banka','odměna za kvíz',r)}if(q.score===q.qs.length)award('quiz')}render(1)},
 qClose(){S.qz=null;render(1)},
 simIn(){const p=others()[Math.floor(Math.random()*6)];incoming(p.n,[20,50,100,150][Math.floor(Math.random()*4)],'vrácení')},
 install(){if(!window._bip)return;window._bip.prompt();window._bip=null},
 pinSave(){const c=$('#pinCode').value,o=num('#pinOver');if(c&&!/^\d{4}$/.test(c))return toast('PIN musí mít 4 číslice.',false);if(!c&&!S.pin.code)return toast('Zadej PIN.',false);if(c)S.pin.code=c;if(o>0)S.pin.over=o;toast('PIN uložen.');render(1)},
});

/* ---------- vstupy ---------- */
document.addEventListener('input',e=>{const t=e.target;
 if(t.id==='hkQty')$('#hkQuote').textContent=hkQuote(num('#hkQty'));
 if(t.id==='spSearch'){const q=norm(t.value.trim());document.querySelectorAll('.spl label').forEach(l=>l.style.display=!q||l.dataset.q.includes(q)?'':'none')}
 if(t.id==='blSearch'){const q=norm(t.value.trim());document.querySelectorAll('.spl [data-q]').forEach(l=>l.style.display=!q||l.dataset.q.includes(q)?'':'none')}
 if(t.id==='spAmt'||t.dataset.sp)spInfo();
});
function spInfo(){const el=$('#spInfo');if(!el)return;const t=num('#spAmt'),n=document.querySelectorAll('[data-sp]:checked').length;el.innerHTML=n&&t>0?`Každý zaplatí <b>${fmt(t/(n+1))}</b> (vás je ${n+1} i s tebou).`:'Vyber lidi a každý dostane žádost o svůj díl.'}
document.addEventListener('change',e=>{const t=e.target;
 if(t.dataset.sp)spInfo();
 if(t.id==='limOn'){S.limit.on=t.checked;toast(t.checked?'Denní limit zapnutý.':'Denní limit vypnutý.');render(1)}
 if(t.id==='pinOn'){S.pin.on=t.checked;if(!t.checked)toast('PIN vypnutý.');render(1);if(t.checked&&!S.pin.code)A.pinSet()}
 if(t.id==='pinOver'){const o=Math.floor(num('#pinOver'));if(o>0){S.pin.over=o;toast('PIN se bude chtít od '+f0(o)+'.')}}
 if(t.id==='notifOn'){S.notif=t.checked;toast(t.checked?'Upozornění zapnutá.':'Upozornění vypnutá.')}
 if(t.dataset.role){const p=TEAM.find(x=>x.n===t.dataset.role),old=p.r;p.k=t.value;p.r=ROLES[t.value];if(p.n===S.me)S.role=p.k;log(`Změnil roli · ${p.n}: ${old} → ${p.r}`);toast(`${p.n} je teď ${p.r.toLowerCase()}.`);render(1)}
 if(t.classList.contains('acctin')&&t.value!==t.defaultValue)log('Změnil číslo účtu · '+t.dataset.acct+' → '+t.value);
 if(t.dataset.bacc)log((t.checked?'Povolil Banku · ':'Odebral Banku · ')+t.dataset.bacc);
});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.closest('#modal')){e.preventDefault();A.mOk()}if(e.key==='Escape')A.mClose()});
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')A.mClose()});

/* ---------- instalace (PWA) ---------- */
addEventListener('beforeinstallprompt',e=>{e.preventDefault();window._bip=e;if(route()==='nastaveni')render(1)});
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});

/* ---------- stírací los: skutečné stírání (jako v původní bance) ---------- */
document.head.insertAdjacentHTML('beforeend',`<style>
.sticket{position:relative;aspect-ratio:3/1;border-radius:16px;overflow:hidden;display:grid;place-items:center;margin:12px 0 0;border:1px solid var(--line);background:radial-gradient(circle at 20% 30%,rgba(250,204,21,.25),transparent 40%),linear-gradient(135deg,#1e1b4b,#581c87 55%,#0e7490)}
.sticket .sprize{font-size:clamp(18px,5vw,30px);color:#fde68a;letter-spacing:.02em}
.sticket.lost .sprize{color:#cbd5e1;font-size:clamp(15px,4vw,20px)}
.sticket.won{box-shadow:0 0 0 2px var(--a2),0 0 28px var(--glow)}
.sticket canvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:crosshair}
.odds{font-size:13px;color:var(--mute);margin:4px 0 10px}.odds summary{cursor:pointer;font-weight:600}
</style>`);
// výplaty a šance stejně jako v původní bance
const scratchPrize=n=>n<600?0:n<800?3:n<920?6:n<980?12:n<995?30:60;
scratchHtml=function(){const t=S.scr,odds='<details class="odds"><summary>Možné výplaty a šance</summary>Bez výhry 60 % · 3 ž. 20 % · 6 ž. 12 % · 12 ž. 6 % · 30 ž. 1,5 % · 60 ž. 0,5 %</details>';
 if(!t)return `<div class="scratch">Kup si los a setři ho</div>${odds}`;
 return `<div class="sticket ${t.open?(t.prize?'won':'lost'):''}"><b class="sprize">${t.prize?'+'+t.prize+' žetonů':'Tentokrát bez výhry'}</b>${t.open?'':'<canvas id="scrCv" width="600" height="200" aria-label="Stírací plocha losu"></canvas>'}</div>
<p class="mute sm center" style="margin:8px 0 10px">${t.open?(t.prize?'Výhra připsána k tvým žetonům.':'Los je vyhodnocený.'):'Setři plochu prstem nebo myší.'}</p>${t.open?'':'<button class="ghost" data-act="scratch" style="margin-bottom:8px">Odkrýt celý los</button>'}${odds}`};
A.scrBuy=function(){if(guard())return;if(S.scr&&!S.scr.open)return toast('Nejdřív setři ten, co máš.',false);if(S.chips<3)return toast('Los stojí 3 žetony.',false);if(betPre(3)===false)return;
 S.chips-=3;S.cas.lost+=3;S.scr={open:0,prize:scratchPrize(Math.floor(Math.random()*1000))};render(1)};
post('scratch',()=>{if(S.scr&&S.scr.prize>=60)award('jackpot')});
function initScratch(){const cv=$('#scrCv');if(!cv||cv._ok)return;cv._ok=1;const c=cv.getContext('2d');
 const g=c.createLinearGradient(0,0,600,200);g.addColorStop(0,'#e2e8f0');g.addColorStop(.45,'#94a3b8');g.addColorStop(.55,'#cbd5e1');g.addColorStop(1,'#e2e8f0');c.fillStyle=g;c.fillRect(0,0,600,200);
 for(let i=0;i<140;i++){c.fillStyle=`rgba(255,255,255,${Math.random()*.6})`;c.fillRect(Math.random()*600,Math.random()*200,2,2)}
 c.fillStyle='#312e81';c.textAlign='center';c.font='bold 30px "Space Grotesk",sans-serif';c.fillText('✦  SETŘI A VYHRAJ  ✦',300,112);
 let ptr=null;const pos=e=>{const b=cv.getBoundingClientRect();return{x:(e.clientX-b.left)*600/b.width,y:(e.clientY-b.top)*200/b.height}};
 const at=e=>{const p=pos(e);c.globalCompositeOperation='destination-out';c.lineWidth=46;c.lineCap='round';c.beginPath();c.moveTo(ptr.x,ptr.y);c.lineTo(p.x,p.y);c.stroke();c.beginPath();c.arc(p.x,p.y,23,0,Math.PI*2);c.fill();ptr.x=p.x;ptr.y=p.y};
 cv.onpointerdown=e=>{ptr={id:e.pointerId,...pos(e)};cv.setPointerCapture(e.pointerId);at(e)};
 cv.onpointermove=e=>{if(ptr&&ptr.id===e.pointerId)at(e)};
 cv.onpointerup=e=>{if(!ptr||ptr.id!==e.pointerId)return;ptr=null;const d=c.getImageData(0,0,600,200).data;let clear=0,total=0;for(let i=3;i<d.length;i+=64){total++;if(d[i]<128)clear++}if(clear/total>=.4)A.scratch()};
 cv.onpointercancel=()=>{ptr=null}}
const _render=render;render=function(k){_render(k);initScratch()};

/* ---------- PIN klávesnice (telefon i PC; na PC jde psát i klávesnicí, jen číslice) ---------- */
document.head.insertAdjacentHTML('beforeend',`<style>
.pinbox{width:min(340px,100%)!important}
.pindots{display:flex;gap:16px;justify-content:center;margin:16px 0 22px}
.pindots i{width:16px;height:16px;border-radius:50%;border:2px solid var(--mute);transition:.15s}
.pindots i.on{background:linear-gradient(135deg,var(--a1),var(--a2));border-color:transparent;box-shadow:0 0 12px var(--glow)}
.pindots.shake{animation:shk .4s}.pindots.shake i{border-color:var(--neg)}
@keyframes shk{20%,60%{transform:translateX(-9px)}40%,80%{transform:translateX(9px)}}
.pinpad{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.pinpad button{height:62px;border-radius:18px;border:1px solid var(--line);background:var(--panel2);color:var(--ink);font:600 24px "Space Grotesk",sans-serif;cursor:pointer;transition:.1s;-webkit-user-select:none;user-select:none}
.pinpad button:hover{border-color:var(--a2)}
.pinpad button:active,.pinpad button.hit{transform:scale(.94);background:var(--glow);border-color:var(--a2)}
.pinpad .pk-alt{font-size:14px;font-weight:600;color:var(--mute)}
.kbhint{display:none;text-align:center;margin:14px 0 0}
@media (hover:hover) and (pointer:fine){.kbhint{display:block}}
</style>`);
let PIN={v:'',cb:null};
function pinPad(title,sub,cb){PIN={v:'',cb};const m=$('#modal');m.dataset.pin='1';M_OK=null;
 m.innerHTML=`<div class="glass in pinbox"><h3 class="center" style="margin-bottom:4px">${title}</h3><p class="mute sm center" style="margin:0">${sub}</p>
<div class="pindots" id="pinDots" aria-live="polite" aria-label="Zadáno 0 ze 4 číslic"><i></i><i></i><i></i><i></i></div>
<div class="pinpad">${[1,2,3,4,5,6,7,8,9].map(n=>`<button type="button" data-act="pinKey" data-v="${n}">${n}</button>`).join('')}<button type="button" class="pk-alt" data-act="mClose">Zrušit</button><button type="button" data-act="pinKey" data-v="0">0</button><button type="button" class="pk-alt" data-act="pinDel" aria-label="Smazat poslední číslici">⌫</button></div>
<p class="mute sm kbhint">Můžeš psát i čísly na klávesnici · Backspace maže · Esc zavře</p></div>`;
 m.classList.add('open');document.activeElement?.blur?.()}
function pinDots(err){const el=$('#pinDots');if(!el)return;el.querySelectorAll('i').forEach((d,i)=>d.classList.toggle('on',i<PIN.v.length));el.setAttribute('aria-label',`Zadáno ${PIN.v.length} ze 4 číslic`);if(err){el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake')}}
function pinPress(d){if(!/^\d$/.test(d)||PIN.v.length>=4)return;PIN.v+=d;pinDots();const k=document.querySelector(`.pinpad [data-v="${d}"]`);if(k){k.classList.add('hit');setTimeout(()=>k.classList.remove('hit'),120)}
 if(PIN.v.length===4){const v=PIN.v,cb=PIN.cb;setTimeout(()=>{if(cb(v)===false){PIN.v='';pinDots(true)}},160)}}
A.pinKey=b=>pinPress(b.dataset.v);
A.pinDel=()=>{PIN.v=PIN.v.slice(0,-1);pinDots()};
{const mc=A.mClose,mo=A.mOk;A.mClose=()=>{delete $('#modal').dataset.pin;mc()};A.mOk=()=>{if($('#modal').dataset.pin)return;mo()}}
{const md=modal;modal=function(...a){delete $('#modal').dataset.pin;md(...a)}}
document.addEventListener('keydown',e=>{const m=$('#modal');if(!m.classList.contains('open')||!m.dataset.pin)return;
 if(/^\d$/.test(e.key)){e.preventDefault();pinPress(e.key)}else if(e.key==='Backspace'){e.preventDefault();A.pinDel()}else if(e.key==='Escape'){e.preventDefault();A.mClose()}else if(e.key.length===1||e.key==='Enter')e.preventDefault()},true);
askPin=function(cb){pinPad('Zadej PIN',`Platby od ${f0(S.pin.over)} chrání tvůj PIN.`,v=>{if(v!==S.pin.code){toast('Špatný PIN.',false);return false}A.mClose();setTimeout(cb,10)})};
A.pinSet=function(){pinPad(S.pin.code?'Nový PIN':'Nastav si PIN','Zadej 4 číslice',first=>{setTimeout(()=>pinPad('Zopakuj PIN','Pro kontrolu ještě jednou',second=>{if(second!==first){toast('PINy se neshodují, zkus to znovu.',false);return false}S.pin.code=second;S.pin.on=true;A.mClose();toast('PIN je nastavený.');render(1)}),60)})};

/* ---------- start ---------- */
/* start je na konci prototyp-funkce2.js */
