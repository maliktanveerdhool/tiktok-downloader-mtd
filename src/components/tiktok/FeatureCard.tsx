
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  className
}) => {
  return (
    <div className={cn(
      "bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-tiktok-primary/50 transition-all duration-300",
      "transform hover:-translate-y-1",
      className
    )}>
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 text-tiktok-primary">{icon}</div>
        <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
