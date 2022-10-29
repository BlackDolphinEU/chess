var hclr='moccasin';
var vclr='green';
var doc=document;
ie4=(doc.all)?1:0;
ns6=(doc.getElementById)&&!(ie4);
ns4=(doc.layers)?1:0;
var restr=['1-0','0-1','1/2-1/2','*'];
var s1=s2=r1=r2=lvflg=mvflg=0;
var pc=capc=cf=ep=pr=tmid=tmc=0;
var atgm=-1;
var lk=vl=cm=tm=ml=cg=cb=0;
var prepc=8;
if(ie4)doc.onmousemove=MsMove;
if(ns6)doc.onclick=ns6Click;
var gx=[-4,-4];
var mn=[0,0];
var pm=[0,0];
var jm=[0,0];
var gl=[0,0];
var jb=[0,0];
var st=[0,0];
var ipcs='ipnbrqkxov';
function DrawPc(g,pc,sqr)
{
 var clr, pi;
 clr='';
 pi=ipcs.charAt(pc>=23?pc-16:pc&7);
 if(pc>0&&pc<23)
  clr=(pc&8)?'b':'w';
 if(gflip[g])
   sqr=63-sqr;
 doc.images[jb[g]+sqr].src=imgurl+clr+pi+'.gif';
}
var fench='/PNBRQK//pnbrqk12345678XOV';
function Fen2Brd(g,fn)
{
 var fc;
 var s=0;
 for(i=0;i<64;i++){
  fc=fench.indexOf(fn.charAt(s++));
  if(fc<=14||fc>=23)
   gb[g][i]=fc;
  else{
   fc-=14;
   while(fc--)
    gb[g][i++]=0;
   --i;
   }
  }
 if(s!=fn.length)
  mn[g]=parseInt(fn.substr(++s));
}
var posbrd = 0;
function ShowFen(g,fn)
{
 Fen2Brd(g,pos[fn]);
 DrawBoard(g);
 WriteCap(g,cap[fn],'black');
 posbrd=1;
}
function InitBoard(g)
{
 if(atgm!=cg)Astop();
 Fen2Brd(g,gf[g]);
 gx[g]=-4;
 gl[g]=0;
 prepc=8;
 cg=g;
}
function FindScrBrd()
{
var targ;
 j=0;
 for(i=0;i<doc.images.length;i++)
  if(doc.images[i].name != '')
   if(doc.images[i].name=='brd'+j.toString()){
    jb[j]=i;
    ++j;
    }
 j=0;

 for(i=0;i<doc.links.length;i++){
  if(doc.getElementById)
   targ='#'+doc.links[i].name;
  else
   targ=doc.links[i].hash;
  if(targ=='#jmv'+j){
    jm[j]=i+1;
    ++j;
    }
   }
}
function DrawBoard(g)
{
 for(i=0;i<64;i++)
  DrawPc(g,gb[g][i],i);
}
function DoMv(g,pc,to,from)
{
 gb[g][to]=pc;
 gb[g][from]=0;
}
function Gmv2lk(g)
{
 lk=0;
 if(gx[g]>=0)
  lk=gx[g]/4+jm[g];
}
var bs;
function HiMv(g)
{
 if(!ns4){
  Gmv2lk(g);
  if(lk==0)
   lk=jm[g]-1;
   if(lk==pm[g]) return;
   bs=doc.links[lk].style.backgroundColor;
   doc.links[lk].style.backgroundColor=hclr;
  if(pm[g])
   doc.links[pm[g]].style.backgroundColor=bs;
  pm[g]=lk;
 }
}
function MvD(g)
{
 var m=gx[g];
 if(m>=4)
  prepc=pc;
 ep=cf=pr=0;
 s1=r1=gm[g].charCodeAt(m)-63;
 s2=r2=gm[g].charCodeAt(m+1)-63;
 lvflg=gm[g].charCodeAt(m+2);
 mvflg=gm[g].charCodeAt(m+3);
 ml=lvflg&15;
 capc=gb[g][s2];
 pc=gb[g][s1];
 if((pc&7)==1)
  if((s2<8)||(s2>55)){
   pr=(pc&8)+((mvflg>>4)&3)+2;
   return;
  }
 if(mvflg&32){
  mvflg&16?++r1:--r1;
  if((pc&7)==1)
   ep=(pc&8)?1:9;
  else{
   r2=(s1-s2)>0?s1-4:s1+3;
   cf=1;
  }
 }
}
function Mv1(g)
{
 DoMv(g,pc,s2,s1);
 if(pr)
  gb[g][s2]=pr;
 if(ep)
  gb[g][r1]=0;
 if(cf)
  DoMv(g,gb[g][r2],r1,r2);
 if(pc&8)
  ++mn[g];
 else
  if((prepc&8)==0)
   ++mn[g];
 gl[g]=ml;
}
function Bk1(g)
{
 DoMv(g,pc,s1,s2);
 if(capc)
  gb[g][s2]=capc;
 if(pr)
   gb[g][s1]=(pc&8)+1;
 if(ep)
   gb[g][r1]=ep;
 if(cf)
   DoMv(g,gb[g][r1],r2,r1);
  --mn[g];
gl[g]=ml;
}
function Nxm(g,dr)
{
var tl;
tm=gx[g];
do{
 tm+=dr;
 tl=gm[g].charCodeAt(tm+2)&15;
}while(tl>gl[g]);
}
function Mv(g,mv)
{
 Mva(g,--mv*4);
}
function Mva(g,mv)
{
 var tf;
 InitBoard(g);
 while(gx[g]<mv){
  Nxm(g,4);
  if(tm>mv){
   tf=gm[g].charCodeAt(gx[g]+6);
   if(tf&16)
    while(tm-=4){
     tf=gm[g].charCodeAt(tm+2);
     if((tf&31)==(gl[g]+17))
      if(tm<=mv) break;
    }
   else
    tm=gx[g]+4;
   if((tf&32)==0)
    Bk1(g);
   }
  gx[g]=tm;
  MvD(g);
  Mv1(g);
  }
 DrawBoard(g);
 HiMv(g);
 MvStr(g);
}
function AutoMv()
{
var cm=gx[atgm]+4;
if(cm-4>=gend[atgm]) Astop();
 else{
  tmc=1;
  Forward(atgm);
  tmc=0;
  }
}
function Astop()
{
 atgm=-1;
 tmc=0;
 clearInterval(tmid);
}
function Astart(g)
{
 if(atgm>=0)Astop();
 else{
 atgm=g;
 tmid=setInterval('AutoMv()',delay);
 AutoMv();
 }
}
function Flip(g)
{
 gflip[g]^=1;
 DrawBoard(g);
}
function Nxm5(g,dr)
{
 var tl;
 var i=11;
 var gln=gm[g].length-4;
 tm=gx[g];
 while(i--){
  tm+=dr;
  if((tm<-4)||(tm>gln)) break;
  tl=gm[g].charCodeAt(tm+2)&31;
  if(tl!=gl[g]) break;
  }
 tm-=dr;
 Mva(g,tm);
}
function Forward5(g)
{
 Nxm5(g,4);
}
function Back5(g)
{
 Nxm5(g,-4);
}
function GoStart(g)
{
 if(atgm>=0)Astop();
 Mva(g,-4);
}
function GoEnd(g)
{
 if(atgm>=0)Astop();
 Mva(g,gend[g]);
}
function Forward(g)
{
 if(atgm>=0 && tmc==0)Astop();
 lm=gm[g].length-4;
 if(gx[g]>=lm)return;
 if(st[g])
  tm=gx[g]+4;
 else
  Nxm(g,4);
 if(tm>lm)
  tm=gx[g]+4;
 Mva(g,tm);
}
function Back(g)
{
 if(atgm>=0)Astop();
 Nxm(g,-4);
 Mva(g,tm);
}
function Step(g)
{
 st[g]^=1;
 doc.images[jb[g]+64].src='../jpc/p3con'+st[g]+'.gif';
}
function MvStr(g)
{
 var mvs='';
 var clr;

 posbrd=0;
 if(gx[g]<0){
  WriteCap(g,gc[g],'black');
  if(gc[g]!='')
   posbrd=1;
  return;
  }

 mvs=(pc&8)?mn[g]-1:mn[g];
 mvs=mvs.toString()+'. ';
 if(pc&8)
  mvs += '... ';

if(doc.all)
 mvs+=doc.links[lk].innerText;
else{
 Gmv2lk(g);
 mvs+=doc.links[lk].text;
}
 if(gx[g]==gend[g])
  mvs+=' '+restr[gres[g]];

clr=(gl[g]||(gx[g]>gend[g]))?vclr:'black';
 WriteCap(g,mvs,clr);
}
function WriteCap(b,tx,clr)
{
 var btx;

 if(ns4)return;
 btx='it'+b;
 if(ie4){
  if(!doc.getElementById)
   if(tx=='')
    tx='start';
  doc.all[btx].innerText=tx;
  doc.all[btx].style.color=clr;
  }
 else{
  if(tx=='')
   tx='&nbsp;';
  doc.getElementById(btx).innerHTML=tx;
  doc.getElementById(btx).style.color=clr;
 }
}
var MsX=MsY=0;
var PcX=PcY=0;
var Bx=By=0;
var nq=dgp=dgs=0;
function MsMove()
{
 if(ie4){
  if(dgp){
   MvPc(event.x, event.y);
   }  
 }
}
function MvPc(x,y)
{
 PcX-=MsX-x;
 PcY-=MsY-y;
 MsX=x;
 MsY=y;
 doc.all.pc1.style.pixelLeft=PcX;
 doc.all.pc1.style.pixelTop=PcY;
 return false;
}
function DropPc(g)
{
 var Sx,Sy;

 doc.all.pc1.style.visibility='hidden';

 if(PcX+14<Bx||PcX+14>(Bx+232)){
   PcOffBrd(g);
   return false;
   }
 if(PcY+14<By||PcY+14>(By+232)){
   PcOffBrd(g);
   return false;
   }

 Sx=PcX-Bx+14;
 Sy=PcY-By+14;
 Sx=Math.floor(Sx/29);
 Sy=Math.floor(Sy/29);

 nq=Sy*8+Sx;
 if(gflip[g])
  nq=63-nq;

 Kibitz(g);
 return false;
}
function BrdNum(g)
{
 var s,a8,sqr;

 cg=g;
 if(ns6){
  ns6B=1;
  return false;
 }
 if(ie4){
 e=window.event;
 a8=doc.images[jb[g]].sourceIndex;
 if(dgp==0){
  sqr=doc.elementFromPoint(MsX=e.clientX,MsY=e.clientY).sourceIndex;
  PcX=MsX-e.offsetX+doc.body.scrollLeft;
  PcY=MsY-e.offsetY+doc.body.scrollTop;
  Bx=PcX-doc.all[sqr].offsetLeft;
  By=PcY-doc.all[sqr].offsetTop;
  s=sqr-a8;
  s-=Math.floor(s/9);
  if(gflip[g])
   s=63-s;

  dgp=gb[g][s];
  if(dgp){
   dgs=s;
   col=dgp&8?'b':'w';
   pcstr=imgurl+col+ipcs.charAt(dgp&7)+'.gif';
   doc.images['dpc'].src=pcstr;
   gb[g][s]=0;
   DrawPc(g,0,s);
   doc.all.pc1.style.pixelLeft=PcX;
   doc.all.pc1.style.pixelTop=PcY;
   doc.all.pc1.style.visibility='visible';
   return false;
  }
 }
 else
  DropPc(cg);
  return false;
 }
}
function PcOffBrd(g)
{
alert('Piece Off Board!');
 gb[g][dgs]=dgp;
 DrawPc(g,dgp,dgs);
 dgp=0;
}
function Kibitz(g)
{
 if(dgp==1||dgp==9)
  if(nq<8||nq>55)
    dgp+=4;

 if(dgp==6&&dgs==60)
  if(nq==62)
   DoMv(g,4,61,63);
  else
   if(nq==58)
    DoMv(g,4,59,56);

 if(dgp==14&&dgs==4)
  if(nq==6)
   DoMv(g,12,5,7);
  else
   if(nq==2)
    DoMv(g,12,3,0);

 gb[g][nq]=dgp;
 DrawBoard(g)
 dgp=0;
}
var ns6T=ns6B=0;
function ns6Click(e)
{
 ns6T=e.target;
 if(ns6B)
  ns6Brd(cg);
 else
  dgp=0;
 ns6B=0;
}
function ns6Brd(g)
{
 for(i=0;i<64;i++)
  if(doc.images[jb[g]+i]==ns6T)break;
 if(i<64){
  if(gflip[g])
   i=63-i;
  if(dgp){
   nq=i;
   gb[g][dgs]=0;
   Kibitz(g);
   }
  else{
   dgp=gb[g][i];
   if(dgp)
    dgs=i;
   }
  }
}
function InitSys()
{
 FindScrBrd();
 GoStart(0);
}
