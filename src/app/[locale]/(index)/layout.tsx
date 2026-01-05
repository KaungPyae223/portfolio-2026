import NavBar from "@/features/global/components/Nav";

type Props = {
  children: React.ReactNode;
};

export default async function LocaleLayout({ children }: Props) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
