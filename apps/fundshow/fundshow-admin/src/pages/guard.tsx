import { Navigate } from "react-router-dom";
import { useSystemUserStore } from "store/system_user";

export default function Guard({ children }: { children: any }) {
  const user = useSystemUserStore((s) => s.user);

  return children;

  if (user.id) {
    return children;
  }
  return <Navigate to="/login" replace />;
}
