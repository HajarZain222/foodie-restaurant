"use client";

import { useState } from "react";

interface ExpandableTextProps {
  text: string;
  wordLimit?: number;
}

export default function ExpandableText({ text, wordLimit = 10 }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);

  const words = text.split(" ");
  const isLong = words.length > wordLimit;
  const displayText = expanded || !isLong
    ? text
    : words.slice(0, wordLimit).join(" ") + "...";

  return (
    <p className="text-sm text-gray-500">
      {displayText}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-1 font-medium text-orange-500 hover:underline"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </p>
  );
}