"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[654],{4559:function(e,t,n){n.d(t,{Z:function(){return v}});var l=n(3433),r=n(4165),i=n(5861),a=n(9439),s=n(7313),o=n(4031),c=n(1391),u=n(3419),d=n(6417);function f(e){var t=e.filterText,n=e.onFilter,l=e.onClear;return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)("div",{className:"join w-full",children:[(0,d.jsx)("div",{className:"w-full",children:(0,d.jsx)("div",{className:"w-full",children:(0,d.jsx)("input",{className:"input input-bordered join-item w-full",placeholder:"Search",id:"search",type:"text",value:t,onChange:n})})}),(0,d.jsx)("button",{className:"btn btn-error join-item",onClick:l,children:"X"})]})})}function m(e){var t,n=s.useState(""),l=(0,a.Z)(n,2),r=l[0],i=l[1],o=s.useState(!1),c=(0,a.Z)(o,2),m=c[0],h=c[1],v=null===(t=e.data)||void 0===t?void 0:t.filter((function(t){return e.columns.some((function(e){var n="function"===typeof e.selector?e.selector(t):t[e.selector];return n?n.toString().toLowerCase().includes(r.toLowerCase()):""}))})),x=s.useMemo((function(){return(0,d.jsx)(f,{onFilter:function(e){return i(e.target.value)},onClear:function(){r&&(h(!m),i(""))},filterText:r})}),[r,m]);return(0,d.jsx)(u.ZP,{title:e.title,columns:e.columns,data:v,pagination:!0,paginationResetDefaultPage:m,subHeader:!0,subHeaderComponent:x,persistTableHead:!0,theme:"dark",onColumnOrderChange:function(e){return console.log(e)}})}var h=n(8426);function v(e){var t=e.model,n=e.setModel,u=e.models,f=e.setModels,v=e.sort,x=e.defaultModel,p=s.useContext(o.St),j=s.useState(null),b=(0,a.Z)(j,2),g=b[0],N=b[1],w=s.useState(null),Z=(0,a.Z)(w,2),y=Z[0],C=Z[1],S="Create",k=s.useState(S),P=(0,a.Z)(k,2),M=P[0],D=P[1];function I(t){t.preventDefault(),N(null),C(null),n(x),document.querySelector("form[id=mainForm]").reset(),document.querySelectorAll("button").forEach((function(e){return e.disabled=!1})),e.reset&&e.reset(t)}function O(t){if(window.confirm("Are you sure you want to delete this item?")){I(t);var n=t.target.value;o.hi.delete("".concat(e.apiPath,"/").concat(n)).then((function(e){e.status.toString().startsWith("2")?(f(u.filter((function(e){return e.id!=n}))),C("Item deleted successfully")):N(JSON.stringify(e))})).catch((function(e){N(JSON.stringify(e.message))})),e.handleDelete&&e.handleDelete(t)}}function A(e){I(e),e.target.disabled=!0,D("Edit");var t=e.target.value,l=u.find((function(e){return e.id==t}));n(l)}s.useEffect((function(){if(p.isAdmin)o.hi.get(e.apiPath).then((function(e){var t=e.data;v(t),f(t)})).catch((function(e){console.log(e)}));else{var t=function(){var t=(0,i.Z)((0,r.Z)().mark((function t(){var n,l,i;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,h.ZP.load();case 2:return n=t.sent,t.next=5,n.get();case 5:l=t.sent,i=l.visitorId,o.hi.get(e.apiPath,{params:{fingerPrint:i}}).then((function(e){var t=e.data;v(t),f(t)})).catch((function(e){console.log(e)}));case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t()}}),[]);var E=e.cols;return p.isAdmin&&(E=[].concat((0,l.Z)(e.cols),[{name:"Actions",cell:function(e){return(0,d.jsxs)("div",{className:"flex justify-between",children:[(0,d.jsx)("button",{className:"btn btn-primary",value:e.id,onClick:A,children:"Edit"}),(0,d.jsx)("button",{className:"btn btn-danger",value:e.id,onClick:O,children:"Delete"})]})}}])),(0,d.jsxs)("div",{className:"w-full max-w-md md:max-w-6xl h-full tajawal lg:mt-5",children:[(0,d.jsxs)("form",{id:"mainForm",children:[(0,d.jsxs)("h1",{className:"flex justify-between",children:[(0,d.jsxs)("span",{className:"text-2xl",children:[M," ",t?t.title:e.title]}),(0,d.jsx)("button",{className:"btn btn-primary",onClick:function(t){I(t),D(S),e.handleCreate&&e.handleCreate(t)},children:"Load new"})]}),e.children,(0,d.jsxs)("div",{className:"mt-5",children:[(0,d.jsx)("button",{id:"submit",className:"btn btn-primary btn-block",onClick:function(r){document.querySelector("button[id=submit]").disabled=!0,o.hi.post("".concat(e.apiPath,"/upsert"),t).then((function(e){var t;e.status.toString().startsWith("2")&&(n(e.data),t=M===S?[].concat((0,l.Z)(u),[e.data]):u.map((function(t){return t.id==e.data.id?e.data:t})),v(t),f(t),I(r),C("item was saved successfully"))})).catch((function(e){var t;console.log(e),N(e.message+": "+JSON.stringify(null===(t=e.response)||void 0===t?void 0:t.data))})).finally((function(){document.querySelector("button[id=submit]").disabled=!1}))},children:M}),g&&(0,d.jsx)(c.Z,{className:"alert-error",children:g}),y&&(0,d.jsx)(c.Z,{className:"alert-success",children:y})]})]}),(0,d.jsx)("div",{className:"mt-10"}),(0,d.jsxs)("h1",{className:"text-2xl",children:["Your ",e.title]}),(0,d.jsx)("div",{className:"overflow-auto w-full",children:(0,d.jsx)(m,{title:e.title,data:u,columns:E})}),(0,d.jsx)("br",{}),(0,d.jsx)("br",{})]})}},1391:function(e,t,n){n.d(t,{Z:function(){return r}});var l=n(6417);function r(e){return(0,l.jsxs)("div",{className:"alert flex "+e.className,dir:e.dir,children:[(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",className:"stroke-current shrink-0 w-6 h-6",children:(0,l.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),(0,l.jsx)("span",{className:"w-full",children:e.children})]})}},2050:function(e,t,n){n.d(t,{Z:function(){return r}});var l=n(6417);function r(e){return(0,l.jsxs)("div",{className:"form-control w-full "+e.className,children:[(0,l.jsxs)("label",{className:"label",children:[(0,l.jsx)("span",{className:"label-text",children:e.label}),e.hint&&(0,l.jsx)("span",{className:"label-text-alt",children:e.hint})]}),e.children]})}},7654:function(e,t,n){n.r(t),n.d(t,{default:function(){return u}});var l=n(8683),r=n(9439),i=n(7313),a=n(4559),s=n(2050),o=n(4031),c=n(6417);function u(){var e=i.useState(null),t=(0,r.Z)(e,2),n=t[0],u=t[1],d=i.useState(null),f=(0,r.Z)(d,2),m=f[0],h=f[1],v=i.useState(null),x=(0,r.Z)(v,2),p=x[0],j=x[1];return i.useEffect((function(){o.hi.get("/sections").then((function(e){j(e.data)})).catch((function(e){console.log(e)}))}),[]),(0,c.jsxs)(a.Z,{sort:function(e){e.sort((function(e,t){var n,l,r,i;return(null===(n=e.section)||void 0===n?void 0:n.order)==(null===(l=t.section)||void 0===l?void 0:l.order)?e.order-t.order:(null===(r=e.section)||void 0===r?void 0:r.order)-(null===(i=t.section)||void 0===i?void 0:i.order)}))},model:n,setModel:u,models:m,setModels:h,title:"Cards",apiPath:"/cards",cols:[{name:"ID",selector:function(e){return e.id}},{name:"Title",selector:function(e){return e.title}},{name:"Order",selector:function(e){return e.order}},{name:"Section",selector:function(e){var t;return null===(t=e.section)||void 0===t?void 0:t.title}}],children:[(0,c.jsx)("input",{type:"hidden",name:"id",value:n?n.id:0}),(0,c.jsx)(s.Z,{label:"Title",children:(0,c.jsx)("input",{name:"title",type:"text",className:"input input-bordered",value:n?n.title:"",onChange:function(e){u((0,l.Z)((0,l.Z)({},n),{},{title:e.target.value}))}})}),(0,c.jsx)(s.Z,{label:"Order",children:(0,c.jsx)("input",{name:"order",type:"number",className:"input input-bordered",value:n?n.order:"",onChange:function(e){u((0,l.Z)((0,l.Z)({},n),{},{order:e.target.value}))}})}),(0,c.jsx)(s.Z,{label:"Section",children:(0,c.jsx)("select",{name:"sectionId",className:"select select-bordered w-full",value:n?n.sectionId:"",onChange:function(e){u((0,l.Z)((0,l.Z)({},n),{},{sectionId:e.target.value}))},children:null===p||void 0===p?void 0:p.map((function(e,t){return(0,c.jsx)("option",{value:e.id,children:e.title},t)}))})})]})}}}]);