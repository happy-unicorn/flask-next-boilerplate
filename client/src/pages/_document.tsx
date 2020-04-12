import React from 'react';
import Document, { DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class ExtendedDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const styleSheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => appProps => styleSheet.collectStyles(<App {...appProps} />),
            });
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {styleSheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            styleSheet.seal();
        }
    }
}