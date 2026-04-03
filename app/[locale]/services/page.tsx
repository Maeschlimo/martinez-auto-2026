import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CTA } from "@/components/sections/CTA";
import { Wrench, Scale, Droplets, Shield, Clock, Users } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({
    title: `Services — ${siteConfig.name}`,
    description: `Professional services offered by ${siteConfig.name}.`,
    path: "/services",
    locale,
  });
}

export default function ServicesPage() {
  // Replace with real service data per client
  return (
    <>
      <ServicesGrid
        heading="Our Services"
        subheading="Comprehensive solutions tailored to your needs"
        services={[
          { title: "Service One", description: "Detailed description of service one.", href: "/services/service-one", icon: Wrench },
          { title: "Service Two", description: "Detailed description of service two.", href: "/services/service-two", icon: Scale },
          { title: "Service Three", description: "Detailed description of service three.", href: "/services/service-three", icon: Droplets },
          { title: "Service Four", description: "Detailed description of service four.", href: "/services/service-four", icon: Shield },
          { title: "Service Five", description: "Detailed description of service five.", href: "/services/service-five", icon: Clock },
          { title: "Service Six", description: "Detailed description of service six.", href: "/services/service-six", icon: Users },
        ]}
      />
      <CTA
        heading="Need Help Choosing?"
        description="Contact us for a free consultation and we'll recommend the right service for you."
        cta={{ text: "Get a Free Quote", href: "/contact" }}
      />
    </>
  );
}
