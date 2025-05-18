
import { useState, useRef, useEffect } from "react";
import { useAI } from "@/context/AIContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { MessageSquare, X, Send, BotIcon, User } from "lucide-react";
import { AIMessage } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export default function AIAssistant() {
  const { messages, isProcessing, sendMessage } = useAI();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      const userInput = input;
      setInput("");
      await sendMessage(userInput);
    }
  };

  const renderMessage = (message: AIMessage) => {
    const isAI = message.role === "assistant";
    
    return (
      <div
        key={message.id}
        className={cn(
          "flex w-full mb-4",
          isAI ? "justify-start" : "justify-end"
        )}
      >
        <div
          className={cn(
            "flex items-start gap-3 max-w-[80%]",
            isAI ? "order-first" : "order-last"
          )}
        >
          <div
            className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center",
              isAI ? "bg-primary text-primary-foreground" : "bg-secondary"
            )}
          >
            {isAI ? <BotIcon className="h-4 w-4" /> : <User className="h-4 w-4" />}
          </div>
          <div
            className={cn(
              "rounded-lg px-4 py-2 text-sm",
              isAI
                ? "bg-muted text-foreground"
                : "bg-primary text-primary-foreground"
            )}
          >
            {message.content}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-4 right-4 rounded-full h-12 w-12 p-0 shadow-lg",
          isOpen && "hidden"
        )}
        aria-label="Open AI Assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-4 right-4 w-full max-w-[400px] rounded-lg border bg-background shadow-xl transition-transform duration-200 flex flex-col z-50",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none",
          "h-[500px]"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <BotIcon className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">DevAI Assistant</h3>
              <p className="text-xs text-muted-foreground">
                Ask me anything about products
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          {messages.map(renderMessage)}
          
          {isProcessing && (
            <div className="flex w-full mb-4 justify-start">
              <div className="flex items-start gap-3 max-w-[80%]">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <BotIcon className="h-4 w-4" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[120px] rounded-lg" />
                  <Skeleton className="h-4 w-[200px] rounded-lg" />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t p-4">
          <div className="flex gap-2">
            <Textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask DevAI something..."
              className="resize-none"
              rows={1}
              maxRows={4}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!input.trim() || isProcessing}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
