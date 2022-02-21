import React, {createElement, useEffect, useState} from "react";
import parse from "html-react-parser"

function MediaWikiPage(props: { apiURL: string, title: string}) {
    const [content, setContent] = useState(parse(""));

    const fetchPageHTML = async (apiUrl: string, title: string): Promise<string> => {
        const apiURLParams = new URLSearchParams({
            action: "parse",
            prop: "text",
            formatversion: "2",
            format: "json",
            origin: "*",
            page: props.title,
        })

        const response = await fetch(`${apiUrl}?${apiURLParams.toString()}`)
        const responseJSON = await response.json()
        const HTMLString = responseJSON.parse.text;
        return HTMLString
    }

    useEffect(() => {
        fetchPageHTML(props.apiURL, props.title).then(HTMLString => {
            const reactDOM = parse(HTMLString)
            setContent(reactDOM)
        })
    }, [props.apiURL, props.title]);

    return (
        <>
            {content}
        </>
    );
}

export default MediaWikiPage;

