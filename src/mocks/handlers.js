import { rest } from 'msw';

const baseURL = 'https://project5-drf-api.herokuapp.com/';

/**
 * Mock user to intercept API request.
 */
export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 2,
        username: 'lemons',
        email: '',
        first_name: '',
        last_name: '',
        profile_id: 2,
        profile_image:
          'https://res.cloudinary.com/cluelessbiker/image/upload/v1/media/images/551800-grt-Best-Substitutes-for-Lemon-Juice-1200x628-Facebook-1200x628_w14bpn',
      }),
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

export default handlers;
