import React, { useState, useEffect } from "react";
import { Client } from "@xmtp/xmtp-js";
import { ethers } from "ethers";

export function FloatingInbox({
  wallet,
  env,
  isPWA = false,
  onLogout,
  isContained = false,
  isConsent = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnNetwork, setIsOnNetwork] = useState(false);
  const [client, setClient] = useState();
  const [isConnected, setIsConnected] = useState(false);

  return (
    <>
      {!isPWA && !isContained && (
        <div
          onClick={isOpen ? closeWidget : openWidget}
          className={
            "FloatingInbox " +
            (isOpen ? "spin-clockwise" : "spin-counter-clockwise")
          }
          style={styles.FloatingLogo}
        >
          💬
        </div>
      )}
      {isOpen && (
        <div
          style={styles.uContainer}
          className={" " + (isOnNetwork ? "expanded" : "")}
        >
          {isConnected && (
            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          )}
          {isConnected && isOnNetwork && (
            <div style={styles.widgetHeader}>
              <div style={styles.conversationHeader}>
                {isOnNetwork && selectedConversation && (
                  <button
                    style={styles.backButton}
                    onClick={() => {
                      setSelectedConversation(null);
                    }}
                  >
                    ←
                  </button>
                )}
                <h4 style={styles.conversationHeaderH4}>Conversations</h4>
              </div>
            </div>
          )}
          {isConnected}
          <div style={styles.widgetContent}>
            {!isConnected && (
              <div style={styles.xmtpContainer}>
                <button style={styles.btnXmtp} onClick={connectWallet}>
                  Connect Wallet
                </button>
                <div style={styles.label} onClick={createNewWallet}>
                  or create new one
                </div>
              </div>
            )}
            {isConnected && !isOnNetwork && (
              <div style={styles.xmtpContainer}>
                <button style={styles.btnXmtp} onClick={initXmtpWithKeys}>
                  Connect to XMTP
                </button>
                {isWalletCreated && (
                  <button style={styles.label}>
                    Your addess: {signer.address}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
