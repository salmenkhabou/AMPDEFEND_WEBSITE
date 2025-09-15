"use client"

import type React from "react"
import { PRICING_PLANS } from "@/lib/pricing-data"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Shield, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const PREDEFINED_RESPONSES = {
  greeting:
    "Hello! I'm AMPDefend's AI assistant. I can help you with cybersecurity questions, threat analysis, pricing details, and platform guidance. How can I assist you today?",
  threats:
    "AMPDefend protects against various cyber threats including:\n• DDoS attacks (Layer 3-7 protection)\n• Malware injection and ransomware\n• Unauthorized access attempts\n• Advanced persistent threats (APTs)\n• Zero-day exploits targeting critical infrastructure\n• IoT device compromises\n• Man-in-the-middle attacks\n\nOur AI-powered detection has a 99.7% accuracy rate with <0.1% false positives.",
  honeypots:
    "Our smart honeypots are sophisticated decoys that mimic real devices:\n\n🔹 Smart Meters (electricity, gas, water)\n🔹 EV Charging Stations\n🔹 Industrial Controllers (SCADA/PLC)\n🔹 IoT Sensors and Gateways\n🔹 Network Infrastructure\n\nWhen attackers interact with these decoys, we capture their TTPs (Tactics, Techniques, Procedures) and automatically:\n• Block malicious IPs globally\n• Update threat intelligence feeds\n• Generate detailed forensic reports\n• Share indicators with security community",
  alerts:
    "AMPDefend provides multi-channel real-time alerting:\n\n📧 Email alerts (customizable templates)\n📱 SMS notifications (critical threats only)\n🖥️ Dashboard notifications with severity levels\n📊 SIEM integration (Splunk, QRadar, Sentinel)\n🔔 Slack/Teams webhooks\n📞 Phone calls for critical incidents\n\nAlert categories:\n• High: Immediate action required\n• Medium: Investigation needed\n• Low: Informational\n• Critical: Active breach detected",
  pricing: (() => {
    const plans = PRICING_PLANS.map((plan) => {
      const priceText = plan.price ? `$${plan.price}/month` : plan.period
      const topFeatures = plan.features.slice(0, 3).join("\\n• ")
      return `🏢 **${plan.name}** - ${priceText}\\n• ${topFeatures}`
    }).join("\\n\\n")

    return `AMPDefend Pricing Plans:\\n\\n${plans}\\n\\n*All plans include 30-day free trial*\\n\\nFor detailed features and comparison, visit our pricing page: /pricing`
  })(),
  demo: "🎯 **Live Demo Available**\n\nExperience AMPDefend with our interactive demo:\n• Real attack simulations\n• Live honeypot interactions\n• Threat detection in action\n• Dashboard walkthrough\n• Custom scenario testing\n\nDemo includes:\n✅ Simulated DDoS attacks\n✅ Malware detection\n✅ Honeypot captures\n✅ Real-time alerting\n✅ Forensic analysis\n\nAccess at: /demo or schedule a personalized demo with our security experts.",
  support:
    "🛡️ **AMPDefend Support Channels**\n\n**24/7 Technical Support:**\n📧 support@ampdefend.com\n📞 1-800-AMP-DEFEND (1-800-267-3333)\n💬 Live chat (this assistant)\n🎫 Support portal: support.ampdefend.com\n\n**Response Times:**\n• Critical: <15 minutes\n• High: <2 hours\n• Medium: <8 hours\n• Low: <24 hours\n\n**Enterprise Customers:**\n👨‍💼 Dedicated Customer Success Manager\n🔧 Direct engineering access\n📱 Priority hotline\n🏢 On-site support available",
  features:
    "🚀 **AMPDefend Core Features**\n\n**Threat Detection:**\n• AI-powered behavioral analysis\n• Machine learning threat classification\n• Real-time traffic inspection\n• Anomaly detection algorithms\n\n**Honeypot Technology:**\n• Dynamic honeypot deployment\n• Adaptive decoy generation\n• Threat actor profiling\n• Attack pattern analysis\n\n**Response & Mitigation:**\n• Automated IP blocking\n• Traffic redirection\n• Incident response playbooks\n• Forensic evidence collection\n\n**Integration & APIs:**\n• REST API for custom integrations\n• SIEM connectors\n• Threat intelligence feeds\n• Webhook notifications",
  compliance:
    "📋 **Compliance & Certifications**\n\nAMPDefend meets industry standards:\n\n🔒 **Security Certifications:**\n• SOC 2 Type II\n• ISO 27001\n• NIST Cybersecurity Framework\n• FedRAMP (in progress)\n\n🏛️ **Regulatory Compliance:**\n• NERC CIP (North American Electric Reliability)\n• IEC 62443 (Industrial Automation Security)\n• GDPR (Data Protection)\n• HIPAA (Healthcare)\n• PCI DSS (Payment Card Industry)\n\n📊 **Audit & Reporting:**\n• Compliance dashboards\n• Automated reporting\n• Evidence collection\n• Audit trail maintenance",
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: PREDEFINED_RESPONSES.greeting,
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return PREDEFINED_RESPONSES.greeting
    }
    if (
      message.includes("threat") ||
      message.includes("attack") ||
      message.includes("security") ||
      message.includes("malware") ||
      message.includes("ddos")
    ) {
      return PREDEFINED_RESPONSES.threats
    }
    if (message.includes("honeypot") || message.includes("decoy") || message.includes("trap")) {
      return PREDEFINED_RESPONSES.honeypots
    }
    if (message.includes("alert") || message.includes("notification") || message.includes("notify")) {
      return PREDEFINED_RESPONSES.alerts
    }
    if (
      message.includes("price") ||
      message.includes("cost") ||
      message.includes("plan") ||
      message.includes("pricing") ||
      message.includes("subscription")
    ) {
      return PREDEFINED_RESPONSES.pricing
    }
    if (message.includes("demo") || message.includes("try") || message.includes("test")) {
      return PREDEFINED_RESPONSES.demo
    }
    if (
      message.includes("support") ||
      message.includes("help") ||
      message.includes("contact") ||
      message.includes("phone")
    ) {
      return PREDEFINED_RESPONSES.support
    }
    if (
      message.includes("feature") ||
      message.includes("capability") ||
      message.includes("function") ||
      message.includes("api")
    ) {
      return PREDEFINED_RESPONSES.features
    }
    if (
      message.includes("compliance") ||
      message.includes("certification") ||
      message.includes("audit") ||
      message.includes("regulation") ||
      message.includes("gdpr") ||
      message.includes("hipaa")
    ) {
      return PREDEFINED_RESPONSES.compliance
    }
    if (
      message.includes("integration") ||
      message.includes("siem") ||
      message.includes("splunk") ||
      message.includes("api")
    ) {
      return "🔗 **Integration Options**\n\nAMPDefend integrates with:\n• SIEM platforms (Splunk, QRadar, Sentinel)\n• Ticketing systems (ServiceNow, Jira)\n• Communication tools (Slack, Teams, PagerDuty)\n• Security orchestration (SOAR platforms)\n• Threat intelligence feeds\n• Custom applications via REST API\n\nNeed help with a specific integration? I can provide detailed setup guides."
    }
    if (message.includes("install") || message.includes("setup") || message.includes("deploy")) {
      return "⚙️ **Deployment Options**\n\n**Cloud Deployment (Recommended):**\n• SaaS - Ready in 15 minutes\n• No hardware required\n• Automatic updates\n• Global threat intelligence\n\n**On-Premise Deployment:**\n• Air-gapped environments\n• Custom hardware specs\n• Local data storage\n• Professional services included\n\n**Hybrid Deployment:**\n• Best of both worlds\n• Critical data on-premise\n• Cloud threat intelligence\n\nWhich deployment model interests you?"
    }

    return "I understand you're asking about cybersecurity. I can provide detailed information about:\n\n💰 **Pricing** - Exact costs and plan details\n🛡️ **Threats** - Specific attack types we protect against\n🍯 **Honeypots** - How our decoy technology works\n🚨 **Alerts** - Notification channels and response times\n🎯 **Demo** - Try our live demonstration\n📞 **Support** - Contact options and SLAs\n⚙️ **Features** - Technical capabilities and APIs\n📋 **Compliance** - Certifications and regulations\n\nWhat specific topic would you like to explore?"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(
      () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: generateResponse(inputValue),
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5" />
              AMPDefend Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3 max-w-[80%]",
                      message.sender === "user" ? "ml-auto flex-row-reverse" : "",
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground",
                      )}
                    >
                      {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div
                      className={cn(
                        "rounded-lg px-3 py-2 text-sm",
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
                      <div className="flex gap-1">
                        <div
                          className="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about cybersecurity, threats, or AMPDefend..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
