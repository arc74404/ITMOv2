Черновая спека Логики: «Daily Bonus»

Контекст: Нет бэкенда. Логика — это доменная функция/сервис в TypeScript, которая управляет правилами бонуса и хранением в localStorage.

API сервиса (черновик):
- eligibility(): { eligible: boolean, nextResetAtISO: string }
- claim():
  - Успех: { reward: number, balanceAfter: number, nextResetAtISO: string }
  - Ошибки:
    - already_claimed_today → 400
    - storage_unavailable → 503
  - Формат ошибок: { error: string, details?: object }

Правила:
- Можно клеймить 1 раз в сутки (UTC). Награда фиксированная: 50.
- Дата последнего клейма хранится в localStorage.

Открытые вопросы:
- Имена полей: eligible vs canClaim, reward vs amount.
- Формат ошибок: { error } vs { code, message }.
