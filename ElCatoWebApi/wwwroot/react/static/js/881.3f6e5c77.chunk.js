"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[881],{4559:function(e,t,n){n.d(t,{Z:function(){return m}});var i=n(3433),l=n(4165),r=n(5861),a=n(9439),o=n(7313),s=n(4031),c=n(1391),u=n(6417);function d(e){var t=e.filterText,n=e.onFilter;return(0,u.jsx)(u.Fragment,{children:(0,u.jsx)("div",{className:"w-full mt-5",children:(0,u.jsx)("input",{className:"input join-item w-full",placeholder:"Search",id:"search",type:"text",value:t,onChange:n})})})}function f(e){var t,n=o.useState(""),i=(0,a.Z)(n,2),l=i[0],r=i[1],s=null===(t=e.data)||void 0===t?void 0:t.filter((function(t){return e.columns.some((function(e){var n="function"===typeof e.selector?e.selector(t):t[e.selector];return n?n.toString().toLowerCase().includes(l.toLowerCase()):""}))})),c=o.useState(1),f=(0,a.Z)(c,2),v=f[0],m=f[1],h=o.useState(10),x=(0,a.Z)(h,2),p=x[0],j=x[1],b=o.useState([]),g=(0,a.Z)(b,2),Z=g[0],w=g[1];return(0,o.useEffect)((function(){var t=null===s||void 0===s?void 0:s.slice((v-1)*p,v*p);w(null===t||void 0===t?void 0:t.map((function(t,n){return(0,u.jsx)("tr",{children:e.columns.map((function(e,n){return(0,u.jsx)("td",{children:"function"===typeof e.selector?e.selector(t):e.cell(t)},n)}))},n)})))}),[l,v,p,e.data]),(0,o.useEffect)((function(){m(1)}),[l]),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{className:"flex flex-row justify-between w-full mt-5",children:[(0,u.jsx)("div",{children:(0,u.jsxs)("select",{className:"select select-bordered w-full max-w-xs",value:p||"",onChange:function(e){return j(e.target.value)},children:[(0,u.jsx)("option",{children:"5"}),(0,u.jsx)("option",{children:"10"}),(0,u.jsx)("option",{children:"25"})]})}),(0,u.jsxs)("div",{className:"join",children:[(0,u.jsx)("button",{className:"join-item btn",onClick:function(){return m(v-1)},disabled:1===v,children:"\xab"}),(0,u.jsx)("select",{className:"join-item select",value:v||"",onChange:function(e){return m(e.target.value)},children:s&&Array.from(Array(Math.ceil((null===s||void 0===s?void 0:s.length)/p)).keys()).map((function(e){return(0,u.jsxs)("option",{value:e+1,children:["Page ",e+1]},e)}))}),(0,u.jsx)("button",{className:"join-item btn",onClick:function(){return m(v+1)},disabled:null==s||(null===s||void 0===s?void 0:s.length)<v*p,children:"\xbb"})]})]}),(0,u.jsx)(d,{onFilter:function(e){return r(e.target.value)},filterText:l}),(0,u.jsx)("div",{className:"overflow-x-auto",children:(0,u.jsxs)("table",{className:"table bg-base-300",children:[(0,u.jsx)("thead",{children:(0,u.jsx)("tr",{className:"bg-base-100",children:e.columns.map((function(e,t){return(0,u.jsx)("th",{className:"min-w-[100px]",children:e.name},t)}))})}),(0,u.jsx)("tbody",{children:Z})]})})]})}var v=n(2327);function m(e){var t=e.model,n=e.setModel,d=e.models,m=e.setModels,h=e.sort,x=e.defaultModel,p=o.useContext(s.St),j=o.useState(null),b=(0,a.Z)(j,2),g=b[0],Z=b[1],w=o.useState(null),N=(0,a.Z)(w,2),y=N[0],C=N[1],S="Create",k=o.useState(S),P=(0,a.Z)(k,2),A=P[0],M=P[1];function E(t){t.preventDefault(),Z(null),C(null),n(x),document.querySelector("form[id=mainForm]").reset(),document.querySelectorAll("button").forEach((function(e){return e.disabled=!1})),e.reset&&e.reset(t)}function I(t){if(window.confirm("Are you sure you want to delete this item?")){E(t);var n=t.target.value;s.hi.delete("".concat(e.apiPath,"/").concat(n)).then((function(e){e.status.toString().startsWith("2")?(m(d.filter((function(e){return e.id!=n}))),C("Item deleted successfully")):Z(JSON.stringify(e))})).catch((function(e){Z(JSON.stringify(e.message))})),e.handleDelete&&e.handleDelete(t)}}function _(e){E(e),e.target.disabled=!0,M("Edit");var t=e.target.value,i=d.find((function(e){return e.id==t}));n(i)}o.useEffect((function(){if(p.isAdmin)s.hi.get(e.apiPath).then((function(e){var t=e.data;h(t),m(t)})).catch((function(e){console.log(e)}));else{var t=function(){var t=(0,r.Z)((0,l.Z)().mark((function t(){var n,i,r;return(0,l.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v.ZP.load();case 2:return n=t.sent,t.next=5,n.get();case 5:i=t.sent,r=i.visitorId,s.hi.get(e.apiPath,{params:{fingerPrint:r}}).then((function(e){var t=e.data;h(t),m(t)})).catch((function(e){console.log(e)}));case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t()}}),[]);var F=e.cols;return p.isAdmin&&(F=[].concat((0,i.Z)(e.cols),[{name:"Actions",cell:function(e){return(0,u.jsxs)("div",{className:"btn-group",children:[(0,u.jsx)("button",{className:"btn btn-primary",value:e.id,onClick:_,children:"Edit"}),(0,u.jsx)("button",{className:"btn btn-error",value:e.id,onClick:I,children:"Delete"})]})}}])),(0,u.jsxs)("div",{className:"w-full max-w-md md:max-w-6xl h-full tajawal lg:mt-5",children:[(0,u.jsxs)("form",{id:"mainForm",children:[(0,u.jsxs)("h1",{className:"flex justify-between",children:[(0,u.jsxs)("span",{className:"text-2xl",children:[A," ",t?t.title:e.title]}),(0,u.jsx)("button",{className:"btn btn-primary",onClick:function(t){E(t),M(S),e.handleCreate&&e.handleCreate(t)},children:"Load new"})]}),e.children,(0,u.jsxs)("div",{className:"mt-5",children:[(0,u.jsx)("button",{id:"submit",className:"btn btn-primary btn-block",onClick:function(l){document.querySelector("button[id=submit]").disabled=!0,s.hi.post("".concat(e.apiPath,"/upsert"),t).then((function(e){var t;e.status.toString().startsWith("2")&&(n(e.data),t=A===S?[].concat((0,i.Z)(d),[e.data]):d.map((function(t){return t.id==e.data.id?e.data:t})),h(t),m(t),E(l),C("item was saved successfully"))})).catch((function(e){var t;console.log(e),Z(e.message+": "+JSON.stringify(null===(t=e.response)||void 0===t?void 0:t.data))})).finally((function(){document.querySelector("button[id=submit]").disabled=!1}))},children:A}),g&&(0,u.jsx)(c.Z,{className:"alert-error",children:g}),y&&(0,u.jsx)(c.Z,{className:"alert-success",children:y})]})]}),(0,u.jsx)("div",{className:"mt-10"}),(0,u.jsxs)("h1",{className:"text-2xl",children:["Your ",e.title]}),(0,u.jsx)("div",{className:"overflow-auto w-full",children:(0,u.jsx)(f,{title:e.title,data:d,columns:F})}),(0,u.jsx)("br",{}),(0,u.jsx)("br",{})]})}},1391:function(e,t,n){n.d(t,{Z:function(){return l}});var i=n(6417);function l(e){return(0,i.jsxs)("div",{className:"alert flex "+e.className,dir:e.dir,children:[(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",className:"stroke-current shrink-0 w-6 h-6",children:(0,i.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),(0,i.jsx)("span",{className:"w-full",children:e.children})]})}},2050:function(e,t,n){n.d(t,{Z:function(){return l}});var i=n(6417);function l(e){return(0,i.jsxs)("div",{className:"form-control w-full "+e.className,children:[(0,i.jsxs)("label",{className:"label",children:[(0,i.jsx)("span",{className:"label-text",children:e.label}),e.hint&&(0,i.jsx)("span",{className:"label-text-alt",children:e.hint})]}),e.children]})}},9881:function(e,t,n){n.r(t),n.d(t,{default:function(){return g}});var i=n(8683),l=n(4165),r=n(5861),a=n(9439),o=n(7313),s=n(4559),c=n(2050),u=n(4031),d=n(5987),f=n(7208),v=(n(6821),n(8317),n(9092),n(8719),n(262),n(9893),n(3265),n(5251),n(1700),n(6195),n(2090),n(8405),n(636),n(6447),n(2695),n(1283),n(6003),n(3011),n(8351),n(4574),n(6326),n(3798),n(6955),n(9513),n(6381),n(7720),n(9021),n(200),n(577),n(7129),n(5638),n(1735),n(3596),n(9686),n(6311)),m=n(8973),h=n(6417),x=["init"];function p(e){var t=e.init,n=(0,d.Z)(e,x);return(0,h.jsx)(f.M,(0,i.Z)({init:(0,i.Z)((0,i.Z)({},t),{},{skin:"oxide-dark",content_css:!1,content_style:[v.Z,m.Z,t.content_style||""].join("\n")})},n))}var j=n(2327),b=n(1391);function g(e){var t,n=o.useRef(null),d={card:{}},f=o.useState(d),v=(0,a.Z)(f,2),m=v[0],x=v[1],g=o.useState(null),Z=(0,a.Z)(g,2),w=Z[0],N=Z[1],y=o.useState(null),C=(0,a.Z)(y,2),S=C[0],k=C[1],P=o.useState(null),A=(0,a.Z)(P,2),M=A[0],E=A[1],I=o.useState(null),_=(0,a.Z)(I,2),F=_[0],L=_[1],q=o.useContext(u.St),T=o.useState(null),J=(0,a.Z)(T,2),O=J[0],D=J[1],z=o.useState(null),W=(0,a.Z)(z,2),B=W[0],V=W[1];o.useEffect((function(){u.hi.get("/sections").then((function(e){k(e.data),E(e.data[0].id),L(e.data[0].cards)})).catch((function(e){console.log(e)}));var e=function(){var e=(0,r.Z)((0,l.Z)().mark((function e(){var t,n,i;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.ZP.load();case 2:return t=e.sent,e.next=5,t.get();case 5:n=e.sent,i=n.visitorId,D(i);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),o.useEffect((function(){0==(null===q||void 0===q?void 0:q.isAdmin)&&x((0,i.Z)((0,i.Z)({},m),{},{fingerPrint:O}))}),[O]),o.useEffect((function(){if(M){var e,t=S.find((function(e){return e.id==M})).cards;L(t),x((0,i.Z)((0,i.Z)({},m),{},{cardId:null===(e=t[0])||void 0===e?void 0:e.id}))}}),[M]),o.useEffect((function(){var e,t,i,l,r;(E(null===m||void 0===m||null===(e=m.card)||void 0===e||null===(t=e.section)||void 0===t?void 0:t.id),x(m),0==(null===(i=n.current)||void 0===i?void 0:i.hasFocus()))&&(null!==m&&void 0!==m&&m.content?null===(l=n.current)||void 0===l||l.setContent(null===m||void 0===m?void 0:m.content):null===(r=n.current)||void 0===r||r.setContent(""))}),[m]);window.matchMedia("(max-width: 1023.5px)").matches;return(0,h.jsx)(s.Z,{reset:function(t){document.querySelector("textarea").value="",E(S[0].id),console.log(e.fingerPrint),x((function(e){return 0==q.isAdmin?(0,i.Z)((0,i.Z)({},e),{},{cardId:S[0].cards[0].id,fingerPrint:O}):(0,i.Z)((0,i.Z)({},e),{},{cardId:S[0].cards[0].id})}))},sort:function(e){e.sort((function(e,t){var n,i,l,r,a,o,s,c,u,d,f,v;return(null===(n=e.card)||void 0===n||null===(i=n.section)||void 0===i?void 0:i.order)==(null===(l=t.card)||void 0===l||null===(r=l.section)||void 0===r?void 0:r.order)?(null===(u=e.card)||void 0===u?void 0:u.order)==(null===(d=t.card)||void 0===d?void 0:d.order)?e.order-t.order:(null===(f=e.card)||void 0===f?void 0:f.order)-(null===(v=t.card)||void 0===v?void 0:v.order):(null===(a=e.card)||void 0===a||null===(o=a.section)||void 0===o?void 0:o.order)-(null===(s=t.card)||void 0===s||null===(c=s.section)||void 0===c?void 0:c.order)}))},defaultModel:d,model:m,setModel:x,models:w,setModels:N,title:"Pages",apiPath:"/pages",cols:[{name:"Views Count",selector:function(e){return e.viewCount}},{name:"Title",selector:function(e){return e.title}},{name:"Order",selector:function(e){return e.order}},{name:"Section",selector:function(e){var t,n;return null===(t=e.card)||void 0===t||null===(n=t.section)||void 0===n?void 0:n.title}},{name:"Card",selector:function(e){var t;return null===(t=e.card)||void 0===t?void 0:t.title}},{name:"Approved",selector:function(e){return e.accepted?"Yes":"No"}}],children:(0,h.jsxs)("div",{children:[(0,h.jsx)("input",{type:"hidden",name:"id",value:m?m.id:0}),(0,h.jsx)(c.Z,{label:"Title",hint:"\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u0641\u062d\u0629",children:(0,h.jsx)("input",{name:"title",type:"text",className:"input input-bordered",value:m?m.title:"",onChange:function(e){x((0,i.Z)((0,i.Z)({},m),{},{title:e.target.value}))}})}),q.isAdmin&&(0,h.jsx)(c.Z,{label:"Finger Print",children:(0,h.jsx)("input",{name:"fingerPrint",type:"text",className:"input input-bordered",value:m?m.fingerPrint:"",onChange:function(e){x((0,i.Z)((0,i.Z)({},m),{},{fingerPrint:e.target.value}))}})}),q.isAdmin&&(0,h.jsx)(c.Z,{label:"Views Count",children:(0,h.jsx)("input",{name:"viewCount",type:"number",className:"input input-bordered",value:m?m.viewCount:"",onChange:function(e){x((0,i.Z)((0,i.Z)({},m),{},{viewCount:e.target.value}))}})}),(0,h.jsx)(c.Z,{label:"Order",hint:"\u062a\u0631\u062a\u064a\u0628 \u0627\u0644\u0635\u0641\u062d\u0629",children:(0,h.jsx)("input",{name:"order",type:"number",className:"input input-bordered",value:m?m.order:"",onChange:function(e){x((0,i.Z)((0,i.Z)({},m),{},{order:e.target.value}))}})}),(0,h.jsx)(c.Z,{label:"Section",hint:"\u0627\u0644\u0642\u0633\u0645",children:(0,h.jsx)("select",{name:"sectionId",className:"select select-bordered w-full",value:M||"",onChange:function(e){E(e.target.value)},children:null===S||void 0===S?void 0:S.map((function(e,t){return(0,h.jsx)("option",{value:e.id,children:e.title},t)}))})}),(0,h.jsx)(c.Z,{label:"Card",hint:"\u0627\u0644\u0641\u0626\u0629",children:(0,h.jsx)("select",{name:"cardId",className:"select select-bordered w-full",value:m?m.cardId:F?null===(t=F[0])||void 0===t?void 0:t.id:"",onChange:function(e){x((0,i.Z)((0,i.Z)({},m),{},{cardId:e.target.value}))},children:null===F||void 0===F?void 0:F.map((function(e,t){return(0,h.jsx)("option",{value:e.id,children:e.title},t)}))})}),q.isAdmin&&(0,h.jsx)(c.Z,{label:"Approved",children:(0,h.jsx)("input",{type:"checkbox",className:"checkbox",checked:!!m&&m.accepted,onChange:function(e){x((0,i.Z)((0,i.Z)({},m),{},{accepted:e.target.checked}))}})}),(0,h.jsx)(c.Z,{label:"Content",hint:"\u0645\u062d\u062a\u0648\u0649 \u0627\u0644\u0635\u0641\u062d\u0629"}),B&&(0,h.jsx)(b.Z,{className:"alert-error",children:B}),(0,h.jsx)("div",{className:"",children:(0,h.jsx)(p,{onInit:function(e,t){return n.current=t},init:{height:600,menubar:"edit view insert format tools table",plugins:"preview searchreplace autolink directionality code visualchars fullscreen image link media codesample table insertdatetime advlist lists wordcount",toolbar:"undo redo | bold italic | fontsize blocks | ltr rtl alignleft aligncenter alignright alignjustify |  numlist bullist | forecolor backcolor removeformat | fullscreen | image media link codesample",image_caption:!0,toolbar_mode:"sliding",content_style:"body { font-family: Tahoma; font-size: 14px; background-color: #000; color: #c7c7c7; }",codesample_languages:[{text:"HTML/XML",value:"markup"},{text:"JavaScript",value:"javascript"},{text:"CSS",value:"css"},{text:"Python",value:"python"},{text:"Java",value:"java"},{text:"C#",value:"csharp"},{text:"SQL",value:"sql"},{text:"Bash",value:"bash"}],relative_urls:!1,promotion:!1,mobile:{menubar:"edit view insert format tools table",toolbar_mode:"sliding"}},onEditorChange:function(e,t){e.length<102400?(x((0,i.Z)((0,i.Z)({},m),{},{content:e})),V(null)):(n.current.setContent(e.substring(0,102100)),V("Content is too large"))}})})]})})}}}]);