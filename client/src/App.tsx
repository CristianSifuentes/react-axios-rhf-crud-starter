import { useState } from "react";
import { useUsers } from "./hooks/useUsers";
import { UserForm } from "./components/UserForm";
import { UserTable } from "./components/UserTable";

export function App() {
  const { users, isLoading, createUser, updateUser, deleteUser, refetch } = useUsers();
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div>
      <h1>React + Axios + React Hook Form (CRUD)</h1>
      <div className="card">
        <UserForm
          key={editingId ?? "create"}
          mode={editingId ? "edit" : "create"}
          defaultValues={editingId ? users.find(u => u.id === editingId) : undefined}
          onCreate={async (data) => { await createUser(data); }}
          onUpdate={async (data) => { if(editingId){ await updateUser(editingId, data); setEditingId(null);} }}
          onCancel={() => setEditingId(null)}
        />
      </div>

      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h3 style={{margin:0}}>Users</h3>
          <button className="secondary" onClick={() => refetch()}>Refresh</button>
        </div>
        {isLoading ? <p>Loading…</p> : (
          <UserTable users={users} onEdit={setEditingId} onDelete={deleteUser} />
        )}
      </div>
    </div>
  );
}
