
import React from 'react';
import { Shield } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const SafetyNotice: React.FC = () => {
  return (
    <Alert className="bg-amber-50 border border-amber-200 mb-6">
      <Shield className="h-5 w-5 text-amber-600" />
      <AlertTitle className="text-amber-800 font-medium text-base">Important Safety Notice</AlertTitle>
      <AlertDescription className="text-amber-700 text-sm mt-1">
        Always verify allergy accommodations directly with hotels before booking.
      </AlertDescription>
    </Alert>
  );
};
