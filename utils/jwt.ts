import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

export function signJWT(payload: object, expiresIn = "1d") {
    return jwt.sign(payload, secret, { expiresIn });
}

export function verifyJWT(token: string) {
    try {
        return jwt.verify(token, secret);
    } catch {
        return null;
    }
}