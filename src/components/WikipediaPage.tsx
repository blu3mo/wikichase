import MediaWikiPage from "./MediaWikiPage";
import "./WikipediaPage.css";

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

