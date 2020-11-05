
export const inputTypes = [
    {
        type: 'text',
        type_he: 'שדה טקסט',
        icon: 'title',
    }, {
        type: 'date',
        type_he: 'תאריך',
        icon: 'today',
    }, {
        type: 'checkbox',
        type_he: 'תיבת סימון',
        icon: 'check_box',
    }, {
        type: 'textarea',
        type_he: 'טקסט',
        icon: 'format_align_right',
    }, {
        type: 'signature',
        type_he: 'חתימה',
        icon: 'gesture',
    },
];

export const FORM_STATUS={
    SEND : 'send',
    CREATE : 'create',
    READ : 'read',
}

export const inputsMinDim = {
    text:       {width:70,height:25},
    date:       {width:160,height:26},
    signature:  {width:250,height:150},
    textarea:   {width:300,height:250},
}