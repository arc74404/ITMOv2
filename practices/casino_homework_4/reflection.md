# Reflection

Что зашло
Чёткие рамки из AGENTS.md (две фичи, без бэкенда) — меньше лишних решений от нейронки.
Подход TDD: сначала тесты на бонус и спин, потом код.
Разделение логики и UI: ядро легко тестировать, интерфейс простой.
SDD-рефлексия по фиче «Daily Bonus»

Что согласовали:
- Контракт сервиса: getEligibility() → { eligible, nextResetAtISO }, claimDailyBonus() → { amount, balance, nextResetAtISO }.
- Формат ошибок реджектом: { code, message }.

Расхождения из черновиков:
- UI предлагал canClaim/nextResetIso, Логика — eligible/nextResetAtISO и reward/balanceAfter. Привели к единым именам.
- Формат ошибок { error, details? } заменили на { code, message } для единообразия с UI.

Чему научились:
- При SDD имена полей и формат ошибок — главные источники расхождения. Фиксация «общего контракта» до кода экономит время.
