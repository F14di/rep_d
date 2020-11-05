import { InputBase } from './input-base';
import { inputsMinDim } from '../../constants/eforms_const'

export class TextareaInput extends InputBase<string> {
  type = 'textarea';
  width = inputsMinDim.textarea.width;
  height = inputsMinDim.textarea.height;
}
