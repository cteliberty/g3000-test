import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import '~sass/main.scss';

export type LayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

const LocaleLayout = async (props: Readonly<LayoutProps>) => {
  const {
    children,
    params: { locale },
  } = props;
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
