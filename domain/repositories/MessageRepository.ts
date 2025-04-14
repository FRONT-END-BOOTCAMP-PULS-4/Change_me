import { Message } from "../entities/Message";
import { MessageFilter } from "./filters/MessageFilter";

export interface MessageRepository {
    findAll(filter?: MessageFilter): Promise<Message[]>;
    findById(id: number): Promise<Message | null>;
    save(message: Message): Promise<Message>;
    update(message: Message): Promise<Message>;
    deleteById(id: number): Promise<void>;
}
