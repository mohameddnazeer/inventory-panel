"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-white border border-gray-200 fixed bottom-0 py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm text-black">       
        جهاز مستقبل مصر للتنمية المستدامة فرع نظم المعلومات | جميع الحقوق محفوظة - &copy; {new Date().getFullYear()}  
        </p>
      </div>
    </footer>
  );
}
