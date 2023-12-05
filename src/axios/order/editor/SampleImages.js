import { SAMPLE_LIST } from '../../../constants/api';
import request from '../../axios';

export const getSampleList = async () => {
  return request.get(SAMPLE_LIST());
};
