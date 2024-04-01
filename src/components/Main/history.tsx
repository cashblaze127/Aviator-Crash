import React, { useEffect, useState } from "react";
import Context from "../../context";
import { SeedModal } from "./seedModal";

export default function History() {
  const { history, handleGetSeedOfRound } = React.useContext(Context);

  const [showHistory, setShowHistory] = React.useState(false);
  const [modal, setModal] = useState(false);
  const [seedDetails, setSeedDetails] = useState<any>();

  const handleGetSeed = async (flyDetailId) => {
    const result = await handleGetSeedOfRound(flyDetailId);
    if (result) {
      setSeedDetails(result);
      setModal(true);
    }
  }

  return (
    <div className="stats">
      <div className="payouts-wrapper">
        <div className="payouts-block">
          {!!history.length && history.map((item: any, key) => (
            <div key={key} className="payout" onClick={() => handleGetSeed(item.flyDetailID)}>
              <div className={`item opacity-${100 - 2 * key} ${Number(item.target) < 2 ? "blue" : Number(item.target) < 10 ? "purple" : "big"}`}>{Number(item.target).toFixed(2)}x</div>
            </div>
          ))}
        </div>
      </div>
      <div className="button-block" onClick={() => setShowHistory(!showHistory)}>
        <div className="button dropdown-toggle">
          <div className="trigger">
            <div className="history-icon"></div>
            <div className={`dd-icon ${showHistory ? "up" : ""}`}></div>
          </div>
        </div>
      </div>
      {!!showHistory && <div className="dropdown-menu">
        <div className="wrapper">
          <div className="header-2">
            <div> Round history </div>
          </div>
          <div className="payouts-block">
            {!!history.length && history.map((item: any, key) => (key < 123 &&
              <div key={key} className="payout" onClick={() => handleGetSeed(item.flyDetailID)}>
                <div className={`bubble-multiplier ${Number(item.target) < 2 ? "blue" : Number(item.target) < 10 ? "purple" : "big"}`}>{Number(item.target).toFixed(2)}x</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      }

      {modal && <SeedModal setModal={setModal} seedDetails={seedDetails} />}
    </div>
  );
}
