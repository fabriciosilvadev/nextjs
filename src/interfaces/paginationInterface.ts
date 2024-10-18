export interface PaginationParams {
  initialPage?: number;
  initialOrderBy?: string;
  initialOrder?: "asc" | "desc";
  limit?: number;
  endpoint?: string;
}

export interface PaginationResult<T> {
  status: boolean;
  response: {
    data: T[];
    currentPage: number;
    totalPages: number;
    handlePageChange: (newPage: number) => void;
    handleOrderChange: (newOrderBy: string) => void;
  };
  error: string;
}
