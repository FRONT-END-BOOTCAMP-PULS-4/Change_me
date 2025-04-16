export class CreateRecordDTO {
    constructor(
        public habitId: number,
        public date: Date,
        public notes?: string
    ) {}
}