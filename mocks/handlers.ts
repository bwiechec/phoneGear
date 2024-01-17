import { rest } from "msw";
import { fakeCategory } from "./mockData";

export const handlers = [
  rest.get(
    `https://phonegear-302ea-default-rtdb.europe-west1.firebasedatabase.app/categories.json?orderBy="parent"&equalTo=":categoryId"`,
    (_req, res, ctx) => {
      return res(ctx.json(fakeCategory));
    }
  ),
];
