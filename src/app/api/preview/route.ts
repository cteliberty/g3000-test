import { redirect } from 'next/navigation';
import { draftMode } from 'next/headers';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const secret = process.env.NEXT_CMS_DATOCMS_PREVIEW_SECRET;
  const path = searchParams.get('path');

  if (secret && searchParams.get('secret') !== secret) {
    return new Response('Invalid token', {
      status: 401,
    });
  }

  if (!path) {
    return new Response('Invalid Path', {
      status: 401,
    });
  }

  // Enable Draft Mode by setting the cookies
  draftMode().enable();

  redirect(path);
};
