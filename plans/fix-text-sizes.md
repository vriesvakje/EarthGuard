# Plan: Tekstgroottes Vergroten - EarthGuard

## Probleem
De tekst op de site is vaak te klein, vooral de tekst onder titels. Dit maakt het moeilijk te lezen.

## Richtlijnen
- **Body/beschrijvingstekst**: minimaal `text-base` (16px) — was vaak `text-sm` (14px)
- **Labels/subtekst**: minimaal `text-sm` (14px) — was vaak `text-xs` (12px)
- **Extreem kleine tekst**: `text-[10px]` → `text-sm` (14px)
- **Uitzondering**: Badge-tekst, pill-labels en UI-elementen die bewust compact zijn blijven ongewijzigd

---

## Per Bestand

### 1. `src/components/home/Hero.tsx`
| Regel | Huidig | Nieuw | Context |
|-------|--------|-------|---------|
| 71 | `text-sm` | `text-base` | "van doel bereikt voor Brabant I" onder "0%" |

### 2. `src/components/home/ImpactTracker.tsx`
| Regel | Huidig | Nieuw | Context |
|-------|--------|-------|---------|
| 87 | `text-sm italic opacity-60` | `text-base italic opacity-70` | "Inclusief ons actieve dierenbeheer..." |
| 108 | `text-sm font-medium text-muted-foreground` | `text-base font-medium text-muted-foreground` | Stat labels: "Herstelde m²", "Aantal Bomen", etc. |

### 3. `src/components/home/CrowdfundingProgress.tsx`
| Regel | Huidig | Nieuw | Context |
|-------|--------|-------|---------|
| 50 | `text-sm opacity-80` | `text-base opacity-80` | "Doel: €10.000" |
| 53 | `text-sm font-medium` | `text-base font-medium` | "X% gefinancierd" / "Nog €X te gaan" |
| 86 | `text-xs font-medium opacity-70` | `text-sm font-medium opacity-70` | Stap-labels: "Aankoop", "Inrichting", etc. |

### 4. `src/components/home/InteractiveMap.tsx`
| Regel | Huidig | Nieuw | Context |
|-------|--------|-------|---------|
| 119 | `text-sm text-forest/60` | `text-base text-forest/60` | "Bekijk onze projectlocaties op de kaart pagina" |
| 128 | `text-xs font-bold uppercase` | `text-sm font-bold uppercase` | "Tilburg Project I" in map legend |
| 131 | `text-xs font-medium` | `text-sm font-medium` | Coördinaten in map legend |
| 158 | `text-sm opacity-60` | `text-base opacity-60` | Locatie subtekst bij geselecteerd plot |
| 164 | `text-sm font-bold` | `text-base font-bold` | "Voortgang herstel" label |
| 177 | `text-sm leading-relaxed opacity-80` | `text-base leading-relaxed opacity-80` | Plot beschrijving |
| 198 | `text-sm text-forest/40` | `text-base text-forest/40` | "Klik op een icoon op de kaart..." |

### 5. `src/components/layout/Footer.tsx`
| Regel | Huidig | Nieuw | Context |
|-------|--------|-------|---------|
| 14 | `text-sm opacity-80` | `text-base opacity-80` | Footer beschrijving |
| 26 | `text-sm opacity-80` | `text-base opacity-80` | Informatie links |
| 35 | `text-sm opacity-80` | `text-base opacity-80` | Contact info |
| 44 | `text-sm opacity-80` | `text-base opacity-80` | Legal links |
| 51 | `text-xs opacity-60` | `text-sm opacity-60` | Copyright regel |

### 6. `src/components/layout/Navbar.tsx`
| Regel | Huidig | Nieuw | Context |
|-------|--------|-------|---------|
| 67 | `text-sm font-medium` | `text-base font-medium` | Navigatie links |

### 7. `src/app/adopteer/page.tsx`
| Regel | Huidig | Nieuw | Context |
|-------|--------|-------|---------|
| 127 | `text-sm opacity-60` | `text-base opacity-60` | "Draag bij aan de aanleg van waterpartijen" |
| 144 | `text-sm opacity-60` | `text-base opacity-60` | "Hulpmiddelen voor dierenbeheer en nestkastjes" |
| 163 | `text-sm` | `text-base` | Samenvatting regels: "10m² Landbouwgrond" |
| 168 | `text-sm` | `text-base` | Extra donatie regel |
| 187 | `text-[10px]` | `text-sm` | "Betaal veilig via" |

### 8. `src/app/verhaal/page.tsx`
| Regel | Huidig | Nieuw | Context |
|-------|--------|-------|---------|
| 28 | `text-sm uppercase tracking-widest font-bold opacity-60` | `text-sm uppercase tracking-widest font-bold opacity-70` | "Ons Verhaal" label — blijft text-sm want het is een decoratief label |
| 44 | `text-sm uppercase tracking-widest font-bold text-forest/40` | ongewijzigd | "Hoofdstuk 1" label — decoratief, blijft |
| 144 | `text-forest/70 leading-relaxed` | `text-base text-forest/70 leading-relaxed` | Kaart-beschrijvingen — geen expliciete size, erft van body. Expliciet `text-base` toevoegen voor duidelijkheid |

### 9. `src/app/over-ons/page.tsx`
| Regel | Huidig | Nieuw | Context |
|-------|--------|-------|---------|
| 134 | `text-forest/70 leading-relaxed` | `text-base text-forest/70 leading-relaxed` | Waarom-beschrijvingen in kaarten |

### 10. `src/app/methode/page.tsx`
| Regel | Huidig | Nieuw | Context |
|-------|--------|-------|---------|
| 99 | `text-white/70 text-sm` | `text-white/80 text-base` | "Kale, gebarsten grond zonder leven" |
| 131 | `text-white/70 text-sm` | `text-white/80 text-base` | "Weelderige akker met klaver..." |
| 178 | `text-forest/70 leading-relaxed` | `text-base text-forest/70 leading-relaxed` | Beschrijving in probleem-kaarten |

### 11. `src/app/community/page.tsx`
| Regel | Huidig | Nieuw | Context |
|-------|--------|-------|---------|
| 393 | `text-sm font-medium text-forest/60` | `text-base font-medium text-forest/60` | Stat labels: "Actieve Guards", etc. |

### 12. `src/app/kaart/page.tsx`
| Regel | Huidig | Nieuw | Context |
|-------|--------|-------|---------|
| 254 | `text-xs font-bold` | `text-sm font-bold` | "Brabant I" marker label |
| 263 | `text-xs font-bold` | `text-sm font-bold` | "Brabant II" marker label |
| 272 | `text-xs font-bold` | `text-sm font-bold` | "Brabant III" marker label |
| 285 | `text-xs font-bold text-forest uppercase` | `text-sm font-bold text-forest uppercase` | "Legenda" titel |
| 289 | `text-xs text-forest/70` | `text-sm text-forest/70` | Legenda items |
| 293 | `text-xs text-forest/70` | `text-sm text-forest/70` | Legenda items |
| 297 | `text-xs text-forest/70` | `text-sm text-forest/70` | Legenda items |
| 304 | `text-xs font-bold text-forest uppercase` | `text-sm font-bold text-forest uppercase` | "Noord-Brabant" regio label |
| 309 | `text-sm text-forest/50 italic` | `text-base text-forest/50 italic` | "Boven: overzicht van..." |
| 359 | `text-sm font-bold` | `text-base font-bold` | "Voortgang" label |
| 364 | `text-xs text-forest/50` | `text-sm text-forest/50` | "€X opgehaald" / "Doel: €X" |
| 374 | `text-sm text-forest/50` | `text-base text-forest/50` | Locatie subtekst |
| 385 | `text-sm text-forest/70` | `text-base text-forest/70` | Feature items |

### 13. `src/app/dashboard/page.tsx`
| Regel | Huidig | Nieuw | Context |
|-------|--------|-------|---------|
| 127 | `opacity-60` | `text-base opacity-60` | "Hier is een overzicht van jouw persoonlijke impact" |
| 152 | `text-xs font-bold uppercase opacity-40` | `text-sm font-bold uppercase opacity-50` | Stat labels: "Mijn m²", "Bomen geplant", etc. |

---

## Samenvatting Wijzigingen

| Wijziging | Aantal voorkomens |
|-----------|-------------------|
| `text-xs` → `text-sm` | ~15 |
| `text-sm` → `text-base` | ~20 |
| `text-[10px]` → `text-sm` | 1 |
| Expliciet `text-base` toevoegen | ~5 |

## Wat NIET verandert
- Hoofdtitels: `text-4xl`, `text-5xl`, `text-6xl`, `text-7xl` — deze zijn goed
- Sectie-labels: `text-sm uppercase tracking-widest` — dit zijn decoratieve labels, bewust klein
- Badge-tekst en pill-labels in badges
- Button-tekst
- Card-titels: `text-xl`, `text-2xl`, `text-3xl` — deze zijn goed
