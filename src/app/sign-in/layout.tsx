import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | KWIK CV",
  description: "Sign in to your resume builder account",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
