import { InputText } from "@/components/InputText";

export const dynamic = "force-dynamic";

export default async function AdminPostNewPage() {
  return (
    <div className="flex flex-col gap-6">
      <InputText labelText="Nome" placeholder="Digite seu nome: " />
      <InputText placeholder="Digite seu sobrenome: " />
    </div>
  );
}
