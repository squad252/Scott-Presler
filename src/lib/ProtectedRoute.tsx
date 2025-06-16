// src/components/ProtectedRoute.tsx
import { useAuth } from "@/context/AuthContext";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  if (!user) return <Navigate to="/" replace />;
  return children;
}
