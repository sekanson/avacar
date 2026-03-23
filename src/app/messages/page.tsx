"use client";

import { useState } from "react";
import { ArrowLeft, Send, MessageCircle } from "lucide-react";
import type { DMConversation } from "@/types";

const ME = "me";

const mockDMs: DMConversation[] = [
  {
    id: "dm1",
    user: { id: "u1", username: "wrapsbyalex", avatar: "https://i.pravatar.cc/150?u=wrapsbyalex" },
    lastMessage: "Yeah the satin ceramic is 3M 1080 series, the S12 in Charcoal",
    lastMessageAt: "2026-03-23T16:00:00Z",
    unread: 2,
    messages: [
      { id: "m1", senderId: "u1", text: "Hey! Saw your post about the M4 build — that satin black is insane", createdAt: "2026-03-23T14:00:00Z", read: true },
      { id: "m2", senderId: ME, text: "Thanks! It's 3M 2080 S12 Satin Black. About 3 weeks now and still loving it", createdAt: "2026-03-23T14:05:00Z", read: true },
      { id: "m3", senderId: "u1", text: "What installer did you use? I'm shopping around right now", createdAt: "2026-03-23T14:10:00Z", read: true },
      { id: "m4", senderId: ME, text: "Elite Wraps LA — Mike there is super meticulous. Not the cheapest but worth it", createdAt: "2026-03-23T14:15:00Z", read: true },
      { id: "m5", senderId: "u1", text: "Nice. Did you do PPF under the wrap too?", createdAt: "2026-03-23T15:50:00Z", read: false },
      { id: "m6", senderId: "u1", text: "Yeah the satin ceramic is 3M 1080 series, the S12 in Charcoal", createdAt: "2026-03-23T16:00:00Z", read: false },
    ],
  },
  {
    id: "dm2",
    user: { id: "u9", username: "gta.wraps", avatar: "https://i.pravatar.cc/150?u=gta.wraps" },
    lastMessage: "Book by end of week and I'll hold that slot for you",
    lastMessageAt: "2026-03-23T13:00:00Z",
    unread: 1,
    messages: [
      { id: "m7", senderId: ME, text: "Hey, saw your Porsche 911 post. Do you do PPF installs in Mississauga?", createdAt: "2026-03-23T10:00:00Z", read: true },
      { id: "m8", senderId: "u9", text: "We're actually in North York but we do clients from all over GTA. What car?", createdAt: "2026-03-23T10:30:00Z", read: true },
      { id: "m9", senderId: ME, text: "2024 M3 Competition. Thinking full body XPEL Ultimate Plus", createdAt: "2026-03-23T10:35:00Z", read: true },
      { id: "m10", senderId: "u9", text: "That's our most popular job right now. Looking at around $4,200–$4,800 depending on trim complexity", createdAt: "2026-03-23T11:00:00Z", read: true },
      { id: "m11", senderId: ME, text: "What's the earliest available slot?", createdAt: "2026-03-23T11:05:00Z", read: true },
      { id: "m12", senderId: "u9", text: "Book by end of week and I'll hold that slot for you", createdAt: "2026-03-23T13:00:00Z", read: false },
    ],
  },
  {
    id: "dm3",
    user: { id: "u2", username: "tint.daily", avatar: "https://i.pravatar.cc/150?u=tint.daily" },
    lastMessage: "Ceramic tint is 100% worth the premium over dyed. Night and day difference",
    lastMessageAt: "2026-03-22T20:00:00Z",
    unread: 0,
    messages: [
      { id: "m13", senderId: ME, text: "Quick question — ceramic vs regular dyed tint. Worth the extra cost?", createdAt: "2026-03-22T18:00:00Z", read: true },
      { id: "m14", senderId: "u2", text: "Every time. Dyed tint fades within 2-3 years. Ceramic keeps its colour and actually blocks heat", createdAt: "2026-03-22T18:30:00Z", read: true },
      { id: "m15", senderId: ME, text: "How much more expensive are we talking?", createdAt: "2026-03-22T18:35:00Z", read: true },
      { id: "m16", senderId: "u2", text: "Usually $150–$300 more for a full car. When you're paying $400-600 total, worth it", createdAt: "2026-03-22T19:00:00Z", read: true },
      { id: "m17", senderId: "u2", text: "Ceramic tint is 100% worth the premium over dyed. Night and day difference", createdAt: "2026-03-22T20:00:00Z", read: true },
    ],
  },
  {
    id: "dm4",
    user: { id: "u6", username: "chromedelete_co", avatar: "https://i.pravatar.cc/150?u=chromedelete_co" },
    lastMessage: "The whole process takes about 4–6 hours depending on trim detail",
    lastMessageAt: "2026-03-21T17:00:00Z",
    unread: 0,
    messages: [
      { id: "m18", senderId: ME, text: "Hey love the chrome delete posts. Does it work on a white E90?", createdAt: "2026-03-21T14:00:00Z", read: true },
      { id: "m19", senderId: "u6", text: "Absolutely. White + gloss black delete is actually one of the cleanest combos", createdAt: "2026-03-21T14:30:00Z", read: true },
      { id: "m20", senderId: ME, text: "Do you do it with vinyl or plasti-dip?", createdAt: "2026-03-21T14:35:00Z", read: true },
      { id: "m21", senderId: "u6", text: "Always vinyl. Plasti-dip is temporary and peels. Vinyl is a proper install with 5-7 year durability", createdAt: "2026-03-21T15:00:00Z", read: true },
      { id: "m22", senderId: "u6", text: "The whole process takes about 4–6 hours depending on trim detail", createdAt: "2026-03-21T17:00:00Z", read: true },
    ],
  },
  {
    id: "dm5",
    user: { id: "u11", username: "shop.talks", avatar: "https://i.pravatar.cc/150?u=shop.talks" },
    lastMessage: "Come in Thursday and I'll show you samples in person",
    lastMessageAt: "2026-03-20T16:00:00Z",
    unread: 0,
    messages: [
      { id: "m23", senderId: ME, text: "Hi, I saw your Supra build. Can you help me choose between satin and matte for my GTI?", createdAt: "2026-03-20T10:00:00Z", read: true },
      { id: "m24", senderId: "u11", text: "Depends on your colour choice honestly. What colour are you leaning towards?", createdAt: "2026-03-20T10:30:00Z", read: true },
      { id: "m25", senderId: ME, text: "Something in the blue/grey spectrum. Dark steel or a midnight blue maybe", createdAt: "2026-03-20T10:35:00Z", read: true },
      { id: "m26", senderId: "u11", text: "For those tones, satin typically gives more depth. Matte can look a bit flat on darker blues", createdAt: "2026-03-20T11:00:00Z", read: true },
      { id: "m27", senderId: "u11", text: "Come in Thursday and I'll show you samples in person", createdAt: "2026-03-20T16:00:00Z", read: true },
    ],
  },
  {
    id: "dm6",
    user: { id: "u15", username: "wrapkings.to", avatar: "https://i.pravatar.cc/150?u=wrapkings.to" },
    lastMessage: "Starting at $2,800 for a compact, $3,400 for a full-size",
    lastMessageAt: "2026-03-19T15:00:00Z",
    unread: 0,
    messages: [
      { id: "m28", senderId: ME, text: "What's your pricing for a full wrap?", createdAt: "2026-03-19T14:00:00Z", read: true },
      { id: "m29", senderId: "u15", text: "Starting at $2,800 for a compact, $3,400 for a full-size", createdAt: "2026-03-19T15:00:00Z", read: true },
    ],
  },
];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
}

function ConversationList({
  convos,
  activeId,
  onSelect,
}: {
  convos: DMConversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {convos.map((c) => {
        const isActive = c.id === activeId;
        return (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 20px",
              background: isActive ? "var(--primary-alpha-08)" : "transparent",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              transition: "background 0.15s",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "var(--surface-low)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 16,
                flexShrink: 0,
                position: "relative",
              }}
            >
              {c.user.username[0].toUpperCase()}
              {c.unread > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "#dc2626",
                    border: "2px solid var(--bg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 8,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {c.unread}
                </div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: c.unread > 0 ? 700 : 600,
                    color: "var(--on-surface)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.user.username}
                </span>
                <span style={{ fontSize: 11, color: "var(--muted)", flexShrink: 0, marginLeft: 8 }}>
                  {timeAgo(c.lastMessageAt)}
                </span>
              </div>
              <span
                style={{
                  fontSize: 12,
                  color: c.unread > 0 ? "var(--on-surface-variant)" : "var(--muted)",
                  fontWeight: c.unread > 0 ? 500 : 400,
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {c.lastMessage}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function ChatView({
  convo,
  onBack,
}: {
  convo: DMConversation;
  onBack?: () => void;
}) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(convo.messages);

  const send = () => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        senderId: ME,
        text: text.trim(),
        createdAt: new Date().toISOString(),
        read: true,
      },
    ]);
    setText("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--bg)",
      }}
    >
      {/* Chat header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 16px",
          background: "var(--topbar-bg)",
          backdropFilter: "blur(12px)",
          boxShadow: "var(--topbar-shadow)",
          flexShrink: 0,
        }}
      >
        {onBack && (
          <button
            onClick={onBack}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              background: "var(--surface-low)",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <ArrowLeft size={20} color="var(--on-surface)" />
          </button>
        )}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "var(--primary-alpha-15)",
            color: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          {convo.user.username[0].toUpperCase()}
        </div>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--on-surface)" }}>
          {convo.user.username}
        </span>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 16px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {messages.map((msg) => {
          const isMine = msg.senderId === ME;
          return (
            <div
              key={msg.id}
              style={{
                display: "flex",
                justifyContent: isMine ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "72%",
                  padding: "10px 14px",
                  borderRadius: isMine ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: isMine ? "var(--primary)" : "var(--surface-card)",
                  color: isMine ? "var(--on-primary)" : "var(--on-surface)",
                  fontSize: 14,
                  lineHeight: 1.5,
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 16px",
          background: "var(--tabbar-bg)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
          flexShrink: 0,
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Message..."
          style={{
            flex: 1,
            fontSize: 14,
            color: "var(--on-surface)",
            background: "var(--surface-high, var(--surface-card))",
            borderRadius: 999,
            padding: "10px 16px",
            border: "none",
            outline: "none",
          }}
        />
        <button
          onClick={send}
          disabled={!text.trim()}
          aria-label="Send message"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: text.trim() ? "pointer" : "default",
            background: text.trim() ? "var(--primary)" : "var(--primary-alpha-15)",
          }}
        >
          <Send size={16} color={text.trim() ? "var(--on-primary)" : "var(--primary)"} />
        </button>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  const [activeConvoId, setActiveConvoId] = useState<string | null>(null);
  const [isMobileChat, setIsMobileChat] = useState(false);

  const activeConvo = mockDMs.find((c) => c.id === activeConvoId) ?? null;

  const handleSelect = (id: string) => {
    setActiveConvoId(id);
    setIsMobileChat(true);
  };

  const handleBack = () => {
    setIsMobileChat(false);
    setActiveConvoId(null);
  };

  const totalUnread = mockDMs.reduce((s, c) => s + c.unread, 0);

  return (
    <>
      {/* Mobile: show list or chat */}
      <div
        className="dm-mobile"
        style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--bg)" }}
      >
        {/* Mobile header */}
        {!isMobileChat && (
          <div
            style={{
              padding: "20px 20px 0",
              background: "var(--bg)",
              flexShrink: 0,
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--primary)",
                marginBottom: 4,
              }}
            >
              Inbox
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <h1
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "var(--on-surface)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                Messages
              </h1>
              {totalUnread > 0 && (
                <div
                  style={{
                    padding: "2px 8px",
                    borderRadius: 999,
                    background: "#dc2626",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {totalUnread}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile: conversation list */}
        {!isMobileChat && (
          <div style={{ flex: 1, overflowY: "auto" }}>
            <ConversationList
              convos={mockDMs}
              activeId={activeConvoId}
              onSelect={handleSelect}
            />
            {mockDMs.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "60px 20px",
                  gap: 12,
                }}
              >
                <MessageCircle size={40} color="var(--muted)" />
                <p style={{ fontSize: 14, color: "var(--muted)", textAlign: "center" }}>
                  No messages yet. Connect with builders!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Mobile: chat view (full-screen) */}
        {isMobileChat && activeConvo && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <ChatView convo={activeConvo} onBack={handleBack} />
          </div>
        )}
      </div>

      {/* Desktop: two-column layout */}
      <style>{`
        @media (min-width: 768px) {
          .dm-mobile { display: none !important; }
          .dm-desktop { display: flex !important; }
        }
        @media (max-width: 767px) {
          .dm-mobile { display: flex !important; }
          .dm-desktop { display: none !important; }
        }
      `}</style>

      <div
        className="dm-desktop"
        style={{
          display: "none",
          height: "100%",
          background: "var(--bg)",
          overflow: "hidden",
        }}
      >
        {/* Left: conversation list */}
        <div
          style={{
            width: 320,
            flexShrink: 0,
            borderRight: "1px solid var(--ghost-border)",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <div style={{ padding: "24px 20px 16px", flexShrink: 0 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--primary)",
                marginBottom: 4,
              }}
            >
              Inbox
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "var(--on-surface)",
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                Messages
              </h2>
              {totalUnread > 0 && (
                <div
                  style={{
                    padding: "2px 8px",
                    borderRadius: 999,
                    background: "#dc2626",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {totalUnread}
                </div>
              )}
            </div>
          </div>
          <ConversationList
            convos={mockDMs}
            activeId={activeConvoId}
            onSelect={setActiveConvoId}
          />
        </div>

        {/* Right: chat or empty state */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {activeConvo ? (
            <ChatView convo={activeConvo} />
          ) : (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                color: "var(--muted)",
              }}
            >
              <MessageCircle size={48} color="var(--muted)" />
              <p style={{ fontSize: 15, fontWeight: 500 }}>Select a conversation</p>
              <p style={{ fontSize: 13, color: "var(--outline)" }}>
                Connect with builders and shops
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
