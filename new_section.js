/* ============ TIỆN ÍCH SỐ HỌC DỊCH ============ */
function modK(k,base){var r=k%base;return r===0?base:r;}
function hourChiNum(h){return Math.floor(((h+1)%24)/2)+1;}
function approxLunar(d){
 var ref=Date.UTC(2024,1,10),SYN=29.530588853;
 var days=Math.floor((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())-ref)/86400000);
 var mf=days/SYN,ms=Math.floor(mf);
 var day=Math.floor((mf-ms)*SYN)+1;
 if(day>30)day=30;
 var year=2024+Math.floor(ms/12);
 var month=((ms%12)+12)%12+1;
 var yc=((year-4)%12+12)%12+1;
 return {y:year,m:month,d:day,yc:yc};
}
function valsFromYM(yang,mv){return yang.map(function(y,i){return y?(mv[i]?9:7):(mv[i]?6:8);});}
function castFromULD(up,lo,dong){
 var yang=yangFromTri(up,lo),mv=[false,false,false,false,false,false];
 mv[dong-1]=true;
 return {vals:valsFromYM(yang,mv),yang:yang,mv:mv};
}
function nuclear(yang){
 var loB=(yang[1]?'1':'0')+(yang[2]?'1':'0')+(yang[3]?'1':'0');
 var upB=(yang[2]?'1':'0')+(yang[3]?'1':'0')+(yang[4]?'1':'0');
 var up=TBYBIN[upB],lo=TBYBIN[loB];
 return {up:up,lo:lo,num:HEXMAT[up][lo]};
}
function theDung(up,lo,mv){
 var idx=[];for(var i=0;i<6;i++)if(mv[i])idx.push(i);
 if(idx.length!==1)return null;
 var p=idx[0],dl=p<3;
 return {pos:p,dung:dl?lo:up,the:dl?up:lo,dungLo:dl};
}
function tdRel(theEl,dungEl){
 if(theEl===dungEl)return 'ty';
 if(SHENG[dungEl]===theEl)return 'ds';
 if(KE[dungEl]===theEl)return 'dk';
 if(SHENG[theEl]===dungEl)return 'ts';
 return 'tk';
}
function upLoRel(up,lo){
 var U=TRI[up],L=TRI[lo];
 if(U.el===L.el)return 'ty';
 if(SHENG[U.el]===L.el)return 'us';
 if(SHENG[L.el]===U.el)return 'ls';
 if(KE[U.el]===L.el)return 'uk';
 return 'lk';
}
function shannon(yang){
 var y=0,i;for(i=0;i<6;i++)if(yang[i])y++;
 var p=y/6;
 if(p===0||p===1)return {H:0,y:y};
 return {H:-(p*Math.log2(p)+(1-p)*Math.log2(1-p)),y:y};
}
function fibAround(n){
 var lo=FIB[0],hi=FIB[FIB.length-1],i;
 for(i=0;i<FIB.length;i++){if(FIB[i]<=n)lo=FIB[i];}
 for(i=FIB.length-1;i>=0;i--){if(FIB[i]>=n){hi=FIB[i];break;}}
 return {lo:lo,hi:hi};
}
function haDoScore(yang,binfo){
 var cnt={'Kim':0,'Mộc':0,'Thủy':0,'Hỏa':0,'Thổ':0};
 function add(ti,w){cnt[TRI[ti].el]+=w;}
 var b=numFromYang(yang),nu=nuclear(yang);
 add(b.up,2);add(b.lo,2);add(nu.up,1);add(nu.lo,1);
 if(binfo){add(binfo.up,1);add(binfo.lo,1);}
 var tot=0,k;for(k in cnt)tot+=cnt[k];
 var H=0;
 for(k in cnt){if(cnt[k]>0){var pp=cnt[k]/tot;H-=pp*Math.log2(pp);}}
 return {cnt:cnt,bal:H/Math.log2(5)};
}
var TOKSTOP=['cỦA'.toLowerCase(),'và','là','có','được','cho','với','một','những','các','trong','không','tôi','mình','này','đó','thì','mà','ở','về','việc','đi','đến','ra','vào','trên','dưới','sẽ','đã','đang','rất','bao','nhiêu','khi','nào','hay','làm','sao','gì','ai','người','nên','muốn','cần','biết','theo','từ','bị','như','thế','năm','tháng','ngày','hơn','còn','lại','cũng','đây','kia','ấy','vậy','vẫn','mới','chỉ','rồi','đâu','ạ','họ','em','anh','chị'];
function toks(s){
 var t=norm(s).split(/[^a-z0-9]+/),o=[],i;
 for(i=0;i<t.length;i++){if(t[i]&&TOKSTOP.indexOf(t[i])<0)o.push(t[i]);}
 return o;
}
function domainFit(q,x,dom){
 if(!q)return .55;
 var qt=toks(q);if(!qt.length)return .55;
 var dt=toks(x.m+' '+x.c+' '+x.w+' '+x.l+' '+x.h);
 var ov=0,i;
 for(i=0;i<qt.length;i++)if(dt.indexOf(qt[i])>=0)ov++;
 var ratio=Math.min(1,ov/Math.max(2,Math.min(6,Math.ceil(qt.length/2))));
 return .35+.65*ratio;
}
function bayes(fit){
 var p0=1/64,LR=1+9*fit;
 return {p0:p0,p1:LR*p0/(LR*p0+1-p0),LR:LR};
}
function qcVerdict(rel,dong){
 var base=RELSC[rel],pos=[.55,.9,.45,.6,.95,.5][dong-1];
 var s=(base+pos)/2;
 if(s>=.8)return 'Thiên thời chí, địa lợi túc, nhân hòa đầy — tam tài tương đắc, mưu sự khả thành; cứ quyết tâm mà tiến, trời đất cùng tương trợ.';
 if(s>=.65)return 'Tam tài tương hòa mà chưa viên mãn — việc có thể thành, song phải chọn đúng thời cơ, nhờ thêm nhân lực phù giúp mới trọn vẹn.';
 if(s>=.5)return 'Thiên địa có phần tương trở, nhân hòa còn thiếu — mưu sự nửa được nửa mất; nên hoãn mà cầu nhân duyên, chớ nóng vội.';
 return 'Thiên thời vị chí, địa lợi bất túc, nhân hòa tương phạm — tam tài tương khắc; việc lớn nên dừng, giữ gốc tu đức để chờ thời vận chuyển.';
}
function hMini(yang,mv){
 var h='<div class="hmini">';
 for(var i=5;i>=0;i--)h+='<div class="row2'+(mv&&mv[i]?' mv2':'')+'">'+(yang[i]?'<i class="wf"></i>':'<i class="wh"></i><i class="wh"></i>')+'</div>';
 return h+'</div>';
}
function castHexHTML(yang,mv){
 var h='';
 for(var i=0;i<6;i++){
  h+='<div class="yao'+(mv[i]?' mv':'')+'" style="animation-delay:'+(i*0.12)+'s"><div class="bars">'
   +(yang[i]?'<span class="b full"></span>':'<span class="b half"></span><span class="b half"></span>')
   +'</div><span class="mk">'+(mv[i]?(yang[i]?'○':'✕'):'')+'</span></div>';
 }
 return h;
}
function pct(p){return (p*100).toFixed(p<0.01?2:1)+'%';}
/* ============ CHỌN PHƯƠNG PHÁP ============ */
var curM='coins',mhMode='time',qcMode='rand';
(function methodSeg(){
 var opts=document.querySelectorAll('#methodSeg .sopt');
 opts.forEach(function(o){
  o.addEventListener('click',function(){
   opts.forEach(function(x){x.classList.remove('on');});
   o.classList.add('on');curM=o.dataset.m;
   ['coins','maihoa','quycoc'].forEach(function(m){var el=$('mp-'+m);if(el)el.style.display=(m===curM?'block':'none');});
   $('btnCast').textContent=BTNLBL[curM];
  });
 });
})();
(function subSel(){
 function wire(boxId,attr,cb){
  var ps=document.querySelectorAll('#'+boxId+' .pill');
  ps.forEach(function(p){
   p.addEventListener('click',function(){
    ps.forEach(function(x){x.classList.remove('on');});
    p.classList.add('on');cb(p.dataset[attr]);
   });
  });
 }
 wire('mhPills','mh',function(v){
  mhMode=v;
  $('mh-time').style.display=v==='time'?'block':'none';
  $('mh-num').style.display=v==='num'?'block':'none';
  $('mh-text').style.display=v==='text'?'block':'none';
 });
 wire('qcPills','qc',function(v){
  qcMode=v;
  $('qc-num').style.display=v==='num'?'block':'none';
 });
})();
(function prefillMH(){
 var now=new Date(),L=approxLunar(now),hc=hourChiNum(now.getHours());
 $('mhYC').value=L.yc;$('mhLM').value=L.m;$('mhLD').value=L.d;$('mhHC').value=hc;
 $('mhTimeNote').innerHTML='Quy đổi xấp xỉ từ giờ dương hiện tại: <b>ngày '+L.d+' tháng '+L.m+' năm '+CHINAME[L.yc-1]+'</b> (âm lịch), giờ <b>'+CHINAME[hc-1]+'</b> ('+hc+').';
})();
/* ============ THU THẬP ĐẦU VÀO & KHỞI QUẺ ============ */
function clampNum(v,min,max,msg){
 var n=parseInt(v,10);
 if(isNaN(n)||n<min||n>max){alert(msg);return null;}
 return n;
}
function gatherCast(){
 var q=$('q').value.trim(),dom=curDom;
 if(curM==='coins')return {m:'coins',vals:null,q:q,dom:dom,meta:{}};
 var upN,loN,dong,meta={};
 if(curM==='maihoa'){
  meta.kind=mhMode;
  if(mhMode==='time'){
   var yc=clampNum($('mhYC').value,1,12,'Vui lòng nhập chi của năm (số 1–12).');if(yc===null)return null;
   var lm=clampNum($('mhLM').value,1,12,'Vui lòng nhập tháng âm lịch (1–12).');if(lm===null)return null;
   var ld=clampNum($('mhLD').value,1,30,'Vui lòng nhập ngày âm lịch (1–30).');if(ld===null)return null;
   var hc=clampNum($('mhHC').value,1,12,'Vui lòng nhập chi của giờ (1–12).');if(hc===null)return null;
   var A=yc+lm+ld,B=A+hc;
   upN=modK(A,8);loN=modK(B,8);dong=modK(B,6);
   meta.yc=yc;meta.lm=lm;meta.ld=ld;meta.hc=hc;
   meta.recap='Thởi gian âm lịch: năm '+CHINAME[yc-1]+' ('+yc+'), tháng '+lm+', ngày '+ld+', giờ '+CHINAME[hc-1]+' ('+hc+'). Thượng quái: ('+yc+'+'+lm+'+'+ld+') = '+A+', '+A+' mod 8 = '+upN+' → '+TRI[upN-1].name+'. Hạ quái: '+A+' + '+hc+' = '+B+', '+B+' mod 8 = '+loN+' → '+TRI[loN-1].name+'. Hào động: '+B+' mod 6 = '+dong+' → hào '+POSNAME[dong-1]+'.';
  }else if(mhMode==='num'){
   var a=clampNum($('mhN1').value,1,999999999,'Vui lòng nhập số thứ nhất (≥ 1).');if(a===null)return null;
   var b=clampNum($('mhN2').value,1,999999999,'Vui lòng nhập số thứ hai (≥ 1).');if(b===null)return null;
   var c=clampNum($('mhN3').value,1,999999999,'Vui lòng nhập số thứ ba (≥ 1).');if(c===null)return null;
   upN=modK(a,8);loN=modK(b,8);dong=modK(a+b+c,6);
   meta.a=a;meta.b=b;meta.c=c;
   meta.recap='Ba số '+a+', '+b+', '+c+': '+a+' mod 8 = '+upN+' → thượng '+TRI[upN-1].name+'; '+b+' mod 8 = '+loN+' → hạ '+TRI[loN-1].name+'; tổng '+(a+b+c)+' mod 6 = '+dong+' → hào '+POSNAME[dong-1]+' động.';
  }else{
   var str=$('mhStr').value.trim();
   var chars=str.replace(/\s+/g,'').replace(/[.,;:!?"'“”‘’()\-–—…\/\\|@#$%^&*+=<>{}\[\]~`]/g,'');
   var n=Array.from(chars).length;
   if(n<2){alert('Vui lòng nhập một câu hoặc cụm chữ có ít nhất 2 chữ cái.');return null;}
   var h1=Math.ceil(n/2),h2=n-h1;
   upN=modK(h1,8);loN=modK(h2,8);dong=modK(n,6);
   meta.txt=str.slice(0,40);
   meta.recap='Câu "'+str+'" đếm được '+n+' chữ: nửa đầu '+h1+' chữ mod 8 = '+upN+' → thượng '+TRI[upN-1].name+'; nửa sau '+h2+' chữ mod 8 = '+loN+' → hạ '+TRI[loN-1].name+'; tổng '+n+' mod 6 = '+dong+' → hào '+POSNAME[dong-1]+' động.';
  }
 }else{
  meta.mode=qcMode;
  if(qcMode==='xu')return {m:'quycoc',vals:null,q:q,dom:dom,meta:{mode:'xu',thuc:[]}};
  var t,d,nn;
  if(qcMode==='rand'){
   t=1+Math.floor(Math.random()*100);d=1+Math.floor(Math.random()*100);nn=1+Math.floor(Math.random()*100);
  }else{
   t=clampNum($('qcN1').value,1,100,'Vui lòng nhập Thiên thức (1–100).');if(t===null)return null;
   d=clampNum($('qcN2').value,1,100,'Vui lòng nhập Địa thức (1–100).');if(d===null)return null;
   nn=clampNum($('qcN3').value,1,100,'Vui lòng nhập Nhân thức (1–100).');if(nn===null)return null;
  }
  upN=modK(t,8);loN=modK(d,8);dong=modK(nn,6);
  meta.thuc=[t,d,nn];
 }
 meta.upN=upN;meta.loN=loN;meta.dong=dong;
 var cc=castFromULD(upN-1,loN-1,dong);
 return {m:curM,vals:cc.vals,yang:cc.yang,mv:cc.mv,dong:dong,q:q,dom:dom,meta:meta};
}
/* ============ HIỆU ỨNG GIEO ============ */
var casting=false,rot=[0,0,0],VALNAME={6:'Lão Âm · hào âm động',7:'Thiếu Dương · hào dương',8:'Thiếu Âm · hào âm',9:'Lão Dương · hào dương động'};
function flipCoins(){
 var wraps=document.querySelectorAll('#coinsRow .coin-wrap');
 var coins=document.querySelectorAll('#coinsRow .coin');
 wraps.forEach(function(w){w.classList.remove('jump');});
 if(wraps[0])void wraps[0].offsetWidth;
 wraps.forEach(function(w){w.classList.add('jump');});
 var faces=[],sum=0;
 coins.forEach(function(c,i){
  var heads=Math.random()<0.5;
  faces.push(heads);sum+=heads?3:2;
  var cur=((rot[i]%360)+360)%360,want=heads?0:180;
  var delta=((want-cur)%360+360)%360;
  rot[i]+=(3+Math.floor(Math.random()*3))*360+delta;
  c.style.transform='rotateX('+rot[i]+'deg)';
 });
 if(navigator.vibrate){try{navigator.vibrate(12);}catch(e){}}
 return {faces:faces,sum:sum};
}
function startCast(){
 if(casting)return;
 var cast=gatherCast();
 if(!cast)return;
 casting=true;
 var btn=$('btnCast');btn.disabled=true;btn.textContent='ĐANG KHỞI QUẺ...';
 $('result').innerHTML='';$('castHex').innerHTML='';
 $('castCard').style.display='block';
 var useCoins=cast.m==='coins'||(cast.m==='quycoc'&&cast.meta.mode==='xu');
 $('coinsRow').style.display=useCoins?'flex':'none';
 $('castCard').scrollIntoView({behavior:'smooth',block:'center'});
 if(cast.m==='coins'){cast.vals=[];setTimeout(function(){doRound(cast,0);},600);}
 else if(useCoins){setTimeout(function(){doQRound(cast,0);},600);}
 else{quickReveal(cast,0);}
}
function doRound(cast,r){
 if(r>=6){finishCast(cast);return;}
 $('castStatus').innerHTML='Lần gieo thứ <b>'+(r+1)+' / 6</b> — tụ khí vào ba đồng xu...';
 var f=flipCoins();
 setTimeout(function(){
  var faceTxt=f.faces.map(function(x){return x?'Ngửa':'Sấp';}).join(' · ');
  var numTxt=f.faces.map(function(x){return x?3:2;}).join('+');
  cast.vals.push(f.sum);
  $('castStatus').innerHTML='Lần <b>'+(r+1)+'</b>: '+faceTxt+' = '+numTxt+' = <b>'+f.sum+'</b><br><b>'+VALNAME[f.sum]+'</b>'+(f.sum===6||f.sum===9?' — hào động!':'');
  var yang=f.sum===7||f.sum===9,mv=f.sum===6||f.sum===9;
  var y=document.createElement('div');
  y.className='yao'+(mv?' mv':'');
  y.innerHTML='<div class="bars">'+(yang?'<span class="b full"></span>':'<span class="b half"></span><span class="b half"></span>')+'</div><span class="mk">'+(mv?(yang?'○':'✕'):'')+'</span>';
  $('castHex').appendChild(y);
  setTimeout(function(){doRound(cast,r+1);},650);
 },1050);
}
function doQRound(cast,r){
 var thuc=cast.meta.thuc;
 if(r>=3){
  var upN=modK(thuc[0],8),loN=modK(thuc[1],8),dong=modK(thuc[2],6);
  cast.dong=dong;cast.meta.upN=upN;cast.meta.loN=loN;cast.meta.dong=dong;
  var cc=castFromULD(upN-1,loN-1,dong);
  cast.vals=cc.vals;cast.yang=cc.yang;cast.mv=cc.mv;
  finishCast(cast);return;
 }
 $('castStatus').innerHTML='Lần gieo <b>'+(r+1)+' / 3</b> — tụ khí cầu <b>'+['Thiên Thức','Địa Thức','Nhân Thức'][r]+'</b>...';
 var f=flipCoins();
 setTimeout(function(){
  thuc.push(f.sum);
  var faceTxt=f.faces.map(function(x){return x?'Ngửa':'Sấp';}).join(' · ');
  $('castStatus').innerHTML='<b>'+['Thiên Thức','Địa Thức','Nhân Thức'][r]+'</b>: '+faceTxt+' = <b>'+f.sum+'</b>';
  setTimeout(function(){doQRound(cast,r+1);},800);
 },1050);
}
function revealSteps(cast){
 var meta=cast.meta,s=[];
 if(cast.m==='maihoa'){
  s.push('Khởi cục Mai Hoa — '+(meta.kind==='time'?'lấy quẻ theo thời gian':meta.kind==='num'?'lấy quẻ theo vãn số':'lấy quẻ theo tự số')+'...');
  if(meta.kind==='time')s.push('Năm '+CHINAME[meta.yc-1]+' ('+meta.yc+') + tháng '+meta.lm+' + ngày '+meta.ld+' = '+(meta.yc+meta.lm+meta.ld));
  else if(meta.kind==='num')s.push('Ba số: '+meta.a+' · '+meta.b+' · '+meta.c);
  else s.push('Câu: "'+esc(meta.txt||'')+'"');
  s.push('Thượng quái: '+TRI[meta.upN-1].sym+' '+TRI[meta.upN-1].name+' ('+meta.upN+') — Hạ quái: '+TRI[meta.loN-1].sym+' '+TRI[meta.loN-1].name+' ('+meta.loN+')');
  s.push('Hào động: hào '+POSNAME[meta.dong-1]+' ('+meta.dong+') — nhất động dẫn biến toàn quẻ');
 }else{
  var th=meta.thuc;
  s.push('Quỷ Cốc khởi thức — Tam Tài Thiên Địa Nhân...');
  s.push('Thiên Thức: <b>'+th[0]+'</b> → '+th[0]+' mod 8 = '+meta.upN+' → thượng '+TRI[meta.upN-1].sym+' '+TRI[meta.upN-1].name);
  s.push('Địa Thức: <b>'+th[1]+'</b> → '+th[1]+' mod 8 = '+meta.loN+' → hạ '+TRI[meta.loN-1].sym+' '+TRI[meta.loN-1].name);
  s.push('Nhân Thức: <b>'+th[2]+'</b> → '+th[2]+' mod 6 = '+meta.dong+' → hào '+POSNAME[meta.dong-1]+' động');
 }
 return s;
}
function quickReveal(cast,i){
 var steps=cast._st||(cast._st=revealSteps(cast));
 if(i<steps.length){
  $('castStatus').innerHTML=steps[i];
  setTimeout(function(){quickReveal(cast,i+1);},780);
  return;
 }
 $('castHex').innerHTML=castHexHTML(cast.yang,cast.mv);
 setTimeout(function(){finishCast(cast);},950);
}
/* ============ KHỐI KHOA HỌC & TOÁN HỌC ============ */
function sciHTML(p){
 var C=2*Math.PI*52,len=C*p.score/100;
 var entTxt=p.ent.H===0?'tuyệt đối trật tự — quẻ thuần nhất một chiều, thế cực mà ít biến hóa'
  :p.ent.H<0.65?'thiên về trật tự — một khí âm/dương áp đảo, vận thế nghiêng hẳn một phía'
  :p.ent.H<0.95?'trật tự tương đối — vận thế có trục chính rõ ràng, ít nhiễu loạn'
  :'cân bằng âm dương cao — hỗn độn sinh biến, cục diện mở ra nhiều khả năng';
 var hdLine=[];['Kim','Mộc','Thủy','Hỏa','Thổ'].forEach(function(e){hdLine.push(e+' '+p.hd.cnt[e]);});
 return '<h3>Phân Tích Khoa Học &amp; Toán Học</h3><div class="sci">'
 +'<div class="gaugew"><svg width="118" height="118" viewBox="0 0 120 120" role="img" aria-label="Độ hợp quẻ">'
 +'<defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f2dc8d"/><stop offset="1" stop-color="#7b4bd6"/></linearGradient></defs>'
 +'<circle cx="60" cy="60" r="52" fill="none" stroke="rgba(212,175,55,.15)" stroke-width="9"/>'
 +'<circle cx="60" cy="60" r="52" fill="none" stroke="url(#gg)" stroke-width="9" stroke-linecap="round" stroke-dasharray="'+len.toFixed(1)+' '+C.toFixed(1)+'" transform="rotate(-90 60 60)" style="filter:drop-shadow(0 0 6px rgba(212,175,55,.8))"/>'
 +'<text x="60" y="57" text-anchor="middle" font-size="21" fill="#f2dc8d" font-family="Georgia,serif" font-weight="bold">'+p.score+'%</text>'
 +'<text x="60" y="75" text-anchor="middle" font-size="8.5" fill="#b9a98a" font-family="Georgia,serif" letter-spacing="1">ĐỘ HỢP QUẺ</text></svg>'
 +'<div class="gtxt grow"><div class="big">'+p.score+'%</div><div class="dim" style="margin-top:4px">Chỉ số tổng hợp có trọng số:<br>hợp lĩnh vực hỏi 30% · '+p.tdShort+' 30% · cân bằng ngũ hành 20% · vị trí hào động 20%.</div></div></div>'
 +'<div class="mrow"><span class="k">Xác suất Bayes · tham chiếu</span><span class="v">'+pct(p.by.p0)+' → '+pct(p.by.p1)+'</span></div>'
 +'<div class="dim" style="padding:2px 2px 7px">Mô hình giả định: prior P(quẻ) = 1/64 ≈ 1.56%; cập nhật theo độ phù hợp câu hỏi–lĩnh vực (LR ≈ '+p.by.LR.toFixed(2)+', độ hợp '+Math.round(p.fit*100)+'%).</div>'
 +'<div class="mrow"><span class="k">Entropy Shannon 6 hào</span><span class="v">H = '+p.ent.H.toFixed(2)+' bit · '+p.ent.y+' dương / '+(6-p.ent.y)+' âm</span></div>'
 +'<div class="dim" style="padding:2px 2px 7px">H = −Σ p·log₂(p) — '+entTxt+'.</div>'
 +'<div class="mrow"><span class="k">Số Hà Đồ · Điểm ngũ hành</span><span class="v">'+Math.round(p.hd.bal*100)+'% cân bằng</span></div>'
 +'<div class="dim" style="padding:2px 2px 7px">'+hdLine.join(' · ')+' — quy theo Thủy 1·6, Hỏa 2·7, Mộc 3·8, Kim 4·9, Thổ 5·10; cân bằng đo bằng entropy chuẩn hóa của phân phối hành qua bản, hỗ, biến quẻ.</div>'
 +'<div class="mrow"><span class="k">Fibonacci · Tỷ lệ vàng φ</span><span class="v">'+p.fb.lo+' – '+p.fb.hi+' ngày</span></div>'
 +'<div class="dim" style="padding:2px 2px 7px">Số quẻ '+p.num+' nằm giữa '+p.fb.lo+' và '+p.fb.hi+' trong dãy Fibonacci (1, 2, 3, 5, 8, 13, 21, 34, 55, 89) — ứng kỳ gợi ý; φ = 1.618 là nhịp sinh trưởng tự nhiên của vạn vật.</div>'
 +'<div class="mrow"><span class="k">— Hợp lĩnh vực hỏi</span><span class="v">'+Math.round(p.fit*100)+'%</span></div>'
 +'<div class="mrow"><span class="k">— '+p.tdLabel+'</span><span class="v">'+Math.round(p.tdScore*100)+'%</span></div>'
 +'<div class="mrow"><span class="k">— Cân bằng ngũ hành</span><span class="v">'+Math.round(p.hd.bal*100)+'%</span></div>'
 +'<div class="mrow"><span class="k">— Vị trí hào động</span><span class="v">'+Math.round(p.mvq*100)+'%</span></div>'
 +'<p class="note" style="text-align:left;margin-top:6px">⚠ Liêm chính: đây là <b>mô hình tham chiếu giải trí</b> kết hợp toán học với biểu tượng Dịch học, không phải dự báo tuyệt đối — quẻ chỉ đường, người quyết định.</p>'
 +'</div>';
}
function layer(tag,title,body){
 return '<div class="layer"><div class="lt">'+tag+'</div><div class="lc"><b>'+title+'</b>'+body+'</div></div>';
}
/* ============ KẾT QUẢ TỔNG HỢP ============ */
function resultHTML(q,dom,cast,forModal){
 var vals=cast.vals,method=cast.m||'coins',meta=cast.meta||{};
 var yang=vals.map(function(v){return v===7||v===9;});
 var mv=vals.map(function(v){return v===6||v===9;});
 var base=numFromYang(yang),x=BYN[base.num];
 var mvPos=[];mv.forEach(function(b,i){if(b)mvPos.push(i);});
 var hasMv=mvPos.length>0,bx=null,cyang=null,binfo=null;
 if(hasMv){cyang=yang.map(function(y,i){return mv[i]?!y:y;});binfo=numFromYang(cyang);bx=BYN[binfo.num];}
 var nuc=nuclear(yang),nx=BYN[nuc.num],ny=yangFromTri(nuc.up,nuc.lo);
 var U=TRI[base.up],L=TRI[base.lo];
 var rel=upLoRel(base.up,base.lo);
 var td=theDung(base.up,base.lo,mv);
 var tdKey=td?tdRel(TRI[td.the].el,TRI[td.dung].el):null;
 var dong=cast.dong||meta.dong||(mvPos.length===1?mvPos[0]+1:0);
 var ent=shannon(yang),fb=fibAround(x.n),hd=haDoScore(yang,binfo);
 var fit=domainFit(q,x,dom),by=bayes(fit);
 var tdScore=td?TDREL[tdKey].s:RELSC[rel];
 var tdLabel=td?('Thể–Dụng ('+TDREL[tdKey].w+')'):'Sinh khắc thượng–hạ';
 var tdShort=td?'Thể–Dụng':'quan hệ thượng–hạ';
 var mvq,PP=[.55,.9,.45,.6,.95,.5];
 if(!hasMv)mvq=.75;else{var ss=0;mvPos.forEach(function(pp){ss+=PP[pp];});mvq=ss/mvPos.length;}
 var score=Math.round((.3*fit+.3*tdScore+.2*hd.bal+.2*mvq)*100);
 var h='<div class="card"'+(forModal?' style="border:none;background:none;box-shadow:none;padding:0"':'')+'>'
  +'<div class="res-head"><div class="res-glyph">'+glyph(x.n)+'</div>'
  +'<div class="res-name">'+x.n+'. '+esc(x.name)+'</div>'
  +'<div class="res-han">'+x.han+'</div>'
  +'<div class="res-tri">'+triInfo(x)+'</div>'
  +'<div style="margin-top:6px"><span class="mbtag">'+METHODS[method]+'</span></div></div>'
  +'<div class="hr"></div>'
  +hexHTML(yang,mv);
 h+='<div class="trio">'
  +'<div class="tcell"><div class="lab">Bản Quẻ</div>'+hMini(yang,mv)+'<div class="nm2">'+x.n+'. '+esc(x.name)+'</div><div class="sub2">'+U.name+' thượng · '+L.name+' hạ</div></div>'
  +'<div class="tcell"><div class="lab">Hỗ Quẻ</div>'+hMini(ny,null)+'<div class="nm2">'+nx.n+'. '+esc(nx.name)+'</div><div class="sub2">'+TRI[nuc.up].name+' thượng · '+TRI[nuc.lo].name+' hạ<br><a href="#" class="gox" data-n="'+nx.n+'">chi tiết ›</a></div></div>'
  +(bx?'<div class="tcell"><div class="lab">Biến Quẻ</div>'+hMini(cyang,null)+'<div class="nm2">'+bx.n+'. '+esc(bx.name)+'</div><div class="sub2">'+TRI[binfo.up].name+' thượng · '+TRI[binfo.lo].name+' hạ<br><a href="#" class="gox" data-n="'+bx.n+'">chi tiết ›</a></div></div>'
     :'<div class="tcell"><div class="lab">Biến Quẻ</div><div class="nm2" style="padding-top:24px">—</div><div class="sub2">Quẻ tĩnh, không biến</div></div>')
  +'</div>';
 h+='<h3>Đại Tượng Truyện</h3><blockquote>'+DT[x.n]+'</blockquote>'
  +'<h3>Thoán Từ</h3><blockquote>'+esc(x.t)+'</blockquote>';
 if(method==='maihoa'&&td){
  var theT=TRI[td.the],dungT=TRI[td.dung],w=TDREL[tdKey];
  var relWith=function(el2){
   if(el2===theT.el)return 'tỷ hòa với Thể';
   if(SHENG[el2]===theT.el)return '<b style="color:#8fe3a0">sinh Thể</b> (đến giúp mình)';
   if(KE[el2]===theT.el)return '<b style="color:#ff9c9c">khắc Thể</b> (đến hại mình)';
   if(SHENG[theT.el]===el2)return 'được Thể sinh cho (hao khí)';
   return 'bị Thể chế ngự';
  };
  var col=tdKey==='ds'?'#8fe3a0':tdKey==='dk'?'#ff9c9c':tdKey==='ts'?'#ffc46b':'var(--gold2)';
  var bTr=td.dungLo?TRI[binfo.lo]:TRI[binfo.up];
  var S=(base.up+1)+(base.lo+1)+dong;
  var ung='Ứng số Mai Hoa: '+(base.up+1)+' (thượng) + '+(base.lo+1)+' (hạ) + '+dong+' (động) = <b>'+S+'</b> — sự ứng nghiệm thường trong <b>'+S+' ngày</b> (việc lớn tính '+S+' tuần hoặc '+S+' tháng)';
  if(tdKey==='ds')ung+='; Dụng sinh Thể thì ứng nhanh, có khi chỉ nửa số ấy';
  else if(tdKey==='dk')ung+='; Dụng khắc Thể thì việc khó ứng, cố làm ứng chậm mà nhiều trắc trở';
  ung+='.';
  h+='<h3>Mai Hoa Luận · Thể Dụng Sinh Khắc</h3>'
   +'<p class="dim" style="margin-bottom:6px">'+esc(meta.recap||'')+'</p>'
   +'<p>Hào động nằm ở <b>'+(td.dungLo?'hạ':'thượng')+' quái</b> nên '+dungT.sym+' <b>'+dungT.name+'</b> ('+dungT.el+') là <b>Dụng</b> — sự việc, đối tượng, ngoại cảnh tác động; '+theT.sym+' <b>'+theT.name+'</b> ('+theT.el+') là <b>Thể</b> — bản thân mình, gốc của sự việc.</p>'
   +'<p style="margin-top:6px">'+w.t+' Phán: <b style="color:'+col+'">'+w.w+'</b>.</p>'
   +'<p style="margin-top:6px">Diễn biến giữa chừng xem ở <b>Hỗ quẻ '+nx.n+'. '+esc(nx.name)+'</b>: hỗ thượng '+TRI[nuc.up].sym+' '+TRI[nuc.up].name+' ('+TRI[nuc.up].el+') '+relWith(TRI[nuc.up].el)+'; hỗ hạ '+TRI[nuc.lo].sym+' '+TRI[nuc.lo].name+' ('+TRI[nuc.lo].el+') '+relWith(TRI[nuc.lo].el)+'.</p>'
   +'<p style="margin-top:6px">Kết cục xem ở <b>Biến quẻ '+bx.n+'. '+esc(bx.name)+'</b>: quái biến '+bTr.name+' ('+bTr.el+') '+relWith(bTr.el)+' — đây là hướng đi cuối cùng của sự việc.</p>'
   +'<p style="margin-top:6px">'+ung+'</p>';
 }
 if(method==='quycoc'){
  var modeName=meta.mode==='rand'?'Ngẫu nhiên ba số':(meta.mode==='num'?'Tự nhập ba số':'Gieo ba đồng xu ba lần');
  var nTri=TRI[dong<=3?base.lo:base.up];
  h+='<h3>Quỷ Cốc Tam Tài · Thiên — Địa — Nhân</h3>'
   +'<p class="dim" style="margin-bottom:6px">Phép Quỷ Cốc Tiên Sinh Thần Toán ('+modeName+').</p>'
   +'<div class="mrow"><span class="k">Thiên Thức · thiên thời</span><span class="v">'+meta.thuc[0]+' → '+U.sym+' '+U.name+' thượng ('+U.el+')</span></div>'
   +'<div class="mrow"><span class="k">Địa Thức · địa lợi</span><span class="v">'+meta.thuc[1]+' → '+L.sym+' '+L.name+' hạ ('+L.el+')</span></div>'
   +'<div class="mrow"><span class="k">Nhân Thức · nhân hòa</span><span class="v">'+meta.thuc[2]+' → hào '+POSNAME[dong-1]+' động</span></div>'
   +'<p style="margin-top:8px">Chiêm sách phán: Thiên thức hội <b>'+U.name+'</b>, '+QCT[base.up]+'. Địa thức hội <b>'+L.name+'</b>, '+QCD[base.lo]+'. Nhân thức động vào <b>'+nTri.name+'</b>, '+QCN[dong<=3?base.lo:base.up]+'.</p>'
   +'<blockquote>'+qcVerdict(rel,dong)+'</blockquote>';
 }
 var hanh;
 if(dom==='tq'){
  hanh='<span class="tag">Sự nghiệp</span>'+esc(x.c)+'<br><span class="tag" style="margin-top:6px">Tài lộc</span>'+esc(x.w)+'<br><span class="tag" style="margin-top:6px">Tình duyên</span>'+esc(x.l)+'<br><span class="tag" style="margin-top:6px">Sức khỏe</span>'+esc(x.h);
 }else{
  var map={sn:['Sự nghiệp',x.c],tl:['Tài lộc',x.w],td:['Tình duyên',x.l],sk:['Sức khỏe',x.h]};
  hanh='<span class="tag">'+map[dom][0]+'</span>'+map[dom][1];
 }
 var gioi;
 if(hasMv){
  var gl=[];
  mvPos.forEach(function(pp){
   gl.push('<b style="color:var(--gold2)">Hào '+POSNAME[pp]+' ('+(pp+1)+') động:</b> '+MOVTXT[pp]);
  });
  gioi=gl.join('<br>');
  if(mvPos.length>1)gioi+='<br><span class="dim">Nhiều hào cùng động: lấy ý tổng quẻ làm chủ, các hào động cho biết diễn biến từng giai đoạn.</span>';
 }else{
  gioi='Quẻ tĩnh, sáu hào an: cục diện ổn định, kỵ nhất là nóng vội thay đổi khi chưa đến thời; giữ gìn hiện trạng, thận trọng từng bước nhỏ.'
   +(rel==='uk'||rel==='lk'?' Thượng hạ tương khắc: đặc biệt tránh xung đột trực diện với bề trên và hoàn cảnh, lui một bước để giữ toàn cục.':' Thuận thế mà làm, chớ sinh lòng kiêu căng khi mọi sự đang yên.');
 }
 var ung2='Số quẻ '+x.n+' nằm giữa hai số Fibonacci '+fb.lo+' và '+fb.hi+' — ứng kỳ ứng nghiệm gợi ý trong khoảng <b>'+fb.lo+'–'+fb.hi+' ngày</b> (việc lớn tính theo tuần hoặc tháng).';
 if(method!=='coins'&&dong){
  var S2=(base.up+1)+(base.lo+1)+dong;
  ung2+=' Theo phép '+METHODS[method]+', ứng số = '+(base.up+1)+' + '+(base.lo+1)+' + '+dong+' = <b>'+S2+'</b> — thường ứng trong '+S2+' ngày.';
 }
 h+='<h3>Luận Giải Năm Lớp · Thởi — Thế — Hành — Giới — Ứng</h3>'
  +layer('時','Thởi · Thởi Vận','Theo phép '+METHODS[method]+': '+RELTXT[rel])
  +layer('勢','Thế · Cục Diện',esc(x.m))
  +layer('行','Hành · Việc Nên Làm',hanh)
  +layer('戒','Giới · Điều Cần Tránh',gioi)
  +layer('應','Ứng · Ứng Kỳ',ung2);
 if(hasMv)h+='<h3>Biến Quẻ · '+bx.n+'. '+esc(bx.name)+'</h3><p>'+esc(bx.m)+'</p>';
 h+='<h3>Phân Tích Hà Đồ · Lạc Thư</h3><p>'+elemAnalysis(x.up,x.lo)+'</p>';
 h+=sciHTML({score:score,by:by,ent:ent,hd:hd,fb:fb,fit:fit,tdScore:tdScore,tdLabel:tdLabel,tdShort:tdShort,mvq:mvq,num:x.n});
 h+='<h3>Lời Kết</h3><blockquote>'+KET[(x.n+dong)%KET.length]+'</blockquote>';
 h+='</div>';
 return {html:h,bien:bx?bx.n:0,num:x.n};
}
function bindGox(root){
 root.querySelectorAll('.gox').forEach(function(a){
  a.addEventListener('click',function(e){e.preventDefault();openModal(detailHTML(BYN[+a.dataset.n]));});
 });
}
function finishCast(cast){
 $('castStatus').innerHTML='Tượng quẻ đã thành — <b>chiêm nghiệm...</b>';
 var res=resultHTML(cast.q,cast.dom,cast,false);
 setTimeout(function(){
  $('result').innerHTML=res.html;
  bindGox($('result'));
  var m2={};for(var k in cast.meta)m2[k]=cast.meta[k];
  saveHis({t:Date.now(),q:cast.q,dom:cast.dom,vals:cast.vals,num:res.num,bien:res.bien,m:cast.m,meta:m2});
  $('result').scrollIntoView({behavior:'smooth',block:'start'});
  casting=false;
  var btn=$('btnCast');btn.disabled=false;btn.textContent=BTNLBL[cast.m];
 },700);
}
$('btnCast').addEventListener('click',startCast);
