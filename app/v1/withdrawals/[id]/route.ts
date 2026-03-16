import { type NextRequest, NextResponse } from 'next/server';
import { withdrawals } from '@/app/v1/withdrawals/route';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const withdrawal = withdrawals.get(id);

  if (!withdrawal) {
    return NextResponse.json({ message: 'Withdrawal not found' }, { status: 404 });
  }

  const updated = { ...withdrawal, status: 'confirmed' };
  withdrawals.set(id, updated);

  return NextResponse.json({ id: updated.id, status: updated.status });
}
