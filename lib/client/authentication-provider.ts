import * as crypto  from 'crypto';

export class AuthenticationProvider {

    public readonly publicKey: string;
    private _privateKey: Buffer;

    constructor(
        publicKey: string,
        privateKey: string,
    ) {
        this.publicKey = publicKey;
        // decode the base64 secret
        this._privateKey = new Buffer(privateKey, 'base64');
    }

    public sign(prehashString: string): string {
        // create a sha256 hmac with the secret
        const hmac = crypto.createHmac('sha256', this._privateKey);

        // hash the prehash string and base64 encode the result
        return hmac.update(prehashString).digest('base64');
    }
}