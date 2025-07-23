import Footer from "@/footer/Footer";
import RulesViewer from "./RulesViewer";

export default function RulesPage() {
  return (
    <div className="grid items-center justify-items-center w-full p-2 pb-0 font-[family-name:var(--font-geist-sans)] h-full">
      <main className="flex flex-col gap-[32px] row-start-2 w-full items-center sm:items-start">
        <RulesViewer />
      </main>
      <Footer />
    </div>
  );
}
