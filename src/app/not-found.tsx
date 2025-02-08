import BaseLayout from "@/components/BaseLayout";
import { routing } from "../i18n/routing";
import NotFoundPage from "@/components/NotFound";

export default function GlobalNotFound() {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <NotFoundPage />
    </BaseLayout>
  );
}
