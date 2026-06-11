import { getCountryByCode } from '@/lib/api';
import { NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ code: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { code } = await params;
  const country = await getCountryByCode(code);

  if (!country) {
    return NextResponse.json({ error: 'Country not found' }, { status: 404 });
  }

  return NextResponse.json(country);
}
