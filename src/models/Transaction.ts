class Transaction {
    version: number
    from: string
    to: string
    type: string
    time: string
    amount: number
    publicKey: string
    gasPrice: number
    maxGas: number
    sequence: number
    observedTime: string
    
    constructor( data: any ) {
        this.version = data['version'] || 0
        this.from = data['source'] || ""
        this.to = data['destination'] || ""
        this.type = data['type'] || ""
        this.time = data['expiration_at'] || ""
        this.amount = data['amount'] || 0
        this.publicKey = data['public_key'] || ""
        this.sequence = data['sequence_number'] || 0
        this.gasPrice = data['gas_price'] || 0
        this.maxGas = data['max_gas'] || 0
        this.observedTime = data['created_at'] || 0
    }

    displayAmount(): string {
        return `${(this.amount / 1000000.0).toFixed(1)}`
    }
}

export default Transaction