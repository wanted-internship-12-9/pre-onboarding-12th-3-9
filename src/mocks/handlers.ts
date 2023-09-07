import { rest } from 'msw';

import { MOCK_API_URL, MOCK_API_PATH } from '../apis/apiConfig';
import data from './db';

export const handlers = [
  rest.get(`${MOCK_API_URL}${MOCK_API_PATH.SICK}`, (req, res, ctx) => {
    const searchedNoun = req.url.searchParams.get('q');

    if (!searchedNoun) {
      return res(ctx.status(200), ctx.json([]));
    }

    const filteredData = {
      sick: data.sick.filter(item => {
        return item.sickNm.includes(searchedNoun);
      }),
    };

    return res(ctx.status(200), ctx.json(filteredData));
  }),
];
