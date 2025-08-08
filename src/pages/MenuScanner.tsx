import React from 'react';
import { MetaManager } from '@/components/MetaManager';
import { HOME_CONTENT } from "@/constants/home";
import { MenuScanner as MenuScannerComponent } from '@/components/menu-scanner/MenuScanner';

const MenuScanner = () => {
  return (
    <>
      <MetaManager 
        routeKey="/menu-scanner"
        dynamicData={{
          title: `Menu Allergen Scanner | ${HOME_CONTENT.navigation.brand}`,
          description: "Scan restaurant menus to identify potential allergens. Upload a photo and get instant allergen detection powered by AI.",
        }}
      />
      
      <MenuScannerComponent />
    </>
  );
};

export default MenuScanner;