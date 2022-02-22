import React, {createElement, useEffect, useState} from "react";
import "./MediaWikiPage.css"
import useMediaWikiPage from "../hooks/useMediaWikiPage";

function MediaWikiPage(props: { apiURL: string, title: string}) {

    const [pageElement, redirectedTitle, tagLine] = useMediaWikiPage(props.apiURL, props.title);

    return (
        <>
            <h1 id="firstHeading" className="firstHeading mw-first-heading">{props.title}</h1>
            <div id="bodyContent" className="vector-body">
                <div id="siteSub" className="noprint">{"出典: フリー百科事典『ウィキペディア（Wikipedia）』"/*tagLine*/}</div>
                <div id="contentSub"></div>
                <div id="contentSub2"></div>
                <div id="mw-content-text" className="mw-body-content mw-content-ltr" lang="ja" dir="ltr">
                    {pageElement !== "" ? pageElement : "Loading..."}
                </div>
            </div>
        </>
    );

}

export default MediaWikiPage;

