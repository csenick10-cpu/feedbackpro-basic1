"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { getStripe } from "@/lib/stripe"
import { toast } from "@/hooks/use-toast"

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$29",
      priceId: "price_starter_monthly",
      description: "Perfect for small businesses",
      features: [
        "500 SMS messages/month",
        "1 review platform integration",
        "Basic analytics",
        "Email support",
        "1 user account",
      ],
      popular: false,
    },
    {
      id: "professional",
      name: "Professional",
      price: "$79",
      priceId: "price_professional_monthly",
      description: "Best for growing businesses",
      features: [
        "2,000 SMS messages/month",
        "All review platform integrations",
        "Advanced analytics & AI insights",
        "SMS workflows & automation",
        "Priority support",
        "5 user accounts",
        "Custom review forms",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$199",
      priceId: "price_enterprise_monthly",
      description: "For large organizations",
      features: [
        "10,000 SMS messages/month",
        "All features included",
        "White-label options",
        "API access",
        "Dedicated account manager",
        "Unlimited user accounts",
        "Custom integrations",
        "SLA guarantee",
      ],
      popular: false,
    },
  ]

  const handleSubscribe = async (priceId: string, planId: string) => {
    setIsLoading(planId)

    try {
      // In a real app, you'd get the user ID from auth context
      const userId = "user_123" // Replace with actual user ID

      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          userId,
        }),
      })

      const { sessionId } = await response.json()

      if (sessionId) {
        const stripe = await getStripe()
        await stripe?.redirectToCheckout({ sessionId })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start checkout process",
        variant: "destructive",
      })
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground">Start your 14-day free trial. No credit card required.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.id} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="text-3xl font-bold">
                  {plan.price}
                  <span className="text-lg font-normal text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.priceId, plan.id)}
                  disabled={isLoading === plan.id}
                >
                  {isLoading === plan.id ? "Processing..." : "Start Free Trial"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">All plans include a 14-day free trial. Cancel anytime.</p>
        </div>
      </div>
    </div>
  )
}
