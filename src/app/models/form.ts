export interface Form {
    title: string;
    notification_emails: string[];
    upload_id: string;
    source_file: string;
    recipient_templates: Recepient[];
    inputs: Input[];
}

export interface Recepient{
    label: string;
    number: number;
    random: string;
}

export interface Input{
    type: string;
    label: string;
    x: number;
    y: number;
    width: number;
    height: number;
    value: string;
    recipients: number[];
}


export interface BackendData {
    items: Form[];
    total_count: number;
}
