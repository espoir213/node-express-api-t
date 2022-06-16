import { InputPagination, PaginationEntity } from '@/entities/pagination';

class PaginationService {
  public paginationEntity(list: any, count: number, pagInp: InputPagination) {
    const page = new PaginationEntity();
    page.list = list;
    page.countPage = Math.ceil(count / pagInp.pageSize > 1 ? count / pagInp.pageSize : 1);
    page.pageSize = pagInp.pageSize;
    page.page = pagInp.page;
    return page;
  }
}
export default PaginationService;
