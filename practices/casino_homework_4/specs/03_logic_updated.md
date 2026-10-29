Логика-спека после согласования: «Daily Bonus»

Сервисный контракт:
- getEligibility(): Promise<{ eligible: boolean; nextResetAtISO: string }>
- claimDailyBonus(): Promise<{ amount: number; balance: number; nextResetAtISO: string }>
  - Ошибки реджектом с { code: string, message: string }

Политика:
- amount: 50
- Один клейм в сутки по UTC; хранение в localStorage с ключом 'luckyspin.bonus.v1'
