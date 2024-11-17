import { Header } from "./Header";

export function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 mx-6 my-4">{children}</main>
    </div>
  );
}
