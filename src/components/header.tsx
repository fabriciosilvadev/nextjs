import Image from "next/image";
import Logo from "../resources/images/logo.png";
import { useRouter } from "next/router";

export function Header() {
  const router = useRouter();

  const goMenu = (menu: string) => {
    if (menu == "logout") {
      router.push("/auth/" + menu);
      return;
    }
    router.push("/platform/" + menu + "/list");
  };

  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="logo">
              <Image src={Logo} width={176} height={82} alt={"Logo"} />
            </div>
          </div>

          <div className="col-md-9">
            <div className="menu">
              <a href="#" className="link" onClick={() => goMenu("product")}>
                Produtos
              </a>
              <a href="#" className="link" onClick={() => goMenu("category")}>
                Categorias
              </a>
              <a href="#" className="link" onClick={() => goMenu("brand")}>
                Marcas
              </a>
              <a href="#" className="link" onClick={() => goMenu("logout")}>
                Sair
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
