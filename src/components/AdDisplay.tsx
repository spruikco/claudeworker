Here is a simple example of a React component that meets your specifications:

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

This component fetches ad data when it mounts, and calls the `onView` prop when the ad data is successfully fetched. If there's an error fetching the ad data, it sets the `hasError` state to `true` and displays an error message. If the ad data is still loading, it displays a loading message. Once the ad data is loaded, it displays the ad and calls the `onClick` prop when the ad is clicked.

Please note that this is a simplified example and doesn't include actual ad rendering or tracking logic. You would need to replace the fetch URL and image source URL with your actual ad server URLs, and add any additional logic required for your specific use case.