// Builds templates/faim-proposal-document.docx from the same placeholder content as the HTML template.
// Run: NODE_PATH=$(npm root -g) node tools/build-docx.js
const fs=require('fs'),path=require('path');
const {Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,WidthType,BorderStyle,ImageRun,AlignmentType,Header,Footer,PageNumber,ShadingType,PageBreak,TabStopType}=require('docx');
const INK='0A0A0A',BODY='2B2E2A',MUTED='6B7068',GREEN='2F7A1E',LINE='E2E4E0',SURF='F4F5F3',FONT='Plus Jakarta Sans';
const logo=fs.readFileSync(path.join(__dirname,'../assets/faim-logo-black.png'));
const r=(t,o={})=>new TextRun({text:t,font:FONT,size:21,color:BODY,...o});
const p=(c,o={})=>new Paragraph({children:Array.isArray(c)?c:[r(c)],spacing:{after:140,line:300},...o});
const h1=t=>new Paragraph({children:[r(t,{size:38,bold:true,color:INK})],spacing:{before:360,after:200},border:{bottom:{style:BorderStyle.SINGLE,size:6,color:INK,space:4}}});
const h2=t=>new Paragraph({children:[r(t,{size:25,bold:true,color:INK})],spacing:{before:240,after:100}});
const li=(lead,t)=>new Paragraph({bullet:{level:0},children:[...(lead?[r(lead+': ',{bold:true,color:INK})]:[]),r(t)],spacing:{after:100}});
const b={style:BorderStyle.SINGLE,size:4,color:LINE};const borders={top:b,bottom:b,left:b,right:b};
const cell=(t,o={})=>new TableCell({borders,width:o.w?{size:o.w,type:WidthType.PERCENTAGE}:undefined,shading:o.fill?{type:ShadingType.CLEAR,fill:o.fill,color:'auto'}:undefined,margins:{top:110,bottom:110,left:140,right:140},
  children:String(t).split('\n').map(l=>new Paragraph({alignment:o.right?AlignmentType.RIGHT:undefined,children:[r(l,{bold:!!o.bold,color:o.fill===INK?'FFFFFF':(o.bold?INK:BODY),size:20})]}))});
const table=(rows,{head,kv,widths}={})=>new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:rows.map((row,i)=>new TableRow({children:row.map((c,j)=>cell(c,{w:widths&&widths[j],bold:(head&&i===0)||(kv&&j===0),fill:head&&i===0?INK:(kv&&j===0?SURF:undefined),right:widths&&widths.right===j}))}))});
const brk=()=>new Paragraph({children:[new PageBreak()]});

const cover=[
 new Paragraph({children:[new ImageRun({data:logo,type:'png',transformation:{width:216,height:80}})],spacing:{before:400,after:2400}}),
 ...[['[Client Legal Name]',{size:48,bold:true,color:INK}],['[Project Name] at [Event]: [City Year]',{size:26,bold:true,color:INK}],['',{}],
   ['[Format, e.g. Interactive Stand Experience]',{bold:true,color:INK}],['From Concept to Event Delivery',{bold:true,color:INK}],['Version [0.0]',{}],['[Day Month Year]',{}],['',{}],['CONFIDENTIAL',{bold:true,color:INK}],['',{}],
   ['[FAIM legal entity]',{color:MUTED,size:18}],['Company Registration No. [000000]',{color:MUTED,size:18}],['[Address], Kingdom of Bahrain',{color:MUTED,size:18}],['Telephone: [+973 0000 0000]',{color:MUTED,size:18}],['Email: [hello@faimglobal.com]',{color:MUTED,size:18}]]
   .map(([t,o])=>new Paragraph({alignment:AlignmentType.RIGHT,children:[r(t,o)],spacing:{after:80}})),
 brk()];

const toc=['Contact Information','About FAIM','Executive Summary','About [Event]','The Experience','Scope of Services','Deliverables Summary','Proposed Timeline','[Client] Inputs and Dependencies','Exclusions and Out of Scope','Your Investment','Acceptance'];
const body=[
 h1('Table of Contents'),
 ...toc.map((t,i)=>new Paragraph({tabStops:[{type:TabStopType.RIGHT,position:9000,leader:'dot'}],children:[r(t,{bold:true,italics:true,color:INK}),r('\t'+[3,3,4,4,5,6,6,7,7,7,8,8][i],{bold:true,italics:true,color:INK})],spacing:{after:120}})),
 brk(),
 h1('Contact Information'),
 table([['Primary','Secondary'],['[Full Name]\n[Title]\n[name@faimglobal.com]\n[+973 0000 0000]','[Full Name]\n[Title]\n[name@faimglobal.com]\n[+973 0000 0000]']],{head:true}),
 h1('About FAIM'),
 p('FAIM (Future Artificial Intelligence Media) builds interactive technology for events and exhibitions across Bahrain and Saudi Arabia. [One sentence on when and how the company started.]'),
 p('[One paragraph on the team: size, disciplines, what sits in house.]'),
 h2('Capabilities and Credentials'),
 li('[Capability]','[What it is and one named example of it in use.]'),
 li('[Capability]','[What it is and one named example of it in use.]'),
 li('One accountable team','FAIM is responsible for delivery end to end: content, design, platform, testing and on site support.'),
 brk(),
 h1('Executive Summary'),
 p('[Event] takes place on [Day Date] at [Venue]. [Who hosts it, the theme, and who attends, with a number.] [Why this client has a natural claim on this room.]'),
 p('This proposal sets out [Project Name]: [what it is in one sentence]. Visitors [how they take part], and their [score, photo, result] appears live on the stand screens.'),
 p('Every visitor registers to take part, so [Client] leaves with three things: a clean, consented contact list; a live screen that draws people to the stand all day; and a list of warm leads delivered to the sales team the next working day.'),
 p([r('The event date is fixed. To deliver on [Date], we ask [Client] to sign this proposal by '),r('[Day Date]',{bold:true,color:INK}),r(', so the content review can start the following week.')]),
 h1('About [Event]'),
 table([['Date','[Day Date Year]'],['Venue','[Venue, City]'],['Host','[Host organisation]'],['Theme','"[Theme]"'],['Audience','[000+] participants: [who they are, in plain words]'],['Sponsors','[Names and tiers], as at [Date]']],{kv:true,widths:[26,74]}),
 brk(),
 h1('The Experience'),
 p('[Two sentences on what a visitor sees and does in the first ten seconds.]'),
 p([r('[Insert 16:9 concept screen here]',{italics:true,color:MUTED})]),
 h2('The visitor journey'),
 table([['Step','Stage','What happens'],['1','Start','[Tap the screen or scan the QR code.]'],['2','Register','[Name, contact, role and consent.]'],['3','Play','[N short rounds built on the client\'s story.]'],['4','Result','[Score, rank and the follow up question.]']],{head:true,widths:[12,28,60]}),
 p([r('Data: ',{bold:true,color:INK}),r('[Client] owns all visitor data. Consent is recorded per purpose, and FAIM processes data under a data processing agreement.')]),
 h1('Scope of Services'),
 ...['Phase 1: Discovery and content review','Phase 2: Design and build','Phase 3: Platform and security','Phase 4: Testing and sign off'].flatMap(t=>[h2(t),p('[What FAIM does, what the client reviews, what gets signed off.]')]),
 h1('Deliverables Summary'),
 table([['Deliverable','Detail'],...Array(4).fill(['[Deliverable]','[Format, quantity, when]'])],{head:true,widths:[40,60]}),
 brk(),
 h1('Proposed Timeline'),
 table([['Date','Milestone'],['[Day Date]','Proposal signed, first payment'],['[Day Date]','Content workshop'],['[Day Date]','Scope signed off'],['[Day Date]','Content freeze'],['[Day Date]','Testing sign off, second payment'],['[Day Date]','Live at [Event]']],{head:true,widths:[30,70]}),
 h1('[Client] Inputs and Dependencies'),
 li(null,'Consolidated content feedback by [Day Date].'),li(null,'Stand concept, size and space confirmed by [Day Date].'),li(null,'Legal sign off on consent wording, prize terms and disclaimer.'),
 h1('Exclusions and Out of Scope'),
 li(null,'[Item not included, stated plainly.]'),li(null,'[Item not included, stated plainly.]'),
 brk(),
 h1('Your Investment'),
 table([['Item','Amount'],['[Project Name], phases 1 to 7','[CUR 0,000]'],['Introductory offer saving','([CUR 0,000])'],['Total, excluding VAT','[CUR 0,000]'],['VAT at [00]%','[CUR 000]'],['Total, including VAT','[CUR 0,000]']],{head:true,widths:[70,30]}),
 p([r('Payments: ',{bold:true,color:INK}),r('[CUR 0,000] on acceptance, [CUR 0,000] on testing sign off. [N] day payment terms.')]),
 h1('Acceptance'),
 p('By signing below, [Client Legal Name] accepts this proposal and the General Terms and Conditions.'),
 table([['For [Client Legal Name]','For [FAIM legal entity]  ·  [FAIM seal]'],['Name:\nTitle:\nDate:\nSignature:\n\n','Name:\nTitle:\nDate:\nSignature:\n\n']],{head:false,widths:[50,50]}),
];

const header=new Header({children:[new Paragraph({tabStops:[{type:TabStopType.RIGHT,position:9000}],children:[new ImageRun({data:logo,type:'png',transformation:{width:124,height:46}}),new TextRun({children:['\t',PageNumber.CURRENT],font:FONT,size:18,color:MUTED})]})]});
const footer=new Footer({children:[new Paragraph({tabStops:[{type:TabStopType.CENTER,position:4500},{type:TabStopType.RIGHT,position:9000}],children:[r('[FAIM legal entity]\tConfidential\t[DD-MM-YY]',{size:17,color:MUTED})]})]});
const margin={top:1300,bottom:1200,left:1420,right:1420};
const doc=new Document({creator:'FAIM',title:'FAIM Proposal Document',
  styles:{default:{document:{run:{font:FONT,size:21,color:BODY}}}},
  sections:[{properties:{page:{margin}},children:cover},{properties:{page:{margin}},headers:{default:header},footers:{default:footer},children:body}]});
Packer.toBuffer(doc).then(buf=>{fs.writeFileSync(path.join(__dirname,'../templates/faim-proposal-document.docx'),buf);console.log('ok',buf.length)});
