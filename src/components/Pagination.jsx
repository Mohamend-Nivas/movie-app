export default function Pagination({page, totalPages, onChange}){
  const pages = [];
  // generate small window e.g. current-2..current+2
  const start = Math.max(1, page-2);
  const end = Math.min(totalPages, page+2);
  for(let p=start;p<=end;p++) pages.push(p);

  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <button disabled={page<=1} onClick={()=>onChange(page-1)} className="px-3 py-1 border rounded">Prev</button>
      {start>1 && <button onClick={()=>onChange(1)}>1</button>}
      {start>2 && <span>...</span>}
      {pages.map(p=>(
        <button key={p} onClick={()=>onChange(p)} className={`px-3 py-1 border rounded ${p===page ? "bg-blue-600 text-white":""}`}>{p}</button>
      ))}
      {end<totalPages-1 && <span>...</span>}
      {end<totalPages && <button onClick={()=>onChange(totalPages)}>{totalPages}</button>}
      <button disabled={page>=totalPages} onClick={()=>onChange(page+1)} className="px-3 py-1 border rounded">Next</button>
    </div>
  );
}
