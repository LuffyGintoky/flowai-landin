import { Nav } from '@/components/nav';
import { StickyCta } from '@/components/sticky-cta';
import { BackToTop } from '@/components/back-to-top';
import { Hero } from '@/components/hero';
import { LogosStrip } from '@/components/logos-strip';
import { Problem } from '@/components/problem';
import { Solution } from '@/components/solution';
import { Features } from '@/components/features';
import { DemoStrip } from '@/components/demo-strip';
import { Pricing } from '@/components/pricing';
import { Founders } from '@/components/founders';
import { Faq } from '@/components/faq';
import { Waitlist } from '@/components/waitlist';
import { Footer } from '@/components/footer';

export default function LandingPage() {
  return (
    <div className="la-app" data-screen-label="Landing · FlowAI">
      <div className="la-bg" aria-hidden="true">
        <div className="la-bg-grid" />
        <div className="la-bg-blob la-bg-blob-1" />
        <div className="la-bg-blob la-bg-blob-2" />
        <div className="la-bg-blob la-bg-blob-3" />
        <div className="la-bg-streaks" />
        <div className="la-bg-noise" />
      </div>
      <Nav />
      <StickyCta />
      <BackToTop />
      <Hero />
      <LogosStrip />
      <Problem />
      <Solution />
      <Features />
      <DemoStrip />
      <Pricing />
      <Founders />
      <Faq />
      <Waitlist />
      <Footer />
    </div>
  );
}
