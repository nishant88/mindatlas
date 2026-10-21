import React, { Suspense } from "react";
import ArticleClient from "./ArticleClient";
import { MENTAL_MODELS } from "@/lib/mindAtlasData";
import { FALLBACK_ARTICLES } from "@/lib/api";
import { COMPREHENSIVE_ARTICLES } from "@/lib/comprehensiveArticles";

export function generateStaticParams() {
  const slugs = new Set([
    ...MENTAL_MODELS.map((m) => m.slug),
    ...FALLBACK_ARTICLES.map((a) => a.slug),
    ...Object.keys(COMPREHENSIVE_ARTICLES),
  ]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export default function ArticlePage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-[#b8ada2]">Loading reader...</div>}>
      <ArticleClient />
    </Suspense>
  );
}
