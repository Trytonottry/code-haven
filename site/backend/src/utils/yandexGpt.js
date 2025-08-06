import axios from 'axios';

const IAM_TOKEN = process.env.YANDEX_IAM_TOKEN;
const FOLDER_ID = process.env.YANDEX_FOLDER_ID;

export async function reviewCode(code, language = 'javascript') {
  const prompt = `Проанализируй безопасность и качество следующего кода на ${language}. Напиши кратко по-русски:\n\n${code}`;
  const body = {
    modelUri: `gpt://${FOLDER_ID}/yandexgpt-lite`,
    completionOptions: { maxTokens: 1000, temperature: 0.3 },
    messages: [{ role: 'user', text: prompt }]
  };
  const { data } = await axios.post(
    'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
    body,
    { headers: { Authorization: `Bearer ${IAM_TOKEN}`, 'x-folder-id': FOLDER_ID } }
  );
  return data.result.alternatives[0].message.text;
}