import React, {MouseEventHandler} from "react";

function useGame() {
    const [title, setTitle] = React.useState("Wikipedia");

    React.useEffect(() => {
    }, []);

    const putTasks = (items: string) => {
        setTitle(items)
    };

    return {title, setTitle};
}

export default useGame;