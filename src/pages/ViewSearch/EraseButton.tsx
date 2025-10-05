import { SearchContext } from '@contexts/SearchContext';
import { useContext } from 'react';

export default function EraseButton() {
  const { swapLocations } = useContext(SearchContext);

  return (
    <button className="my-shadow -scale-x-100 rounded-full bg-white p-3" onClick={swapLocations}>
      <img className="invert" src="swap_vert_24dp_CCCCCC_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
    </button>
  );
}
