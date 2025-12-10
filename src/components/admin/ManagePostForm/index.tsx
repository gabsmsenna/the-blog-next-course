"use client";

import { Button } from "@/components/Button";
import { InputCheckBox } from "@/components/InputCheckBox";
import { InputText } from "@/components/InputText";
import { MarkdownEditor } from "@/components/MarkDownEditor";
import { useState } from "react";
import { ImageUploader } from "../ImageUploader";

export function ManagePostForm() {
  const [contentValue, setContentValue] = useState("");

  return (
    <form action="" className="mb-16">
      <div className="flex flex-col gap-6">
        <InputText labelText="Nome" placeholder="Digite seu nome: " />
        
        <ImageUploader />
        
        <InputText placeholder="Digite seu sobrenome: " />
        
        <InputCheckBox labelText="Aceito os termos" />
        
        <MarkdownEditor
          labelText="Conteúdo"
          disabled={false}
          textAreaName="content"
          value={contentValue}
          setValue={setContentValue}
        />
      </div>

      <div className="mt-4">
        <Button type="submit" variant="default" size="md" />
      </div>
    </form>
  );
}
