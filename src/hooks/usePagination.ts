import {
  PaginationParams,
  PaginationResult,
} from "@/interfaces/paginationInterface";
import { useState, useEffect } from "react";

export function usePagination<T>({
  initialPage = 1,
  initialOrderBy = "createdAt",
  initialOrder = "asc",
  limit = 10,
  endpoint = "",
  reloadItems = false,
}: PaginationParams): PaginationResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const [order, setOrder] = useState(initialOrder);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (
    page: number,
    orderBy: string,
    order: "asc" | "desc"
  ) => {
    const tokenAuth = localStorage.getItem("token");
    console.log("token", tokenAuth);

    const res = await fetch(
      `/api/${endpoint}?page=${page}&orderBy=${orderBy}&order=${order}&limit=${limit}`,
      {
        headers: {
          Authorization: "Bearer " + tokenAuth,
        },
      }
    );
    const result = await res.json();
    setData(result);
    setTotalPages(result.response.totalPages);
  };

  useEffect(() => {
    fetchData(page, orderBy, order);
  }, [page, orderBy, order, reloadItems]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleOrderChange = (newOrderBy: string) => {
    const newOrder = order === "asc" ? "desc" : "asc";
    setOrderBy(newOrderBy);
    setOrder(newOrder);
    setPage(1); // Reseta a página para 1 ao alterar a ordem
  };

  return {
    data,
    currentPage: page,
    totalPages,
    handlePageChange,
    handleOrderChange,
  };
}
