export class Status {
    message?: string;
    status: number;
    value?: object;

    constructor(status?: number, message?: string, value?: object) {
        this.message = message || '';
        this.status = status || 200;
        this.value = value || {};
    }
}