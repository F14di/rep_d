
export class InputBase<T> {
    id: string;
    value: T;
    key: string;
    label: string;
    alignment: string;

    required: boolean;
    validators: string[];
    recipients: number[];

    // inputType: string;
    type: string;
    x: number;
    y: number;
    // width: number;
    // height: number;

    // order and options attributes are valid for dynamic forms.
    // but redundant for e-forms

    // options: {key: string, value: string}[];
    // order: number;

    constructor(input: {
        id?: string;
        value?: T;
        key?: string;
        label?: string;
        required?: boolean;
        validators?: string[];
        recipients?: number[];
        // inputType?: string;
        type?: string;
        alignment?: string;
        x?: number;
        y?: number;
        // width?: number;
        // height?: number;
        // options?: {key: string, value: string}[];
        // order?: number;
      } = {}) {
      this.id = input.id || '';
      this.value = input.value;
      this.key = input.key || '';
      this.label = input.label || '';
      this.alignment = input.alignment || '';
      this.required = !!input.required;
      this.validators = input.validators || [];
      this.recipients = input.recipients;
    // //   this.inputType = input.inputType || '';
      this.type = input.type || '';
      this.x = input.x || 0;
      this.y = input.y || 0;

    //   this.width = input.width || 0;
    //   this.height = input.height || 0;
      //   this.options = input.options || [];
      //   this.order = input.order === undefined ? 1 : input.order;
    }
  }
