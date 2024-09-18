
interface IToken {
    tokenEncode: (payload: {email: string; firstName:string; id: string; }) => { accessToken: string; refreshToken: string};
    tokenDecode: (token: string, tokenType: string, req?: Request<any> ) => boolean;
}


  export {
    IToken
  }