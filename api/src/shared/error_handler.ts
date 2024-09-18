
export class ApiError extends Error {
    data: null;
    success: boolean;
    statusCode: number;
    errors: Record<string, any>[]; 
    message: string;

    constructor(
        statusCode: number,
        message: string= "Something went wrong",
        errors: any[] = [],
        stack: string = ""
    ){
        super(message);
        this.data = null;
        this.success = false;
        this.statusCode=statusCode;
        this.message=message;
        this.errors=errors;

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}
