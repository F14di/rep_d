import { InputBase } from './input-base';
import { inputsMinDim } from '../../constants/eforms_const'


export class SignatureInput extends InputBase<string> {
  type = 'signature';
  width = inputsMinDim.signature.width;
  height = inputsMinDim.signature.height;
}
