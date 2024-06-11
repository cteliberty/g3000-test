'use client';

import { FC } from 'react';
import axios from 'axios';

const RemovePreviewButton: FC = () => (
  <div style={{ position: 'absolute', top: 0, right: 0 }}>
    <button
      onClick={async () => {
        await axios.get('/api/preview-close');
        window.location.reload();
      }}
    >
      Remove preview mode
    </button>
  </div>
);

export default RemovePreviewButton;
