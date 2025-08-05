import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getLanguageOptions } from '../utils/translationService';

interface Step2ChooseLanguagesProps {
  form: UseFormReturn<FormValues>;
}

export function Step2ChooseLanguages({ form }: Step2ChooseLanguagesProps) {
  const languageOptions = getLanguageOptions();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Choose Translation Language</h2>
        <p className="text-muted-foreground">
          Select the language for your allergy card translation.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <FormField
          control={form.control}
          name="targetLanguage"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Target Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select target language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Translation Tips</CardTitle>
          <CardDescription className="text-blue-700">
            Our translation system provides accurate allergy information in multiple languages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h4 className="font-medium mb-2">🌍 Available Languages</h4>
              <p>We support major world languages including European, Asian, and Middle Eastern languages.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">✅ Medical Accuracy</h4>
              <p>All translations are medically reviewed to ensure accuracy for allergy communication.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">🔄 Instant Translation</h4>
              <p>Get your translated allergy card instantly without waiting for external services.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">📱 Travel Ready</h4>
              <p>Perfect for restaurants, hotels, and any food service situation worldwide.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}