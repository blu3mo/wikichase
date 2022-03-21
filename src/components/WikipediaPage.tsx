import MediaWikiPage from "./MediaWikiPage";
import "./WikipediaPage.css";
import {MouseEventHandler} from "react";

type Props = {
    lang: string;
    title: string;
    onLinkClick: MouseEventHandler<HTMLAnchorElement>;
}

function WikipediaPage(props: Props) {
    return (
        <>
            <MediaWikiPage
                apiURL={`https://${props.lang}.wikipedia.org/w/api.php`}
                title={props.title}
                onLinkClick={props.onLinkClick}
            />
        </>
    );
}

export default WikipediaPage;

