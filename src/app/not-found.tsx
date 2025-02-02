import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center px-6 py-20 h-screen text-center">
      <div className="flex flex-col justify-start items-start text-start gap-1 lg:gap-3">
        <h1 className="text-green-800 text-[128px] leading-none font-black">
          404
        </h1>
        <span className="text-start text-2xl lg:text-5xl font-bold">
          Không tìm thấy trang
        </span>
        <p className="">
          Có vẻ bạn đang cố truy cập một địa chỉ không tồn tại hoặc đã được xóa.
        </p>
        <Link
          href="/"
          className="text-2xl px-6 py-2 mt-3 lg:mt-9 border-2 border-slate-300 text-green-800 rounded-xl"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
