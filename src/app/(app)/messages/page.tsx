"use client";

import { useState } from "react";
import { Send, Search, Store } from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const DM_THREADS = [
  {
    id: "t1",
    handle: "wrapsbyalex",
    avatar: "W",
    preview: "Yo, what wrap did you use on the Supra?",
    time: "3m",
    unread: 2,
    type: "user" as const,
  },
  {
    id: "t2",
    handle: "driftking",
    avatar: "D",
    preview: "Bro that build is crazy. How long did it take?",
    time: "1h",
    unread: 0,
    type: "user" as const,
  },
  {
    id: "t3",
    handle: "carbonwerks",
    avatar: "C",
    preview: "Thanks for booking! See you next Tuesday.",
    time: "2h",
    unread: 1,
    type: "shop" as const,
  },
  {
    id: "t4",
    handle: "euroboy",
    avatar: "E",
    preview: "That Nardo Gray is a totally different finish.",
    time: "5h",
    unread: 0,
    type: "user" as const,
  },
  {
    id: "t5",
    handle: "WrapsByAlex Shop",
    avatar: "W",
    preview: "Your quote for the M4 Chrome Delete is ready — $1,200.",
    time: "1d",
    unread: 1,
    type: "shop" as const,
  },
  {
    id: "t6",
    handle: "jdm.wraps",
    avatar: "J",
    preview: "Dude the fitment on your GR86 is so clean",
    time: "2d",
    unread: 0,
    type: "user" as const,
  },
];

const MOCK_MESSAGES: Record<string, { id: string; from: "me" | "them"; text: string; time: string }[]> = {
  t1: [
    { id: "m1", from: "them", text: "Yo, what wrap did you use on the Supra?", time: "3m" },
    { id: "m2", from: "them", text: "That color looks insane in person", time: "3m" },
  ],
  t2: [
    { id: "m1", from: "them", text: "Bro that build is crazy. How long did it take?", time: "1h" },
    { id: "m2", from: "me", text: "About 3 days total. Alex did the wrap in 2 days, then wheels were same-day.", time: "58m" },
    { id: "m3", from: "them", text: "Worth every penny. What did you pay for the full setup?", time: "55m" },
    { id: "m4", from: "me", text: "Wrap was $2,400, wheels were $3,200. PPF on the front was $800.", time: "50m" },
  ],
  t3: [
    { id: "m1", from: "me", text: "Hi, I booked a slot for the M4 full PPF. Any prep needed on my end?", time: "2h" },
    { id: "m2", from: "them", text: "Thanks for booking! See you next Tuesday.", time: "2h" },
    { id: "m3", from: "them", text: "Just make sure the car is clean — we'll wash and decontaminate before install.", time: "2h" },
  ],
  t4: [
    { id: "m1", from: "them", text: "That Nardo Gray is a totally different finish.", time: "5h" },
    { id: "m2", from: "me", text: "It's 3M 1080 Matte Nardo. The matte shifts in sunlight, it's incredible.", time: "5h" },
  ],
  t5: [
    { id: "m1", from: "them", text: "Hi! I'm inquiring about a Chrome Delete for my M4.", time: "2d" },
    { id: "m2", from: "me", text: "Great! For the M4, full chrome delete including grille, mirrors, trim strips. Our price is $1,200.", time: "2d" },
    { id: "m3", from: "them", text: "Your quote for the M4 Chrome Delete is ready — $1,200.", time: "1d" },
  ],
  t6: [
    { id: "m1", from: "them", text: "Dude the fitment on your GR86 is so clean", time: "2d" },
    { id: "m2", from: "me", text: "Thanks! Running Enkei RPF1 18x9.5 +38 with 245/40 Michelin PS4S", time: "2d" },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<"dms" | "shops">("dms");
  const [selectedThread, setSelectedThread] = useState<string | null>("t2");
  const [inputValue, setInputValue] = useState("");

  const dmThreads = DM_THREADS.filter(t => t.type === "user");
  const shopThreads = DM_THREADS.filter(t => t.type === "shop");
  const threads = activeTab === "dms" ? dmThreads : shopThreads;

  const activeThread = DM_THREADS.find(t => t.id === selectedThread);
  const messages = selectedThread ? (MOCK_MESSAGES[selectedThread] || []) : [];

  return (
    <div style={{
      background: "var(--color-bg)", height: "calc(100vh - 48px)",
      display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        position: "sticky", top: 0, zIndex: 30,
        height: 56, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px",
        background: "rgba(12,12,16,0.88)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(42,42,54,0.50)", flexShrink: 0,
      }}>
        <h1 style={{
          fontFamily: "var(--font-manrope, Manrope, sans-serif)",
          fontWeight: 900, fontSize: 22, color: "var(--color-text-primary)",
          letterSpacing: "-0.04em", margin: 0,
        }}>
          Messages
        </h1>
      </div>

      {/* Two-panel layout on desktop, stacked on mobile */}
      <div style={{ display: "flex", flex: 1, minHeight: 0, overflow: "hidden" }}>

        {/* Left: Thread list */}
        <div style={{
          width: "100%",
          maxWidth: 340,
          borderRight: "1px solid var(--color-border)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}>
          {/* Tabs */}
          <div style={{
            display: "flex",
            borderBottom: "1px solid var(--color-border)",
            flexShrink: 0,
          }}>
            {(["dms", "shops"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1, padding: "12px 4px", fontSize: 13, fontWeight: 700,
                  background: "none", border: "none", cursor: "pointer",
                  color: activeTab === tab ? "#44CCFF" : "var(--color-text-secondary)",
                  borderBottom: activeTab === tab ? "2px solid #44CCFF" : "2px solid transparent",
                  marginBottom: -1, transition: "all 0.15s",
                }}
              >
                {tab === "dms" ? "Direct" : "Shops"}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{
            padding: "12px 16px",
            flexShrink: 0,
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "var(--color-surface-elevated)",
              borderRadius: 999, padding: "8px 12px",
              border: "1px solid var(--color-border)",
            }}>
              <Search size={14} color="var(--color-text-tertiary)" />
              <input
                placeholder="Search messages..."
                style={{
                  background: "none", border: "none", outline: "none",
                  fontSize: 13, color: "var(--color-text-primary)", flex: 1,
                }}
              />
            </div>
          </div>

          {/* Thread list */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {threads.map(thread => (
              <button
                key={thread.id}
                onClick={() => setSelectedThread(thread.id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 16px",
                  background: selectedThread === thread.id ? "rgba(68,204,255,0.06)" : "none",
                  border: "none", cursor: "pointer", textAlign: "left",
                  borderLeft: selectedThread === thread.id ? "2px solid #44CCFF" : "2px solid transparent",
                } as React.CSSProperties}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
                  background: thread.type === "shop"
                    ? "linear-gradient(135deg, #34D39933, #34D39966)"
                    : "linear-gradient(135deg, #44CCFF33, #44CCFF66)",
                  border: `1.5px solid ${thread.type === "shop" ? "rgba(52,211,153,0.4)" : "rgba(68,204,255,0.4)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, fontWeight: 800,
                  color: thread.type === "shop" ? "#34D399" : "#44CCFF",
                  position: "relative",
                }}>
                  {thread.avatar}
                  {thread.type === "shop" && (
                    <div style={{
                      position: "absolute", bottom: -2, right: -2,
                      width: 16, height: 16, borderRadius: "50%",
                      background: "#34D399", border: "2px solid var(--color-bg)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Store size={8} color="#000" />
                    </div>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <p style={{
                      fontSize: 13, fontWeight: 700,
                      color: "var(--color-text-primary)", margin: 0,
                    }}>
                      @{thread.handle}
                    </p>
                    <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>{thread.time}</span>
                  </div>
                  <p style={{
                    fontSize: 12, color: "var(--color-text-secondary)", margin: 0,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {thread.preview}
                  </p>
                </div>
                {thread.unread > 0 && (
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%",
                    background: "#44CCFF", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 800, color: "#000",
                  }}>
                    {thread.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Active conversation */}
        {activeThread ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
            {/* Conversation header */}
            <div style={{
              padding: "14px 20px", borderBottom: "1px solid var(--color-border)",
              display: "flex", alignItems: "center", gap: 12, flexShrink: 0,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "linear-gradient(135deg, #44CCFF33, #44CCFF66)",
                border: "1.5px solid rgba(68,204,255,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 800, color: "#44CCFF",
              }}>
                {activeThread.avatar}
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text-primary)", margin: 0 }}>
                  @{activeThread.handle}
                </p>
                <p style={{ fontSize: 11, color: "#34D399", margin: 0 }}>Online</p>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 8px", display: "flex", flexDirection: "column", gap: 10 }}>
              {messages.map(msg => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    justifyContent: msg.from === "me" ? "flex-end" : "flex-start",
                  }}
                >
                  <div style={{
                    maxWidth: "72%",
                    padding: "10px 14px",
                    borderRadius: msg.from === "me" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: msg.from === "me" ? "#44CCFF" : "var(--color-surface)",
                    border: msg.from === "me" ? "none" : "1px solid var(--color-border)",
                    color: msg.from === "me" ? "#0C0C10" : "var(--color-text-primary)",
                    fontSize: 14,
                    lineHeight: 1.5,
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{
              padding: "12px 20px 20px", borderTop: "1px solid var(--color-border)",
              display: "flex", gap: 10, alignItems: "flex-end", flexShrink: 0,
            }}>
              <input
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Send a message..."
                style={{
                  flex: 1, minHeight: 44, padding: "10px 14px",
                  background: "var(--color-surface-elevated)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 22, color: "var(--color-text-primary)",
                  fontSize: 14, outline: "none", resize: "none",
                }}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); setInputValue(""); } }}
              />
              <button
                onClick={() => setInputValue("")}
                style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: inputValue.trim() ? "#44CCFF" : "var(--color-surface-elevated)",
                  border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "background 0.15s",
                }}
              >
                <Send size={18} color={inputValue.trim() ? "#0C0C10" : "var(--color-text-tertiary)"} />
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--color-text-tertiary)", fontSize: 14,
          }}>
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
