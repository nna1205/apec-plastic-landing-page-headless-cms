import BaseLayout from "@/app/components/BaseLayout";
import { routing } from "../i18n/routing";
import NotFoundPage from "@/app/components/NotFound";

export default function GlobalNotFound() {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <NotFoundPage />
    </BaseLayout>
  );
}
