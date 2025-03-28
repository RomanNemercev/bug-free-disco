import { candidatesFull } from "./candidatesFull";

export const candidatesMin = candidatesFull.map(({ id, surname, firstName, tags, resume, vacancy, stage, icon, isPng, imagePath }) => ({
    id,
    surname,
    firstName,
    tags,
    resume,
    vacancy,
    stage,
    icon,
    isPng,
    imagePath
}))