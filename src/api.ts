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