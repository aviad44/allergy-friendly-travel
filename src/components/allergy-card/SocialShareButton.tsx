import React, { useState } from 'react';
import { Share2, MessageCircle, Facebook, Twitter, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export const SocialShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const currentUrl = window.location.href;
  const shareTitle = "כרטיס תרגום אלרגיות - בטיחות במסעות";
  const shareText = "צרו כרטיס תרגום אלרגיות בחינם ושמרו על עצמכם במסעות ברחבי העולם!";

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'text-green-600',
      action: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`;
        window.open(whatsappUrl, '_blank');
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        window.open(facebookUrl, '_blank');
      }
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      color: 'text-slate-700',
      action: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
        window.open(twitterUrl, '_blank');
      }
    },
    {
      name: 'Telegram',
      icon: ExternalLink,
      color: 'text-blue-500',
      action: () => {
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(telegramUrl, '_blank');
      }
    },
    {
      name: 'העתק קישור',
      icon: Copy,
      color: 'text-gray-600',
      action: () => {
        navigator.clipboard.writeText(currentUrl);
        toast.success('הקישור הועתק בהצלחה!');
        setIsOpen(false);
      }
    }
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Share2 className="w-5 h-5 mr-2" />
          שתף את הכלי
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4 text-center">שתף עם חברים</h3>
            <div className="grid gap-3">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  variant="ghost"
                  className="w-full justify-start p-3 hover:bg-muted/50"
                  onClick={option.action}
                >
                  <option.icon className={`w-5 h-5 mr-3 ${option.color}`} />
                  {option.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};