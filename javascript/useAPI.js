export default class useAPI {
    constructor(host) {
        this.host = host;
    }

    async get(endpoint) {
        const res = await fetch(this.host + endpoint);
        return await res.json();
    }
}
