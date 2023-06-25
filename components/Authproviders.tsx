"use client"
import { useState, useEffect } from "react"
import { getProviders, signIn } from 'next-auth/react'
import { preProcessFile } from "typescript";
type Provider = {
  id: string;
  name: string;
  type: string;
  signInUrl: string;
  callbackUrl: string;
  signinUrlparams: Record<string, string> | null;
}

type Providers = Record<string, Provider>;

function Authproviders() {
  const [providers, setProviders] = useState<Providers | null>(null)
  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      //console.log("prov",res);
      setProviders(res);
    }
    fetchProviders();
  }, [])
  
  if (providers) {
    return (
      
    <div>
      {
        Object.values(providers).map((provider,i) => (
          <button onClick={()=>signIn(provider.id)} key={i}>{provider.id}</button>
        ))
      }
    </div>
    )
  } else {
    return (
      <button>no providers</button>
    )
  }
  
}

export default Authproviders