import React from "react";
import { LoaderCircle, CheckCircle, AlertTriangle } from "lucide-react";
import Button, { ButtonProps } from ".";
import { useTranslation } from "react-i18next";

type SubmitButtonProps = {
  status?: "idle" | "loading" | "success" | "error"; // Handle different states
} & ButtonProps;

const SubmitButton: React.FC<SubmitButtonProps> = ({
  status = "idle",
  children,
  ...rest
}) => {
  const { t } = useTranslation();
  const getButtonContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <LoaderCircle className="animate-spin w-5 h-5 text-white mr-3" />
            Loading...
          </>
        );
      case "success":
        return (
          <>
            <CheckCircle className="w-5 h-5 text-white mr-3" />
            {t("form_success")}
          </>
        );
      case "error":
        return (
          <>
            <AlertTriangle className="w-5 h-5 text-white mr-3" />
            {t("form_error")}
          </>
        );
      default:
        return children;
    }
  };

  return (
    <Button
      {...rest}
      disabled={status === "loading"}
      className={`flex items-center justify-center gap-2 ${rest.className}`}
    >
      {getButtonContent()}
    </Button>
  );
};

export default SubmitButton;
