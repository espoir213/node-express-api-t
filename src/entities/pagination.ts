export class PaginationEntity {
  public page: number;
  public countPage: number;
  public pageSize: number;
  public list: [];
}

export class InputPagination {
  pageSize = 10;
  page: number;
}
