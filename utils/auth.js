export async function getUserFromCookie(ctx) {
    const cookie = ctx.req?.headers.cookie || '';
    const token = cookie.split('; ').find(row => row.startsWith('token='));
    return token ? token.split('=')[1] : null;
  }
  