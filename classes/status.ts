export class Status {
    message?: string;
    status: number;
    value?: object;

    constructor(status?: number, message?: string, value?: object) {
        this.status = status || 200;
        this.message = message || (status === 500 ? 'Internal server error' : '');
        this.value = value || {};
    }
}