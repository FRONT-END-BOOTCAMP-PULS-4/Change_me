import { verify } from "jsonwebtoken";
import { NextApiRequest } from "next";

export function getMemberIdFromToken(authHeader: string): string | null {
    const token = authHeader?.replace("Bearer ", "")!;

    try {
        const decoded = verify(token, process.env.JWT_SECRET!);
        const { id } = decoded as { id: string };
        return id;
    } catch (err) {
        return null;
    }
}
