class PaginationDto {
    page: number = 1;
    total: number = 0;
    limit: number = 10;
    lastPage: number = 1;

    constructor(input: Partial<PaginationDto> = {}) {
        if(input.page) this.page = input.page;
        if(input.total) this.total = input.total;
        if(input.limit) this.limit = input.limit;
        if(input.lastPage) this.lastPage = input.lastPage;
    }
}

export class ResponseWithPaginationDto<Data> {
    data: Data;
    pagination: PaginationDto;

    constructor(data: Data, pagination: Partial<PaginationDto> = {}) {
        this.data = data;
        this.pagination = new PaginationDto(pagination);
    }
}