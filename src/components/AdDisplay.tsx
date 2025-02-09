Here is a basic example of how you could implement this component in React with TypeScript:

```tsx
import React, { useEffect, useState } from 'react';

type AdSize = 'small' | 'medium' | 'large';

interface AdDisplayProps {
  adId: string;
  size: AdSize;
  onView: () => void;
  onClick: () => void;
}

const AdDisplay: React.FC<AdDisplayProps> = ({ adId, size, onView, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Simulate fetching ad data
    fetch(`https://api.example.com/ads/${adId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setIsLoading(false);
        onView();
      })
      .catch(() => {
        setIsLoading(false);
        setHasError(true);
      });
  }, [adId, onView]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (hasError) {
    return <div className="text-center text-red-500">Error loading ad</div>;
  }

  return (
    <div
      className={`ad-container ad-${size}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={onClick}
    >
      <img src={`https://api.example.com/ads/${adId}/image`} alt="Ad" />
    </div>
  );
};

export default AdDisplay;
```

This component fetches ad data when it mounts, and calls the `onView` prop when the ad data is successfully fetched. If there is an error fetching the ad data, it sets the `hasError` state to `true`. The component displays a loading message while the ad data is being fetched, an error message if there was an error fetching the ad data, and the ad itself if the ad data was successfully fetched. The `onClick` prop is called when the ad is clicked.