import { HabitRepository } from "@/domain/repositories/HabitRepository";
import { UpdateHabitDto } from "./dto/UpdateHabitDto";

export class UpdateHabitUsecase {
    constructor(private readonly repo: HabitRepository) { }

    async execute(dto: UpdateHabitDto): Promise<void> {
        await this.repo.update2(dto.id, dto.memberId, dto.categoryId, dto.name, dto.description, dto.finishedAt);
    }
}