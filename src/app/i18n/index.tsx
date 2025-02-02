import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          select_language: "Select Language",
          search_placeholder: "What are you looking for?",
          search_title: "Search for products",
          search_history: "Search History",
          clear_history: "Clear all",
          form_submit: "Submit",
          form_success: "Successfully",
          form_error: "Something went wrong",
        },
      },
      vi: {
        translation: {
          select_language: "Chọn ngôn ngữ",
          search_placeholder: "Bạn đang tìm sản phẩm gì?",
          search_title: "Tìm kiếm sản phẩm",
          search_history: "Lịch sử tìm kiếm",
          clear_history: "Xóa tất cả",
          form_submit: "Gửi thông tin",
          form_success: "Thành công",
          form_error: "Đã có lỗi xảy ra",
        },
      },
    },
    lng: "vi",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
