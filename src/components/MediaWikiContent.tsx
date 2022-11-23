import React, {createElement, MouseEventHandler, useEffect, useState} from "react";
import useMediaWikiPage from "../hooks/useMediaWikiPage";

type Props = {
    apiURL: string;
    title: string;
    onLinkClick: MouseEventHandler<HTMLAnchorElement>;
    hideBottomContent: boolean;
}

function MediaWikiContent(props: Props) {

    const [pageElement, redirectedTitle, tagLine] = useMediaWikiPage(props.apiURL, props.title, props.onLinkClick, props.hideBottomContent);

    return (
        <>
            {pageElement !== "" ? pageElement : "Loading..."};
        </>
    )

}

export default MediaWikiContent;

