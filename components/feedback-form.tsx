"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Grip, Plus, Trash } from "lucide-react"

export function FeedbackForm() {
  const [formFields, setFormFields] = useState([
    { id: 1, type: "text", label: "Name", required: true, placeholder: "Your name" },
    { id: 2, type: "email", label: "Email", required: true, placeholder: "Your email address" },
    {
      id: 3,
      type: "select",
      label: "What are you providing feedback about?",
      required: true,
      options: ["Product", "Service", "Website", "Other"],
    },
    { id: 4, type: "rating", label: "How would you rate your experience?", required: true },
    {
      id: 5,
      type: "textarea",
      label: "Please share your feedback",
      required: true,
      placeholder: "Tell us what you think...",
    },
  ])

  const addField = () => {
    const newId = formFields.length > 0 ? Math.max(...formFields.map((field) => field.id)) + 1 : 1
    setFormFields([...formFields, { id: newId, type: "text", label: "New Field", required: false, placeholder: "" }])
  }

  const removeField = (id) => {
    setFormFields(formFields.filter((field) => field.id !== id))
  }

  const renderFieldEditor = (field) => {
    return (
      <div key={field.id} className="flex items-start space-x-2 border p-4 rounded-md">
        <div className="mt-2 cursor-move">
          <Grip className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`field-${field.id}-label`}>Field Label</Label>
              <Input id={`field-${field.id}-label`} defaultValue={field.label} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`field-${field.id}-type`}>Field Type</Label>
              <Select defaultValue={field.type}>
                <SelectTrigger id={`field-${field.id}-type`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="textarea">Text Area</SelectItem>
                  <SelectItem value="select">Dropdown</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(field.type === "text" || field.type === "email" || field.type === "textarea") && (
            <div className="space-y-2">
              <Label htmlFor={`field-${field.id}-placeholder`}>Placeholder</Label>
              <Input id={`field-${field.id}-placeholder`} defaultValue={field.placeholder || ""} />
            </div>
          )}

          {field.type === "select" && (
            <div className="space-y-2">
              <Label htmlFor={`field-${field.id}-options`}>Options (comma separated)</Label>
              <Input id={`field-${field.id}-options`} defaultValue={field.options?.join(", ") || ""} />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch id={`field-${field.id}-required`} defaultChecked={field.required} />
            <Label htmlFor={`field-${field.id}-required`}>Required field</Label>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => removeField(field.id)}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {formFields.map(renderFieldEditor)}
      <Button variant="outline" className="w-full bg-transparent" onClick={addField}>
        <Plus className="mr-2 h-4 w-4" />
        Add Field
      </Button>
    </div>
  )
}
