/*interface UserData {
    user: {
        id: string,
        handshake: {
            address: string,
            auth: {
                username: string,
                password: string,
            }
        }
    },
    call: {
        createdAt: Date,
        id: string,
        key: string,
    }
}*/

interface UserData {
    id: string,
    handshake: object,
}

export class User {

    public id: string;
    public data: object;

    constructor (data: UserData) {

        this.id = data.id;
        this.data = data.handshake;

    }

}