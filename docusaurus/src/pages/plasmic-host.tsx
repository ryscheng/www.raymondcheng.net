import * as React from 'react';
import { PlasmicCanvasHost } from '@plasmicapp/loader-react';
import { PLASMIC } from '../plasmic-init';

export default function PlasmicHost(): JSX.Element {
  return PLASMIC && <PlasmicCanvasHost />;
}