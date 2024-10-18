import { usePagination } from "@/hooks/usePagination";
import { apiService } from "@/services/apiService";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export function List({
  module = "",
  search = false,
  horizontal = false,
  action = {
    view: false,
    edit: false,
    delete: false,
  },
  image = false,
}) {
  const router = useRouter();
  const [onDeleteReload, setOnDeleteReload] = useState(false);

  const goEdit = (id: number) => {
    router.push("/platform/" + module + "/" + id);
  };

  const goDelete = async (id: number) => {
    console.log("id", id);
    const request = await apiService.delete("/api/" + module + "/delete/" + id);

    if (request.status) {
      alert("Exclusão realizada com sucesso!");
      setOnDeleteReload(true);
    } else {
      alert("Houve um erro ao excluir o item");
    }
  };

  const {
    data: info,
    currentPage,
    totalPages,
    handlePageChange,
    handleOrderChange,
  } = usePagination({
    initialPage: 1,
    initialOrderBy: "createdAt",
    initialOrder: "asc",
    limit: 18,
    endpoint: module + "/list",
    reloadItems: onDeleteReload,
  });

  return (
    <div className="list">
      <div className="container">
        {search && (
          <div className="row">
            <div className="col-md-7">
              <div className="action">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Digite o Nome do Produto ou pela Marca"
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <select className="form-control form-control-sm">
                        <option value="">Ordenar por:</option>
                        <option value="name">Nome</option>
                        <option value="brand">Marca</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <div className="d-grid gap-2">
                        <button className="btn btn-primary btn-quartenary btn-sm btn-block">
                          Buscar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          {info.status &&
            info.response.items.length > 0 &&
            info.response.items?.map((item) => (
              <div
                className={
                  horizontal ? "col-sm-12 col-md-12" : "col-sm-12 col-md-4"
                }
                key={item.id}
              >
                <div className="item-card">
                  <div className="item-info">
                    {image && (
                      <Image
                        src="https://via.placeholder.com/250x250"
                        width={250}
                        height={300}
                        alt={item.name}
                        className="img-responsive"
                        style={{ width: "100%", borderRadius: 10 }}
                      />
                    )}
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>
                      <strong>R$ {item.price}</strong>
                    </p>
                    {action.view && (
                      <button className="btn btn-primary btn-tertiary btn-sm">
                        Visualizar
                      </button>
                    )}

                    {action.edit && (
                      <button
                        className="btn btn-quartenary btn-sm"
                        onClick={() => goEdit(item.id)}
                      >
                        Editar
                      </button>
                    )}

                    {action.delete && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => goDelete(item.id)}
                      >
                        Excluir
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
        {info.response != "" && (
          <div className="row">
            <div className="col-md-12">
              <div className="pagination-buttons">
                <button
                  className="btn btn-primary btn-quartenary btn btn-sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  Anterior
                </button>
                <span>
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  className="btn btn-primary btn-quartenary btn btn-sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                >
                  Próximo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
