import {MouseEventHandler, useEffect, useState} from "react";
import parse, {attributesToProps, DOMNode, domToReact, Element} from "html-react-parser";
import {Attributes, Props} from "html-react-parser/lib/attributes-to-props";

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

    const checkIfLinkNode = (attribs: Attributes) => {
        if (attribs.class === "mw-redirect") {
            return true
        }
        return attribs.class === undefined && attribs.id === undefined && attribs.title !== undefined
        //他Wikipediaページへの有効なリンクには、クラスやIDが付与されていない
    }

    useEffect(() => {
        fetchPageHTML(apiURL, title).then(HTMLString => {
            const pageElement = parse(HTMLString, {
                replace: (node: DOMNode) => {
                    if (node instanceof Element) {
                        if (node.name === "a") {
                            const isLinkNode = checkIfLinkNode(node.attribs)
                            const props = attributesToProps(node.attribs);
                            props.href = "javascript:void(0)"
                            return (
                                <a {...props} onClick={isLinkNode ? onLinkClick : undefined}>
                                    {domToReact(node.children)}
                                </a>
                            )
                        }
                        const parent = node.parent
                        if (parent instanceof Element) {
                            if (parent.attribs.class === "mw-parser-output") {
                                console.log(parent)
                                const titleIndex = parent.childNodes.findIndex((childNode) => {
                                    if (childNode instanceof Element) {
                                        return (childNode.name === "h2") //節タイトルであればtrue
                                    }
                                    return false
                                })
                                const nodeIndex = parent.childNodes.findIndex(childNode => childNode === node)
                                if (nodeIndex >= titleIndex) {
                                    node.attribs.class += " hiddenContent"
                                }
                                return node
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