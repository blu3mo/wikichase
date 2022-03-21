import React, {createElement, MouseEventHandler, useEffect, useState} from "react";
import "./MediaWikiPage.css"
import useMediaWikiPage from "../hooks/useMediaWikiPage";

type Props = {
    apiURL: string;
    title: string;
    onLinkClick: MouseEventHandler<HTMLAnchorElement>;
}

function MediaWikiPage(props: Props) {

    const [pageElement, redirectedTitle, tagLine] = useMediaWikiPage(props.apiURL, props.title, props.onLinkClick);

    return (
        <div className="mediaWikiPage">
            <h1 id="firstHeading" className="firstHeading mw-first-heading">{props.title}</h1>
            <div id="bodyContent" className="vector-body">
                <div id="siteSub" className="noprint">{tagLine}</div>
                <div id="contentSub"></div>
                <div id="contentSub2"></div>
                <div id="mw-content-text" className="mw-body-content mw-content-ltr" lang="ja" dir="ltr">
                    {pageElement !== "" ? pageElement : "Loading..."}
                </div>
            </div>
        </div>
    );

}

export default MediaWikiPage;

