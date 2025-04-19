import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | KWIK CV",
  description: "Manage your resumes and profile",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}