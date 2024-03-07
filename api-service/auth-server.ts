import { $api } from "@/api/interceptors";
import { saveCookies } from "@/helpers/auth.helper";

export const postAuth = async (data: any) => {
    try{
        
        const response = await $api.post("/users/login", data)
        saveCookies(response?.data?.data?.token)
        return response?.data
    }catch(err){
        console.log(err);
    }
}


