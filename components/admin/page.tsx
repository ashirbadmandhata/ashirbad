"use client"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AdminPage() {
  return (
    <div>
      <Button
        className="gap-2 bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple shadow-lg hover:shadow-xl hover:-translate-y-1"
        onClick={() => {
          // resetForm() // Assuming resetForm is defined elsewhere
          // setIsDialogOpen(true) // Assuming setIsDialogOpen is defined elsewhere
        }}
      >
        <Plus className="w-4 h-4" />
        New Project
      </Button>
    </div>
  )
}
