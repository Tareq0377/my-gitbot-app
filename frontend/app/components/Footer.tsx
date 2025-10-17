'use client'
import { useEffect, useState } from "react";


const STUDENT_NAME = "Md Tariqul Alam Khandaker";
const STUDENT_NUMBER = "21396516";


export default function Footer() {
  const [currentDate, setCurrentDate] = useState('');
  const [currentYear, setCurrentYear] = useState(0);

      useEffect(() => {
        setCurrentYear(new Date().getFullYear());
        setCurrentDate(new Date().toLocaleDateString())
      }, []);
  return (
    <footer className="bg-gray-700 dark:bg-gray-100 text-gray-50 dark:text-gray-700 py-4 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-sm flex justify-between">
        <span>&copy; {currentYear} {STUDENT_NAME} — {STUDENT_NUMBER}</span>
        <span>Date: {currentDate}</span>
      </div>
    </footer>
  );
}