import { Resume } from "@/types/resume";
import { Notebook } from "lucide-react";
import { Link } from "react-router-dom";

interface ResumeCardItemProps {
  resume: Resume;
}

function ResumeCardItem({ resume }: ResumeCardItemProps) {
  return (
    <Link
      to={`/dashboard/resume/${resume.resumeId}/edit`}
      className="text-inherit"
    >
      <div className="p-14 bg-secondary flex items-center justify-center h-[360px] border border-primary rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-primary">
        <Notebook />
      </div>
      <h2 className="text-center my-2">{resume.title}</h2>
    </Link>
  );
}

export default ResumeCardItem;
