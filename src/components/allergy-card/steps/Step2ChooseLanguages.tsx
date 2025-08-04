
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../types';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { getLanguageOptions } from '../utils/translationService';

interface Step2Props {
  form: UseFormReturn<FormValues>;
}

export const Step2ChooseLanguages: React.FC<Step2Props> = ({ form }) => {
  const languageOptions = getLanguageOptions();
  
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
                    value={field.value || 'en'}  // Ensure a default of English if no value
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
                        {languageOptions.map((language) => (
                          <SelectItem key={language.value} value={language.value}>
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Select the language your card will be written in.
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
                        {languageOptions.map((language) => (
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
