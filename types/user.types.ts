import { ReactNode } from "react";


export interface IUser {
    first_name: string ,
    last_name:  string,
    username:  string,
    password:  string,
    age:  number | string,
    description:  string,
    avatar: string ,
    _id?: string ,
    role:  string | string ,
    image?: string 
}


export interface IGenre {
    // id?: I_ID,
    id?: number | undefined,
    name: string,
    createdAt?: string,
    updatedAt?: string,
}


export interface IAuthor {
    id?: number | undefined,
    full_name: string,
    birthdate?: string,
    country?: string,
    image?: string,
}


export interface PageType {
    id: number,
    component: string,
    title: string,
}






