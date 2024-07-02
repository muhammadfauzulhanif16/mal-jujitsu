import{d as p,f as S}from"./AppLayout-BBXMtu6L.js";import{f as N,u as B,j as b}from"./app-opL4tPRS.js";import{c as j}from"./clsx-4-RmyeO0.js";import{I as d}from"./InputBase-CoADICdG.js";/**
 * @license @tabler/icons-react v3.4.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var L=p("outline","clock-pause","IconClockPause",[["path",{d:"M20.942 13.018a9 9 0 1 0 -7.909 7.922",key:"svg-0"}],["path",{d:"M12 7v5l2 2",key:"svg-1"}],["path",{d:"M17 17v5",key:"svg-2"}],["path",{d:"M21 17v5",key:"svg-3"}]]);/**
 * @license @tabler/icons-react v3.4.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var q=p("outline","clock-play","IconClockPlay",[["path",{d:"M12 7v5l2 2",key:"svg-0"}],["path",{d:"M17 22l5 -3l-5 -3z",key:"svg-1"}],["path",{d:"M13.017 20.943a9 9 0 1 1 7.831 -7.292",key:"svg-2"}]]),R={input:"m_468e7eda"};const _={},v=N((f,y)=>{const s=B("TimeInput",_,f),{classNames:h,styles:k,unstyled:g,vars:E,withSeconds:r,minTime:i,maxTime:c,value:I,onChange:T,...x}=s,{resolvedClassNames:l,resolvedStyles:M}=S({classNames:h,styles:k,props:s}),C=a=>{if(i!==void 0||c!==void 0){const[t,o,u]=a.split(":").map(Number);if(i){const[e,n,m]=i.split(":").map(Number);if(t<e||t===e&&o<n||r&&t===e&&o===n&&u<m)return-1}if(c){const[e,n,m]=c.split(":").map(Number);if(t>e||t===e&&o>n||r&&t===e&&o===n&&u>m)return 1}}return 0},P=a=>{var t,o,u;if((t=s.onBlur)==null||t.call(s,a),i!==void 0||c!==void 0){const e=a.currentTarget.value;if(e){const n=C(e);n===1?(a.currentTarget.value=c,(o=s.onChange)==null||o.call(s,a)):n===-1&&(a.currentTarget.value=i,(u=s.onChange)==null||u.call(s,a))}}};return b.jsx(d,{classNames:{...l,input:j(R.input,l==null?void 0:l.input)},styles:M,unstyled:g,ref:y,value:I,...x,step:r?1:60,onChange:T,onBlur:P,type:"time",__staticSelector:"TimeInput"})});v.classes=d.classes;v.displayName="@mantine/dates/TimeInput";export{q as I,v as T,L as a};
