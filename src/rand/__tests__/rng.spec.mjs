import expect from 'unexpected';
import {createRng} from "../rng.mjs";

describe('rng', () => {
    it('should produce stable outputs with same seed',  ()  => {
        const mySeed = 'never-use-this-in-production';

        const rng1 = createRng(mySeed);
        const rng2 = createRng(mySeed);

        const enumerator = [0,1,2,3,4];

        const first = enumerator.map(() => rng1())
        const second = enumerator.map(() => rng2());

        expect(first, 'to exhaustively satisfy', second);
    });

    it('should produce unstable outputs with different seed',  ()  => {
        const rng1 = createRng('seed-me-here');
        const rng2 = createRng('and-seed-me-there');

        const enumerator = [0,1,2,3,4];

        const first = enumerator.map(() => rng1())
        const second = enumerator.map(() => rng2());

        expect(first, 'not to exhaustively satisfy', second);
    });
})
