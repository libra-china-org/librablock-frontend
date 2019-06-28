import axios from "axios"
import Transaction from "../models/Transaction"
import Account from "../models/Account"

const host = "http://127.0.0.1:8080"

class API {
    
    static async fetchVersions(limit = 20, offset = 0, address: null|string = null): Promise<Transaction[]> {
        let url = host + `/version?limit=${limit}&offset=${offset}`

        if (address != null) {
            url  += `&address=${address}`
        }

        let result = (await axios.get(url)).data as any[]
        
        return result.map((x) => {
            return new Transaction(x)
        }) 
    }

    static async fetchVersion(id: number): Promise<Transaction> {
        let url = host + `/version/${id}`

        let result = (await axios.get(url)).data
        return new Transaction(result)
    }

    static async fetchAddressDetail(id: string): Promise<Account> {
        let url = host + `/account/${id}`
        let result = (await axios.get(url)).data
        return new Account(result)
    }
}

export default API  