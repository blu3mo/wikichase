import {MouseEventHandler, useEffect, useState} from "react";
import parse, {attributesToProps, DOMNode, domToReact, Element} from "html-react-parser";
import {Props} from "html-react-parser/lib/attributes-to-props";

type ParsedElement = string | JSX.Element | JSX.Element[]

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

function useMediaWikiPage(apiURL: string, title: string, onLinkClick: MouseEventHandler) {
    const [pageElement, setPageElement] = useState<ParsedElement>("");
    const [redirectedTitle, setRedirectedTitle] = useState("");
    const [tagLine, setTagLine] = useState("");

    const checkIfLinkNode = (props: Props) => {
        if (props.className === "mw-redirect") {
            return true
        }
        return props.className === undefined && props.id === undefined && props.title !== undefined
    }

    useEffect(() => {
        fetchPageHTML(apiURL, title).then(HTMLString => {
            const pageElement = parse(HTMLString, {
                replace: (node: DOMNode) => {
                    if (node instanceof Element) {
                        const props = attributesToProps(node.attribs);
                        switch (node.name) {
                            case "a":
                                const isLinkNode = checkIfLinkNode(props)
                                return (
                                    <a {...props} onClick={ isLinkNode ? onLinkClick : undefined} >
                                        { domToReact(node.children) }
                                    </a>
                                )
                            case "div":
                                //const props = attributesToProps(node.attribs);
                                //if (props.class === "")
                                if (props.className === "mw-parser-output") {
                                    const childNodes = node.childNodes
                                    const titleIndex = childNodes.findIndex((childNode) => {
                                        if (childNode instanceof Element) {
                                            return (childNode.name === "h2") //節タイトルであればtrue
                                        }
                                        return false
                                    })
                                    console.log(titleIndex)
                                    //console.log(node)
                                    console.log(node.children)
                                    const newChildNodes = childNodes.map((childNode, i) => {
                                        if (i < titleIndex) {
                                            return childNode
                                        } else {
                                            if (childNode instanceof Element) {
                                                childNode.attribs.className = "transparent"
                                            }
                                            return childNode
                                        }
                                    })
                                    console.log(node.childNodes)
                                    return (
                                        <div {...props} >
                                            { domToReact(newChildNodes as DOMNode[]) }
                                        </div>
                                    )
                                }
                        }
                    }
                }
            })
            setPageElement(pageElement)
        })
        fetchRedirectedTitle(apiURL, title).then(redirectedTitle => {
            setRedirectedTitle(redirectedTitle)
        })
        //TODO: apiURLからTaglineを取得する
        setTagLine("出典: フリー百科事典『ウィキペディア（Wikipedia）』")
    }, [apiURL, title]);


    return [pageElement, redirectedTitle, tagLine]
}

export default useMediaWikiPage;