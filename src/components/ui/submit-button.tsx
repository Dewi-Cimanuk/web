"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  loadingLabel?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function SubmitButton({
  children,
  label = "Simpan",
  loadingLabel = "Menyimpan...",
  className,
  variant = "default",
  size = "default",
  ...props
}: SubmitButtonProps & { children?: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending || props.disabled}
      className={className}
      variant={variant}
      size={size}
      {...props}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingLabel && <span className={size === "icon" ? "sr-only" : ""}>{loadingLabel}</span>}
        </>
      ) : (
        children || label
      )}
    </Button>
  );
}
