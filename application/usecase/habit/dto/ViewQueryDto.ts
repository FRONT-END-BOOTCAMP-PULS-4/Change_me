export class ViewQueryDto {
    constructor(
        public currentPage?: number,
        public memberId?: string,
        public categoryId?: number,
        public status?: number,
    ) {}
}