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
  const [item, setItem] = useState();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const id = router.query.id;

  useEffect(() => {
    getBrands();
    getCategories();
    getItem();
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

  const getItem = async () => {
    const request = await apiService.get("/api/product/view/" + id);
    console.log("request", request);
    if (request.status) {
      if (request.data.status) {
        if (request.data.response !== "") {
          setItem(request.data.response);
        }
      }
    }
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{
    name: string;
    price: string;
    description: string;
    brand: string;
    categories: string[];
  }>({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      brand: "",
      categories: [],
    },
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (item) {
      const formatCategories = item.categories.map((category) =>
        String(category.category_id)
      );
      console.log("formatCategories", formatCategories);
      item.categories = formatCategories;
      item.brand = String(item.brandId);
      console.log("item", item);
      reset(item);
    }
  }, [item, reset]);

  const save = async (data) => {
    const request = apiService.put("/api/product/update/" + id, data);

    if ((await request).status) {
      alert("Atualização realizada com sucesso!");
      router.push("/platform/product/list");
    } else {
      alert("Houve um erro ao atualizar o registro");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3>Editar Produto</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <form className="mt-12" onSubmit={handleSubmit(save)}>
              {console.log("errors", errors)}
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
                      {...register("brandId", { required: true })}
                      id="brandId"
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
                    {errors?.brandId && (
                      <p
                        className="text-red-600 text-sm"
                        style={{ color: "red" }}
                      >
                        {errors?.brandId?.message}
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
