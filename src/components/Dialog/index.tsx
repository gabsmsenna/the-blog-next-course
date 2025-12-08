"use client";

import React from "react";
import { Button } from "../Button";

type DialogProps = {
  isVisible?: boolean;
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
};

export function Dialog({ isVisible = false, title, content, onConfirm, onCancel, disabled = false }: DialogProps) {
  if (!isVisible) return null;

  return (
    <div
      className="fixed z-50 inset-0 bg-black/50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <div className="bg-slate-100 p-6 rounded-lg max-w-2xl mx-6 flex flex-col gap-6 shadow-lg text-center">
        <h3 id="dialog-title" className="text-2xl font-extrabold">
          {title}
        </h3>
        <div id="dialog-description">{content}</div>
        <div className="flex items-center justify-around">
          <Button variant="ghost"
            autoFocus
            onClick={onCancel}
            disabled={disabled}
          >
            Cancelar
          </Button>
          <Button variant="default"
            onClick={onConfirm}
            disabled={disabled}>
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
}
