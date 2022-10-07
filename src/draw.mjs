import {getRound} from "./rand/drand.mjs";
import {createRng} from "./rand/rng.mjs";

export async function draw(options) {
    if(!options.eligibleFile) {
        throw new Error('No eligible file provided, aborting');
    }

    const {
        randomness
    } = await getRound(2324512);

    if(!randomness) {
        throw new Error('Failed to fetch round from drand');

    }
    const rng = createRng(randomness);
    console.log('** NOT IMPLEMENTED YET**');
}
