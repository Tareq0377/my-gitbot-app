import { NextResponse } from "next/server";
import { execSync } from "child_process";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username } = body;

    if (!username || typeof username !== "string") {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    // Run git config command (server side)
    execSync(`git config --global user.name "${username}"`, { stdio: "pipe" });

    return NextResponse.json({
      message: `Git username set successfully to: ${username}`,
    });
  } catch (error: any) {
    console.error("Git command failed:", error.message);
    return NextResponse.json({ error: "Failed to set Git username" }, { status: 500 });
  }
}
