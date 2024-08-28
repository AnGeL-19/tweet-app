
interface ErrorResponse {
    msg: string;
}

export class CustomError extends Error {

    constructor(public message:string, private data?: ErrorResponse | null) {
        super(message);
    }

    public getDataValidation(): ErrorResponse | null {
        return this.data || null;
    }
    
 


}