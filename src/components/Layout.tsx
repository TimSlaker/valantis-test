import Header from "./Header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=" justify-center align-middle h-auto">
      <Header />
      <div className="w-3/4 mx-auto py-4">{children}</div>
    </div>
  );
};
export default Layout;
