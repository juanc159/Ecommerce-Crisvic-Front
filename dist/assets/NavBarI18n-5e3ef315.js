import{e as m,H as g,r as d,U as f,o as r,J as i,w as t,d as l,V as _,g as L,A as b,c as h,F as V,M as v,b as C,t as I,R as k}from"./index-7cf6b37e.js";import{V as x}from"./VMenu-cf416cb0.js";import{V as B,a as w,b as A}from"./VList-fed34aed.js";import"./forwardRefs-9d31fcaa.js";import"./VOverlay-26a679d2.js";import"./dialog-transition-9aad2713.js";import"./VDivider-8b963e7d.js";const E=m({__name:"I18n",props:{languages:null,location:{default:"bottom end"}},emits:["change"],setup(u){const o=u,{locale:s}=useI18n({useScope:"global"});g(s,n=>{document.documentElement.setAttribute("lang",n)});const a=d(["en"]);return(n,c)=>{const p=f("IconBtn");return r(),i(p,null,{default:t(()=>[l(_,{size:"26",icon:"tabler-language"}),l(x,{activator:"parent",location:o.location,offset:"14px"},{default:t(()=>[l(B,{selected:L(a),"onUpdate:selected":c[0]||(c[0]=e=>b(a)?a.value=e:null),"min-width":"175px"},{default:t(()=>[(r(!0),h(V,null,v(o.languages,e=>(r(),i(w,{key:e.i18nLang,value:e.i18nLang,onClick:F=>{s.value=e.i18nLang,n.$emit("change",e.i18nLang)}},{default:t(()=>[l(A,null,{default:t(()=>[C(I(e.label),1)]),_:2},1024)]),_:2},1032,["value","onClick"]))),128))]),_:1},8,["selected"])]),_:1},8,["location"])]),_:1})}}}),U=m({__name:"NavBarI18n",setup(u){const{isAppRtl:o}=k(),s=[{label:"English",i18nLang:"en"},{label:"French",i18nLang:"fr"},{label:"Arabic",i18nLang:"ar"}],a=n=>{o.value=n==="ar"};return(n,c)=>(r(),i(E,{languages:s,onChange:a}))}});export{U as default};
