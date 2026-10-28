UI-спека после согласования: «Daily Bonus»

Контракт сервиса, который вызывает UI:
- getEligibility(): Promise<{ eligible: boolean; nextResetAtISO: string }>
- claimDailyBonus(): Promise<{ amount: number; balance: number; nextResetAtISO: string }>
  - reject: { code: string, message: string }

UI-поведение:
- При монтировании виджета: вызвать getEligibility() и отрендерить кнопку активной/неактивной.
- При клике Claim:
  - вызвать claimDailyBonus()
  - при успехе: увеличить баланс на amount, обновить nextResetAtISO
  - при ошибке: показать message (toast/inline)
