import { NextResponse } from "next/server";

const API_DOMAIN = "https://deisishop.pythonanywhere.com";
const BUY_URL = `${API_DOMAIN}/buy`;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await fetch(BUY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text();

    try {
      const json = JSON.parse(text);
      return NextResponse.json(json, { status: res.status });
    } catch {
      return new NextResponse(text, { status: res.status });
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Erro no servidor ao processar compra", detail: String(err) },
      { status: 500 }
    );
  }
}
