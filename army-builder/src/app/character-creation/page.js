import CharacterCreation from "@/character-creation/CharacterCreation";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center w-full p-2 pb-0 font-[family-name:var(--font-geist-sans)] h-full">
      <main className="flex flex-col gap-[32px] row-start-2 w-full items-center sm:items-start">
        <CharacterCreation />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Route Links Placeholder
      </footer>
    </div>
  );
}
