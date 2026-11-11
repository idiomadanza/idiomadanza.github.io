<!--
  Bitte die erste Zeile ausfüllen: sie verknüpft den PR mit dem Issue und schließt es beim Merge.
  Ohne "Closes #<nummer>" schlägt der CI-Step "Issue-Verknüpfung" fehl.
-->

Closes #

## Was ändert sich

<!-- Ein bis drei Sätze. Was ist danach anders als vorher? -->

## Warum

<!-- Befund oder Anlass, gern mit Issue-Nummer und Beleg (Messwert, Screenshot, Datei). -->

## Abnahmekriterium

<!-- Woran erkennt die QS, dass es erfüllt ist? Prüfbar formulieren, nicht "sieht gut aus". -->

## Risiko & Rollback

- **Risiko:** <!-- z. B. "betrifft alle Seiten", "nur eine Route", "keine --> 
- **Rollback:** Merge rückgängig (`git revert`) oder Netlify-Deploy-Historie

## Verifikation

- [ ] `npm run build` grün
- [ ] `node scripts/ci_check.mjs` bestanden
- [ ] Deploy-Preview in Desktop **und** Mobile angesehen
- [ ] Inhalte gegen `/opt/SecondBrain` geprüft (keine erfundenen Zahlen/Termine)
