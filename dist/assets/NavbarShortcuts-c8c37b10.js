import{e as _,f as h,U as g,o,J as l,w as e,d as t,V as n,I as V,aj as x,ai as C,b as v,g as p,al as y,c as S,F as A,M as I,Q as k,am as w,a as d,t as m}from"./index-7cf6b37e.js";import{V as B}from"./VMenu-cf416cb0.js";import{V as D}from"./VDivider-8b963e7d.js";import{V as M,a as N}from"./VRow-a322e02c.js";import"./forwardRefs-9d31fcaa.js";import"./VOverlay-26a679d2.js";import"./dialog-transition-9aad2713.js";const z={class:"text-base font-weight-medium mt-2 mb-0"},F={class:"text-sm"},U=_({__name:"Shortcuts",props:{togglerIcon:{default:"tabler-layout-grid-add"},shortcuts:null},setup(r){const s=r,c=h();return(f,i)=>{const u=g("IconBtn");return o(),l(u,null,{default:e(()=>[t(n,{size:"26",icon:s.togglerIcon},null,8,["icon"]),t(B,{activator:"parent",offset:"14px",location:"bottom end"},{default:e(()=>[t(V,{width:"340","max-height":"560",class:"d-flex flex-column"},{default:e(()=>[t(x,{class:"py-4"},{append:e(()=>[t(u,null,{default:e(()=>[t(n,{icon:"tabler-layout-grid-add"})]),_:1})]),default:e(()=>[t(C,null,{default:e(()=>[v("Shortcuts")]),_:1})]),_:1}),t(D),t(p(y),{options:{wheelPropagation:!1}},{default:e(()=>[t(M,{class:"ma-0 mt-n1"},{default:e(()=>[(o(!0),S(A,null,I(s.shortcuts,(a,b)=>(o(),l(N,{key:a.title,cols:"6",class:k(["text-center border-t cursor-pointer pa-4 shortcut-icon",(b+1)%2?"border-e":""]),onClick:$=>p(c).push(a.to)},{default:e(()=>[t(w,{variant:"tonal",size:"48"},{default:e(()=>[t(n,{icon:a.icon},null,8,["icon"])]),_:2},1024),d("h6",z,m(a.title),1),d("span",F,m(a.subtitle),1)]),_:2},1032,["class","onClick"]))),128))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}});const J=_({__name:"NavbarShortcuts",setup(r){const s=[{icon:"tabler-calendar",title:"Calendar",subtitle:"Appointments",to:{name:"apps-calendar"}},{icon:"tabler-file",title:"Invoice App",subtitle:"Manage Accounts",to:{name:"apps-invoice-list"}},{icon:"tabler-user",title:"Users",subtitle:"Manage Users",to:{name:"apps-user-list"}},{icon:"tabler-layout",title:"Dashboard",subtitle:"Dashboard Analytics",to:{name:"dashboards-analytics"}},{icon:"tabler-settings",title:"Settings",subtitle:"Account Settings",to:{name:"pages-account-settings-tab",params:{tab:"account"}}},{icon:"tabler-help",title:"Help Center",subtitle:"FAQs & Articles",to:{name:"pages-help-center"}}];return(c,f)=>{const i=U;return o(),l(i,{shortcuts:s})}}});export{J as default};
