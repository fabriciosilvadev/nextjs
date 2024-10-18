import { Header } from "@/components/header";
import { apiService } from "@/services/apiService";
import { frontService } from "@/services/frontService";
import { productSchema } from "@/validation/productValidation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Form() {
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<{
    name: string;
    price: string;
    description: string;
    brand: string;
    categories: string[];
  }>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    getBrands();
    getCategories();
  }, []);

  const getBrands = async () => {
    const obj = await frontService.getAllBrands();

    if (obj.status) {
      if (obj.data.status) {
        setBrands(obj.data.response.items);
      }
    }
  };

  const getCategories = async () => {
    const obj = await frontService.getAllCategories();

    if (obj.status) {
      if (obj.data.status) {
        setCategories(obj.data.response.items);
      }
    }
  };

  const save = async (data) => {
    const request = await apiService.post("/api/product/create/", data);

    if (request.status) {
      alert("Cadastro realizado com sucesso!");
      router.push("/platform/product/list");
    } else {
      alert("Houve um erro ao cadastrar o registro");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3>Novo Produto</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <form className="mt-12" onSubmit={handleSubmit(save)}>
              <div className="mb-3">
                <label>Nome</label>
                <input
                  {...register("name", { required: true })}
                  id="name"
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Informe o Nome"
                  autoComplete="off"
                />
                {errors?.name && (
                  <p className="text-red-600 text-sm" style={{ color: "red" }}>
                    {errors?.name?.message}
                  </p>
                )}
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label>Preço</label>
                    <input
                      {...register("price", { valueAsNumber: true })}
                      id="price"
                      step="0.01"
                      type="number"
                      className="form-control form-control-sm"
                      placeholder="Informe o Preço"
                      autoComplete="off"
                    />
                    {errors?.price && (
                      <p
                        className="text-red-600 text-sm"
                        style={{ color: "red" }}
                      >
                        {errors?.price?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label>Marca</label>
                    <select
                      {...register("brand", { required: true })}
                      id="brand"
                      className="form-control form-control-sm"
                      autoComplete="off"
                    >
                      <option value="">Selecione...</option>
                      {brands.length > 0 &&
                        brands.map((brand) => (
                          <option
                            value={brand.id}
                            key={"brand_key_" + brand.id}
                          >
                            {brand?.name}
                          </option>
                        ))}
                    </select>
                    {errors?.brand && (
                      <p
                        className="text-red-600 text-sm"
                        style={{ color: "red" }}
                      >
                        {errors?.brand?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label>Categorias</label>
                <select
                  {...register("categories", { required: true })}
                  id="categories"
                  className="form-control form-control-sm"
                  autoComplete="off"
                  multiple
                >
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <option
                        value={category.id}
                        key={"category_key_" + category.id}
                      >
                        {category?.name}
                      </option>
                    ))}
                </select>
                {errors?.categories && (
                  <p className="text-red-600 text-sm" style={{ color: "red" }}>
                    {errors?.categories?.message}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label>Descrição</label>
                <textarea
                  {...register("description", { required: true })}
                  id="description"
                  rows={10}
                  className="form-control form-control-sm"
                  placeholder="Informe a Descrição"
                  autoComplete="off"
                />
                {errors?.description && (
                  <p className="text-red-600 text-sm" style={{ color: "red" }}>
                    {errors?.description?.message}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-quartenary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Gravando..." : "Gravar"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
