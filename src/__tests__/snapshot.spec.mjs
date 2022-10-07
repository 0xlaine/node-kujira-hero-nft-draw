import {fetchDelegators, takeSnapshot} from "../snapshot.mjs";
import expect from "unexpected";

describe('snapshot', function () {
    it('should fetch delegators', async function () {
        const delegators = await fetchDelegators();

        expect(delegators, 'to be an array');
    });
});
