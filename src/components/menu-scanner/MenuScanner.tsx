import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Camera, Upload, Scan, AlertTriangle, CheckCircle } from 'lucide-react';
import Tesseract from 'tesseract.js';
import { supabase } from '@/integrations/supabase/client';

interface AllergenMatch {
  allergen: string;
  severity: 'high' | 'medium' | 'low';
  items: string[];
}

export const MenuScanner = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  const [detectedAllergens, setDetectedAllergens] = useState<AllergenMatch[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    
    await processImage(file);
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera on mobile
      });
      
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      video.addEventListener('loadedmetadata', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0);
        
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            await processImage(file);
          }
        }, 'image/jpeg', 0.8);
        
        // Stop camera stream
        stream.getTracks().forEach(track => track.stop());
      });
    } catch (error) {
      console.error('Camera access error:', error);
      toast({
        title: "Camera access denied",
        description: "Please allow camera access or upload an image instead",
        variant: "destructive"
      });
    }
  };

  const processImage = async (file: File) => {
    setIsProcessing(true);
    setOcrProgress(0);
    setExtractedText('');
    setDetectedAllergens([]);

    try {
      // OCR Processing
      toast({
        title: "Processing image",
        description: "Extracting text from menu..."
      });

      const result = await Tesseract.recognize(file, 'eng+heb+ara+fra+spa+ita+deu+rus+chi_sim+jpn', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setOcrProgress(Math.round(m.progress * 100));
          }
        }
      });

      const text = result.data.text;
      setExtractedText(text);

      if (!text.trim()) {
        toast({
          title: "No text found",
          description: "Could not extract text from the image. Please try a clearer image.",
          variant: "destructive"
        });
        return;
      }

      // Analyze allergens with AI
      await analyzeAllergens(text);

    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        title: "Processing failed",
        description: "Failed to process the image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const analyzeAllergens = async (text: string) => {
    try {
      toast({
        title: "Analyzing allergens",
        description: "Identifying potential allergens in the menu..."
      });

      const { data, error } = await supabase.functions.invoke('analyze-menu-allergens', {
        body: { menuText: text }
      });

      if (error) throw error;

      setDetectedAllergens(data.allergens || []);
      
      toast({
        title: "Analysis complete",
        description: `Found ${data.allergens?.length || 0} potential allergens`,
      });
    } catch (error) {
      console.error('Error analyzing allergens:', error);
      toast({
        title: "Analysis failed",
        description: "Failed to analyze allergens. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scan className="w-5 h-5" />
            Menu Allergen Scanner
          </CardTitle>
          <CardDescription>
            Upload a photo of a restaurant menu to identify potential allergens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="h-32 border-dashed"
              disabled={isProcessing}
            >
              <div className="text-center">
                <Upload className="w-8 h-8 mx-auto mb-2" />
                <div>Upload Menu Photo</div>
                <div className="text-sm text-muted-foreground">
                  JPG, PNG, WebP up to 10MB
                </div>
              </div>
            </Button>

            <Button
              onClick={handleCameraCapture}
              variant="outline"
              className="h-32 border-dashed"
              disabled={isProcessing}
            >
              <div className="text-center">
                <Camera className="w-8 h-8 mx-auto mb-2" />
                <div>Take Photo</div>
                <div className="text-sm text-muted-foreground">
                  Direct camera capture
                </div>
              </div>
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Scan className="w-4 h-4 animate-spin" />
                <span>Processing... {ocrProgress}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${ocrProgress}%` }}
                />
              </div>
            </div>
          )}

          {selectedImage && (
            <div className="space-y-4">
              <h3 className="font-semibold">Uploaded Image:</h3>
              <img 
                src={selectedImage} 
                alt="Menu to scan" 
                className="max-w-full h-auto rounded-lg border max-h-64 object-contain"
              />
            </div>
          )}

          {extractedText && (
            <div className="space-y-2">
              <h3 className="font-semibold">Extracted Text:</h3>
              <Textarea 
                value={extractedText}
                readOnly
                className="min-h-32"
                placeholder="Extracted menu text will appear here..."
              />
            </div>
          )}

          {detectedAllergens.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Detected Allergens:
              </h3>
              <div className="grid gap-4">
                {detectedAllergens.map((allergen, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{allergen.allergen}</h4>
                      <Badge variant={getSeverityColor(allergen.severity)}>
                        {allergen.severity} risk
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Found in:</p>
                      <div className="flex flex-wrap gap-1">
                        {allergen.items.map((item, itemIndex) => (
                          <Badge key={itemIndex} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {detectedAllergens.length === 0 && extractedText && !isProcessing && (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
              <h3 className="font-medium text-green-700">No allergens detected!</h3>
              <p className="text-sm text-muted-foreground">
                This menu appears to be safe based on common allergens
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};