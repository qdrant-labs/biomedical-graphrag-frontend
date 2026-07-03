"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/app-store";

/**
 * Blocking gate shown on load until the user provides an OpenAI key.
 * The key is hydrated from sessionStorage by the store (cleared when the tab
 * closes) and attached to every request by the assistant page — never stored
 * server-side. Radix renders its content via a client-only Portal, so the
 * open/closed state produces no SSR markup and cannot cause a hydration mismatch.
 */
export function ApiKeyGate() {
  const openaiKey = useAppStore((s) => s.openaiKey);
  const setOpenaiKey = useAppStore((s) => s.setOpenaiKey);
  const [value, setValue] = useState("");

  const open = !openaiKey;

  const submit = () => {
    const k = value.trim();
    if (k) setOpenaiKey(k);
  };

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,440px)] -translate-x-1/2 -translate-y-1/2 rounded-[14px] border border-[var(--stroke-1)] bg-[var(--bg-1)] p-6 shadow-xl"
        >
          <Dialog.Title className="text-lg font-semibold text-[var(--text-primary)]">
            Enter your OpenAI API key
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-[var(--text-secondary)]">
            This demo runs on your own OpenAI key. It&apos;s stored only in this browser tab and
            used only for your requests — never saved on our servers.
          </Dialog.Description>

          <input
            type="password"
            autoFocus
            placeholder="sk-..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            className="mt-4 w-full rounded-[10px] border border-[var(--stroke-1)] bg-[var(--bg-2)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--violet)]"
          />

          <Button variant="violet" className="mt-4 w-full" disabled={!value.trim()} onClick={submit}>
            Start exploring
          </Button>

          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-center text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
          >
            Get an API key ↗
          </a>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
