import RealWorldCallout from './components/RealWorldCallout';
import GracefulImage from './components/GracefulImage';

export function useMDXComponents(components: any): any {
  return {
    RealWorldCallout,
    img: (props: any) => (
      <GracefulImage
        src={props.src || ''}
        alt={props.alt || ''}
      />
    ),
    ...components,
  };
}
