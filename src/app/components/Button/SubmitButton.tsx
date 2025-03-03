"use client";

import React, { useEffect, useState } from "react";
import { LoaderCircle, CheckCircle, AlertTriangle } from "lucide-react";
import Button, { ButtonProps } from "@/components/Button";
import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends ButtonProps {
  state?: {
    success?: boolean;
    errors?: Record<string, string[]>;
  };
}

export default function SubmitButton({
  children,
  state,
  ...props
}: SubmitButtonProps) {
  const t = useTranslations();
  const { pending } = useFormStatus();
  const resetDelay = 2000;
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state?.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, resetDelay);

      return () => clearTimeout(timer);
    }
  }, [state?.success, resetDelay]);

  const renderContent = () => {
    if (pending) {
      return (
        <>
          <LoaderCircle className="h-4 w-4 animate-spin" />
          <span>Loading...</span>
        </>
      );
    }

    if (showSuccess) {
      return (
        <>
          <CheckCircle className="h-4 w-4" />
          <span>{t("form_success")}</span>
        </>
      );
    }

    if (state?.errors?.form) {
      return (
        <>
          <AlertTriangle className="h-4 w-4" />
          <span>{state.errors.form[0] || t("form_error")}</span>
        </>
      );
    }

    return children;
  };

  return (
    <Button type="submit" disabled={pending || showSuccess} {...props}>
      <span className="w-full flex justify-center items-center gap-2">
        {renderContent()}
      </span>
    </Button>
  );
}
