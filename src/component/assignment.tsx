import React from "react";
import { useState ,useEffect} from "react";

type bitcoinResponse={
    bitcoin:{
        usd:number;
    };
};

const Random:React.FC=()=>{
    const [price,setPrice]=useState<number|null>(null);
    const [loading,setLoading]=useState<boolean>(false);
    const[error,setError]=useState<string|null>(null);

    const fetchPrice=async():Promise<void>=>{
        try{
          setLoading(true);
          setError(null);

          const response=await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
          const data:bitcoinResponse=await  response.json();
          setPrice(data.bitcoin.usd);
          setLoading(false);
        }catch(err){
        setError("Failed to fatch data");
        setLoading(false);
        }
    };
    useEffect(()=>{
     fetchPrice()
    },[])
return(
<>
<div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Bitcoin Price
        </h1>
        {loading &&(<p className="text-blue-500">Loading....</p>)}
        {error &&(<p className="text-red-500">{error}</p>)}
        {price !==null && !loading &&(<h2 className="text-lg text-gray-700 mb-4">Bitcoin Price: <span className="font-bold">${price}</span></h2>)}
        <button onClick={fetchPrice} className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Get Latest Price</button>
    </div>

</div>
</>
);
}
export default Random