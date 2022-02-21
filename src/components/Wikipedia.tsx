import React, {createElement, useEffect, useState} from "react";
import parse from "html-react-parser"
import {create} from "domain";
import "./wikipedia.css"

function Wikipedia(props: { lang: string, title: string }) {
    const [content, setContent] = useState(parse("<p></p>"));

    const fetchPageHTML = async (lang: string, title: string): Promise<string> => {
        const apiURL = `https://${props.lang}.wikipedia.org/w/api.php?`
        const apiURLParams = new URLSearchParams({
            action: "parse",
            prop: "text",
            formatversion: "2",
            format: "json",
            origin: "*",
            page: props.title,
        })

        const response = await fetch(apiURL+apiURLParams.toString())
        const responseJSON = await response.json()
        const HTMLString = responseJSON.parse.text;
        return HTMLString
    }

    useEffect(() => {
        const apiURL = `https://${props.lang}.wikipedia.org/w/api.php?`
        const apiURLParams = new URLSearchParams({
            action: "parse",
            prop: "text",
            formatversion: "2",
            format: "json",
            origin: "*",
            page: props.title,
        })

        fetchPageHTML(props.lang, props.title).then(HTMLString => {
            const reactDOM = parse(HTMLString)
            setContent(reactDOM)
        })
    }, [props.lang, props.title]);

    return (
        <>
            {content}
        </>
    );
}

export default Wikipedia;

