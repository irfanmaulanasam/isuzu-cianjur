// import { faqIntents, faqPairs } from '@/src/data/chatFaq/data'
import faqIntents from '@/src/data/chatFaq/faq-intens'
import faqPairs from '@/src/data/chatFaq/faq-pairs'

export function matchIntent(userInput) {
  const text = userInput.toLowerCase()

  let best = null
  let bestScore = 0

  for (const intent of faqIntents) {
    let score = 0
    for (const pattern of intent.question_patterns) {
      if (text.includes(pattern.toLowerCase())) score++
    }
    if (score > bestScore) {
      bestScore = score
      best = intent
    }
  }

  // Minimal 1 pattern ketemu
  return bestScore > 0 ? best : null
}

export function matchShortFaq(userInput) {
  const text = userInput.toLowerCase()
  return (
    faqPairs.find(f => text.includes(f.q.toLowerCase().replace('?', ''))) ||
    null
  )
}
