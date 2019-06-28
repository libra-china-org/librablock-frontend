class Account {
    balance: number
    address: string
    authenticationKey: string
    receivedEventCount: number
    sentEventCount: number
    sequenceNumber: number

    constructor( data: any) {
        this.balance = data["Balance"] || 0
        this.address = data["address"] || ""
        this.authenticationKey = data["authentication_key"] || ""
        this.receivedEventCount = data["received_event_count"] || 0
        this.sentEventCount = data["sent_event_count"] || 0
        this.sequenceNumber = data["sequence_number"] || 0
    }
}

export default Account