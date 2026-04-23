# Typografie-tokens

Alle tekstgroottes op de site worden centraal beheerd via **CSS custom properties** in [`globals.css`](../src/app/globals.css).

## Tokens aanpassen

Open [`src/app/globals.css`](../src/app/globals.css) en zoek het `:root` blok. Daar vind je de typografie-tokens:

```css
:root {
  /* Typografie-tokens — pas hier de tekstgroottes centraal aan */
  --font-size-label: 0.875rem;    /* 14px — labels, tags, kleine tekst */
  --font-size-body: 1rem;         /* 16px — beschrijvingen, subtitels, body */
  --font-size-lead: 1.125rem;     /* 18px — intro-tekst, langere paragrafen */
}
```

Pas de waarden aan en sla op — de site wordt automatisch bijgewerkt.

## Overzicht

| Token               | Standaard   | px   | Gebruik                          | Utility class   |
|----------------------|-------------|------|----------------------------------|-----------------|
| `--font-size-label`  | `0.875rem`  | 14px | Labels, tags, kleine tekst       | `text-label`    |
| `--font-size-body`   | `1rem`      | 16px | Beschrijvingen, subtitels, body  | `text-body`     |
| `--font-size-lead`   | `1.125rem`  | 18px | Intro-tekst, langere paragrafen  | `text-lead`     |

## Hoe het werkt

De tokens zijn CSS custom properties gedefinieerd in `:root`. De bijbehorende utility-klassen (`text-label`, `text-body`, `text-lead`) zijn gedefinieerd met `@utility` directives in [`globals.css`](../src/app/globals.css) en gebruiken `var(--font-size-*)` om de waarde uit `:root` te lezen.

Dit betekent:
- **Eén plek** om alle tekstgroottes aan te passen
- **Geen performance-impact** — CSS custom properties worden native door de browser opgelost
- **Direct zichtbaar** — wijzigingen zijn meteen zichtbaar na opslaan (in dev mode)

## Bestanden die deze tokens gebruiken

- [`src/components/home/Hero.tsx`](../src/components/home/Hero.tsx)
- [`src/components/home/ImpactTracker.tsx`](../src/components/home/ImpactTracker.tsx)
- [`src/components/home/CrowdfundingProgress.tsx`](../src/components/home/CrowdfundingProgress.tsx)
- [`src/components/home/InteractiveMap.tsx`](../src/components/home/InteractiveMap.tsx)
- [`src/components/layout/Footer.tsx`](../src/components/layout/Footer.tsx)
- [`src/components/layout/Navbar.tsx`](../src/components/layout/Navbar.tsx)
- [`src/app/adopteer/page.tsx`](../src/app/adopteer/page.tsx)
- [`src/app/adopteer/success/page.tsx`](../src/app/adopteer/success/page.tsx)
- [`src/app/verhaal/page.tsx`](../src/app/verhaal/page.tsx)
- [`src/app/over-ons/page.tsx`](../src/app/over-ons/page.tsx)
- [`src/app/methode/page.tsx`](../src/app/methode/page.tsx)
- [`src/app/community/page.tsx`](../src/app/community/page.tsx)
- [`src/app/kaart/page.tsx`](../src/app/kaart/page.tsx)
- [`src/app/dashboard/page.tsx`](../src/app/dashboard/page.tsx)

## Rem vs px

De tokens gebruiken `rem` eenheden, niet `px`. Dit is belangrijk omdat:
- `rem` zich aanpast aan de browser's font-size instelling
- Gebruikers die hun browser tekst groter hebben ingesteld zien de tekst automatisch meegroeien
- `1rem` = 16px in de meeste browsers (standaard instelling)

Omrekenen: `px ÷ 16 = rem` — bijv. `18px = 1.125rem`
