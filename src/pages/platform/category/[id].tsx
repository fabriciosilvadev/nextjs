import { Header } from "@/components/header";
import { BrandUpdate, BrandView } from "@/interfaces/brandInterface";
import { apiService } from "@/services/apiService";
import { brandSchema } from "@/validation/brandValidation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function FormUpdate() {
  const router = useRouter();
  const [item, setItem] = useState<BrandView>();
  const id = router.query.id;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<{
    name: string;
  }>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(brandSchema),
  });

  useEffect(() => {
    getItem();
  }, []);

  useEffect(() => {
    if (item) {
      reset(item);
    }
  }, [item, reset]);

  const getItem = async () => {
    const request = await apiService.get("/api/category/view/" + id);

    if (request.status) {
      if (request.data.status) {
        if (request.data.response !== "") {
          setItem(request.data.response);
        }
      }
    }
  };

  const save = async (data: BrandUpdate) => {
    const request = apiService.put("/api/category/update/" + id, data);

    if ((await request).status) {
      alert("Atualização realizada com sucesso!");
      router.push("/platform/category/list");
    } else {
      alert("Houve um erro ao atualizar uma nova categoria");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <br />
          <br />
          <div className="col-md-12">
            <h3>Editando Categoria</h3>
          </div>

          <br />
          <br />
          <div className="col-md-12">
            <button
              className="btn btn-primary btn-sm btn-tertiary"
              onClick={() => router.back()}
            >
              Voltar
            </button>
            <br />
            <br />
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
