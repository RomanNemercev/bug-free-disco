import { candidatesFull } from "./candidatesFull";

export const candidatesMin = candidatesFull.map(({ id, name, tags, resume, vacancy, stage, icon, isPng, imagePath }) => ({
    id,
    name,
    tags,
    resume,
    vacancy,
    stage,
    icon,
    isPng,
    imagePath
}))