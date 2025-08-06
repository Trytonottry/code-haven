import axios from 'axios';

const YC_OAUTH = process.env.YANDEX_OAUTH;
const YC_FOLDER = process.env.YANDEX_FOLDER;

export async function spawnYandexRunner() {
  const { data } = await axios.post(
    'https://compute.api.cloud.yandex.net/compute/v1/instances',
    {
      folderId: YC_FOLDER,
      name: 'gitmvp-runner',
      zoneId: 'ru-central1-a',
      resourcesSpec: { memory: 2147483648, cores: 2 },
      bootDiskSpec: { diskSpec: { imageId: 'fd8jv5fja5j6rvu1v8j4' } }
    },
    { headers: { Authorization: `Bearer ${YC_OAUTH}` } }
  );
  return data.id;
}