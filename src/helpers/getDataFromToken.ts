import {NextRequest} from 'next/server'
import jwt  from 'jsonwebtoken'

interface DecodedToken {
    id: string;
    
}

export const getDataFromToken = (request:NextRequest) =>{
    try {
       const token =  request.cookies.get("token")?.value ||"" ;
       const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;

       return decodedToken.id;

    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('An unknown error occurred');
    }
}
