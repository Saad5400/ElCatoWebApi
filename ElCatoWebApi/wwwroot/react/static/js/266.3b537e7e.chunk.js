"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[266],{1266:function(e,t,n){n.r(t),n.d(t,{default:function(){return u}});var r=n(9439),s=n(2791),c=n(9555),a=n(184),i=s.lazy((function(){return n.e(894).then(n.bind(n,4357))})),l=s.lazy((function(){return Promise.resolve().then(n.bind(n,9388))})),o=s.lazy((function(){return Promise.resolve().then(n.bind(n,9129))}));function d(e){var t,n;null===(t=e.cards)||void 0===t||t.length;return(0,a.jsx)("div",{className:"my-2",children:(0,a.jsxs)(o,{children:[(0,a.jsx)("div",{className:"divider text-2xl before:bg-base-content after:bg-base-content text-base-content",children:e.title}),(0,a.jsx)("div",{className:"flex flex-row flex-wrap",children:null===(n=e.cards)||void 0===n?void 0:n.map((function(e,t){var n;return(0,a.jsx)("div",{className:"m-2 grow",children:(0,a.jsxs)("div",{className:"collapse collapse-arrow bg-base-content",children:[(0,a.jsx)("input",{type:"checkbox"}),(0,a.jsx)("div",{className:"collapse-title text-xl font-medium text-base-100",children:e.title}),(0,a.jsx)("div",{className:"collapse-content",children:(0,a.jsx)("ul",{className:"menu p-0",children:null===(n=e.pages)||void 0===n?void 0:n.map((function(e,t){return(0,a.jsx)("li",{children:(0,a.jsx)(i,{to:"page/"+e.id,className:"block break-all text-base-200 focus:!text-base-content focus:!bg-base-100 hover:bg-base-100 hover:text-base-content ",children:e.title})},e.id)}))})})]})},e.id)}))})]})})}function u(e){var t=(0,s.useState)([]),n=(0,r.Z)(t,2),i=n[0],o=n[1];return(0,s.useEffect)((function(){c.hi.get("/sections").then((function(e){document.title="El Cato";var t=e.data;t.sort((function(e,t){return e.order-t.order})),t.forEach((function(e){e.cards.sort((function(e,t){return e.order-t.order})),e.cards.forEach((function(e){e.pages.sort((function(e,t){return e.order-t.order}))}))})),o(t)})).catch((function(e){console.log(e)}))}),[]),(0,a.jsxs)(a.Fragment,{children:[i.length>0||(0,a.jsx)(l,{}),i.map((function(e,t){return(0,a.jsx)(d,{cards:e.cards,title:e.title,subtitle:e.subtitle},t)}))]})}}}]);
//# sourceMappingURL=266.3b537e7e.chunk.js.map