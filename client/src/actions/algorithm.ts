import client from '../services/api'



export interface supplierInterface{
    "sellPrice": number,
    "availableQuantity": number
}


export interface recipientInterface{
    "buyPrice":number,
    "desiredQuantity": number
}

export interface algorithmRequestInterface{
    "supplierTable": supplierInterface[],
    "recipientTable": recipientInterface[],
    "transportaionCostsTable": number[][]

}


const algorithm ={
    getAlgorithmOutput: (body: algorithmRequestInterface)=>{
        return (client.post("/algorithm",body,{ 
            withCredentials: false,
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }}
        ))
    }
}

export default algorithm;