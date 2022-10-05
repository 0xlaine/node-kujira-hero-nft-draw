import { getRound } from './drand.mjs';

async function main() {
    const roundToFetch = 2318221;
    const result = await getRound(roundToFetch);

    console.log(result);
}


main().catch(console.error);
