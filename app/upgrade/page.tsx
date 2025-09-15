"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Shield, Zap, Users, Crown } from "lucide-react"
import { PRICING_PLANS } from "@/lib/pricing-data"

export default function UpgradePage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  const getIcon = (planName: string) => {
    switch (planName) {
      case "Starter":
        return <Shield className="h-6 w-6" />
      case "Professional":
        return <Zap className="h-6 w-6" />
      case "Enterprise":
        return <Users className="h-6 w-6" />
      case "Custom Enterprise":
        return <Crown className="h-6 w-6" />
      default:
        return <Shield className="h-6 w-6" />
    }
  }

  const getPrice = (price: number | null) => {
    if (price === null) return "Custom"
    if (billingCycle === "annual") {
      const annualPrice = Math.floor(price * 12 * 0.8) // 20% discount for annual
      return `$${annualPrice.toLocaleString()}`
    }
    return `$${price.toLocaleString()}`
  }

  const getPeriod = (period: string) => {
    if (period === "Contact Sales") return period
    return billingCycle === "annual" ? "year" : period
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="h-4 w-4" />
            Welcome to AMPDefend
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Your Trial is Active!</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            You now have access to our cybersecurity platform. Upgrade to unlock advanced features and protect your
            organization with enterprise-grade security.
          </p>

          {/* Trial Status */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 max-w-md mx-auto mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-300">Trial Status</span>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                Active
              </Badge>
            </div>
            <div className="text-2xl font-bold text-white mb-2">29 days remaining</div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full"
                style={{ width: "97%" }}
              ></div>
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm ${billingCycle === "monthly" ? "text-white" : "text-slate-400"}`}>Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === "annual" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === "annual" ? "text-white" : "text-slate-400"}`}>Annual</span>
            {billingCycle === "annual" && (
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 ml-2">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {PRICING_PLANS.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 ${
                plan.popular ? "ring-2 ring-blue-500 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-slate-700/50 rounded-lg text-blue-400">{getIcon(plan.name)}</div>
                </div>
                <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                <CardDescription className="text-slate-400">{plan.description}</CardDescription>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-white">{getPrice(plan.price)}</div>
                  <div className="text-slate-400 text-sm">per {getPeriod(plan.period)}</div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
                      : "bg-slate-700 hover:bg-slate-600 text-white"
                  }`}
                  size="lg"
                >
                  {plan.price === null ? "Contact Sales" : "Upgrade Now"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Why Upgrade Your AMPDefend Account?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Enhanced Protection</h3>
              <p className="text-slate-400">
                Advanced threat detection with AI-powered analysis and real-time monitoring
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Faster Response</h3>
              <p className="text-slate-400">Instant alerts and automated response capabilities to minimize damage</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Expert Support</h3>
              <p className="text-slate-400">24/7 access to cybersecurity experts and dedicated account management</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Secure Your Organization?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of companies that trust AMPDefend to protect their digital assets. Upgrade now and get
            immediate access to enterprise-grade cybersecurity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
