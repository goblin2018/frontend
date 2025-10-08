import { Navigate } from "react-router-dom";
import { useStaffStore } from "store/staff";

export default function Guard({ children }: { children: any }) {
  const user = useStaffStore((s) => s.user);
  console.log("user is ", user, children);
  if (user?.id) {
    return children;
  }
  return <Navigate to="/login" replace />;
}
