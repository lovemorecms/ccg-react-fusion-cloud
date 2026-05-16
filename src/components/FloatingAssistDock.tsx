import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from 'react'

const WELCOME =
  "Hi! I'm here to help you with questions about CMS Hybrid Cloud. What would you like to know?"

const STUB_REPLY =
  'Thanks for your message. Full CMS Assistant responses will be available in a future update.'

type ChatMessage = { id: string; role: 'assistant' | 'user'; text: string }

function ChatBubbleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3C7.03 3 3 6.58 3 11c0 2.39 1.08 4.53 2.78 6.02L4 21l4.26-1.11C9.53 20.7 10.74 21 12 21c4.97 0 9-3.58 9-8s-4.03-8-9-8z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

function IconRestart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 12a8 8 0 0113.657-5.657M20 12a8 8 0 01-13.657 5.657M4 12H1m19 0h-3M4 12l2-2m15 2l-2-2"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconChevronUp() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconSend() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
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
  const [showScrollTop, setShowScrollTop] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  const scrollToTop = useCallback(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }, [])

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 360)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!chatOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setChatOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [chatOpen])

  useEffect(() => {
    if (!chatOpen || !listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [chatOpen, messages])

  function resetChat() {
    setMessages([{ id: `welcome-${Date.now()}`, role: 'assistant', text: WELCOME }])
    setInput('')
  }

  function sendMessage(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    const userId = `u-${Date.now()}`
    setMessages((m) => [...m, { id: userId, role: 'user', text }])
    setInput('')
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: 'assistant', text: STUB_REPLY }])
    }, 450)
  }

  return (
    <div className="fusion-float-dock">
      {showScrollTop ? (
        <button type="button" className="fusion-float-dock__scroll-top" onClick={scrollToTop} aria-label="Scroll to top">
          <IconChevronUp />
        </button>
      ) : null}

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
              <div className="fusion-chat-panel__header-text">
                <h2 className="fusion-chat-panel__title">CMS Assistant</h2>
                <p className="fusion-chat-panel__subtitle">Ask me about CMS Hybrid Cloud.</p>
              </div>
              <div className="fusion-chat-panel__header-actions">
                <button type="button" className="fusion-chat-panel__icon-btn" onClick={resetChat} aria-label="Restart chat">
                  <IconRestart />
                </button>
                <button
                  type="button"
                  className="fusion-chat-panel__icon-btn"
                  onClick={() => setChatOpen(false)}
                  aria-label="Close CMS Assistant"
                >
                  <IconClose />
                </button>
              </div>
            </header>
            <div ref={listRef} className="fusion-chat-panel__body" tabIndex={-1}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`fusion-chat-panel__bubble fusion-chat-panel__bubble--${msg.role}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <form className="fusion-chat-panel__footer" onSubmit={sendMessage}>
              <label htmlFor="fusion-chat-input" className="fusion-chat-panel__input-label">
                Message
              </label>
              <div className="fusion-chat-panel__input-row">
                <input
                  id="fusion-chat-input"
                  type="text"
                  className="fusion-chat-panel__input"
                  placeholder="Type your message…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoComplete="off"
                />
                <button type="submit" className="fusion-chat-panel__send" aria-label="Send message">
                  <IconSend />
                </button>
              </div>
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
          <span className="fusion-chat-fab__icon">
            <ChatBubbleIcon />
          </span>
        </button>
      </div>
    </div>
  )
}
