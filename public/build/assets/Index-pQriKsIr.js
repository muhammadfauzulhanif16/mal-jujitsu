import{r as y,j as e,O as l}from"./app-opL4tPRS.js";import{F as o,b as T,T as d,a as c,A as f,S,G as h,B as L,h as k}from"./AppLayout-BBXMtu6L.js";import{B as C}from"./Breadcrumbs-HzMZe2ql.js";import{I,T as s,a as u,b as P}from"./Table-ERm7-3kp.js";import{I as v,a as A}from"./IconTrash-D6A5CulR.js";import{T as p}from"./TextInput-CacUwhst.js";import{I as x}from"./IconSearch-DGL0fFTj.js";import"./Title-CVf4nZny.js";import"./ScrollArea-BUvcNB0c.js";import"./InputBase-CoADICdG.js";const N=t=>{const[m,n]=y.useState(""),g=["#","Nama","Tempat","Atlet","Medali","Tanggal","Aksi"],b=[{label:"Rincian Atlet",icon:e.jsx(I,{}),onClick:a=>l.get(route("tournaments.show",a.id)),color:"blue"},{label:"Ubah Atlet",icon:e.jsx(v,{}),onClick:a=>l.get(route("tournaments.edit",a.id)),color:"yellow",disabled:!t.auth.user.role.includes("Pelatih")},{label:"Hapus Atlet",icon:e.jsx(A,{}),onClick:a=>l.delete(route("tournaments.destroy",a.id)),color:"red",disabled:!t.auth.user.role.includes("Pelatih")}],j=t.tournaments.filter(a=>a.name.toLowerCase().includes(m.toLowerCase())).map((a,r)=>e.jsxs(s.Tr,{h:64,children:[e.jsx(s.Td,{px:16,py:0,style:{whiteSpace:"nowrap"},children:r+1}),e.jsx(s.Td,{px:16,py:0,style:{whiteSpace:"nowrap"},children:a.name}),e.jsx(s.Td,{px:16,py:0,style:{whiteSpace:"nowrap"},children:a.place}),e.jsx(s.Td,{px:16,py:0,style:{whiteSpace:"nowrap"},children:e.jsxs(o,{gap:16,align:"center",children:[e.jsx(T,{size:48,src:a.athlete.avatar}),a.athlete.full_name]})}),e.jsx(s.Td,{px:16,py:0,style:{whiteSpace:"nowrap"},children:a.medal}),e.jsx(s.Td,{px:16,py:0,style:{whiteSpace:"nowrap"},children:new Date(a.date).toLocaleDateString("id").split("/").join("-")}),e.jsx(s.Td,{px:16,py:0,style:{whiteSpace:"nowrap"},children:e.jsx(o,{gap:8,style:{whiteSpace:"nowrap"},children:b.map((i,w)=>e.jsx(d,{label:i.label,style:{borderRadius:32,padding:".5rem 1rem"},children:e.jsx(c,{size:48,radius:32,variant:"subtle","aria-label":i.label,color:i.color,onClick:()=>i.onClick(a),disabled:i.disabled,children:i.icon})},w))})})]},r));return e.jsxs(f,{title:"Pertandingan",authed:t.auth.user,meta:t.meta,unreadHistories:t.unread_histories.length,children:[e.jsxs(S,{mb:32,children:[e.jsxs(h,{w:"100%",justify:"space-between",children:[e.jsx(C,{navList:[{label:"Pertandingan",totalData:t.tournaments.length}]}),e.jsxs(h,{children:[e.jsx(p,{display:{base:"none",xs:"block"},w:240,variant:"filled",leftSection:e.jsx(x,{}),styles:{input:{height:48,borderRadius:32,paddingLeft:50,paddingRight:14},section:{marginLeft:0,width:48,height:48}},color:"gold.2",placeholder:"Cari pertandingan...",onChange:a=>n(a.target.value)}),t.auth.user.role.includes("Pelatih")&&e.jsxs(e.Fragment,{children:[e.jsx(d,{style:{borderRadius:32,padding:".5rem 1rem"},label:"Tambah Pertandingan",children:e.jsx(c,{ml:"auto",h:48,w:48,color:"gold.2",radius:32,display:{base:"block",sm:"none"},onClick:()=>l.get(route("tournaments.create")),children:e.jsx(u,{})})}),e.jsx(L,{display:{base:"none",sm:"block"},w:240,leftSection:e.jsx(u,{}),variant:"filled",color:"gold.2",h:48,radius:32,px:16,styles:{section:{marginRight:12}},onClick:()=>l.get(route("tournaments.create")),children:"Tambah Pertandingan"})]})]})]}),e.jsx(p,{w:"100%",display:{base:"block",xs:"none"},variant:"filled",leftSection:e.jsx(x,{}),styles:{input:{height:48,borderRadius:32,paddingLeft:50,paddingRight:14},section:{marginLeft:0,width:48,height:48}},color:"gold.2",placeholder:"Cari atlet...",onChange:a=>n(a.target.value)})]}),e.jsx(P,{thList:g,tdList:j,icon:e.jsx(k,{size:48}),title:"Pertandingan",route:"tournaments.create",authed:t.auth.user})]})};export{N as default};
