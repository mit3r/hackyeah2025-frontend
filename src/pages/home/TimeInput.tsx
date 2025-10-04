import { useState } from 'react';

export default function TimeInput() {
  const [value, setValue] = useState('2025-10-04T22:36');

  return (
    <div className="my-shadow z-1000 rounded-3xl bg-white px-6 py-3">
      <input
        type="datetime-local"
        name="time"
        id="time"
        className="w-40"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
}
