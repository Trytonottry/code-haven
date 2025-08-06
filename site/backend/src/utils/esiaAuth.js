import axios from 'axios';
import qs from 'querystring';

const ESIA_CLIENT_ID = process.env.ESIA_CLIENT_ID;
const ESIA_REDIRECT_URI = process.env.ESIA_REDIRECT_URI;
const ESIA_BASE = 'https://esia-portal1.test.gosuslugi.ru';

export function esiaLoginUrl(state) {
  const params = {
    client_id: ESIA_CLIENT_ID,
    response_type: 'code',
    redirect_uri: ESIA_REDIRECT_URI,
    state,
    scope: 'openid'
  };
  return `${ESIA_BASE}/aas/oauth2/ac?${qs.stringify(params)}`;
}

export async function esiaCallback(code) {
  const { data } = await axios.post(
    `${ESIA_BASE}/aas/oauth2/te`,
    qs.stringify({
      client_id: ESIA_CLIENT_ID,
      code,
      redirect_uri: ESIA_REDIRECT_URI,
      grant_type: 'authorization_code'
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  return data; // access_token, id_token
}