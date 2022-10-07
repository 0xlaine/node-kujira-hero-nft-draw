import got from 'got';

export const BASE_URL = 'https://rest.kujira.ccvalidators.com';

/**
 * Fetch the latest block header information (block height and time)
 * @return {Promise<{time: *, height: *}>}
 */
export async function blocksLatest() {
    const {
        block: {
            header: {
                height,
                time,
            }
        }
    } = await got.get(`${BASE_URL}/cosmos/base/tendermint/v1beta1/blocks/latest`).json();

    return {
        height, time
    };
}

export async function* validatorDelegators(valoperAddr, iteratorLimit = 200) {
    let latestResponse = await got
        .get(`${BASE_URL}/cosmos/staking/v1beta1/validators/${valoperAddr}/delegations`)
        .json();

    /**
     * Response structure looks like this
     * {
     *   "delegation_responses": [
     *     {
     *       "delegation": {
     *         "delegator_address": "string",
     *         "validator_address": "string",
     *         "shares": "string"
     *       },
     *       "balance": {
     *         "denom": "string",
     *         "amount": "string"
     *       }
     *     }
     *   ],
     *   "pagination": {
     *     "next_key": "string",
     *     "total": "string"
     *   }
     * }
     */
    let nextKey = '';
    let iteration = 0;
    do {
        nextKey = latestResponse.pagination.next_key;

        // If we have a next key we can fire off the HTTP request in the background, otherwise we just emit an Promise Resolve
        // to allow the `await` later to simply work
        const prefetch = nextKey
            ? got
                .get(`${BASE_URL}/cosmos/staking/v1beta1/validators/${valoperAddr}/delegations?pagination.key=${encodeURIComponent(nextKey)}`)
                .json()
            : Promise.resolve();

        // yield all the results for the latest completed response
        for (const delegation of latestResponse.delegation_responses) {
            yield delegation;
        }

        // wait for the network call to complete or the empty promise to resolve, in which case we're done iterating
        latestResponse = await prefetch;
        iteration++;
    } while (nextKey && iteration < iteratorLimit);
}
