import React from "react";

/**
 * Extracts human-readable text from supported events.
 */
function getMessageFromEvent(event) {
  // User message
  if (event.type === "conversation.item.created" && event.item?.content) {
    const text = event.item.content
      .map((c) => c?.text?.value || "[non-text]")
      .join(" ");
    return { role: "user", text };
  }

  // Assistant streaming response (token)
  if (event.type === "response.content_part.added" && event.delta?.text) {
    return { role: "assistant", text: event.delta.text };
  }

  // Assistant final output (optional)
  if (event.type === "response.output_item.added" && event.item?.content) {
    const text = event.item.content
      .map((c) => c?.text?.value || "[non-text]")
      .join(" ");
    return { role: "assistant", text };
  }

  return null;
}

/**
 * Renders a cleaned-up conversation log from raw OpenAI events.
 */
export default function EventLog({ events }) {
  return (
    <div className="flex flex-col-reverse gap-2 px-2">
      {events.map((event, idx) => {
        const message = getMessageFromEvent(event);
        if (!message) return null; // Skip non-chat events

        return (
          <div
            key={idx}
            className={`p-2 rounded-lg shadow-sm ${
              message.role === "user"
                ? "bg-blue-50 text-blue-900 self-start"
                : "bg-green-50 text-green-900 self-end"
            }`}
          >
            <strong>
              {message.role === "user" ? "🧑 You:" : "🤖 AI:"}
            </strong>{" "}
            {message.text}
          </div>
        );
      })}
    </div>
  );
}

