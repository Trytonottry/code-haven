import axios from 'axios';

const SELECTEL_TOKEN = process.env.SELECTEL_TOKEN;
const API = 'https://api.selectel.ru/vpc/v1';

export async function spawnSelectelRunner(flavor, image) {
  const { data } = await axios.post(
    `${API}/servers`,
    { server: { name: 'gitmvp-runner', flavorRef: flavor, imageRef: image, key_name: 'gitmvp' } },
    { headers: { 'X-Auth-Token': SELECTEL_TOKEN } }
  );
  return data.server.id;
}