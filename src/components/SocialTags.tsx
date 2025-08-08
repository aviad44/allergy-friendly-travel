import React from "react";
import MetaManager, { MetaType } from "@/components/MetaManager";

interface SocialTagsProps {
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
  type?: MetaType;
}

export const SocialTags: React.FC<SocialTagsProps> = ({ title, description, imageUrl, url, type = "website" }) => {
  return (
    <MetaManager
      routeKey="auto"
      dynamicData={{
        title,
        description,
        image: imageUrl,
        type,
        canonical: url,
      }}
    />
  );
};

export default SocialTags;
