export class GetHabitListQueryDto {
    currentPage?: number;
    mine?: boolean;

    constructor(currentPage?: number, mine?: boolean) {
        this.currentPage = currentPage;
        this.mine = mine;
    }
}
