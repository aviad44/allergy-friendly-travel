
import React from 'react';
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from '../types';

interface UserNameInputProps {
  form: UseFormReturn<FormValues>;
}

export const UserNameInput: React.FC<UserNameInputProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="userName"
      render={({ field }) => (
        <FormItem className="mb-6">
          <FormLabel>Your Name (Optional)</FormLabel>
          <FormControl>
            <Input 
              placeholder="Enter your name" 
              {...field} 
              value={field.value || ""}
              className="w-full"
            />
          </FormControl>
          <FormDescription>
            This will be included in your allergy card
          </FormDescription>
        </FormItem>
      )}
    />
  );
};
