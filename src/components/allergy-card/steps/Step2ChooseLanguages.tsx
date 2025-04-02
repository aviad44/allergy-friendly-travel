
import React from 'react';
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { FormValues } from '../types';

interface Step2Props {
  form: UseFormReturn<FormValues>;
}

export const Step2ChooseLanguages: React.FC<Step2Props> = ({ form }) => {
  const languages = [
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "it", name: "Italian", flag: "🇮🇹" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹" },
    { code: "ru", name: "Russian", flag: "🇷🇺" },
    { code: "zh", name: "Chinese (Simplified)", flag: "🇨🇳" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
    { code: "ko", name: "Korean", flag: "🇰🇷" },
    { code: "ar", name: "Arabic", flag: "🇸🇦" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "he", name: "Hebrew", flag: "🇮🇱" },
    { code: "el", name: "Greek", flag: "🇬🇷" },
    { code: "th", name: "Thai", flag: "🇹🇭" },
    { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
    { code: "tr", name: "Turkish", flag: "🇹🇷" },
    { code: "pl", name: "Polish", flag: "🇵🇱" },
    { code: "sv", name: "Swedish", flag: "🇸🇪" },
    { code: "nl", name: "Dutch", flag: "🇳🇱" },
    { code: "da", name: "Danish", flag: "🇩🇰" },
  ];

  // Currently only English is available as source language in this version
  const sourceLanguages = [
    { code: "en", name: "English", flag: "🇬🇧" },
  ];

  return (
    <div className="space-y-6">
      {/* Source Language */}
      <FormField
        control={form.control}
        name="sourceLanguage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Source Language</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select source language" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {sourceLanguages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="flex items-center">
                      <span className="mr-2">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Currently only supporting English as the source language.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Target Language */}
      <FormField
        control={form.control}
        name="targetLanguage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Target Language</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select target language" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[300px]">
                {languages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="flex items-center">
                      <span className="mr-2">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Choose the language you need for your travels.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* User Name Field */}
      <FormField
        control={form.control}
        name="userName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name (Optional)</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your name or your child's name" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Will be displayed on your allergy card.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Audience Type */}
      <FormField
        control={form.control}
        name="audienceType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Card Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="child" id="child" />
                  <Label htmlFor="child">Child Card (Simplified language)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="adult" id="adult" />
                  <Label htmlFor="adult">Adult Card (Formal language)</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormDescription>
              Select the appropriate card type.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Include QR Code */}
      <FormField
        control={form.control}
        name="includeQrCode"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Include QR Code</FormLabel>
              <FormDescription>
                Add a QR code for online access to your card.
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
