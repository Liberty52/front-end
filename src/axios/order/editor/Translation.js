import axios from "../../axios";
import { ACCESS_TOKEN } from "../../../constants/token";

export const postTranslation = async (text) => {
  try {
    const response = await axios.post(
      "/product/texts/translations",
      { text },
      {
        headers: {
          Authorization: sessionStorage.getItem(ACCESS_TOKEN),
        },
      }
    );
    if (response.status !== 201) {
      return errReturn;
    } else {
      return [
        {
          translatedText: response.data.translatedText,
          source: langMap[response.data.source],
        },
        false,
      ];
    }
  } catch (e) {
    return errReturn;
  }
};

const errReturn = [
  {
    translatedText: null,
    source: null,
  },
  true,
];

const langMap = {
  ko: "한국어",
  en: "영어",
  ja: "일본어",
  "zh-CN": "중국어 간체자",
  "zh-TW": "중국어 번체자",
  vi: "베트남어",
  id: "인도네시아어",
  th: "태국어",
  de: "독일어",
  ru: "러시아어",
  es: "스페인어",
  it: "이탈리아어",
  fr: "프랑스어",
};
