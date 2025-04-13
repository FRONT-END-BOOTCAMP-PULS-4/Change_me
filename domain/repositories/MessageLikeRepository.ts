import { MessageLike } from "../entities/MessageLike";

export interface MessageLikeRepository {
    findAll(): Promise<MessageLike[]>;
    findById(id: number): Promise<MessageLike | null>;
    save(messageLike: MessageLike): Promise<MessageLike>;
    update(messageLike: MessageLike): Promise<MessageLike>;
    deleteById(id: number): Promise<void>;
}
