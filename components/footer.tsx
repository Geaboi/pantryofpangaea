export default function Footer() {
    return (
        <div className="h-12 w-screen px-3 bg-slate-400 dark:bg-slate-900 flex flex-row justify-start items-center space-x-3">
            <p className="h-6 px-2 rounded-lg bg-slate-300 dark:bg-slate-800 text-slate-800 dark:text-slate-300 text-center align-middle">(C) 2024 Chefs of Pangaea</p>
            <p className="h-6 px-2 rounded-lg bg-slate-300 dark:bg-slate-800 text-slate-800 dark:text-slate-300 text-center align-middle">Powered by Next.js and Supabase</p>
        </div>
    );
}