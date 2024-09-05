interface ErrorLoginResponse{
    msg: string;
}


export interface ErrorRegisterResponse {
    ok:     boolean;
    errors: Errors;
}

export interface Errors {
    email: Email;
}

export interface Email {
    value:    string;
    msg:      string;
    param:    string;
    location: string;
}


// Clase base de errores
class AppError extends Error {
    constructor(message: string, public statusCode: number) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  // Error de login
export class LoginError extends AppError {
    constructor(message: string, data?: ErrorLoginResponse) {

      if (data) {
        super(data.msg, 400);
      } else {
        super(message, 500);
      }  
      
    }
  }
  
  // Error de registro
export class RegisterError extends AppError {
    constructor(message: string, data?: ErrorRegisterResponse) {
      if (data) {
        super(data.errors.email.msg, 400)
      } else {
        super(message, 500);
      }
    }
  }
  
  
type PropFactory = ErrorLoginResponse & ErrorRegisterResponse


export class CustomError {

    constructor(message: string, _?: PropFactory){
        throw new AppError(message, 500)
    }

  }
  
 
  