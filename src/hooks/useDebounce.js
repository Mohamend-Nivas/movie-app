import { useState, useEffect } from "react";
export default function useDebounce(value, delay=300){
  const [deb, setDeb] = useState(value);
  useEffect(()=>{
    const t = setTimeout(()=> setDeb(value), delay);
    return ()=> clearTimeout(t);
  }, [value, delay]);
  return deb;
}
