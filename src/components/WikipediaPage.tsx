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
            <link rel={"stylesheet"} type={"text/css"} href={"https://en.wikipedia.org/w/load.php?lang=en&modules=ext.cite.styles%7Cext.graph.styles%7Cext.tmh.player.styles%7Cext.uls.interlanguage%7Cext.visualEditor.desktopArticleTarget.noscript%7Cext.wikimediaBadges%7Cjquery.makeCollapsible.styles%7Cmediawiki.page.gallery.styles%7Cskins.vector.styles.legacy%7Cwikibase.client.init&only=styles&skin=vector"}/>
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

