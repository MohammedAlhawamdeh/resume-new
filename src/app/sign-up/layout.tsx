import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | KWIK CV",
  description: "Create a new account for the resume builder",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}