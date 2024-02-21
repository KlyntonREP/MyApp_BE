export function HttpException(status: number, message: string, error: any = '') {
    return {
        status,
        message,
        error,
        toString() {
            return `${this.status} - ${this.message}`;
        },
    };
}
