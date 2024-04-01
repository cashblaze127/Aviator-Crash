import React, { useEffect, useState } from "react";
// import { useCrashContext } from "../Main/context";
import Context from "../../context";
import { SeedModal } from "../Main/seedModal";

const MyBets = () => {
  const { state, handleGetSeedOfRound } = React.useContext(Context);
  const [modal, setModal] = useState(false);
  // const [state] = useCrashContext();

  const handleGetSeed = async (flyDetailId) => {
    const result = await handleGetSeedOfRound(flyDetailId);
    console.log(result);
  }

  const displayDate = (num: number) => {
    let displayData = '';

    if (num === 0) {
      displayData = '00';
    } else if (num < 10) {
      displayData = `0${num}`
    } else {
      displayData = `${num}`;
    }

    return displayData;
  }

  return (
    <>
      <div className="legend px-2 d-flex align-items-center w-100">
        <div className="date">Date</div>
        <div className="d-flex w-100">
          <span className="bet">Bet, {`${state?.userInfo?.currency ? state?.userInfo?.currency : "INR"}`}</span>
          <span>X</span>
          <span className="cash-out">
            Cash out, {`${state?.userInfo?.currency ? state?.userInfo?.currency : "INR"}`}
          </span>
        </div>
        <div className="tools h-100"></div>
      </div>
      <div className="cdk-virtual-scroll-viewport scroll-y">
        <div className="cdk-virtual-scroll-content-wrapper">
          {state &&
            state.myBets.map((user, key) => (
              <div
                className={`bet-item pr-2 ${user.cashouted ? "celebrated" : ""
                  }`}
                key={key}
              >
                <div className="date">
                  {`${displayDate(new Date(user.createdAt).getHours())}:${displayDate(new Date(user.createdAt).getMinutes())}`}
                </div>
                <div className="bet">{Number(user.betAmount).toFixed(2)}</div>
                {user.cashouted ? (
                  <div className="multiplier-block">
                    <div
                      className={`bubble ${user.cashouted && "font-weight-bold"} opacity-${100 - 2 * key} ${Number(user.cashoutAt) < 2
                        ? "blue"
                        : Number(user.cashoutAt) < 10
                          ? "purple"
                          : "big"
                        }`}
                    >
                      {Number(user.cashoutAt).toFixed(2)}x
                    </div>
                  </div>
                ) : (
                  <div className="multiplier-block">
                    <div
                      className={`bubble opacity-${100 - 2 * key}}`}
                    >
                      {(user.flyAway).toFixed(2)}x
                    </div>
                  </div>
                )}
                <div className="cash-out">
                  {user.cashouted
                    ? Number(user.betAmount * user.cashoutAt).toFixed(2)
                    : ""}
                </div>
                <div className="tools">
                  <div onClick={() => handleGetSeed(user.flyDetailID)} className="fairness-i"></div>
                  <div className="share-i"></div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {modal && <SeedModal setModal={setModal} />}
    </>
  );
};

export default MyBets;
