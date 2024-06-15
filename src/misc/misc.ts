import BREEDS from "../data/Breeds";

export function randomInt(upto: number, from: number = 0): number {
    return Math.floor(Math.random() * (upto - from + 1) + from);
}

export function shuffle(arr: any[]): void {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = randomInt(arr.length - 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

export function getRandomBreedIndex(target: string): number {
    let rand = randomInt(BREEDS.length - 1);
    while (!BREEDS[rand][target]) rand = randomInt(BREEDS.length - 1);
    return rand;
}
