"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[525],{8113:function(e,t,n){n.d(t,{Z:function(){return a}});var r=n(8467),c=n(2135),o=n(6668),i=n(7313),s=n(6417);function a(e){(0,i.useContext)(o.V);var t=(0,r.TH)(),n=(0,r.s0)();return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(c.rU,{to:e.to,className:e.className,onClick:function(r){r.preventDefault(),t.pathname===e.to?(n("refresh"),setTimeout((function(){n(e.to)}),100)):(n(e.to),window.scrollTo(0,0))},children:e.children})})}},3948:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(8683),c=n(7313),o=n(6668),i=n(6417);function s(e){var t=(0,c.useContext)(o.V).bgDim;return(0,i.jsx)("div",{className:"bg-base-100 p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 "+e.className,style:(0,r.Z)({"--tw-bg-opacity":t/100},e.style),children:e.children})}},2525:function(e,t,n){n.r(t),n.d(t,{default:function(){return u}});var r=n(8467),c=n(4031),o=n(7313),i=n(6417);function s(e){return(0,i.jsx)("div",{className:"w-full container flex flex-col items-center  min-h-screen pt-2 px-5 flex-none",children:e.children})}n(8113);var a=n(6668),l=n(3948);function u(e){var t=o.useContext(c.St).isAdmin,n=o.useContext(a.V);return(0,o.useEffect)((function(){c.H1.preload(),t&&(c.pb.preload(),c.MU.preload()),n.setLinks([{to:"/admin/sections",name:"Sections",isAllowed:t},{to:"/admin/cards",name:"Cards",isAllowed:t},{to:"/admin/pages",name:"Pages",isAllowed:!0}]),document.title="El Cato - Admin"}),[]),(0,i.jsx)(l.Z,{className:"text-base-content flex flex-col items-center justify-center",children:(0,i.jsx)(s,{children:(0,i.jsx)(r.j3,{})})})}},8683:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(9142);function c(e,t,n){return(t=(0,r.Z)(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}}}]);