import { LICENSE_LIST } from '../../../constants/api';
import request from '../../axios';

export const getLicenseList = async () => {
  return request.get(LICENSE_LIST());
};
