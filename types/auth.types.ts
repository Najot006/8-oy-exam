

export interface ISignUpPayload {
    id?: string,
    full_name: FormDataEntryValue | null,
    username: FormDataEntryValue | null,
    password: FormDataEntryValue | null,
}

export interface IAuthPromise {
    message: string,
    admins: ISignUpPayload,
    tokens: {access_token: string, refresh_token: string}
}

export interface ISignInPayload {
    id?: string,
    username: FormDataEntryValue | null,
    password: FormDataEntryValue | null,
}
