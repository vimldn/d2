import { NextResponse } from 'next/server';
import { prisma } from '@/db';

export async function GET() {
  const items = await prisma.domainDrop.findMany({
    orderBy: { dropTimeUtc: 'asc' },
    take: 200,
    select: { domainName: true, dropTimeUtc: true, status: true, backorders: { select: { id: true } } }
  });

  return NextResponse.json({
    items: items.map(i => ({ domainName: i.domainName, dropTimeUtc: i.dropTimeUtc, status: i.status, backordersCount: i.backorders.length }))
  });
}
