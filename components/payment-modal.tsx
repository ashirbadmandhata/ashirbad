"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, CreditCard, Zap, Star, Crown, Gem } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface PaymentModalProps {
  onClose: () => void
}

export default function PaymentModal({ onClose }: PaymentModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro")

  const plans = [
    {
      id: "basic",
      name: "Basic Package",
      price: "₹4,999",
      originalPrice: "₹7,999",
      description: "Perfect for small projects and startups",
      features: [
        "Complete source code",
        "3 months support",
        "Basic documentation",
        "Email support",
        "1 revision included",
      ],
      icon: <Star className="h-6 w-6" />,
      color: "neon-cyan",
      savings: "38% OFF",
    },
    {
      id: "pro",
      name: "Professional Package",
      price: "₹9,999",
      originalPrice: "₹15,999",
      description: "Most popular choice for businesses",
      features: [
        "Complete source code",
        "12 months premium support",
        "Comprehensive documentation",
        "Premium components library",
        "Free updates for 1 year",
        "Priority email & chat support",
        "3 revisions included",
        "Deployment assistance",
      ],
      icon: <Crown className="h-6 w-6" />,
      color: "neon-purple",
      recommended: true,
      savings: "37% OFF",
    },
    {
      id: "enterprise",
      name: "Enterprise Package",
      price: "₹19,999",
      originalPrice: "₹29,999",
      description: "Complete solution for large organizations",
      features: [
        "Complete source code",
        "24 months enterprise support",
        "Full documentation & training",
        "Premium components library",
        "Lifetime updates",
        "24/7 priority support",
        "Unlimited revisions",
        "Custom deployment",
        "Team training session",
        "Performance optimization",
        "Security audit included",
      ],
      icon: <Gem className="h-6 w-6" />,
      color: "neon-pink",
      savings: "33% OFF",
    },
  ]

  const handlePurchase = () => {
    // Simulate purchase
    const selectedPlanData = plans.find((plan) => plan.id === selectedPlan)

    // Update analytics
    const analytics = JSON.parse(localStorage.getItem("portfolio-analytics") || "[]")
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })

    // Add purchase to analytics
    const purchases = JSON.parse(localStorage.getItem("portfolio-purchases") || "[]")
    purchases.push({
      id: Date.now().toString(),
      plan: selectedPlanData?.name,
      amount: selectedPlanData?.price,
      date: today,
      timestamp: Date.now(),
    })
    localStorage.setItem("portfolio-purchases", JSON.stringify(purchases))

    alert(`Thank you for purchasing ${selectedPlanData?.name}! You will receive an email with download instructions.`)
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl rounded-xl bg-accent/30 shadow-neumorphic overflow-hidden"
        >
          {/* Header with gradient */}
          <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute right-4 top-4 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
            <h2 className="text-2xl font-bold text-white">Choose Your Plan</h2>
            <p className="text-white/80 mt-1">Select the option that best fits your needs</p>
          </div>

          {/* Content */}
          <div className="p-6">
            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="grid gap-4 md:grid-cols-2">
              {plans.map((plan) => (
                <div key={plan.id} className="relative">
                  {plan.recommended && (
                    <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-md z-10">
                      Recommended
                    </div>
                  )}
                  <Label
                    htmlFor={plan.id}
                    className={`flex flex-col h-full p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPlan === plan.id
                        ? "border-primary bg-primary/5 shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                        : "border-accent bg-background"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value={plan.id} id={plan.id} />
                        <span className="text-xl font-bold">{plan.name}</span>
                      </div>
                      <span className="text-2xl font-bold">{plan.price}</span>
                    </div>
                    <p className="text-muted-foreground mb-4">{plan.description}</p>
                    <ul className="space-y-2 mt-auto">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="mt-8 space-y-6">
              <div className="flex flex-col gap-4">
                <Button size="lg" className="w-full gap-2">
                  <CreditCard className="h-4 w-4" />
                  Proceed to Payment
                </Button>
                <Button variant="outline" size="lg" onClick={onClose} className="w-full">
                  Cancel
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                <Zap className="h-4 w-4" />
                <span>Secure payment processing with Stripe</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
