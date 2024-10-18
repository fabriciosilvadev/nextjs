import { Header } from "@/components/header";
import { categorySchema } from "@/validation/categoryValidation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function FormCreate() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<{
    name: string;
  }>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (data) => {
    const res = await fetch("/api/category/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/platform/category/list");
    } else {
      alert("Houve um erro ao cadastrar uma nova marca");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3>Nova Categoria</h3>
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
          <div className="col-md-4">
            <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
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
