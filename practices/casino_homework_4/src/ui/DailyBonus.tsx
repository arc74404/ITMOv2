import { useEffect, useState } from 'react'
import { getEligibility, claimDailyBonus } from '../services/bonusService'
import { useBalance } from '../store/balance'

const BONUS_STORAGE_KEY = 'luckyspin.bonus.v1'

function loadLastClaim(): string | null {
  try { return localStorage.getItem(BONUS_STORAGE_KEY) } catch { return null }
}
function saveLastClaim(iso: string) {
  try { localStorage.setItem(BONUS_STORAGE_KEY, iso) } catch { /* ignore */ }
}

export function DailyBonus() {
  const { add } = useBalance()
  const [lastClaimedAtISO, setLastClaimedAtISO] = useState<string | null>(loadLastClaim())
  const [eligible, setEligible] = useState(false)
  const [nextResetAtISO, setNextResetAtISO] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await getEligibility()
        if (!cancelled) {
          setEligible(res.eligible)
          setNextResetAtISO(res.nextResetAtISO)
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Unexpected error')
      }
    })()
    return () => { cancelled = true }
  }, [lastClaimedAtISO])

  async function claim() {
    setError(null)
    if (!eligible) return
    try {
      const res = await claimDailyBonus()
      add(res.amount, 'bonus')
      setLastClaimedAtISO(new Date().toISOString())
      setEligible(false)
      setNextResetAtISO(res.nextResetAtISO)
    } catch (e: any) {
      const message = e?.message || 'Unexpected error'
      setError(message)
    }
  }

  return (
    <div className="space-y-3 p-4 bg-slate-900 border border-slate-700 rounded">
      <h2 className="text-xl font-semibold">Daily Bonus</h2>
      <div className="text-sm text-slate-400">Next reset: {new Date(nextResetAtISO).toLocaleString()}</div>
      {error && <div className="text-sm text-red-400">{error}</div>}
      <button
        onClick={claim}
        disabled={!eligible}
        className="px-3 py-2 rounded bg-primary text-primary-fg disabled:opacity-50"
      >
        {eligible ? 'Claim 50' : 'Come back later'}
      </button>
    </div>
  )
}
