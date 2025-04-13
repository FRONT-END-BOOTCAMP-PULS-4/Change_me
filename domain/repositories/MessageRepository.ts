import { Message } from "../entities/Message";

export interface MessageRepository {
    findAll(): Promise<Message[]>;
    findById(id: number): Promise<Message | null>;
    save(message: Message): Promise<Message>;
    update(message: Message): Promise<Message>;
    deleteById(id: number): Promise<void>;
}
