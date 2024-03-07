import { $api } from "@/api/interceptors";
import { IUser } from "@/types/user.types";


export const createUser = async (data: IUser) => {
    try {
        const respons = await $api.post("/users", data)
        return respons
    } catch (error) {
        console.log(error);
    }
}


export const getUser = async () => {
    try {
        const respons = await $api.get("users?q=&page%5Boffset%5D=0&page%5Blimit%5D=&sort%5Bby%5D=id&sort%5Border%5D=desc&filters%5Brole%5D=employee")
        console.log(respons?.data);
        return respons?.data
        
    } catch (err) {
        console.log(err);
    }
}


export const deleteUser = async (id: string | undefined) => {
    try {
        const respons = await $api.delete(`/users/${id}`)
        return respons

    } catch (error) {
        console.log(error);

    }
}


export const UpdateUser = async (data: IUser) => {
    try {
        const respons = await $api.patch(`/users/${data?._id}`, data)
        return respons
    } catch (error) {
        console.log(error);
    }
}