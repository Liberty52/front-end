import { PreviewEffect } from '../../../types/image-editor/preview-effects/client';
import axios from '../../axios';

export const getAllPreviewEffectImages = async () => {
  const res = await axios.get('/product/image-editor/preview-effects');
  return res.data as PreviewEffect[];
};
