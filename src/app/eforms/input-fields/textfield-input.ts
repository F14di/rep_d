import { InputBase } from './input-base';
import { inputsMinDim } from '../../constants/eforms_const'

export class TextfieldInput extends InputBase<string> {
  type = 'text';
  width = inputsMinDim.text.width;
  height = inputsMinDim.text.height;

}
