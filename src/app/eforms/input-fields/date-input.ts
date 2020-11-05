import { InputBase } from './input-base';
import { inputsMinDim } from '../../constants/eforms_const'

export class DateInput extends InputBase<string> {
  type = 'date';
  width = inputsMinDim.date.width;
  height = inputsMinDim.date.height;
}
