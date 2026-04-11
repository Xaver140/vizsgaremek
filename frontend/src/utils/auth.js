import { jwtDecode } from "jwt-decode";

export function getUserRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    // ⛔ lejárt token törlése
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }

    return decoded.is_admin === 1 ? "admin" : "user";

  } catch {
    localStorage.removeItem("token");
    return null;
  }
}