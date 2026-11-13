import React from 'react';
import {
  SlidersHorizontal,
  CheckCircle2,
  Route,
  Layers,
  RefreshCw,
  UserCheck,
  Sun,
  MessageSquare,
  Wifi,
  BatteryCharging,
  Hand,
} from 'lucide-react';

export type CardGraphicVariant =
  | 'needs'
  | 'outcome'
  | 'life-bridge'
  | 'multimodal'
  | 'continuous'
  | 'senior'
  | 'sunlight'
  | 'caption-haptic'
  | 'network-resilient'
  | 'device-save'
  | 'one-hand';

interface CardMotionGraphicProps {
  variant: CardGraphicVariant;
}

const ICON_MAP: Record<CardGraphicVariant, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  needs: SlidersHorizontal,
  outcome: CheckCircle2,
  'life-bridge': Route,
  multimodal: Layers,
  continuous: RefreshCw,
  senior: UserCheck,
  sunlight: Sun,
  'caption-haptic': MessageSquare,
  'network-resilient': Wifi,
  'device-save': BatteryCharging,
  'one-hand': Hand,
};

const CardMotionGraphic: React.FC<CardMotionGraphicProps> = ({ variant }) => {
  const Icon = ICON_MAP[variant];

  return (
    <div className="card-icon-badge" aria-hidden="true">
      <Icon size={22} strokeWidth={2.1} />
    </div>
  );
};

export default CardMotionGraphic;
