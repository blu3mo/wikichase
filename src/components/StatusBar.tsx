import React from "react";

type Props = {
    goalPage: string,
    cooldownRemaining: number,
    runnerCooldownDuration: number,
    isGameSet: boolean,
    runnerPages: string[],
    hunterPages: string[]
    isHunter: boolean
}

function StatusBar(props: Props) {
    const maskPageList = (pageList: string[]): string[] => {
        return pageList.map((page, index) => {
            if (index % 2 === 0) {
                return page
            } else {
                return "??"
            }
        })
    }

    return (
        <div className="statusBar">
            <p className={"bold"}>You are: {props.isHunter ? "Hunter 👮" : "Runner 🏃"}</p>
            <p className={"bold"}>{props.isHunter ?
                `Catch the runner in 0:00 min!`:
                `Go to ${props.goalPage} in 0:00 min before getting caught!`}</p>
            {!props.isHunter &&
              <>
                <p className={"bold"}>{props.cooldownRemaining === 0 ? "🟢 You can move!" : `⏳ Wait ${props.runnerCooldownDuration} sec before next move...`}</p>
                  {
                      (Math.ceil(props.cooldownRemaining * 2) === 0) ?
                          <br></br> :
                          <p className={"bold"}>{"|".repeat(Math.ceil(props.cooldownRemaining * 2))}</p>
                  }
              </>
            }
            {props.isGameSet &&
              <>
                <h3 className={"bold"}>🚨 GAME SET! 🚨</h3>
              </>
            }
            <p className={"playerLog"}>
                {"Runner Log: " + maskPageList(props.runnerPages).slice().reverse().join(" ← ")}
            </p>
            <p className={"playerLog"}>
                {"Hunter Log: " + props.hunterPages.slice().reverse().join(" ← ")}
            </p>
        </div>
    )
}

export default StatusBar