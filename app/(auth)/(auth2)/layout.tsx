import Authbox from "@/app/components/authbox";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Authbox>{children}</Authbox>;
}