
import React from 'react';
import { Baby, QrCode, User } from 'lucide-react';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { languages } from "@/types/definitions";
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../types';

interface Step2Props {
  form: UseFormReturn<FormValues>;
}

export const Step2ChooseLanguages: React.FC<Step2Props> = ({ form }) => {
  return (
    <div className="space-y-4">
      <Form {...form}>
        <FormField
          control={form.control}
          name="sourceLanguage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source Language</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targetLanguage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Language</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        
        <div className="pt-4">
          <FormField
            control={form.control}
            name="audienceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Format</FormLabel>
                <div className="flex gap-4 mt-2">
                  <Button
                    type="button"
                    variant={field.value === "adult" ? "default" : "outline"}
                    className="flex-1 gap-2"
                    onClick={() => form.setValue("audienceType", "adult")}
                  >
                    <User className="h-4 w-4" />
                    Adult
                  </Button>
                  <Button
                    type="button"
                    variant={field.value === "child" ? "default" : "outline"}
                    className="flex-1 gap-2"
                    onClick={() => form.setValue("audienceType", "child")}
                  >
                    <Baby className="h-4 w-4" />
                    Child
                  </Button>
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="includeQrCode"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Include QR Code
                </FormLabel>
                <FormDescription>
                  Add a QR code linking to a shareable version
                </FormDescription>
              </div>
              <FormControl>
                <Button
                  type="button"
                  variant={field.value ? "default" : "outline"}
                  size="icon"
                  className="rounded-full"
                  onClick={() => form.setValue("includeQrCode", !field.value)}
                >
                  <QrCode className="h-4 w-4" />
                </Button>
              </FormControl>
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
};
