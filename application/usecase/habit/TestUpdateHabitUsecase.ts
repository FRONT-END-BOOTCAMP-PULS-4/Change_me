import { HabitRepository } from "@/domain/repositories/HabitRepository";
import { TestUpdateHabitDto } from "./dto/TestUpdateHabitDto";

export class TestUpdateHabitUsecase {
    constructor(private readonly repo: HabitRepository) { }

    async execute(dto: TestUpdateHabitDto): Promise<void> {
        await this.repo.TestUpdate(dto.id, dto.memberId, dto.categoryId, dto.name, dto.description, dto.finishedAt);
    }
}