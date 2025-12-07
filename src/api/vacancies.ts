import type { ApiResponseVacancy, Vacancy } from '@/types/vacancy';

// interface Vacancies {
//   vacancies: Vacancy[];
// }

export const getVacancyName = async (id: string): Promise<string> => {
  const config = useRuntimeConfig();
  const authToken = useCookie('auth_token').value;
  const authUser = useCookie('auth_user').value;

  const response = await fetch(`${config.public.apiBase}/vacancies/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
      'X-Auth-User': `${authUser}`,
    },
  });

  const dataVacancy = await response.json();
  return dataVacancy?.data?.name || 'Неизвестная вакансия';
};
