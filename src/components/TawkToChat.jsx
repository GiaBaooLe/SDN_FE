// src/components/TawkToChat.jsx
import { useEffect } from 'react';

const TawkToChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/668eb9b6c3fb85929e3dc210/1i2eoastv';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default TawkToChat;
