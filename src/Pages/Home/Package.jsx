import Header from "../../Component/ReusableComponent/Header";
import PricingCard from "./PricingCard";

const Package = () => {
  return (
    <div>
      <Header
        title={"Packages We Offer"}
        subtitle={`Select the plan that best fits your team and
        start managing your assets more efficiently today!`}
      ></Header>

      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {/* Pricing Card: Starter */}
            <PricingCard
              title="Starter Plan"
              description="Ideal for small businesses and startups looking to streamline their asset management processes."
              price="$5"
              duration="/month"
              features={[
                "Basic Asset Tracking",
                "User Access Management (5 Members)",
                "Asset Categorization",
                "Self-Service Portal",
                "Basic reports on asset usage and status",
              ]}
            />

            {/* Pricing Card: Growth Plan */}
            <PricingCard
              title="Growth Plan"
              description="Perfect for growing businesses that need a bit more capacity and flexibility in managing their assets."
              price="$8"
              duration="/month"
              features={[
                "Advanced Asset Tracking",
                "User Access Management (10 Members)",
                "Custom Asset Categories",
                "Integration with HR Tools",
                "Support & Training",
              ]}
            />

            {/* Pricing Card: Enterprise */}
            <PricingCard
              title="Enterprise Plan"
              description="Best suited for larger teams and enterprises requiring comprehensive asset management solutions."
              price="$15"
              duration="/month"
              features={[
                "Unlimited Asset Tracking",
                "User Access Management (20 Members)",
                "Custom Workflows",
                "Detailed Reporting",
                "Return Policy Management",
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Package;
