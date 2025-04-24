// utils/fetchCandidatesMin.ts
import { fetchCandidatesFull } from './fetchCandidatesFull';

export async function fetchCandidatesMin(page = 1) {
    const { candidates, pagination } = await fetchCandidatesFull(page);

    const minified = candidates.map((item: any) => ({
        id: item.id,
        firstName: item.firstname,
        surname: item.surname,
        tags: item.tags || [],
        icon: item.icon,
        isPng: item.isPng,
        imagePath: item.imagePath,
        resume: item.resume,
        vacancy: item.vacancy,
        stage: item.stage
    }));

    return { candidates: minified, pagination };
}
