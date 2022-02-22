import {useEffect, useState} from "react";
import parse from "html-react-parser";

type ParsedElement = string | JSX.Element | JSX.Element[]

function useMediaWikiPage(apiURL: string, title: string) {
    const [redirectedTitle, setRedirectedTitle] = useState("");
    const [pageElement, setPageElement] = useState<ParsedElement>("");

    const fetchPageHTML = async (apiURL: string, title: string): Promise<string> => {
        const apiURLParams = new URLSearchParams({
            action: "parse",
            prop: "text",
            formatversion: "2",
            format: "json",
            origin: "*",
            redirects: "true",
            page: title,
        })

        const response = await fetch(`${apiURL}?${apiURLParams.toString()}`)
        const responseJSON = await response.json()
        const HTMLString = responseJSON.parse.text;
        return HTMLString
    }

    const fetchRedirectedTitle = async (apiURL: string, title: string): Promise<string> => {
        //TODO: Redirect先のTitleを取得する
        return title
    }

    useEffect(() => {
        fetchPageHTML(apiURL, title).then(HTMLString => {
            const pageElement = parse(HTMLString)
            setPageElement(pageElement)
        })
        fetchRedirectedTitle(apiURL, title).then(redirectedTitle => {
            setRedirectedTitle(redirectedTitle)
        })
    }, [apiURL, title]);

    const tagLine = "" //TODO: apiURLからTaglineを取得する

    return [pageElement, redirectedTitle, tagLine]
}

export default useMediaWikiPage;