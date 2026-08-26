import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { CMS_CHAT_OPEN_EVENT } from '../cmsChat'

const WELCOME =
  "Hi, I'm your CMS Assistant. Ask me anything about CMS Cloud Fusion, explore services, or cloud operations."

const STUB_REPLY =
  'Thanks for your message. Full CMS Assistant responses will be available in a future update.'

const CHIPS = ['Get Started', 'PAM Access', 'FedRAMP', 'Cost & Billing']

type ChatMessage = { id: string; role: 'assistant' | 'user'; text: string }

function PersonAvatar({ size }: { size: 32 | 38 | 40 }) {
  return (
    <span className="fusion-chat-avatar" style={{ width: size, height: size }} aria-hidden>
      {size === 40 ? (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="14" r="8" fill="rgba(255,255,255,0.9)" />
          <path d="M4 40c0-8.837 7.163-16 16-16s16 7.163 16 16" fill="rgba(255,255,255,0.9)" />
        </svg>
      ) : size === 38 ? (
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
          <circle cx="19" cy="13" r="7.5" fill="rgba(255,255,255,0.92)" />
          <path d="M2 38c0-9.389 7.611-17 17-17s17 7.611 17 17" fill="rgba(255,255,255,0.92)" />
        </svg>
      ) : (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="11" r="6" fill="rgba(255,255,255,0.88)" />
          <path d="M2 32c0-7.732 6.268-14 14-14s14 6.268 14 14" fill="rgba(255,255,255,0.88)" />
        </svg>
      )}
    </span>
  )
}

function IconClose() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconSend() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChatBadgeIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M13 9a1.5 1.5 0 0 1-1.5 1.5H4L1 13V2.5A1.5 1.5 0 0 1 2.5 1h9A1.5 1.5 0 0 1 13 2.5V9z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function FloatingAssistDock() {
  const panelId = useId()
  const [chatOpen, setChatOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'assistant', text: WELCOME },
  ])
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hasUserMessage = messages.some((msg) => msg.role === 'user')
  const canSend = input.trim().length > 0

  useEffect(() => {
    function openFromApp() {
      setChatOpen(true)
    }
    window.addEventListener(CMS_CHAT_OPEN_EVENT, openFromApp)
    return () => {
      window.removeEventListener(CMS_CHAT_OPEN_EVENT, openFromApp)
    }
  }, [])

  useEffect(() => {
    if (!chatOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setChatOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const id = window.setTimeout(() => inputRef.current?.focus(), 40)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(id)
    }
  }, [chatOpen])

  useEffect(() => {
    if (!chatOpen || !listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [chatOpen, messages])

  function submitText(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: 'user', text: trimmed }])
    setInput('')
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: 'assistant', text: STUB_REPLY }])
    }, 450)
  }

  function sendMessage(e?: FormEvent) {
    e?.preventDefault()
    submitText(input)
  }

  const dock = (
    <div className="fusion-float-dock">
      <div className="fusion-float-dock__assist">
        {chatOpen ? (
          <div
            id={panelId}
            className="fusion-chat-panel"
            role="dialog"
            aria-modal="false"
            aria-label="CMS Assistant"
          >
            <header className="fusion-chat-panel__header">
              <PersonAvatar size={40} />
              <div className="fusion-chat-panel__header-text">
                <p className="fusion-chat-panel__title">CMS Assistant</p>
                <p className="fusion-chat-panel__status">
                  <span className="fusion-chat-panel__status-dot" aria-hidden />
                  Online
                </p>
              </div>
              <button
                type="button"
                className="fusion-chat-panel__icon-btn"
                onClick={() => setChatOpen(false)}
                aria-label="Close CMS Assistant"
              >
                <IconClose />
              </button>
            </header>

            <div ref={listRef} className="fusion-chat-panel__body" tabIndex={-1}>
              {messages.map((msg, index) =>
                msg.role === 'assistant' && index === 0 ? (
                  <div key={msg.id} className="fusion-chat-panel__greeting">
                    <PersonAvatar size={32} />
                    <div className="fusion-chat-panel__bubble fusion-chat-panel__bubble--assistant">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div
                    key={msg.id}
                    className={`fusion-chat-panel__bubble fusion-chat-panel__bubble--${msg.role}`}
                  >
                    {msg.text}
                  </div>
                ),
              )}

              {!hasUserMessage ? (
                <div className="fusion-chat-panel__chips">
                  {CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      className="fusion-chat-panel__chip"
                      onClick={() => setInput(chip)}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <form className="fusion-chat-panel__footer" onSubmit={sendMessage}>
              <label htmlFor="fusion-chat-input" className="fusion-chat-panel__input-label">
                Message
              </label>
              <div className="fusion-chat-panel__composer">
                <input
                  id="fusion-chat-input"
                  ref={inputRef}
                  type="text"
                  className="fusion-chat-panel__input"
                  placeholder="Ask me about CMS Cloud Fusion…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className={`fusion-chat-panel__send${canSend ? ' fusion-chat-panel__send--ready' : ''}`}
                  aria-label="Send message"
                  disabled={!canSend}
                >
                  <IconSend />
                </button>
              </div>
              <p className="fusion-chat-panel__powered">Powered by CMS Cloud Fusion AI</p>
            </form>
          </div>
        ) : null}

        <button
          type="button"
          className="fusion-chat-fab"
          aria-expanded={chatOpen}
          aria-controls={panelId}
          aria-label={chatOpen ? 'Close CMS Assistant' : 'Open CMS Assistant'}
          onClick={() => setChatOpen((o) => !o)}
        >
          <span className="fusion-chat-fab__person">
            <PersonAvatar size={38} />
            <span className="fusion-chat-fab__badge">
              <ChatBadgeIcon />
            </span>
          </span>
          <span className="fusion-chat-fab__copy">
            <span className="fusion-chat-fab__title">Need help?</span>
            <span className="fusion-chat-fab__sub">Let&rsquo;s chat</span>
          </span>
        </button>
      </div>
    </div>
  )

  return createPortal(dock, document.body)
}
