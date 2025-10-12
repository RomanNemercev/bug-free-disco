export const getMovieList = async (url: string): Promise<{ movie: [] | undefined, error: string | null }> => {
    let movie: [] | undefined;
    let error: string | null = null;
    try {
        movie = await $fetch(
            `https://cinemaguide.skillbox.cc/${url}`,
            {
                credentials: 'include',
            }
        );

        return { movie, error };
    } catch (err: any) {
        error = 'Ошибка при получении списка фильмов';
        // error = err.message;
    } finally {
        return { movie, error };
    }
}

export const API_YANDEX_KEY = '6e076d59-ad48-44d7-88c6-5af6477f36f4';
export const API_YANDEX_SUGGEST = '90ca3da5-d0a2-4831-82eb-c097f9f70a2f';