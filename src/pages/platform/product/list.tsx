import { Header } from "@/components/header";
import { List } from "@/components/list";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  const goAddProduct = () => {
    router.push("/platform/product/create");
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div style={{ marginTop: 25 }}>
              <h3>Lista de Produtos</h3>
            </div>
          </div>

          <div className="col-md-6">
            <div className="action" style={{ textAlign: "right" }}>
              <button
                className="btn btn-primary btn-sm btn-tertiary"
                onClick={() => goAddProduct()}
              >
                Novo Produto
              </button>
            </div>
          </div>
        </div>
        <List
          module="product"
          horizontal={false}
          action={{ view: true, edit: true, delete: true }}
          image
        />
      </div>
    </>
  );
}
