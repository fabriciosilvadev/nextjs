export function Input() {
  return (
    <div className="mb-3">
      <label>Nome</label>
      <input
        {...register("name", { required: true })}
        id="name"
        name="name"
        type="text"
        className="form-control form-control-sm"
        placeholder="Informe o Nome"
        autoComplete="off"
      />
      {errors?.name && (
        <p className="text-red-600 text-sm">{errors?.name?.message}</p>
      )}
    </div>
  );
}
