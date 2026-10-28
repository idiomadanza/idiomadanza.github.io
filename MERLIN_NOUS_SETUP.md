# 🤖 Merlin auf Nous Research umstellen

> **Diese Anleitung beschreibt, wie du dauerhaft auf Nous Research Modelle wechselst.**

## ⚠️ Wichtiger Hinweis

Hermes-Modelle werden **konfigurationsseitig festgelegt**, nicht vom Assistenten im Chat selbst. Ich (Merlin) kann das Modell nicht eigenmächtig wechseln — du musst das Setup anpassen.

## 🎯 Option A: Über die Kommandozeile

### 1. Hermes-Status prüfen
```bash
hermes status
```

### 2. Modell wechseln (Beispiel)
```bash
hermes config set model nousresearch/hermes-3-llama-3.1-70b
# oder
hermes config set model nousresearch/hermes-3-llama-3.1-405b
```

### 3. Provider prüfen
Falls du nicht den Nous-Direkt-Provider nutzt, sondern OpenRouter:
```bash
hermes config set provider openrouter
hermes config set model nousresearch/hermes-3-llama-3.1-405b
```

### 4. Testen
Starte einen neuen Chat — der Header zeigt das aktive Modell.

---

## 🎯 Option B: Über die Config-Datei

Hermes-Konfiguration liegt meist unter:

| OS | Pfad |
|----|------|
| **macOS** | `~/.hermes/config.yaml` oder `~/.hermes/profiles/<name>/config.yaml` |

### Beispiel:
```yaml
provider: openrouter      # oder custom:nous
model: nousresearch/hermes-3-llama-3.1-70b
fallback_models:
  - nousresearch/hermes-3-mistral-24b-2025
```

---

## 🎯 Option C: Mit Hermes-Subscription

Falls du eine **Nous-Subscription** hast (selten für Endkunden):

```bash
hermes setup
# Folge dem Wizard → Provider "Nous Research" wählen
```

---

## 📋 Verfügbare Nous-Modelle (Stand 2026)

| Modell | Größe | Nutzen |
|--------|-------|--------|
| `hermes-3-llama-3.1-70b` | 70B | Gute Allrounder, schnell |
| `hermes-3-llama-3.1-405b` | 405B | Bestes Reasoning, langsamer |
| `hermes-3-mistral-24b` | 24B | Schnell, günstig |
| `hermes-4-405b` (falls verfügbar) | 405B | Neueste Generation |

---

## 🔧 Empfohlene Modelle je nach Use-Case

| Use-Case | Empfehlung |
|----------|------------|
| **Schnelle Code-Hilfe** | `hermes-3-mistral-24b` |
| **Tiefgreifende Analyse** | `hermes-3-llama-3.1-405b` |
| **Alltag (Default)** | `hermes-3-llama-3.1-70b` |

---

## ⚠️ Wichtige Hinweise

1. **Bestätige vorher:** Wechsel das Modell nur, wenn du weißt was du tust. Verschiedene Modelle haben unterschiedliche Stärken.

2. **API-Key:** Falls du einen direkten Nous-Provider nutzt, brauchst du einen API-Key von [portal.nousresearch.com](https://portal.nousresearch.com) oder nutzt OpenRouter als Vermittler.

3. **Kosten:** OpenRouter berechnet pro Token. 70B-Modelle sind günstiger als 405B.

4. **Session-Header:** Im aktuellen Chat wird das Modell oben angezeigt (`active model: ...`). Falls `minimax` weiter drinsteht, hat der Wechsel nicht gegriffen.

---

## 🆘 Hilfe

Bei Problemen:
```bash
hermes doctor
hermes logs
```

Falls etwas nicht klappt, kann ich gerne beim Debuggen helfen — aber das Modell muss **außerhalb dieses Chats** gewechselt werden.

---

**Stand:** 29.06.2026
**Maintainer:** Stephan Lopez / Merlin (KI)