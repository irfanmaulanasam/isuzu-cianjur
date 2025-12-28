'use client'
import { MessageCircle } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { matchIntent, matchShortFaq } from '@/src/utils/faqMatch'
import { useChatNotifications } from '@/hooks/useChatNotification'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const [hasGreeted, setHasGreeted] = useState(false)
  const [unread, setUnread] = useState(0);
  const renderText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = text.split(urlRegex)
    return parts.map((part, i) =>
      urlRegex.test(part) ? (
        <a key={i} href={part} target="_blank" rel="noreferrer" className="text-blue-700 underline">
          {part}
        </a>
      ) : (
        <span key={i}>{part}</span>
      )
    )
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }


  // panggil hook notifikasi title
  useChatNotifications({ unreadCount: unread });

  // contoh: setiap pesan baru masuk
  const handleIncomingMessage = (msg) => {
    setMessages(prev => [...prev, msg]);
    if (document.visibilityState === 'hidden') {
      setUnread(prev => prev + 1);
    }
  };

  // reset unread kalau user balik ke tab ini
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setUnread(0);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);
  useEffect(() => {
    if (!isOpen || hasGreeted) return

    setMessages([
      { type: 'bot', 
        text: 'Halo, mau dibantu apa? Bisa tanya kredit, biaya kepemilikan, stok, atau servis.' }
    ])
    setHasGreeted(true)
  }, [isOpen, hasGreeted])


  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userText = input.trim()
    setMessages(prev => [...prev, { type: 'user', text: userText }])

    const intentMatch = matchIntent(userText)
    const shortMatch = matchShortFaq(userText)

    let reply
    if (intentMatch) {
      reply = intentMatch.answer + (intentMatch.cta_url
        ? `\n\n👉 ${intentMatch.cta_label}: ${intentMatch.cta_url}`
        : '')
    } else if (shortMatch) {
      reply = shortMatch.a
    } else {
      reply = 'Maaf, saya belum paham. Coba tanya tentang kredit, harga, servis, sparepart, atau biaya kepemilikan.'
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: reply }])
    }, 2400)

    setInput('')
  }


  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-8 bg-blue-800 text-white rounded-sm shadow-lg hover:bg-blue-900 z-50 flex items-center justify-center text-2xl"
      >
        <MessageCircle />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-sm shadow-2xl border flex flex-col z-50">
          <div className="p-4 border-b bg-blue-800 text-white">
            <h3>FAQ Bot</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="float-right text-white"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 ${msg.type === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-2 max-w-xs ${msg.type === 'user'
                    ? 'bg-blue-700 text-white ml-auto'
                    : 'bg-slate-100'
                  }`}>
                  {renderText(msg.text)}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanya assistant kami..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none"
              />
              <button type="submit" className="px-4 py-2 bg-blue-800 text-white rounded-lg">
                Send
              </button>
            </div>
          </form>
        </div>
      )}
      {isOpen && messages.length === 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {['Simulasi kredit', 'Hitung biaya kepemilikan', 'Cek stok unit', 'Servis berkala'].map((s, i) => (
            <button
              key={i}
              onClick={() => setInput(s)}
              className="px-2 py-1 text-xs bg-slate-100 rounded-full"
            >
              {s}
            </button>
          ))}
        </div>
      )}

    </>
  )
}