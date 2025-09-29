"use client"

import { useParams, useSearchParams } from "next/navigation"
import { NavigationHeader } from "@/components/navigation-header"
import { SmartSearch } from "@/components/smart-search"

export default function CategorySearchPage(){
  const params = useParams();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const category = decodeURIComponent(String(params?.category || ""));
  const seed = q ? `${category} ${q}` : category;
  return (
    <main className="min-h-screen bg-tatva-light-gray">
      <NavigationHeader />
      <div className="pt-24">
        <div className="bg-white rounded-t-3xl shadow-xl">
          <SmartSearch query={seed} />
        </div>
      </div>
    </main>
  )
}


