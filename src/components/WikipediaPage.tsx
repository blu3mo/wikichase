import MediaWikiContent from "./MediaWikiContent";
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
            <link rel={"stylesheet"} type={"text/css"} href={`https://${props.lang}.m.wikipedia.org/w/load.php?lang=${props.lang}&modules=ext.cite.styles%7Cext.relatedArticles.styles%7Cext.wikimediaBadges%7Cmediawiki.hlist%7Cmediawiki.ui.button%2Cicon%7Cmobile.init.styles%7Cskins.minerva.amc.styles%7Cskins.minerva.base.styles%7Cskins.minerva.content.styles.images%7Cskins.minerva.icons.wikimedia%7Cskins.minerva.mainMenu.icons%2Cstyles&only=styles&skin=minerva`}/>
            <div className="mediaWikiPage">
                <div className="pre-content heading-holder">
                    <div className="page-heading">
                        <h1 id="firstHeading" className="firstHeading mw-first-heading"><span
                            className="mw-page-title-main">{props.title}</span></h1>
                    </div>
                    <nav className="page-actions-menu"></nav>
                </div>
                <div id="bodyContent" className="content">
                    <div id="mw-content-text" className="mw-body-content mw-content-ltr" lang="ja" dir="ltr">
                        <MediaWikiContent
                            apiURL={`https://${props.lang}.m.wikipedia.org/w/api.php`}
                            title={props.title}
                            onLinkClick={props.onLinkClick}
                            hideBottomContent={props.hideBottomContent}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default WikipediaPage;

