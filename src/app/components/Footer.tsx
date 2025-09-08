// components/Footer.tsx
'use client'
import { format } from "date-fns";

const STUDENT_NAME = "Your Name";
const STUDENT_NUMBER = "1234";

export default function Footer() {
  const today = format(new Date(), "yyyy-MM-dd");
  return (
    <footer className="p-4 text-sm" role="contentinfo">
      <div>&copy; {new Date().getFullYear()} {STUDENT_NAME} — {STUDENT_NUMBER}</div>
      <div>Date: {today}</div>
    </footer>
  );
}
