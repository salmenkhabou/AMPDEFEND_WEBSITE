export const PRICING_PLANS = [
  {
    name: "Starter",
    price: 299,
    period: "month",
    description: "Perfect for small businesses and startups",
    features: [
      "Up to 50 devices",
      "5 honeypots",
      "Email alerts",
      "Basic reporting",
      "Community support",
      "99.5% uptime SLA",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: 899,
    period: "month",
    description: "Ideal for growing companies with advanced needs",
    features: [
      "Up to 500 devices",
      "25 honeypots",
      "All alert channels (Email, SMS, Slack)",
      "Advanced analytics & reporting",
      "API access",
      "Priority support",
      "99.9% uptime SLA",
      "Custom integrations",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 2499,
    period: "month",
    description: "Comprehensive solution for large organizations",
    features: [
      "Unlimited devices",
      "100+ honeypots",
      "Dedicated support team",
      "Custom integrations",
      "On-premise deployment option",
      "White-label solutions",
      "24/7 SOC support",
      "99.99% uptime SLA",
      "Compliance reporting",
      "Custom threat intelligence",
    ],
    popular: false,
  },
  {
    name: "Custom Enterprise",
    price: null,
    period: "Contact Sales",
    description: "Tailored solutions for unique requirements",
    features: [
      "Everything in Enterprise",
      "Custom development",
      "Dedicated infrastructure",
      "On-site deployment",
      "Custom SLA agreements",
      "Regulatory compliance consulting",
      "Advanced threat hunting",
      "Incident response services",
    ],
    popular: false,
  },
]

export const PRICING_FAQ = [
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes! All plans include a 30-day free trial with full access to features. No credit card required to start.",
  },
  {
    question: "Can I change plans anytime?",
    answer:
      "Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.",
  },
  {
    question: "What's included in the setup?",
    answer:
      "All plans include free setup assistance, initial configuration, and training sessions to get your team up to speed quickly.",
  },
  {
    question: "Do you offer volume discounts?",
    answer:
      "Yes, we offer significant discounts for annual payments and volume licensing. Contact our sales team for custom pricing.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, ACH transfers, and wire transfers. Enterprise customers can also pay via purchase orders.",
  },
]
