export interface Product{
    id: string,
    name: string,
    price: string,
    images:Image[]
    category: string,
    company: Company
}

interface Image{
    path: string,
    id: string
}

interface Company{
    id: string,
    name: string,
    cnpj: string,
    password: string,
    email: string,
    telephone: string,
    passwordResetToken: any,
    passwordResetExpire: any
}