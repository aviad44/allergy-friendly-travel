import React from 'react';
import { Helmet } from 'react-helmet';
import { HOME_CONTENT } from "@/constants/home";
import { MenuScanner as MenuScannerComponent } from '@/components/menu-scanner/MenuScanner';

const MenuScanner = () => {
  return (
    <>
      <Helmet>
        <title>Menu Allergen Scanner | {HOME_CONTENT.navigation.brand}</title>
        <meta name="description" content="Scan restaurant menus to identify potential allergens. Upload a photo and get instant allergen detection powered by AI." />
        <meta name="keywords" content="menu scanner, allergen detection, food allergy, restaurant menu, OCR, AI allergen detection" />
      </Helmet>
      
      <MenuScannerComponent />
    </>
  );
};

export default MenuScanner;