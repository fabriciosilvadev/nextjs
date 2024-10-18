import { Header } from "@/components/header";
import { List } from "@/components/list";
// import { useRouter } from "next/router";

export default function Register() {
  // const router = useRouter();

  return (
    <>
      <Header />
      <div className="container">
        <List />
      </div>
    </>
  );
}
