import client from '../services/api'

const algorithm ={
    getAlgorithmOutput: (body: Object)=>{
        return (client.post("/algorithm",body,{ 
            headers: {
            'Content-Type': 'application/json'
        }}
        ))
    }
}

export default algorithm;