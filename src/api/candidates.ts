import type {
  ApiResponseCandidates,
  ApiCandidatesResponse,
  Candidate,
  CandidateCreateRequest,
  CandidateCreateResponse,
  ApiCandidateByIdResponse,
  ApiResponseById,
  AttachmentCandidate,
  SkillCandidate,
  TagCandidate,
  CustomFieldCandidate,
} from '~/types/candidates';

export async function getCandidates(page = 1) {
  const config = useRuntimeConfig();
  const authToken = useCookie('auth_token').value;
  const authUser = useCookie('auth_user').value;

  try {
    const response: ApiCandidatesResponse = await $fetch<ApiCandidatesResponse>(
      `${config.public.apiBase}/candidates`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${authToken}`,
          'X-Auth-User': `${authUser}`,
        },
        query: { page },
      }
    );

    return {
      candidates: response?.data?.data || [],
      pagination: {
        total: response.data.total,
        currentPage: response.data.current_page,
        lastPage: response.data.last_page,
        perPage: response.data.per_page,
      },
    };
  } catch (error: any) {
    if (error.response.status === 401) {
      alert('Ваша сессия истекла! Пожалуйста, авторизуйтесь снова.');
      useRouter().replace('/auth');
    } else {
      console.error('Ошибка при получении кандидатов:', error);
    }
    return {
      candidates: [],
      pagination: { total: 0, currentPage: 1, lastPage: 1, perPage: 15 },
    };
  }
}

export async function getCandidateById(id: number): Promise<ApiResponseById> {
  const config = useRuntimeConfig();
  const authToken = useCookie('auth_token').value;
  const authUser = useCookie('auth_user').value;

  console.log('Запрашиваю кандидата с id:', id);
  console.log('auth_token:', authToken);
  console.log('auth_user:', authUser);
  console.log('URL запроса:', `${config.public.apiBase}/candidates/${id}`);

  try {
    const response: ApiCandidateByIdResponse =
      await $fetch<ApiCandidateByIdResponse>(
        `${config.public.apiBase}/candidates/${id}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${authToken}`,
            'X-Auth-User': `${authUser}`,
          },
        }
      );

    return {
      candidateData: response.data as Candidate,
      candidateExtra: {
        attachments: response.data?.attachments as AttachmentCandidate[],
        skills: response.data?.skills as SkillCandidate[],
        tags: response.data?.tags as TagCandidate[],
        customFields: response.data?.customFields as CustomFieldCandidate[],
      },
    };
  } catch (error) {
    console.error('Ошибка при получении кандидата:', error);
    console.error(`Ошибка при получении кандидата #${id}:`, error);
    throw createError({
      statusCode: 404,
      statusMessage: 'Кандидат не найден',
    });
  }
}

export async function createCandidate(
  candidate: CandidateCreateRequest
): Promise<CandidateCreateResponse> {
  const config = useRuntimeConfig();
  const authToken = useCookie('auth_token').value;
  const authUser = useCookie('auth_user').value;

  try {
    const response = await $fetch<CandidateCreateResponse>(
      `${config.public.apiBase}/candidates`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${authToken}`,
          'X-Auth-User': `${authUser}`,
        },
        body: candidate,
      }
    );

    return response;
  } catch (error: any) {
    // Пробрасываем ошибку для обработки в компоненте
    throw error;
  }
}

// export async function fetchCandidatesMin(page = 1) {
//   const { candidates, pagination } = await fetchCandidatesFull(page);

//   const minified: Candidate[] = candidates.map((item: any) => ({
//     id: item.id,
//     firstName: item.firstname,
//     surname: item.surname,
//     tags: item.tags || [],
//     icon: item.icon,
//     isPng: false, // temporary before backend integration boolean values
//     imagePath: item.imagePath,
//     resume: item.resume,
//     vacancy: item.vacancy,
//     stage: item.stage
//   }));

//   console.log("Response min data", minified);
//   return { candidates: minified, pagination };
// }
