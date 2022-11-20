import MediaWikiPage from "./MediaWikiPage";
import React, {MouseEventHandler, useEffect} from "react";

type Props = {
    lang: string;
    title: string;
    onLinkClick: MouseEventHandler<HTMLAnchorElement>;
    hideBottomContent: boolean;
}

function WikipediaPage(props: Props) {
    return (
        <>
            <link rel={"stylesheet"} type={"text/css"} href={"https://ja.wikipedia.org/w/load.php?modules=site.styles&only=styles&skin=vector"}/>
            <MediaWikiPage
                apiURL={`https://${props.lang}.wikipedia.org/w/api.php`}
                title={props.title}
                onLinkClick={props.onLinkClick}
                hideBottomContent={props.hideBottomContent}
            />
        </>
    );
}

export default WikipediaPage;

