import { bonusEligibility } from '../core/bonus'
import { useBalance } from '../store/balance'

export interface EligibilityDTO { eligible: boolean; nextResetAtISO: string }
export interface ClaimDTO { amount: number; balance: number; nextResetAtISO: string }
export interface ErrorDTO { code: string; message: string }

const BONUS_STORAGE_KEY = 'luckyspin.bonus.v1'

function loadLastClaim(): string | null {
  try { return localStorage.getItem(BONUS_STORAGE_KEY) } catch { return null }
}
function saveLastClaim(iso: string) {
  try { localStorage.setItem(BONUS_STORAGE_KEY, iso) } catch { /* ignore */ }
}

export async function getEligibility(): Promise<EligibilityDTO> {
  const lastClaimedAtISO = loadLastClaim()
  const res = bonusEligibility({ lastClaimedAtISO })
  return { eligible: res.eligible, nextResetAtISO: res.nextResetAtISO }
}

export async function claimDailyBonus(): Promise<ClaimDTO> {
  const { eligible, nextResetAtISO } = await getEligibility()
  if (!eligible) {
    const err: ErrorDTO = { code: 'already_claimed_today', message: 'Bonus already claimed today' }
    return Promise.reject(err)
  }
  const amount = 50
  const now = new Date().toISOString()
  saveLastClaim(now)
  const current = useBalance.getState().balance
  const balance = current + amount
  return { amount, balance, nextResetAtISO }
}
