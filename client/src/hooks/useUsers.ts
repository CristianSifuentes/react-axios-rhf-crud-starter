import { useEffect, useState, useCallback } from "react";
import { api } from "../api/axios";
import type { User, UserCreate, UserUpdate } from "../types";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const { data } = await api.get<User[]>("/users");
    setUsers(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const createUser = async (payload: UserCreate) => { await api.post("/users", payload); await fetchUsers(); };
  const updateUser = async (id: string, payload: UserUpdate) => { await api.put(`/users/${id}`, payload); await fetchUsers(); };
  const deleteUser = async (id: string) => { await api.delete(`/users/${id}`); await fetchUsers(); };

  return { users, isLoading, createUser, updateUser, deleteUser, refetch: fetchUsers };
}
