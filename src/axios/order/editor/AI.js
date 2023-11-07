import { ACCESS_TOKEN } from '../../../constants/token';
import axios from '../../axios';

export const postImageGeneration = async (prompt, n) => {
  const response = await axios.post(
    '/product/images/generations',
    { prompt, n },
    {
      headers: {
        Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      },
    },
  );
  return response.data.urls;
};
