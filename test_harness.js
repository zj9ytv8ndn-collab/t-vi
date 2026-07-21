/* ===== DOM-STUB TEST HARNESS cho app Kinh Dịch ===== */
'use strict';
const fs=require('fs');
const html=fs.readFileSync('/mnt/agents/output/kinh-dich-64-que/index.html','utf8');
const js=html.slice(html.indexOf('<script>')+8, html.lastIndexOf('</script>'));

/* ---- DOM stubs ---- */
function El(id){this.id=id||'';this.innerHTML='';this.textContent='';this.value='';this.style={};this.dataset={};this.disabled=false;this.className='';}
El.prototype.classList={add(){},remove(){},contains(){return false}};
El.prototype.addEventListener=function(){};
El.prototype.appendChild=function(){};
El.prototype.scrollIntoView=function(){};
El.prototype.querySelectorAll=function(){return []};
El.prototype.querySelector=function(){return new El()};
Object.defineProperty(El.prototype,'offsetWidth',{get(){return 0}});
const elCache={};
const alerts=[];
global.document={
 getElementById(id){if(!elCache[id])elCache[id]=new El(id);return elCache[id];},
 querySelectorAll(sel){
  if(sel.indexOf('coin-wrap')>=0)return [new El(),new El(),new El()];
  if(sel.indexOf('#coinsRow')>=0&&sel.indexOf('.coin')>=0)return [new El(),new El(),new El()];
  return [];
 },
 createElement(){return new El();}
};
const _ls={};
global.localStorage={getItem(k){return k in _ls?_ls[k]:null;},setItem(k,v){_ls[k]=String(v);},removeItem(k){delete _ls[k];}};
global.navigator={};
global.window={scrollTo(){}};
global.alert=function(m){alerts.push(m);};
global.setTimeout=function(fn){fn();return 0;};
global.clearTimeout=function(){};

/* ---- Test framework ---- */
let pass=0,fail=0;const fails=[];
function ok(cond,name){if(cond){pass++;}else{fail++;fails.push(name);console.log('  FAIL:',name);}}
function eq(a,b,name){ok(JSON.stringify(a)===JSON.stringify(b),name+' (got '+JSON.stringify(a)+' want '+JSON.stringify(b)+')');}

/* ---- Load app script + tests in one eval scope ---- */
const testSrc=`
;(function runTests(){
/* A. Tính toàn vẹn dữ liệu */
ok(TRI.length===8,'A1 TRI 8 quái');
ok(Object.keys(TBYBIN).length===8,'A2 TBYBIN 8 bin');
var seen={};var matOk=true;
for(var r=0;r<8;r++){for(var c=0;c<8;c++){var v=HEXMAT[r][c];if(v<1||v>64||seen[v])matOk=false;seen[v]=1;}}
ok(matOk&&Object.keys(seen).length===64,'A3 HEXMAT 1..64 đủ không trùng');
ok(HX.length===64,'A4 HX 64 quẻ');
ok(DT.length===64,'A5 DT 64 Đại Tượng');
var lookOk=true;HX.forEach(function(x){if(HEXMAT[x.up][x.lo]!==x.n)lookOk=false;});
ok(lookOk,'A6 lookup 64 quẻ khớp HEXMAT[up][lo]');

/* B. modK */
eq(modK(8,8),8,'B1 modK(8,8)');eq(modK(9,8),1,'B2 modK(9,8)');eq(modK(16,8),8,'B3 modK(16,8)');
eq(modK(6,6),6,'B4 modK(6,6)');eq(modK(7,6),1,'B5 modK(7,6)');eq(modK(12,6),6,'B6 modK(12,6)');

/* C. Mai Hoa theo thởi gian: yc=5,lm=1,ld=1,hc=1 → Bóc 23, động 2, biến Cổ 18, hỗ Khôn 2 */
curM='maihoa';mhMode='time';
$('mhYC').value='5';$('mhLM').value='1';$('mhLD').value='1';$('mhHC').value='1';
var cast=gatherCast();
ok(cast&&cast.m==='maihoa','C1 gather maihoa');
eq(cast.vals,[8,6,8,8,8,7],'C2 vals Bóc động 2');
eq(cast.dong,2,'C3 dong=2');
var res=resultHTML(cast.q,cast.dom,cast,false);
eq(res.num,23,'C4 quẻ 23 Sơn Địa Bóc');
eq(res.bien,4,'C5 biến 4 Sơn Thủy Mông');
ok(res.html.indexOf('Mai Hoa Luận')>=0,'C6 có block Mai Hoa');
ok(res.html.indexOf('tỷ hòa')>=0||res.html.indexOf('Tỷ Hòa')>=0,'C7 Thể Dụng tỷ hòa (Cấn Thổ / Khôn Thổ)');
ok(res.html.indexOf('Hỗ quẻ 2. Khôn Vi Địa')>=0,'C8 hỗ quẻ Khôn trong luận');
ok(res.html.indexOf('Phân Tích Khoa Học')>=0,'C9 có science block');

/* D. Hỗ quẻ */
eq(nuclear(yangFromTri(0,0)).num,1,'D1 hỗ Càn→Càn');
eq(nuclear(yangFromTri(7,7)).num,2,'D2 hỗ Khôn→Khôn');
eq(nuclear(yangFromTri(5,2)).num,64,'D3 hỗ Ký Tế→Vị Tế');
eq(nuclear(yangFromTri(2,5)).num,63,'D4 hỗ Vị Tế→Ký Tế');
eq(nuclear(yangFromTri(4,2)).num,64,'D5 hỗ Gia Nhân→Vị Tế');
eq(numFromYang(yangFromTri(4,2)).num,37,'D6 Gia Nhân=37');

/* E. Thể/Dụng & tdRel */
var tdE=theDung(7,0,[false,false,false,false,true,false]);
ok(tdE&&tdE.dung===7&&tdE.the===0,'E1 Thái động 5: Dụng=Khôn, Thể=Càn');
eq(tdRel('Kim','Thổ'),'ds','E2 Dụng Thổ sinh Thể Kim = đại cát');
eq(tdRel('Thổ','Kim'),'ts','E3 Thể Thổ sinh Dụng Kim = hao tổn');
eq(tdRel('Thổ','Mộc'),'dk','E4 Dụng Mộc khắc Thể Thổ = đại hung');
eq(tdRel('Mộc','Thổ'),'tk','E5 Thể Mộc khắc Dụng Thổ = tiểu cát');
eq(tdRel('Hỏa','Hỏa'),'ty','E6 tỷ hòa');
eq(theDung(0,0,[true,false,false,false,false,true]),null,'E7a hai hào động → null');
eq(theDung(0,0,[false,false,false,false,false,false]),null,'E7b quẻ tĩnh → null');

/* F. Quỷ Cốc Tử tự nhập: 9,14,7 → Tụng 6, động 1, biến Lý 10 */
curM='quycoc';qcMode='num';
$('qcN1').value='9';$('qcN2').value='14';$('qcN3').value='7';
var qc=gatherCast();
eq(qc.meta.thuc,[9,14,7],'F1 tam thức');
eq(qc.dong,1,'F2 nhân thức 7 mod 6 = 1');
var qres=resultHTML(qc.q,qc.dom,qc,false);
eq(qres.num,6,'F3 quẻ 6 Thiên Thủy Tụng');
eq(qres.bien,10,'F4 biến 10 Thiên Trạch Lý');
ok(qres.html.indexOf('Quỷ Cốc Tam Tài')>=0,'F5 block Tam Tài');
ok(qres.html.indexOf('Thiên Thức')>=0&&qres.html.indexOf('Nhân Thức')>=0,'F6 đủ ba thức');
ok(qres.html.indexOf('Chiêm sách phán')>=0,'F7 văn chiêm sách');

/* G. Entropy Shannon */
ok(Math.abs(shannon([false,false,false,false,false,false]).H-0)<1e-9,'G1 toàn âm H=0');
ok(Math.abs(shannon([true,true,true,true,true,true]).H-0)<1e-9,'G2 toàn dương H=0');
ok(Math.abs(shannon([true,true,true,false,false,false]).H-1)<1e-9,'G3 3-3 H=1');
ok(Math.abs(shannon([true,true,false,false,false,false]).H-0.9182958340544896)<1e-9,'G4 2-4 H≈0.9183');

/* H. Fibonacci */
eq(fibAround(1),{lo:1,hi:1},'H1 fib 1');
eq(fibAround(44),{lo:34,hi:55},'H2 fib 44');
eq(fibAround(64),{lo:55,hi:89},'H3 fib 64');
eq(fibAround(6),{lo:5,hi:8},'H4 fib 6');
eq(fibAround(55),{lo:55,hi:55},'H5 fib 55');

/* I. Bayes */
var b0=bayes(0),b1=bayes(1);
ok(Math.abs(b0.p0-1/64)<1e-12,'I1 prior 1/64');
ok(b1.p1>b0.p1&&b1.p1<1,'I2 posterior tăng theo fit');
ok(Math.abs(b1.p1-(10/64)/(10/64+63/64))<1e-9,'I3 posterior LR=10 đúng công thức');

/* J. Hà Đồ điểm */
var hd1=haDoScore(yangFromTri(0,0),null);
ok(hd1.cnt['Kim']===6&&Math.abs(hd1.bal-0)<1e-9,'J1 thuần Càn: Kim 6, cân bằng 0');
var hd2=haDoScore(yangFromTri(7,0),null);
var tot2=0;for(var k2 in hd2.cnt)tot2+=hd2.cnt[k2];
ok(tot2===6&&hd2.bal>0&&hd2.bal<1,'J2 Thái: tổng điểm 6, cân bằng (0,1)');

/* K. Smoke test end-to-end 3 phương pháp (setTimeout chạy ngay) */
localStorage.setItem('kd_history','[]');
curM='coins';$('q').value='Việc làm sắp tới?';
startCast();
ok($('result').innerHTML.indexOf('Phân Tích Khoa Học')>=0,'K1 coins: kết quả có science block');
ok($('result').innerHTML.indexOf('Luận Giải Năm Lớp')>=0,'K2 coins: năm lớp luận');
var his=hisAll();
ok(his.length===1&&his[0].m==='coins','K3 coins: lịch sử lưu method');
ok(his[0].vals.length===6,'K4 coins: 6 hào');

curM='maihoa';mhMode='time';
startCast();
ok($('result').innerHTML.indexOf('Mai Hoa Luận')>=0,'K5 maihoa: kết quả có Mai Hoa Luận');
his=hisAll();
ok(his.length===2&&his[0].m==='maihoa','K6 maihoa: lịch sử method');
ok(his[0].meta&&his[0].meta.recap&&his[0].meta.recap.indexOf('mod 8')>=0,'K7 maihoa: meta recap');

curM='quycoc';qcMode='rand';
startCast();
ok($('result').innerHTML.indexOf('Quỷ Cốc Tam Tài')>=0,'K8 quycoc rand: Tam Tài');
his=hisAll();
ok(his.length===3&&his[0].m==='quycoc'&&his[0].meta.thuc.length===3,'K9 quycoc: thuc 3 số');

qcMode='xu';
startCast();
ok($('result').innerHTML.indexOf('Quỷ Cốc Tam Tài')>=0,'K10 quycoc xu: Tam Tài');
ok($('result').innerHTML.indexOf('Gieo ba đồng xu ba lần')>=0,'K11 quycoc xu: tên chế độ');
his=hisAll();
ok(his[0].meta.thuc.length===3&&his[0].meta.thuc.every(function(v){return v>=6&&v<=9;}),'K12 thuc từ xu 6..9');

/* L. Mai Hoa 3 số & tự số */
curM='maihoa';mhMode='num';
$('mhN1').value='7';$('mhN2').value='15';$('mhN3').value='42';
var c3=gatherCast();
eq(numFromYang(c3.yang).num,52,'L1 maihoa 3 số: 7,15,42 → Cấn vi Sơn 52');
eq(c3.dong,4,'L2 tổng 64 mod 6 = 4');
mhMode='text';
$('mhStr').value='abc def';
var c4=gatherCast();
eq(numFromYang(c4.yang).num,30,'L3 tự số 6 chữ: 3,3 → Ly vi Hỏa 30');
eq(c4.dong,6,'L4 6 mod 6 = 6');
ok(c4.meta.recap.indexOf('6 chữ')>=0,'L5 recap tự số');
$('mhStr').value='bình an yên';
var c5=gatherCast();
eq(numFromYang(c5.yang).num,42,'L6 tự số 9 chữ: 5,4 → Phong Lôi Ích 42');
eq(c5.dong,3,'L7 9 mod 6 = 3');

/* M. Replay lịch sử theo method */
var item=hisAll()[0];
var rp=resultHTML(item.q,item.dom,{vals:item.vals,m:item.m,meta:item.meta},true);
ok(rp.html.indexOf('Quỷ Cốc Tam Tài')>=0,'M1 replay quycoc từ history');
var itemMH=hisAll().filter(function(x){return x.m==='maihoa';})[0];
var rp2=resultHTML(itemMH.q,itemMH.dom,{vals:itemMH.vals,m:itemMH.m,meta:itemMH.meta},true);
ok(rp2.html.indexOf('Mai Hoa Luận')>=0,'M2 replay maihoa từ history');
var rp3=resultHTML('q','tq',{vals:[9,9,9,9,9,9],m:'coins',meta:{}},true);
ok(rp3.num===1&&rp3.bien===2,'M3a coins 6 lão dương → Càn biến Khôn');
var rp4=resultHTML('q','tq',{vals:[8,8,8,8,8,8],m:'coins',meta:{}},true);
ok(rp4.num===2&&rp4.bien===0&&rp4.html.indexOf('Quẻ tĩnh')>=0,'M3b coins 6 thiếu âm → Khôn tĩnh');
renderHis();
ok($('hisList').innerHTML.indexOf('Quỷ Cốc')>=0,'M4 renderHis badge Quỷ Cốc');

/* O. Đại Tượng index đúng quẻ */
var r1=resultHTML('q','tq',{vals:[7,7,7,7,7,7],m:'coins',meta:{}},true);
ok(r1.html.indexOf('Thiên hành kiện')>=0,'O1 Càn → Thiên hành kiện');
var r13=resultHTML('q','tq',{vals:[7,8,7,7,7,7],m:'coins',meta:{}},true);
ok(r13.num===13&&r13.html.indexOf('loại tộc biện vật')>=0,'O2 Đồng Nhân → Thiên dữ hỏa');
var r64=resultHTML('q','tq',{vals:[8,7,8,7,8,7],m:'coins',meta:{}},true);
ok(r64.num===64&&r64.html.indexOf('thận biện vật cư phương')>=0,'O3 Vị Tế → quote cuối');
ok(detailHTML(BYN[2]).indexOf('hậu đức tái vật')>=0,'O4 detailHTML Khôn → Địa thế khôn');

/* N. Validation */
curM='quycoc';qcMode='num';$('qcN1').value='0';
var bad=gatherCast();
ok(bad===null&&alerts.length>0,'N1 nhập 0 bị chặn + alert');
})();
`;
eval(js+testSrc);
console.log('\\n===== KẾT QUẢ: '+pass+' PASS · '+fail+' FAIL =====');
if(fail){console.log('Failed:',fails.join(' | '));process.exit(1);}
