import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  Check, 
  Download, 
  Copy, 
  Share2, 
  ArrowRight,
  Baby, 
  User, 
  QrCode
} from 'lucide-react';
import { toast } from "sonner";
import { allergySuggestions } from "@/utils/searchSuggestions";
import { languages } from "@/types/definitions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const formSchema = z.object({
  allergies: z.array(z.string()).min(1, "Please select at least one allergy"),
  customAllergy: z.string().optional(),
  sourceLanguage: z.string().default("en"),
  targetLanguage: z.string().min(1, "Please select a target language"),
  audienceType: z.enum(["adult", "child"]).default("adult"),
  includeQrCode: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

enum Step {
  SelectAllergies = 0,
  ChooseLanguages = 1,
  Preview = 2,
  Download = 3,
}

export const AllergyCardGenerator = () => {
  const [step, setStep] = useState<Step>(Step.SelectAllergies);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [customAllergy, setCustomAllergy] = useState<string>("");
  const [generatedCard, setGeneratedCard] = useState<string | null>(null);
  const [translatedCard, setTranslatedCard] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allergies: [],
      customAllergy: "",
      sourceLanguage: "en",
      targetLanguage: "",
      audienceType: "adult",
      includeQrCode: false,
    },
  });

  const handleAddCustomAllergy = () => {
    if (customAllergy.trim() && !selectedAllergies.includes(customAllergy.trim())) {
      const updatedAllergies = [...selectedAllergies, customAllergy.trim()];
      setSelectedAllergies(updatedAllergies);
      form.setValue("allergies", updatedAllergies);
      setCustomAllergy("");
    }
  };

  const handleRemoveAllergy = (allergy: string) => {
    const updatedAllergies = selectedAllergies.filter(a => a !== allergy);
    setSelectedAllergies(updatedAllergies);
    form.setValue("allergies", updatedAllergies);
  };

  const handleToggleAllergy = (allergy: string) => {
    if (selectedAllergies.includes(allergy)) {
      handleRemoveAllergy(allergy);
    } else {
      const updatedAllergies = [...selectedAllergies, allergy];
      setSelectedAllergies(updatedAllergies);
      form.setValue("allergies", updatedAllergies);
    }
  };

  const handleNext = () => {
    if (step < Step.Download) {
      setStep(step + 1);
    }
    
    if (step === Step.ChooseLanguages) {
      generateCardText();
    }
  };

  const handleBack = () => {
    if (step > Step.SelectAllergies) {
      setStep(step - 1);
    }
  };

  const generateCardText = () => {
    const values = form.getValues();
    const allergiesList = values.allergies.join(", ");
    const isChild = values.audienceType === "child";

    let cardText = "";
    
    if (isChild) {
      cardText = `Hello! My name is _________.\n\nI have severe allergies to: ${allergiesList}.\n\nThese foods could make me very sick or cause a medical emergency.\n\nPlease help make sure my food doesn't contain or touch these ingredients.\n\nThank you for keeping me safe!`;
    } else {
      cardText = `Hello,\n\nI have food allergies to: ${allergiesList}.\n\nPlease ensure my meal is completely free from these ingredients, including cross-contamination.\n\nIf you're unsure about the ingredients, please let me know so I can make an informed decision.\n\nThank you for your understanding and assistance.`;
    }

    setGeneratedCard(cardText);
    
    const fakeTranslatedText = `[${values.targetLanguage.toUpperCase()} TRANSLATION]\n\n${cardText}\n\n(Translation would be implemented with a real API)`;
    setTranslatedCard(fakeTranslatedText);
  };

  const copyToClipboard = () => {
    if (generatedCard && translatedCard) {
      const fullText = `${generatedCard}\n\n${translatedCard}`;
      navigator.clipboard.writeText(fullText).then(() => {
        toast.success("Card copied to clipboard!");
      });
    }
  };

  const downloadAsPDF = () => {
    toast.success("PDF download feature would be integrated here");
  };

  const downloadAsPNG = () => {
    toast.success("PNG download feature would be integrated here");
  };

  const shareToWhatsApp = () => {
    if (generatedCard && translatedCard) {
      const fullText = encodeURIComponent(`${generatedCard}\n\n${translatedCard}`);
      window.open(`https://wa.me/?text=${fullText}`, '_blank');
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case Step.SelectAllergies:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Select Your Allergies</CardTitle>
                <CardDescription>
                  Choose all allergies or dietary restrictions that apply to you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {allergySuggestions.map((allergy) => (
                      <Button
                        key={allergy}
                        variant={selectedAllergies.includes(allergy) ? "default" : "outline"}
                        onClick={() => handleToggleAllergy(allergy)}
                        className="flex items-center gap-1"
                      >
                        {selectedAllergies.includes(allergy) && <Check className="h-4 w-4" />}
                        {allergy}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    <FormLabel htmlFor="customAllergy">Add a custom allergy or dietary need</FormLabel>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="customAllergy"
                        placeholder="Type a custom allergy..."
                        value={customAllergy}
                        onChange={(e) => setCustomAllergy(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleAddCustomAllergy} type="button">Add</Button>
                    </div>
                  </div>
                  
                  {selectedAllergies.length > 0 && (
                    <div className="bg-muted/50 p-4 rounded-md mt-4">
                      <h4 className="text-sm font-medium mb-2">Selected allergies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedAllergies.map((allergy) => (
                          <div 
                            key={allergy}
                            className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full flex items-center gap-1"
                          >
                            {allergy}
                            <button 
                              onClick={() => handleRemoveAllergy(allergy)}
                              className="ml-1 hover:bg-primary-foreground/20 rounded-full h-4 w-4 inline-flex items-center justify-center"
                              aria-label={`Remove ${allergy}`}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case Step.ChooseLanguages:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Step 2: Choose Languages</CardTitle>
                <CardDescription>
                  Select the source and target languages for your card
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <div className="space-y-4">
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
                  </div>
                </Form>
              </CardContent>
            </Card>
          </div>
        );

      case Step.Preview:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Step 3: Preview Your Card</CardTitle>
                <CardDescription>
                  Review how your translation card will appear
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedCard && (
                  <div className="space-y-6">
                    <div className="bg-white border rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-semibold mb-3">Source Language (English)</h3>
                      <div className="whitespace-pre-line">
                        {generatedCard}
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="bg-white border rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-semibold mb-3">Target Language Translation</h3>
                      <div className="whitespace-pre-line">
                        {translatedCard}
                      </div>
                    </div>
                    
                    {form.getValues().includeQrCode && (
                      <div className="flex justify-center mt-6">
                        <div className="border p-4 inline-flex flex-col items-center">
                          <QrCode size={120} />
                          <p className="text-xs text-muted-foreground mt-2">QR Code for sharing</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case Step.Download:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Step 4: Download & Share</CardTitle>
                <CardDescription>
                  Save or share your allergy translation card
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <Button onClick={downloadAsPDF} className="gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button onClick={downloadAsPNG} className="gap-2">
                    <Download className="h-4 w-4" />
                    Download PNG
                  </Button>
                  <Button onClick={shareToWhatsApp} className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Send to WhatsApp
                  </Button>
                  <Button onClick={copyToClipboard} className="gap-2">
                    <Copy className="h-4 w-4" />
                    Copy Text
                  </Button>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-3">Your card is ready!</h3>
                  <p className="text-blue-700 mb-2">
                    Remember to save multiple copies and keep them accessible during your travels.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(step + 1) * 25}%` }}
          ></div>
        </div>
      </div>
      
      {renderStepContent()}
      
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === Step.SelectAllergies}
        >
          Back
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={(step === Step.SelectAllergies && selectedAllergies.length === 0) || 
                   (step === Step.ChooseLanguages && !form.getValues().targetLanguage)}
          className="gap-1"
        >
          {step === Step.Download ? 'Finish' : 'Next'}
          {step !== Step.Download && <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="mt-12 bg-green-50 p-6 rounded-lg border border-green-200">
        <h3 className="font-semibold text-green-800 mb-3">Safety Tips</h3>
        <ul className="space-y-2 text-green-700 list-disc pl-5">
          <li>Always carry multiple copies of your allergy card</li>
          <li>Consider laminating a physical copy to protect it while traveling</li>
          <li>Save a digital version on your phone that's accessible offline</li>
          <li>Learn a few key phrases in the local language in addition to using the card</li>
          <li>When in doubt, show your card to staff before ordering or purchasing food</li>
        </ul>
      </div>
    </div>
  );
};
