import{r as S,j as e,O as l}from"./app-opL4tPRS.js";import{b as r,G as n,S as h,k as p,F as x,T as u,a as m,A as k,B as C,g as v}from"./AppLayout-BBXMtu6L.js";import{B as I}from"./Breadcrumbs-HzMZe2ql.js";import{I as R,T as t,a as j,b as z}from"./Table-ERm7-3kp.js";import{I as A,a as P}from"./IconTrash-D6A5CulR.js";import{H as o}from"./HoverCard-DVTUvzkF.js";import{T as g}from"./TextInput-CacUwhst.js";import{I as b}from"./IconSearch-DGL0fFTj.js";import"./Title-CVf4nZny.js";import"./ScrollArea-BUvcNB0c.js";import"./InputBase-CoADICdG.js";const $=i=>{console.log(i);const[w,c]=S.useState(""),y=["#","Nama","Tempat","Atlet","Pelatih","Tanggal","Waktu Mulai","Waktu Selesai","Aksi"],T=[{label:"Rincian Latihan",icon:e.jsx(R,{}),onClick:a=>l.get(route("exercises.show",a.id)),color:"blue"},{label:"Ubah Latihan",icon:e.jsx(A,{}),onClick:a=>l.get(route("exercises.edit",a.id)),color:"yellow",disabled:!i.auth.user.role.includes("Pelatih")},{label:"Hapus Latihan",icon:e.jsx(P,{}),onClick:a=>l.delete(route("exercises.destroy",a.id)),color:"red",disabled:!i.auth.user.role.includes("Pelatih")}],f=i.exercises.filter(a=>a.name.toLowerCase().includes(w.toLowerCase())).map((a,d)=>e.jsxs(t.Tr,{h:64,children:[e.jsx(t.Td,{px:16,py:0,style:{whiteSpace:"nowrap"},children:d+1}),e.jsx(t.Td,{px:16,py:0,style:{whiteSpace:"nowrap"},children:a.name}),e.jsx(t.Td,{px:16,py:0,style:{whiteSpace:"nowrap"},children:a.place}),e.jsx(t.Td,{px:16,py:0,style:{whiteSpace:"nowrap"},children:e.jsx(r.Group,{spacing:24,h:48,children:a.athletes.map(s=>e.jsxs(o,{withArrow:!0,shadow:"xl",children:[e.jsx(o.Target,{children:e.jsx(r,{size:52,src:s.avatar,radius:32})}),e.jsx(o.Dropdown,{style:{borderRadius:32},p:16,children:e.jsxs(n,{children:[e.jsx(r,{size:80,src:s.avatar,radius:160}),e.jsxs(h,{gap:5,children:[e.jsx(p,{size:"sm",fw:600,children:s.full_name}),e.jsx(p,{size:"sm",c:"dimmed",children:s.role})]})]})})]},s.id))})}),e.jsx(t.Td,{px:16,py:0,style:{whiteSpace:"nowrap"},children:e.jsxs(x,{gap:16,align:"center",children:[e.jsx(r,{size:48,src:a.coach.avatar}),a.coach.full_name," (",a.coach.role,")"]})}),e.jsx(t.Td,{px:16,py:0,style:{whiteSpace:"nowrap"},children:new Date(a.date).toLocaleDateString("id").split("/").join("-")}),e.jsx(t.Td,{px:16,py:0,style:{whiteSpace:"nowrap"},children:a.start_time.split(":").join(".")}),e.jsx(t.Td,{px:16,py:0,style:{whiteSpace:"nowrap"},children:a.end_time.split(":").join(".")}),e.jsx(t.Td,{px:16,py:0,style:{whiteSpace:"nowrap"},children:e.jsx(x,{gap:8,style:{whiteSpace:"nowrap"},children:T.map((s,L)=>e.jsx(u,{label:s.label,style:{borderRadius:32,padding:".5rem 1rem"},children:e.jsx(m,{size:48,radius:32,variant:"subtle","aria-label":s.label,color:s.color,onClick:()=>s.onClick(a),disabled:s.disabled,children:s.icon})},L))})})]},d));return e.jsxs(k,{title:"Latihan",authed:i.auth.user,meta:i.meta,unreadHistories:i.total_unread_histories,children:[e.jsxs(h,{mb:32,children:[e.jsxs(n,{w:"100%",justify:"space-between",children:[e.jsx(I,{navList:[{label:"Latihan",totalData:i.exercises.length}]}),e.jsxs(n,{children:[e.jsx(g,{display:{base:"none",xs:"block"},w:240,variant:"filled",leftSection:e.jsx(b,{}),styles:{input:{height:48,borderRadius:32,paddingLeft:50,paddingRight:14},section:{marginLeft:0,width:48,height:48}},color:"gold.2",placeholder:"Cari latihan...",onChange:a=>c(a.target.value)}),i.auth.user.role.includes("Pelatih")&&e.jsxs(e.Fragment,{children:[e.jsx(u,{style:{borderRadius:32,padding:".5rem 1rem"},label:"Tambah Latihan",children:e.jsx(m,{ml:"auto",h:48,w:48,color:"gold.2",radius:32,display:{base:"block",sm:"none"},onClick:()=>l.get(route("exercises.create")),children:e.jsx(j,{})})}),e.jsx(C,{display:{base:"none",sm:"block"},w:240,leftSection:e.jsx(j,{}),variant:"filled",color:"gold.2",h:48,radius:32,px:16,styles:{section:{marginRight:12}},onClick:()=>l.get(route("exercises.create")),children:"Tambah Latihan"})]})]})]}),e.jsx(g,{w:"100%",display:{base:"block",xs:"none"},variant:"filled",leftSection:e.jsx(b,{}),styles:{input:{height:48,borderRadius:32,paddingLeft:50,paddingRight:14},section:{marginLeft:0,width:48,height:48}},color:"gold.2",placeholder:"Cari atlet...",onChange:a=>c(a.target.value)})]}),e.jsx(z,{thList:y,tdList:f,icon:e.jsx(v,{size:48}),title:"Latihan",route:"exercises.create",authed:i.auth.user})]})};export{$ as default};
