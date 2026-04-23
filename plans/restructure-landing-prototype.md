# Earth Guard Restructuring Plan: Public Vision + Prototype Layers

## Problem Statement

The current Earth Guard app has no separation between **marketing/vision** and **prototype functionality**. The homepage (`/`) uses Supabase-dependent components that present data as if the system is live, which is misleading for an early-stage project. Additionally, the app **cannot build or run** without Supabase environment variables, making it fragile for demos and investor presentations.

## Current Architecture

```mermaid
graph TD
    A[/ Root Layout - Navbar + Footer] --> B[/ Homepage]
    A --> C[/dashboard]
    A --> D[/admin]
    A --> E[/verhaal, /over-ons, etc.]
    
    B --> F[Hero - no Supabase]
    B --> G[ImpactTracker - Supabase]
    B --> H[CrowdfundingProgress - Supabase]
    B --> I[InteractiveMap - Supabase + Google Maps]
    
    style G fill:#f66,stroke:#333
    style H fill:#f66,stroke:#333
    style I fill:#f66,stroke:#333
```

### Critical Issues Found

| Issue | File | Risk |
|-------|------|------|
| No env var fallbacks | `src/lib/supabase/browser.ts` | Build crash without env vars |
| No error handling | `src/middleware.ts` | Runtime crash without env vars |
| Supabase in Navbar | `src/components/layout/Navbar.tsx` | Homepage crash without env vars |
| Fake live data claim | `src/components/home/ImpactTracker.tsx:85` | Misleading - says Live data |
| No early-stage disclosure | Current homepage | Misleading for investors |

## Target Architecture

```mermaid
graph TD
    A[/ Root Layout - Navbar + Footer] --> B[/ NEW Landing Page - No Supabase]
    A --> C[/prototype - Existing Homepage Content]
    A --> D[/dashboard - Unchanged]
    A --> E[/admin - Unchanged]
    A --> F[/verhaal, /over-ons, etc. - Unchanged]
    
    B --> G[VisionHero - Mission + Early-Stage Badge]
    B --> H[VisionStory - Why Earth Guard]
    B --> I[VisionRoadmap - Timeline]
    B --> J[VisionCTA - Newsletter + Prototype Link]
    
    C --> K[PrototypeBanner - Experimental Label]
    C --> L[Hero - Existing]
    C --> M[ImpactTracker - Existing]
    C --> N[CrowdfundingProgress - Existing]
    C --> O[InteractiveMap - Existing]
    
    style G fill:#4a4,stroke:#333
    style H fill:#4a4,stroke:#333
    style I fill:#4a4,stroke:#333
    style J fill:#4a4,stroke:#333
    style K fill:#ff0,stroke:#333
```

## Route Map

| Route | Before | After | Notes |
|-------|--------|-------|-------|
| `/` | Supabase-dependent homepage | Clean vision landing page | No Supabase needed |
| `/prototype` | Does not exist | Current homepage content | Banner added: Experimental Prototype |
| `/dashboard` | User dashboard | Unchanged | Still requires auth |
| `/admin` | Admin panel | Unchanged | Still requires auth |
| `/adopteer` | Adoption flow | Unchanged | Still requires Stripe |
| `/verhaal` | Story page | Unchanged | — |
| `/login` | Login page | Unchanged | — |

---

## Phase 1: Build Safety — Make App Work Without Env Vars

This is the **highest priority** because the app currently crashes without Supabase env vars.

### 1.1 Add fallbacks to `src/lib/supabase/browser.ts`

```typescript
// BEFORE
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// AFTER
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
  );
}
```

### 1.2 Guard `src/middleware.ts` against missing env vars

Wrap the Supabase client creation in a try/catch. If env vars are missing, skip all auth logic and just pass through the response. This ensures the homepage and static pages work even without Supabase configured.

```typescript
export async function middleware(request: NextRequest) {
  // If Supabase env vars are missing, skip all auth logic
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next({ request });
  }
  
  // ... existing middleware logic unchanged
}
```

### 1.3 Make Navbar handle Supabase errors gracefully

The Navbar currently calls `createClient()` at the top level and `supabase.auth.getUser()` in a useEffect. If Supabase is unavailable, these calls will fail silently or throw. We need to wrap the auth logic in try/catch blocks so the Navbar renders even without Supabase.

---

## Phase 2: New Public/Vision Landing Page

Create a new homepage at `/` that tells the Earth Guard story honestly — no fake data, no Supabase dependency.

### New Components to Create

All in `src/components/landing/` — a new directory separate from `src/components/home/`.

#### 2.1 `VisionHero.tsx`
- Full-width hero section with background image (reuse `/achtergrond.png`)
- Headline: Mission statement about restoring biodiversity
- **Early-stage badge**: Clearly visible pill/badge saying *Early Stage Project* or *In Ontwikkeling*
- Two CTAs: *Support Our Mission* → newsletter, *See the Prototype* → `/prototype`
- No Supabase, no external images, no fake data

#### 2.2 `VisionStory.tsx`
- The problem: Biodiversity loss in Brabant
- The vision: Agroforestry as a solution
- Honest about current state: *We are building this*
- Uses existing design tokens (forest, beige, earth colors)

#### 2.3 `VisionRoadmap.tsx`
- Visual timeline showing project phases
- Phase 1: Concept & Research (current)
- Phase 2: First Land Purchase
- Phase 3: Implementation & Monitoring
- Phase 4: Scaling
- All phases are aspirational, not claimed as done

#### 2.4 `VisionCTA.tsx`
- Newsletter signup form (can use existing `src/app/api/newsletter/route.ts` or just a mailto link)
- Link to prototype: *Explore our prototype dashboard*
- Social links
- No Supabase required for rendering

### 2.5 Replace `src/app/page.tsx`

```typescript
// NEW src/app/page.tsx
import { VisionHero } from "@/components/landing/VisionHero";
import { VisionStory } from "@/components/landing/VisionStory";
import { VisionRoadmap } from "@/components/landing/VisionRoadmap";
import { VisionCTA } from "@/components/landing/VisionCTA";

export default function Home() {
  return (
    <>
      <VisionHero />
      <VisionStory />
      <VisionRoadmap />
      <VisionCTA />
    </>
  );
}
```

---

## Phase 3: Move Existing Homepage to `/prototype`

### 3.1 Create `src/app/prototype/page.tsx`

This is essentially the current `src/app/page.tsx` content, plus a prototype banner.

```typescript
import { PrototypeBanner } from "@/components/landing/PrototypeBanner";
import { Hero } from "@/components/home/Hero";
import { ImpactTracker } from "@/components/home/ImpactTracker";
import { CrowdfundingProgress } from "@/components/home/CrowdfundingProgress";
import { InteractiveMap } from "@/components/home/InteractiveMap";

export default function PrototypePage() {
  return (
    <>
      <PrototypeBanner />
      <Hero />
      <ImpactTracker />
      <CrowdfundingProgress />
      <InteractiveMap />
    </>
  );
}
```

### 3.2 Create `src/components/landing/PrototypeBanner.tsx`

A sticky or prominent banner at the top of the prototype page:

- Background: `bg-earth` or `bg-amber-100`
- Text: *Experimental Prototype — This dashboard uses simulated data and is not connected to live environmental systems.*
- Dismissible or always visible
- Links back to the main vision page

---

## Phase 4: Navigation Updates

### 4.1 Update Navbar links

Add a PROTOTYPE link to the `navLinks` array in `src/components/layout/Navbar.tsx`:

```typescript
const navLinks = [
  { href: "/verhaal", label: "ONS VERHAAL" },
  { href: "/over-ons", label: "OVER ONS" },
  { href: "/prototype", label: "PROTOTYPE" },  // NEW
  { href: "/kaart", label: "KAART & PROJECTEN" },
  { href: "/methode", label: "DE BODEM" },
  { href: "/community", label: "COMMUNITY" },
];
```

### 4.2 Update Navbar auth error handling

Wrap Supabase calls in try/catch so the Navbar renders even when Supabase is unavailable:

```typescript
useEffect(() => {
  const getUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  getUser();

  try {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => subscription.unsubscribe();
  } catch {
    return;
  }
}, [supabase]);
```

### 4.3 Update Footer

Add a link to the prototype in the Footer info section, and optionally add an *Early Stage* notice.

---

## Phase 5: Verification

- [ ] Run `npm run build` without `.env.local` — should succeed
- [ ] Run `npm run dev` without `.env.local` — homepage should render
- [ ] Navigate to `/prototype` — all existing components should render
- [ ] Navigate to `/dashboard` — should redirect to login as before
- [ ] Navigate to `/admin` — should redirect to login as before
- [ ] All existing routes (`/verhaal`, `/over-ons`, etc.) should work unchanged
- [ ] No components deleted from `src/components/home/`
- [ ] No components deleted from `src/components/ui/`

---

## File Change Summary

### New Files
| File | Purpose |
|------|---------|
| `src/components/landing/VisionHero.tsx` | Landing page hero with mission + early-stage badge |
| `src/components/landing/VisionStory.tsx` | Why Earth Guard exists |
| `src/components/landing/VisionRoadmap.tsx` | Project timeline / phases |
| `src/components/landing/VisionCTA.tsx` | Newsletter + support CTA |
| `src/components/landing/PrototypeBanner.tsx` | Experimental prototype warning banner |
| `src/app/prototype/page.tsx` | Prototype route with existing home components |

### Modified Files
| File | Change | Risk |
|------|--------|------|
| `src/app/page.tsx` | Replace with new landing page components | Low — old content preserved in `/prototype` |
| `src/lib/supabase/browser.ts` | Add env var fallbacks | Low — same pattern as `supabase.ts` |
| `src/middleware.ts` | Add env var guard at top | Low — early return when no env vars |
| `src/components/layout/Navbar.tsx` | Add PROTOTYPE link + error handling | Low — additive changes |
| `src/components/layout/Footer.tsx` | Add prototype link + early-stage notice | Low — additive changes |

### Unchanged Files
- All `src/components/home/*` — preserved as-is
- All `src/components/ui/*` — preserved as-is
- All `src/app/dashboard/*` — preserved as-is
- All `src/app/admin/*` — preserved as-is
- All `src/app/adopteer/*` — preserved as-is
- All `src/app/verhaal/*`, `/over-ons/*`, etc. — preserved as-is
- All `src/lib/*` except browser.ts — preserved as-is
- All `src/app/api/*` — preserved as-is

---

## Design Principles

1. **Honesty over polish** — The landing page should clearly communicate this is early-stage
2. **Minimal changes** — Only routing and presentation changes, no rewrites
3. **Build safety** — App must work without Supabase env vars for the public layer
4. **Preserve everything** — No components deleted, no functionality removed
5. **Separation of concerns** — Marketing pages have zero Supabase dependency
