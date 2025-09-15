"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Wifi } from "lucide-react"
import { useRealtimeData } from "@/hooks/use-realtime-data"
import {
  InteractiveDashboard,
  InteractiveQuestion,
  MetabaseProvider,
  defineMetabaseAuthConfig,
} from "@metabase/embedding-sdk-react";

/**
 * This creates an auth config to pass to the `MetabaseProvider` component.
 * You'll need to replace the `metabaseInstanceUrl` and the `apiKey` values.
 */
const authConfig = defineMetabaseAuthConfig({
  metabaseInstanceUrl: "http://localhost:3000",
  apiKey: "mb_caQ783To0cEGHE1ZKQJV46Pbdh04u7ieKKtWj+VeoO8=",
});
export function LiveAttackMap() {
  const { threats } = useRealtimeData()
  const activeThreats = threats.filter((threat) => threat.severity === "high").slice(0, 3)

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Live Attack Map</h3>
        </div>



        <MetabaseProvider authConfig={authConfig}>
          {/* Replace `123` with your question (card) ID */}
          <InteractiveQuestion questionId={55} />
        </MetabaseProvider>

      </CardContent>
    </Card>
  )
}
