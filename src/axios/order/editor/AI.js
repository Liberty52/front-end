import { ACCESS_TOKEN } from '../../../constants/token';
import axios from '../../axios';

export const postImageGeneration = async (prompt) => {
  const response = await axios.post(
    '/product/images/generations',
    { prompt, n: 3 },
    {
      headers: {
        Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      },
    },
  );
  return response.data.urls;
};
