import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import htmlescape from 'htmlescape';
import config from 'config';
import React from 'react';
import ConfigManager from 'utils/configManager';

const { googleMapsApiKey } = new ConfigManager().getConfig();

class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                __CONFIG__ = ${htmlescape(config)}
              `,
            }}
          />
          <script
            type="text/javascript"
            src={`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&v=3.exp&libraries=geometry,drawing,places`}
          />
          <script src="/static/config/web.config.js" type="text/javascript" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
