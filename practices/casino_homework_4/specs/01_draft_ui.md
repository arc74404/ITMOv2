Черновая спека UI: Фича «Daily Bonus»

Контекст: LuckySpin — фронтенд-проект без бэкенда. Для SDD симулируем контракт между UI (команда фронта) и Логикой (команда ядра/сервисов).

UI ожидания (черновик):
- Экран/виджет: DailyBonus
  - Показ «Next reset: <локальное время>».
  - Кнопка: активна, если можно забрать бонус сейчас.
  - При клике «Claim»: вызвать метод сервиса claimDailyBonus().
- Ожидаемый контракт сервиса (черновик):
  - getEligibility(): { canClaim: boolean, nextResetIso: string }
  - claimDailyBonus():
    - Успех: { amount: number, balance: number, nextResetIso: string }
    - Ошибка: { code: string, message: string }

Открытые вопросы:
- Имена полей: canClaim vs eligible, nextResetIso vs nextResetAtISO, amount vs reward, balance vs balanceAfter.
- Формат ошибок: { code, message } либо { error, details? }.
