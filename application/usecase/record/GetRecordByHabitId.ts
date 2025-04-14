export class GetRecordByHabitId {
    constructor(private recordRepository: any) {}

    async execute(habitId: number) {
        if (!habitId) {
            throw new Error("Habit ID is required");
        }

        const records = await this.recordRepository.findByHabitId(habitId);
        return records;
    }
}