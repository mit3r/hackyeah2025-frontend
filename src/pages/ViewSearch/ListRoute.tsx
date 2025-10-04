// import { Route } from '@type/routes';
import Switch from './Switch';

export default function ListRoute() {
  return (
    <div className="w-full">
      <Switch onClick={() => {}} options={['Option 1', 'Option 2']} />
    </div>
  );
}

// function Route({ route }: { route: Route }) {
//   return <div></div>;
// }
