import { MessageLike } from "../entities/MessageLike";
import { MessageLikeFilter } from "./filters/MessageLikeFilter";

export interface MessageLikeRepository {
    count(filter?: MessageLikeFilter): Promise<number>;
    findAll(filter?: MessageLikeFilter): Promise<MessageLike[]>;
    findById(id: number): Promise<MessageLike | null>;
    save(messageLike: MessageLike): Promise<MessageLike>;
    update(messageLike: MessageLike): Promise<MessageLike>;
    deleteById(id: number): Promise<void>;
}
