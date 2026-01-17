"use client";

import { useChat } from "@ai-sdk/react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export default function ChatPage() {
    // @ts-ignore
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="mb-4">
                <h1 className="text-3xl font-bold tracking-tight">AI Compliance Expert</h1>
                <p className="text-muted-foreground mt-2">
                    Ask questions about the EU AI Act or analyze your documents.
                </p>
            </div>

            <div className="flex-1 overflow-y-auto rounded-lg border bg-muted/20 p-4 mb-4 space-y-4">
                {messages.length === 0 && (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        <div className="text-center">
                            <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Start a conversation to get compliance advice.</p>
                        </div>
                    </div>
                )}
                {messages.map((m: any) => (
                    <div
                        key={m.id}
                        className={cn(
                            "flex gap-3 max-w-[80%]",
                            m.role === "user" ? "ml-auto flex-row-reverse" : ""
                        )}
                    >
                        <div
                            className={cn(
                                "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                                m.role === "user" ? "bg-primary" : "bg-muted"
                            )}
                        >
                            {m.role === "user" ? (
                                <User className="h-4 w-4 text-primary-foreground" />
                            ) : (
                                <Bot className="h-4 w-4" />
                            )}
                        </div>
                        <div
                            className={cn(
                                "rounded-lg p-3 text-sm",
                                m.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-card border shadow-sm"
                            )}
                        >
                            {/* @ts-ignore */}
                            <div className="whitespace-pre-wrap">{m.content}</div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-center gap-2 text-muted-foreground text-sm ml-12">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Thinking...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    className="flex-1 min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={input}
                    placeholder="Ask a question about compliance risk..."
                    onChange={handleInputChange}
                    disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                </Button>
            </form>
        </div>
    );
}
