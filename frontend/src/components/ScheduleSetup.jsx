import { useMemo, useState, useEffect } from 'react'
import api from '../api/axios.js'

export default function ScheduleSetup({ extracted }){
  const [phone,setPhone]=useState('91XXXXXXXXXX')
  const items=useMemo(()=>{
    const pres=extracted?.prescription||[]
    const mapped = pres.map(p=>({ medicine:p.medicine||'Medicine', durationDays:'', times:[''] }))
    return mapped
  },[extracted])
  const [rows,setRows]=useState([])
  const [msg,setMsg]=useState('')
  useEffect(()=>{ setRows(items) },[items])

  const updateTime=(ri,ti,value)=>{
    const copy=rows.map(r=>({ ...r, times:[...r.times] }))
    copy[ri].times[ti]=value
    setRows(copy)
  }
  const addTimeField=(ri)=>{
    const copy=rows.map(r=>({ ...r, times:[...r.times] }))
    copy[ri].times.push('')
    setRows(copy)
  }
  const removeTimeField=(ri)=>{
    const copy=rows.map(r=>({ ...r, times:[...r.times] }))
    if(copy[ri].times.length>1){
      copy[ri].times.pop()
      setRows(copy)
    }
  }

  const submit=async()=>{
    setMsg('')
    try{
      for(const r of rows){
        const d=parseInt(r.durationDays,10)
        if(!d || d<=0) throw new Error(`Set duration for ${r.medicine}`)
        if(!r.times.some(Boolean)) throw new Error(`Add at least one time for ${r.medicine}`)
      }
      const items=rows.map(r=>({
        medicine:r.medicine,
        durationDays: parseInt(r.durationDays,10),
        times: r.times.filter(Boolean)
      }))
      const body={ phone, items }
      const res=await api.post('/schedules/from-prescription', body)
      const data=res.data
      if(data.success){ setMsg(`Created ${data.count} schedules`) }
      else{ setMsg(data.error||'Failed') }
    }catch(err){ setMsg('Error: '+err.message) }
  }

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-sm space-y-4">
      <h2 className="text-xl font-semibold text-blue-300">Schedule Setup</h2>
      <div>
        <input className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-200 placeholder-slate-500" placeholder="phone e.g. 9195XXXXXX" value={phone} onChange={e=>setPhone(e.target.value)} />
      </div>
      {(!rows || rows.length===0) && (
        <p className="text-sm text-slate-400">Scan a prescription to populate medicines</p>
      )}
      {rows && rows.map((r,ri)=>(
        <div key={ri} className="bg-slate-950 border border-slate-800 rounded p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div><b>{r.medicine}</b></div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Duration (days)</span>
              <input className="bg-slate-900 border border-slate-800 rounded px-2 py-1 w-20 text-slate-200 placeholder-slate-500" placeholder="e.g. 5" value={r.durationDays}
                onChange={e=>{
                  const copy=rows.map(x=>({...x}))
                  copy[ri].durationDays=e.target.value
                  setRows(copy)
                }} />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mt-1">
            {r.times.map((t,ti)=>(
              <input key={ti} className="bg-slate-900 border border-slate-800 rounded px-3 py-2 w-28 text-slate-200 placeholder-slate-500" placeholder="HH:mm" value={t} onChange={e=>updateTime(ri,ti,e.target.value)} />
            ))}
            <button type="button" className="px-2 py-1 border border-slate-700 rounded" onClick={()=>addTimeField(ri)}>+ time</button>
            <button type="button" className="px-2 py-1 border border-slate-700 rounded" onClick={()=>removeTimeField(ri)}>- time</button>
          </div>
        </div>
      ))}
      <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2" onClick={submit}>Create schedules</button>
      {msg && <p className="text-sm text-blue-300">{msg}</p>}
    </div>
  )
}


