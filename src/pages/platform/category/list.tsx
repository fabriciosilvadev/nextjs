import { Header } from "@/components/header";
import { List } from "@/components/list";
import { useRouter } from "next/router";

export default function CategoryList() {
  const router = useRouter();

  const goAdd = () => {
    router.push("/platform/category/create");
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>Lista de Categorias</h3>
          </div>
          <div className="col-md-6">
            <div className="action" style={{ textAlign: "right" }}>
              <button
                className="btn btn-primary btn-sm btn-tertiary"
                onClick={() => goAdd()}
              >
                Nova Categoria
              </button>
            </div>
          </div>
        </div>
        <List
          module="category"
          horizontal
          action={{ view: false, edit: true, delete: true }}
        />
      </div>
    </>
  );
}
