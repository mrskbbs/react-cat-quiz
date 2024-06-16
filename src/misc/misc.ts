import BREEDS from "../data/Breeds";
import { IBreedJson } from "../hooks/useGetBreeds";

export function randomInt(upto: number, from: number = 0): number {
    return Math.floor(Math.random() * (upto - from + 1) + from);
}

export function shuffle(arr: any[]): void {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = randomInt(arr.length - 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

export function filterEmptyEntries(entry: any): boolean {
    return entry === null || entry === undefined || entry === " " || entry.replace(" ", "") === "";
}

export function getRandomBreedIndex(target: string, breeds: IBreedJson[]): number {
    let rand = randomInt(breeds.length - 1);
    while (filterEmptyEntries(breeds[rand][target])) {
        rand = randomInt(BREEDS.length - 1);
    }
    return rand;
}

export function generateResultMessage(ratio: number) {
    if (ratio === 1.0) return "Excelent! You know everything about cats!";
    if (ratio >= 0.75) return "Impressive! But there's still a room for improvement";
    if (ratio >= 0.5) return "Not bad! However I'd study more about cats if I were you";
    if (ratio >= 0.25) return "It's alright, next time you'll do better";

    return "Clearly you're a dog person";
}
