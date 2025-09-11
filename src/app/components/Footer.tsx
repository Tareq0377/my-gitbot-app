'use client'
import { format } from "date-fns";


const STUDENT_NAME = "Md Tariqul Alam Khandaker";
const STUDENT_NUMBER = "21396516";


export default function Footer() {
  const today = format(new Date(), "yyyy-MM-dd");
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-4 mt-8">
      <div className="max-w-6xl mx-auto px-4 text-sm flex justify-between">
        <span>&copy; {new Date().getFullYear()} {STUDENT_NAME} — {STUDENT_NUMBER}</span>
        <span>Date: {today}</span>
      </div>
    </footer>
  );
}