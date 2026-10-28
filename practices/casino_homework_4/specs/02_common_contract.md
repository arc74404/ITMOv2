Общий контракт: «Daily Bonus»

Решения по согласованию:
- Имена полей выравниваем между UI и Логикой.
  - Статус: { eligible: boolean, nextResetAtISO: string }
  - Успешный клейм: { amount: number, balance: number, nextResetAtISO: string }
- Формат ошибок для UI: { code: string, message: string }
  - already_claimed_today → { code: "already_claimed_today", message: "Bonus already claimed today" }
  - storage_unavailable → { code: "storage_unavailable", message: "Storage unavailable" }

Контракт сервиса (TypeScript):
- getEligibility(): Promise<{ eligible: boolean; nextResetAtISO: string }>
- claimDailyBonus(): Promise<{ amount: number; balance: number; nextResetAtISO: string }>
  - Ошибочные промисы реджектятся объектом { code: string, message: string }

Причины выбора:
- Используем те же имена, что и в core/bonus.ts (eligible, nextResetAtISO), чтобы исключить дублирование трансформаций.
- Ошибки { code, message } унифицированы под UI-паттерн отображения.
