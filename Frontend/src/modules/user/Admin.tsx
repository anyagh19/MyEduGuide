import { useEffect, useState } from "react";
import api from "../../../api";
import { useNavigate } from "react-router-dom";

interface UserType {
  id: number;
  username: string;
  email?: string;
  date_joined: string;
}

export default function Admin() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const navigate = useNavigate()
  // -----------------------------
  // 🔥 Fetch all users
  // -----------------------------
  const fetchUsers = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("access");

      const res = await api.get("api/admin/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data);
    } catch (err) {
      setError("Unauthorized or Server Error");
    }

    setLoading(false);
  };

  // -----------------------------
  // 🔥 Delete user
  // -----------------------------
  const deleteUser = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("access");

      await api.delete(`api/admin/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.clear()
    navigate('/signin')
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">
          Admin Panel — Registered Users
        </h1>
        <button onClick={handleLogout} className="py-2 px-3 rounded-full bg-red-400">Logout</button>
        </div>

        {loading && <p className="text-center text-gray-600">Loading users...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && users.length === 0 && (
          <p className="text-center text-gray-500">No users found.</p>
        )}

        {users.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  <th className="p-3 font-semibold">ID</th>
                  <th className="p-3 font-semibold">Username</th>
                  <th className="p-3 font-semibold">Joined</th>
                  <th className="p-3 font-semibold text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-100 border-b transition">
                    <td className="p-3">{u.id}</td>
                    <td className="p-3">{u.username}</td>
                    <td className="p-3">
                      {new Date(u.date_joined).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </div>
  );
}
