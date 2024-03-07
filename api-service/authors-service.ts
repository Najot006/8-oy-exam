import { $api } from "@/api/interceptors";
import { IAuthor } from "@/types/user.types";

// get author
export const getAuthor = async () => {
    try {
        const respons = await $api.get("/author")
        return respons?.data
    }catch(error){
        console.log(error);
    }
}

// post author
export const postAuthor = async (data:IAuthor) => {
    try {
        const respons = await $api.post("/author", data)
    }catch(error){
        console.log(error);
    }
}

// delete author
export const deleteAuthor = async (id:number | undefined) => {
    try {
        const respons = await $api.delete(`/author/${id}`)
    }catch(error){
        console.log(error);
    }
}


// update author
export const updateAuthor = async (payload:IAuthor) => {
    try {
        const response = await $api.patch(`/author/${payload.id}`, payload)
    }catch(error){
        console.log(error);
        
    }
}
