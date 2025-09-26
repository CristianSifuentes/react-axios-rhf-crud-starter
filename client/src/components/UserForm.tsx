import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  role: z.enum(["admin","user","manager"]).default("user")
});
export type UserFormValues = z.infer<typeof schema>;

type Props = {
  mode: "create" | "edit";
  defaultValues?: Partial<UserFormValues>;
  onCreate?: (data: UserFormValues) => Promise<void> | void;
  onUpdate?: (data: UserFormValues) => Promise<void> | void;
  onCancel?: () => void;
};

export function UserForm({ mode, defaultValues, onCreate, onUpdate, onCancel }: Props) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } =
    useForm<UserFormValues>({
      resolver: zodResolver(schema),
      defaultValues: defaultValues ?? { name: "", email: "", role: "user" }
    });

  useEffect(() => {
    if (isSubmitSuccessful && mode === "create") reset({ name: "", email: "", role: "user" });
  }, [isSubmitSuccessful, mode, reset]);

  const onSubmit = async (data: UserFormValues) => {
    if (mode === "create" && onCreate) await onCreate(data);
    if (mode === "edit" && onUpdate) await onUpdate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 style={{marginTop:0}}>{mode === "create" ? "Create user" : "Edit user"}</h3>
      <div className="row">
        <div>
          <label>Name</label>
          <input placeholder="Ada Lovelace" {...register("name")} />
          {errors.name && <div className="error">{errors.name.message}</div>}
        </div>
        <div>
          <label>Email</label>
          <input placeholder="ada@example.com" {...register("email")} />
          {errors.email && <div className="error">{errors.email.message}</div>}
        </div>
      </div>
      <div className="row">
        <div>
          <label>Role</label>
          <select {...register("role")}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
        </div>
      </div>
      <div style={{marginTop:12, display:'flex', gap:8}}>
        <button type="submit" disabled={isSubmitting}>{mode === "create" ? "Create" : "Save changes"}</button>
        {mode === "edit" && <button type="button" className="secondary" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
