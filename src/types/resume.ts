export interface Resume {
  resumeId: string;
  title: string;
  userEmail: string;
  userName: string;
}

export interface Pagination {
  page: number;
  pageCount: number;
  total: number;
  pageSize: number;
}

interface Meta {
  pagination: Pagination;
}

export interface ApiResponse {
  data: Resume[];
  meta: Meta;
}
