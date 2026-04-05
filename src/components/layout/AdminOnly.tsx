import React, { type FC, type ReactNode } from "react";
import { useStore } from "../../store/useStore";

interface AdminOnlyProps {
  children: ReactNode;
}

const AdminOnly: FC<AdminOnlyProps> = ({ children }) => {
  const role = useStore((state) => state.role);
  if (role !== "admin") {
    return null;
  }

  return <>{children}</>;
};

export default AdminOnly;
