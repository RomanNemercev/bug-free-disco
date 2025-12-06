// import type { Resume } from './platform';

export interface SkillCandidate {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface TagCandidate {
  id: number;
  name: string;
}

export interface CustomFieldCandidate {
  id: number;
  value: string;
  type_id: number;
  require: boolean;
  pivot?: {
    value?: string;
    name?: string;
  };
}

export interface AttachmentCandidate {
  id: number;
  link: string;
}

// Основной интерфейс кандидата (как возвращается из API)
export interface Candidate {
  id: number;
  firstname?: string;
  surname: string;
  patronymic?: string | null;
  email: string;
  age?: number | null;
  phone?: string | null;
  location?: string;
  quickInfo?: string;
  education?: string;
  link?: string | null;
  experience?: string | null;
  telegram?: string | null;
  messengerMax?: string | null;
  skype?: string | null;
  icon?: string | null;
  imagePath?: string | null;
  isPng?: boolean | null;
  resume?: string | null;
  resumePath?: string | null;
  coverPath?: string | null;
  source?: string | null;
  isReserve?: boolean | null;
  customer: number | null;
  vacancy: number | null;
  stage: number | null;
  attachments?: AttachmentCandidate[] | null;
  skills?: SkillCandidate[] | null;
  tags?: TagCandidate[] | null;
  customFields?: CustomFieldCandidate[] | null;
  created_at: string;
  updated_at: string;
}

// Успешный ответ запроса списка кандидатов
export interface ApiCandidatesResponse {
  message: 'Success';
  data: {
    data: Candidate[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number | null;
    to: number | null;
    path: string;
    first_page_url: string;
    last_page_url: string;
    prev_page_url: string | null;
    next_page_url: string | null;
  };
}

// Успешный ответ запроса по id кандидата
export interface ApiCandidateByIdResponse {
  message: string;
  data: Candidate & {
    attachments?: AttachmentCandidate[];
    skills?: SkillCandidate[];
    tags?: TagCandidate[];
    customFields?: CustomFieldCandidate[];
  };
}

// Успешный ответ создания кандидата
export interface CandidateCreateResponse {
  message: string;
  data: Candidate & {
    customer: number;
    skills?: SkillCandidate[];
    tags?: TagCandidate[];
    customFields?: CustomFieldCandidate[];
    attachments?: AttachmentCandidate[];
  };
}

// Успешный ответ обновления данных кандидата
export interface CandidateUpdateResponse {
  message: 'Success';
  data: Candidate & {
    attachments: AttachmentCandidate[];
    skills: SkillCandidate[];
    tags: TagCandidate[];
    customFields: CustomFieldCandidate[];
  };
}

// Успешный ответ
export interface CandidateDeleteResponse {
  message: string;
}

// Для создания кандидата
export interface CandidateCreateRequest {
  firstname: string;
  surname: string;
  patronymic: string;
  email: string;
  vacancy: string;
  age?: number | null;
  phone?: string; // формат: +7XXXXXXXXXX
  stage_id?: number | null;
  location?: string;
  quickInfo?: string;
  education?: string;
  link?: string | null;
  experience?: string;
  telegram?: string | null;
  skype?: string | null;
  icon?: string | null;
  imagePath?: string | null;
  isPng?: boolean | null;
  resume?: string | null;
  resumePath?: string | null;
  coverPath?: string | null;
  customFields?: number | null;
  skills?: number[];
  tags?: number[];
  attachments?: string[];
}

// Для запроса на обновление данных кандидата
export interface CandidateUpdateRequest extends Partial<Candidate> {}

// Общий тип успешного ответа
export type ApiSuccessResponse<T> = {
  message: string;
  data: T;
};

// Общий тип ошибки
export type ApiErrorResponse = {
  message: string;
  data?: null;
};

// // Ошибка 404
// export interface CandidateNotFoundResponse {
//   message: string;  // "Кандидата с id = {id} не существует"
//   data: null;
// }

// // Ошибка валидации 422
// export interface ValidationErrorResponse {
//   message: 'Ошибка валидации';
// }

// // Ошибка дубликата 409
// export interface DuplicateErrorResponse {
//   message: string;  // "Кандидат с номером телефона {phone} уже существует"
//   // или "Кандидат с email {email} уже существует"
// }

// // Ошибка создания 500
// export interface CreateErrorResponse {
//   message: string;  // "Ошибка создания кандидата {surname} {firstname} {patronymic}"
// }

// Использование
// type CandidateResponse = ApiSuccessResponse<Candidate>;
// type CandidatesListResponse = ApiSuccessResponse<LaravelPaginatedResponse<Candidate>>;

export interface ApiResponseCandidates {
  data: {
    data: Candidate[];
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
    firstName?: string;
  };
}

export interface Pagination {
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
}

// Успешный ответ запроса по id кандидата
export interface ApiResponseById {
  candidateData: Candidate;
  candidateExtra: {
    attachments?: AttachmentCandidate[];
    skills?: SkillCandidate[];
    tags?: TagCandidate[];
    customFields?: CustomFieldCandidate[];
  };
}
