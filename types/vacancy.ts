export interface Vacancy {
    name: string,
    code?: number,
    description: string,
    industry?: string,
    specializations?: string,
    employment?: string,
    schedule?: string
    experience?: string,
    education?: string,
    phrases?: string,
    conditions?: Number[], 
    drivers?: Number[], 
    additions?: Number[], 
    salary_from?: Number,
    salary_to?: Number,
    currency?: string,
    place?: Number,
    location?:string,
    customer_id?: number,
    customer_phone?: string,
    customer_email?: string,
}

type Data = {
    id: number;
    name: string;
}

export interface ResponseVacancy {
    name: string,
    code: string | null,
    description: string,
    industry: string,
    specializations: string | null,
    employment: string | null,
    schedule: string | null,
    experience: string | null,
    education: string | null,
    phrases: string | null,
    conditions: Data[] | [], 
    drivers: Data[] | [], 
    additions: Data[] | [], 
    salary_from: Number | null,
    salary_to: Number | null,
    currency: string | null,
    place: Number | null,
    location: string | null,
    customer_id: number | null,
    customer_phone: string |  null,
    customer_email: string | null,
    status: string
}

export interface ApiResponseVacancy {
    message: string;
    data: ResponseVacancy;
}