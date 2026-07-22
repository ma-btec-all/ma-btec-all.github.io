import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import type { Department } from "@/data/departments";

interface DepartmentCardProps {
  department: Department;
  index: number;
}

const DepartmentCard = ({ department, index }: DepartmentCardProps) => {
  const navigate = useNavigate();
  const Icon = department.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => navigate(`/department/${department.id}`)}
      className="glass-card hover-lift cursor-pointer group overflow-hidden"
    >
      <div className="p-6">
        {/* Icon + Title */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ background: `hsl(${department.color} / 0.15)` }}
          >
            <Icon className="w-6 h-6" style={{ color: `hsl(${department.color})` }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {department.name}
            </h3>
            <p className="text-xs text-muted-foreground">{department.nameEn}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          {department.description}
        </p>

        {/* Sub-specialties pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {department.subSpecialties.slice(0, 4).map((sub) => (
            <span
              key={sub.nameEn}
              className="text-xs px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground"
            >
              {sub.name}
            </span>
          ))}
          {department.subSpecialties.length > 4 && (
            <span className="text-xs px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground">
              +{department.subSpecialties.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <span className="text-xs text-muted-foreground">
            {department.subSpecialties.length} تخصصات
          </span>
          <span className="flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-all">
            استكشف
            <ChevronLeft className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default DepartmentCard;
