import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) => {
  return (
    <motion.div
      className="text-center"
      variants={staggerItem}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <Icon className="h-8 w-8 text-slate-600" />
      </div>
      <h4 className="mb-2 text-xl font-semibold text-slate-900">{title}</h4>
      <p className="text-slate-600">{description}</p>
    </motion.div>
  );
};
