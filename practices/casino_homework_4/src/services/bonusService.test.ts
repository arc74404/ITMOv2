import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getEligibility, claimDailyBonus } from './bonusService'
import { useBalance } from '../store/balance'

function setLastClaim(iso: string | null) {
  if (iso === null) localStorage.removeItem('luckyspin.bonus.v1')
  else localStorage.setItem('luckyspin.bonus.v1', iso)
}

describe('bonusService', () => {
  beforeEach(() => {
    localStorage.clear()
    useBalance.setState({ balance: 1000, history: [] })
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('eligibility true when never claimed', async () => {
    setLastClaim(null)
    const e = await getEligibility()
    expect(e.eligible).toBe(true)
  })

  it('claim success increases balance by 50 and disables further claims', async () => {
    setLastClaim(null)
    const before = useBalance.getState().balance
    const res = await claimDailyBonus()
    expect(res.amount).toBe(50)
    expect(res.balance).toBe(before + 50)
    // Second claim should fail
    await expect(claimDailyBonus()).rejects.toMatchObject({ code: 'already_claimed_today' })
  })
})
