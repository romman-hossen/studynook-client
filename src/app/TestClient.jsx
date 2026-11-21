"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button, Card } from "@heroui/react";
import toast from "react-hot-toast";

export default function TestClient() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            StudyNook Foundation Test
          </h1>
          <p className="mt-2 text-muted">
            Phase 1 verification: HeroUI v3, Tailwind CSS v4, dark mode, and toast notifications.
          </p>
        </div>

        <Card className="p-6 border border-border bg-surface shadow-sm rounded-2xl">
          <Card.Header className="pb-4">
            <Card.Title className="text-xl font-semibold">HeroUI v3 Card Component</Card.Title>
            <Card.Description className="text-sm">
              Current active theme:{" "}
              <span className="font-semibold text-primary">
                {mounted ? theme : "loading..."}
              </span>
            </Card.Description>
          </Card.Header>

          <Card.Content className="space-y-4 py-2">
            <p className="text-sm text-foreground/80 leading-relaxed">
              This card verifies that HeroUI v3 compound components (
              <code className="rounded bg-muted/20 px-1.5 py-0.5 text-xs font-mono">
                Card.Header
              </code>
              ,{" "}
              <code className="rounded bg-muted/20 px-1.5 py-0.5 text-xs font-mono">
                Card.Title
              </code>
              ,{" "}
              <code className="rounded bg-muted/20 px-1.5 py-0.5 text-xs font-mono">
                Card.Content
              </code>
              ) and design tokens are functioning correctly.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Primary Teal (#0F766E)
              </span>
              <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                Accent Amber (#F59E0B)
              </span>
              <span className="inline-flex items-center rounded-full bg-status-confirmed/10 px-3 py-1 text-xs font-semibold text-status-confirmed">
                Confirmed Green (#16A34A)
              </span>
              <span className="inline-flex items-center rounded-full bg-status-cancelled/10 px-3 py-1 text-xs font-semibold text-status-cancelled">
                Cancelled Red (#DC2626)
              </span>
            </div>
          </Card.Content>

          <Card.Footer className="pt-4 flex flex-wrap gap-3 items-center">
            <Button
              variant="primary"
              onPress={() => toast.success("HeroUI v3 and Toast working perfectly!")}
            >
              Trigger Success Toast
            </Button>

            <Button
              variant="outline"
              onPress={() =>
                mounted && setTheme(theme === "dark" ? "light" : "dark")
              }
            >
              Toggle {mounted && theme === "dark" ? "Light" : "Dark"} Mode
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}
