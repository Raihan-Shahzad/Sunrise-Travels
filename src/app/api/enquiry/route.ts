import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.email || !body.phone || !body.type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to SQLite via Prisma
    const enquiry = await prisma.enquiry.create({
      data: {
        type: body.type,
        name: body.name,
        email: body.email,
        phone: body.phone,
        data: JSON.stringify(body.data || {}),
      },
    });

    return NextResponse.json({ success: true, id: enquiry.id }, { status: 201 });
  } catch (error) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
