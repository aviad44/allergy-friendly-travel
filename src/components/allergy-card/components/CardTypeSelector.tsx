
import React from 'react';
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from '../types';

interface CardTypeSelectorProps {
  form: UseFormReturn<FormValues>;
}

export const CardTypeSelector: React.FC<CardTypeSelectorProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="audienceType"
      render={({ field }) => (
        <FormItem className="space-y-2 pt-4 border-t">
          <FormLabel>Card Type</FormLabel>
          <div className="flex gap-3">
            <Button
              type="button"
              variant={field.value === "adult" ? "default" : "outline"}
              className={field.value === "adult" ? "bg-blue-600 hover:bg-blue-700" : ""}
              onClick={() => form.setValue("audienceType", "adult")}
            >
              Adult Card
            </Button>
            <Button
              type="button"
              variant={field.value === "child" ? "default" : "outline"}
              className={field.value === "child" ? "bg-blue-600 hover:bg-blue-700" : ""}
              onClick={() => form.setValue("audienceType", "child")}
            >
              Child Card
            </Button>
          </div>
          <FormDescription>
            {field.value === "adult" 
              ? "Adult cards use more formal language suitable for restaurants and hotels."
              : "Child cards include space for a name and use simpler language."}
          </FormDescription>
        </FormItem>
      )}
    />
  );
};
