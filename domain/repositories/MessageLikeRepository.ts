import { MessageLike } from "../entities/MessageLike";
import { MessageLikeFilter } from "./filters/MessageLikeFilter";

export interface MessageLikeRepository {
    count(filter?: MessageLikeFilter): Promise<number>;
    findAll(filter?: MessageLikeFilter): Promise<MessageLike[]>;
    save(messageLike: MessageLike): Promise<MessageLike>;
    delete(messageId: number, memberId: string): Promise<void>;
}
