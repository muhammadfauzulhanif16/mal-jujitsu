import{W as b,j as a}from"./app-opL4tPRS.js";import{A as f,G as x,T as k,a as j,B as _,b as i,g as w,I as c}from"./AppLayout-BBXMtu6L.js";import{B as y}from"./Breadcrumbs-HzMZe2ql.js";import{F as v}from"./id-DRmwXiKX.js";import{I as m}from"./IconCornerDownLeft-BR-q8Um-.js";import{G as o}from"./Grid-DsX-EBOt.js";import{S as L}from"./SimpleGrid-Bxcmn5UV.js";import{I as g}from"./Indicator-Bhqku34T.js";import{T as u}from"./TextInput-CacUwhst.js";import{I as T}from"./IconBuilding-DkNoEmTK.js";import{M as I}from"./MultiSelect-BdrqKfP1.js";import{S as R}from"./Select-DWbBu4ol.js";import{D as C}from"./DatePickerInput-CeJ6FveZ.js";import{I as E}from"./clsx-4-RmyeO0.js";import{T as p,I as S,a as A}from"./TimeInput-BpjGBAac.js";import"./Title-CVf4nZny.js";import"./dayjs.min-TP8tiIEA.js";import"./get-base-value-BoJ4u0RI.js";import"./get-auto-contrast-value-Da6zqqWm.js";import"./InputBase-CoADICdG.js";import"./OptionsDropdown-Qere5_8B.js";import"./CheckIcon-rj9mbUFy.js";import"./ScrollArea-BUvcNB0c.js";import"./use-dates-input-98d-ymRe.js";const re=r=>{var l,s,d,n,h;const e=b({name:"",place:"",athlete_ids:[],coach_id:"",date:new Date,start_time:"",end_time:""});return console.log(r),a.jsx("form",{onSubmit:t=>{t.preventDefault(),e.post(route("exercises.store"))},children:a.jsxs(f,{title:"Latihan",authed:r.auth.user,meta:r.meta,unreadHistories:r.total_unread_histories,children:[a.jsxs(x,{mb:32,w:"100%",justify:"space-between",children:[a.jsx(y,{navList:[{label:"Latihan",route:"exercises.index"},{label:"Tambah"}]}),a.jsx(k,{style:{borderRadius:32,padding:".5rem 1rem"},label:"Tambah Latihan",children:a.jsx(j,{type:"submit",ml:"auto",h:48,w:48,color:"gold.2",radius:32,display:{base:"block",xs:"none"},disabled:e.hasErrors||Object.values(e.data).some(t=>!t),children:a.jsx(m,{})})}),a.jsx(_,{display:{base:"none",xs:"block"},type:"submit",w:240,leftSection:a.jsx(m,{}),variant:"filled",color:"gold.2",h:48,px:16,styles:{section:{marginRight:12}},radius:32,loading:e.processing,disabled:e.hasErrors||Object.values(e.data).some(t=>!t),children:"Tambah Latihan"})]}),a.jsxs(o,{grow:!0,justify:"space-between",children:[a.jsx(o.Col,{span:{base:12,md:4},children:a.jsxs(L,{spacing:32,cols:{base:1,xs:2,md:1},children:[a.jsx(g,{styles:{indicator:{padding:16,border:"4px solid white"}},inline:!0,color:"gold.2",label:e.data.athlete_ids.length>1?`${e.data.athlete_ids.length} Atlet`:"Atlet",position:"bottom-center",size:32,withBorder:!0,children:a.jsxs(i.Group,{spacing:40,style:{display:"flex",justifyContent:"center"},children:[a.jsx(i,{src:(l=r.athletes.find(t=>t.id===e.data.athlete_ids[0]))==null?void 0:l.avatar,alt:(s=r.athletes.find(t=>t.id===e.data.athlete_ids[0]))==null?void 0:s.full_name,size:160}),e.data.athlete_ids.length>1&&a.jsxs(i,{size:160,children:["+",e.data.athlete_ids.length-1]})]})}),a.jsx(g,{inline:!0,color:"gold.2",styles:{indicator:{padding:16,border:"4px solid white"}},label:e.data.coach_id?(d=r.coaches.find(t=>t.id===e.data.coach_id))==null?void 0:d.role:"Pelatih",position:"bottom-center",size:32,withBorder:!0,children:a.jsx(i,{mx:"auto",src:(n=r.coaches.find(t=>t.id===e.data.coach_id))==null?void 0:n.avatar,alt:(h=r.coaches.find(t=>t.id===e.data.coach_id))==null?void 0:h.full_name,size:160})})]})}),a.jsx(o.Col,{span:{base:12,md:8},children:a.jsxs(v,{mb:16,radius:20,legend:"Informasi Latihan",styles:{root:{margin:0,padding:16,border:"1px solid #dcdcdc"},legend:{borderRadius:20,fontSize:16,padding:16,fontWeight:"bold"}},children:[a.jsx(u,{withAsterisk:!0,variant:"filled",leftSection:a.jsx(w,{}),styles:{label:{marginBottom:8},input:{height:48,borderRadius:32,paddingLeft:50,paddingRight:16},section:{marginLeft:0,width:48,height:48},error:{marginTop:8}},mb:16,label:"Nama",placeholder:"Masukkan nama...",onChange:t=>{e.setData("name",t.target.value),t.target.value?e.clearErrors("name"):e.setError({name:"Nama tidak boleh kosong."})},error:e.errors.name}),a.jsx(u,{withAsterisk:!0,variant:"filled",leftSection:a.jsx(T,{}),styles:{label:{marginBottom:8},input:{height:48,borderRadius:32,paddingLeft:50,paddingRight:16},section:{marginLeft:0,width:48,height:48},error:{marginTop:8}},mb:16,label:"Tempat",placeholder:"Masukkan tempat...",onChange:t=>{e.setData("place",t.target.value),t.target.value?e.clearErrors("place"):e.setError({place:"Tempat tidak boleh kosong."})},error:e.errors.place}),a.jsx(I,{mb:16,hidePickedOptions:!0,withAsterisk:!0,variant:"filled",styles:{label:{marginBottom:8},input:{minHeight:48,borderRadius:32,paddingLeft:50,paddingRight:16,display:"flex"},section:{marginLeft:0,width:48,minHeight:48},error:{marginTop:8}},leftSection:a.jsx(c,{}),label:"Atlet",clearable:!0,searchable:!0,nothingFoundMessage:"Tidak ada atlet ditemukan",placeholder:"Pilih 1 atlet atau lebih...",checkIconPosition:"right",onChange:t=>{e.setData("athlete_ids",t),t.length===0?e.setError({athlete_ids:"Atlet tidak boleh kosong."}):e.clearErrors("athlete_ids")},data:r.athletes.map(t=>({value:t.id,label:`${t.full_name} (${t.role})`})),error:e.errors.athlete_ids}),a.jsx(R,{mb:16,withAsterisk:!0,variant:"filled",styles:{label:{marginBottom:8},input:{height:48,borderRadius:32,paddingLeft:50,paddingRight:16},section:{marginLeft:0,width:48,height:48},error:{marginTop:8}},leftSection:a.jsx(c,{}),label:"Pelatih",clearable:!0,searchable:!0,nothingFoundMessage:"Tidak ada pelatih ditemukan",placeholder:"Pilih pelatih...",checkIconPosition:"right",onChange:t=>{e.setData("coach_id",t),t?e.clearErrors("coach_id"):e.setError({coach_id:"Pelatih tidak boleh kosong."})},data:r.coaches.map(t=>({value:t.id,label:`${t.full_name} (${t.role})`})),error:e.errors.coach_id}),a.jsx(C,{mb:16,withAsterisk:!0,clearable:!0,allowDeselect:!0,firstDayOfWeek:0,variant:"filled",leftSection:a.jsx(E,{}),label:"Tanggal",locale:"id",valueFormat:"D-M-YYYY",placeholder:"Masukkan tanggal...",styles:{label:{marginBottom:8},input:{height:48,borderRadius:32,paddingLeft:50,paddingRight:16},section:{marginLeft:0,width:48,height:48},error:{marginTop:8},calendarHeader:{height:48},calendarHeaderControl:{height:48,width:48,borderRadius:32}},onChange:t=>{e.setData("date",t.toLocaleString()),t?e.clearErrors("date"):e.setError({date:"Tanggal tidak boleh kosong."})},error:e.errors.date}),a.jsx(p,{mb:16,color:"gold.2",placeholder:"HH:MM",locale:"id",withAsterisk:!0,variant:"filled",leftSection:a.jsx(S,{}),label:"Waktu Mulai",styles:{label:{marginBottom:8},input:{height:48,borderRadius:32,paddingLeft:50,paddingRight:16},section:{marginLeft:0,width:48,height:48},error:{marginTop:8},calendarHeader:{height:48},calendarHeaderControl:{height:48,width:48,borderRadius:32}},onChange:t=>{e.setData("start_time",t.target.value),t.target.value?e.clearErrors("start_time"):e.setError({start_time:"Waktu mulai tidak boleh kosong."})},error:e.errors.start_time}),a.jsx(p,{color:"gold.2",placeholder:"HH:MM",locale:"id",withAsterisk:!0,variant:"filled",leftSection:a.jsx(A,{}),label:"Waktu Selesai",styles:{label:{marginBottom:8},input:{height:48,borderRadius:32,paddingLeft:50,paddingRight:16},section:{marginLeft:0,width:48,height:48},error:{marginTop:8},calendarHeader:{height:48},calendarHeaderControl:{height:48,width:48,borderRadius:32}},onChange:t=>{e.setData("end_time",t.target.value),t.target.value?e.clearErrors("end_time"):e.setError({end_time:"Waktu selesai tidak boleh kosong."})},error:e.errors.end_time})]})})]})]})})};export{re as default};
