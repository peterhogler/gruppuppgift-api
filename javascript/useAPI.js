export default class useAPI {
    constructor(host) {
        this.host = host;
    }

    async get(endpoint) {
        const res = await fetch(this.host + endpoint);
        return await res.json();
    }

    async post(endpoint, data) {
        const res = await fetch(this.host + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await res;
    }

    async put(endpoint, data) {
        const res = await fetch(this.host + endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await res;
    }
}
