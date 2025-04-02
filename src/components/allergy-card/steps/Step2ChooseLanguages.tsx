
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../types';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

const sourceLanguages = [
  { value: 'en', label: 'English' },
];

const targetLanguages = [
  { value: 'ar', label: 'Arabic' },
  { value: 'zh', label: 'Chinese (Simplified)' },
  { value: 'cs', label: 'Czech' },
  { value: 'da', label: 'Danish' },
  { value: 'nl', label: 'Dutch' },
  { value: 'fi', label: 'Finnish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'el', label: 'Greek' },
  { value: 'he', label: 'Hebrew' },
  { value: 'hi', label: 'Hindi' },
  { value: 'hu', label: 'Hungarian' },
  { value: 'it', label: 'Italian' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'no', label: 'Norwegian' },
  { value: 'pl', label: 'Polish' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ru', label: 'Russian' },
  { value: 'es', label: 'Spanish' },
  { value: 'sv', label: 'Swedish' },
  { value: 'th', label: 'Thai' },
  { value: 'tr', label: 'Turkish' },
  { value: 'vi', label: 'Vietnamese' },
];

interface Step2Props {
  form: UseFormReturn<FormValues>;
}

export const Step2ChooseLanguages: React.FC<Step2Props> = ({ form }) => {
  // Set default source language if it's not already set
  React.useEffect(() => {
    const sourceLanguage = form.getValues().sourceLanguage;
    if (!sourceLanguage) {
      console.log("Setting default source language to English");
      form.setValue('sourceLanguage', 'en');
    }
  }, [form]);

  return (
    <div className="space-y-6">
      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium mb-3 text-teal-800">Language Selection</h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose the source language of your allergy card and the language you want it translated to.
        </p>
        
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="sourceLanguage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Source Language</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      console.log("Source language changed to:", value);
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select source language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {sourceLanguages.map((language) => (
                          <SelectItem key={language.value} value={language.value}>
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Currently, cards can only be created in English.
                </FormDescription>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="targetLanguage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Target Language</FormLabel>
                <FormControl>
                  <Select
                    value={field.value || ""}
                    onValueChange={(value) => {
                      console.log("Target language changed to:", value);
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select target language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {targetLanguages.map((language) => (
                          <SelectItem key={language.value} value={language.value}>
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  This is the language your card will be translated to.
                </FormDescription>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="includeQrCode"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0 mt-4 pt-4 border-t">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-base">Include QR Code</FormLabel>
                  <FormDescription>
                    Add a QR code to your card that links to an online version.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
      
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start">
          <div className="text-blue-700">
            <h3 className="font-semibold mb-2">Translation Tips</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Select the language of the country you're visiting</li>
              <li>Consider having multiple cards in different languages if traveling to multiple countries</li>
              <li>Restaurant staff may prefer seeing both the original and translated versions</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
