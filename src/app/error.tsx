"use client";

import ErrorMessage from "@/components/ErrorMessage";

type RootErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function RootErrorPage({ error, reset }: RootErrorPageProps) {

  return (
    <ErrorMessage
      pageTitle="Internal Server Error"
      contentTitle="501"
      content="Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
    />
  );
}
