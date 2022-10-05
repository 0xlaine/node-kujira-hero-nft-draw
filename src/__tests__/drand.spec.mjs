import expect from 'unexpected';
import {getRound} from "../drand.mjs";

describe('drand', () => {
    it('should return a round when invoked', async  () => {
        const actual = await getRound();

        expect(actual, 'to satisfy', {
            round: expect.it('to be finite'),
        });
    });

    it('should return a given round when arg is passed', async () => {
        const actual = await getRound(2318221);

        expect(actual, 'to satisfy', {
                round: 2318221,
                randomness: 'ed3986c2f7401074bf0aa75cc6bda6b25a3f5d2262823488b416932a4d220942',
                signature: '8ed775cedbcc664343c5859836178aeda635326196f1663e709adc97c1fef3600ee585048ee6d16634e17b4039de445717a6acc612ca933273dbff7abfbfdafe022d52b2e646d4199054327c9a3ec3c1e598ffbe93dd63bfdd36b79a1a2af86c',
                previous_signature: 'a2c4e9ad1ce0f83ae716ec49511c3ec85c8a254e05b9dd0cc95ca898f1f33d167733e99aab45f40738b45867b1388a2310581631e35d2d9605d4666d0c94262dde2de85767752d639a69d653e15b68c6335b23be2ace772894e5a602d6c072d5'
            }
        )
    });
});
