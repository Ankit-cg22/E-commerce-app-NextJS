import { ServerStyleSheets } from '@material-ui/core';
import Document , {Html, Head, Main, NextScript} from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
    render(){
        return (
            <Html>
                <Head></Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}


MyDocument.getInitialProps = async (context) => {
    const sheets = new ServerStyleSheets();
    const originalRenderedPage = context.renderPage;
    context.renderPage = () => {
        return originalRenderedPage({
            enhanceApp: (App) =>  (props) =>sheets.collect(<App {...props} />),
        })
    };

    const initialProps = await Document.getInitialProps(context) ;
    return {
        ...initialProps,
        styles : [
            ...React.Children.toArray(initialProps.styles),
            sheets.getStyleElement(),
        ]
    }
}
