import React, {createElement, useEffect, useState} from "react";
import parse from "html-react-parser"
import {create} from "domain";
import "./wikipedia.css"
import MediaWikiPage from "./MediaWikiPage";

function WikipediaPage(props: { lang: string, title: string }) {
    return (
        <>
            <MediaWikiPage
                apiURL={`https://${props.lang}.wikipedia.org/w/api.php`}
                title={props.title}
            />
        </>
    );
}

export default WikipediaPage;

