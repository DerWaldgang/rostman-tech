import { type NextRequest, NextResponse } from 'next/server';

export const withdrawals = new Map<string, { id: string; status: string; amount: number; destination: string }>();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { amount, destination, idempotency_key } = body;

  if (!amount || !destination || !idempotency_key) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  for (const w of withdrawals.values()) {
    if ((w as typeof w & { idempotency_key: string }).idempotency_key === idempotency_key) {
      return NextResponse.json(w, { status: 409 });
    }
  }

  const id = crypto.randomUUID();
  const withdrawal = { id, status: 'pending', amount, destination, idempotency_key };
  withdrawals.set(id, withdrawal);

  await new Promise((r) => setTimeout(r, 600));

  return NextResponse.json({ id, status: 'pending' }, { status: 201 });
}
