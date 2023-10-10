import { GET_LICENSES } from "../../../constants/api";
import request from "../../axios";

export const getLicenses = async () => {
  return request.get(GET_LICENSES);
};
