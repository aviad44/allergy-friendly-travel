
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { DestinationId } from "@/types/reviews";

const LondonReviews = () => {
  return <DestinationReviews destinationId="london" as={DestinationId} />;
};

export default LondonReviews;
