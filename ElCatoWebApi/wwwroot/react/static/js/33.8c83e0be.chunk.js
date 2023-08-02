"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[33,442],{3359:function(e,t,n){n.d(t,{Z:function(){return h}});var i=n(3433),l=n(4165),r=n(5861),a=n(9439),o=n(2791),s=n(9618),c=n(4442),u=n(3513),d=n(184);function f(e){var t=e.filterText,n=e.onFilter,i=e.onClear;return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)("div",{className:"join w-full",children:[(0,d.jsx)("div",{className:"w-full",children:(0,d.jsx)("div",{className:"w-full",children:(0,d.jsx)("input",{className:"input input-bordered join-item w-full",placeholder:"Search",id:"search",type:"text",value:t,onChange:n})})}),(0,d.jsx)("button",{className:"btn btn-error join-item",onClick:i,children:"X"})]})})}function v(e){var t,n=o.useState(""),i=(0,a.Z)(n,2),l=i[0],r=i[1],s=o.useState(!1),c=(0,a.Z)(s,2),v=c[0],m=c[1],h=null===(t=e.data)||void 0===t?void 0:t.filter((function(t){return e.columns.some((function(e){var n="function"===typeof e.selector?e.selector(t):t[e.selector];return n?n.toString().toLowerCase().includes(l.toLowerCase()):""}))})),x=o.useMemo((function(){return(0,d.jsx)(f,{onFilter:function(e){return r(e.target.value)},onClear:function(){l&&(m(!v),r(""))},filterText:l})}),[l,v]);return(0,d.jsx)(u.ZP,{title:e.title,columns:e.columns,data:h,pagination:!0,paginationResetDefaultPage:v,subHeader:!0,subHeaderComponent:x,persistTableHead:!0,theme:"dark",onColumnOrderChange:function(e){return console.log(e)}})}var m=n(9717);function h(e){var t=e.model,n=e.setModel,u=e.models,f=e.setModels,h=e.sort,x=e.defaultModel,p=o.useContext(s.St),b=o.useState(null),g=(0,a.Z)(b,2),j=g[0],Z=g[1],w=o.useState(null),C=(0,a.Z)(w,2),N=C[0],k=C[1],y="Create",S=o.useState(y),P=(0,a.Z)(S,2),M=P[0],A=P[1];function _(t){t.preventDefault(),Z(null),k(null),n(x),document.querySelector("form[id=mainForm]").reset(),document.querySelectorAll("button").forEach((function(e){return e.disabled=!1})),e.reset&&e.reset(t)}function I(t){if(window.confirm("Are you sure you want to delete this item?")){_(t);var n=t.target.value;s.hi.delete("".concat(e.apiPath,"/").concat(n)).then((function(e){e.status.toString().startsWith("2")?(f(u.filter((function(e){return e.id!=n}))),k("Item deleted successfully")):Z(JSON.stringify(e))})).catch((function(e){Z(JSON.stringify(e.message))})),e.handleDelete&&e.handleDelete(t)}}function q(e){_(e),e.target.disabled=!0,A("Edit");var t=e.target.value,i=u.find((function(e){return e.id==t}));n(i)}o.useEffect((function(){if(p.isAdmin)s.hi.get(e.apiPath).then((function(e){var t=e.data;h(t),f(t)})).catch((function(e){console.log(e)}));else{var t=function(){var t=(0,r.Z)((0,l.Z)().mark((function t(){var n,i,r;return(0,l.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,m.ZP.load();case 2:return n=t.sent,t.next=5,n.get();case 5:i=t.sent,r=i.visitorId,s.hi.get(e.apiPath,{params:{fingerPrint:r}}).then((function(e){var t=e.data;h(t),f(t)})).catch((function(e){console.log(e)}));case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t()}}),[]);var E=e.cols;return p.isAdmin&&(E=[].concat((0,i.Z)(e.cols),[{name:"Actions",cell:function(e){return(0,d.jsxs)("div",{className:"flex justify-between",children:[(0,d.jsx)("button",{className:"btn btn-primary",value:e.id,onClick:q,children:"Edit"}),(0,d.jsx)("button",{className:"btn btn-danger",value:e.id,onClick:I,children:"Delete"})]})}}])),(0,d.jsxs)("div",{className:"w-full max-w-md sm:max-w-none h-full tajawal lg:mt-5",children:[(0,d.jsxs)("form",{id:"mainForm",children:[(0,d.jsxs)("h1",{className:"flex justify-between",children:[(0,d.jsxs)("span",{className:"text-2xl",children:[M," ",t?t.title:e.title]}),(0,d.jsx)("button",{className:"btn btn-primary",onClick:function(t){_(t),A(y),e.handleCreate&&e.handleCreate(t)},children:"New"})]}),e.children,(0,d.jsxs)("div",{className:"mt-5",children:[(0,d.jsx)("button",{id:"submit",className:"btn btn-primary btn-block",onClick:function(l){document.querySelector("button[id=submit]").disabled=!0,s.hi.post("".concat(e.apiPath,"/upsert"),t).then((function(e){var t;e.status.toString().startsWith("2")&&(n(e.data),t=M===y?[].concat((0,i.Z)(u),[e.data]):u.map((function(t){return t.id==e.data.id?e.data:t})),h(t),f(t),_(l),k("model saved successfully"))})).catch((function(e){var t;console.log(e),Z(e.message+": "+(null===(t=e.response)||void 0===t?void 0:t.data))})).finally((function(){document.querySelector("button[id=submit]").disabled=!1}))},children:M}),j&&(0,d.jsx)(c.default,{className:"alert-error",children:j}),N&&(0,d.jsx)(c.default,{className:"alert-success",children:N})]})]}),(0,d.jsx)("div",{className:"mt-10"}),(0,d.jsxs)("h1",{className:"text-2xl",children:["Your ",e.title]}),(0,d.jsx)("div",{className:"overflow-auto w-full",children:(0,d.jsx)(v,{title:e.title,data:u,columns:E})}),(0,d.jsx)("br",{}),(0,d.jsx)("br",{})]})}},4442:function(e,t,n){n.r(t),n.d(t,{default:function(){return l}});var i=n(184);function l(e){return(0,i.jsxs)("div",{className:"alert flex "+e.className,children:[(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",className:"stroke-current shrink-0 w-6 h-6",children:(0,i.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),(0,i.jsx)("span",{className:"w-full",children:e.children})]})}},6919:function(e,t,n){n.d(t,{Z:function(){return l}});var i=n(184);function l(e){return(0,i.jsxs)("div",{className:"form-control w-full "+e.className,children:[(0,i.jsx)("label",{className:"label",children:(0,i.jsx)("span",{className:"label-text",children:e.label})}),e.children]})}},1033:function(e,t,n){n.r(t),n.d(t,{default:function(){return j}});var i=n(1413),l=n(4165),r=n(5861),a=n(9439),o=n(2791),s=n(3359),c=n(6919),u=n(9618),d=n(4925),f=n(9687),v=(n(8838),n(6890),n(3342),n(6202),n(6783),n(2687),n(1786),n(8291),n(395),n(4601),n(6733),n(1108),n(6504),n(8924),n(769),n(288),n(1182),n(6168),n(5672),n(594),n(7711),n(4954),n(7935),n(1639),n(3660),n(7332),n(317),n(5637),n(1228),n(5278),n(560),n(1559),n(499),n(8743),n(6311)),m=n(8973),h=n(184),x=["init"];function p(e){var t=e.init,n=(0,d.Z)(e,x);return(0,h.jsx)(f.M,(0,i.Z)({init:(0,i.Z)((0,i.Z)({},t),{},{skin:"oxide-dark",content_css:!1,content_style:[v.Z,m.Z,t.content_style||""].join("\n")})},n))}var b=n(9717),g=n(4442);function j(e){var t,n=o.useRef(null),d={card:{}},f=o.useState(d),v=(0,a.Z)(f,2),m=v[0],x=v[1],j=o.useState(null),Z=(0,a.Z)(j,2),w=Z[0],C=Z[1],N=o.useState(null),k=(0,a.Z)(N,2),y=k[0],S=k[1],P=o.useState(null),M=(0,a.Z)(P,2),A=M[0],_=M[1],I=o.useState(null),q=(0,a.Z)(I,2),E=q[0],F=q[1],L=o.useContext(u.St),T=o.useState(null),D=(0,a.Z)(T,2),O=D[0],H=D[1],J=o.useState(null),z=(0,a.Z)(J,2),W=z[0],B=z[1];o.useEffect((function(){u.hi.get("/sections").then((function(e){S(e.data),_(e.data[0].id),F(e.data[0].cards)})).catch((function(e){console.log(e)}));var e=function(){var e=(0,r.Z)((0,l.Z)().mark((function e(){var t,n,i;return(0,l.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.ZP.load();case 2:return t=e.sent,e.next=5,t.get();case 5:n=e.sent,i=n.visitorId,H(i);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),o.useEffect((function(){0==(null===L||void 0===L?void 0:L.isAdmin)&&x((0,i.Z)((0,i.Z)({},m),{},{fingerPrint:O}))}),[O]),o.useEffect((function(){if(A){var e,t=y.find((function(e){return e.id==A})).cards;F(t),x((0,i.Z)((0,i.Z)({},m),{},{cardId:null===(e=t[0])||void 0===e?void 0:e.id}))}}),[A]),o.useEffect((function(){var e,t,i,l,r;(_(null===m||void 0===m||null===(e=m.card)||void 0===e||null===(t=e.section)||void 0===t?void 0:t.id),x(m),0==(null===(i=n.current)||void 0===i?void 0:i.hasFocus()))&&(null!==m&&void 0!==m&&m.content?null===(l=n.current)||void 0===l||l.setContent(null===m||void 0===m?void 0:m.content):null===(r=n.current)||void 0===r||r.setContent(""))}),[m]);var R=window.matchMedia("(max-width: 1023.5px)").matches;return(0,h.jsx)(s.Z,{reset:function(t){document.querySelector("textarea").value="",_(y[0].id),console.log(e.fingerPrint),x((function(e){return 0==L.isAdmin?(0,i.Z)((0,i.Z)({},e),{},{cardId:y[0].cards[0].id,fingerPrint:O}):(0,i.Z)((0,i.Z)({},e),{},{cardId:y[0].cards[0].id})}))},sort:function(e){e.sort((function(e,t){var n,i,l,r,a,o,s,c,u,d,f,v;return(null===(n=e.card)||void 0===n||null===(i=n.section)||void 0===i?void 0:i.order)==(null===(l=t.card)||void 0===l||null===(r=l.section)||void 0===r?void 0:r.order)?(null===(u=e.card)||void 0===u?void 0:u.order)==(null===(d=t.card)||void 0===d?void 0:d.order)?e.order-t.order:(null===(f=e.card)||void 0===f?void 0:f.order)-(null===(v=t.card)||void 0===v?void 0:v.order):(null===(a=e.card)||void 0===a||null===(o=a.section)||void 0===o?void 0:o.order)-(null===(s=t.card)||void 0===s||null===(c=s.section)||void 0===c?void 0:c.order)}))},defaultModel:d,model:m,setModel:x,models:w,setModels:C,title:"Pages",apiPath:"/pages",cols:[{name:"Views Count",selector:function(e){return e.viewCount}},{name:"Title",selector:function(e){return e.title}},{name:"Order",selector:function(e){return e.order}},{name:"Section",selector:function(e){var t,n;return null===(t=e.card)||void 0===t||null===(n=t.section)||void 0===n?void 0:n.title}},{name:"Card",selector:function(e){var t;return null===(t=e.card)||void 0===t?void 0:t.title}},{name:"Approved",selector:function(e){return e.accepted?"Yes":"No"}}],children:(0,h.jsxs)("div",{children:[(0,h.jsx)("input",{type:"hidden",name:"id",value:m?m.id:0}),(0,h.jsx)(c.Z,{label:"Title",children:(0,h.jsx)("input",{name:"title",type:"text",className:"input input-bordered",value:m?m.title:"",onChange:function(e){x((0,i.Z)((0,i.Z)({},m),{},{title:e.target.value}))}})}),L.isAdmin&&(0,h.jsx)(c.Z,{label:"Finger Print",children:(0,h.jsx)("input",{name:"fingerPrint",type:"text",className:"input input-bordered",value:m?m.fingerPrint:"",onChange:function(e){x((0,i.Z)((0,i.Z)({},m),{},{fingerPrint:e.target.value}))}})}),L.isAdmin&&(0,h.jsx)(c.Z,{label:"Views Count",children:(0,h.jsx)("input",{name:"viewCount",type:"number",className:"input input-bordered",value:m?m.viewCount:"",onChange:function(e){x((0,i.Z)((0,i.Z)({},m),{},{viewCount:e.target.value}))}})}),(0,h.jsx)(c.Z,{label:"Order",children:(0,h.jsx)("input",{name:"order",type:"number",className:"input input-bordered",value:m?m.order:"",onChange:function(e){x((0,i.Z)((0,i.Z)({},m),{},{order:e.target.value}))}})}),(0,h.jsx)(c.Z,{label:"Section",children:(0,h.jsx)("select",{name:"sectionId",className:"select select-bordered w-full",value:A,onChange:function(e){_(e.target.value)},children:null===y||void 0===y?void 0:y.map((function(e,t){return(0,h.jsx)("option",{value:e.id,children:e.title},t)}))})}),(0,h.jsx)(c.Z,{label:"Card",children:(0,h.jsx)("select",{name:"cardId",className:"select select-bordered w-full",value:m?m.cardId:E?null===(t=E[0])||void 0===t?void 0:t.id:"",onChange:function(e){x((0,i.Z)((0,i.Z)({},m),{},{cardId:e.target.value}))},children:null===E||void 0===E?void 0:E.map((function(e,t){return(0,h.jsx)("option",{value:e.id,children:e.title},t)}))})}),L.isAdmin&&(0,h.jsx)(c.Z,{label:"Approved",children:(0,h.jsx)("input",{type:"checkbox",className:"checkbox",checked:!!m&&m.accepted,onChange:function(e){x((0,i.Z)((0,i.Z)({},m),{},{accepted:e.target.checked}))}})}),(0,h.jsx)(c.Z,{label:"Content"}),W&&(0,h.jsx)(g.default,{className:"alert-error",children:W}),(0,h.jsx)("div",{className:"",children:(0,h.jsx)(p,{onInit:function(e,t){return n.current=t},init:{height:600,menubar:"edit view insert format tools table help",plugins:"preview searchreplace autolink directionality code visualchars fullscreen image link media codesample table insertdatetime advlist lists quickbars wordcount",toolbar:"undo redo | bold italic | fontsize blocks | alignleft aligncenter alignright alignjustify |  numlist bullist | forecolor backcolor removeformat | fullscreen | image media link codesample | ltr rtl",quickbars_selection_toolbar:"bold italic formatcode | quicklink h2 h3",image_caption:!0,toolbar_mode:"sliding",contextmenu:"link image table",toolbar_sticky:!0,toolbar_sticky_offset:R?102:108,content_style:"body { font-family: Tahoma; font-size: 14px; background-color: #000; color: #c7c7c7; }",codesample_languages:[{text:"HTML/XML",value:"markup"},{text:"JavaScript",value:"javascript"},{text:"CSS",value:"css"},{text:"Python",value:"python"},{text:"Java",value:"java"},{text:"C#",value:"csharp"},{text:"SQL",value:"sql"},{text:"Bash",value:"bash"}]},onEditorChange:function(e,t){e.length<102400?(x((0,i.Z)((0,i.Z)({},m),{},{content:e})),B(null)):(n.current.setContent(e.substring(0,102100)),B("Content is too large"))}})})]})})}}}]);
//# sourceMappingURL=33.8c83e0be.chunk.js.map