import { Skeleton } from "antd";
import React, { FC } from "react";
import type { IAceEditorProps } from 'react-ace';
import ReactAce from "react-ace/lib/ace";
import { metadataCodeCompleter } from './codeCompleter';

const aceBaseUrl = 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.13/src-noconflict';

export interface ICodeEditorProps extends IAceEditorProps {
    aceBaseUrl?: string;
}

const AceEditorLazy = React.lazy<typeof ReactAce>(() => new Promise(async resolve => {
    const reactAce = await import("react-ace");

    console.log('configure ace');

    // prevent warning in console about misspelled props name.
    await import("ace-builds/src-noconflict/ext-language_tools");

    // import your theme/mode here. <AceEditor mode="javascript" theme="monokai" />
    await import("ace-builds/src-noconflict/mode-javascript");
    await import("ace-builds/src-noconflict/theme-monokai");

    let ace = require("ace-builds/src-noconflict/ace");
    ace.config.set(
        "basePath",
        aceBaseUrl
    );
    ace.config.setModuleUrl(
        "ace/mode/javascript_worker",
        `${aceBaseUrl}/worker-javascript.js`
    );

    // register completer
    var langTools = ace.require("ace/ext/language_tools");

    langTools.addCompleter(metadataCodeCompleter);

    resolve(reactAce);
}));

export const CodeEditor: FC<ICodeEditorProps> = (props) => {
    const isSSR = typeof window === 'undefined';

    const { aceBaseUrl, ...restProps } = props;

    if (isSSR)
        return <CodeEditorFallback />;

    return (
        <React.Suspense fallback={<CodeEditorFallback />}>
            <AceEditorLazy 
                mode="javascript" 
                theme="monokai" 
                {...restProps}
            />
        </React.Suspense>
    )
}

const CodeEditorFallback: FC = () => {
    return (
        <Skeleton.Input active={true} />
    );
}

export default CodeEditor;