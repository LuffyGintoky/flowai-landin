import Hero from "./sections/Hero";
import Benefits from "./sections/Benefits";
// import WorkflowDiagram from "./sections/WorkflowDiagram";
import UseCases from "./sections/UseCases";
import Integrations from "./sections/Integrations";
// import Pricing from "./sections/Pricing";
import Testimonials from "./sections/Testimonials";
import CTA from "./sections/CTA";

import Footer from "./sections/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <Hero />
        <Benefits />
        {/* <WorkflowDiagram /> */}
        <UseCases />
        <Integrations />
        {/* <Pricing /> */}
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
