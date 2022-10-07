import random from 'random';
import seedrandom from 'seedrandom';

/**
 * Create a new random generator instance with a known seed
 * @param seed{string} The fixed seed to initialize the random generator with
 * @return {IDist<number>}
 */
export function createRng(seed) {

    // create a new independent random number generator (uses seedrandom under the hood)
    // see https://github.com/transitive-bullshit/random
    const rng = random.clone(seedrandom(seed));

    return rng.uniform();
}
