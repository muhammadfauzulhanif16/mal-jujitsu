import{r as B,a as C,j as e,B as n,C as W,b as R}from"./app-DN9_gzYd.js";import{I as u,u as w}from"./Title-DYxjYiRb.js";var x={root:"m_5f75b09e",body:"m_5f6e695e",labelWrapper:"m_d3ea56bb",label:"m_8ee546b8",description:"m_328f68c0",error:"m_8e8a99cc"};const k=x,D=B.forwardRef(({__staticSelector:t,__stylesApiProps:l,className:r,classNames:f,styles:I,unstyled:_,children:h,label:i,description:d,id:p,disabled:b,error:o,size:s,labelPosition:j="left",bodyElement:c="div",labelElement:m="label",variant:v,style:y,vars:E,mod:S,...F},g)=>{const a=C({name:t,props:l,className:r,style:y,classes:x,classNames:f,styles:I,unstyled:_});return e.jsx(n,{...a("root"),ref:g,__vars:{"--label-fz":W(s),"--label-lh":R(s,"label-lh")},mod:[{"label-position":j},S],variant:v,size:s,...F,children:e.jsxs(n,{component:c,htmlFor:c==="label"?p:void 0,...a("body"),children:[h,e.jsxs("div",{...a("labelWrapper"),"data-disabled":b||void 0,children:[i&&e.jsx(n,{component:m,htmlFor:m==="label"?p:void 0,...a("label"),"data-disabled":b||void 0,children:i}),d&&e.jsx(u.Description,{size:s,__inheritStyles:!1,...a("description"),children:d}),o&&typeof o!="boolean"&&e.jsx(u.Error,{size:s,__inheritStyles:!1,...a("error"),children:o})]})]})})});D.displayName="@mantine/core/InlineInput";function q({children:t,role:l}){const r=w();return r?e.jsx("div",{role:l,"aria-labelledby":r.labelId,"aria-describedby":r.describedBy,children:t}):e.jsx(e.Fragment,{children:t})}export{q as I,D as a,k as b};