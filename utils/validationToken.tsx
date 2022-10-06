import ApiRequest from "../services/api"

export const validationUser = async (token: string) =>{
 const request = new ApiRequest(token)

 try{
 return await request.get("/use/validation")
 }catch(err){
   return {statusCode: err.status}
 }
}
