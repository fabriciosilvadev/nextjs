import { Header } from "@/components/header";
import { List } from "@/components/list";
import { useRouter } from "next/router";

export default function BrandList() {
  const router = useRouter();

  const goAdd = () => {
    router.push("/platform/brand/create");
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>Lista de Marcas</h3>
          </div>
          <div className="col-md-6">
            <div className="action" style={{ textAlign: "right" }}>
              <button
                className="btn btn-primary btn-sm btn-tertiary"
                onClick={() => goAdd()}
              >
                Nova Marca
              </button>
            </div>
          </div>
        </div>
        <List
          module="brand"
          horizontal
          action={{ view: false, edit: true, delete: true }}
        />
      </div>
    </>
  );
}
