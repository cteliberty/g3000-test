import { draftMode } from 'next/headers';

export const GET = async () => {
  // Disable Draft Mode by setting the cookies
  draftMode().disable();

  return new Response('Draft mode is disable', {
    status: 200,
  });
};
