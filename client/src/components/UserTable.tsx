import type { User } from "../types";

type Props = {
  users: User[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function UserTable({ users, onEdit, onDelete }: Props) {
  if (!users.length) return <p>No users yet. Create one above.</p>;
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td>
              <div className="actions">
                <button className="secondary" onClick={() => onEdit(u.id)}>Edit</button>
                <button onClick={() => onDelete(u.id)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
